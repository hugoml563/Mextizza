/* Propuesta de logo minimalista para Mextizza: "la orilla y la rebanada".
   Genera los SVG sueltos y una hoja de presentacion (hoja.html).

   Reticula: u = 8. El simbolo mide D = 12u = 96.
     orilla (anillo): diametro exterior 96, trazo 1u = 8 (D/12)
     abertura: 45 grados, centrada arriba a la derecha (las 1:30 del reloj)
     rebanada: sector de 45 grados y radio 48, desplazada 1u hacia afuera
               sobre la bisectriz de la abertura
   Correr: node propuestas/logo-lujo/generar.js */
const fs = require('fs');
const path = require('path');

const OUT = __dirname;
const C = {
  negro: '#1A1A1A', hueso: '#F5F0E8', rosa: '#E4007C', dorado: '#D9A65C',
  terracota: '#C1502E', asfalto: '#4A4A4A'
};
const U = 8, D = 12 * U, R = D / 2, T = U, RM = R - T / 2;
const ABRE = 45, CENTRO = -45; // grados; en SVG el eje y apunta hacia abajo
const rad = (g) => (g * Math.PI) / 180;
const p = (r, g, dx = 0, dy = 0) => [(r * Math.cos(rad(g)) + dx).toFixed(3), (r * Math.sin(rad(g)) + dy).toFixed(3)];

// Anillo: arco grande que deja libre la abertura.
const a0 = CENTRO + ABRE / 2, a1 = CENTRO - ABRE / 2 + 360;
const anillo = `M${p(RM, a0)} A${RM} ${RM} 0 1 1 ${p(RM, a1)}`;
// Rebanada: sector desplazado 1u sobre la bisectriz.
const dx = U * Math.cos(rad(CENTRO)), dy = U * Math.sin(rad(CENTRO));
const s0 = CENTRO - ABRE / 2, s1 = CENTRO + ABRE / 2;
const reb = `M${p(0, 0, dx, dy)} L${p(R, s0, dx, dy)} A${R} ${R} 0 0 1 ${p(R, s1, dx, dy)} Z`;

function simbolo(orilla, rebanada) {
  return `<path d="${anillo}" fill="none" stroke="${orilla}" stroke-width="${T}" stroke-linecap="butt"/>` +
    `<path d="${reb}" fill="${rebanada}"/>`;
}

// Caja del simbolo con la rebanada desplazada: x -48..(48+dx), y (-48+dy)..48
const caja = { x: -R, y: -R + dy, w: 2 * R + dx, h: 2 * R - dy };

const FUENTE = "@font-face{font-family:'Oswald';font-weight:200 700;src:url(file:///C:/Users/hugom/Desktop/mextizza-design/vendor/fonts/v57-TK3iWkUHHAIjg752GT8G.woff2) format('woff2');}";
// Letra: Oswald Light, mayusculas, tracking 0.42em. Altura de mayuscula 3u = 24.
const PALABRA = (color, x, y, ancla = 'start') =>
  `<text x="${x}" y="${y}" fill="${color}" text-anchor="${ancla}" font-family="Oswald" font-weight="300" font-size="33" letter-spacing="13.9">MEXTIZZA</text>`;

function horizontal(fondo, orilla, rebanada, letra) {
  // Simbolo a la izquierda; palabra a 4u del borde derecho del simbolo, centrada en altura.
  const w = 500, h = 140;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
    `<defs><style>${FUENTE}</style></defs>` +
    (fondo ? `<rect width="${w}" height="${h}" fill="${fondo}"/>` : '') +
    `<g transform="translate(${22 + R} ${h / 2 - dy / 2})">${simbolo(orilla, rebanada)}</g>` +
    PALABRA(letra, 22 + caja.w + 4 * U, h / 2 + 12) + `</svg>`;
}

function vertical(fondo, orilla, rebanada, letra) {
  const w = 340, h = 230;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
    `<defs><style>${FUENTE}</style></defs>` +
    (fondo ? `<rect width="${w}" height="${h}" fill="${fondo}"/>` : '') +
    `<g transform="translate(${w / 2 - dx / 2} ${24 + R - dy})">${simbolo(orilla, rebanada)}</g>` +
    PALABRA(letra, w / 2 + 7, 24 + caja.h + 4 * U + 24, 'middle') + `</svg>`;
}

function icono(fondo, orilla, rebanada) {
  const w = 160; // el simbolo ocupa 60% del icono
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${w}" width="${w}" height="${w}">` +
    `<rect width="${w}" height="${w}" rx="36" fill="${fondo}"/>` +
    `<g transform="translate(${w / 2 - dx / 2} ${w / 2 - dy / 2})">${simbolo(orilla, rebanada)}</g></svg>`;
}

function construccion() {
  const w = 360, h = 300, ox = 150, oy = 160;
  let g = '';
  for (let x = -7; x <= 7; x++) g += `<line x1="${ox + x * U}" y1="${oy - 9 * U}" x2="${ox + x * U}" y2="${oy + 7 * U}" stroke="#E2D9C9" stroke-width=".6"/>`;
  for (let y = -9; y <= 7; y++) g += `<line x1="${ox - 7 * U}" y1="${oy + y * U}" x2="${ox + 7 * U}" y2="${oy + y * U}" stroke="#E2D9C9" stroke-width=".6"/>`;
  const t = (x, y, s) => `<text x="${x}" y="${y}" font-family="Oswald" font-size="11" fill="${C.asfalto}">${s}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
    `<defs><style>${FUENTE}</style></defs><rect width="${w}" height="${h}" fill="${C.hueso}"/>${g}` +
    `<g transform="translate(${ox} ${oy})" opacity=".9">${simbolo(C.negro, C.rosa)}` +
    `<circle r="${R}" fill="none" stroke="${C.rosa}" stroke-width=".6" stroke-dasharray="3 3"/>` +
    `<line x1="0" y1="0" x2="${p(R + 22, CENTRO)[0]}" y2="${p(R + 22, CENTRO)[1]}" stroke="${C.asfalto}" stroke-width=".6" stroke-dasharray="2 2"/></g>` +
    t(ox - R, oy + R + 26, 'D = 12u = 96') + t(ox + R + 14, oy + 6, 'trazo 1u = D/12') +
    t(ox + 46, oy - R - 22, 'abertura 45°, desplazada 1u') + t(14, 24, 'u = 8') + `</svg>`;
}

const piezas = {
  'mextizza-horizontal.svg': horizontal(null, C.negro, C.rosa, C.negro),
  'mextizza-horizontal-inverso.svg': horizontal(C.negro, C.hueso, C.rosa, C.hueso),
  'mextizza-horizontal-dorado.svg': horizontal(C.negro, C.dorado, C.dorado, C.dorado),
  'mextizza-vertical.svg': vertical(null, C.negro, C.rosa, C.negro),
  'mextizza-simbolo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${caja.x} ${caja.y} ${caja.w} ${caja.h}">${simbolo(C.negro, C.rosa)}</svg>`,
  'mextizza-icono.svg': icono(C.negro, C.hueso, C.rosa)
};
for (const [n, s] of Object.entries(piezas)) fs.writeFileSync(path.join(OUT, n), s);

const tarjeta = (titulo, svg, fondo, nota) =>
  `<figure style="background:${fondo}"><div class="lienzo">${svg}</div><figcaption><b>${titulo}</b>${nota ? '<br>' + nota : ''}</figcaption></figure>`;
const muestra = (n, hex, uso) => `<div class="m"><span style="background:${hex}"></span><b>${n}</b><code>${hex}</code><small>${uso}</small></div>`;

fs.writeFileSync(path.join(OUT, 'hoja.html'), `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Mextizza · logo</title>
<style>${FUENTE}
*{box-sizing:border-box;margin:0;padding:0}
body{width:1600px;background:${C.hueso};font-family:Oswald,sans-serif;color:${C.negro};padding:64px}
h1{font-weight:300;font-size:40px;letter-spacing:.3em}
.sub{color:${C.asfalto};font-weight:300;font-size:20px;margin:10px 0 40px;letter-spacing:.05em}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
figure{border-radius:6px;overflow:hidden;border:1px solid #E2D9C9}
.lienzo{height:300px;display:grid;place-items:center}
figcaption{background:#fff;padding:14px 18px;font-weight:300;font-size:16px;color:${C.asfalto}}
figcaption b{font-weight:500;color:${C.negro}}
.pal{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;margin-top:40px}
.m{background:#fff;border:1px solid #E2D9C9;border-radius:6px;padding:0 0 14px;overflow:hidden;font-weight:300}
.m span{display:block;height:90px;margin-bottom:12px}
.m b,.m code,.m small{display:block;padding:0 16px}.m b{font-weight:500}.m code{font-size:15px;color:${C.asfalto}}.m small{font-size:13px;color:#6b6b6b;margin-top:4px}
</style></head><body>
<h1>MEXTIZZA</h1><div class="sub">La orilla y la rebanada · propuesta de logo minimalista</div>
<div class="grid">
${tarjeta('Principal', piezas['mextizza-horizontal.svg'], C.hueso, 'Negro carbón y rosa mexicano sobre hueso')}
${tarjeta('Inverso', piezas['mextizza-horizontal-inverso.svg'].replace(/<rect[^>]*\/>/, ''), C.negro, 'Hueso y rosa sobre negro carbón')}
${tarjeta('Dorado', piezas['mextizza-horizontal-dorado.svg'].replace(/<rect[^>]*\/>/, ''), C.negro, 'Una tinta: dorado masa. Cajas, sellos y catering')}
${tarjeta('Vertical', piezas['mextizza-vertical.svg'], C.hueso, 'Para formatos cuadrados y de pie')}
${tarjeta('Ícono de app y perfil', piezas['mextizza-icono.svg'], C.hueso, 'Solo el símbolo, al 60% del cuadro')}
${tarjeta('Construcción', construccion(), C.hueso, 'Retícula de 8: todo es múltiplo de u')}
</div>
<div class="pal">
${muestra('Negro carbón', C.negro, 'Orilla y letra')}
${muestra('Rosa mexicano', C.rosa, 'La rebanada. Nunca en la letra')}
${muestra('Blanco hueso', C.hueso, 'Fondo; orilla en inverso')}
${muestra('Dorado masa', C.dorado, 'Versión de una tinta, de lujo')}
${muestra('Terracota horno', C.terracota, 'No va en el logo: queda para precios')}
</div></body></html>`);
console.log('listo:', Object.keys(piezas).join(', '), '+ hoja.html');
