#!/usr/bin/env node
/*
 * Avisa a los buscadores que participan en IndexNow que las paginas cambiaron.
 *
 * Google NO participa: para el hay que esperar a que rastree, o pedirselo en
 * Search Console. Esto sirve para Bing, y Bing es el indice detras de Copilot,
 * asi que es donde vive parte de la visibilidad en buscadores con IA.
 *
 * La clave se verifica sirviendo <clave>.txt en la raiz del dominio con la clave
 * como contenido. Sin ese archivo, el aviso se ignora.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const SITIO = 'mextizza.com';

// La clave es el nombre del unico .txt de 32 hex en la raiz.
const clave = fs.readdirSync(RAIZ).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!clave) throw new Error('no encontre el archivo de clave de IndexNow en la raiz');
const KEY = clave.replace('.txt', '');

// Las mismas URLs del sitemap, para no mantener dos listas.
const sitemap = fs.readFileSync(path.join(RAIZ, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) throw new Error('el sitemap no tiene URLs');

async function avisar() {
  const cuerpo = {
    host: SITIO,
    key: KEY,
    keyLocation: 'https://' + SITIO + '/' + clave,
    urlList: urls,
  };
  // Se envia al endpoint de Bing, no a api.indexnow.org: ese ultimo resetea la
  // conexion desde algunas redes. Los participantes de IndexNow se comparten los
  // avisos entre si, asi que avisarle a uno alcanza.
  const r = await fetch('https://www.bing.com/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(cuerpo),
  });
  // 200 = aceptado, 202 = aceptado pero la clave aun no se valida.
  console.log('  IndexNow respondio ' + r.status + ' para ' + urls.length + ' URLs');
  if (r.status !== 200 && r.status !== 202) {
    console.log('  cuerpo: ' + (await r.text()).slice(0, 200));
  }
  for (const u of urls) console.log('    ' + u);
}

avisar().catch((e) => { console.error('  ' + e.message); process.exit(1); });
