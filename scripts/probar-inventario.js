#!/usr/bin/env node
/*
 * Corre el Code.gs real contra una hoja de calculo falsa, sembrada con los
 * CSV que genera build-recetas.js.
 *
 * El inventario descuenta comida de verdad: un error aqui no se ve hasta que
 * alguien cuenta el almacen y no cuadra, semanas despues. Conviene romperlo
 * en Node y no en la cocina.
 */
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
        while (filas.length < r) filas.push([]);
        const f = filas[r - 1];
        while (f.length < c) f.push('');
        f[c - 1] = v;
      },
      getValues: () => filas.slice(r - 1, r - 1 + (nr || 1))
        .map((f) => f.slice(c - 1, c - 1 + (nc || 1))),
      setValues: (vs) => vs.forEach((fila, i) => {
        while (filas.length < r + i) filas.push([]);
        fila.forEach((v, j) => {
          const f = filas[r - 1 + i];
          while (f.length < c + j) f.push('');
          f[c - 1 + j] = v;
        });
      }),
    }),
  };
}

const hojas = {};
const props = {};
const ctx = {
  console,
  SpreadsheetApp: {
    getActiveSpreadsheet: () => ({
      getSheetByName: (n) => hojas[n] || null,
      insertSheet: (n) => (hojas[n] = Hoja([])),
      getSheets: () => Object.keys(hojas).map((k) => hojas[k]),
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
      if (fmt === 'u') return String({ Mon:1,Tue:2,Wed:3,Thu:4,Fri:5,Sat:6,Sun:7 }[p.weekday]);
      throw new Error('formato no soportado: ' + fmt);
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

const ev = (expr) => vm.runInContext(expr, ctx);
const SHEETS = ev('SHEETS');
const INSUMOS_HEADERS = ev('INSUMOS_HEADERS');
const RECETAS_HEADERS = ev('RECETAS_HEADERS');
const ORDENES_HEADERS = ev('ORDENES_HEADERS');
const ORDEN_ITEMS_HEADERS = ev('ORDEN_ITEMS_HEADERS');

// --- siembra ---------------------------------------------------------------
Object.keys(SHEETS).forEach((k) => { hojas[SHEETS[k]] = Hoja([]); });
ctx.configurarHojas();

/* Se siembra con los MISMOS CSV que se pegan en produccion. Si la siembra
   trae un id mal escrito, estas pruebas lo encuentran antes que la cocina. */
function csv(nombre) {
  const p = path.join(RAIZ, 'siembra-inventario', nombre);
  if (!fs.existsSync(p)) {
    console.error('\n  Falta ' + nombre + '. Corre primero: node scripts/build-recetas.js\n');
    process.exit(1);
  }
  return fs.readFileSync(p, 'utf8').trim().split('\n').slice(1)
    .map((l) => l.match(/("([^"]|"")*"|[^,]*)/g).filter((_, i) => i % 2 === 0)
      .map((c) => c.replace(/^"|"$/g, '').replace(/""/g, '"')));
}

csv('insumos.csv').forEach((f) => {
  hojas[SHEETS.insumos].filas.push([
    f[0], f[1], f[2], f[3], f[4], Number(f[5]) || 0, Number(f[6]) || 0,
    Number(f[7]) || 0, f[8] === '' ? '' : Number(f[8]), f[9],
  ]);
});
csv('recetas.csv').forEach((f) => {
  hojas[SHEETS.recetas].filas.push([f[0], f[1], Number(f[2]), f[3]]);
});

// --- utilidades ------------------------------------------------------------
let ok = 0, mal = 0;
function comparar(etiqueta, real, esperado) {
  const bien = JSON.stringify(real) === JSON.stringify(esperado);
  if (bien) ok++; else mal++;
  console.log((bien ? '  ok   ' : '  MAL  ') + etiqueta + (bien ? '' :
    '\n         esperado ' + JSON.stringify(esperado) +
    '\n         real     ' + JSON.stringify(real)));
}
const cerca = (etiqueta, real, esperado, tol) => comparar(
  etiqueta, Math.abs(real - esperado) < (tol || 0.0001), true);

const stock = (id) => ctx.leerInsumos_()[id].stock;
const costo = (id) => ctx.leerInsumos_()[id].costo;
const poner = (id, n) => {
  const ins = ctx.leerInsumos_()[id];
  hojas[SHEETS.insumos].filas[ins.fila - 1][INSUMOS_HEADERS.indexOf('stock')] = n;
};

let folioN = 0;
function pedido(lineas) {
  const folio = 'MX-T' + (++folioN);
  const fila = {};
  ORDENES_HEADERS.forEach((h) => { fila[h] = ''; });
  fila.folio = folio; fila.estado = 'recibida'; fila.canal = 'Web';
  hojas[SHEETS.ordenes].filas.push(ORDENES_HEADERS.map((h) => fila[h]));
  lineas.forEach((l, i) => {
    const lineaId = folio + '-' + (i + 1);
    const f = {};
    ORDEN_ITEMS_HEADERS.forEach((h) => { f[h] = ''; });
    f.linea_id = lineaId; f.folio = folio;
    f.producto_id = l.id; f.cantidad = l.cant || 1; f.importe = 0;
    hojas[SHEETS.ordenItems].filas.push(ORDEN_ITEMS_HEADERS.map((h) => f[h]));
    (l.addons || []).forEach((a) => {
      hojas[SHEETS.itemComplementos].filas.push([lineaId, a, a, 0]);
    });
  });
  return folio;
}
const aHorno = (folio) => {
  ctx.avanzarEstado_({ folio });  // recibida -> confirmada
  ctx.avanzarEstado_({ folio });  // confirmada -> horno
};

// ===========================================================================
console.log('\nSIEMBRA');
const ins0 = ctx.leerInsumos_();
comparar('el catalogo carga completo', Object.keys(ins0).length, 37);
comparar('masa y salsa son preparados',
  [ins0['masa-base'].tipo, ins0['salsa-tomate'].tipo], ['preparado', 'preparado']);
comparar('la masa rinde 4.5 por lote', ins0['masa-base'].rinde, 4.5);

console.log('\nUNA PIZZA DESCUENTA SU RECETA');
poner('peperoni', 1); poner('queso-monterrey', 1);
poner('masa-base', 10); poner('salsa-tomate', 10);
poner('caja-kraft', 20); poner('sticker', 20);
aHorno(pedido([{ id: 'roni' }]));
cerca('peperoni baja 0.070', stock('peperoni'), 1 - 0.070);
cerca('queso monterrey baja 0.120', stock('queso-monterrey'), 1 - 0.120);
comparar('gasta una bola de masa', stock('masa-base'), 9);
comparar('gasta una porcion de salsa', stock('salsa-tomate'), 9);
comparar('gasta caja y sticker', [stock('caja-kraft'), stock('sticker')], [19, 19]);

console.log('\nLOS PREPARADOS NO SE EXPLOTAN AL VENDER');
poner('harina-fuerza', 5);
const harinaAntes = stock('harina-fuerza');
aHorno(pedido([{ id: 'roni' }]));
comparar('vender una pizza NO toca la harina', stock('harina-fuerza'), harinaAntes);
comparar('pero si baja la masa', stock('masa-base'), 8);

console.log('\nCANTIDAD Y COMPLEMENTOS');
poner('peperoni', 1); poner('queso-monterrey', 1);
aHorno(pedido([{ id: 'roni', cant: 3 }]));
cerca('tres pizzas gastan el triple', stock('peperoni'), 1 - 0.070 * 3);
poner('queso-provolone', 1);
aHorno(pedido([{ id: 'roni', addons: ['provolone'] }]));
cerca('el complemento gasta su insumo', stock('queso-provolone'), 1 - 0.040);

console.log('\nPRODUCIR UN LOTE DE MASA');
poner('harina-fuerza', 5); poner('agua', 5); poner('levadura', 1);
poner('azucar', 1); poner('sal', 1); poner('aoev', 1);
poner('masa-base', 0);
const r = ctx.producirLote_('masa-base', 2, ctx.leerInsumos_(), ctx.leerRecetas_());
comparar('dos lotes rinden 9 bolas', [r.lotes, r.porciones], [2, 9]);
comparar('la masa queda en 9', stock('masa-base'), 9);
cerca('consume 2 kg de harina', stock('harina-fuerza'), 3);
comparar('la bola hereda un costo', costo('masa-base') > 0, true);

console.log('\nNO SE DESCUENTA DOS VECES');
poner('peperoni', 1);
const f2 = pedido([{ id: 'roni' }]);
aHorno(f2);
const trasHorno = stock('peperoni');
ctx.avanzarEstado_({ folio: f2 });   // horno -> lista
cerca('avanzar mas no vuelve a descontar', stock('peperoni'), trasHorno);

console.log('\nSOLO DESCUENTA LO QUE SE HORNEA');
poner('peperoni', 1);
const f3 = pedido([{ id: 'roni' }]);
ctx.cancelarOrden_({ folio: f3, motivo: 'prueba' });
comparar('cancelado antes de horno no gasta nada', stock('peperoni'), 1);
poner('peperoni', 1);
const f4 = pedido([{ id: 'roni' }]);
aHorno(f4);
ctx.cancelarOrden_({ folio: f4, motivo: 'prueba' });
cerca('cancelado DESPUES de hornear si gasto', stock('peperoni'), 1 - 0.070);

console.log('\nCOSTO PROMEDIO PONDERADO');
poner('jitomate', 0);
ctx.registrarCompra_({ insumo_id: 'jitomate', cantidad: 10, importe: 200 }, ctx.leerInsumos_());
cerca('primera compra fija el costo', costo('jitomate'), 20);
ctx.registrarCompra_({ insumo_id: 'jitomate', cantidad: 10, importe: 400 }, ctx.leerInsumos_());
cerca('segunda compra pondera a 30', costo('jitomate'), 30);
comparar('y el stock suma', stock('jitomate'), 20);

console.log('\nMERMA Y CONTEO FISICO');
poner('champinones', 2);
ctx.registrarMerma_({ insumo_id: 'champinones', cantidad: 0.5, motivo: 'se echaron a perder' },
  ctx.leerInsumos_());
comparar('la merma baja el stock', stock('champinones'), 1.5);
const c = ctx.registrarConteo_({ insumo_id: 'champinones', contado: 1.2 }, ctx.leerInsumos_());
cerca('el conteo ajusta a lo contado', stock('champinones'), 1.2);
cerca('y registra la diferencia', c.diferencia, -0.3);

console.log('\nCAPACIDAD — LOS DOS HORIZONTES');
Object.keys(ctx.leerInsumos_()).forEach((id) => poner(id, 100));
poner('queso-provolone', 0.24);   // alcanza para 2 Provolas (0.120 c/u)
let cap = ctx.capacidad_(ctx.leerInsumos_(), ctx.leerRecetas_());
const prov = cap.filter((x) => x.id === 'provola')[0];
comparar('el provolone limita a 2 Provolas', prov.hoy, 2);
comparar('y el sistema dice cual insumo frena', prov.limitaHoy, 'Queso provolone');

poner('masa-base', 0);
cap = ctx.capacidad_(ctx.leerInsumos_(), ctx.leerRecetas_());
const roni = cap.filter((x) => x.id === 'roni')[0];
comparar('sin masa fermentada, hoy no se puede hacer nada', roni.hoy, 0);
comparar('el freno es la masa', roni.limitaHoy, 'Masa base NY 48h');
comparar('pero en 48 h si, porque hay harina', roni.en48h > 0, true);

/* La masa que ya esta fermentada cuenta para las 48 horas. Antes no: la cuenta
   explotaba la receta a harina y tiraba las bolas listas, asi que con masa hecha
   y cero harina prometia cero pizzas. */
Object.keys(ctx.leerInsumos_()).forEach(function (id) { poner(id, 0); });
poner('masa-base', 3); poner('salsa-tomate', 3);
poner('caja-kraft', 3); poner('sticker', 3);
poner('peperoni', 0.25); poner('queso-monterrey', 0.5);
cap = ctx.capacidad_(ctx.leerInsumos_(), ctx.leerRecetas_());
const r48 = cap.filter(function (x) { return x.id === 'roni'; })[0];
comparar('con masa lista y cero harina, hoy alcanza para 3', r48.hoy, 3);
comparar('y en 48 h siguen siendo 3, no cero', r48.en48h, 3);

// Poner harina y agua suma lotes NUEVOS a las bolas que ya estaban.
poner('harina-fuerza', 2); poner('agua', 2); poner('levadura', 1);
poner('azucar', 1); poner('sal', 1); poner('aoev', 1);
poner('peperoni', 5); poner('queso-monterrey', 5);
poner('caja-kraft', 99); poner('sticker', 99); poner('salsa-tomate', 99);
cap = ctx.capacidad_(ctx.leerInsumos_(), ctx.leerRecetas_());
const r48b = cap.filter(function (x) { return x.id === 'roni'; })[0];
comparar('hoy siguen siendo las 3 bolas de siempre', r48b.hoy, 3);
comparar('y en 48 h son esas 3 mas dos lotes de 4.5', r48b.en48h, 12);

console.log('\nCONTEO DE APERTURA');
// El libro arranca vacio: sembrar sin haber contado nada no debe inventar nada.
Object.keys(ctx.leerInsumos_()).forEach(function (id) { poner(id, 0); });
hojas[SHEETS.movimientos].filas.length = 1;
let grito = '';
try { ctx.sembrarLibroInicial(); } catch (e) { grito = String(e); }
comparar('sin nada contado se planta', /estan en cero/.test(grito), true);

poner('harina-fuerza', 8);   // 8 kg a 20
poner('peperoni', 2);        // 2 kg a 305
const ap = ctx.sembrarLibroInicial();
comparar('asienta solo lo que tiene existencia', ap.insumos, 2);
cerca('y valua la apertura', ap.valor, 8 * 20 + 2 * 305);
comparar('el saldo no se mueve, ya estaba escrito', stock('harina-fuerza'), 8);
comparar('el libro queda con dos renglones', hojas[SHEETS.movimientos].filas.length - 1, 2);

grito = '';
try { ctx.sembrarLibroInicial(); } catch (e) { grito = String(e); }
comparar('correrla dos veces se planta', /ya tiene movimientos/.test(grito), true);
comparar('y no duplico el asiento', hojas[SHEETS.movimientos].filas.length - 1, 2);


console.log('\nSUGERENCIA DE COMPRA');
/* Se fija la mezcla a una sola pizza para poder verificar la aritmetica a
   mano. Con mezcla pareja el numero sale de nueve sumandos y una prueba que
   no se puede recalcular en papel no prueba nada. */
const soloRoni = { roni: 1 };
const insA = ctx.leerInsumos_(), recA = ctx.leerRecetas_();

const d = ctx.demandaDiaria_(insA, recA, 10, soloRoni);
cerca('10 Roni gastan 0.70 de peperoni', d['peperoni'], 0.70);
cerca('y 1.20 de queso monterrey', d['queso-monterrey'], 1.20);
comparar('la masa NO aparece: es preparado', d['masa-base'], undefined);
/* 10 pizzas = 10 bolas = 10/4.5 lotes, y cada lote lleva 1 kg de harina. */
cerca('pero si aparece su harina', d['harina-fuerza'], 10 / 4.5);
/* El aceite esta en la masa (0.05/lote) y en la salsa (0.15/lote). Si no se
   sumaran, la lista de compras pediria de menos. */
cerca('el aceite suma masa y salsa',
  d['aoev'], (10 / 4.5) * 0.05 + (10 / 20) * 0.15);

const p = ctx.demandaPreparados_(insA, recA, 10, soloRoni);
cerca('en porciones, 10 pizzas son 10 bolas', p['masa-base'], 10);

console.log('\nEL PAR Y LO QUE FALTA');
Object.keys(insA).forEach((id) => poner(id, 0));
hojas[SHEETS.parametros].filas = [['clave', 'valor', 'nota'],
  ['pizzas_al_dia', 4, ''], ['dias_cobertura', 4, '']];
poner('peperoni', 0.1);   // por debajo del par, para que si pida
let r2 = ctx.sugerenciasCompra_();
const pep = r2.compras.filter((x) => x.id === 'peperoni')[0];
/* Mezcla pareja entre 9 pizzas; el peperoni esta en Roni (0.070), Traviesa
   (0.070) y Combinada (0.035), asi que 4 pizzas al dia gastan: */
const consumoPep = 4 * (0.070 + 0.070 + 0.035) / 9;
cerca('el par son 4 dias mas colchon', pep.par, consumoPep * 4 * 1.2, 0.001);
cerca('se compra la diferencia contra lo que hay', pep.comprar, consumoPep * 4 * 1.2 - 0.1, 0.001);
cerca('y dice cuantos dias aguanta', pep.dias, 0.1 / consumoPep, 0.1);

/* Tener MAS que el par no es un faltante negativo: es no comprar. */
poner('peperoni', 0.5);
comparar('con mas que el par, no se pide nada',
  ctx.sugerenciasCompra_().compras.filter((x) => x.id === 'peperoni').length, 0);

console.log('\nLO QUE SOBRA NO SE PIDE');
poner('peperoni', 99);
r2 = ctx.sugerenciasCompra_();
comparar('con bodega de sobra, el peperoni no aparece',
  r2.compras.filter((x) => x.id === 'peperoni').length, 0);

console.log('\nLA MASA SE PRODUCE, NO SE COMPRA');
comparar('nunca sale en la lista del super',
  r2.compras.filter((x) => x.id === 'masa-base').length, 0);
poner('masa-base', 0);
r2 = ctx.sugerenciasCompra_();
const masa = r2.produccion.filter((x) => x.id === 'masa-base')[0];
comparar('sale en produccion', !!masa, true);
cerca('faltan 16 bolas: 4 al dia por 4 dias', masa.faltan, 16);
comparar('que son 4 lotes de 4.5', masa.lotes, 4);

console.log('\nLOS SUPUESTOS VIAJAN CON LA RESPUESTA');
comparar('dice de donde salio el numero',
  [r2.supuestos.pizzasDia, r2.supuestos.diasCobertura], [4, 4]);
comparar('y avisa que la mezcla aun no se mide', r2.supuestos.mezclaMedida, false);

console.log('\n  ' + ok + ' pruebas ok, ' + mal + ' mal\n');
process.exit(mal ? 1 : 0);
