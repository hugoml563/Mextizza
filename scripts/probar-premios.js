/* Corre Code.gs en Node contra una hoja de calculo falsa.
   La logica de premios regala comida: conviene equivocarse aqui y no en la caja. */
const fs = require('fs');
const vm = require('vm');
const path = require('path');
const RAIZ = path.join(__dirname, '..');

// --- hoja de calculo en memoria -------------------------------------------
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
        f[c - 1] = v;
      },
      getValues: () => filas.slice(r - 1, r - 1 + (nr || 1)).map((f) => f.slice(c - 1, c - 1 + (nc || 1))),
      setValues: (vs) => vs.forEach((fila, i) => fila.forEach((v, j) => {
        const f = filas[r - 1 + i];
        while (f.length < c + j) f.push('');
        f[c - 1 + j] = v;
      })),
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
};
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(RAIZ, 'integration/sheets-backend/Code.gs'), 'utf8'), ctx);

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

// Jueves 10 y viernes 11 de septiembre de 2026, en horario abierto (CDMX = UTC-6).
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
function pedir(items, opts) {
  opts = opts || {};
  if (opts.cuando) RELOJ = opts.cuando;
  return ctx.crearOrden_({
    canal: 'web',
    cliente: { telefono: opts.tel || TEL, nombre: 'Prueba' },
    direccion: 'Calle 1', colonia: 'Lomas Lindas', km: 1, pago_metodo: 'Efectivo',
    items: items,
    usarPremio: opts.usarPremio,
  });
}
const totalDe = (folio) => hojas[SHEETS.ordenes].filas
  .filter((f) => f[0] === folio)[0][ORDENES_HEADERS.indexOf('total')];
const tarjeta = () => ctx.premiosDe_(ctx.leerTarjeta_(TEL));

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
comparar('viernes 19:00 es 2x1', ctx.es2x1_(VIE(19)), true);
comparar('viernes 18:00 NO es 2x1', ctx.es2x1_(VIE(18)), false);
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

console.log('\n2x1 DEL VIERNES');
const r3 = pedir([{ producto_id: CARA, cantidad: 1 }, { producto_id: BARATA, cantidad: 1 }], { cuando: VIE(19) });
comparar('regala una de las dos', r3.premio && r3.premio.tipo, '2x1');
comparar('cobra la cara, regala la barata', totalDe(r3.folio), CATALOGO.productos[CARA].precio);
const r4 = pedir([{ producto_id: CARA, cantidad: 1 }, { producto_id: postre, cantidad: 1 }], { cuando: VIE(20) });
comparar('pizza + postre NO dispara 2x1', r4.premio, null);
const r4b = pedir([{ producto_id: BARATA, cantidad: 2 }], { cuando: VIE(21) });
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
const r7 = pedir([{ producto_id: PIZZA, cantidad: 1 }], { cuando: d, usarPremio: 'pizza' });
comparar('canjea la pizza', r7.premio && r7.premio.tipo, 'tarjeta:pizza');
comparar('el pedido queda en cero', totalDe(r7.folio), 0);
comparar('resta 9, no reinicia a cero', r7.tarjeta.dias, diasAntes + 1 - 9);
comparar('el brownie se reinicia', r7.tarjeta.brownie, false);
comparar('cuenta un ciclo', r7.tarjeta.ciclos, 1);

console.log('\nLAS PROMOCIONES NO SE ACUMULAN');
acumularHasta(9, PIZZA);
const r8 = pedir([{ producto_id: PIZZA, cantidad: 1 }, { producto_id: BARATA, cantidad: 1 }],
  { cuando: VIE(21), usarPremio: 'pizza' });
const regaladas = hojas[SHEETS.ordenItems].filas.filter((f) => f[1] === r8.folio && f[8]);
comparar('viernes + tarjeta: un solo regalo', regaladas.length, 1);
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

console.log('\n  ' + ok + ' pruebas ok, ' + mal + ' mal\n');
process.exit(mal ? 1 : 0);
