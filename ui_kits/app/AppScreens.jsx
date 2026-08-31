const DS = window.MextizzaDesignSystem_8a35ee;
const { Wordmark, TapeStripe, Stamp, DotRow, FramedPanel, Button, Badge, Field, QtyStepper, MenuItem, Icon, StatusNote } = DS;

/* Resilient reference: the compiled bundle may lag a fresh component by one build. */
const ART_FALLBACK = {
  pala: { negro: 'lockup-pala.png', hueso: 'lockup-pala-hueso.png', ratio: 733 / 306, cap: 0.41 },
  completo: { negro: 'lockup-completo.png', hueso: 'lockup-completo-hueso.png', ratio: 733 / 421, cap: 0.30 }
};
const Lockup = DS.Lockup || function LockupFallback({ variant = 'pala', tone = 'negro', size = 44, base = '', subtitle, tagline, align = 'center', style }) {
  const art = ART_FALLBACK[variant] || ART_FALLBACK.pala;
  const height = size / art.cap;
  return (
    <div style={{ textAlign: align, ...style }}>
      <img src={base + 'assets/' + art[tone === 'hueso' ? 'hueso' : 'negro']} alt="Mextizza"
        style={{ height, width: height * art.ratio, display: align === 'left' ? 'block' : 'inline-block' }} />
      {subtitle && <div style={{ fontFamily: 'var(--font-body)', fontSize: Math.max(11, size * 0.24), letterSpacing: Math.max(4, size * 0.14), textTransform: 'uppercase', color: tone === 'hueso' ? 'var(--blanco-hueso)' : 'var(--negro-carbon)', opacity: 0.6, marginTop: 10 }}>{subtitle}</div>}
      {tagline && <div style={{ fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--terracota-horno)', marginTop: 14, lineHeight: 1.3 }}>{tagline}</div>}
    </div>
  );
};


/* Phone frame — 390x844, the app's design viewport. */
function Phone({ children }) {
  return (
    <div className="app-phone-frame" style={{
      width: 390, height: 844, background: 'var(--surface-page)', borderRadius: 'var(--radius-lg)',
      border: 'var(--border-frame)', overflow: 'hidden', position: 'relative',
      boxShadow: 'var(--shadow-raised)',
      display: 'flex', flexDirection: 'column'
    }}>{children}</div>
  );
}

function StatusBar({ dark }) {
  const c = dark ? 'var(--blanco-hueso)' : 'var(--negro-carbon)';
  return (
    <div className="app-status-bar" style={{
      height: 34, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: c
    }}>
      <span>19:40</span>
      <span style={{ display: 'flex', alignItems: 'flex-end', gap: 5 }}>
        <span style={{ display: 'flex', alignItems: 'flex-end', gap: 2 }}>
          {[5, 8, 11].map(h => <span key={h} style={{ width: 3, height: h, background: c, borderRadius: 1 }} />)}
        </span>
        <span style={{ width: 16, height: 9, border: `1.5px solid ${c}`, borderRadius: 2, padding: 1.5 }}>
          <span style={{ display: 'block', width: '70%', height: '100%', background: c, borderRadius: 1 }} />
        </span>
      </span>
    </div>
  );
}

function TabBar({ tab, onTab, count }) {
  const tabs = [['menu', 'bag', 'Menú'], ['pedido', 'cart', 'Pedido'], ['seguir', 'clock', 'Seguir'], ['perfil', 'user', 'Perfil']];
  return (
    <nav style={{
      flex: 'none', background: 'var(--surface-card)', display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)', position: 'relative', paddingBottom: 8,
      borderTop: 'var(--border-paper)'
    }}>
      <TapeStripe position="top" height={3} />
      {tabs.map(([k, ic, l]) => {
        const on = tab === k;
        return (
          <button key={k} onClick={() => onTab(k)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer', padding: '14px 0 6px',
            display: 'grid', justifyItems: 'center', gap: 5, position: 'relative',
            color: on ? 'var(--rosa-mexicano-texto)' : 'var(--gris-texto)'
          }}>
            <Icon name={ic} size={22} />
            <span style={{ fontFamily: 'var(--font-label)', fontSize: 9, letterSpacing: 0.5, textTransform: 'uppercase' }}>{l}</span>
            {k === 'pedido' && count > 0 && (
              <span style={{
                position: 'absolute', top: 8, right: 26, minWidth: 16, height: 16, padding: '0 4px',
                borderRadius: 'var(--radius-sm)', background: 'var(--rosa-mexicano)', color: 'var(--blanco)',
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 10, display: 'grid', placeItems: 'center'
              }}>{count}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

/* ---------- Screen 1: login / welcome ---------- */
function AppWelcome({ onEnter }) {
  return (
    <Phone>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <StatusBar />
        <TapeStripe position="top" height={4} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 28px', textAlign: 'center' }}>
          <Lockup variant="completo" size={50} base="../../" subtitle="Pizzería" tagline="Horneada como allá, gozada como acá" />
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)', marginTop: 30 }}>
            {MEXTIZZA_FACTS.estilo}. Entregamos en Lomas Lindas y colonias vecinas.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 22 }}>
            <a href={mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.')} target="_blank" rel="noopener" aria-label="Mextizza en WhatsApp"
              style={{ display: 'flex', color: 'var(--text-muted)', borderBottom: 'none' }}>
              <Icon name="whatsapp" size={20} />
            </a>
            <a href={MEXTIZZA_SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Mextizza en Instagram"
              style={{ display: 'flex', color: 'var(--text-muted)', borderBottom: 'none' }}>
              <Icon name="instagram" size={20} />
            </a>
            <a href={MEXTIZZA_SOCIAL.facebook} target="_blank" rel="noopener" aria-label="Mextizza en Facebook"
              style={{ display: 'flex', color: 'var(--text-muted)', borderBottom: 'none' }}>
              <Icon name="facebook" size={20} />
            </a>
          </div>
        </div>
        <div style={{ padding: '0 24px 28px', display: 'grid', gap: 10 }}>
          <Button tone="primary" size="lg" block onClick={onEnter}>Entrar con mi número</Button>
          <Button tone="outline" size="lg" block icon="whatsapp"
            onClick={() => window.open(mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'), '_blank', 'noopener')}>Pedir por WhatsApp</Button>
        </div>
      </div>
    </Phone>
  );
}

/* ---------- Screen 2: menu ---------- */
function AppMenu({ onAdd, onOpen, tab, onTab, count, added }) {
  return (
    <Phone>
      <div style={{ flex: 'none', background: 'var(--surface-page)', position: 'relative', borderBottom: 'var(--border-paper)' }}>
        <StatusBar />
        <div style={{ padding: '4px 20px 18px' }}>
          <Lockup variant="pala" size={26} align="left" base="../../" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, color: 'var(--text-muted)' }}>
            <Icon name="pin" size={14} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12 }}>Lomas Lindas · llega en ~30 min</span>
          </div>
        </div>
        <TapeStripe position="bottom" height={3} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 20px 24px', background: 'var(--surface-card)' }}>
        {MEXTIZZA_MENU.map(g => (
          <div key={g.cat} style={{ marginBottom: 24 }}>
            <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)', marginBottom: 10 }}>{g.title}</div>
            {g.items.map((it, j) => (
              <MenuItem key={it.id} name={it.name} description={it.desc} price={it.price} photo={it.photo} photoSize={58}
                divider={j < g.items.length - 1} onClick={() => onOpen(it)}
                badge={it.flag ? <Badge tone={it.flag === 'Del mes' ? 'dorado' : 'rosa'}>{it.flag}</Badge> : null}
                action={<Button size="sm" tone={added === it.id ? 'dark' : 'outline'}
                  /* stopPropagation: MenuItem puts the row's onClick on the same
                     wrapper that holds this button, so without it one tap on "+"
                     both added the item AND opened the detail screen — where the
                     customer added it a second time. */
                  onClick={e => { e.stopPropagation(); onAdd(it); }}>
                  {added === it.id ? '✓' : '+'}
                </Button>} />
            ))}
          </div>
        ))}
      </div>
      <TabBar tab={tab} onTab={onTab} count={count} />
    </Phone>
  );
}

/* ---------- Screen 3: product detail ---------- */
function AppDetail({ item, onBack, onAdd, onCustomize }) {
  const [q, setQ] = React.useState(1);
  return (
    <Phone>
      <div style={{ flex: 'none', height: 300, background: 'var(--surface-sunken)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {item.photo && <img src={item.photo} alt={item.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />}
        {item.photo && <div style={{ position: 'absolute', inset: '0 0 55% 0', background: 'linear-gradient(rgba(26,26,26,.45),transparent)', zIndex: 1 }} />}
        <div style={{ position: 'relative', zIndex: 2 }}><StatusBar dark={!!item.photo} /></div>
        <button onClick={onBack} aria-label="Volver" style={{
          position: 'absolute', top: 44, left: 16, zIndex: 3, width: 44, height: 44, borderRadius: 'var(--radius-sm)',
          background: 'var(--surface-card)', border: 'var(--border-frame)', color: 'var(--negro-carbon)', cursor: 'pointer',
          display: 'grid', placeItems: 'center'
        }}><Icon name="chevronLeft" size={20} /></button>
        <div style={{ flex: 1, display: 'grid', placeItems: 'center', position: 'relative', zIndex: 2 }}>
          {!item.photo && <span style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Fotografía pendiente
          </span>}
        </div>
        <div style={{ position: 'absolute', right: 16, bottom: -22, zIndex: 3 }}>
          <Stamp lines={['Fermento', '48h']} size={92} style={{ background: 'var(--surface-page)', borderRadius: '50%' }} />
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '30px 20px 20px', background: 'var(--surface-card)' }}>
        {item.flag && <Badge tone={item.flag === 'Del mes' ? 'dorado' : 'rosa'}>{item.flag}</Badge>}
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 30, marginTop: 12, lineHeight: 1.15 }}>{item.name}</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)', marginTop: 8 }}>{item.desc}</p>
        <div style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 26, color: 'var(--text-price)', marginTop: 16 }}>${item.price}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
          <Badge tone="quiet">Horno de piedra</Badge><Badge tone="quiet">Masa de 48h</Badge><Badge tone="quiet">Horneada al pedido</Badge>
        </div>
        <button onClick={() => onCustomize && onCustomize(item)} style={{
          width: '100%', marginTop: 22, textAlign: 'left', cursor: 'pointer',
          background: 'var(--surface-accent-soft)', border: '2px solid var(--rosa-mexicano)',
          borderRadius: 'var(--radius-md)', padding: '14px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12
        }}>
          <span>
            <span style={{ display: 'block', fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-body)' }}>Complementos</span>
            <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, marginTop: 3 }}>¿Más queso? ¿Más peperoni?</span>
          </span>
          <Icon name="chevronRight" size={20} color="var(--rosa-mexicano)" />
        </button>
        <Field label="Notas para la cocina" as="textarea" rows={2} placeholder="Sin cebolla, orilla bien dorada" style={{ marginTop: 18 }} />
      </div>
      <div style={{ flex: 'none', borderTop: 'var(--border-paper)', background: 'var(--surface-page)', padding: '16px 20px 22px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <QtyStepper value={q} onChange={setQ} size={44} />
        <Button tone="primary" size="lg" block onClick={() => onAdd(item, q)}>{`Agregar $${item.price * q}`}</Button>
      </div>
    </Phone>
  );
}

/* ---------- Screen 4: add-ons / complementos ---------- */
function AppAddons({ item, onBack, onAdd }) {
  const [picks, setPicks] = React.useState({});
  const bump = (id, n) => setPicks(p => {
    const next = { ...p };
    if (n <= 0) delete next[id]; else next[id] = n;
    return next;
  });
  const flat = MEXTIZZA_ADDONS.flatMap(g => g.items);
  const chosen = flat.filter(i => picks[i.id]);
  const addonTotal = chosen.reduce((s, i) => s + i.price * picks[i.id], 0);
  const total = item.price + addonTotal;
  return (
    <Phone>
      <div style={{ flex: 'none', background: 'var(--surface-page)', position: 'relative', borderBottom: 'var(--border-paper)' }}>
        <StatusBar />
        <div style={{ padding: '2px 20px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <button onClick={onBack} aria-label="Volver" style={{
            width: 44, height: 44, flex: 'none', marginTop: 4, borderRadius: 'var(--radius-sm)',
            background: 'transparent', border: 'var(--border-frame)', color: 'var(--negro-carbon)',
            cursor: 'pointer', display: 'grid', placeItems: 'center'
          }}><Icon name="chevronLeft" size={18} /></button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: 1.15 }}>Complementos</h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-muted)', marginTop: 4 }}>
              Sobre tu {item.name} · opcional
            </p>
          </div>
        </div>
        <TapeStripe position="bottom" height={3} />
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px', background: 'var(--surface-card)' }}>
        {MEXTIZZA_ADDONS.map(g => (
          <div key={g.id} style={{ marginBottom: 22 }}>
            <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)' }}>{g.title}</div>
            {g.note && <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 3 }}>{g.note}</div>}
            <div style={{ marginTop: 10 }}>
              {g.items.map((it, j) => {
                const n = picks[it.id] || 0;
                return (
                  <div key={it.id} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    borderBottom: j < g.items.length - 1 ? 'var(--border-dashed)' : 'none'
                  }}>
                    <button onClick={() => bump(it.id, n ? 0 : 1)} aria-pressed={n > 0}
                      aria-label={n ? 'Quitar ' + it.name : 'Agregar ' + it.name} style={{
                        flex: 1, minHeight: 48, padding: '8px 0', background: 'transparent', border: 'none',
                        cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12
                      }}>
                      <span style={{
                        width: 24, height: 24, flex: 'none', borderRadius: 'var(--radius-sm)',
                        background: n ? 'var(--rosa-mexicano)' : 'transparent',
                        border: n ? 'none' : '2px solid var(--negro-12)',
                        display: 'grid', placeItems: 'center'
                      }}>{n > 0 && <Icon name="check" size={14} color="var(--blanco)" />}</span>
                      <span style={{ flex: 1, fontFamily: 'var(--font-body)', fontWeight: n ? 700 : 500, fontSize: 14, color: 'var(--text-body)' }}>{it.name}</span>
                      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13.5, color: 'var(--text-price)', minWidth: 42, textAlign: 'right' }}>+${it.price}</span>
                    </button>
                    {n > 0 && <QtyStepper value={n} min={0} onChange={v => bump(it.id, v)} size={44} />}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        <FramedPanel variant="paper">
          <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Cómo se cocina</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)' }}>
            Los quesos, carnes y verduras entran al horno con la pizza. El último toque se agrega al salir, para que no se queme.
          </p>
        </FramedPanel>
      </div>

      <div style={{ flex: 'none', borderTop: 'var(--border-paper)', background: 'var(--surface-page)', padding: '14px 20px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-muted)' }}>
            {chosen.length ? chosen.length + (chosen.length === 1 ? ' complemento' : ' complementos') + ' · +$' + addonTotal : 'Sin complementos'}
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 20, color: 'var(--text-price)' }}>${total}</span>
        </div>
        <Button tone="primary" size="lg" block onClick={() => onAdd(item, 1, {
          addonTotal, addonNames: chosen.map(c => c.name + (picks[c.id] > 1 ? ' x' + picks[c.id] : ''))
        })}>Agregar al pedido</Button>
      </div>
    </Phone>
  );
}

/* ---------- Screen 5: cart / checkout ---------- */
function AppCart({ lines, onQty, onConfirm, tab, onTab, count }) {
  const subtotal = lines.reduce((s, l) => s + (l.price + (l.addonTotal || 0)) * l.qty, 0);
  const [ready, setReady] = React.useState(false);
  const [attempted, setAttempted] = React.useState(false);
  const [entrega, setEntrega] = React.useState(null);
  const [enviando, setEnviando] = React.useState(false);
  const [error, setError] = React.useState(null);

  const confirmar = async () => {
    if (!ready) return setAttempted(true);
    setError(null);
    setEnviando(true);
    try {
      const { folio } = await mextizzaCrearOrden({ canal: 'App', lines, entrega });
      onConfirm(folio);
    } catch (err) {
      setError('No se pudo enviar el pedido. Intenta de nuevo, o escríbenos por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <Phone>
      <div style={{ flex: 'none', background: 'var(--surface-page)', position: 'relative', paddingBottom: 16, borderBottom: 'var(--border-paper)' }}>
        <StatusBar />
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 27, padding: '4px 20px 0' }}>Tu pedido</h1>
        <TapeStripe position="bottom" height={3} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '14px 20px', background: 'var(--surface-card)' }}>
        {lines.length ? lines.map((l, i) => (
          <MenuItem key={l.key || l.id} name={l.name}
            description={l.addonNames && l.addonNames.length ? '+ ' + l.addonNames.join(', ') : l.desc}
            price={(l.price + (l.addonTotal || 0)) * l.qty}
            divider={i < lines.length - 1}
            action={<QtyStepper value={l.qty} min={0} onChange={n => onQty(l.key || l.id, n)} size={44} />} />
        )) : <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', paddingTop: 8 }}>Tu pedido está vacío.</p>}

        {lines.length > 0 && (
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: 'var(--border-paper)' }}>
            <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)', marginBottom: 12 }}>Entrega y pago</div>
            <DeliveryForm compact attempted={attempted} onValidChange={setReady} onDataChange={setEntrega} />
            {error && <StatusNote tone="block" title="Ups" style={{ marginTop: 12 }}>{error}</StatusNote>}
          </div>
        )}
      </div>
      {lines.length > 0 && (
        <div style={{ flex: 'none', borderTop: 'var(--border-paper)', background: 'var(--surface-page)', padding: '16px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-muted)' }}>Envío incluido en el precio</span>
            <span style={{ fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 20, color: 'var(--text-price)' }}>${subtotal}</span>
          </div>
          <Button tone="primary" size="lg" block iconAfter="chevronRight" disabled={enviando}
            onClick={confirmar}>{enviando ? 'Enviando…' : `Confirmar · $${subtotal}`}</Button>
          {!ready && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', marginTop: 8 }}>
              Faltan datos: dirección dentro del radio y forma de pago.
            </p>
          )}
        </div>
      )}
      <TabBar tab={tab} onTab={onTab} count={count} />
    </Phone>
  );
}

/* ---------- Screen 6: order tracking ---------- */
/* Backend order states, in flow order (Code.gs FLUJO), mapped onto the four
   steps the customer sees. 'lista' has no separate step — it still reads as
   "en el horno" until the delivery actually leaves. */
const ESTADO_A_PASO = { recibida: 0, confirmada: 0, horno: 1, lista: 1, camino: 2, entregada: 3 };

function AppTracking({ tab, onTab, count, folio }) {
  const [orden, setOrden] = React.useState(null);
  const [errorEstado, setErrorEstado] = React.useState(false);

  // Poll the real order state while this screen is open. Without a folio (the
  // design gallery in index.html) it stays on the static placeholder below.
  React.useEffect(() => {
    if (!folio || typeof mextizzaEstadoOrden !== 'function') return;
    let vivo = true;
    const leer = async () => {
      try {
        const { orden } = await mextizzaEstadoOrden(folio);
        if (vivo) { setOrden(orden); setErrorEstado(false); }
      } catch (e) {
        if (vivo) setErrorEstado(true);
      }
    };
    leer();
    const id = setInterval(leer, 30000);
    return () => { vivo = false; clearInterval(id); };
  }, [folio]);

  const cancelada = orden && orden.estado === 'cancelada';
  const pasoActual = orden ? (ESTADO_A_PASO[orden.estado] != null ? ESTADO_A_PASO[orden.estado] : 0) : 1;
  const baseSteps = [['Confirmado', 'Recibimos tu pedido'], ['En el horno', 'Gozney XL · ≤10 min'], ['En camino', 'Mandadito asignado'], ['Entregado', '']];
  const steps = baseSteps.map(([t, d], i) => [t, d, orden ? (!cancelada && i <= pasoActual) : i <= 1]);
  return (
    <Phone>
      <div style={{ flex: 'none', background: 'var(--surface-page)', position: 'relative', paddingBottom: 22, borderBottom: 'var(--border-paper)' }}>
        <StatusBar />
        <div style={{ padding: '4px 20px 0' }}>
          {/* folio comes from the real backend after a confirmed order; the
              bare '1042' is the design-gallery placeholder in index.html. */}
          <Badge tone={cancelada ? 'rosa' : 'dorado'}>Pedido #{folio || '1042'}</Badge>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 32, marginTop: 12 }}>
            {orden ? ({
              recibida: 'Pedido recibido', confirmada: 'Confirmado', horno: 'En el horno',
              lista: 'Lista para salir', camino: 'En camino', entregada: 'Entregado',
              cancelada: 'Cancelado'
            }[orden.estado] || 'En proceso') : (folio ? 'Consultando…' : 'Llega 20:10')}
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', marginTop: 6 }}>
            {cancelada
              ? (orden.motivo_cancelacion || 'El pedido fue cancelado.')
              : errorEstado
                ? 'Sin conexión para actualizar el estado.'
                : (folio ? 'Se actualiza solo · radio de 3 km' : 'Estimado 28 min · radio de 3 km')}
          </p>
        </div>
        <TapeStripe position="bottom" height={3} />
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '22px 20px', background: 'var(--surface-card)' }}>
        {steps.map(([t, d, done], i) => (
          <div key={t} style={{ display: 'flex', gap: 14, paddingBottom: i < steps.length - 1 ? 22 : 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{
                width: 22, height: 22, flex: 'none', borderRadius: '50%', display: 'grid', placeItems: 'center',
                background: done ? 'var(--rosa-mexicano)' : 'transparent',
                border: done ? 'none' : '2px solid var(--negro-12)'
              }}>{done && <Icon name="check" size={13} color="var(--blanco)" />}</span>
              {i < steps.length - 1 && <span style={{ width: 2, flex: 1, minHeight: 26, background: done ? 'var(--rosa-mexicano)' : 'var(--negro-12)', marginTop: 4 }} />}
            </div>
            <div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, color: done ? 'var(--text-body)' : 'var(--text-muted)' }}>{t}</div>
              {d && <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{d}</div>}
            </div>
          </div>
        ))}
        <FramedPanel variant="paper" style={{ marginTop: 26 }}>
          <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>Al recibir</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6, color: 'var(--text-muted)' }}>
            Abre la caja de inmediato: la ventilación del kraft evita que la orilla se reblandezca.
          </p>
        </FramedPanel>
      </div>
      <TabBar tab={tab} onTab={onTab} count={count} />
    </Phone>
  );
}

Object.assign(window, { Phone, StatusBar, TabBar, AppWelcome, AppMenu, AppDetail, AppAddons, AppCart, AppTracking });
