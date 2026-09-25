/* Corre Code.gs en Node contra una hoja de calculo falsa.
   La logica de premios regala comida: conviene equivocarse aqui y no en la caja. */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const RAIZ = path.join(__dirname, '..');

// --- hoja de calculo en memoria -------------------------------------------
/* Google Sheets NO guarda lo que le mandas tal cual: una cadena que parece
   fecha ('2026-09-06') la convierte en un valor de fecha, y al leerla de vuelta
   regresa un Date, no la cadena. Esta prueba lo imita, porque sin eso el arnes
   era mas amable que la realidad y dejo pasar un error hasta produccion: dos
   pedidos entregados el mismo dia sumaban dos sellos. */
function comoSheets(v) {
  // Medianoche en la zona DE LA HOJA (CDMX = UTC-6), que es como Sheets la crea.
  // Crearla en la zona de esta maquina haria la prueba dependiente de donde corre.
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v)) return new Date(v + 'T06:00:00Z');
  return v;
}

function Hoja(headers) {
  const filas = [headers.slice()];
  return {
    filas,
    getDataRange: () => ({ getValues: () => filas.map((f) => f.slice()) }),
    getLastRow: () => filas.length,
    getLastColumn: () => Math.max.apply(null, filas.map((f) => f.length)),
    setFrozenRows: () => {},
    appendRow: (a) => filas.push(a.slice()),
    getRange: (r, c, nr, nc) => ({
      setValue: (v) => {
        const f = filas[r - 1];
        while (f.length < c) f.push('');
        f[c - 1] = comoSheets(v);
      },
      getValues: () => filas.slice(r - 1, r - 1 + (nr || 1)).map((f) => f.slice(c - 1, c - 1 + (nc || 1))),
      /* Escribir mas alla del ultimo renglon crea los renglones, como en una
         hoja de verdad: Sheets nace con mil filas vacias. Este doble los
         asumia existentes y tronaba al sembrar inv_parametros. */
      setValues: (vs) => vs.forEach((fila, i) => {
        while (filas.length < r + i) filas.push([]);
        fila.forEach((v, j) => {
          const f = filas[r - 1 + i];
          while (f.length < c + j) f.push('');
          f[c - 1 + j] = comoSheets(v);
        });
      }),
    }),
  };
}

const hojas = {};
const props = {};
const DIA_ISO = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

const ctx = {
  console,
  SpreadsheetApp: {
    getActiveSpreadsheet: () => ({
      getSheetByName: (n) => hojas[n] || null,
      insertSheet: (n) => (hojas[n] = Hoja([])),
      getSheets: () => Object.keys(hojas).map((k) => hojas[k]),
      // La zona del documento: es el marco en el que Sheets crea sus fechas.
      getSpreadsheetTimeZone: () => 'America/Mexico_City',
    }),
  },
  Utilities: {
    getUuid: () => 'uuid-falso',
    formatDate: (d, tz, fmt) => {
      const p = new Intl.DateTimeFormat('en-CA', {
        timeZone: tz, hour12: false,
        year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', weekday: 'short',
      }).formatToParts(d).reduce((o, x) => { o[x.type] = x.value; return o; }, {});
      if (fmt === 'yyyy-MM-dd') return p.year + '-' + p.month + '-' + p.day;
      if (fmt === 'H') return String(Number(p.hour));
      if (fmt === 'u') return String(DIA_ISO[p.weekday]);
      throw new Error('formato no soportado en la prueba: ' + fmt);
    },
  },
  LockService: { getScriptLock: () => ({ waitLock() {}, releaseLock() {} }) },
  PropertiesService: {
    getScriptProperties: () => ({
      getProperty: (k) => props[k] || null,
      setProperty: (k, v) => { props[k] = String(v); },
    }),
  },
  Logger: { log: () => {} },
  ContentService: { createTextOutput: (t) => ({ setMimeType: () => t }), MimeType: { JSON: 'json' } },
  /* Google validando tokens de Firebase. La prueba decide que contesta, y
     cuenta cuantas veces se le pregunto para comprobar el cache. */
  UrlFetchApp: {
    fetch: (url, opts) => {
      GOOGLE.llamadas++;
      const token = JSON.parse(opts.payload).idToken;
      const u = GOOGLE.cuentas[token];
      return u
        ? { getResponseCode: () => 200, getContentText: () => JSON.stringify({ users: [u] }) }
        : { getResponseCode: () => 400, getContentText: () => '{"error":{"message":"INVALID_ID_TOKEN"}}' };
    },
  },
  CacheService: {
    getScriptCache: () => ({
      get: (k) => (k in CACHE ? CACHE[k] : null),
      put: (k, v) => { CACHE[k] = v; },
    }),
  },
};
const GOOGLE = { llamadas: 0, cuentas: {} };
const CACHE = {};
Object.assign(ctx.Utilities, {
  DigestAlgorithm: { SHA_256: 'sha256' },
  Charset: { UTF_8: 'utf8' },
  computeDigest: (alg, texto) => Array.from(require('crypto').createHash('sha256').update(texto, 'utf8').digest()),
  base64EncodeWebSafe: (bytes) => Buffer.from(bytes).toString('base64url'),
});
vm.createContext(ctx);
/* El servicio de recoger esta apagado en produccion (PICKUP_ACTIVO = false),
   pero el codigo sigue completo para cuando se reactive. La suite principal lo
   enciende para que no se pudra sin que nadie se entere; mas abajo hay una
   seccion aparte que comprueba el comportamiento con el interruptor apagado,
   que es como corre hoy. */
const FUENTE = fs.readFileSync(path.join(RAIZ, 'integration/sheets-backend/Code.gs'), 'utf8');
const conPickup = (activo) => FUENTE.replace(
  /const PICKUP_ACTIVO = (?:true|false);/, 'const PICKUP_ACTIVO = ' + activo + ';');
vm.runInContext(conPickup(true), ctx);

/* Code.gs declara sus constantes con const, que no quedan como propiedades del
   contexto (las funciones si). Se leen evaluando dentro del sandbox. */
const ev = (expr) => vm.runInContext(expr, ctx);
const SHEETS = ev('SHEETS');
const CLIENTES_HEADERS = ev('CLIENTES_HEADERS');
const ORDENES_HEADERS = ev('ORDENES_HEADERS');
const CATALOGO = ev('CATALOGO');
const PREMIOS = ev('PREMIOS');

// --- estado inicial --------------------------------------------------------
Object.keys(SHEETS).forEach((k) => { hojas[SHEETS[k]] = Hoja([]); });
// La hoja clientes arranca VIEJA, con las 6 columnas de antes, para probar la migracion.
hojas[SHEETS.clientes] = Hoja(CLIENTES_HEADERS.slice(0, 6));
ctx.configurarHojas();
props.FOLIO = '100';

// --- utilidades de prueba --------------------------------------------------
let ok = 0;
let mal = 0;
function comparar(etiqueta, real, esperado) {
  const bien = JSON.stringify(real) === JSON.stringify(esperado);
  if (bien) ok++; else mal++;
  console.log((bien ? '  ok   ' : '  MAL  ') + etiqueta + (bien ? '' :
    '\n         esperado ' + JSON.stringify(esperado) +
    '\n         real     ' + JSON.stringify(real)));
}

// Miercoles 9, jueves 10 y viernes 11 de septiembre de 2026, en horario abierto
// (CDMX = UTC-6). El 2x1 se movio a los miercoles; el viernes se conserva en las
// pruebas justamente para comprobar que YA NO dispara nada.
const MIE = (h) => new Date(Date.UTC(2026, 8, 9, h + 6));
const JUE = (h) => new Date(Date.UTC(2026, 8, 10, h + 6));
const VIE = (h) => new Date(Date.UTC(2026, 8, 11, h + 6));
// Un dia cualquiera a las 18:00 CDMX; septiembre 2026 empieza en martes,
// asi que del 9 al 13 hay miercoles..domingo, todos dias de servicio.
const DIA = (d) => new Date(Date.UTC(2026, 8, d, 24));

let RELOJ = JUE(18);
const RealDate = Date;
ctx.Date = class extends RealDate {
  constructor() { return arguments.length ? new RealDate(arguments[0]) : new RealDate(RELOJ); }
  static now() { return RELOJ.getTime(); }
};

const TEL = '5512345678';

/* La tarjeta se sella al ENTREGAR, no al pedir, asi que casi toda prueba tiene
   que llevar el pedido hasta el final del flujo. `pedir` lo hace por omision;
   con { entregar: false } se deja a medias a proposito. */
/* Avanza hasta entregar. No es un numero fijo de pasos: recoger en la cocina
   se salta el 'en camino', asi que el recorrido es mas corto. */
function entregar(folio) {
  for (let i = 0; i < 8; i++) {
    const r = ctx.avanzarEstado_({ folio: folio });
    if (r.estado === 'entregada') return;
  }
  throw new Error('no llegue a entregada con ' + folio);
}

/* Canjear un premio exige la cuenta duena del telefono. Las pruebas de la
   matematica de premios no son sobre ligar cuentas (eso se prueba aparte, con
   folios de verdad), asi que aqui se liga directo en la hoja. */
function asegurarCuenta(tel) {
  const token = 'tok-' + tel;
  GOOGLE.cuentas[token] = { localId: 'uid-' + tel, email: tel + '@prueba.mx' };
  const filas = hojas[SHEETS.clientes].filas;
  const cUid = CLIENTES_HEADERS.indexOf('uid');
  let fila = filas.find((f, i) => i > 0 && String(f[0]) === String(tel));
  if (!fila) { fila = [tel]; filas.push(fila); }
  while (fila.length <= cUid) fila.push('');
  fila[cUid] = 'uid-' + tel;
  return token;
}

function pedir(items, opts) {
  opts = opts || {};
  if (opts.cuando) RELOJ = opts.cuando;
  const tel = opts.tel || TEL;
  const r = ctx.crearOrden_({
    canal: 'web',
    cliente: { telefono: tel, nombre: 'Prueba' },
    direccion: 'Calle 1', colonia: 'Lomas Lindas', km: 1, pago_metodo: 'Efectivo',
    items: items,
    usarPremio: opts.usarPremio,
    entrega_tipo: opts.entrega_tipo,
    idToken: (opts.usarPremio && !opts.invitado) ? asegurarCuenta(tel) : undefined,
  });
  if (opts.entregar !== false) entregar(r.folio);
  // r.tarjeta viene del momento de pedir; se reemplaza por como quedo despues.
  r.tarjeta = tarjetaDe(tel);
  return r;
}
const totalDe = (folio) => hojas[SHEETS.ordenes].filas
  .filter((f) => f[0] === folio)[0][ORDENES_HEADERS.indexOf('total')];
const campoDe = (folio, campo) => hojas[SHEETS.ordenes].filas
  .filter((f) => f[0] === folio)[0][ORDENES_HEADERS.indexOf(campo)];
const tarjetaDe = (tel) => ctx.premiosDe_(ctx.leerTarjeta_(tel), ctx.premiosReservados_(tel));
const tarjeta = () => tarjetaDe(TEL);

// Avanza dias de servicio hasta llegar a `meta` dias acumulados.
let cursor = 12;
function acumularHasta(meta, PIZZA) {
  let guarda = 0;
  while (tarjeta().dias < meta) {
    if (++guarda > 40) throw new Error('no llegue a ' + meta + ' dias');
    const d = DIA(cursor++);
    if (!ctx.estaAbierto_(d)) continue;
    pedir([{ producto_id: PIZZA, cantidad: 1 }], { cuando: d });
  }
}

// --- pruebas ---------------------------------------------------------------
console.log('\nHORARIO Y 2x1');
comparar('miercoles 19:00 es 2x1', ctx.es2x1_(MIE(19)), true);
comparar('miercoles 18:00 NO es 2x1', ctx.es2x1_(MIE(18)), false);
comparar('miercoles 22:00 sigue siendo 2x1', ctx.es2x1_(MIE(22)), true);
// El dia viejo tiene que haber dejado de contar.
comparar('viernes 19:00 YA NO es 2x1', ctx.es2x1_(VIE(19)), false);
comparar('jueves 20:00 NO es 2x1', ctx.es2x1_(JUE(20)), false);

console.log('\nMIGRACION DE LA HOJA clientes');
comparar('encabezados completos', hojas[SHEETS.clientes].filas[0], CLIENTES_HEADERS);

console.log('\nPRECIOS DEL SERVIDOR');
const pizzas = Object.keys(CATALOGO.productos)
  .filter((id) => CATALOGO.productos[id].cat !== 'Para cerrar')
  .sort((a, b) => CATALOGO.productos[b].precio - CATALOGO.productos[a].precio);
const CARA = pizzas[0];
const BARATA = pizzas[pizzas.length - 1];
const PIZZA = PREMIOS.pizza.producto;
const precioPizza = CATALOGO.productos[PIZZA].precio;
const postre = Object.keys(CATALOGO.productos)
  .filter((id) => CATALOGO.productos[id].cat === 'Para cerrar')[0];

const r1 = pedir([{ producto_id: PIZZA, cantidad: 1, precio_unit: 0 }], { cuando: JUE(18) });
comparar('ignora el precio_unit que manda el cliente', totalDe(r1.folio), precioPizza);

console.log('\nCONTEO DE DIAS DISTINTOS');
comparar('dia 1 tras el primer pedido', r1.tarjeta.dias, 1);
const r2 = pedir([{ producto_id: PIZZA, cantidad: 1 }], { cuando: JUE(20) });
comparar('segundo pedido el MISMO dia no suma', r2.tarjeta.dias, 1);
comparar('sin premio todavia', r2.premio, null);

console.log('\n2x1 DEL MIERCOLES');
const r3 = pedir([{ producto_id: CARA, cantidad: 1 }, { producto_id: BARATA, cantidad: 1 }], { cuando: MIE(19) });
comparar('regala una de las dos', r3.premio && r3.premio.tipo, '2x1');
comparar('cobra la cara, regala la barata', totalDe(r3.folio), CATALOGO.productos[CARA].precio);
const r4 = pedir([{ producto_id: CARA, cantidad: 1 }, { producto_id: postre, cantidad: 1 }], { cuando: MIE(20) });
comparar('pizza + postre NO dispara 2x1', r4.premio, null);
const r4b = pedir([{ producto_id: BARATA, cantidad: 2 }], { cuando: MIE(21) });
comparar('cantidad 2 en una sola linea si dispara 2x1', r4b.premio && r4b.premio.tipo, '2x1');
comparar('y cobra solo una', totalDe(r4b.folio), CATALOGO.productos[BARATA].precio);

console.log('\nBROWNIE AL DIA 4');
acumularHasta(4, PIZZA);
const t4 = tarjeta();
comparar('brownie disponible, pizza no', [t4.dias, t4.brownie, t4.pizza], [4, true, false]);

const BROWNIE = PREMIOS.brownie.producto;
let d = DIA(cursor++);
while (!ctx.estaAbierto_(d)) d = DIA(cursor++);
const r5 = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: BROWNIE, cantidad: 1 }],
  { cuando: d, usarPremio: 'brownie' });
comparar('canjea el brownie', r5.premio && r5.premio.tipo, 'tarjeta:brownie');
comparar('cobra solo la pizza', totalDe(r5.folio), precioPizza);
comparar('el brownie queda usado', r5.tarjeta.brownie, false);

d = DIA(cursor++);
while (!ctx.estaAbierto_(d)) d = DIA(cursor++);
const r6 = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: BROWNIE, cantidad: 1 }],
  { cuando: d, usarPremio: 'brownie' });
comparar('un segundo brownie NO se regala', r6.premio, null);

console.log('\nPIZZA GRATIS AL DIA 9');
acumularHasta(9, PIZZA);
comparar('pizza disponible al dia 9', [tarjeta().dias, tarjeta().pizza], [9, true]);
d = DIA(cursor++);
while (!ctx.estaAbierto_(d)) d = DIA(cursor++);
const diasAntes = tarjeta().dias;
/* Va con otra pizza cobrada: desde que el canje exige que quede algo que
   cobrar, un pedido de pura Traviesa gratis se rechaza (se prueba abajo). */
const r7 = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: CARA, cantidad: 1 }],
  { cuando: d, usarPremio: 'pizza' });
comparar('canjea la pizza', r7.premio && r7.premio.tipo, 'tarjeta:pizza');
comparar('solo se cobra la que no era premio', totalDe(r7.folio), CATALOGO.productos[CARA].precio);
comparar('resta 9, no reinicia a cero', r7.tarjeta.dias, diasAntes + 1 - 9);
comparar('el brownie se reinicia', r7.tarjeta.brownie, false);
comparar('cuenta un ciclo', r7.tarjeta.ciclos, 1);

console.log('\nLAS PROMOCIONES NO SE ACUMULAN');
acumularHasta(9, PIZZA);
const r8 = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: BARATA, cantidad: 1 }],
  { cuando: MIE(21), usarPremio: 'pizza' });
const regaladas = hojas[SHEETS.ordenItems].filas.filter((f) => f[1] === r8.folio && f[8]);
comparar('2x1 + tarjeta: un solo regalo', regaladas.length, 1);
/* El 2x1 regala la mas barata del par (189); la tarjeta regala la traviesa
   (199). Debe ganar la que le conviene al cliente. */
comparar('gana la via que mas le conviene al cliente',
  [r8.premio.tipo, r8.premio.valor],
  ['tarjeta:pizza', CATALOGO.productos[PIZZA].precio]);
comparar('y el pedido cobra solo la barata', totalDe(r8.folio), CATALOGO.productos[BARATA].precio);

console.log('\nCONTABILIDAD');
const linea = hojas[SHEETS.ordenItems].filas.filter((f) => f[1] === r7.folio)[0];
comparar('precio_unit se conserva, importe 0, motivo escrito',
  [linea[5] > 0, linea[7], linea[8]], [true, 0, 'tarjeta:pizza']);
const sumaVentas = hojas[SHEETS.ordenItems].filas.slice(1)
  .reduce((s, f) => s + Number(f[7]), 0);
const sumaOrdenes = hojas[SHEETS.ordenes].filas.slice(1)
  .reduce((s, f) => s + Number(f[ORDENES_HEADERS.indexOf('total')]), 0);
comparar('los items cuadran con los totales de las ordenes', sumaVentas, sumaOrdenes);

console.log('\nCOMPLEMENTOS');
const COMP = Object.keys(CATALOGO.complementos)[0];
const precioComp = CATALOGO.complementos[COMP].precio;
let dc = DIA(cursor++);
while (!ctx.estaAbierto_(dc)) dc = DIA(cursor++);
const r9 = pedir([{ producto_id: CARA, cantidad: 1, addons: [{ id: COMP }] }], { cuando: dc });
comparar('con id: el precio sale del catalogo',
  totalDe(r9.folio), CATALOGO.productos[CARA].precio + precioComp);

/* Un carrito viejo (o un APK ya instalado) manda los complementos colapsados en
   un solo renglon, sin id. Tiene que seguir pasando o se caen pedidos reales. */
const r10 = pedir([{ producto_id: CARA, cantidad: 1, addons: [{ nombre: 'Extra queso', precio: 25 }] }],
  { cuando: dc });
comparar('sin id: se acepta el renglon colapsado',
  totalDe(r10.folio), CATALOGO.productos[CARA].precio + 25);

const r11 = pedir([{ producto_id: CARA, cantidad: 1, addons: [{ nombre: 'Trampa', precio: -500 }] }],
  { cuando: dc });
comparar('un complemento negativo no descuenta nada',
  totalDe(r11.folio), CATALOGO.productos[CARA].precio);

/* El cliente manda id Y precio a la vez, para que el servidor viejo y el nuevo
   cobren igual mientras se despliegan. Con id presente, manda el catalogo: el
   precio que venga en la peticion se ignora, mienta hacia arriba o hacia abajo. */
const r12 = pedir([{ producto_id: CARA, cantidad: 1, addons: [{ id: COMP, nombre: 'X', precio: 0 }] }],
  { cuando: dc });
comparar('con id, un precio de cero en la peticion se ignora',
  totalDe(r12.folio), CATALOGO.productos[CARA].precio + precioComp);
const r13 = pedir([{ producto_id: CARA, cantidad: 1, addons: [{ id: COMP, nombre: 'X', precio: 9999 }] }],
  { cuando: dc });
comparar('con id, un precio inflado tampoco cuenta',
  totalDe(r13.folio), CATALOGO.productos[CARA].precio + precioComp);

let malComp = false;
try { pedir([{ producto_id: CARA, cantidad: 1, addons: [{ id: 'no-existe' }] }], { cuando: dc }); }
catch (e) { malComp = /Complemento desconocido/.test(String(e)); }
comparar('un id de complemento inventado se rechaza', malComp, true);

let malProd = false;
try { pedir([{ producto_id: 'pizza-fantasma', cantidad: 1 }], { cuando: dc }); }
catch (e) { malProd = /Producto desconocido/.test(String(e)); }
comparar('un producto inventado se rechaza', malProd, true);

console.log('\nCOCINA CERRADA');
let cerrado = false;
try { pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: new Date(Date.UTC(2026, 8, 12, 7)) }); }
catch (e) { cerrado = /cerrada/.test(String(e)); }
comparar('a la 1:00 am no se puede pedir', cerrado, true);

console.log('\nEL SELLO EXIGE UNA PIZZA COBRADA');
/* Sin esta regla, nueve pedidos de agua de $35 valen una Traviesa de $199 mas
   un brownie. Cada telefono nuevo arranca limpio, para no arrastrar los dias
   acumulados en las pruebas de arriba. */
const diaAbierto = () => { let d = DIA(cursor++); while (!ctx.estaAbierto_(d)) d = DIA(cursor++); return d; };
const TEL_AGUA = '5599999999';
const AGUA = 'agua';
const REFRESCO = 'refresco-coca';

const rAgua = pedir([{ producto_id: AGUA, cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_AGUA });
comparar('un pedido de pura agua NO sella', rAgua.tarjeta.dias, 0);

const diaMixto = diaAbierto();
pedir([{ producto_id: AGUA, cantidad: 3 }, { producto_id: REFRESCO, cantidad: 2 },
       { producto_id: BROWNIE, cantidad: 1 }], { cuando: diaMixto, tel: TEL_AGUA });
comparar('agua, refrescos y postres tampoco, por muchos que sean',
  tarjetaDe(TEL_AGUA).dias, 0);

// El mismo dia, ya con pizza, si cuenta: el pedido de agua no quemo el dia.
const rPizzaMismoDia = pedir([{ producto_id: CARA, cantidad: 1 }, { producto_id: AGUA, cantidad: 1 }],
  { cuando: diaMixto, tel: TEL_AGUA });
comparar('la pizza del mismo dia si sella', rPizzaMismoDia.tarjeta.dias, 1);

console.log('\nEL CANJE EXIGE QUE QUEDE UNA PIZZA COBRADA');
const TEL_C = '5588888888';
let guardaC = 0;
while (tarjetaDe(TEL_C).dias < PREMIOS.pizza.dia) {
  if (++guardaC > 40) throw new Error('no llegue al dia 9 con TEL_C');
  pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_C });
}
comparar('listo en el dia 9', tarjetaDe(TEL_C).pizza, true);

const rSola = pedir([{ producto_id: PIZZA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_C, usarPremio: 'pizza' });
comparar('la Traviesa gratis SOLA no se canjea', rSola.premio, null);
comparar('y por lo tanto se cobra', totalDe(rSola.folio), CATALOGO.productos[PIZZA].precio);
comparar('el premio sigue guardado', tarjetaDe(TEL_C).pizza, true);

const rConAgua = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: AGUA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_C, usarPremio: 'pizza' });
comparar('la Traviesa gratis mas un agua tampoco', rConAgua.premio, null);

const rDosUnidades = pedir([{ producto_id: PIZZA, cantidad: 2 }],
  { cuando: diaAbierto(), tel: TEL_C, usarPremio: 'pizza' });
comparar('dos Traviesas si: una se regala y la otra se cobra',
  rDosUnidades.premio && rDosUnidades.premio.tipo, 'tarjeta:pizza');
comparar('y se cobra una sola', totalDe(rDosUnidades.folio), CATALOGO.productos[PIZZA].precio);

console.log('\nUN BROWNIE SIN RECLAMAR NO SE PIERDE');
const TEL_B = '5577777777';
let guardaB = 0;
while (tarjetaDe(TEL_B).dias < PREMIOS.pizza.dia) {
  if (++guardaB > 40) throw new Error('no llegue al dia 9 con TEL_B');
  pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_B });
}
const antesB = tarjetaDe(TEL_B);
comparar('llega al 9 con el brownie todavia sin usar', [antesB.brownie, antesB.pizza], [true, true]);

// Canjea la pizza SIN haber usado nunca el brownie: la tarjeta se cierra.
const rCierra = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: CARA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_B, usarPremio: 'pizza' });
comparar('canjeo la pizza', rCierra.premio && rCierra.premio.tipo, 'tarjeta:pizza');
comparar('el brownie SIGUE disponible en la tarjeta nueva', rCierra.tarjeta.brownie, true);
comparar('aunque la tarjeta nueva apenas empiece',
  rCierra.tarjeta.dias < PREMIOS.brownie.dia, true);

const rGasta = pedir([{ producto_id: CARA, cantidad: 1 }, { producto_id: BROWNIE, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_B, usarPremio: 'brownie' });
comparar('el brownie heredado se canjea', rGasta.premio && rGasta.premio.tipo, 'tarjeta:brownie');
comparar('y ya no vuelve a aparecer', rGasta.tarjeta.brownie, false);

console.log('\nUN PREMIO SIN RECLAMAR SE CONSERVA');
const TEL_G = '5566666666';
let guardaG = 0;
while (tarjetaDe(TEL_G).dias < PREMIOS.brownie.dia) {
  if (++guardaG > 20) throw new Error('no llegue al dia 4 con TEL_G');
  pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_G });
}
comparar('brownie disponible al dia 4', tarjetaDe(TEL_G).brownie, true);
// Tres pedidos mas sin canjear nada.
for (let k = 0; k < 3; k++) pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_G });
const gTras = tarjetaDe(TEL_G);
comparar('sigue ahi varios pedidos despues', gTras.brownie, true);
comparar('y los dias siguieron sumando', gTras.dias, PREMIOS.brownie.dia + 3);

console.log('\nSOLO SELLA LO QUE SE ENTREGA');
const TEL_E = '5555555551';
// Un pedido que se queda a medias no sella.
const rMedias = pedir([{ producto_id: CARA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_E, entregar: false });
comparar('pedido recien creado NO sella todavia', tarjetaDe(TEL_E).dias, 0);
comparar('queda marcado como pendiente', campoDe(rMedias.folio, 'sello'), 'pendiente');
comparar('y el cliente lo sabe', rMedias.selloPendiente, true);

// Al entregarlo, sella.
entregar(rMedias.folio);
comparar('al entregarlo si sella', tarjetaDe(TEL_E).dias, 1);
comparar('y ya no puede volver a contar', campoDe(rMedias.folio, 'sello'), 'contado');

// Un pedido cancelado nunca sella.
const TEL_X = '5555555552';
const rCancel = pedir([{ producto_id: CARA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_X, entregar: false });
ctx.cancelarOrden_({ folio: rCancel.folio, motivo: 'prueba' });
comparar('un pedido cancelado no sella', tarjetaDe(TEL_X).dias, 0);
comparar('y queda anulado', campoDe(rCancel.folio, 'sello'), 'no');

// Y ni siquiera se puede arrastrar a entregada: 'cancelada' no esta en el flujo.
let noAvanza = false;
try { entregar(rCancel.folio); } catch (e) { noAvanza = /ultimo estado|último estado/.test(String(e)); }
comparar('un pedido cancelado ya no se puede avanzar', noAvanza, true);
comparar('y sigue sin sellar', tarjetaDe(TEL_X).dias, 0);

console.log('\nEL PREMIO QUEDA APARTADO MIENTRAS EL PEDIDO VA EN CAMINO');
const TEL_R = '5555555553';
let guardaR = 0;
while (tarjetaDe(TEL_R).dias < PREMIOS.pizza.dia) {
  if (++guardaR > 40) throw new Error('no llegue al dia 9 con TEL_R');
  pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_R });
}
comparar('tiene su pizza gratis', tarjetaDe(TEL_R).pizza, true);

// Primer pedido con el premio, SIN entregar.
const rUno = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: CARA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_R, usarPremio: 'pizza', entregar: false });
comparar('se aplica el premio', rUno.premio && rUno.premio.tipo, 'tarjeta:pizza');
comparar('y queda apartado, no disponible', tarjetaDe(TEL_R).pizza, false);

// Segundo pedido antes de entregar el primero: ya no hay premio que dar.
const rDos = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: CARA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_R, usarPremio: 'pizza', entregar: false });
comparar('no se puede canjear dos veces', rDos.premio, null);
comparar('y el segundo se cobra completo', totalDe(rDos.folio),
  CATALOGO.productos[PIZZA].precio + CATALOGO.productos[CARA].precio);

// Si el primero se cancela, el premio se suelta.
ctx.cancelarOrden_({ folio: rUno.folio, motivo: 'prueba' });
comparar('cancelar libera el premio', tarjetaDe(TEL_R).pizza, true);

console.log('\nRECOGER EN LA COCINA');
const TEL_P = '5555555554';
const dP = diaAbierto();
const rDom = pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: dP, tel: TEL_P });
comparar('a domicilio se cobra completo', totalDe(rDom.folio), CATALOGO.productos[CARA].precio);
comparar('y se marca como domicilio', campoDe(rDom.folio, 'entrega_tipo'), 'domicilio');

const rPick = pedir([{ producto_id: CARA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_P, entrega_tipo: 'pickup' });
comparar('recogiendo se descuentan $30',
  totalDe(rPick.folio), CATALOGO.productos[CARA].precio - 30);
comparar('se marca como pickup', campoDe(rPick.folio, 'entrega_tipo'), 'pickup');
comparar('el descuento queda registrado', campoDe(rPick.folio, 'descuento'), 30);
comparar('no se guarda direccion de entrega', campoDe(rPick.folio, 'direccion'), '');
comparar('el subtotal conserva el precio de lista',
  campoDe(rPick.folio, 'subtotal'), CATALOGO.productos[CARA].precio);
comparar('recoger tambien sella', tarjetaDe(TEL_P).dias, 2);

// Sin pizza cobrada no hay descuento: un agua de $35 no puede salir en $5.
const rAguaPick = pedir([{ producto_id: AGUA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_P, entrega_tipo: 'pickup' });
comparar('un pedido sin pizza no lleva descuento por recoger',
  totalDe(rAguaPick.folio), CATALOGO.productos[AGUA].precio);

// El descuento se suma a las promociones, no compite con ellas.
const TEL_V = '5555555555';
const rMiercoles = pedir([{ producto_id: CARA, cantidad: 1 }, { producto_id: BARATA, cantidad: 1 }],
  { cuando: MIE(20), tel: TEL_V, entrega_tipo: 'pickup' });
comparar('miercoles recogiendo: 2x1 y ademas los $30',
  totalDe(rMiercoles.folio), CATALOGO.productos[CARA].precio - 30);

console.log('\nEL RECORRIDO DEPENDE DE COMO SE ENTREGA');
function recorrido(folio) {
  const pasos = [campoDe(folio, 'estado')];
  for (let i = 0; i < 8; i++) {
    const r = ctx.avanzarEstado_({ folio: folio });
    pasos.push(r.estado);
    if (r.estado === 'entregada') break;
  }
  return pasos;
}
const TEL_F = '5555555556';
const rFlujoDom = pedir([{ producto_id: CARA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_F, entregar: false });
comparar('a domicilio pasa por en camino', recorrido(rFlujoDom.folio),
  ['recibida', 'confirmada', 'horno', 'lista', 'camino', 'entregada']);

const rFlujoPick = pedir([{ producto_id: CARA, cantidad: 1 }],
  { cuando: diaAbierto(), tel: TEL_F, entrega_tipo: 'pickup', entregar: false });
comparar('recogiendo se salta el en camino', recorrido(rFlujoPick.folio),
  ['recibida', 'confirmada', 'horno', 'lista', 'entregada']);
comparar('y aun asi sella', tarjetaDe(TEL_F).dias, 2);
console.log('\nLECTURA DE FECHAS DE LA HOJA');
/* Sheets convierte '2026-09-06' en un Date. Comparar ese Date contra la cadena
   daba siempre distinto, y dos pedidos entregados el mismo dia sumaban dos
   sellos. Se encontro en produccion, no aqui: el arnes guardaba cadenas y era
   mas amable que la realidad. */
comparar('un Date de la hoja se lee como fecha',
  ctx.diaSeguro_(new Date('2026-09-06T06:00:00Z')), '2026-09-06');
comparar('una cadena se lee igual', ctx.diaSeguro_('2026-09-06'), '2026-09-06');
comparar('el apostrofe de texto de Sheets no es dato',
  ctx.diaSeguro_("'2026-09-06"), '2026-09-06');
comparar('vacio es vacio', ctx.diaSeguro_(''), '');
comparar('ida y vuelta sin perder nada',
  ctx.diaSeguro_(comoSheets(ctx.hoyCDMX_(JUE(18)))), ctx.hoyCDMX_(JUE(18)));

console.log('\nDOS ENTREGAS EL MISMO DIA VALEN UN SELLO');
const TEL_MD = '5555555557';
const dMD = diaAbierto();
pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: dMD, tel: TEL_MD });
comparar('primer pedido entregado sella', tarjetaDe(TEL_MD).dias, 1);
pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: dMD, tel: TEL_MD });
comparar('segundo pedido entregado el MISMO dia no suma', tarjetaDe(TEL_MD).dias, 1);
pedir([{ producto_id: CARA, cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_MD });
comparar('otro dia si suma', tarjetaDe(TEL_MD).dias, 2);
console.log('\nCON EL SERVICIO DE RECOGER APAGADO (COMO CORRE HOY)');
/* Todo lo anterior corrio con el servicio encendido, para que el codigo dormido
   no se pudra. Aqui se monta un servidor aparte con el interruptor como esta de
   verdad en produccion, y se comprueba que apagarlo no dejo ninguna rendija. */
const hojasOff = {};
const propsOff = {};
const ctxOff = {
  console,
  SpreadsheetApp: {
    getActiveSpreadsheet: () => ({
      getSheetByName: (n) => hojasOff[n] || null,
      insertSheet: (n) => (hojasOff[n] = Hoja([])),
      getSheets: () => Object.keys(hojasOff).map((k) => hojasOff[k]),
      getSpreadsheetTimeZone: () => 'America/Mexico_City',
    }),
  },
  Utilities: ctx.Utilities,
  LockService: ctx.LockService,
  PropertiesService: {
    getScriptProperties: () => ({
      getProperty: (k) => propsOff[k] || null,
      setProperty: (k, v) => { propsOff[k] = String(v); },
    }),
  },
  Logger: { log: () => {} },
  ContentService: ctx.ContentService,
  Date: ctx.Date,
};
vm.createContext(ctxOff);
vm.runInContext(conPickup(false), ctxOff);
Object.keys(SHEETS).forEach((k) => { hojasOff[SHEETS[k]] = Hoja([]); });
ctxOff.configurarHojas();
propsOff.FOLIO = '900';
propsOff.DIRECCION_PICKUP = 'Una direccion privada que no se debe entregar';
propsOff.TOKEN = 'token-de-prueba';  // doGet valida antes de contestar

const pedirOff = (items, tipo) => ctxOff.crearOrden_({
  canal: 'web', cliente: { telefono: '5599999999', nombre: 'Prueba' },
  direccion: 'Calle 1', colonia: 'Lomas Lindas', km: 1, pago_metodo: 'Efectivo',
  items: items, entrega_tipo: tipo,
});

RELOJ = diaAbierto();

// Un pedido a domicilio sigue funcionando igual que siempre.
const okDom = pedirOff([{ producto_id: CARA, cantidad: 1 }], 'domicilio');
comparar('a domicilio sigue funcionando', okDom.total, CATALOGO.productos[CARA].precio);
comparar('y no lleva descuento', okDom.descuento, 0);

// Pedir recoger a mano se rechaza: sin esto el descuento quedaba al alcance de
// cualquiera que armara la peticion, aunque el boton ya no exista.
let rechazado = '';
try { pedirOff([{ producto_id: CARA, cantidad: 1 }], 'pickup'); }
catch (e) { rechazado = String(e); }
comparar('un pedido para recoger se rechaza', /solo entregamos a domicilio/.test(rechazado), true);

// Y la direccion no se entrega a nadie, ni pidiendola directo.
const resp = JSON.parse(ctxOff.doGet({ parameter: { action: 'pickup', token: 'token-de-prueba' } }));
comparar('la direccion no se entrega con el servicio apagado',
  [resp.direccion, resp.descuento, resp.activo], ['', 0, false]);

console.log('\nEL FOLIO NO DELATA EL VOLUMEN DE VENTAS');
/* Antes el folio empezaba con el consecutivo (MX-0063-...), asi que cualquier
   cliente sabia cuantos pedidos llevamos. Ahora solo se ve el aleatorio y el
   consecutivo vive en su propia columna. */
const TEL_FO = '5555555558';
const folios = [];
for (let i = 0; i < 30; i++) {
  const r = pedir([{ producto_id: CARA, cantidad: 1 }],
    { cuando: diaAbierto(), tel: TEL_FO, entregar: false });
  folios.push(r.folio);
}
comparar('el folio no lleva el consecutivo',
  folios.filter((f) => /^MX-[A-Z2-9]{6}$/.test(f)).length, folios.length);
comparar('ningun folio se repite', new Set(folios).size, folios.length);
comparar('no se puede adivinar el siguiente desde el anterior',
  folios[0].slice(3) === folios[1].slice(3), false);

// El consecutivo sigue ahi, en su columna, y avanza de uno en uno.
const consecutivos = folios.map((f) => campoDe(f, 'consecutivo'));
comparar('el consecutivo avanza de uno en uno',
  consecutivos.every((c, i) => i === 0 || c === consecutivos[i - 1] + 1), true);
comparar('y no viaja al cliente',
  'consecutivo' in ctx.formaEstado_({ folio: 'x', estado: 'recibida' }), false);
/* EL HORARIO ES REGLA PARA EL CLIENTE, NO PARA LA COCINA.

   Ricardo captura por telefono antes de abrir; el token publico no puede.
   Esa asimetria es lo que se prueba aqui: si se pierde el bloqueo del publico
   vuelve el pedido de la 1:27 de la manana que motivo la validacion. */
console.log('\nHORARIO Y CAPTURA DE COCINA');
const horaCerrada = (function () {
  // Miercoles 9 a las 8 de la manana en CDMX: faltan ocho horas para abrir.
  const d = new Date('2026-09-09T14:00:00Z');
  if (ctx.estaAbierto_(d)) throw new Error('la hora elegida SI esta abierta');
  return d;
})();

let telH = 5590000000;
const intentar = (nivel, cuando) => {
  RELOJ = cuando;
  try {
    ctx.crearOrden_({
      canal: 'web', cliente: { telefono: String(++telH), nombre: 'Prueba horario' },
      direccion: 'Calle 1', colonia: 'Lomas Lindas', km: 1, pago_metodo: 'Efectivo',
      items: [{ producto_id: CARA, cantidad: 1 }],
    }, nivel);
    return 'paso';
  } catch (e) {
    return /cocina esta cerrada/i.test(String(e)) ? 'cerrada' : 'otro: ' + e;
  }
};

comparar('cerrada, el token publico no pide', intentar('publico', horaCerrada), 'cerrada');
comparar('cerrada, sin nivel tampoco', intentar(undefined, horaCerrada), 'cerrada');
comparar('cerrada, la cocina si captura', intentar('admin', horaCerrada), 'paso');
comparar('abierta, el publico pide normal', intentar('publico', diaAbierto()), 'paso');

console.log('\nCUENTA OPCIONAL');
GOOGLE.cuentas['token-bueno'] = { localId: 'uid-hugo', email: 'hugo@ejemplo.com', displayName: 'Hugo' };
GOOGLE.cuentas['token-apagado'] = { localId: 'uid-apagado', disabled: true };
GOOGLE.llamadas = 0;

comparar('sin token no se le pregunta a Google', [ctx.usuarioDeToken_(undefined), GOOGLE.llamadas], [null, 0]);
comparar('un token gigante se descarta sin preguntar', [ctx.usuarioDeToken_('x'.repeat(5000)), GOOGLE.llamadas], [null, 0]);

const u1 = ctx.usuarioDeToken_('token-bueno');
comparar('un token valido da la cuenta', u1 && u1.uid, 'uid-hugo');
comparar('y trae su correo', u1 && u1.correo, 'hugo@ejemplo.com');
const llamadasAntes = GOOGLE.llamadas;
ctx.usuarioDeToken_('token-bueno');
comparar('el mismo token no vuelve a preguntar: sale del cache', GOOGLE.llamadas, llamadasAntes);
comparar('el cache guarda la huella, nunca el token', Object.keys(CACHE).some((k) => k.indexOf('token-bueno') !== -1), false);

comparar('un token inventado no da cuenta', ctx.usuarioDeToken_('token-falso'), null);
comparar('una cuenta desactivada no da cuenta', ctx.usuarioDeToken_('token-apagado'), null);

const cuerpoToken = (token) => ({
  canal: 'Web', cliente: { telefono: '5512340000', nombre: 'Prueba cuenta' },
  direccion: 'Calle 1', colonia: 'Lomas Lindas', km: 1, pago_metodo: 'Efectivo',
  items: [{ producto_id: 'roni', cantidad: 1 }], idToken: token,
});
// Pedidos de cliente, en horario: el reloj de la prueba se pone en un dia abierto.
RELOJ = diaAbierto();
const conCuenta = ctx.crearOrden_(cuerpoToken('token-bueno'));
comparar('el pedido con cuenta guarda el uid', campoDe(conCuenta.folio, 'uid'), 'uid-hugo');
const conFalso = ctx.crearOrden_(cuerpoToken('token-falso'));
comparar('un token malo NO tumba la venta', !!conFalso.folio, true);
comparar('y el pedido entra como invitado', campoDe(conFalso.folio, 'uid'), '');
const sinCuenta = ctx.crearOrden_(cuerpoToken(undefined));
comparar('sin cuenta todo sigue igual que antes', campoDe(sinCuenta.folio, 'uid'), '');

/* La cocina capturando el pedido de otro: la cuenta abierta en la tablet es
   la de Ricardo, y no debe pegarse al pedido del cliente. */
const capturaAdmin = ctx.crearOrden_(cuerpoToken('token-bueno'), 'admin');
comparar('lo que captura la cocina no se liga a su cuenta', campoDe(capturaAdmin.folio, 'uid'), '');
const capturaWhats = ctx.crearOrden_(Object.assign(cuerpoToken('token-bueno'), { canal: 'WhatsApp' }));
comparar('ni aunque llegue por el canal WhatsApp sin token de admin', campoDe(capturaWhats.folio, 'uid'), '');

console.log('\nEL DIA ES EL DE CDMX, NO EL DE QUIEN CREO EL SCRIPT');
{
/* Hugo esta en otra zona horaria, dos horas adelante de la cocina, y el
   script hereda la suya. Se reproduce poniendo el reloj de Node en esa zona. */
const tzAntes = process.env.TZ;
process.env.TZ = 'America/New_York';
const MIE = (h, m) => new Date(Date.UTC(2026, 8, 16, h + 6, m || 0));   // miercoles, hora CDMX
RELOJ = MIE(21);
const deLaNoche = ctx.crearOrden_({
  canal: 'Web', cliente: { telefono: '5512349999', nombre: 'Prueba hora' },
  direccion: 'Calle 1', colonia: 'Lomas Lindas', km: 1, pago_metodo: 'Efectivo',
  items: [{ producto_id: 'roni', cantidad: 1 }],
});
RELOJ = MIE(22, 30);   // en Nueva York ya es jueves
const folios = ctx.listarHoy_().map((o) => o.folio);
comparar('a las 10:30 pm de CDMX sigue en el tablero el pedido de las 9', folios.includes(deLaNoche.folio), true);
RELOJ = new Date(Date.UTC(2026, 8, 17, 6 + 17));   // jueves 5 pm CDMX
comparar('al dia siguiente de CDMX ya no aparece', ctx.listarHoy_().map((o) => o.folio).includes(deLaNoche.folio), false);
if (tzAntes === undefined) delete process.env.TZ; else process.env.TZ = tzAntes;
}

console.log('\nCOBRAR UN PREMIO PIDE LA CUENTA DUENA DEL TELEFONO');
{
  // Junta cuatro sellos entregados en dias distintos y devuelve sus folios.
  const juntar4 = (tel) => {
    const folios = [];
    let g = 0;
    while (tarjetaDe(tel).dias < 4) {
      if (++g > 40) throw new Error('no llegue a 4 sellos con ' + tel);
      const d = DIA(cursor++);
      if (!ctx.estaAbierto_(d)) continue;
      folios.push(pedir([{ producto_id: 'roni', cantidad: 1 }], { cuando: d, tel }).folio);
    }
    return folios;
  };
  const TEL_K = '5544443333';
  const foliosK = juntar4(TEL_K);
  comparar('con 4 sellos la tarjeta tiene brownie', tarjetaDe(TEL_K).brownie, true);

  const conBrownie = [{ producto_id: 'roni', cantidad: 1 }, { producto_id: 'chocolatoso', cantidad: 1 }];
  const pedirCon = (tel, token, nivel, canal) => ctx.crearOrden_({
    canal: canal || 'Web', cliente: { telefono: tel, nombre: 'Prueba premio' },
    direccion: 'Calle 1', colonia: 'Lomas Lindas', km: 1, pago_metodo: 'Efectivo',
    items: conBrownie, usarPremio: 'brownie', idToken: token,
  }, nivel);

  RELOJ = diaAbierto();
  const invitado = pedirCon(TEL_K);
  comparar('un invitado no cobra el premio aunque sepa el telefono', invitado.premio, null);
  comparar('y el servidor dice por que', invitado.premioBloqueado, true);
  comparar('se cobra completo', campoDe(invitado.folio, 'total'), campoDe(invitado.folio, 'subtotal'));

  GOOGLE.cuentas['tok-k'] = { localId: 'uid-k', email: 'k@prueba.mx' };
  comparar('con cuenta pero sin ligar el telefono, tampoco', pedirCon(TEL_K, 'tok-k').premio, null);
  comparar('escribir canal WhatsApp en la peticion no basta', pedirCon(TEL_K, undefined, undefined, 'WhatsApp').premio, null);
  comparar('la tarjeta sigue intacta despues de los intentos', tarjetaDe(TEL_K).brownie, true);

  const ligar = (token, tel, folio) => {
    try { return ctx.ligarTelefono_({ idToken: token, telefono: tel, folio }); }
    catch (e) { return String(e.message || e); }
  };
  comparar('sin cuenta no se liga', /Entra con tu cuenta/.test(ligar(undefined, TEL_K, foliosK[0])), true);
  comparar('con un pedido que no se ha entregado, no', /no coincide/.test(ligar('tok-k', TEL_K, invitado.folio)), true);
  const folioAjeno = pedir([{ producto_id: 'roni', cantidad: 1 }], { cuando: diaAbierto(), tel: '5544442222' }).folio;
  comparar('con el folio de otro telefono, no', /no coincide/.test(ligar('tok-k', TEL_K, folioAjeno)), true);

  const ligado = ligar('tok-k', TEL_K, '  ' + foliosK[0].toLowerCase() + ' ');
  comparar('con el folio de un pedido entregado a ese numero, si', ligado && ligado.telefono, TEL_K);
  comparar('sin importar mayusculas ni espacios', typeof ligado, 'object');
  comparar('queda escrito en la hoja de clientes', ctx.duenoDeTelefono_(TEL_K), 'uid-k');
  comparar('repetirlo no hace dano', ligar('tok-k', TEL_K, foliosK[1]).telefono, TEL_K);
  comparar('los pedidos que hizo sin cuenta pasan a su cuenta',
    foliosK.map((f) => campoDe(f, 'uid')), foliosK.map(() => 'uid-k'));
  comparar('el de otro telefono no', campoDe(folioAjeno, 'uid'), '');

  GOOGLE.cuentas['tok-intruso'] = { localId: 'uid-intruso' };
  comparar('otra cuenta no se puede quedar con ese telefono', /ligado a otra cuenta/.test(ligar('tok-intruso', TEL_K, foliosK[1])), true);
  comparar('y una cuenta con telefono no liga un segundo', /ya tiene otro/.test(ligar('tok-k', '5544442222', folioAjeno)), true);

  RELOJ = diaAbierto();
  const cobrado = pedirCon(TEL_K, 'tok-k');
  comparar('ya ligado, el premio se cobra', cobrado.premio && cobrado.premio.tipo, 'tarjeta:brownie');
  comparar('sin aviso de bloqueo', cobrado.premioBloqueado, false);

  const mia = ctx.miCuenta_({ idToken: 'tok-k' });
  comparar('mi cuenta dice el telefono y trae la tarjeta', [mia.telefono, !!mia.tarjeta], [TEL_K, true]);
  comparar('una cuenta sin ligar no ve tarjeta', ctx.miCuenta_({ idToken: 'tok-intruso' }).telefono, '');

  // Una cuenta ligada antes de que existiera la herencia: la funcion manual
  // le recoge sus pedidos, sin pisar uno que ya trae otra cuenta.
  const TEL_V = '5544440000';
  const foliosV = [
    pedir([{ producto_id: 'roni', cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_V }).folio,
    pedir([{ producto_id: 'roni', cantidad: 1 }], { cuando: diaAbierto(), tel: TEL_V }).folio,
  ];
  {
    const filasO = hojas[SHEETS.ordenes].filas;
    const cUidO = ORDENES_HEADERS.indexOf('uid');
    filasO.find((f) => f[0] === foliosV[1])[cUidO] = 'uid-otro';
    const filasC = hojas[SHEETS.clientes].filas;
    const cUidC = CLIENTES_HEADERS.indexOf('uid');
    let fila = filasC.find((f, i) => i > 0 && String(f[0]) === TEL_V);
    if (!fila) { fila = [TEL_V]; filasC.push(fila); }
    while (fila.length <= cUidC) fila.push('');
    fila[cUidC] = 'uid-v';
  }
  ctx.heredarPedidosDeCuentas();
  comparar('la funcion manual asigna los pedidos de cuentas ya ligadas', campoDe(foliosV[0], 'uid'), 'uid-v');
  comparar('sin pisar un pedido que ya traia otra cuenta', campoDe(foliosV[1], 'uid'), 'uid-otro');
  comparar('correrla dos veces no cambia nada', ctx.heredarPedidosDeCuentas(), 0);

  const TEL_W = '5544441111';
  juntar4(TEL_W);
  RELOJ = diaAbierto();
  const cocina = pedirCon(TEL_W, undefined, 'admin', 'WhatsApp');
  comparar('la cocina lo aplica sin cuenta: el chat ya prueba de quien es el numero',
    cocina.premio && cocina.premio.tipo, 'tarjeta:brownie');

  /* Un folio tiene seis caracteres al azar y cada intento tarda segundos; aun
     asi se corta a los cinco fallos, para que nadie lo intente. */
  GOOGLE.cuentas['tok-bruto'] = { localId: 'uid-bruto' };
  for (let i = 0; i < 5; i++) ligar('tok-bruto', TEL_W, 'MX-NOEXISTE' + i);
  comparar('al sexto intento fallido se planta', /Demasiados intentos/.test(ligar('tok-bruto', TEL_W, 'MX-OTRO')), true);
}

console.log('\nAL ENTREGAR, EL TELEFONO SE LIGA SOLO A LA CUENTA QUE PIDIO');
{
  const pedirComo = (tel, token, extra) => {
    RELOJ = diaAbierto();
    const nivel = extra && extra.nivel;
    const cuerpo = Object.assign({
      canal: 'Web', cliente: { telefono: tel, nombre: 'Prueba ligar' },
      direccion: 'Calle 1', colonia: 'Lomas Lindas', km: 1, pago_metodo: 'Efectivo',
      items: [{ producto_id: 'roni', cantidad: 1 }], idToken: token,
    }, extra || {});
    delete cuerpo.nivel;
    return ctx.crearOrden_(cuerpo, nivel);
  };

  const TEL_N = '5544449999';
  GOOGLE.cuentas['tok-nuevo'] = { localId: 'uid-nuevo', email: 'nuevo@prueba.mx' };
  const primero = pedirComo(TEL_N, 'tok-nuevo');
  comparar('el pedido lleva la cuenta desde que se hace', campoDe(primero.folio, 'uid'), 'uid-nuevo');
  comparar('pero el telefono todavia no se liga: falta entregar', ctx.duenoDeTelefono_(TEL_N), '');
  entregar(primero.folio);
  comparar('al entregarse, el telefono queda ligado a esa cuenta', ctx.duenoDeTelefono_(TEL_N), 'uid-nuevo');
  comparar('y la cuenta ve su telefono', ctx.miCuenta_({ idToken: 'tok-nuevo' }).telefono, TEL_N);

  const TEL_M = '5544448888';
  entregar(pedirComo(TEL_M, 'tok-nuevo').folio);
  comparar('una cuenta con telefono no se liga un segundo', ctx.duenoDeTelefono_(TEL_M), '');
  comparar('y sigue con el suyo', ctx.miCuenta_({ idToken: 'tok-nuevo' }).telefono, TEL_N);

  GOOGLE.cuentas['tok-otro2'] = { localId: 'uid-otro2' };
  entregar(pedirComo(TEL_N, 'tok-otro2').folio);
  comparar('un telefono que ya es de otra cuenta no cambia de dueno', ctx.duenoDeTelefono_(TEL_N), 'uid-nuevo');
  comparar('ni la otra cuenta se queda con el', ctx.miCuenta_({ idToken: 'tok-otro2' }).telefono, '');

  const TEL_C = '5544447777';
  GOOGLE.cuentas['tok-cocina'] = { localId: 'uid-cocina' };
  entregar(pedirComo(TEL_C, 'tok-cocina', { canal: 'WhatsApp', nivel: 'admin' }).folio);
  comparar('lo que captura la cocina no liga nada', ctx.duenoDeTelefono_(TEL_C), '');
  comparar('ni a la cuenta de quien captura', ctx.miCuenta_({ idToken: 'tok-cocina' }).telefono, '');

  const TEL_X = '5544446666';
  GOOGLE.cuentas['tok-cancela'] = { localId: 'uid-cancela' };
  const cancelado = pedirComo(TEL_X, 'tok-cancela');
  ctx.cancelarOrden_({ folio: cancelado.folio, motivo: 'prueba' });
  comparar('un pedido cancelado no liga', ctx.duenoDeTelefono_(TEL_X), '');

  const TEL_I = '5544445555';
  entregar(pedirComo(TEL_I, undefined).folio);
  comparar('un pedido de invitado no liga', ctx.duenoDeTelefono_(TEL_I), '');
}

console.log('\n  ' + ok + ' pruebas ok, ' + mal + ' mal\n');
process.exit(mal ? 1 : 0);
