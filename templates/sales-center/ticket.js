/* Ticket de venta: lo pinta para imprimir (80 o 58 mm) y lo escribe en texto
   para mandarlo por WhatsApp. NO calcula nada: el desglose (renglones,
   regalado, descuento, total) viene hecho de Code.gs (desgloseTicket_), asi
   el ticket, el WhatsApp y el corte nunca dicen numeros distintos.

   Lo usan el Centro de Ventas y pruebas/maqueta-ticket.html.

   No es un comprobante fiscal: no hay RFC ni razon social todavia, y lo dice
   al pie. La direccion de la cocina no va: es un domicilio particular. */
if (!window.mextizzaTicket) {
  const NEGOCIO = {
    zona: 'Col. Lomas Lindas, Atizapán',
    whatsapp: '55 2657 7352',
    web: 'mextizza.com'
  };
  const pesos = (n) => '$' + Math.round(Number(n) || 0).toLocaleString('es-MX');
  const esc = (t) => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  function fechaCDMX(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return '';
    const dia = d.toLocaleDateString('es-MX', { timeZone: 'America/Mexico_City', weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
      .replace(/[,.]/g, '').replace(/ de /g, ' ');
    const hora = d.toLocaleTimeString('es-MX', { timeZone: 'America/Mexico_City', hour: 'numeric', minute: '2-digit' })
      .replace(/\s*a\.\s*m\./i, ' am').replace(/\s*p\.\s*m\./i, ' pm');
    return dia.charAt(0).toUpperCase() + dia.slice(1) + ' · ' + hora;
  }

  /* La tarjeta: el sello se gana al ENTREGAR y es uno por dia. Antes de
     entregar no se promete, se explica. */
  function textoTarjeta(t) {
    if (t.estado === 'cancelada') return '';
    const premio = t.premio === 'tarjeta:pizza' ? 'Usaste el premio de pizza de tu tarjeta. '
      : t.premio === 'tarjeta:brownie' ? 'Usaste el brownie de tu tarjeta. ' : '';
    if (t.sello === 'contado') return premio + 'Este pedido horneó una rebanada de tu tarjeta.';
    if (t.sello === 'pendiente') return premio + 'Este pedido hornea una rebanada de tu tarjeta cuando te lo entreguemos.';
    return premio + 'Los pedidos sin pizza no hornean rebanada.';
  }

  function estadoPago(t) {
    if (t.estado === 'cancelada') return 'sin cobro';
    return t.pagado ? 'Pagado' : 'Por cobrar';
  }

  const CSS = `
*{box-sizing:border-box}
/* Sin "size": "80mm auto" no es valido y el navegador lo descarta. El largo del
   rollo lo decide la impresora; el ancho se elige en el dialogo de imprimir. */
@page{margin:2mm 3mm}
html,body{margin:0;background:#fff;color:#111;font-family:'Oswald',Arial,sans-serif;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.ticket{width:100%;max-width:ZONAmm;margin:0 auto;padding:2mm 0 4mm;position:relative}
.logo{display:block;width:62%;margin:0 auto 1mm}
.c{text-align:center}
.chico{font-size:CHICOpx;line-height:1.4;color:#444}
.folio{font-family:'Bungee',sans-serif;font-size:FOLIOpx;letter-spacing:1px;margin-top:2mm}
.sep{border:0;border-top:1.5px dashed #111;margin:2.5mm 0}
.fila{display:flex;justify-content:space-between;gap:2mm;font-size:BASEpx;line-height:1.35}
.fila .i{flex:1;min-width:0}
.fila .d{flex:none;font-variant-numeric:tabular-nums}
.linea{margin-bottom:1.6mm}
.extra{font-size:CHICOpx;color:#444;padding-left:4mm}
.promo{font-weight:700;padding-left:4mm}
.etq{font-size:10px;font-weight:700;letter-spacing:1.3px;text-transform:uppercase;color:#444}
.total{font-family:'Bungee',sans-serif;font-size:TOTALpx;margin-top:1.5mm}
.caja{border:1.5px solid #111;border-radius:5px;padding:2mm 2.5mm;margin-top:2.5mm;font-size:CHICOpx;line-height:1.45}
.sello{position:absolute;top:60mm;left:50%;transform:translateX(-50%) rotate(-14deg);border:4px solid #111;padding:1mm 4mm;
  font-family:'Bungee',sans-serif;font-size:SELLOpx;letter-spacing:2px;background:rgba(255,255,255,.7)}
.tachado .linea,.tachado .totales{opacity:.55}
.alerta{text-align:center;font-weight:700;margin-top:2mm;border:2px solid #111;padding:1.5mm}
`;

  /* El ticket como pagina completa, lista para imprimir. ancho: 80 o 58 (mm). */
  function documento(t, opciones) {
    const ancho = opciones && Number(opciones.ancho) === 58 ? 58 : 80;
    const base = opciones && opciones.base ? opciones.base : '/';
    const tam = ancho === 58
      ? { ZONA: 50, BASE: 11.5, CHICO: 10, FOLIO: 17, TOTAL: 16, SELLO: 22 }
      : { ZONA: 72, BASE: 13.5, CHICO: 11.5, FOLIO: 22, TOTAL: 20, SELLO: 30 };
    let css = CSS;
    Object.keys(tam).forEach((k) => { css = css.replace(new RegExp(k + 'px|' + k + 'mm', 'g'), (m) => tam[k] + m.slice(k.length)); });
    return '<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Ticket ' + esc(t.folio) + '</title>' +
      '<link rel="stylesheet" href="' + base + 'tokens/fonts.css"><style>' + css + '</style></head><body>' +
      cuerpo(t, base) + '</body></html>';
  }

  function cuerpo(t, base) {
    const cancelado = t.estado === 'cancelada';
    const renglones = (t.renglones || []).map((r) =>
      '<div class="linea">' +
        '<div class="fila"><span class="i">' + r.cant + '× ' + esc(r.nombre) + '</span><span class="d">' + pesos(r.precioUnit * r.cant) + '</span></div>' +
        (r.extras || []).map((x) => '<div class="fila extra"><span class="i">+ ' + esc(x.nombre) + '</span><span class="d">' + pesos(x.precio * r.cant) + '</span></div>').join('') +
        (r.regalado ? '<div class="fila promo"><span class="i">' + esc(r.promo) + '</span><span class="d">−' + pesos(r.regalado) + '</span></div>' : '') +
      '</div>').join('');
    const tarjeta = textoTarjeta(t);
    return '<div class="ticket' + (cancelado ? ' tachado' : '') + '">' +
      (cancelado ? '<div class="sello">CANCELADO</div>' : '') +
      '<img class="logo" src="' + (base || '/') + 'assets/lockup-pala.png" alt="Mextizza">' +
      '<div class="c chico">Pizza de masa fermentada 48 horas<br>' + NEGOCIO.zona + '<br>WhatsApp ' + NEGOCIO.whatsapp + ' · ' + NEGOCIO.web + '</div>' +
      '<div class="c folio">' + esc(t.folio) + '</div>' +
      '<div class="c chico">' + fechaCDMX(t.fecha) + ' · ' + esc(t.canal) + '</div>' +
      '<hr class="sep">' +
      '<div class="fila"><span class="i">' + esc(t.cliente) + '</span><span class="d chico">' + (t.telefono ? 'Tel. ···· ' + esc(String(t.telefono).slice(-4)) : '') + '</span></div>' +
      '<div class="fila"><span class="i">' + (t.entrega === 'pickup' ? '<b>Pasa a recoger</b>' : '<b>A domicilio</b> · ' + esc(t.destino)) + '</span></div>' +
      '<hr class="sep">' + renglones + '<hr class="sep">' +
      '<div class="totales">' +
        '<div class="fila"><span class="i">Subtotal</span><span class="d">' + pesos(t.subtotal) + '</span></div>' +
        (t.regalado ? '<div class="fila"><span class="i">Te regalamos</span><span class="d">−' + pesos(t.regalado) + '</span></div>' : '') +
        (t.descuento ? '<div class="fila"><span class="i">Recoges tú</span><span class="d">−' + pesos(t.descuento) + '</span></div>' : '') +
        (t.entrega !== 'pickup' ? '<div class="fila"><span class="i">Envío</span><span class="d">Incluido</span></div>' : '') +
        '<div class="fila total"><span class="i">Total</span><span class="d">' + pesos(t.total) + '</span></div>' +
        '<div class="fila chico" style="margin-top:1mm"><span class="i">' + esc(t.pago) + '</span><span class="d">' + estadoPago(t) + '</span></div>' +
      '</div>' +
      (t.notas ? '<div class="caja"><span class="etq">Notas</span><br>' + esc(t.notas) + '</div>' : '') +
      (cancelado && t.motivoCancelacion ? '<div class="caja"><span class="etq">Por qué se canceló</span><br>' + esc(t.motivoCancelacion) + '</div>' : '') +
      (tarjeta ? '<div class="caja"><span class="etq">Tu tarjeta</span><br>' + tarjeta + '</div>' : '') +
      '<hr class="sep">' +
      '<div class="c" style="font-weight:700">Gracias por pedir con nosotros</div>' +
      '<div class="c chico">Si algo no llegó como esperabas, escríbenos con tu folio.<br>Este ticket no es un comprobante fiscal.</div>' +
      (t.cuadra === false ? '<div class="alerta">REVISAR: el desglose no cuadra con el total guardado</div>' : '') +
    '</div>';
  }

  /* El mismo ticket en texto, para WhatsApp. WhatsApp entiende *negritas*. */
  function texto(t) {
    const L = [];
    const cancelado = t.estado === 'cancelada';
    L.push('*Mextizza* · Ticket *' + t.folio + '*' + (cancelado ? ' · *CANCELADO*' : ''));
    L.push(fechaCDMX(t.fecha));
    L.push('');
    (t.renglones || []).forEach((r) => {
      L.push(r.cant + '× ' + r.nombre + '  ' + pesos(r.precioUnit * r.cant));
      (r.extras || []).forEach((x) => L.push('   + ' + x.nombre + '  ' + pesos(x.precio * r.cant)));
      if (r.regalado) L.push('   ' + r.promo + '  −' + pesos(r.regalado));
    });
    L.push('');
    L.push('Subtotal ' + pesos(t.subtotal));
    if (t.regalado) L.push('Te regalamos −' + pesos(t.regalado));
    if (t.descuento) L.push('Recoges tú −' + pesos(t.descuento));
    if (t.entrega !== 'pickup') L.push('Envío incluido');
    L.push('*Total ' + pesos(t.total) + '* · ' + t.pago + ', ' + estadoPago(t).toLowerCase());
    if (cancelado && t.motivoCancelacion) { L.push(''); L.push(t.motivoCancelacion); }
    const tarjeta = textoTarjeta(t);
    if (tarjeta) { L.push(''); L.push(tarjeta); }
    L.push('');
    L.push('Gracias por pedir con nosotros. Este ticket no es un comprobante fiscal.');
    return L.join('\n');
  }

  /* Imprime en un iframe oculto: espera el logo y las fuentes, y si no llegan
     en 3 s imprime igual, para no dejar a la cocina esperando. */
  function imprimir(t, opciones) {
    const f = document.createElement('iframe');
    f.setAttribute('aria-hidden', 'true');
    f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;visibility:hidden';
    document.body.appendChild(f);
    const doc = f.contentWindow.document;
    doc.open(); doc.write(documento(t, opciones)); doc.close();
    let listo = false;
    const lanzar = () => {
      if (listo) return; listo = true;
      try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {}
      setTimeout(() => f.remove(), 60000);
    };
    const img = doc.querySelector('img');
    const imagen = img && !img.complete ? new Promise((ok) => { img.onload = img.onerror = ok; }) : Promise.resolve();
    const fuentes = doc.fonts && doc.fonts.ready ? doc.fonts.ready : Promise.resolve();
    Promise.all([imagen, fuentes]).then(lanzar);
    setTimeout(lanzar, 3000);
  }

  window.mextizzaTicket = { documento, cuerpo, texto, imprimir };
}
