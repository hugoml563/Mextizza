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
    { id: 'combinada', name: 'Pizza Combinada', desc: 'Jamón, champiñones, pimiento y cebolla. Para los que quieren un poco de todo.', price: 229 },
    { id: 'roni', name: 'Pizza Roni', desc: 'Peperoni clásico, sin vueltas. La que pides cuando ya sabes lo que quieres.', price: 189, photo: '../../assets/photos/pizza-roni.jpeg' },
    { id: 'traviesa', name: 'Pizza Traviesa', desc: 'Peperoni con un toque de miel picante… dulce, picante y un poco atrevida.', price: 199, photo: '../../assets/photos/pizza-traviesa.jpeg' }
  ]},
  { cat: 'Rotativa', title: 'Pizza especial del mes', note: 'Una sola pizza rota cada mes. Ésta es la de ahora.', items: [
    { id: 'cochinita', name: 'Pizza Cochinita', desc: 'Lo que le da nombre a la casa: cochinita pibil, frijoles refritos y cebolla morada.', price: 229, flag: 'Del mes' }
  ]},
  { cat: 'Para cerrar', title: 'Postres y bebidas', items: [
    { id: 'chocolatoso', name: 'Brownie', desc: '', price: 40 },
    { id: 'refresco-coca', name: 'Refresco Coca-Cola', desc: '600 ml', price: 35 },
    { id: 'refresco-sprite', name: 'Refresco Sprite', desc: '600 ml', price: 35 },
    { id: 'agua', name: 'Agua Mineral', desc: '', price: 35 }
  ]}
];
// Complementos por pizza. Los precios son INFERIDOS del BOM (costo de insumo x margen
// del plan) y están pendientes de confirmar con los fundadores.
const MEXTIZZA_ADDONS = [
  { id: 'queso', title: 'Más queso', note: 'Se agrega antes del horno.', items: [
    { id: 'mozzarella', name: 'Doble mozzarella', price: 35 },
    { id: 'provolone', name: 'Doble provolone', price: 45 },
    { id: 'gorgonzola', name: 'Gorgonzola', price: 50 },
    { id: 'parmesano', name: 'Parmesano en hojuelas', price: 40 }
  ]},
  { id: 'carne', title: 'Más carne', items: [
    { id: 'peperoni', name: 'Peperoni extra', price: 45 },
    { id: 'jamon', name: 'Jamón', price: 35 },
    { id: 'serrano', name: 'Jamón serrano', price: 65 },
    { id: 'cochinita-add', name: 'Cochinita pibil', price: 60 }
  ]},
  { id: 'verdura', title: 'Verduras', items: [
    { id: 'champinones', name: 'Champiñones', price: 30 },
    { id: 'pimiento', name: 'Pimiento', price: 25 },
    { id: 'morada', name: 'Cebolla morada', price: 20 },
    { id: 'arugula', name: 'Arúgula fresca', price: 30 }
  ]},
  { id: 'toque', title: 'El último toque', note: 'Va encima al salir del horno.', items: [
    { id: 'miel', name: 'Miel picante', price: 20 },
    { id: 'vodka', name: 'Salsa a la vodka', price: 35 },
    { id: 'orilla', name: 'Orilla rellena de queso', price: 55 }
  ]}
];
const MEXTIZZA_FACTS = {
  envioIncluido: true,
  radio: '3 km · hasta 30 min puerta a puerta',
  fermento: 'Fermentación fría de 48 horas',
  estilo: 'Horno de piedra, masa fermentada en frío 48 horas',
  catering: { precio: 235, min: 20, max: 30, anticipo: '30%', aviso: '4 días' },
  zona: 'Col. Lomas Lindas, Atizapán de Zaragoza',
  whatsapp: '525526577352' // WhatsApp Business, formato internacional (52 + 10 dígitos)
};
function mextizzaWhatsappLink(mensaje) {
  return 'https://wa.me/' + MEXTIZZA_FACTS.whatsapp + '?text=' + encodeURIComponent(mensaje);
}
const MEXTIZZA_SOCIAL = {
  instagram: 'https://www.instagram.com/mextizzamx/',
  facebook: 'https://www.facebook.com/profile.php?id=61592120047383'
};
Object.assign(window, { MEXTIZZA_MENU, MEXTIZZA_ADDONS, MEXTIZZA_FACTS, mextizzaWhatsappLink, MEXTIZZA_SOCIAL });
