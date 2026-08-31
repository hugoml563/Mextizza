/* Real single-screen navigator for the installable app (Capacitor build).
   Reuses the exact same screen components as the design-gallery AppKit in
   index.html — this file only adds navigation state, it does not duplicate
   any screen markup. Keep index.html (the "show all 6 at once" design
   review page) and this file (the real click-through) in sync when a
   screen's props change. */

/* Navigation is driven through the real browser history (pushState/popstate)
   rather than plain React state. That is deliberate: the Capacitor default
   hardware-back behaviour is `webView.canGoBack() ? goBack() : finish()`.
   With no history entries the WebView can never go back, so Android back
   always hit finish() and killed the app. Pushing real entries makes the
   built-in path do the right thing even if the JS plugin listener below
   never attaches. */
const NAV_ROOT = { entered: false, tab: 'menu', screen: 'list', depth: 0 };

/* Survives the app being closed: an open order folio has to outlive the
   process or the customer loses tracking for a pizza that is still being
   made. Cart lines are kept too so a half-built order is not lost. */
const MEXTIZZA_LS_KEY = 'mextizza.app.v1';
function mextizzaLoadPersisted() {
  try {
    const raw = window.localStorage.getItem(MEXTIZZA_LS_KEY);
    const d = raw ? JSON.parse(raw) : null;
    return d && typeof d === 'object' ? d : null;
  } catch (e) { return null; } // private mode / storage disabled
}

function AppMobile() {
  const saved = React.useRef(mextizzaLoadPersisted()).current;

  const [nav, setNav] = React.useState(
    saved && saved.entered ? { ...NAV_ROOT, entered: true } : NAV_ROOT
  );
  const navRef = React.useRef(nav);
  navRef.current = nav;
  const { entered, tab, screen } = nav;

  const [detail, setDetail] = React.useState(MEXTIZZA_MENU[1].items.find(x => x.id === 'cochinita'));
  const [custom, setCustom] = React.useState(MEXTIZZA_MENU[0].items.find(x => x.id === 'roni'));
  const [lines, setLines] = React.useState(saved && Array.isArray(saved.lines) ? saved.lines : []);
  const [added, setAdded] = React.useState(null);
  const [folio, setFolio] = React.useState((saved && saved.folio) || null);
  const [cliente, setCliente] = React.useState((saved && saved.cliente) || null);
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(MEXTIZZA_LS_KEY, JSON.stringify({ entered, lines, folio, cliente }));
    } catch (e) { /* storage unavailable — degrade to in-memory only */ }
  }, [entered, lines, folio, cliente]);

  /* --- history-backed navigation --- */
  const go = (patch) => {
    const next = { ...navRef.current, ...patch, depth: navRef.current.depth + 1 };
    navRef.current = next;
    try { window.history.pushState(next, ''); } catch (e) {}
    setNav(next);
  };
  const back = (steps = 1) => {
    try { window.history.go(-steps); } catch (e) {}
  };

  React.useEffect(() => {
    try { window.history.replaceState(navRef.current, ''); } catch (e) {}
    const onPop = (e) => {
      const s = e.state && typeof e.state === 'object' && e.state.tab ? e.state : NAV_ROOT;
      navRef.current = s;
      setNav(s);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

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
  /* Detail and Addons sit one and two history entries deep respectively, so
     returning to the menu list is a real history rewind — that keeps the
     back stack honest instead of piling on a forward entry. */
  const addAndReturn = (steps) => (it, q = 1, extra = {}) => {
    add(it, q, extra);
    showToast(`${it.name} agregado al pedido`);
    back(steps);
  };
  const qty = (key, n) => setLines(ls => n <= 0 ? ls.filter(l => l.key !== key) : ls.map(l => l.key === key ? { ...l, qty: n } : l));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const goTab = (t) => go({ tab: t, screen: 'list' });

  /* If the JS listener does attach, this runs instead of the Capacitor
     default; both paths end up calling the same history rewind, so behaviour
     matches either way. Only a true root screen exits the app. */
  const handleBack = React.useCallback(() => {
    if (navRef.current.depth > 0) { back(1); return; }
    try {
      const cap = window.Capacitor;
      if (cap.Plugins && cap.Plugins.App) cap.Plugins.App.exitApp();
      else cap.nativeCallback('App', 'exitApp', {});
    } catch (e) {}
  }, []);

  React.useEffect(() => {
    let handle, cancelled = false, attempts = 0;
    const tryRegister = () => {
      if (cancelled) return;
      try {
        const cap = window.Capacitor;
        if (!(cap && cap.isNativePlatform && cap.isNativePlatform())) return; // browser preview
        if (cap.Plugins && cap.Plugins.App && typeof cap.Plugins.App.addListener === 'function') {
          cap.Plugins.App.addListener('backButton', handleBack).then(h => { if (!cancelled) handle = h; }).catch(() => {});
          return;
        }
        if (typeof cap.addListener === 'function') {
          handle = cap.addListener('App', 'backButton', handleBack);
          return;
        }
      } catch (e) { /* fall through to retry */ }
      if (attempts++ < 20) setTimeout(tryRegister, 150);
    };
    tryRegister();
    return () => { cancelled = true; try { handle && handle.remove(); } catch (e) {} };
  }, [handleBack]);

  let content;
  if (!entered) {
    content = <AppWelcome onEnter={() => go({ entered: true })} />;
  } else if (tab === 'menu') {
    if (screen === 'detail') {
      content = <AppDetail item={detail} onBack={() => back(1)} onAdd={addAndReturn(1)}
        onCustomize={(it) => { setCustom(it); go({ screen: 'addons' }); }} />;
    } else if (screen === 'addons') {
      content = <AppAddons item={custom} onBack={() => back(1)} onAdd={addAndReturn(2)} />;
    } else {
      content = <AppMenu added={added} onOpen={(it) => { setDetail(it); go({ screen: 'detail' }); }}
        onAdd={(it) => { add(it); showToast(`${it.name} agregado al pedido`); }}
        tab={tab} onTab={goTab} count={count} />;
    }
  } else if (tab === 'pedido') {
    content = <AppCart lines={lines} onQty={qty} tab={tab} onTab={goTab} count={count}
      inicialCliente={cliente}
      onConfirm={(nuevoFolio, entrega) => {
        setFolio(nuevoFolio);
        // Solo los campos reutilizables del próximo pedido: nada de método de
        // pago ni notas, que son decisiones de cada pedido, no del cliente.
        if (entrega) setCliente({ nombre: entrega.nombre, telefono: entrega.telefono, calle: entrega.calle, colonia: entrega.colonia });
        setLines([]);
        showToast(nuevoFolio ? `Pedido #${nuevoFolio} enviado` : 'Pedido enviado');
        go({ tab: 'seguir', screen: 'list' });
      }} />;
  } else if (tab === 'seguir') {
    content = <AppTracking tab={tab} onTab={goTab} count={count} folio={folio} />;
  } else {
    content = <AppPerfil tab={tab} onTab={goTab} count={count}
      cliente={cliente} folio={folio}
      onVerPedido={() => goTab('seguir')}
      onBorrarDatos={() => {
        try { window.localStorage.removeItem(MEXTIZZA_LS_KEY); } catch (e) {}
        setCliente(null); setFolio(null); setLines([]);
        showToast('Datos borrados de este teléfono');
      }} />;
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
