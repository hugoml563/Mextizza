/*
 * La fecha real en que cambio el contenido de cada pagina, para el sitemap y
 * para "Ultima actualizacion" de /promociones/.
 *
 * Antes el sitemap ponia la fecha de hoy a todas las paginas en cada build. Una
 * fecha que siempre cambia le ensena a Google a ignorarla, y entonces tampoco
 * nota cuando una pagina cambia de verdad.
 *
 * Aqui se guarda una huella (sha1) del contenido de cada pagina en
 * scripts/lastmod.json, que va en el repo. Si la huella no cambio, la fecha
 * tampoco. La primera vez, sin registro previo, la fecha sale del ultimo commit
 * que toco el archivo.
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const RAIZ = path.join(__dirname, '..');
const REGISTRO = path.join(__dirname, 'lastmod.json');

// La fecha en la Ciudad de Mexico: la cocina vive ahi, no en el reloj de quien construye.
const hoyCDMX = () => new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit',
}).format(new Date());

function leer() {
  try { return JSON.parse(fs.readFileSync(REGISTRO, 'utf8')); } catch (e) { return {}; }
}

function fechaDeGit(archivo) {
  try {
    // Con cambios todavia sin commit, el contenido nuevo es de hoy.
    const pendiente = execSync('git status --porcelain -- "' + archivo + '"',
      { cwd: RAIZ, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    if (pendiente) return null;
    const f = execSync('git log -1 --format=%cs -- "' + archivo + '"',
      { cwd: RAIZ, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(f) ? f : null;
  } catch (e) { return null; }
}

/* ruta: '/promociones/'. contenido: el texto de la pagina SIN partes que cambian
   solas (fechas de build). archivo: la ruta del html en el repo, para la fecha
   inicial. Devuelve 'AAAA-MM-DD'. */
function fechaDe(ruta, contenido, archivo) {
  const registro = leer();
  const huella = crypto.createHash('sha1').update(contenido).digest('hex');
  const previo = registro[ruta];
  if (previo && previo.huella === huella) return previo.fecha;
  const fecha = previo ? hoyCDMX() : (fechaDeGit(archivo) || hoyCDMX());
  registro[ruta] = { huella, fecha };
  const ordenado = {};
  Object.keys(registro).sort().forEach((k) => { ordenado[k] = registro[k]; });
  fs.writeFileSync(REGISTRO, JSON.stringify(ordenado, null, 2) + '\n');
  return fecha;
}

module.exports = { fechaDe };
