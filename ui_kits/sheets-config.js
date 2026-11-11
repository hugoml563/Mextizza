// Conexión con el Google Sheet "Mextizza — Operación" (integration/sheets-backend/Code.gs).
//
// Hay DOS tokens con permisos distintos:
//
//   MEXTIZZA_SHEETS_TOKEN (público) — está aquí en claro y eso es inevitable: este
//     archivo se sirve abierto en la web y viaja dentro del APK, así que cualquiera
//     puede leerlo. Por eso el backend solo le permite acciones de cliente: crear un
//     pedido, pedir catering y consultar el estado de UN folio.
//
//   Token de administrador — habilita listar pedidos (traen nombre y dirección de
//     los clientes), avanzar estado y cancelar. NUNCA se escribe en este archivo:
//     se captura una vez en el Centro de Ventas y queda en el localStorage de ese
//     navegador.
//
// Antes había un solo token para todo. Como se publica junto al código del cliente,
// cualquiera podía descargarlo y listar los datos personales de todos los pedidos
// del día, o cancelarlos.
//
// Todo el archivo va envuelto en este guard porque algunas páginas (los .dc.html del Centro
// de Ventas) reinyectan los scripts del <head> más de una vez para su propio hot-reload —
// sin el guard, el `const` de abajo truena la segunda vez con "already declared".
if (!window.__mextizzaSheetsConfigLoaded) {
  window.__mextizzaSheetsConfigLoaded = true;

  /* Dos entornos. La preview de la rama test y el servidor local (localhost con
     puerto) hablan con una COPIA de la hoja: asi las pruebas no ensucian pedidos,
     ventas ni tarjetas reales, y la copia no le manda nada a ningun cliente.
     mextizza.com y la app (en Android es https://localhost SIN puerto) siguen
     con produccion. Los dos tokens publicos pueden estar aqui: ya viajan en la web. */
  const ENTORNOS = {
    produccion: {
      url: 'https://script.google.com/macros/s/AKfycby2xuAxBn7Dp5CvMmkmITIExxP7g5yJukkjv29fQhTwIt6QhPLBvJgN6Brgzjf316tDLA/exec',
      token: 'c05186ae-0674-4f3b-bc44-243f146f5f14',
      llaveAdmin: 'mextizza.admin.token'
    },
    pruebas: {
      url: 'https://script.google.com/macros/s/AKfycbydJSvnNf8xeZTGLn-N7ninyM6lA6tP3LI_WL9eJAuSvMFjgBX3B1lVljRlPMUI-xK8/exec',
      token: '047afe60-e2d7-418d-8348-3a1737fcbe4f',
      llaveAdmin: 'mextizza.admin.token.pruebas'
    }
  };
  const esEntornoPruebas = (() => {
    try {
      const h = location.hostname;
      if (/-hugoml563\.vercel\.app$/.test(h)) return true;
      return (h === 'localhost' || h === '127.0.0.1') && location.port !== '';
    } catch (e) { return false; }
  })();
  const ENTORNO = esEntornoPruebas ? ENTORNOS.pruebas : ENTORNOS.produccion;
  const MEXTIZZA_SHEETS_URL = ENTORNO.url;
  const MEXTIZZA_SHEETS_TOKEN = ENTORNO.token;
  window.MEXTIZZA_ENTORNO = esEntornoPruebas ? 'pruebas' : 'produccion';

  /* Que nunca se confundan: en pruebas, una etiqueta fija arriba y el titulo
     de la pestana con [PRUEBAS]. No captura toques, no tapa botones. */
  if (esEntornoPruebas) {
    const marcar = () => {
      if (!document.body || document.getElementById('mx-franja-pruebas')) return;
      const f = document.createElement('div');
      f.id = 'mx-franja-pruebas';
      f.textContent = 'Pruebas · no es la operación real';
      f.style.cssText = 'position:fixed;top:0;left:50%;transform:translateX(-50%);z-index:2147483647;pointer-events:none;' +
        'padding:2px 10px;border-radius:0 0 8px 8px;white-space:nowrap;background:repeating-linear-gradient(45deg,#F4CD5E 0 10px,#1A1A1A 10px 20px);' +
        'color:#FFFFFF;font:700 10px/1.4 Oswald,Arial,sans-serif;letter-spacing:.8px;text-transform:uppercase;' +
        'text-shadow:0 0 3px #000,0 0 3px #000;box-shadow:0 2px 6px rgba(0,0,0,.3)';
      document.body.appendChild(f);
      if (document.title.indexOf('[PRUEBAS]') !== 0) document.title = '[PRUEBAS] ' + document.title;
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', marcar);
    else marcar();
    // El tablero cambia el titulo con cada pedido nuevo: se vuelve a marcar.
    setInterval(() => { if (document.title.indexOf('[PRUEBAS]') !== 0) document.title = '[PRUEBAS] ' + document.title; }, 3000);
  }

  // El token admin vive solo en el navegador del Centro de Ventas, nunca en el repo.
  // Cada entorno guarda el suyo: el de pruebas no sirve en produccion ni al reves.
  const MEXTIZZA_ADMIN_LS_KEY = ENTORNO.llaveAdmin;
  const mextizzaTokenAdmin = () => {
    try { return window.localStorage.getItem(MEXTIZZA_ADMIN_LS_KEY) || ''; } catch (e) { return ''; }
  };
  const mextizzaGuardarTokenAdmin = t => {
    try { window.localStorage.setItem(MEXTIZZA_ADMIN_LS_KEY, (t || '').trim()); return true; } catch (e) { return false; }
  };
  const mextizzaOlvidarTokenAdmin = () => {
    try { window.localStorage.removeItem(MEXTIZZA_ADMIN_LS_KEY); } catch (e) {}
  };
  /* Este navegador es el de la cocina capturando un pedido que le dictaron:
     el sitio abierto en modo captura Y con el token de administrador guardado.

     Vive aqui, en un solo lugar, porque cuatro rejas preguntan lo mismo antes
     de dejar pasar un pedido -- la validez del formulario de entrega, su
     aviso, el estado del boton de confirmar y el envio. Escribirlo cuatro
     veces ya dejo el horario aplicado en tres de ellas cuando solo se habia
     corregido una. */
  const mextizzaCapturaCocina = () => {
    try {
      return new URLSearchParams(location.search).get('canal') === 'whatsapp'
        && !!mextizzaTokenAdmin();
    } catch (e) { return false; }
  };

  const tokenPara = admin => {
    if (!admin) return MEXTIZZA_SHEETS_TOKEN;
    const t = mextizzaTokenAdmin();
    if (!t) throw new Error('Falta el token de administrador en este navegador');
    return t;
  };

  const mextizzaApiPost = async (action, payload, admin = false) => {
    const res = await fetch(MEXTIZZA_SHEETS_URL, {
      method: 'POST',
      // text/plain evita el preflight CORS — Apps Script no responde a OPTIONS.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ token: tokenPara(admin), action, ...payload })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Error de red al conectar con el Sheet');
    return data;
  };

  const mextizzaApiGet = async (action, params = {}, admin = false) => {
    const qs = new URLSearchParams({ token: tokenPara(admin), action, ...params });
    const res = await fetch(MEXTIZZA_SHEETS_URL + '?' + qs.toString());
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Error de red al conectar con el Sheet');
    return data;
  };

  /** lines: el arreglo de líneas del carrito (misma forma que usan CartDrawer/AppCart) */
  const mextizzaCrearOrden = async ({ canal, lines, entrega, estadoInicial, usarPremio }) => {
    const items = lines.map(l => ({
      producto_id: l.id,
      nombre: l.name,
      cantidad: l.qty,
      precio_unit: l.price,
      addons: []
    }));
    /* Los complementos viajan por id y el servidor les pone precio. Si la linea
       viene de un carrito viejo, sin addonIds, se manda el renglon colapsado de
       siempre (nombre concatenado + total) y el servidor lo acepta tal cual. */
    items.forEach((it, i) => {
      const l = lines[i];
      if (l.addonList && l.addonList.length) it.addons = l.addonList;
      else if (l.addonTotal) it.addons = [{ nombre: (l.addonNames || []).join(', '), precio: l.addonTotal }];
    });

    /* Modo captura (?canal=whatsapp): si este navegador es el de la cocina y
       trae el token de administrador, el pedido se manda con el. El servidor
       le permite entonces capturar fuera de horario, que es lo que pasa cuando
       alguien habla por telefono a las 3:50 y la cocina abre a las 4.

       Sin token guardado se comporta igual que siempre, con el token publico y
       el horario aplicado: poner el parametro en la direccion no alcanza para
       saltarse nada. */
    const comoCocina = mextizzaCapturaCocina();

    /* Si hay sesion, el pedido viaja con el token de la cuenta y el servidor
       lo valida con Google. Sin sesion va como siempre: pedir no requiere
       cuenta, y un token vencido tampoco debe tumbar una venta. */
    /* En modo captura la cocina registra el pedido de OTRA persona. La cuenta
       abierta en ese navegador es la de quien captura, no la del cliente, asi
       que no viaja: si viajara, los sellos y el historial del cliente acabarian
       en la cuenta de Ricardo. */
    const idToken = (!comoCocina && canal !== 'WhatsApp' && window.mextizzaCuenta)
      ? await window.mextizzaCuenta.token() : null;

    return mextizzaApiPost('crear_orden', {
      canal,
      cliente: { telefono: entrega.telefono, nombre: entrega.nombre },
      direccion: entrega.calle,
      colonia: entrega.colonia,
      km: entrega.km,
      // 'pickup' o 'domicilio'. El servidor decide el descuento; aqui solo se dice.
      entrega_tipo: entrega.entrega_tipo,
      pago_metodo: entrega.pago === 'Tarjeta' ? 'Tarjeta en línea' : entrega.pago,
      notas: entrega.notas,
      items,
      estadoInicial,
      /* Cual premio quiere canjear. Es una PETICION, no una orden: el servidor
         solo lo aplica si la tarjeta de ese telefono de verdad lo tiene. */
      usarPremio,
      idToken: idToken || undefined
    }, comoCocina);
  };

  /* Captura rapida del Centro de Ventas. Siempre con el token de la cocina y
     sin cuenta: el pedido es de quien llamo, no de quien lo escribe. El
     servidor pone los precios y decide si el premio o el 2x1 aplican. */
  const mextizzaCapturarOrden = ({ canal, cliente, direccion, colonia, km, pago_metodo, notas, items, usarPremio }) =>
    mextizzaApiPost('crear_orden', {
      canal, cliente, direccion, colonia, km, entrega_tipo: 'domicilio',
      pago_metodo, notas, items, usarPremio
    }, true);
  /** Datos y tarjeta de quien ya ha pedido, para no volver a preguntarle todo. */
  const mextizzaClientePorTelefono = telefono => mextizzaApiGet('cliente_por_telefono', { telefono }, true);

  const mextizzaAvanzarEstado = folio => mextizzaApiPost('avanzar_estado', { folio }, true);
  const mextizzaCancelarOrden = (folio, motivo, motivo_codigo) => mextizzaApiPost('cancelar', { folio, motivo, motivo_codigo }, true);
  /** Reportes del tablero: dias = 1 (hoy), 7 o 30. Solo la cocina. */
  const mextizzaReportes = dias => mextizzaApiGet('reportes', { dias: String(dias || 1) }, true);
  /** Estado de un solo pedido, para la pantalla de seguimiento de la app. */
  const mextizzaEstadoOrden = folio => mextizzaApiGet('estado', { folio });
  /** Ultimo pedido de un telefono: recupera el seguimiento en otro dispositivo. */
  const mextizzaEstadoPorTelefono = telefono => mextizzaApiGet('estado_por_telefono', { telefono });
  /* Pausa y agotados. La web y la app los consultan solas (abajo); la cocina
     los cambia desde el tablero con su token. */
  const mextizzaOperacion = async () => {
    const r = await mextizzaApiGet('operacion', {});
    window.MEXTIZZA_OPERACION = { pausadoHasta: r.pausadoHasta || null, agotados: r.agotados || [] };
    try { window.dispatchEvent(new Event('mextizza:operacion')); } catch (e) {}
    return window.MEXTIZZA_OPERACION;
  };
  /** cambios: { pausaMin } | { reanudar: true } | { agotado: { id, valor } } */
  const mextizzaCambiarOperacion = async (cambios) => {
    const r = await mextizzaApiPost('operacion', cambios, true);
    window.MEXTIZZA_OPERACION = { pausadoHasta: r.pausadoHasta || null, agotados: r.agotados || [] };
    try { window.dispatchEvent(new Event('mextizza:operacion')); } catch (e) {}
    return window.MEXTIZZA_OPERACION;
  };
  /** El navegador del cliente pide que le avisen si algo cambia con su pedido. */
  const mextizzaPushPedido = (folio, token_push) => mextizzaApiPost('push_pedido', { folio, token_push });
  /** El cliente cancela su propio pedido, solo dentro de la ventana permitida. */
  const mextizzaCancelarPorCliente = folio => mextizzaApiPost('cancelar_cliente', { folio });
  const mextizzaListarAbiertas = () => mextizzaApiGet('listar_abiertas', {}, true);
  const mextizzaListarHoy = () => mextizzaApiGet('listar_hoy', {}, true);

  /* Inventarios. Todo va con token admin: los saldos y los costos se capturan
     desde la tablet de la cocina, no desde el sitio, y ninguno es informacion
     que un cliente deba poder leer. */
  const mextizzaInvEstado = () => mextizzaApiGet('inv_estado', {}, true);
  /** Compra recibida. Se manda el importe pagado y el sistema saca el costo unitario. */
  const mextizzaInvCompra = ({ insumo_id, cantidad, importe, nota }) =>
    mextizzaApiPost('inv_compra', { insumo_id, cantidad, importe, nota }, true);
  /** Un lote de masa o de salsa: consume los crudos y suma las porciones que rinde. */
  const mextizzaInvLote = ({ preparado_id, lotes }) =>
    mextizzaApiPost('inv_lote', { preparado_id, lotes }, true);
  const mextizzaInvMerma = ({ insumo_id, cantidad, motivo }) =>
    mextizzaApiPost('inv_merma', { insumo_id, cantidad, motivo }, true);
  /** Conteo fisico. La diferencia contra el sistema es la merma real del periodo. */
  const mextizzaInvConteo = ({ insumo_id, contado, nota }) =>
    mextizzaApiPost('inv_conteo', { insumo_id, contado, nota }, true);

  /* Acciones de la cuenta: sin sesion no hay nada que mandar. El servidor
     valida el token con Google; aqui solo se adjunta. */
  const conCuenta = async (action, extra) => {
    const idToken = window.mextizzaCuenta ? await window.mextizzaCuenta.token() : null;
    if (!idToken) throw new Error('Entra con tu cuenta.');
    return mextizzaApiPost(action, { ...extra, idToken });
  };
  /** Liga un telefono a la cuenta, probando que es suyo con el folio de un pedido entregado. */
  const mextizzaLigarTelefono = ({ telefono, folio }) => conCuenta('ligar_telefono', { telefono, folio });
  /** El telefono ligado a la cuenta y su tarjeta. */
  const mextizzaMiCuenta = () => conCuenta('mi_cuenta', {});
  /** Enlace para guardar la tarjeta en Google Wallet. Solo la cuenta duena del telefono. */
  const mextizzaWalletEnlace = () => conCuenta('wallet_enlace', {});

  const mextizzaSolicitarCatering = ({ nombre, telefono, personas, fecha_evento, notas, direccion }) =>
    mextizzaApiPost('solicitar_catering', { nombre, telefono, personas, fecha_evento, notas, direccion });

  /* Catering en el Centro de Ventas. Admin: las solicitudes traen nombre,
     telefono y direccion, y aprobar crea el evento en el calendario. */
  const mextizzaListarCatering = () => mextizzaApiGet('listar_catering', {}, true);
  /** accion: 'platica' | 'aprobar' | 'rechazar' | 'cancelar'. Aprobar pide fecha, hora y direccion. */
  const mextizzaActualizarCatering = (folio, accion, datos = {}) =>
    mextizzaApiPost('catering_actualizar', { folio, accion, ...datos }, true);

  /* Avisos push de la cocina (templates/sales-center/avisos-push.js). Admin:
     registrar un equipo es decidir quien se entera de cada pedido. */
  const mextizzaPushRegistrar = (token_push, nombre) => mextizzaApiPost('push_registrar', { token_push, nombre }, true);
  const mextizzaPushBaja = token_push => mextizzaApiPost('push_baja', { token_push }, true);
  const mextizzaPushProbar = token_push => mextizzaApiPost('push_probar', { token_push }, true);

  /* Estado de la tarjeta de un telefono, mas si en este momento corre el 2x1.
     El horario del 2x1 lo decide el servidor y no el reloj del telefono: si el
     cliente tiene mal la hora, la promesa y el cobro discreparian. */
  /* Direccion para recoger en la cocina. Vive en las propiedades del script de
     Apps Script, no en este archivo: el repositorio es publico y es un domicilio
     particular. */
  const mextizzaPickup = () => mextizzaApiGet('pickup', {});

  const mextizzaTarjeta = (telefono) => mextizzaApiGet('tarjeta', { telefono: telefono || '' });

  Object.assign(window, { mextizzaPickup, mextizzaTarjeta, mextizzaCrearOrden, mextizzaAvanzarEstado, mextizzaCancelarOrden, mextizzaEstadoOrden, mextizzaEstadoPorTelefono, mextizzaCancelarPorCliente, mextizzaListarAbiertas, mextizzaListarHoy, mextizzaSolicitarCatering, mextizzaListarCatering, mextizzaActualizarCatering, mextizzaPushRegistrar, mextizzaPushBaja, mextizzaPushProbar, mextizzaTokenAdmin, mextizzaGuardarTokenAdmin, mextizzaOlvidarTokenAdmin, mextizzaCapturaCocina, mextizzaInvEstado, mextizzaInvCompra, mextizzaInvLote, mextizzaInvMerma, mextizzaInvConteo, mextizzaLigarTelefono, mextizzaMiCuenta, mextizzaWalletEnlace, mextizzaCapturarOrden, mextizzaClientePorTelefono, mextizzaPushPedido, mextizzaOperacion, mextizzaCambiarOperacion, mextizzaReportes });

  /* Se pide al cargar, cada 2 minutos y al volver a la pestana. Si el
     servidor aun no conoce la accion, no pasa nada: queda sin pausa. */
  const refrescarOperacion = () => { mextizzaOperacion().catch(() => {}); };
  refrescarOperacion();
  setInterval(refrescarOperacion, 120000);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') refrescarOperacion(); });

  /* Errores del navegador del cliente: antes se perdian en su telefono. Van a
     la hoja `errores` (accion error_cliente). Tope de 5 por pagina, y se
     ignoran los de extensiones y los "Script error." sin detalle. */
  let erroresMandados = 0;
  const mandarError = (mensaje) => {
    const m = String(mensaje || '').slice(0, 300);
    if (!m || /^Script error\.?$/i.test(m) || /chrome-extension:|moz-extension:|safari-extension:/i.test(m)) return;
    if (++erroresMandados > 5) return;
    try {
      fetch(MEXTIZZA_SHEETS_URL, {
        method: 'POST', keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ token: MEXTIZZA_SHEETS_TOKEN, action: 'error_cliente', mensaje: m,
          pagina: location.pathname, agente: navigator.userAgent })
      }).catch(() => {});
    } catch (e) {}
  };
  window.addEventListener('error', (e) => {
    mandarError((e && e.message || 'error') + (e && e.filename ? ' @ ' + String(e.filename).split('/').pop() + ':' + e.lineno : ''));
  });
  window.addEventListener('unhandledrejection', (e) => {
    const r = e && e.reason;
    // Los rechazos de red ("Failed to fetch") son del internet del cliente, no un error nuestro.
    const m = String((r && (r.stack || r.message)) || r || '');
    if (/Failed to fetch|NetworkError|Load failed|network/i.test(m)) return;
    mandarError('promesa: ' + m);
  });
}
