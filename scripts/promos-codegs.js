/*
 * El 2x1 y los premios de la tarjeta, leidos de Code.gs, que es quien los
 * cobra. /promociones/ y llms.txt los publican desde aqui: si el servidor
 * cambia, lo publicado cambia con el, y nadie promete algo que la caja no da.
 */
const fs = require('fs');
const path = require('path');

const codeGs = fs.readFileSync(
  path.join(__dirname, '..', 'integration', 'sheets-backend', 'Code.gs'), 'utf8');

function constanteNumerica(nombre) {
  const m = codeGs.match(new RegExp('const\\s+' + nombre + '\\s*=\\s*(\\d+)\\s*;'));
  if (!m) throw new Error('No se encontro ' + nombre + ' en Code.gs');
  return Number(m[1]);
}

const DIA_2X1 = constanteNumerica('DIA_2X1');
const HORA_2X1 = constanteNumerica('HORA_2X1');

const bloquePremios = codeGs.match(/const PREMIOS = \{([\s\S]*?)\};/);
if (!bloquePremios) throw new Error('No se encontro PREMIOS en Code.gs');
const PREMIOS = {};
for (const linea of bloquePremios[1].split('\n')) {
  const m = linea.match(/(\w+)\s*:\s*\{\s*dia:\s*(\d+),\s*producto:\s*'([^']+)'/);
  if (m) PREMIOS[m[1]] = { dia: Number(m[2]), producto: m[3] };
}
if (!PREMIOS.brownie || !PREMIOS.pizza) throw new Error('PREMIOS incompleto');

const hora12 = (h) => (h > 12 ? h - 12 : h) + ':00 ' + (h >= 12 ? 'pm' : 'am');

module.exports = { DIA_2X1, HORA_2X1, PREMIOS, hora12 };
