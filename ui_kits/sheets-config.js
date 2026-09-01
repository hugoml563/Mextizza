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

  const mextizzaAvanzarEstado = folio => mextizzaApiPost('avanzar_estado', { folio }, true);
  const mextizzaCancelarOrden = (folio, motivo) => mextizzaApiPost('cancelar', { folio, motivo }, true);
  /** Estado de un solo pedido, para la pantalla de seguimiento de la app. */
  const mextizzaEstadoOrden = folio => mextizzaApiGet('estado', { folio });
  /** Ultimo pedido de un telefono: recupera el seguimiento en otro dispositivo. */
  const mextizzaEstadoPorTelefono = telefono => mextizzaApiGet('estado_por_telefono', { telefono });
  const mextizzaListarAbiertas = () => mextizzaApiGet('listar_abiertas', {}, true);
  const mextizzaListarHoy = () => mextizzaApiGet('listar_hoy', {}, true);

  const mextizzaSolicitarCatering = ({ nombre, telefono, personas, fecha_evento, notas }) =>
    mextizzaApiPost('solicitar_catering', { nombre, telefono, personas, fecha_evento, notas });

  Object.assign(window, { mextizzaCrearOrden, mextizzaAvanzarEstado, mextizzaCancelarOrden, mextizzaEstadoOrden, mextizzaEstadoPorTelefono, mextizzaListarAbiertas, mextizzaListarHoy, mextizzaSolicitarCatering, mextizzaTokenAdmin, mextizzaGuardarTokenAdmin, mextizzaOlvidarTokenAdmin });
}
