/* Icon viene del design system. Este archivo lo usaba sin declararlo, apoyado
   en que el ambito de AppScreens.jsx se filtrara: al compilar el JSX cada
   archivo quedo aislado y la referencia se rompio, pero solo al abrir el
   detalle de una pizza, que es donde se usa. Los demas archivos si lo declaran. */
const { Icon } = window.MextizzaDesignSystem_8a35ee;
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
const NAV_ROOT = { entered: false, tab: 'menu', screen: 'list' };

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

  /* La app SIEMPRE arranca en la bienvenida. Antes se recordaba que ya habias
     entrado y se saltaba directo al menu; ahorraba un toque, pero la pantalla
     con el logo es lo unico de marca que ve alguien que abre la app, y perderla
     convertia el arranque en una lista de precios. El carrito, el folio y los
     datos del cliente si se siguen recordando: eso es trabajo del usuario, la
     bienvenida no. */
  /* La pila de navegacion vive aqui, no en el historial del navegador. El boton
     nativo de Android puede disparar DOS retrocesos por pulsacion: el suyo
     propio y el de nuestro listener. Leyendo el historial eso daba dos pasos y
     te mandaba al fondo. Con pila propia y un guardia de tiempo, cada pulsacion
     retrocede exactamente una pantalla venga de donde venga. */
  const [pila, setPila] = React.useState([NAV_ROOT]);
  const pilaRef = React.useRef(pila);
  pilaRef.current = pila;
  const nav = pila[pila.length - 1];
  const { entered, tab, screen } = nav;

  const [detail, setDetail] = React.useState(MEXTIZZA_MENU[1].items.find(x => x.id === 'cochinita'));
  const [custom, setCustom] = React.useState(MEXTIZZA_MENU[0].items.find(x => x.id === 'roni'));
  const [lines, setLines] = React.useState(saved && Array.isArray(saved.lines) ? saved.lines : []);
  const [added, setAdded] = React.useState(null);
  const [folio, setFolio] = React.useState((saved && saved.folio) || null);
  /* Lo que contesto el ultimo pedido. No se guarda en localStorage: es de este
     pedido, no del cliente, y al reabrir la app la tarjeta se vuelve a
     consultar al servidor, que es quien la sabe de verdad. */
  const [premio, setPremio] = React.useState(null);
  const [tarjeta, setTarjeta] = React.useState(null);
  const [cliente, setCliente] = React.useState((saved && saved.cliente) || null);
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(MEXTIZZA_LS_KEY, JSON.stringify({ lines, folio, cliente }));
    } catch (e) { /* storage unavailable — degrade to in-memory only */ }
  }, [lines, folio, cliente]);

  /* --- navegacion con pila propia --- */
  /* Al historial solo se le EMPUJAN entradas, nunca se le pide retroceder: asi
     nunca se queda vacio y el boton nativo jamas cierra la app por accidente
     estando en una pantalla interna. */
  const marcarHistorial = (n) => {
    try { window.history.pushState({ mextizza: n }, ''); } catch (e) {}
  };

  const go = (patch) => {
    const actual = pilaRef.current;
    const nueva = actual.concat([{ ...actual[actual.length - 1], ...patch }]);
    pilaRef.current = nueva;
    marcarHistorial(nueva.length);
    setPila(nueva);
  };

  /* Guardia de tiempo. Android puede entregar la MISMA pulsacion por dos vias:
     el listener de Capacitor y el popstate del retroceso nativo del WebView.
     Llegan con milisegundos de diferencia, asi que la segunda se descarta y la
     pulsacion cuenta una sola vez. La ventana es corta a proposito: dos toques
     deliberados del usuario van separados por mucho mas y si deben dar dos
     pasos. */
  const ultimoBack = React.useRef(0);
  const back = (steps = 1) => {
    const ahora = Date.now();
    if (ahora - ultimoBack.current < 400) return;
    ultimoBack.current = ahora;
    const actual = pilaRef.current;
    const nueva = actual.slice(0, Math.max(1, actual.length - steps));
    pilaRef.current = nueva;
    marcarHistorial(nueva.length);
    setPila(nueva);
  };

  React.useEffect(() => {
    marcarHistorial(1);
    /* Respaldo: si el listener de Capacitor no alcanza a registrarse, el
       retroceso nativo llega igual por aqui y el boton sigue sirviendo. */
    const onPop = () => { if (pilaRef.current.length > 1) back(1); };
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
    if (pilaRef.current.length > 1) { back(1); return; }
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
      onConfirm={(nuevoFolio, entrega, extra) => {
        // Como quedo la tarjeta y que se regalo: se pinta en seguimiento.
        setPremio((extra && extra.premio) || null);
        setTarjeta((extra && extra.tarjeta) || null);
        setFolio(nuevoFolio);
        // Solo los campos reutilizables del próximo pedido: nada de método de
        // pago ni notas, que son decisiones de cada pedido, no del cliente.
        if (entrega) setCliente({ nombre: entrega.nombre, telefono: entrega.telefono, calle: entrega.calle, colonia: entrega.colonia });
        setLines([]);
        showToast(nuevoFolio ? `Pedido #${nuevoFolio} enviado` : 'Pedido enviado');
        go({ tab: 'seguir', screen: 'list' });
      }} />;
  } else if (tab === 'seguir') {
    content = <AppTracking tab={tab} onTab={goTab} count={count} folio={folio} premio={premio} tarjeta={tarjeta} />;
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
