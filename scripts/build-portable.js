#!/usr/bin/env node
/*
 * Traduce vercel.json a los archivos que entienden Cloudflare Pages y Netlify.
 *
 * Vercel ignora _headers y _redirects, asi que no estorban. Existen para que
 * mudarse sea "conectar el repo y apuntar el DNS" en vez de reconstruir toda la
 * configuracion bajo presion, el dia que haga falta.
 *
 * Se generan desde vercel.json y .vercelignore para que no se desincronicen: si
 * manana cambia una cabecera y solo se toca uno de los dos, el respaldo miente.
 *
 * Diferencia que hay que tener presente: .vercelignore no tiene equivalente en
 * esos servicios, que publican todo el directorio. Sin hacer nada, sources/,
 * integration/ y android/ quedarian abiertos al publico. Por eso cada carpeta
 * privada se traduce a una regla 404 explicita.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const cfg = JSON.parse(fs.readFileSync(path.join(RAIZ, 'vercel.json'), 'utf8'));

// ------------------------------------------------------------------ _headers
const lineas = [
  '# Generado por scripts/build-portable.js desde vercel.json. No editar a mano.',
  '# Formato de Cloudflare Pages y Netlify. Vercel lo ignora.',
  '',
];
for (const bloque of cfg.headers || []) {
  // "/(.*)" de Vercel es "/*" en este formato.
  const ruta = bloque.source === '/(.*)' ? '/*' : bloque.source;
  lineas.push(ruta);
  for (const h of bloque.headers) lineas.push('  ' + h.key + ': ' + h.value);
  lineas.push('');
}
fs.writeFileSync(path.join(RAIZ, '_headers'), lineas.join('\n'));

// ---------------------------------------------------------------- _redirects
const reglas = [
  '# Generado por scripts/build-portable.js desde vercel.json y .vercelignore.',
  '# Formato de Cloudflare Pages y Netlify. Vercel lo ignora.',
  '',
  '# Rutas cortas',
];
for (const r of cfg.redirects || []) {
  const codigo = r.permanent ? 308 : 307;
  reglas.push(r.source.padEnd(26) + ' ' + r.destination.padEnd(48) + ' ' + codigo);
}

// Lo que .vercelignore mantiene fuera del despliegue se traduce a un 404 duro,
// porque estos servicios publican el directorio completo.
const ignore = fs.readFileSync(path.join(RAIZ, '.vercelignore'), 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'));

reglas.push('', '# Equivalente de .vercelignore: estos servicios publican todo el');
reglas.push('# directorio, asi que lo privado se bloquea con una regla explicita.');
for (const entrada of ignore) {
  const patron = entrada.endsWith('/') ? '/' + entrada + '*' : '/' + entrada;
  reglas.push(patron.padEnd(26) + ' ' + '/404.html'.padEnd(48) + ' 404');
}
reglas.push('');
fs.writeFileSync(path.join(RAIZ, '_redirects'), reglas.join('\n'));

console.log('  _headers     ' + (cfg.headers || []).reduce((n, b) => n + b.headers.length, 0) + ' cabeceras');
console.log('  _redirects   ' + (cfg.redirects || []).length + ' rutas cortas + ' + ignore.length + ' bloqueos de rutas privadas');
