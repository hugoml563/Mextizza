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
require(path.join(RAIZ, 'ui_kits', 'delivery-zone.js'));
const { MEXTIZZA_MENU, MEXTIZZA_FACTS, MEXTIZZA_SOCIAL, MEXTIZZA_ZONE } = global.window;

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

// Distancia real: la lista de colonias incluye algunas muy fuera del radio
// (Interlomas queda a 16 km), y prometerlas seria mentir.
function distanciaKm(c) {
  const R = 6371, r = (x) => (x * Math.PI) / 180;
  const dLat = r(c.lat - MEXTIZZA_ZONE.centro.lat);
  const dLng = r(c.lng - MEXTIZZA_ZONE.centro.lng);
  const h = Math.sin(dLat / 2) ** 2 +
    Math.cos(r(MEXTIZZA_ZONE.centro.lat)) * Math.cos(r(c.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function generar() {
  const p = [];
  p.push('<div class="prerender">');

  const cat = MEXTIZZA_FACTS.catering;
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

  p.push('<h2>Catering</h2>');
  p.push('<p>Horno de leña en tu evento, de ' + cat.min + ' a ' + cat.max +
    ' personas, a ' + precio(cat.precio) + ' por persona. ' +
    'Anticipo del ' + esc(cat.anticipo) + ' y aviso de ' + esc(cat.aviso) + '.</p>');

  // Los nombres de colonia son la senal mas fuerte en busqueda local, y son lo
  // que un modelo necesita para responder "quien entrega en X".
  const dentro = MEXTIZZA_ZONE.colonias
    .map((c) => ({ nombre: c.name, km: distanciaKm(c) }))
    .filter((c) => c.km <= MEXTIZZA_ZONE.radioKm)
    .sort((a, b) => a.km - b.km);

  p.push('<h2>¿En qué colonias entregan?</h2>');
  p.push('<p>Repartimos en un radio de ' + MEXTIZZA_ZONE.radioKm +
    ' km alrededor de Lomas Lindas, en Atizapán de Zaragoza: ' +
    dentro.map((c) => esc(c.nombre)).join(', ') + '.</p>');

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

  // Estos enlaces existian solo en el pie que renderiza React, asi que un
  // rastreador que no ejecuta codigo llegaba a la portada sin camino a las
  // paginas de intencion: solo las hallaba por el sitemap.
  p.push('<h2>Más sobre Mextizza</h2>');
  p.push('<ul>');
  p.push('<li><a href="/pizza-a-domicilio-atizapan/">Pizza a domicilio en Atizapán de Zaragoza</a>' +
    ' — las colonias donde entregamos y cuánto tardamos.</li>');
  p.push('<li><a href="/catering-pizza-horno-de-lena/">Catering con horno en tu evento</a>' +
    ' — de ' + cat.min + ' a ' + cat.max + ' personas, con el horno en sitio.</li>');
  p.push('<li><a href="/pizza-del-mes/">La pizza del mes</a>' +
    ' — la rotativa que cambia con una combinación mexicana distinta.</li>');
  p.push('</ul>');

  // La version rastreable no tenia ninguna imagen. Ruta absoluta a proposito:
  // funciona igual servida en / que en /ui_kits/web/index.html.
  p.push('<img src="/assets/photos/pizza-serranita-md.webp" width="600" height="600"' +
    ' alt="Pizza Serranita de Mextizza recién salida del horno de piedra">');

  p.push('</div>');
  return p.join('\n');
}

/* El schema tambien se genera aqui. Estaba escrito a mano en el HTML y se habia
   desviado de los datos: declaraba OnSitePickup cuando no hay recoleccion en
   local, y su geoMidpoint quedaba a 1.58 km del centro real de la zona. */
function schema() {
  const Z = MEXTIZZA_ZONE;
  const dentro = Z.colonias.filter((c) => distanciaKm(c) <= Z.radioKm);
  const cat = MEXTIZZA_FACTS.catering;
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    // Mismo @id que la pagina de domicilio: es un negocio, no dos.
    '@id': 'https://mextizza.com/#restaurant',
    name: 'Mextizza',
    description: 'Pizza artesanal de masa fermentada 48 horas, horneada en horno de piedra ' +
      'al momento del pedido. Cocina sin salón (dark kitchen) en Col. Lomas Lindas, ' +
      'Atizapán de Zaragoza. Radio de ' + Z.radioKm + ' km, envío incluido, entrega en ' +
      MEXTIZZA_FACTS.promesaMin + ' minutos o menos. ' + MEXTIZZA_FACTS.horario.texto + '.',
    url: 'https://mextizza.com/',
    image: 'https://mextizza.com/assets/social/mextizza-og-1200x630.jpg',
    logo: 'https://mextizza.com/assets/social/mextizza-app-icon-512.png',
    servesCuisine: ['Pizza', 'Italiana', 'Mexicana'],
    priceRange: '$$',
    currenciesAccepted: 'MXN',
    telephone: '+' + MEXTIZZA_FACTS.whatsapp,
    sameAs: [MEXTIZZA_SOCIAL.instagram, MEXTIZZA_SOCIAL.facebook].filter(Boolean),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Atizapán de Zaragoza',
      addressRegion: 'Estado de México',
      addressCountry: 'MX',
    },
    // El circulo da la geometria; los nombres dan lo que un modelo puede citar
    // cuando alguien pregunta quien entrega en su colonia.
    areaServed: [
      {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: Z.centro.lat,
          longitude: Z.centro.lng,
        },
        geoRadius: String(Z.radioKm * 1000),
      },
      ...dentro.map((c) => ({ '@type': 'Place', name: c.name })),
    ],
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '16:00',
      closes: '23:00',
    }],
    // Solo reparto propio. Antes decia OnSitePickup, que es justo lo que NO hacen.
    hasDeliveryMethod: 'https://schema.org/DeliveryModeOwnFleet',
    hasMenu: {
      '@type': 'Menu',
      hasMenuSection: MEXTIZZA_MENU.map((g) => ({
        '@type': 'MenuSection',
        name: g.title,
        hasMenuItem: g.items.map((i) => ({
          '@type': 'MenuItem',
          name: i.name,
          description: i.desc || undefined,
          offers: { '@type': 'Offer', price: i.price, priceCurrency: 'MXN' },
        })),
      })),
    },
    makesOffer: {
      '@type': 'Offer',
      name: 'Catering con horno en sitio',
      price: cat.precio,
      priceCurrency: 'MXN',
      description: 'Por persona, de ' + cat.min + ' a ' + cat.max + ' personas',
      url: 'https://mextizza.com/catering-pizza-horno-de-lena/',
    },
    potentialAction: {
      '@type': 'OrderAction',
      target: { '@type': 'EntryPoint', urlTemplate: 'https://mextizza.com/' },
      deliveryMethod: 'https://schema.org/DeliveryModeOwnFleet',
    },
  };
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
// Se sustituye el JSON-LD escrito a mano por el generado.
const ldNuevo = '<script type="application/ld+json">' + JSON.stringify(schema()) + '</' + 'script>';
// Se comprueba que el patron COINCIDA, no que el texto cambie: si el schema ya
// estaba al dia la sustitucion produce lo mismo, y compararlo daba un falso error
// que cortaba el resto del build.
const RE_LD = /<script type="application\/ld\+json">[\s\S]*?<\/script>/;
if (!RE_LD.test(html)) throw new Error('no encontre el bloque JSON-LD en index.html');
html = html.replace(RE_LD, () => ldNuevo);

fs.writeFileSync(p, html);

const texto = generar().replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const platillos = MEXTIZZA_MENU.reduce((n, g) => n + g.items.length, 0);
console.log('  index.html: ' + texto.length + ' caracteres de texto legibles sin JavaScript');
console.log('  ' + platillos + ' platillos con nombre, descripción y precio');
