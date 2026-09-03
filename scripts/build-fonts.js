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
 *
 * Este script REESCRIBE tokens/fonts.css entero. Colo Pro no viene de Google, asi
 * que si no se emitiera aqui desapareceria en la primera regeneracion: fue lo que
 * paso al vendorizar las fuentes, y todos los titulos cayeron a Oswald sin que
 * nada fallara a la vista. Por eso su @font-face se escribe desde aqui, y si el
 * archivo no esta el build se detiene en vez de publicar la marca sin su tipo.
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

// Colo Pro es la tipografia de marca (--font-display: wordmark y titulos). No
// esta en Google Fonts: el maestro es assets/fonts/ColoPro-Regular.otf y en
// vendor/fonts/ vive la copia woff2 que se sirve (97 KB -> 61 KB). Para
// regenerarla si cambia el maestro:
//   python3 -c "from fontTools.ttLib import TTFont; f=TTFont('assets/fonts/ColoPro-Regular.otf'); f.flavor='woff2'; f.save('vendor/fonts/ColoPro-Regular.woff2')"
const COLO = 'ColoPro-Regular.woff2';
const CSS_COLO =
  '/* Colo Pro — tipografia de marca, no viene de Google. Ver COLO en\n' +
  '   scripts/build-fonts.js antes de tocar este bloque. */\n' +
  '@font-face {\n' +
  "  font-family: 'Colo Pro';\n" +
  '  font-style: normal;\n' +
  '  font-weight: 400;\n' +
  '  font-display: swap;\n' +
  '  src: url(/vendor/fonts/' + COLO + ") format('woff2');\n" +
  '}\n';

async function construirFuentes() {
  // Antes de tocar la red: sin Colo Pro no hay build. Un fallo silencioso aqui
  // se ve como "la web se ve rara", no como un error, y puede durar semanas.
  const colo = path.join(DIR_FUENTES, COLO);
  if (!fs.existsSync(colo)) {
    throw new Error('falta vendor/fonts/' + COLO + ' (tipografia de marca)');
  }

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
    '   app funciona sin internet, y la IP del visitante no viaja a un tercero. */\n\n' +
    CSS_COLO + '\n' + css);

  return {
    archivos: urls.length + 1,
    kb: Math.round((bytes + fs.statSync(colo).size) / 1024),
  };
}

module.exports = { construirFuentes };

if (require.main === module) {
  construirFuentes()
    .then((r) => console.log('  fuentes: ' + r.archivos + ' archivos, ' + r.kb + ' KB, servidas localmente'))
    .catch((e) => { console.error('  fuentes: ' + e.message); process.exit(1); });
}
