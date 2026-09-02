#!/usr/bin/env node
/*
 * Descarga Bungee y Oswald y las sirve desde el propio dominio.
 *
 * tokens/fonts.css hacia @import a fonts.googleapis.com, asi que cada visita
 * abria dos conexiones a dominios ajenos (googleapis para el CSS, gstatic para
 * los archivos) antes de poder pintar texto. Eso alargaba el arranque, entregaba
 * la IP de cada visitante a un tercero, y obligaba a mantener ambos dominios en
 * la CSP. En la app significaba ademas que sin internet no se veia como debe.
 *
 * Se ejecuta al construir, no en el dispositivo. Una sola copia en vendor/fonts/
 * sirve al sitio y a la app: las rutas del CSS son absolutas y en el APK la raiz
 * del webview es la raiz del paquete, asi que resuelven igual en los dos lados.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const DIR_FUENTES = path.join(RAIZ, 'vendor', 'fonts');
const CSS = path.join(RAIZ, 'tokens', 'fonts.css');

const CSS_REMOTO =
  'https://fonts.googleapis.com/css2?family=Bungee&family=Oswald:wght@200;300;400;500;600;700&display=swap';

// Google Fonts solo entrega woff2 si el user-agent lo soporta.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

async function construirFuentes() {
  const res = await fetch(CSS_REMOTO, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error('Google Fonts respondio ' + res.status);
  let css = await res.text();

  const urls = [...new Set([...css.matchAll(/url\((https:\/\/[^)]+\.woff2)\)/g)].map((m) => m[1]))];
  if (!urls.length) throw new Error('no encontre archivos woff2 en el CSS');

  fs.mkdirSync(DIR_FUENTES, { recursive: true });
  let bytes = 0;
  for (const url of urls) {
    const nombre = url.split('/').slice(-2).join('-');
    const destino = path.join(DIR_FUENTES, nombre);
    if (fs.existsSync(destino)) {
      bytes += fs.statSync(destino).size;
    } else {
      const r = await fetch(url, { headers: { 'User-Agent': UA } });
      if (!r.ok) throw new Error('no baje ' + url + ': ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      fs.writeFileSync(destino, buf);
      bytes += buf.length;
    }
    css = css.split(url).join('/vendor/fonts/' + nombre);
  }

  fs.writeFileSync(CSS,
    '/* Generado por scripts/build-fonts.js. Las fuentes se sirven desde este\n' +
    '   dominio, no desde fonts.googleapis.com: menos conexiones al arrancar, la\n' +
    '   app funciona sin internet, y la IP del visitante no viaja a un tercero. */\n\n' + css);

  return { archivos: urls.length, kb: Math.round(bytes / 1024) };
}

module.exports = { construirFuentes };

if (require.main === module) {
  construirFuentes()
    .then((r) => console.log('  fuentes: ' + r.archivos + ' archivos, ' + r.kb + ' KB, servidas localmente'))
    .catch((e) => { console.error('  fuentes: ' + e.message); process.exit(1); });
}
