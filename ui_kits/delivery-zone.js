// Zona de reparto Mextizza — dark kitchen en Col. Lomas Lindas, Atizapán de Zaragoza.
// El plan de negocios fija un radio de reparto de 3 km.
// El centro es el centroide público de la colonia Lomas Lindas (Google Maps), a
// unos 200 m de la cocina: a propósito NO es la dirección de la cocina, que es un
// domicilio particular y no debe quedar en un repositorio público.
// Las colonias son las del catálogo del INE para Atizapán, con el centroide que da
// Google Maps (septiembre 2026). Van todas las que quedan a 5 km o menos, más
// algunas conocidas de fuera para que quien vive ahí reciba una respuesta clara.
const MEXTIZZA_ZONE = {
  centro: { lat: 19.5790, lng: -99.2550, nombre: 'Lomas Lindas, Atizapán de Zaragoza' },
  radioKm: 3,          // cobertura normal — el envío ya viene incluido en el precio
  radioMaximoKm: 5,    // franja de excepción: sólo con confirmación por WhatsApp
  // Opción del selector para quien no encuentra su colonia: se confirma a mano.
  otraColonia: 'Mi colonia no está en la lista',
  colonias: [
    { name: '1ro de Septiembre', lat: 19.5901, lng: -99.2543 },
    { name: '5 de Mayo', lat: 19.5846, lng: -99.2460 },
    { name: '6 de Octubre', lat: 19.5842, lng: -99.2602 },
    { name: 'Adolfo López Mateos', lat: 19.5877, lng: -99.2644 },
    { name: 'Adolfo López Mateos Los Olivos', lat: 19.5870, lng: -99.2716 },
    { name: 'Adolfo López Mateos María Luisa', lat: 19.5908, lng: -99.2682 },
    { name: 'Ahuehuetes', lat: 19.5572, lng: -99.2335 },
    { name: 'Álamos', lat: 19.5882, lng: -99.2553 },
    { name: 'Alborada', lat: 19.5540, lng: -99.2365 },
    { name: 'Alfredo V. Bonfil', lat: 19.5805, lng: -99.2405 },
    { name: 'Atizapán 2000', lat: 19.5967, lng: -99.2463 },
    { name: 'Atizapán I', lat: 19.5608, lng: -99.2502 },
    { name: 'Atizapán Moderno', lat: 19.5514, lng: -99.2387 },
    { name: 'Balcones de Bellavista', lat: 19.5361, lng: -99.2526 },
    { name: 'Barrio Norte', lat: 19.5613, lng: -99.2550 },
    { name: 'Bosques de Atizapán', lat: 19.5598, lng: -99.2477 },
    { name: 'Bosques de Ixtacala', lat: 19.6061, lng: -99.2439 },
    { name: 'Bosques de Primavera', lat: 19.6097, lng: -99.2373 },
    { name: 'Bosques de San Martín', lat: 19.5418, lng: -99.2474 },
    { name: 'Calacoaya', lat: 19.5326, lng: -99.2437 },
    { name: 'Capistrano', lat: 19.5443, lng: -99.2411 },
    { name: 'Casa Blanca', lat: 19.5588, lng: -99.2387 },
    { name: 'Casas Lindas', lat: 19.5790, lng: -99.2550 },
    { name: 'Cerro Grande', lat: 19.5816, lng: -99.2183 },
    { name: 'Chabacanos', lat: 19.5620, lng: -99.2509 },
    { name: 'Chiluca', lat: 19.5396, lng: -99.3035 },
    { name: 'Club de Golf Bellavista', lat: 19.5240, lng: -99.2488 },
    { name: 'Club de Golf La Hacienda', lat: 19.5685, lng: -99.2301 },
    { name: 'Colinas de Atizapán', lat: 19.5660, lng: -99.2583 },
    { name: 'Colinas de Laureles', lat: 19.5568, lng: -99.2320 },
    { name: 'Colonial Atizapán', lat: 19.5628, lng: -99.2507 },
    { name: 'Comonfort', lat: 19.5607, lng: -99.2420 },
    { name: 'Condado de Sayavedra', lat: 19.5693, lng: -99.3218 },
    { name: 'Coporo', lat: 19.5589, lng: -99.2512 },
    { name: 'Demetrio Vallejo', lat: 19.5430, lng: -99.2529 },
    { name: 'Ejido San Miguel Chalma', lat: 19.6065, lng: -99.2356 },
    { name: 'El Calvario', lat: 19.5313, lng: -99.2515 },
    { name: 'El Campanario', lat: 19.5878, lng: -99.2346 },
    { name: 'El Capulín', lat: 19.5347, lng: -99.2539 },
    { name: 'El Capulín 2da Sección', lat: 19.5997, lng: -99.2456 },
    { name: 'El Cerrito', lat: 19.5825, lng: -99.2294 },
    { name: 'El Chaparral', lat: 19.5373, lng: -99.2448 },
    { name: 'El Mosco', lat: 19.5434, lng: -99.2380 },
    { name: 'El Potrero', lat: 19.5468, lng: -99.2366 },
    { name: 'El Roble', lat: 19.5618, lng: -99.2534 },
    { name: 'Emiliano Zapata', lat: 19.6023, lng: -99.2605 },
    { name: 'Ex Hacienda del Pedregal', lat: 19.5950, lng: -99.2723 },
    { name: 'FOVISSSTE', lat: 19.5602, lng: -99.2412 },
    { name: 'Fuentes de Satélite', lat: 19.5227, lng: -99.2605 },
    { name: 'General Cárdenas del Río', lat: 19.5976, lng: -99.2443 },
    { name: 'Hacienda de la Luz', lat: 19.5989, lng: -99.2252 },
    { name: 'Hacienda de Valle Escondido', lat: 19.5704, lng: -99.3077 },
    { name: 'Hacienda del Pedregal', lat: 19.5972, lng: -99.2657 },
    { name: 'Hacienda del Pedregal Herradura', lat: 19.5947, lng: -99.2706 },
    { name: 'Hogares de Atizapán', lat: 19.5907, lng: -99.2632 },
    { name: 'Ignacio López Rayón', lat: 19.5410, lng: -99.2349 },
    { name: 'Imperial de Bellavista', lat: 19.5593, lng: -99.2424 },
    { name: 'Jardines de Atizapán', lat: 19.5562, lng: -99.2384 },
    { name: 'Jardines de Monterrey', lat: 19.5925, lng: -99.2276 },
    { name: 'José María Morelos y Pavón', lat: 19.5950, lng: -99.2476 },
    { name: 'La Cañada', lat: 19.5393, lng: -99.2391 },
    { name: 'La Cima', lat: 19.5771, lng: -99.2560 },
    { name: 'La Condesa', lat: 19.5577, lng: -99.2463 },
    { name: 'La Cruz', lat: 19.5285, lng: -99.2474 },
    { name: 'La Ermita', lat: 19.5491, lng: -99.2415 },
    { name: 'La Nueva Era', lat: 19.5946, lng: -99.2456 },
    { name: 'La Palma', lat: 19.5610, lng: -99.2556 },
    { name: 'La Planada', lat: 19.5661, lng: -99.2401 },
    { name: 'Lago Esmeralda', lat: 19.5391, lng: -99.2709 },
    { name: 'Las Acacias', lat: 19.5510, lng: -99.2361 },
    { name: 'Las Águilas', lat: 19.5822, lng: -99.2495 },
    { name: 'Las Alamedas', lat: 19.5527, lng: -99.2495 },
    { name: 'Las Arboledas', lat: 19.5689, lng: -99.2218 },
    { name: 'Las Colonias', lat: 19.5617, lng: -99.2335 },
    { name: 'Las Flores', lat: 19.5450, lng: -99.2491 },
    { name: 'Las Golondrinas', lat: 19.5401, lng: -99.2436 },
    { name: 'Las Peñitas', lat: 19.5897, lng: -99.2190 },
    { name: 'Lázaro Cárdenas', lat: 19.5513, lng: -99.2335 },
    { name: 'Lomas de Atizapán', lat: 19.5520, lng: -99.2633 },
    { name: 'Lomas de Bellavista', lat: 19.5210, lng: -99.2502 },
    { name: 'Lomas de Guadalupe', lat: 19.5363, lng: -99.2405 },
    { name: 'Lomas de la Hacienda', lat: 19.5808, lng: -99.2335 },
    { name: 'Lomas de las Torres', lat: 19.5941, lng: -99.2612 },
    { name: 'Lomas de Monte María', lat: 19.5978, lng: -99.2685 },
    { name: 'Lomas de San Lorenzo', lat: 19.5542, lng: -99.2290 },
    { name: 'Lomas de San Miguel', lat: 19.5947, lng: -99.2356 },
    { name: 'Lomas de Tepalcapa', lat: 19.5892, lng: -99.2432 },
    { name: 'Lomas de Valle Escondido', lat: 19.5559, lng: -99.3021 },
    { name: 'Lomas Lindas', lat: 19.5790, lng: -99.2550 },
    { name: 'Lomas Verdes', lat: 19.5265, lng: -99.2734 },
    { name: 'Margarita Maza de Juárez', lat: 19.5892, lng: -99.2273 },
    { name: 'Mayorazgos de la Concordia', lat: 19.5622, lng: -99.2166 },
    { name: 'Mayorazgos de los Gigantes', lat: 19.5739, lng: -99.2238 },
    { name: 'Mayorazgos del Bosque', lat: 19.5591, lng: -99.2252 },
    { name: 'Mediterráneo', lat: 19.5653, lng: -99.2595 },
    { name: 'México 86', lat: 19.5918, lng: -99.2488 },
    { name: 'México Nuevo', lat: 19.5573, lng: -99.2589 },
    { name: 'Mirador las Torres', lat: 19.5946, lng: -99.2515 },
    { name: 'Miraflores', lat: 19.6001, lng: -99.2519 },
    { name: 'Morelos', lat: 19.5345, lng: -99.2460 },
    { name: 'Paseo Real', lat: 19.5623, lng: -99.2421 },
    { name: 'Pedregal de Atizapán', lat: 19.5742, lng: -99.2553 },
    { name: 'Plaza Praga', lat: 19.5625, lng: -99.2962 },
    { name: 'Porfirio Díaz', lat: 19.5596, lng: -99.2413 },
    { name: 'Prados de Ixtacala', lat: 19.5996, lng: -99.2405 },
    { name: 'Prados de Ixtacala 2da Sección', lat: 19.6040, lng: -99.2405 },
    { name: 'Profesor Cristóbal Higuera', lat: 19.5764, lng: -99.2467 },
    { name: 'Real de Atizapán', lat: 19.5614, lng: -99.2377 },
    { name: 'Real del Pedregal', lat: 19.5899, lng: -99.2815 },
    { name: 'Residencial Batel', lat: 19.5603, lng: -99.2435 },
    { name: 'Residencial Calacoaya', lat: 19.5346, lng: -99.2373 },
    { name: 'Residencial Casa Blanca II', lat: 19.5595, lng: -99.2369 },
    { name: 'Residencial La Palma', lat: 19.5606, lng: -99.2556 },
    { name: 'Residencial Real de San Francisco', lat: 19.5654, lng: -99.2573 },
    { name: 'Residencial San Mateo', lat: 19.5644, lng: -99.2450 },
    { name: 'Revolución', lat: 19.5995, lng: -99.2498 },
    { name: 'Riachuelo Lomas del Pedregal', lat: 19.5732, lng: -99.2575 },
    { name: 'Rincón de la Montaña', lat: 19.5486, lng: -99.2294 },
    { name: 'Rincón del Bosque (Coporo)', lat: 19.5605, lng: -99.2527 },
    { name: 'Ruiseñor', lat: 19.5395, lng: -99.2430 },
    { name: 'Ruiz Cortines', lat: 19.5560, lng: -99.2534 },
    { name: 'Sagitario I', lat: 19.5820, lng: -99.2609 },
    { name: 'San Antonio los Pocitos', lat: 19.5860, lng: -99.2249 },
    { name: 'San José del Jaral 1ra Sección', lat: 19.6036, lng: -99.2211 },
    { name: 'San José el Jaral', lat: 19.5954, lng: -99.2218 },
    { name: 'San José II', lat: 19.5569, lng: -99.2510 },
    { name: 'San Juan Bosco', lat: 19.5701, lng: -99.2405 },
    { name: 'San Juan Ixtacala Plano Norte', lat: 19.5938, lng: -99.2391 },
    { name: 'San Juan Ixtacala Plano Sur', lat: 19.5865, lng: -99.2377 },
    { name: 'San Martín de Porres', lat: 19.5416, lng: -99.2502 },
    { name: 'San Mateo Tecoloapan', lat: 19.5773, lng: -99.2301 },
    { name: 'San Miguel Xochimanga', lat: 19.5689, lng: -99.2145 },
    { name: 'Tierra de Enmedio', lat: 19.5929, lng: -99.2768 },
    { name: 'Torres de Atizapán', lat: 19.5597, lng: -99.2353 },
    { name: 'Valle de México', lat: 19.5568, lng: -99.2524 },
    { name: 'Vergel de Arboledas', lat: 19.5647, lng: -99.2387 },
    { name: 'Villa de las Palmas', lat: 19.5945, lng: -99.2543 },
    { name: 'Villa de las Torres', lat: 19.5946, lng: -99.2515 },
    { name: 'Villa Jardín', lat: 19.5898, lng: -99.2235 },
    { name: 'Villas de la Hacienda', lat: 19.6009, lng: -99.2301 },
    { name: 'Villas Fortuna', lat: 19.6047, lng: -99.2288 },
    { name: 'Villas San José', lat: 19.5879, lng: -99.2318 },
    { name: 'Vista Esmeralda', lat: 19.5522, lng: -99.2865 }
  ]
};

function zonaDistanciaKm(lat, lng) {
  const R = 6371, rad = d => (d * Math.PI) / 180;
  const dLat = rad(lat - MEXTIZZA_ZONE.centro.lat);
  const dLng = rad(lng - MEXTIZZA_ZONE.centro.lng);
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(MEXTIZZA_ZONE.centro.lat)) * Math.cos(rad(lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.asin(Math.sqrt(a)) * 10) / 10;
}

/** → { colonia, km, estado: 'dentro' | 'limite' | 'fuera', titulo, detalle } | null */
function zonaEvaluar(nombreColonia) {
  // Sin colonia en la lista no hay distancia que medir: se confirma a mano,
  // igual que la franja de excepción.
  if (nombreColonia === MEXTIZZA_ZONE.otraColonia) return {
    colonia: nombreColonia, km: null, estado: 'limite',
    titulo: 'Confirmamos tu dirección por WhatsApp',
    detalle: `No tenemos tu colonia en la lista. Escríbenos por WhatsApp con tu dirección y te decimos si entra en el radio de ${MEXTIZZA_ZONE.radioKm} km.`
  };
  const c =MEXTIZZA_ZONE.colonias.find(x => x.name === nombreColonia);
  if (!c) return null;
  const km = zonaDistanciaKm(c.lat, c.lng);
  if (km <= MEXTIZZA_ZONE.radioKm) return {
    colonia: c.name, km, estado: 'dentro',
    titulo: 'Dentro del radio de reparto',
    detalle: `A ${km} km de la cocina. Llega en 40 minutos o menos, con el envío ya incluido en el precio.`
  };
  if (km <= MEXTIZZA_ZONE.radioMaximoKm) return {
    colonia: c.name, km, estado: 'limite',
    titulo: 'Fuera del radio, en zona de excepción',
    detalle: `A ${km} km — el radio es de ${MEXTIZZA_ZONE.radioKm} km. No podemos procesar el pedido en automático; escríbenos por WhatsApp y lo confirmamos a mano.`
  };
  return {
    colonia: c.name, km, estado: 'fuera',
    titulo: 'Fuera de la zona de reparto',
    detalle: `A ${km} km de la cocina, muy lejos del radio de ${MEXTIZZA_ZONE.radioKm} km. Todavía no llegamos hasta allá.`
  };
}

Object.assign(window, { MEXTIZZA_ZONE, zonaDistanciaKm, zonaEvaluar });
