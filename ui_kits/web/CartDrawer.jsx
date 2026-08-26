const { Wordmark, TapeStripe, FramedPanel, Button, Badge, Field, QtyStepper, MenuItem, Icon, StatusNote } = window.MextizzaDesignSystem_8a35ee;

function CartDrawer({ open, lines, onClose, onQty, step, setStep, canal = 'Web' }) {
  const [ready, setReady] = React.useState(false);
  const [attempted, setAttempted] = React.useState(false);
  const [entrega, setEntrega] = React.useState(null);
  const [enviando, setEnviando] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [folio, setFolio] = React.useState(null);
  const subtotal = lines.reduce((s, l) => s + (l.price + (l.addonTotal || 0)) * l.qty, 0);

  const confirmar = async () => {
    if (step === 'cart') return setStep('checkout');
    if (!ready) return setAttempted(true);
    setError(null);
    setEnviando(true);
    try {
      const { folio } = await mextizzaCrearOrden({ canal, lines, entrega });
      setFolio(folio);
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
              {step === 'cart' ? 'Tu pedido' : step === 'checkout' ? 'Entrega' : 'Confirmado'}
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
              {error && <StatusNote tone="block" title="Ups" style={{ marginTop: 12 }}>{error}</StatusNote>}
            </>
          )}

          {step === 'done' && (
            <FramedPanel variant="object" style={{ marginTop: 8, textAlign: 'center' }}>
              <div style={{ display: 'grid', placeItems: 'center', gap: 14 }}>
                <Icon name="check" size={32} color="var(--rosa-mexicano)" />
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24 }}>Pedido confirmado</div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)' }}>
                  Entra al horno en cuanto lo confirmemos por WhatsApp. Llega en 30 minutos o menos.
                </p>
                <Badge tone="dark">Pedido {folio}</Badge>
              </div>
            </FramedPanel>
          )}
        </div>

        {step !== 'done' && lines.length > 0 && (
          <div style={{ borderTop: 'var(--border-frame)', padding: '18px 24px', background: 'var(--surface-page)' }}>
            {[['Subtotal', subtotal]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>
                <span>{k}</span><span>${v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 8, marginBottom: 16 }}>
              <span style={{ fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase' }}>Total <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--text-muted)' }}>· envío incluido</span></span>
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 22, color: 'var(--text-price)' }}>${subtotal}</span>
            </div>
            <Button tone="primary" size="lg" block iconAfter="chevronRight" disabled={enviando}
              onClick={confirmar}>
              {step === 'cart' ? 'Continuar' : enviando ? 'Enviando…' : 'Confirmar pedido'}
            </Button>
            {step === 'checkout' && !ready && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--text-muted)', textAlign: 'center', marginTop: 9 }}>
                Faltan datos: dirección dentro del radio y forma de pago.
              </p>
            )}
          </div>
        )}
      </aside>
    </>
  );
}

Object.assign(window, { CartDrawer });
