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

  const MEXTIZZA_SHEETS_URL = 'https://script.google.com/macros/s/AKfycby2xuAxBn7Dp5CvMmkmITIExxP7g5yJukkjv29fQhTwIt6QhPLBvJgN6Brgzjf316tDLA/exec';
  const MEXTIZZA_SHEETS_TOKEN = 'c05186ae-0674-4f3b-bc44-243f146f5f14';

  // El token admin vive solo en el navegador del Centro de Ventas, nunca en el repo.
  const MEXTIZZA_ADMIN_LS_KEY = 'mextizza.admin.token';
  const mextizzaTokenAdmin = () => {
    try { return window.localStorage.getItem(MEXTIZZA_ADMIN_LS_KEY) || ''; } catch (e) { return ''; }
  };
  const mextizzaGuardarTokenAdmin = t => {
    try { window.localStorage.setItem(MEXTIZZA_ADMIN_LS_KEY, (t || '').trim()); return true; } catch (e) { return false; }
  };
  const mextizzaOlvidarTokenAdmin = () => {
    try { window.localStorage.removeItem(MEXTIZZA_ADMIN_LS_KEY); } catch (e) {}
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
  const mextizzaCrearOrden = ({ canal, lines, entrega, estadoInicial, usarPremio }) => {
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
      usarPremio
    });
  };

  const mextizzaAvanzarEstado = folio => mextizzaApiPost('avanzar_estado', { folio }, true);
  const mextizzaCancelarOrden = (folio, motivo) => mextizzaApiPost('cancelar', { folio, motivo }, true);
  /** Estado de un solo pedido, para la pantalla de seguimiento de la app. */
  const mextizzaEstadoOrden = folio => mextizzaApiGet('estado', { folio });
  /** Ultimo pedido de un telefono: recupera el seguimiento en otro dispositivo. */
  const mextizzaEstadoPorTelefono = telefono => mextizzaApiGet('estado_por_telefono', { telefono });
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

  const mextizzaSolicitarCatering = ({ nombre, telefono, personas, fecha_evento, notas }) =>
    mextizzaApiPost('solicitar_catering', { nombre, telefono, personas, fecha_evento, notas });

  /* Estado de la tarjeta de un telefono, mas si en este momento corre el 2x1.
     El horario del 2x1 lo decide el servidor y no el reloj del telefono: si el
     cliente tiene mal la hora, la promesa y el cobro discreparian. */
  /* Direccion para recoger en la cocina. Vive en las propiedades del script de
     Apps Script, no en este archivo: el repositorio es publico y es un domicilio
     particular. */
  const mextizzaPickup = () => mextizzaApiGet('pickup', {});

  const mextizzaTarjeta = (telefono) => mextizzaApiGet('tarjeta', { telefono: telefono || '' });

  Object.assign(window, { mextizzaPickup, mextizzaTarjeta, mextizzaCrearOrden, mextizzaAvanzarEstado, mextizzaCancelarOrden, mextizzaEstadoOrden, mextizzaEstadoPorTelefono, mextizzaCancelarPorCliente, mextizzaListarAbiertas, mextizzaListarHoy, mextizzaSolicitarCatering, mextizzaTokenAdmin, mextizzaGuardarTokenAdmin, mextizzaOlvidarTokenAdmin, mextizzaInvEstado, mextizzaInvCompra, mextizzaInvLote, mextizzaInvMerma, mextizzaInvConteo });
}
