#!/usr/bin/env node
/*
 * Genera robots.txt, sitemap.xml y llms.txt.
 *
 * Los tres faltaban. Sin robots ni sitemap, Google descubre las paginas por su
 * cuenta, mas lento y sin senales de prioridad, y eso pesa en un dominio nuevo.
 *
 * llms.txt es la convencion emergente para describirle el negocio en texto plano
 * a los modelos de lenguaje. No es un estandar oficial ni garantiza que te citen,
 * pero es barato y hoy es lo unico que esos rastreadores pueden leer de ti sin
 * ejecutar codigo.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const SITIO = 'https://mextizza.com';

global.window = {};
require(path.join(RAIZ, 'ui_kits', 'menu-data.js'));
require(path.join(RAIZ, 'ui_kits', 'delivery-zone.js'));
const { MEXTIZZA_MENU, MEXTIZZA_FACTS, MEXTIZZA_SOCIAL, MEXTIZZA_ZONE } = global.window;

const hoy = new Date().toISOString().slice(0, 10);

const PAGINAS = [
  { ruta: '/', prioridad: '1.0', frecuencia: 'weekly' },
  { ruta: '/pizza-a-domicilio-atizapan/', prioridad: '0.9', frecuencia: 'monthly' },
  { ruta: '/catering-pizza-horno-de-lena/', prioridad: '0.8', frecuencia: 'monthly' },
  { ruta: '/pizza-del-mes/', prioridad: '0.8', frecuencia: 'monthly' },
];

// --------------------------------------------------------------- robots.txt
// El Centro de Ventas es el tablero interno de la cocina y /capturar es el modo
// con el que se registran pedidos de WhatsApp: ninguno tiene por que indexarse.
// ui_kits/ NO se bloquea: ahi vive el JavaScript que Google necesita ejecutar
// para renderizar la pagina, y bloquearlo seria pedirle que la juzgue a ciegas.
const robots = [
  'User-agent: *',
  'Allow: /',
  '',
  'Disallow: /templates/sales-center/',
  'Disallow: /capturar',
  'Disallow: /cocina',
  '',
  'Sitemap: ' + SITIO + '/sitemap.xml',
  '',
].join('\n');
fs.writeFileSync(path.join(RAIZ, 'robots.txt'), robots);

// -------------------------------------------------------------- sitemap.xml
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...PAGINAS.map((p) => [
    '  <url>',
    '    <loc>' + SITIO + p.ruta + '</loc>',
    '    <lastmod>' + hoy + '</lastmod>',
    '    <changefreq>' + p.frecuencia + '</changefreq>',
    '    <priority>' + p.prioridad + '</priority>',
    '  </url>',
  ].join('\n')),
  '</urlset>',
  '',
].join('\n');
fs.writeFileSync(path.join(RAIZ, 'sitemap.xml'), sitemap);

// ----------------------------------------------------------------- llms.txt
const km = (c) => {
  const R = 6371, r = (x) => (x * Math.PI) / 180;
  const dLat = r(c.lat - MEXTIZZA_ZONE.centro.lat);
  const dLng = r(c.lng - MEXTIZZA_ZONE.centro.lng);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(r(MEXTIZZA_ZONE.centro.lat)) * Math.cos(r(c.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const dentro = MEXTIZZA_ZONE.colonias.filter((c) => km(c) <= MEXTIZZA_ZONE.radioKm);
const cat = MEXTIZZA_FACTS.catering;

const llms = [
  '# Mextizza',
  '',
  '> Pizzería artesanal de horno de piedra en ' + MEXTIZZA_FACTS.zona + '.',
  '> Masa de fermentación fría de 48 horas. Sólo entrega a domicilio, sin salón.',
  '',
  '## Qué es',
  '',
  'Cocina sin salón (dark kitchen) que hace pizza de horno de piedra con técnica',
  'italiana e ingredientes mexicanos. La masa lleva 48 horas de fermentación fría',
  'y cada pizza se hornea cuando entra el pedido, no antes.',
  '',
  '## Menú y precios',
  '',
  ...MEXTIZZA_MENU.flatMap((g) => [
    '### ' + g.title,
    '',
    ...g.items.map((i) => '- **' + i.name + '** — $' + i.price + ' MXN. ' + (i.desc || '')),
    '',
  ]),
  'Hay ' + (MEXTIZZA_MENU.flatMap((g) => g.items).length) + ' productos en total.',
  'Los precios están en pesos mexicanos e incluyen el envío.',
  '',
  '## Entrega',
  '',
  '- Horario: ' + MEXTIZZA_FACTS.horario.texto,
  '- Radio de reparto: ' + MEXTIZZA_ZONE.radioKm + ' km desde ' + MEXTIZZA_ZONE.centro.nombre,
  '- Tiempo prometido: ' + MEXTIZZA_FACTS.promesaMin + ' minutos o menos, puerta a puerta',
  '- El envío está incluido en el precio de la carta',
  '- Colonias dentro del radio: ' + dentro.map((c) => c.name).join(', '),
  '- No hay servicio en el local: es exclusivamente entrega a domicilio',
  '',
  '## Catering',
  '',
  'Se lleva el horno al evento y se hornea en sitio durante todo el servicio.',
  'De ' + cat.min + ' a ' + cat.max + ' personas, a $' + cat.precio + ' MXN por persona.',
  'Requiere anticipo del ' + cat.anticipo + ' y aviso de ' + cat.aviso + ' como mínimo.',
  '',
  '## Cómo pedir',
  '',
  '- Sitio web: ' + SITIO,
  '- WhatsApp: +' + MEXTIZZA_FACTS.whatsapp,
  '- Instagram: ' + (MEXTIZZA_SOCIAL.instagram || ''),
  '',
  'Los pedidos no se pueden cancelar desde el sitio una vez confirmados; para',
  'cualquier cambio hay que escribir por WhatsApp con el número de folio.',
  '',
  '## Páginas',
  '',
  ...PAGINAS.map((p) => '- ' + SITIO + p.ruta),
  '',
].join('\n');
fs.writeFileSync(path.join(RAIZ, 'llms.txt'), llms);

console.log('  robots.txt    ' + robots.split('\n').length + ' líneas, 3 rutas internas excluidas');
console.log('  sitemap.xml   ' + PAGINAS.length + ' páginas, lastmod ' + hoy);
console.log('  llms.txt      ' + llms.length + ' caracteres para rastreadores de IA');
