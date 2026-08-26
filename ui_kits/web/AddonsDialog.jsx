const { TapeStripe, FramedPanel, Button, Badge, QtyStepper, Icon } = window.MextizzaDesignSystem_8a35ee;

/* Complementos picker — opens when a pizza is added from the menu. */
function AddonsDialog({ item, onClose, onAdd }) {
  const [picks, setPicks] = React.useState({});
  const [qty, setQty] = React.useState(1);
  React.useEffect(() => { setPicks({}); setQty(1); }, [item && item.id]);
  React.useEffect(() => {
    if (!item) return;
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);
  if (!item) return null;
  const bump = (id, n) => setPicks(p => { const next = { ...p }; if (n <= 0) delete next[id]; else next[id] = n; return next; });
  const flat = MEXTIZZA_ADDONS.flatMap(g => g.items);
  const chosen = flat.filter(i => picks[i.id]);
  const addonTotal = chosen.reduce((s, i) => s + i.price * picks[i.id], 0);
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26,26,26,.42)', zIndex: 50 }} />
      <div role="dialog" aria-modal="true" aria-label={'Complementos para ' + item.name} style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 51,
        width: 620, maxWidth: '94vw', maxHeight: '86vh', display: 'flex', flexDirection: 'column',
        background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-raised)', overflow: 'hidden'
      }}>
        <div style={{ background: 'var(--surface-page)', padding: '22px 26px', position: 'relative', borderBottom: 'var(--border-paper)' }}>
          <TapeStripe position="bottom" height={4} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)' }}>Complementos · opcional</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, marginTop: 5 }}>{item.name}</div>
            </div>
            <button onClick={onClose} aria-label="Cerrar" style={{ background: 'transparent', border: 'none', color: 'var(--negro-carbon)', cursor: 'pointer', minWidth: 44, minHeight: 44 }}>
              <Icon name="close" size={20} />
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 26px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.6, color: 'var(--text-muted)', margin: '0 0 18px' }}>
            Los quesos, carnes y verduras entran al horno con la pizza. El último toque va al salir.
          </p>
          <div className="web-addons-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 30px' }}>
            {MEXTIZZA_ADDONS.map(g => (
              <div key={g.id} style={{ marginBottom: 18 }}>
                <div style={{ fontFamily: 'var(--font-label)', fontSize: 9.5, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)', paddingBottom: 4 }}>{g.title}</div>
                {g.items.map((it, j) => {
                  const n = picks[it.id] || 0;
                  return (
                    <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 10, borderBottom: j < g.items.length - 1 ? 'var(--border-dashed)' : 'none' }}>
                      <button onClick={() => bump(it.id, n ? 0 : 1)} aria-pressed={n > 0}
                        aria-label={n ? 'Quitar ' + it.name : 'Agregar ' + it.name} style={{
                          flex: 1, minHeight: 46, padding: '6px 0', background: 'transparent', border: 'none',
                          cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 11
                        }}>
                        <span style={{
                          width: 22, height: 22, flex: 'none', borderRadius: 'var(--radius-sm)',
                          background: n ? 'var(--rosa-mexicano)' : 'transparent',
                          border: n ? 'none' : '2px solid var(--negro-12)', display: 'grid', placeItems: 'center'
                        }}>{n > 0 && <Icon name="check" size={13} color="var(--blanco)" />}</span>
                        <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontWeight: n ? 700 : 500, fontSize: 13.5, color: 'var(--text-body)' }}>{it.name}</span>
                        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, color: 'var(--text-price)' }}>+${it.price}</span>
                      </button>
                      {n > 0 && <QtyStepper value={n} min={0} onChange={v => bump(it.id, v)} size={32} />}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: 'var(--border-frame)', background: 'var(--surface-page)', padding: '16px 26px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <QtyStepper value={qty} onChange={setQty} size={44} />
          <div style={{ flex: 1, fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-muted)' }}>
            {chosen.length ? chosen.length + (chosen.length === 1 ? ' complemento · +$' : ' complementos · +$') + addonTotal : 'Sin complementos'}
          </div>
          <Button tone="primary" size="lg" onClick={() => onAdd(item, qty, {
            addonTotal, addonNames: chosen.map(c => c.name + (picks[c.id] > 1 ? ' x' + picks[c.id] : ''))
          })}>{`Agregar $${(item.price + addonTotal) * qty}`}</Button>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { AddonsDialog });
