#!/usr/bin/env node
/*
 * Hace que el Centro de Ventas cargue React desde el propio dominio.
 *
 * support.js lo genera el design canvas y pide React a unpkg.com. Si ese CDN no
 * responde durante un servicio, la cocina se queda sin ver los pedidos que estan
 * entrando: pantalla en blanco, sin explicacion. Es el mismo riesgo que ya se
 * cerro en la app.
 *
 * No se reescribe el archivo generado. Su runtime expone un punto de extension
 * -- cdnScriptFor() consulta window.__resources[url] antes de ir a la red -- y
 * lo unico que se hace aqui es declarar ese mapa antes de que support.js cargue.
 * Si manana se regenera el tablero, este paso lo vuelve a inyectar.
 *
 * Lo que NO se puede quitar es 'unsafe-eval'. El runtime evalua la logica del
 * tablero con new Function() en evalDcLogic(), que es su ruta principal, no un
 * caso extremo. Y Babel nunca llega a descargarse: solo se carga si el documento
 * usa <x-import> con JSX, y este no usa ninguno.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const DOC = path.join(RAIZ, 'templates', 'sales-center', 'SalesCenter.dc.html');
const MARCA = '<!-- vendor:local -->';

const MAPA = {
  'https://unpkg.com/react@18.3.1/umd/react.production.min.js':
    '/vendor/react.production.min.js',
  'https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js':
    '/vendor/react-dom.production.min.js',
};

// Que falle el build si el runtime deja de pedir lo que creemos que pide.
const support = fs.readFileSync(
  path.join(RAIZ, 'templates', 'sales-center', 'support.js'), 'utf8');
for (const url of Object.keys(MAPA)) {
  if (!support.includes(url)) {
    throw new Error('support.js ya no referencia ' + url + '; revisar el mapa');
  }
}
if (!support.includes('window.__resources')) {
  throw new Error('support.js ya no consulta window.__resources; el mecanismo cambio');
}

for (const destino of Object.values(MAPA)) {
  const f = path.join(RAIZ, destino.replace(/^\//, ''));
  if (!fs.existsSync(f)) throw new Error('falta el archivo local ' + destino);
}

let html = fs.readFileSync(DOC, 'utf8');
const bloque = MARCA + '\n<script>\n' +
  '/* Generado por scripts/build-sales-center.js. React se sirve desde este\n' +
  '   dominio para que el tablero abra aunque el CDN no responda. */\n' +
  'window.__resources = Object.assign(window.__resources || {}, ' +
  JSON.stringify(MAPA, null, 2) + ');\n' +
  '</script>';

const RE = new RegExp(MARCA + '[\\s\\S]*?</script>');
if (RE.test(html)) {
  html = html.replace(RE, () => bloque);
} else {
  const ancla = '<script src="./support.js"';
  if (!html.includes(ancla)) throw new Error('no encontre la carga de support.js');
  html = html.replace(ancla, bloque + '\n' + ancla);
}
fs.writeFileSync(DOC, html);

console.log('  Centro de Ventas: React redirigido a /vendor/ (' +
  Object.keys(MAPA).length + ' recursos)');
