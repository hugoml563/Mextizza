// Zona de reparto Mextizza — dark kitchen en Col. Lomas Lindas, Atizapán de Zaragoza.
// La cocina está en CP 52947; el plan de negocios fija un radio de reparto de 3 km.
// Las coordenadas de las colonias son aproximadas (centroide de la colonia) y sirven
// para validar cobertura en el prototipo. En producción esto se resuelve geocodificando
// la dirección capturada y midiendo contra el mismo centro y el mismo radio.
const MEXTIZZA_ZONE = {
  centro: { lat: 19.5453, lng: -99.2745, nombre: 'Lomas Lindas, Atizapán de Zaragoza' },
  radioKm: 3,          // cobertura normal — el envío ya viene incluido en el precio
  radioMaximoKm: 5,    // franja de excepción: sólo con confirmación por WhatsApp
  colonias: [
    { name: 'Lomas Lindas', lat: 19.5453, lng: -99.2745 },
    { name: 'Villas de la Hacienda', lat: 19.5492, lng: -99.2791 },
    { name: 'Las Alamedas', lat: 19.5531, lng: -99.2679 },
    { name: 'Bulevares', lat: 19.5399, lng: -99.2662 },
    { name: 'Lomas de Atizapán', lat: 19.5568, lng: -99.2829 },
    { name: 'Adolfo López Mateos (centro)', lat: 19.5561, lng: -99.2603 },
    { name: 'Calacoaya', lat: 19.5291, lng: -99.2571 },
    { name: 'Fuentes de Satélite', lat: 19.5312, lng: -99.2471 },
    { name: 'Hacienda de Valle Escondido', lat: 19.5721, lng: -99.3048 },
    { name: 'Lomas Verdes', lat: 19.5171, lng: -99.2351 },
    { name: 'Ciudad Satélite', lat: 19.5101, lng: -99.2382 },
    { name: 'Condado de Sayavedra', lat: 19.6062, lng: -99.3211 },
    { name: 'Echegaray', lat: 19.4891, lng: -99.2338 },
    { name: 'Interlomas', lat: 19.3952, lng: -99.2812 }
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
  const c = MEXTIZZA_ZONE.colonias.find(x => x.name === nombreColonia);
  if (!c) return null;
  const km = zonaDistanciaKm(c.lat, c.lng);
  if (km <= MEXTIZZA_ZONE.radioKm) return {
    colonia: c.name, km, estado: 'dentro',
    titulo: 'Dentro del radio de reparto',
    detalle: `A ${km} km de la cocina. Llega en 30 minutos o menos, con el envío ya incluido en el precio.`
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
