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
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);

  const showToast = (msg) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  const add = (it, q = 1, extra = {}) => {
    const key = it.id + (extra.addonNames && extra.addonNames.length ? ':' + extra.addonNames.join('|') : '');
    setLines(ls => {
      const e = ls.find(l => l.key === key);
      return e ? ls.map(l => l.key === key ? { ...l, qty: l.qty + q } : l) : [...ls, { ...it, ...extra, key, qty: q }];
    });
    setAdded(it.id); setTimeout(() => setAdded(null), 900);
  };
  // Used from Detail/Addons (screens that leave the menu list): add the item,
  // show a confirmation toast, then return to the menu list so the customer
  // can keep browsing or head to the cart — instead of leaving them stranded
  // on a screen that looks like nothing happened.
  const addAndReturn = (it, q = 1, extra = {}) => {
    add(it, q, extra);
    showToast(`${it.name} agregado al pedido`);
    setTab('menu'); setScreen('list');
  };
  const qty = (key, n) => setLines(ls => n <= 0 ? ls.filter(l => l.key !== key) : ls.map(l => l.key === key ? { ...l, qty: n } : l));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const goTab = (t) => { setTab(t); setScreen('list'); };

  // Wire Android's hardware/gesture back button to in-app navigation instead of
  // the Capacitor default (exit the app immediately, since this SPA never pushes
  // browser history entries). Only runs inside the native shell — a no-op in the
  // plain browser preview, where window.Capacitor doesn't exist.
  const handleBack = React.useCallback(() => {
    const exit = () => { try { window.Capacitor.Plugins.App.exitApp(); } catch (e) {} };
    if (!entered) { exit(); return; }
    if (tab === 'menu') {
      if (screen === 'addons') { setScreen('detail'); return; }
      if (screen === 'detail') { setScreen('list'); return; }
      exit();
      return;
    }
    goTab('menu');
  }, [entered, tab, screen]);

  // Defensive on every level: a throw in here must never take down the whole
  // app render — it only degrades to the OS default back-button behavior.
  // Retries for a few seconds: window.Capacitor / Plugins.App can still be
  // settling in when this effect first fires, and a single failed check with
  // no retry meant the listener silently never attached (back button kept
  // exiting the app even though nothing crashed).
  React.useEffect(() => {
    let handle, cancelled = false, attempts = 0;
    const tryRegister = () => {
      if (cancelled) return;
      try {
        const cap = window.Capacitor;
        if (!(cap && cap.isNativePlatform && cap.isNativePlatform())) return; // browser preview — nothing to wire
        const AppPlugin = cap.Plugins && cap.Plugins.App;
        if (AppPlugin && typeof AppPlugin.addListener === 'function') {
          AppPlugin.addListener('backButton', handleBack).then(h => { if (!cancelled) handle = h; }).catch(() => {});
          return;
        }
      } catch (e) { /* fall through to retry */ }
      if (attempts++ < 20) setTimeout(tryRegister, 150); // up to ~3s for the native bridge to be ready
    };
    tryRegister();
    return () => { cancelled = true; try { handle && handle.remove(); } catch (e) {} };
  }, [handleBack]);

  let content;
  if (!entered) {
    content = <AppWelcome onEnter={() => setEntered(true)} />;
  } else if (tab === 'menu') {
    if (screen === 'detail') {
      content = <AppDetail item={detail} onBack={() => setScreen('list')} onAdd={addAndReturn}
        onCustomize={(it) => { setCustom(it); setScreen('addons'); }} />;
    } else if (screen === 'addons') {
      content = <AppAddons item={custom} onBack={() => setScreen('detail')} onAdd={addAndReturn} />;
    } else {
      content = <AppMenu onAdd={add} added={added} onOpen={(it) => { setDetail(it); setScreen('detail'); }}
        tab={tab} onTab={goTab} count={count} />;
    }
  } else if (tab === 'pedido') {
    content = <AppCart lines={lines} onQty={qty} onConfirm={() => goTab('seguir')} tab={tab} onTab={goTab} count={count} />;
  } else if (tab === 'seguir') {
    content = <AppTracking tab={tab} onTab={goTab} count={count} />;
  } else {
    // 'perfil' — not yet designed in the system; minimal on-brand placeholder rather than a crash.
    content = (
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

  return (
    <>
      {content}
      {toast && (
        <div style={{
          position: 'fixed', left: '50%', bottom: 96, transform: 'translateX(-50%)', zIndex: 999,
          background: 'var(--negro-carbon)', color: 'var(--blanco-hueso)', fontFamily: 'var(--font-body)',
          fontWeight: 600, fontSize: 13.5, padding: '12px 20px', borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-raised)', display: 'flex', alignItems: 'center', gap: 8, maxWidth: '85vw'
        }}>
          <Icon name="check" size={16} color="var(--rosa-mexicano)" />
          {toast}
        </div>
      )}
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<AppMobile />);
