#!/usr/bin/env node
/*
 * Publica el sitio en la raiz del dominio.
 *
 * El contenido vivia en /ui_kits/web/index.html y la raiz era una pagina con
 * <meta http-equiv="refresh"> que rebotaba hacia alla. La etiqueta canonical
 * declaraba https://mextizza.com/, asi que Google encontraba la ruta larga, leia
 * que su version buena era la raiz, iba a la raiz y encontraba un rebote de
 * vuelta a la ruta larga: un circulo de senales debiles. Y la URL que la gente
 * veria en resultados era la larga.
 *
 * Este script copia esa pagina a /index.html convirtiendo a rutas absolutas las
 * nueve referencias propias del HTML. Las que arma el codigo en tiempo de
 * ejecucion son "../../assets/...", que desde la raiz se recortan solas a
 * "/assets/..." porque los ".." sobrantes se ignoran, asi que no se tocan.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const ORIGEN = path.join(RAIZ, 'ui_kits', 'web', 'index.html');
const DESTINO = path.join(RAIZ, 'index.html');

// Explicitas a proposito: un reemplazo generico de "../" se comeria tambien las
// rutas de tiempo de ejecucion, que ya funcionan y no deben cambiar.
const RUTAS = [
  ['href="../../manifest.webmanifest"', 'href="/manifest.webmanifest"'],
  ['href="../../styles.css"', 'href="/styles.css"'],
  ['href="../../assets/', 'href="/assets/'],
  ['src="../../_ds_bundle.js"', 'src="/_ds_bundle.js"'],
  ['src="../menu-data.js"', 'src="/ui_kits/menu-data.js"'],
  ['src="../delivery-zone.js"', 'src="/ui_kits/delivery-zone.js"'],
  ['src="../sheets-config.js"', 'src="/ui_kits/sheets-config.js"'],
  ['src="bundle.build.js"', 'src="/ui_kits/web/bundle.build.js"'],
  ['src="../../vendor/', 'src="/vendor/'],
];

let html = fs.readFileSync(ORIGEN, 'utf8');
let n = 0;
for (const [de, a] of RUTAS) {
  if (!html.includes(de)) throw new Error('no encontre la ruta ' + de + ' en index.html');
  const antes = html;
  html = html.split(de).join(a);
  if (html !== antes) n++;
}

// Ninguna referencia propia debe quedar relativa: si queda, se rompe en la raiz.
const sobrantes = [...html.matchAll(/(?:src|href)="(\.\.?\/[^"]*)"/g)].map((m) => m[1]);
if (sobrantes.length) {
  throw new Error('quedaron rutas relativas sin convertir: ' + sobrantes.join(', '));
}

fs.writeFileSync(DESTINO, html);
console.log('  index.html en la raiz: ' + n + ' grupos de rutas convertidos a absolutas');
