/* Real single-screen navigator for the installable app (Capacitor build).
   Reuses the exact same screen components as the design-gallery AppKit in
   index.html — this file only adds navigation state, it does not duplicate
   any screen markup. Keep index.html (the "show all 6 at once" design
   review page) and this file (the real click-through) in sync when a
   screen's props change. */
function AppMobile() {
  const [entered, setEntered] = React.useState(false);
  const [tab, setTab] = React.useState('menu');
  const [screen, setScreen] = React.useState('list'); // list | detail | addons — sub-nav inside the "menu" tab
  const [detail, setDetail] = React.useState(MEXTIZZA_MENU[1].items.find(x => x.id === 'cochinita'));
  const [custom, setCustom] = React.useState(MEXTIZZA_MENU[0].items.find(x => x.id === 'roni'));
  const [lines, setLines] = React.useState([]);
  const [added, setAdded] = React.useState(null);

  const add = (it, q = 1, extra = {}) => {
    const key = it.id + (extra.addonNames && extra.addonNames.length ? ':' + extra.addonNames.join('|') : '');
    setLines(ls => {
      const e = ls.find(l => l.key === key);
      return e ? ls.map(l => l.key === key ? { ...l, qty: l.qty + q } : l) : [...ls, { ...it, ...extra, key, qty: q }];
    });
    setAdded(it.id); setTimeout(() => setAdded(null), 900);
  };
  const qty = (key, n) => setLines(ls => n <= 0 ? ls.filter(l => l.key !== key) : ls.map(l => l.key === key ? { ...l, qty: n } : l));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const goTab = (t) => { setTab(t); setScreen('list'); };

  if (!entered) return <AppWelcome onEnter={() => setEntered(true)} />;

  if (tab === 'menu') {
    if (screen === 'detail') {
      return <AppDetail item={detail} onBack={() => setScreen('list')} onAdd={add}
        onCustomize={(it) => { setCustom(it); setScreen('addons'); }} />;
    }
    if (screen === 'addons') {
      return <AppAddons item={custom} onBack={() => setScreen('detail')} onAdd={add} />;
    }
    return <AppMenu onAdd={add} added={added} onOpen={(it) => { setDetail(it); setScreen('detail'); }}
      tab={tab} onTab={goTab} count={count} />;
  }
  if (tab === 'pedido') {
    return <AppCart lines={lines} onQty={qty} onConfirm={() => goTab('seguir')} tab={tab} onTab={goTab} count={count} />;
  }
  if (tab === 'seguir') {
    return <AppTracking tab={tab} onTab={goTab} count={count} />;
  }
  // 'perfil' — not yet designed in the system; minimal on-brand placeholder rather than a crash.
  return (
    <Phone>
      <StatusBar />
      <TapeStripe position="top" height={4} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, padding: 24, textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--gris-texto)' }}>Perfil</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--negro-carbon)' }}>Próximamente</div>
      </div>
      <TabBar tab={tab} onTab={goTab} count={count} />
    </Phone>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<AppMobile />);
