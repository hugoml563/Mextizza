#!/usr/bin/env node
/*
 * Genera las paginas por intencion de busqueda.
 *
 * Todo el sitio vivia en una sola pagina, asi que "pizza a domicilio Atizapan",
 * "catering horno de lena" y "pizza del mes" competian por el mismo documento.
 * Son tres intenciones distintas y Google necesita una pagina por cada una.
 *
 * Son HTML estatico, no React: el objetivo es justamente que se lean sin
 * ejecutar codigo. Salen de menu-data.js y delivery-zone.js, las mismas fuentes
 * que usa la aplicacion, para que nunca digan un precio distinto al del carrito.
 */
const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const SITIO = 'https://mextizza.com';

global.window = {};
require(path.join(RAIZ, 'ui_kits', 'menu-data.js'));
require(path.join(RAIZ, 'ui_kits', 'delivery-zone.js'));
const { MEXTIZZA_MENU, MEXTIZZA_FACTS, MEXTIZZA_SOCIAL, MEXTIZZA_ZONE } = global.window;

const esc = (s) => {
  if (s === null || s === undefined || typeof s === 'object') {
    throw new Error('esc() recibio ' + JSON.stringify(s) + ' en vez de texto');
  }
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
};

// Distancia real, para no prometer colonias que quedan fuera del radio.
function km(c) {
  const R = 6371, r = (x) => (x * Math.PI) / 180;
  const dLat = r(c.lat - MEXTIZZA_ZONE.centro.lat);
  const dLng = r(c.lng - MEXTIZZA_ZONE.centro.lng);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(r(MEXTIZZA_ZONE.centro.lat)) * Math.cos(r(c.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const colonias = MEXTIZZA_ZONE.colonias.map((c) => ({ ...c, km: km(c) })).sort((a, b) => a.km - b.km);
const dentro = colonias.filter((c) => c.km <= MEXTIZZA_ZONE.radioKm);
const excepcion = colonias.filter((c) => c.km > MEXTIZZA_ZONE.radioKm && c.km <= MEXTIZZA_ZONE.radioMaximoKm);

const pizzas = MEXTIZZA_MENU.flatMap((g) => g.items).filter((i) => /^Pizza /.test(i.name));
const rotativa = MEXTIZZA_MENU.find((g) => /del mes/i.test(g.title));
const wa = (msg) => 'https://wa.me/' + MEXTIZZA_FACTS.whatsapp + '?text=' + encodeURIComponent(msg);

function documento({ slug, title, description, jsonld, cuerpo }) {
  const url = SITIO + '/' + slug + '/';
  return `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<link rel="icon" type="image/png" href="/assets/social/mextizza-app-icon-512.png">
<link rel="stylesheet" href="/styles.css">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Mextizza">
<meta property="og:locale" content="es_MX">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${SITIO}/assets/social/mextizza-og-1200x630.jpg">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(jsonld)}</script>
<style>
body{background:var(--blanco-hueso,#F5F0E8);color:var(--negro-carbon,#1A1A1A);margin:0;
  font-family:var(--font-body),system-ui,sans-serif}
.pg{max-width:760px;margin:0 auto;padding:28px 22px 72px}
.pg-top{display:flex;align-items:center;justify-content:space-between;gap:16px;
  padding-bottom:20px;border-bottom:1px solid rgba(26,26,26,.14);margin-bottom:34px}
.pg-top img{height:38px;width:auto;display:block}
.pg-top a{color:inherit;text-decoration:none;font-family:var(--font-label),sans-serif;
  font-size:12px;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid currentColor}
h1{font-family:var(--font-display),sans-serif;font-size:clamp(30px,6vw,44px);line-height:1.06;
  margin:0 0 16px;text-wrap:balance}
h2{font-family:var(--font-display),sans-serif;font-size:22px;margin:38px 0 12px}
p{line-height:1.65;margin:0 0 14px;max-width:64ch}
ul{margin:0 0 14px;padding:0;list-style:none;display:flex;flex-direction:column;gap:11px}
li{line-height:1.5;padding-bottom:11px;border-bottom:1px solid rgba(26,26,26,.1)}
li:last-child{border-bottom:none}
b{font-weight:700}
.dato{font-family:var(--font-label),sans-serif;font-size:12px;letter-spacing:.08em;
  text-transform:uppercase;color:var(--terracota-horno,#C1502E)}
.cta{display:inline-flex;gap:10px;flex-wrap:wrap;margin:26px 0 8px}
.cta a{display:inline-block;padding:13px 22px;border-radius:4px;text-decoration:none;
  font-family:var(--font-label),sans-serif;font-size:13px;letter-spacing:.08em;text-transform:uppercase}
.cta a.p{background:var(--rosa-mexicano,#E4007C);color:#fff}
.cta a.s{border:2px solid var(--negro-carbon,#1A1A1A);color:var(--negro-carbon,#1A1A1A)}
.pie{margin-top:52px;padding-top:20px;border-top:1px solid rgba(26,26,26,.14);font-size:13.5px;line-height:1.7}
.pie a{color:inherit}
</style>
</head>
<body>
<div class="pg">
<div class="pg-top">
  <a href="/" aria-label="Inicio de Mextizza"><img src="/assets/lockup-pala.png" alt="Mextizza"></a>
  <a href="/">Ver el menú y pedir</a>
</div>
${cuerpo}
<div class="pie">
  <b>Mextizza</b> · ${esc(MEXTIZZA_FACTS.zona)}<br>
  ${esc(MEXTIZZA_FACTS.horario.texto)}<br>
  Sólo entrega a domicilio, sin salón.<br>
  <a href="${wa('Hola, quiero hacer un pedido en Mextizza.')}">WhatsApp</a> ·
  <a href="${esc(MEXTIZZA_SOCIAL.instagram)}">Instagram</a> ·
  <a href="/">mextizza.com</a>
</div>
</div>
</body>
</html>
`;
}

const negocioBase = {
  '@type': 'Restaurant',
  name: 'Mextizza',
  servesCuisine: ['Pizza', 'Italiana', 'Mexicana'],
  priceRange: '$$',
  telephone: '+' + MEXTIZZA_FACTS.whatsapp,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Atizapán de Zaragoza',
    addressRegion: 'Estado de México',
    addressCountry: 'MX',
  },
};

// ---------------------------------------------------------------- pagina 1
const p1 = documento({
  slug: 'pizza-a-domicilio-atizapan',
  title: 'Pizza a domicilio en Atizapán de Zaragoza | Mextizza',
  description:
    'Pizza de horno de piedra con masa fermentada 48 horas, a domicilio en Lomas Lindas, ' +
    'Villas de la Hacienda, Bulevares, Las Alamedas y colonias vecinas de Atizapán. ' +
    'Envío incluido, entrega en 40 minutos o menos.',
  jsonld: {
    '@context': 'https://schema.org',
    ...negocioBase,
    areaServed: dentro.map((c) => ({ '@type': 'Place', name: c.name })),
    openingHours: 'We-Su 16:00-23:00',
    url: SITIO + '/pizza-a-domicilio-atizapan/',
  },
  cuerpo: `
<p class="dato">Reparto propio · ${esc(MEXTIZZA_FACTS.radio)}</p>
<h1>Pizza a domicilio en Atizapán de Zaragoza</h1>
<p>Somos una cocina sin salón en Col. Lomas Lindas. Hacemos pizza de horno de piedra
con masa de fermentación fría de 48 horas, y la horneamos hasta que entra tu pedido,
no antes. El envío va incluido en el precio: lo que ves en el menú es lo que pagas.</p>

<h2>Colonias donde entregamos</h2>
<p>Repartimos en un radio de ${MEXTIZZA_ZONE.radioKm} km alrededor de Lomas Lindas.
Estas son las colonias que quedan dentro, con su distancia real a la cocina:</p>
<ul>
${dentro.map((c) => `  <li><b>${esc(c.name)}</b> · a ${c.km.toFixed(1)} km</li>`).join('\n')}
</ul>
${excepcion.length ? `<p>${excepcion.map((c) => '<b>' + esc(c.name) + '</b>').join(' y ')}
quedan justo afuera del radio, entre ${MEXTIZZA_ZONE.radioKm} y ${MEXTIZZA_ZONE.radioMaximoKm} km.
No los tomamos en automático, pero escríbenos por WhatsApp y lo confirmamos a mano.</p>` : ''}

<h2>Cuánto tarda</h2>
<p>${esc(MEXTIZZA_FACTS.promesaMin)} minutos o menos, puerta a puerta. La pizza entra al
horno cuando entra tu pedido, así que ese tiempo incluye hornearla, no solo llevarla.</p>

<h2>El menú</h2>
<ul>
${pizzas.map((i) => `  <li><b>${esc(i.name)}</b> $${i.price}<br>${esc(i.desc)}</li>`).join('\n')}
</ul>

<h2>Cómo pedir</h2>
<p>Desde el sitio, eligiendo del menú y pagando en la puerta, o por WhatsApp si
prefieres escribirnos. Abrimos ${esc(MEXTIZZA_FACTS.horario.texto.toLowerCase())}.</p>
<div class="cta">
  <a class="p" href="/">Ver el menú y pedir</a>
  <a class="s" href="${wa('Hola, quiero pedir una pizza a domicilio en Atizapán.')}">Pedir por WhatsApp</a>
</div>`,
});

// ---------------------------------------------------------------- pagina 2
const cat = MEXTIZZA_FACTS.catering;
const p2 = documento({
  slug: 'catering-pizza-horno-de-lena',
  title: 'Catering de pizza con horno en tu evento | Mextizza',
  description:
    'Llevamos el horno a tu evento en Atizapán y zona norte del Estado de México. ' +
    'De ' + cat.min + ' a ' + cat.max + ' personas, $' + cat.precio + ' por persona, ' +
    'pizza recién hecha durante todo el servicio.',
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Catering de pizza con horno en sitio',
    provider: negocioBase,
    areaServed: { '@type': 'Place', name: 'Atizapán de Zaragoza y zona norte del Estado de México' },
    offers: {
      '@type': 'Offer',
      price: cat.precio,
      priceCurrency: 'MXN',
      description: 'Por persona, mínimo ' + cat.min + ' personas',
    },
    url: SITIO + '/catering-pizza-horno-de-lena/',
  },
  cuerpo: `
<p class="dato">Desde ${cat.min} personas · $${cat.precio} por persona</p>
<h1>Catering de pizza con horno en tu evento</h1>
<p>Llevamos el horno a donde estés y horneamos ahí mismo, durante todo el servicio.
Nadie come una pizza que lleva media hora esperando en una caja: sale del horno y va
a la mesa. La masa es la misma de siempre, fermentada ${esc(MEXTIZZA_FACTS.fermento.toLowerCase())}.</p>

<h2>Cómo funciona</h2>
<ul>
  <li><b>De ${cat.min} a ${cat.max} personas.</b> Abajo de ${cat.min} no sale a cuenta montar el horno.</li>
  <li><b>$${cat.precio} por persona.</b> Incluye el horno, quien lo opera y la pizza durante el servicio.</li>
  <li><b>Anticipo del ${esc(cat.anticipo)}</b> para apartar la fecha.</li>
  <li><b>Aviso de ${esc(cat.aviso)}</b> como mínimo. La masa necesita sus 48 horas, y esas no se aceleran.</li>
</ul>

<h2>Qué se necesita del lugar</h2>
<p>Un espacio al aire libre o bien ventilado para el horno, y una superficie firme y
plana donde montarlo. Nosotros llevamos todo lo demás.</p>

<h2>Dónde vamos</h2>
<p>Atizapán de Zaragoza y la zona norte del Estado de México. Si tu evento queda más
lejos, escríbenos de todos modos y lo vemos.</p>

<h2>Apartar una fecha</h2>
<p>Escríbenos con la fecha, cuántas personas y dónde sería. Te confirmamos
disponibilidad y te pasamos el detalle.</p>
<div class="cta">
  <a class="p" href="${wa('Hola, quiero cotizar catering con horno para un evento.')}">Cotizar por WhatsApp</a>
  <a class="s" href="/">Ver el menú</a>
</div>`,
});

// ---------------------------------------------------------------- pagina 3
const dm = rotativa && rotativa.items[0];
const p3 = documento({
  slug: 'pizza-del-mes',
  title: (dm ? dm.name + ': ' : '') + 'la pizza rotativa de Mextizza',
  description: dm
    ? dm.name + ', $' + dm.price + '. ' + dm.desc + ' Cambia cada mes con una combinación mexicana distinta.'
    : 'La pizza rotativa de Mextizza cambia cada mes con una combinación mexicana distinta.',
  jsonld: {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    name: dm ? dm.name : 'Pizza del mes',
    description: dm ? dm.desc : '',
    offers: { '@type': 'Offer', price: dm ? dm.price : 0, priceCurrency: 'MXN' },
    url: SITIO + '/pizza-del-mes/',
  },
  cuerpo: `
<p class="dato">Cambia cada mes</p>
<h1>${dm ? esc(dm.name) : 'La pizza del mes'}</h1>
${dm ? `<p><b>$${dm.price}.</b> ${esc(dm.desc)}</p>` : ''}

<h2>Por qué rota</h2>
<p>Mextizza viene de mestiza: técnica italiana, ingredientes de aquí. Esa idea no se
explica una vez y ya. La pizza del mes es donde la probamos en serio, con una
combinación mexicana distinta cada vez.</p>
<p>Es también la razón para volver. El resto del menú está fijo porque funciona; esta
no, y por eso vale la pena preguntar qué hay este mes.</p>

<h2>La misma base de siempre</h2>
<p>Cambia lo que va encima, no cómo se hace. Masa de ${esc(MEXTIZZA_FACTS.fermento.toLowerCase())},
horno de piedra, y sale cuando entra tu pedido.</p>

<h2>Pedirla</h2>
<p>Está en el menú mientras sea el mes. Cuando cambia, cambia de verdad: no la
guardamos "por si alguien la pide".</p>
<div class="cta">
  <a class="p" href="/">Pedir en el menú</a>
  <a class="s" href="${wa('Hola, ¿cuál es la pizza del mes?')}">Preguntar por WhatsApp</a>
</div>`,
});

for (const [slug, html] of [
  ['pizza-a-domicilio-atizapan', p1],
  ['catering-pizza-horno-de-lena', p2],
  ['pizza-del-mes', p3],
]) {
  const dir = path.join(RAIZ, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  const texto = html.replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ').trim();
  console.log('  /' + slug + '/'.padEnd(34 - slug.length) + texto.length + ' caracteres legibles sin JavaScript');
}
console.log('  colonias dentro del radio: ' + dentro.map((c) => c.name).join(', '));
