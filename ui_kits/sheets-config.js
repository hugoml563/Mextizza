// Conexión con el Google Sheet "Mextizza — Operación" (integration/sheets-backend/Code.gs).
// El token vive aquí en claro a propósito: el endpoint solo permite crear/avanzar/cancelar
// pedidos y leer los abiertos, nunca leer datos sensibles del negocio en bruto, así que el
// riesgo de exponerlo en el cliente es aceptable a esta escala (ver definición, fase 0/1).
//
// Todo el archivo va envuelto en este guard porque algunas páginas (los .dc.html del Centro
// de Ventas) reinyectan los scripts del <head> más de una vez para su propio hot-reload —
// sin el guard, el `const` de abajo truena la segunda vez con "already declared".
if (!window.__mextizzaSheetsConfigLoaded) {
  window.__mextizzaSheetsConfigLoaded = true;

  const MEXTIZZA_SHEETS_URL = 'https://script.google.com/macros/s/AKfycby2xuAxBn7Dp5CvMmkmITIExxP7g5yJukkjv29fQhTwIt6QhPLBvJgN6Brgzjf316tDLA/exec';
  const MEXTIZZA_SHEETS_TOKEN = '05b208bb-d1ce-4ac1-a639-e62e15b788d6';

  const mextizzaApiPost = async (action, payload) => {
    const res = await fetch(MEXTIZZA_SHEETS_URL, {
      method: 'POST',
      // text/plain evita el preflight CORS — Apps Script no responde a OPTIONS.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ token: MEXTIZZA_SHEETS_TOKEN, action, ...payload })
    });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Error de red al conectar con el Sheet');
    return data;
  };

  const mextizzaApiGet = async (action, params = {}) => {
    const qs = new URLSearchParams({ token: MEXTIZZA_SHEETS_TOKEN, action, ...params });
    const res = await fetch(MEXTIZZA_SHEETS_URL + '?' + qs.toString());
    const data = await res.json();
    if (!data.ok) throw new Error(data.error || 'Error de red al conectar con el Sheet');
    return data;
  };

  /** lines: el arreglo de líneas del carrito (misma forma que usan CartDrawer/AppCart) */
  const mextizzaCrearOrden = ({ canal, lines, entrega, estadoInicial }) => {
    const items = lines.map(l => ({
      producto_id: l.id,
      nombre: l.name,
      cantidad: l.qty,
      precio_unit: l.price,
      addons: (l.addonNames || []).map(n => ({ nombre: n, precio: 0 })) // el precio ya va sumado en l.addonTotal
    }));
    // Ajuste: si hay complementos, el total por línea ya incluye addonTotal — lo reflejamos
    // como un solo renglón de complementos con el total congelado, en vez de desglosar cada uno
    // (el desglose fino de nombre+precio por complemento no sobrevive al carrito actual).
    items.forEach((it, i) => {
      const l = lines[i];
      if (l.addonTotal) it.addons = [{ nombre: (l.addonNames || []).join(', '), precio: l.addonTotal }];
    });

    return mextizzaApiPost('crear_orden', {
      canal,
      cliente: { telefono: entrega.telefono, nombre: entrega.nombre },
      direccion: entrega.calle,
      colonia: entrega.colonia,
      km: entrega.km,
      pago_metodo: entrega.pago === 'Tarjeta' ? 'Tarjeta en línea' : entrega.pago,
      notas: entrega.notas,
      items,
      estadoInicial
    });
  };

  const mextizzaAvanzarEstado = folio => mextizzaApiPost('avanzar_estado', { folio });
  const mextizzaCancelarOrden = (folio, motivo) => mextizzaApiPost('cancelar', { folio, motivo });
  /** Estado de un solo pedido, para la pantalla de seguimiento de la app. */
  const mextizzaEstadoOrden = folio => mextizzaApiGet('estado', { folio });
  const mextizzaListarAbiertas = () => mextizzaApiGet('listar_abiertas');
  const mextizzaListarHoy = () => mextizzaApiGet('listar_hoy');

  const mextizzaSolicitarCatering = ({ nombre, telefono, personas, fecha_evento, notas }) =>
    mextizzaApiPost('solicitar_catering', { nombre, telefono, personas, fecha_evento, notas });

  Object.assign(window, { mextizzaCrearOrden, mextizzaAvanzarEstado, mextizzaCancelarOrden, mextizzaEstadoOrden, mextizzaListarAbiertas, mextizzaListarHoy, mextizzaSolicitarCatering });
}
