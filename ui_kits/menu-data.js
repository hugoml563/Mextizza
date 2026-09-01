// Canonical menu — transcribed verbatim from the delivered menu sheet.
// `photo` paths are relative to a page in ui_kits/<kit>/. Only four dishes have real
// photography so far; the rest deliberately carry none — no stand-ins.
// (assets/menu-mextizza.png). Names, descriptions and prices are the real ones;
// do not substitute values from the business plan or the BOM.
// El envío YA está considerado en el precio de cada pizza: ninguna superficie cobra
// envío aparte ni lo desglosa como línea.
const MEXTIZZA_MENU = [
  { cat: 'Del horno', title: 'Pizzas', note: 'Todas nuestras pizzas están hechas en horno de piedra, con una masa fermentada en frío 48 horas.', items: [
    { id: 'serranita', name: 'Pizza Serranita', desc: 'Jamón Serrano, arúgula fresca, queso parmesano y salsa de tomate artesanal.', price: 229, photo: '../../assets/photos/pizza-serranita.jpeg' },
    { id: 'aloha', name: 'Pizza Aloha', desc: 'La clásica que divide opiniones, jamón, piña y salsa de tomate artesanal. Sin pena.', price: 189, photo: '../../assets/photos/pizza-aloha.jpeg' },
    { id: 'newyork', name: 'Pizza Newyork', desc: 'Salsa de tomate artesanal a la vodka con crema. Una capa de sabor que no vas a adivinar a la primera mordida.', price: 199, photo: '../../assets/photos/pizza-newyork.jpeg' },
    { id: 'provola', name: 'Pizza Provola', desc: 'Doble queso, doble provolone. Simple y por eso funciona.', price: 229, photo: '../../assets/photos/pizza-provola.jpeg' },
    { id: 'chisi', name: 'Pizza Chisi', desc: 'Queso monterrey, provolone, parmesano y un toque de gorgonzola… Para los que no negocian con el queso.', price: 219, photo: '../../assets/photos/pizza-chisi.jpeg' },
    { id: 'combinada', name: 'Pizza Combinada', desc: 'Jamón, champiñones, pimiento y cebolla. Para los que quieren un poco de todo.', price: 229, photo: '../../assets/photos/pizza-combinada.jpeg' },
    { id: 'roni', name: 'Pizza Roni', desc: 'Peperoni clásico, sin vueltas. La que pides cuando ya sabes lo que quieres.', price: 189, photo: '../../assets/photos/pizza-roni.jpeg' },
    { id: 'traviesa', name: 'Pizza Traviesa', desc: 'Peperoni con un toque de miel picante… dulce, picante y un poco atrevida.', price: 199, photo: '../../assets/photos/pizza-traviesa.jpeg' }
  ]},
  { cat: 'Rotativa', title: 'Pizza especial del mes', note: 'Una sola pizza rota cada mes. Ésta es la de ahora.', items: [
    { id: 'cochinita', name: 'Pizza Cochinita', desc: 'Lo que le da nombre a la casa: cochinita pibil, frijoles refritos y cebolla morada.', price: 229, flag: 'Del mes' }
  ]},
  { cat: 'Para cerrar', title: 'Postres y bebidas', items: [
    { id: 'chocolatoso', name: 'Brownie', desc: '', price: 40, photo: '../../assets/photos/brownie.jpg' },
    { id: 'refresco-coca', name: 'Refresco Coca-Cola', desc: '600 ml', price: 35, photo: '../../assets/photos/cocacola.jpg' },
    { id: 'refresco-sprite', name: 'Refresco Sprite', desc: '600 ml', price: 35, photo: '../../assets/photos/sprite.jpg' },
    { id: 'agua', name: 'Agua Mineral', desc: '', price: 35, photo: '../../assets/photos/agua-mineral.jpg' }
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


function mextizzaWhatsappLink(mensaje) {
  return 'https://wa.me/' + MEXTIZZA_FACTS.whatsapp + '?text=' + encodeURIComponent(mensaje);
}
const MEXTIZZA_SOCIAL = {
  instagram: 'https://www.instagram.com/mextizzamx/',
  facebook: 'https://www.facebook.com/profile.php?id=61592120047383'
};
Object.assign(window, { MEXTIZZA_MENU, MEXTIZZA_ADDONS, MEXTIZZA_FACTS, mextizzaWhatsappLink, mextizzaEstaAbierto, MEXTIZZA_SOCIAL });
