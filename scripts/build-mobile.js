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
  .replaceAll('src="bundle.build.js"', 'src="ui_kits/app/bundle.build.js"');

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outPath, html);

// Copy everything the app actually references — no build tool bundling here,
// these are the same CDN-free static assets the web/app already use.
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}
function copyFile(rel) {
  const s = path.join(root, rel);
  const d = path.join(outDir, rel);
  fs.mkdirSync(path.dirname(d), { recursive: true });
  fs.copyFileSync(s, d);
}

copyDir(path.join(root, 'assets'), path.join(outDir, 'assets'));
copyDir(path.join(root, 'tokens'), path.join(outDir, 'tokens'));
copyFile('styles.css');
copyFile('_ds_bundle.js');
copyFile('ui_kits/menu-data.js');
copyFile('ui_kits/delivery-zone.js');
copyFile('ui_kits/sheets-config.js');
copyFile('ui_kits/app/bundle.build.js');

console.log('Built mobile-www/ from ui_kits/app/mobile.html');
