const { Wordmark, TapeStripe, FramedPanel, Button, Badge, Field, QtyStepper, MenuItem, Icon, StatusNote } = window.MextizzaDesignSystem_8a35ee;

/* Mismos estados que la app (Code.gs FLUJO) mapeados a los 4 pasos que ve el
   cliente. "lista" no tiene paso propio: sigue leyendose como en el horno
   hasta que el reparto sale. */
const WEB_ESTADO_A_PASO = { recibida: 0, confirmada: 0, horno: 1, lista: 1, camino: 2, entregada: 3 };

function SeguimientoPedido({ folio }) {
  const [orden, setOrden] = React.useState(null);
  const [sinRed, setSinRed] = React.useState(false);

  React.useEffect(() => {
    if (!folio || typeof mextizzaEstadoOrden !== "function") return;
    let vivo = true;
    const leer = async () => {
      try {
        const r = await mextizzaEstadoOrden(folio);
        if (vivo) { setOrden(r.orden); setSinRed(false); }
      } catch (e) {
        if (vivo) setSinRed(true);
      }
    };
    leer();
    const id = setInterval(leer, 30000);
    return () => { vivo = false; clearInterval(id); };
  }, [folio]);

  const cancelada = orden && orden.estado === "cancelada";
  const paso = orden ? (WEB_ESTADO_A_PASO[orden.estado] != null ? WEB_ESTADO_A_PASO[orden.estado] : 0) : -1;
  const pasos = [
    ["Confirmado", "Recibimos tu pedido"],
    ["En el horno", "Horno de piedra"],
    ["En camino", "Va para alla"],
    ["Entregado", ""]
  ];
  const titulo = orden ? ({
    recibida: "Pedido recibido", confirmada: "Confirmado", horno: "En el horno",
    lista: "Lista para salir", camino: "En camino", entregada: "Entregado",
    cancelada: "Cancelado"
  }[orden.estado] || "En proceso") : "Consultando...";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>{titulo}</div>
        <Badge tone={cancelada ? "rosa" : "dark"}>Pedido {folio}</Badge>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "var(--text-muted)", marginTop: 6 }}>
        {cancelada
          ? (orden.motivo_cancelacion || "El pedido fue cancelado.")
          : sinRed ? "Sin conexion para actualizar el estado."
          : "Se actualiza solo. Te confirmamos por WhatsApp."}
      </p>
      <div style={{ marginTop: 18 }}>
        {pasos.map(([t, d], i) => {
          const hecho = !cancelada && paso >= i;
          return (
            <div key={t} style={{ display: "flex", gap: 12, paddingBottom: i < pasos.length - 1 ? 16 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{
                  width: 20, height: 20, flex: "none", borderRadius: "50%", display: "grid", placeItems: "center",
                  background: hecho ? "var(--rosa-mexicano)" : "transparent",
                  border: hecho ? "none" : "2px solid var(--negro-12)"
                }}>{hecho && <Icon name="check" size={12} color="var(--blanco)" />}</span>
                {i < pasos.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 18, background: hecho ? "var(--rosa-mexicano)" : "var(--negro-12)", marginTop: 3 }} />}
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 13.5, color: hecho ? "var(--text-body)" : "var(--text-muted)" }}>{t}</div>
                {d && <div style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)", marginTop: 1 }}>{d}</div>}
              </div>
            </div>
          );
        })}
      </div>
      {orden && !cancelada && (
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "var(--border-paper)" }}>
          {/* Sin autocancelacion: en un dark kitchen sin volumen una cancelacion a
              destiempo cuesta masa e ingredientes ya comprometidos. El cliente nos
              escribe y lo resolvemos nosotros, con el folio ya en el mensaje. */}
          <Button tone="outline" size="md" block icon="whatsapp"
            onClick={() => window.open(mextizzaWhatsappLink(
              "Hola, necesito ayuda con mi pedido " + folio + "."
            ), "_blank", "noopener")}>Escríbenos por WhatsApp</Button>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 11.5, color: "var(--text-muted)", textAlign: "center", marginTop: 7 }}>
            ¿Algún cambio o problema? Mándanos mensaje con tu folio.
          </p>
        </div>
      )}
    </div>
  );
}
function CartDrawer({ open, lines, onClose, onQty, step, setStep, canal = 'Web', folioActivo, onOrdenCreada, onFolioEncontrado, onAgregarPremio }) {
  const [ready, setReady] = React.useState(false);
  const [attempted, setAttempted] = React.useState(false);
  // Un contador, no un booleano: al segundo intento fallido el valor no
  // cambiaria y el efecto no volveria a correr.
  const [intentos, setIntentos] = React.useState(0);
  React.useEffect(() => {
    if (!intentos) return;
    // Un respiro antes de buscar: los campos recien llenados tardan un render
    // en dejar de estar marcados, y sin esperar la vista salta al primero de
    // esos —que ya se veia— en vez de al que de verdad falta.
    const t = setTimeout(llevarAlPrimerFaltante, 60);
    return () => clearTimeout(t);
  }, [intentos]);
  const [entrega, setEntrega] = React.useState(null);
  const [enviando, setEnviando] = React.useState(false);
  // Lo que contesta el servidor al crear el pedido: como quedo la tarjeta y
  // que promocion se aplico. Se pinta en la pantalla de confirmacion.
  // La tarjeta ANTES de este pedido, para poder ofrecer el canje. Se consulta
  // sola en cuanto el telefono esta completo; no hay que pedirle nada al cliente.
  const [tarjetaPrevia, setTarjetaPrevia] = React.useState(null);
  const [usarPremio, setUsarPremio] = React.useState(null);
  const [tarjeta, setTarjeta] = React.useState(null);
  const [premio, setPremio] = React.useState(null);
  const [error, setError] = React.useState(null);
  // El folio vive en el padre para que sobreviva a cerrar el carrito y a recargar.
  const folio = folioActivo;
  const [telBusca, setTelBusca] = React.useState("");
  const [buscando, setBuscando] = React.useState(false);
  const [errorBusca, setErrorBusca] = React.useState(null);

  const buscarPorTelefono = async () => {
    const digits = telBusca.replace(/[^0-9]/g, "");
    if (digits.length !== 10) return setErrorBusca("Escribe los 10 digitos de tu telefono.");
    setErrorBusca(null); setBuscando(true);
    try {
      const r = await mextizzaEstadoPorTelefono(digits);
      if (!r.orden) { setErrorBusca("No encontramos pedidos con ese numero."); return; }
      onFolioEncontrado && onFolioEncontrado(r.orden.folio);
      setStep("done");
    } catch (e) {
      setErrorBusca("No se pudo consultar. Revisa tu conexion.");
    } finally { setBuscando(false); }
  };

  /* Por que no se puede enviar. Antes el aviso siempre decia "faltan datos",
     aunque el formulario estuviera completo y lo unico que pasara fuera que la
     cocina estaba cerrada. */
  const apertura = typeof mextizzaEstaAbierto === 'function'
    ? mextizzaEstaAbierto()
    : { abierto: true, texto: '' };
  const motivo = !apertura.abierto ? 'cerrado' : (!ready ? 'datos' : null);

  // entrega arranca en null: DeliveryForm no ha reportado nada en el primer
  // pintado, y leerlo directo tumbaba la pagina entera.
  const tel10 = String((entrega && entrega.telefono) || '').replace(/\D/g, '').slice(0, 10);
  React.useEffect(() => {
    if (tel10.length !== 10 || typeof mextizzaTarjeta !== 'function') {
      setTarjetaPrevia(null);
      setUsarPremio(null);
      return;
    }
    let vivo = true;
    mextizzaTarjeta(tel10)
      .then((r) => { if (vivo) setTarjetaPrevia(r.tarjeta || null); })
      // Si la consulta falla no se dice nada: la tarjeta es un extra, y el
      // pedido tiene que poder salir igual.
      .catch(() => { if (vivo) setTarjetaPrevia(null); });
    return () => { vivo = false; };
  }, [tel10]);

  const bruto = lines.reduce((s, l) => s + (l.price + (l.addonTotal || 0)) * l.qty, 0);
  /* Lo que el servidor va a descontar. Se muestra porque agregar algo gratis
     subiendo el total es la peor forma de dar un premio. */
  const promo = typeof mextizzaDescuentoPrevisto === 'function'
    ? mextizzaDescuentoPrevisto(lines, tarjetaPrevia, usarPremio,
        typeof mextizzaEs2x1 === 'function' && mextizzaEs2x1())
    : null;
  const subtotal = Math.max(0, bruto - (promo ? promo.descuento : 0));

  const confirmar = async () => {
    if (step === 'cart') return setStep('checkout');

    /* Se vuelve a mirar el reloj aqui. La pestana pudo quedarse abierta desde
       antes de la hora de cierre, y el servidor rechaza igual: mas vale decirlo
       nosotros que mandar el pedido a que rebote. */
    const ap = typeof mextizzaEstaAbierto === 'function' ? mextizzaEstaAbierto() : { abierto: true };
    if (!ap.abierto || !ready) {
      // setIntentos fuerza un repintado: el motivo de abajo se recalcula con
      // la hora de ahora, no con la de cuando se abrio la pestana.
      setAttempted(true);
      setIntentos((n) => n + 1);
      return;
    }
    setError(null);
    setEnviando(true);
    try {
      const r = await mextizzaCrearOrden({ canal, lines, entrega, usarPremio });
      setTarjeta(r.tarjeta || null);
      setPremio(r.premio || null);
      // El padre guarda el folio y vacia el carrito: antes las lineas se quedaban
      // ahi despues de enviar y el siguiente pedido arrancaba con el anterior dentro.
      onOrdenCreada && onOrdenCreada(r.folio);
      setStep('done');
    } catch (err) {
      setError('No se pudo enviar el pedido. Intenta de nuevo, o escríbenos por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };

  React.useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <>
      <div onClick={onClose} style={{
        position: 'fixed', inset: 0, background: 'rgba(26,26,26,.42)',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity var(--dur-base) var(--ease-standard)', zIndex: 40
      }} />
      <aside role="dialog" aria-modal="true" aria-label="Tu pedido" aria-hidden={!open} style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 400, maxWidth: '92vw',
        background: 'var(--surface-card)', zIndex: 41, display: 'flex', flexDirection: 'column',
        boxShadow: 'var(--shadow-raised)',
        transform: open ? 'none' : 'translateX(100%)',
        transition: 'transform var(--dur-base) var(--ease-standard)'
      }}>
        <div style={{ background: 'var(--surface-page)', padding: '22px 24px', position: 'relative', borderBottom: 'var(--border-paper)' }}>
          <TapeStripe position="bottom" height={4} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 23, color: 'var(--negro-carbon)' }}>
              {step === 'cart' ? 'Tu pedido' : step === 'checkout' ? 'Entrega' : step === 'buscar' ? 'Seguir mi pedido' : 'Confirmado'}
            </span>
            <button onClick={onClose} aria-label="Cerrar" style={{ background: 'transparent', border: 'none', color: 'var(--negro-carbon)', cursor: 'pointer' }}>
              <Icon name="close" size={20} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {step === 'cart' && (lines.length ? lines.map((l, i) => (
            <MenuItem key={l.key || l.id} name={l.name}
              description={l.addonNames && l.addonNames.length ? '+ ' + l.addonNames.join(', ') : l.desc}
              price={(l.price + (l.addonTotal || 0)) * l.qty}
              divider={i < lines.length - 1}
              action={<QtyStepper value={l.qty} min={0} onChange={n => onQty(l.key || l.id, n)} />} />
          )) : (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', paddingTop: 8 }}>
              Tu pedido está vacío. Agrega algo del menú.
            </p>
          ))}

          {step === 'checkout' && (
            <>
              <DeliveryForm compact attempted={attempted} onValidChange={setReady} onDataChange={setEntrega} />
              <Aviso2x1 activo={typeof mextizzaEs2x1 === 'function' && mextizzaEs2x1()} style={{ marginTop: 12 }} />
              <CanjeTarjeta tarjeta={tarjetaPrevia} lines={lines} valor={usarPremio}
                onChange={setUsarPremio} onAgregar={onAgregarPremio} style={{ marginTop: 12 }} />
              {tarjetaPrevia && <TarjetaPremios tarjeta={tarjetaPrevia} style={{ marginTop: 12 }} />}
              {error && <StatusNote tone="block" title="Ups" style={{ marginTop: 12 }}>{error}</StatusNote>}
            </>
          )}

          {step === 'buscar' && (
            <div style={{ marginTop: 8 }}>
              <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: "var(--text-muted)" }}>
                Escribe el telefono con el que hiciste el pedido y te mostramos como va.
              </p>
              <Field label="Telefono" required type="tel" placeholder="55 1234 5678" value={telBusca}
                onChange={e => setTelBusca(e.target.value)} style={{ marginTop: 14 }} />
              {errorBusca && <StatusNote tone="block" title="Ups" style={{ marginTop: 12 }}>{errorBusca}</StatusNote>}
              <Button tone="primary" size="lg" block disabled={buscando} style={{ marginTop: 16 }}
                onClick={buscarPorTelefono}>{buscando ? "Buscando..." : "Buscar mi pedido"}</Button>
            </div>
          )}

          {step === 'done' && (
            <>
              <FramedPanel variant="object" style={{ marginTop: 8 }}>
                <SeguimientoPedido folio={folio} />
              </FramedPanel>
              {premio && <AvisoPremio premio={premio} style={{ marginTop: 12 }} />}
              {tarjeta && <TarjetaPremios tarjeta={tarjeta} animarUltimo style={{ marginTop: 12 }} />}
            </>
          )}
        </div>

        {step !== 'done' && step !== 'buscar' && lines.length > 0 && (
          <div style={{ borderTop: 'var(--border-frame)', padding: '18px 24px', background: 'var(--surface-page)' }}>
            {[['Subtotal', bruto]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
                <span>{k}</span><span>${v}</span>
              </div>
            ))}
            {promo && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--rosa-mexicano-texto)', marginBottom: 6 }}>
                <span>{NOMBRE_PROMO[promo.motivo] || 'Promoción'}</span><span>−${promo.descuento}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>Total <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--text-muted)' }}>· envío incluido</span></span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 22, color: 'var(--text-price)' }}>${subtotal}</span>
            </div>
            <Button tone="primary" size="lg" block iconAfter={enviando ? undefined : 'chevronRight'}
              disabled={enviando} onClick={confirmar}>
              {step === 'cart' ? 'Continuar' : enviando ? <PuntosEnviando /> : 'Confirmar pedido'}
            </Button>
            {step === 'checkout' && motivo && (
              <p role="alert" style={{
                fontFamily: 'var(--font-body)', fontSize: 11.5, textAlign: 'center', marginTop: 9,
                color: motivo === 'cerrado' ? 'var(--rosa-mexicano-texto)' : 'var(--text-muted)',
              }}>
                {motivo === 'cerrado'
                  ? 'La cocina está cerrada ahorita.' + (apertura.texto ? ' Abrimos ' + apertura.texto.toLowerCase() + '.' : '')
                  : 'Faltan datos: dirección dentro del radio y forma de pago.'}
              </p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

Object.assign(window, { CartDrawer });
