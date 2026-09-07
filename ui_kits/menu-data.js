// Canonical menu — transcribed verbatim from the delivered menu sheet.
// `photo` paths are relative to a page in ui_kits/<kit>/. Only four dishes have real
// photography so far; the rest deliberately carry none — no stand-ins.
// (assets/menu-mextizza.png). Names, descriptions and prices are the real ones;
// do not substitute values from the business plan or the BOM.
// El envío YA está considerado en el precio de cada pizza: ninguna superficie cobra
// envío aparte ni lo desglosa como línea.
const MEXTIZZA_MENU = [
  { cat: 'Del horno', title: 'Pizzas', note: 'Todas nuestras pizzas están hechas en horno de piedra, con una masa fermentada en frío 48 horas.', items: [
    { id: 'serranita', name: 'Pizza Serranita', desc: 'Jamón Serrano, arúgula fresca, queso parmesano y salsa de tomate artesanal.', price: 229, photo: '../../assets/photos/pizza-serranita.webp' },
    { id: 'aloha', name: 'Pizza Aloha', desc: 'La clásica que divide opiniones, jamón, piña y salsa de tomate artesanal. Sin pena.', price: 189, photo: '../../assets/photos/pizza-aloha.webp' },
    { id: 'newyork', name: 'Pizza Newyork', desc: 'Salsa de tomate artesanal a la vodka con crema. Una capa de sabor que no vas a adivinar a la primera mordida.', price: 199, photo: '../../assets/photos/pizza-newyork.webp' },
    { id: 'provola', name: 'Pizza Provola', desc: 'Doble queso, doble provolone. Simple y por eso funciona.', price: 229, photo: '../../assets/photos/pizza-provola.webp' },
    { id: 'chisi', name: 'Pizza Chisi', desc: 'Queso monterrey, provolone, parmesano y un toque de gorgonzola… Para los que no negocian con el queso.', price: 219, photo: '../../assets/photos/pizza-chisi.webp' },
    { id: 'combinada', name: 'Pizza Combinada', desc: 'Jamón, champiñones, pimiento y cebolla. Para los que quieren un poco de todo.', price: 229, photo: '../../assets/photos/pizza-combinada.webp' },
    { id: 'roni', name: 'Pizza Roni', desc: 'Peperoni clásico, sin vueltas. La que pides cuando ya sabes lo que quieres.', price: 189, photo: '../../assets/photos/pizza-roni.webp' },
    { id: 'traviesa', name: 'Pizza Traviesa', desc: 'Peperoni con un toque de miel picante… dulce, picante y un poco atrevida.', price: 199, photo: '../../assets/photos/pizza-traviesa.webp' }
  ]},
  { cat: 'Rotativa', title: 'Pizza especial del mes', note: 'Una sola pizza rota cada mes. Ésta es la de ahora.', items: [
    { id: 'cochinita', name: 'Pizza Cochinita', desc: 'Lo que le da nombre a la casa: cochinita pibil, frijoles refritos y cebolla morada.', price: 229, flag: 'Del mes' , photo: '../../assets/photos/pizza-cochinita.webp'}
  ]},
  { cat: 'Para cerrar', title: 'Postres y bebidas', items: [
    { id: 'chocolatoso', name: 'Brownie', desc: '', price: 40, photo: '../../assets/photos/brownie.webp' },
    { id: 'refresco-coca', name: 'Refresco Coca-Cola', desc: '600 ml', price: 35, photo: '../../assets/photos/cocacola.webp' },
    { id: 'refresco-sprite', name: 'Refresco Sprite', desc: '600 ml', price: 35, photo: '../../assets/photos/sprite.webp' },
    { id: 'agua', name: 'Agua Mineral', desc: '', price: 35, photo: '../../assets/photos/agua-mineral.webp' }
  ]}
];
// Complementos por pizza. Los precios son INFERIDOS del BOM (costo de insumo x margen
// del plan) y están pendientes de confirmar con los fundadores.
/* Los 15 complementos confirmados con Ricardo. La categoria BOM va como
   comentario porque es dato interno de costeo; el cliente ve los grupos. */
const MEXTIZZA_ADDONS = [
  { id: 'queso', title: 'Más queso', note: 'Se agrega antes del horno.', items: [
    { id: 'provolone', name: 'Extra provolone', price: 55 },
    { id: 'monterrey', name: 'Extra queso monterrey', price: 30 },
    { id: 'gorgonzola', name: 'Extra gorgonzola', price: 30 },
    { id: 'parmesano', name: 'Extra parmesano', price: 20 }
  ]},
  { id: 'carne', title: 'Más carne', items: [
    { id: 'peperoni', name: 'Extra peperoni', price: 45 },
    { id: 'serrano', name: 'Extra jamón serrano', price: 45 },
    { id: 'jamon', name: 'Extra jamón', price: 20 }
  ]},
  { id: 'verdura', title: 'Verduras y fruta', items: [
    { id: 'pina', name: 'Extra piña', price: 20 },
    { id: 'arugula', name: 'Extra arúgula', price: 15 },
    { id: 'morada', name: 'Extra cebolla morada encurtida', price: 15 },
    { id: 'champinones', name: 'Extra champiñones', price: 15 }
  ]},
  { id: 'toque', title: 'El último toque', note: 'Va encima al salir del horno.', items: [
    { id: 'miel', name: 'Drizzle de miel', price: 15 },
    { id: 'habanero', name: 'Toque de salsa habanero', price: 15 },
    { id: 'macha', name: 'Toque de salsa macha', price: 15 },
    { id: 'aoev', name: 'Terminado con aceite de oliva extra virgen', price: 15 }
  ]}
];
const MEXTIZZA_FACTS = {
  envioIncluido: true,
  /* Tiempo prometido puerta a puerta. Es el numero OFICIAL: la pantalla de
     comandas colorea contra el, y aparece en el menu impreso, el sitio y la app.
     Cambiarlo aqui no basta para el bundle compilado (_ds_bundle.js) — hay que
     sincronizarlo a mano. */
  promesaMin: 40,
  radio: '3 km · hasta 40 min puerta a puerta',
  /* Horario de operacion. getDay(): 0=domingo ... 6=sabado.
     Miercoles a domingo, de 16:00 a 23:00. El checkout se cierra fuera de esto:
     un pedido que no se puede cocinar es peor que ningun pedido. */
  horario: {
    dias: [3, 4, 5, 6, 0],
    desde: 16,
    hasta: 23,
    texto: 'Miércoles a domingo, 4:00 pm a 11:00 pm'
  },
  fermento: 'Fermentación fría de 48 horas',
  estilo: 'Horno de piedra, masa fermentada en frío 48 horas',
  catering: { precio: 235, min: 20, max: 30, anticipo: '30%', aviso: '4 días' },
  zona: 'Col. Lomas Lindas, Atizapán de Zaragoza',
  whatsapp: '525526577352' // WhatsApp Business, formato internacional (52 + 10 dígitos)
};
/* ¿Estamos abiertos? Se evalua SIEMPRE en hora de Ciudad de Mexico, no en la
   del dispositivo: un cliente de viaje, con el reloj mal, o un navegador en otra
   zona no debe poder pedir fuera de horario ni quedarse sin poder pedir estando
   abierto. Se usa Intl con America/Mexico_City en vez de restar 6 horas a mano
   para que siga siendo correcto si Mexico vuelve a cambiar sus reglas de horario. */
function mextizzaAhoraCDMX(ahora) {
  const d = ahora || new Date();
  try {
    const f = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Mexico_City', weekday: 'short', hour: 'numeric', hour12: false
    }).formatToParts(d);
    const parte = t => (f.find(x => x.type === t) || {}).value;
    const dias = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    const h = parseInt(parte("hour"), 10);
    return { dia: dias[parte("weekday")], hora: h === 24 ? 0 : h };
  } catch (e) {
    return { dia: d.getDay(), hora: d.getHours() }; // sin Intl: mejor la local que nada
  }
}

function mextizzaEstaAbierto(ahora) {
  const h = MEXTIZZA_FACTS.horario;
  const cdmx = mextizzaAhoraCDMX(ahora);
  const abierto = h.dias.indexOf(cdmx.dia) !== -1 && cdmx.hora >= h.desde && cdmx.hora < h.hasta;
  return { abierto, texto: h.texto };
}

/* Busca un producto del menu por su id. Los premios se guardan como id
   ('traviesa'), pero el carrito necesita el objeto completo. Devuelve null si
   el id no existe, para que un premio mal escrito no meta una linea vacia. */
function mextizzaProducto(id) {
  for (const g of MEXTIZZA_MENU) {
    for (const it of g.items) if (it.id === id) return it;
  }
  return null;
}

/* El 2x1: que dia y desde que hora.

   `nombre` esta aqui a proposito. Los avisos de la interfaz se arman con el en
   vez de traer el dia escrito a mano, para que mover la promocion no pueda
   dejar un letrero anunciando el dia equivocado.

   0 = domingo, 3 = miercoles. Espejo de DIA_2X1 y HORA_2X1 en Code.gs; el build
   compara las dos capas y se detiene si dejan de coincidir. */
const MEXTIZZA_2X1 = { dia: 3, desde: 19, nombre: 'Miércoles', enMinuscula: 'miércoles' };

/* Sirve solo para ANUNCIARLO: quien decide si el descuento se aplica es el
   servidor (es2x1_ en Code.gs), que usa su propio reloj. Si el telefono trae mal
   la hora, lo peor que pasa es que el letrero no cuadre; el cobro no cambia. */
function mextizzaEs2x1(ahora) {
  const cdmx = mextizzaAhoraCDMX(ahora);
  return cdmx.dia === MEXTIZZA_2X1.dia && cdmx.hora >= MEXTIZZA_2X1.desde;
}


/* Los complementos son ingredientes que van ENCIMA de una pizza: no tienen
   sentido en un refresco ni en el brownie. La regla vive aqui, no en cada
   pantalla, porque la web y la app la necesitan igual y si cada una la escribe
   por su lado terminan discrepando. Se resuelve por grupo del menu, no por el
   nombre del producto, para que una pizza que no empiece con 'Pizza' siga
   funcionando. */
/* Sale del horno: 'Del horno' y la 'Rotativa' del mes. 'Para cerrar' son el
   brownie, los refrescos y el agua.

   Espejo de esPizza_ en Code.gs, que decide quien gana sello y quien puede
   canjear. Aqui solo sirve para no OFRECER lo que el servidor va a rechazar:
   quien manda sigue siendo el servidor. */
/* Descuento por recoger en la cocina. Sustituye un reparto que no se hizo, asi
   que es fijo por pedido y no por pizza: el viaje ahorrado es uno solo.
   Espejo de PICKUP_DESCUENTO en Code.gs; build-js.js comprueba que coincidan.
   La DIRECCION no vive aqui ni en ningun archivo: el repositorio es publico y es
   un domicilio particular. Se pide al servidor. */
/* INTERRUPTOR DEL SERVICIO DE RECOGER EN LA COCINA.

   En false, la opcion no aparece en ningun lado: ni el selector del checkout,
   ni el descuento, ni la direccion. Nada se borro — el servicio completo sigue
   aqui y se reactiva poniendo true en este archivo Y en Code.gs (PICKUP_ACTIVO).
   El build compara los dos y se detiene si no coinciden.

   Apagarlo solo en el navegador no bastaria: cualquiera podria seguir mandando
   entrega_tipo 'pickup' a mano y llevarse el descuento. Por eso el servidor
   tiene su propio interruptor y rechaza esos pedidos. */
const MEXTIZZA_PICKUP_ACTIVO = false;

const MEXTIZZA_PICKUP_DESCUENTO = 30;

function mextizzaEsPizza(id) {
  const grupo = MEXTIZZA_MENU.find(g => g.items.some(i => i.id === id));
  return !!grupo && grupo.cat !== 'Para cerrar';
}

// Los complementos son para las pizzas: nadie le pone extra provolone al agua.
function mextizzaAceptaComplementos(item) {
  return !!item && mextizzaEsPizza(item.id);
}

function mextizzaWhatsappLink(mensaje) {
  return 'https://wa.me/' + MEXTIZZA_FACTS.whatsapp + '?text=' + encodeURIComponent(mensaje);
}
const MEXTIZZA_SOCIAL = {
  instagram: 'https://www.instagram.com/mextizzamx/',
  facebook: 'https://www.facebook.com/profile.php?id=61592120047383'
};
Object.assign(window, { MEXTIZZA_MENU, MEXTIZZA_ADDONS, MEXTIZZA_FACTS, mextizzaWhatsappLink, mextizzaEstaAbierto, mextizzaEs2x1, MEXTIZZA_2X1, mextizzaProducto, mextizzaEsPizza, MEXTIZZA_PICKUP_DESCUENTO, MEXTIZZA_PICKUP_ACTIVO, mextizzaAceptaComplementos, MEXTIZZA_SOCIAL });
