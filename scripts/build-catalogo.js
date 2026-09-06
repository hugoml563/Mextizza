#!/usr/bin/env node
/*
 * Escribe el catalogo de precios dentro de Code.gs.
 *
 * Hasta ahora crearOrden_ confiaba en el precio que mandaba el cliente:
 *   const importe = (Number(it.precio_unit) + complementos) * cantidad;
 * Cualquiera podia pedir ocho pizzas con precio_unit 0. Nadie lo hizo, pero el
 * sistema de recompensas hace que la tentacion valga la pena, asi que el
 * servidor tiene que poder contrastar.
 *
 * La hoja `productos` existe pero esta vacia y nada la siembra, asi que la
 * fuente sigue siendo menu-data.js — la misma que pinta el menu de la web y de
 * la app, para que un precio no pueda decir dos cosas distintas.
 *
 * Igual que HORARIO, el catalogo queda duplicado en un archivo que Apps Script
 * no puede leer. Por eso este script lo REGENERA en cada build en vez de
 * pedirle a alguien que lo copie, y build-js.js verifica que no se haya quedado
 * atras.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const CODE_GS = path.join(RAIZ, 'integration', 'sheets-backend', 'Code.gs');
const INICIO = '// <catalogo:inicio>';
const FIN = '// <catalogo:fin>';

function catalogo() {
  global.window = {};
  delete require.cache[require.resolve(path.join(RAIZ, 'ui_kits', 'menu-data.js'))];
  require(path.join(RAIZ, 'ui_kits', 'menu-data.js'));
  const { MEXTIZZA_MENU, MEXTIZZA_ADDONS } = global.window;

  const productos = {};
  for (const g of MEXTIZZA_MENU) {
    for (const it of g.items) {
      productos[it.id] = { nombre: it.name, precio: it.price, cat: g.cat };
    }
  }
  const complementos = {};
  for (const grupo of MEXTIZZA_ADDONS || []) {
    for (const a of grupo.items || []) complementos[a.id] = { nombre: a.name, precio: a.price };
  }
  return { productos, complementos };
}

function generar() {
  const { productos, complementos } = catalogo();
  const l = [];
  l.push(INICIO);
  l.push('/* GENERADO por scripts/build-catalogo.js desde ui_kits/menu-data.js.');
  l.push('   No editar a mano: el build lo reescribe y descarta los cambios.');
  l.push('   Para cambiar un precio, cambialo en menu-data.js y vuelve a construir. */');
  l.push('const CATALOGO = {');
  l.push('  productos: {');
  for (const [id, p] of Object.entries(productos)) {
    l.push("    '" + id + "': { nombre: '" + p.nombre.replace(/'/g, "\\'") +
      "', precio: " + p.precio + ", cat: '" + p.cat.replace(/'/g, "\\'") + "' },");
  }
  l.push('  },');
  l.push('  complementos: {');
  for (const [id, a] of Object.entries(complementos)) {
    l.push("    '" + id + "': { nombre: '" + a.nombre.replace(/'/g, "\\'") +
      "', precio: " + a.precio + ' },');
  }
  l.push('  },');
  l.push('};');
  l.push(FIN);
  return l.join('\n');
}

const bloque = generar();
let gs = fs.readFileSync(CODE_GS, 'utf8');

if (gs.includes(INICIO)) {
  const desde = gs.indexOf(INICIO);
  const hasta = gs.indexOf(FIN) + FIN.length;
  if (hasta < desde) throw new Error('los marcadores del catalogo estan al reves en Code.gs');
  gs = gs.slice(0, desde) + bloque + gs.slice(hasta);
} else {
  // Primera vez: se inserta justo antes de la constante del horario.
  const ancla = '/* El horario tambien se valida AQUI';
  if (!gs.includes(ancla)) throw new Error('no encontre donde insertar el catalogo en Code.gs');
  gs = gs.replace(ancla, bloque + '\n\n' + ancla);
}
fs.writeFileSync(CODE_GS, gs);

const { productos, complementos } = catalogo();
console.log('  catalogo: ' + Object.keys(productos).length + ' productos, ' +
  Object.keys(complementos).length + ' complementos escritos en Code.gs');
