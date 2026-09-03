#!/usr/bin/env node
/* Generates mobile-www/index.html from ui_kits/app/mobile.html, rewriting
 * relative paths so the same source file works both served from ui_kits/app/
 * (local design-canvas preview) and copied to mobile-www/ (Capacitor webDir,
 * one directory level closer to the repo root).
 *
 * mobile-www/ is a build artifact (gitignored) — never edit it by hand.
 * Edit ui_kits/app/mobile.html or AppMobile.jsx instead, then re-run:
 *   npm run build:mobile
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const srcPath = path.join(root, 'ui_kits', 'app', 'mobile.html');
const outDir = path.join(root, 'mobile-www');

// Se borra la salida antes de reconstruir. Sin esto quedaban archivos de
// compilaciones anteriores (los .jsx sueltos, ya reemplazados por el bundle)
// viajando dentro del APK sin que nadie los pidiera.
fs.rmSync(outDir, { recursive: true, force: true });
const outPath = path.join(outDir, 'index.html');

let html = fs.readFileSync(srcPath, 'utf8');

// ui_kits/app/mobile.html paths -> mobile-www/index.html paths (one level shallower)
html = html
  .replaceAll('../../assets/', 'assets/')
  .replaceAll('../../styles.css', 'styles.css')
  .replaceAll('../../_ds_bundle.js', '_ds_bundle.js')
  .replaceAll('src="../menu-data.js"', 'src="ui_kits/menu-data.js"')
  .replaceAll('src="../delivery-zone.js"', 'src="ui_kits/delivery-zone.js"')
  .replaceAll('src="../sheets-config.js"', 'src="ui_kits/sheets-config.js"')
  .replaceAll('src="../scroll-a-faltante.js"', 'src="ui_kits/scroll-a-faltante.js"')
  .replaceAll('src="bundle.build.js"', 'src="ui_kits/app/bundle.build.js"')
  // React viaja DENTRO del APK. Antes se pedia a unpkg.com en cada arranque en
  // frio: 138 KB por la red, la app no abria sin internet, y si el CDN fallaba
  // el usuario veia una pantalla en blanco sin explicacion.
  .replace(
    /<script src="https:\/\/unpkg\.com\/react@[^"]*"[^>]*><\/script>/,
    '<script src="vendor/react.production.min.js"></script>')
  .replace(
    /<script src="https:\/\/unpkg\.com\/react-dom@[^"]*"[^>]*><\/script>/,
    '<script src="vendor/react-dom.production.min.js"></script>');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html);

// Copy everything the app actually references — no build tool bundling here,
// these are the same CDN-free static assets the web/app already use.
// Carpetas que NO deben viajar dentro del APK. assets/app/ guarda el propio
// .apk publicado para descarga web: copiarlo metia una copia de la app dentro
// de la app, 13 MB de peso muerto.
const EXCLUIDAS = new Set(['app']);

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (EXCLUIDAS.has(entry.name)) continue;
      copyDir(s, d);
    }
    else fs.copyFileSync(s, d);
  }
}
function copyFile(rel) {
  const s = path.join(root, rel);
  const d = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(d), { recursive: true });
  fs.copyFileSync(s, d);
}

// Solo viajan las imagenes que la app realmente pide. Copiar assets/ entero
// metia 6.5 MB muertos en el APK: banners de Facebook, fotos de perfil, posts
// de Instagram y los .jpg originales de fotos que ya existen en .webp.
function assetsReferenciados() {
  const usados = new Set();
  const scan = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const f = path.join(dir, e.name);
      if (e.isDirectory()) { scan(f); continue; }
      if (!/\.(html|js|jsx|css|json|webmanifest)$/i.test(e.name)) continue;
      const txt = fs.readFileSync(f, 'utf8');
      for (const m of txt.matchAll(/assets\/[A-Za-z0-9_\-./]+\.[a-z0-9]{2,5}/gi)) {
        const rel = m[0].replace(/^.*?assets\//, 'assets/');
        usados.add(rel);
        // Las variantes responsivas se arman en tiempo de ejecucion
        // (imagen.slice(0,-5) + '-thumb.webp'), no aparecen como texto.
        if (rel.endsWith('.webp')) {
          usados.add(rel.slice(0, -5) + '-thumb.webp');
          usados.add(rel.slice(0, -5) + '-md.webp');
        }
      }
    }
  };
  scan(outDir);
  scan(path.join(root, 'ui_kits'));
  return usados;
}

// El escaneo solo ve rutas escritas literalmente. Lockup arma la suya sumando
// cadenas (base + 'assets/' + archivo), asi que ningun logo se copiaba y la app
// salio sin marca. Estos van a mano porque no hay forma de detectarlos leyendo
// el codigo: si se agrega una variante de logo, hay que anotarla aqui.
const RUNTIME = [
  'assets/lockup-completo.png',
  'assets/lockup-completo-hueso.png',
  'assets/lockup-pala.png',
  'assets/lockup-pala-hueso.png',
];

let copiadas = 0, saltadas = 0;
for (const rel of new Set([...assetsReferenciados(), ...RUNTIME])) {
  const origen = path.join(root, rel);
  if (!fs.existsSync(origen)) {
    if (RUNTIME.includes(rel)) throw new Error('falta ' + rel + ' (logo que la app necesita)');
    saltadas++; continue;
  }
  const destino = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.copyFileSync(origen, destino);
  copiadas++;
}
console.log('  imagenes: ' + copiadas + ' copiadas (solo las referenciadas)');
copyDir(path.join(root, 'tokens'), path.join(outDir, 'tokens'));
copyFile('styles.css');
copyFile('_ds_bundle.js');
copyFile('ui_kits/menu-data.js');
copyFile('ui_kits/delivery-zone.js');
copyFile('ui_kits/sheets-config.js');
copyFile('ui_kits/scroll-a-faltante.js');
copyFile('ui_kits/app/bundle.build.js');

// React de produccion, desde node_modules: mismos bytes que servia el CDN
// (verificado por hash), pero ahora sin depender de una red ajena.
fs.mkdirSync(path.join(outDir, 'vendor'), { recursive: true });
copyDir(path.join(root, 'vendor', 'fonts'), path.join(outDir, 'vendor', 'fonts'));
for (const [origen, nombre] of [
  ['react/umd/react.production.min.js', 'react.production.min.js'],
  ['react-dom/umd/react-dom.production.min.js', 'react-dom.production.min.js'],
]) {
  fs.copyFileSync(
    path.join(root, 'node_modules', origen),
    path.join(outDir, 'vendor', nombre));
}

// Las fuentes tambien viajan dentro. Si no hay red al construir, se avisa y se
// deja el @import remoto: la app sigue abriendo, solo cae a fuentes del sistema.
const { construirFuentes } = require('./build-fonts.js');
construirFuentes()
  .then((r) => console.log('  fuentes: ' + r.archivos + ' archivos, ' + r.kb + ' KB, servidas localmente'))
  .catch((e) => console.warn('  AVISO fuentes: ' + e.message + ' (queda el @import remoto)'));

console.log('Built mobile-www/ from ui_kits/app/mobile.html');
