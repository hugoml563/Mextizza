#!/usr/bin/env node
/*
 * Descarga Bungee y Oswald y las deja dentro del build de la app.
 *
 * tokens/fonts.css hace @import a fonts.googleapis.com. En el sitio web eso esta
 * bien, pero dentro del APK significa que la app necesita internet para verse
 * como debe, y que cada arranque en frio gasta dos conexiones a un servidor
 * ajeno antes de poder pintar texto.
 *
 * Se ejecuta al construir, no en el dispositivo. Si no hay red, avisa y deja el
 * @import remoto en su lugar: la app sigue funcionando, solo cae a las fuentes
 * del sistema mientras no haya conexion.
 */
const fs = require('fs');
const path = require('path');

const CSS_REMOTO =
  'https://fonts.googleapis.com/css2?family=Bungee&family=Oswald:wght@200;300;400;500;600;700&display=swap';

// Google Fonts sirve woff2 solo si el user-agent lo soporta.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

async function construirFuentes(outDir) {
  const dirFuentes = path.join(outDir, 'tokens', 'fonts');
  const destinoCss = path.join(outDir, 'tokens', 'fonts.css');

  const res = await fetch(CSS_REMOTO, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('Google Fonts respondio ' + res.status);
  let css = await res.text();

  const urls = [...new Set([...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map(m => m[1]))];
  if (!urls.length) throw new Error('no encontre archivos woff2 en el CSS');

  fs.mkdirSync(dirFuentes, { recursive: true });
  let bytes = 0;

  for (const url of urls) {
    const nombre = url.split('/').slice(-2).join('-');
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!r.ok) throw new Error('no baje ' + url + ': ' + r.status);
    const buf = Buffer.from(await r.arrayBuffer());
    fs.writeFileSync(path.join(dirFuentes, nombre), buf);
    bytes += buf.length;
    css = css.split(url).join('fonts/' + nombre);
  }

  fs.writeFileSync(destinoCss,
    '/* Generado por scripts/build-fonts.js. Fuentes servidas desde el APK,\n' +
    '   no desde fonts.googleapis.com, para que la app abra sin internet. */\n\n' + css);

  return { archivos: urls.length, kb: Math.round(bytes / 1024) };
}

module.exports = { construirFuentes };

if (require.main === module) {
  const outDir = path.join(__dirname, '..', 'mobile-www');
  construirFuentes(outDir)
    .then(r => console.log('  fuentes: ' + r.archivos + ' archivos, ' + r.kb + ' KB, servidas localmente'))
    .catch(e => { console.error('  fuentes: ' + e.message); process.exit(1); });
}
