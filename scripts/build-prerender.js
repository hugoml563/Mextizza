#!/usr/bin/env node
/*
 * Escribe el contenido del sitio como HTML real dentro de index.html.
 *
 * El sitio lo pinta React en el navegador, asi que el archivo que viaja por la
 * red tenia 22 caracteres de texto. Google ejecuta JavaScript y termina viendolo;
 * los rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot, CCBot) no: leen el
 * HTML crudo y se van sin encontrar nada que citar.
 *
 * Este script genera ese contenido a partir de menu-data.js, la misma fuente que
 * usa la aplicacion, y lo deja dentro de #root. React lo reemplaza al montar, asi
 * que el visitante ve exactamente lo de siempre.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const INICIO = '<!--prerender:inicio-->';
const FIN = '<!--prerender:fin-->';

global.window = {};
require(path.join(RAIZ, 'ui_kits', 'menu-data.js'));
const { MEXTIZZA_MENU, MEXTIZZA_FACTS, MEXTIZZA_SOCIAL } = global.window;

// Falla ruidosamente en vez de escribir "[object Object]" en la pagina:
// varios campos de MEXTIZZA_FACTS son objetos, no cadenas.
const esc = (s) => {
  if (s === null || s === undefined || typeof s === 'object') {
    throw new Error('esc() recibio ' + JSON.stringify(s) + ' en vez de texto');
  }
  return String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

const precio = (n) => '$' + n;

function generar() {
  const p = [];
  p.push('<div class="prerender">');

  p.push('<h1>Masa de 48 horas, horneada al pedido</h1>');
  p.push('<p>Pizzería artesanal en ' + esc(MEXTIZZA_FACTS.zona) + '. ' +
    'Horno de piedra y masa de fermentación fría de 48 horas. ' +
    'Sólo entrega a domicilio, sin salón.</p>');

  for (const grupo of MEXTIZZA_MENU) {
    p.push('<h2>' + esc(grupo.title) + '</h2>');
    if (grupo.note) p.push('<p>' + esc(grupo.note) + '</p>');
    p.push('<ul>');
    for (const it of grupo.items) {
      p.push('<li><b>' + esc(it.name) + '</b> ' + precio(it.price) +
        (it.desc ? '<br>' + esc(it.desc) : '') + '</li>');
    }
    p.push('</ul>');
  }

  p.push('<h2>Cómo la hacemos</h2>');
  p.push('<p>La masa lleva ' + esc(MEXTIZZA_FACTS.fermento) +
    '. Se hornea en piedra al momento del pedido, no antes. ' + esc(MEXTIZZA_FACTS.estilo) + '</p>');

  const cat = MEXTIZZA_FACTS.catering;
  p.push('<h2>Catering</h2>');
  p.push('<p>Horno de leña en tu evento, de ' + cat.min + ' a ' + cat.max +
    ' personas, a ' + precio(cat.precio) + ' por persona. ' +
    'Anticipo del ' + esc(cat.anticipo) + ' y aviso de ' + esc(cat.aviso) + '.</p>');

  p.push('<h2>Entrega y horario</h2>');
  p.push('<ul>');
  p.push('<li>Horario: ' + esc(MEXTIZZA_FACTS.horario.texto) + '</li>');
  p.push('<li>Reparto: ' + esc(MEXTIZZA_FACTS.radio) + '</li>');
  if (MEXTIZZA_FACTS.envioIncluido) p.push('<li>Envío incluido en el precio</li>');
  p.push('<li>Entrega en ' + esc(MEXTIZZA_FACTS.promesaMin) + ' minutos o menos</li>');
  p.push('</ul>');

  p.push('<h2>Pedidos</h2>');
  p.push('<p>Por WhatsApp al <a href="https://wa.me/' + esc(MEXTIZZA_FACTS.whatsapp) +
    '">' + esc(MEXTIZZA_FACTS.whatsapp) + '</a>' +
    (MEXTIZZA_SOCIAL && MEXTIZZA_SOCIAL.instagram
      ? ', o en <a href="' + esc(MEXTIZZA_SOCIAL.instagram) + '">Instagram</a>' : '') +
    '.</p>');

  p.push('</div>');
  return p.join('\n');
}

const p = path.join(RAIZ, 'ui_kits', 'web', 'index.html');
let html = fs.readFileSync(p, 'utf8');
const bloque = INICIO + '\n' + generar() + '\n' + FIN;

if (html.includes(INICIO)) {
  html = html.replace(
    new RegExp(INICIO + '[\\s\\S]*?' + FIN),
    () => bloque
  );
} else {
  html = html.replace('<div id="root"></div>', '<div id="root">' + bloque + '</div>');
}
fs.writeFileSync(p, html);

const texto = generar().replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const platillos = MEXTIZZA_MENU.reduce((n, g) => n + g.items.length, 0);
console.log('  index.html: ' + texto.length + ' caracteres de texto legibles sin JavaScript');
console.log('  ' + platillos + ' platillos con nombre, descripción y precio');
