// Notificaciones del pedido para el CLIENTE: si la cocina cancela, le llega
// aunque haya cerrado la pagina.
//
// Mismo esquema que los avisos de la cocina (templates/sales-center/
// avisos-push.js): el navegador se suscribe con Firebase Cloud Messaging y le
// deja su token a Code.gs (accion push_pedido) en el pedido de ese folio. Si
// la cocina cancela, Code.gs le manda el aviso y /sw-cliente.js lo muestra.
//
// El SDK de Firebase (~120 KB) solo se carga cuando el cliente toca "Avisame".
// La configuracion de abajo NO es secreta: es la misma de ui_kits/cuenta.js.
if (!window.__mextizzaAvisosClienteLoaded) {
  window.__mextizzaAvisosClienteLoaded = true;

  const FIREBASE_CLIENTE = {
    apiKey: 'AIzaSyBeyO3tDxL3Cb6XGe6kX55VPbNpRSQYees',
    authDomain: 'mextizza-66ca7.firebaseapp.com',
    projectId: 'mextizza-66ca7',
    appId: '1:589792730409:web:4705d5567bd50b30126b38',
    messagingSenderId: '589792730409'
  };
  const VERSION_SDK = '12.19.0';
  const LS_FOLIOS = 'mextizza.web.avisos';   // folios que ya piden aviso en este navegador

  const folios = () => { try { return JSON.parse(localStorage.getItem(LS_FOLIOS) || '[]'); } catch (e) { return []; } };
  const anotar = (folio) => {
    try { localStorage.setItem(LS_FOLIOS, JSON.stringify([folio].concat(folios().filter((f) => f !== folio)).slice(0, 10))); } catch (e) {}
  };

  const esApp = () => !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  const soportado = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  const esIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const instalada = () => (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    navigator.standalone === true;

  /* El WebView de la app Android no tiene push web; iPhone solo lo tiene con
     el sitio instalado en la pantalla de inicio. */
  function estado(folio) {
    if (esApp()) return 'no-soportado';
    if (esIOS() && !instalada()) return 'instalar';
    if (!soportado()) return 'no-soportado';
    if (Notification.permission === 'denied') return 'bloqueado';
    if (Notification.permission === 'granted' && folio && folios().indexOf(folio) !== -1) return 'activo';
    return 'inactivo';
  }

  function cargarScript(src) {
    return new Promise((ok, mal) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = ok;
      s.onerror = () => mal(new Error('No se pudo cargar ' + src));
      document.head.appendChild(s);
    });
  }

  let sdk = null;
  function mensajeria() {
    if (!sdk) {
      sdk = (async () => {
        if (!window.firebase || !window.firebase.initializeApp) {
          await cargarScript('/vendor/firebase-app-compat-' + VERSION_SDK + '.js');
        }
        if (!window.firebase.messaging) {
          await cargarScript('/vendor/firebase-messaging-compat-' + VERSION_SDK + '.js');
        }
        const app = window.firebase.apps.find((a) => a.name === 'cliente') ||
          window.firebase.initializeApp(FIREBASE_CLIENTE, 'cliente');
        return app.messaging();
      })();
      sdk.catch(() => { sdk = null; });
    }
    return sdk;
  }

  async function registroSW() {
    // En la raiz: solo muestra avisos, no guarda nada en cache.
    const reg = await navigator.serviceWorker.register('/sw-cliente.js', { scope: '/' });
    await navigator.serviceWorker.ready;
    return reg;
  }

  /* Pide permiso y suscribe el pedido. Se llama DENTRO del toque: Safari solo
     muestra el permiso si viene directo de un gesto, por eso requestPermission
     va antes de cualquier await. */
  function activar(folio) {
    const st = estado(folio);
    if (st === 'instalar') return Promise.reject(new Error('En iPhone, primero agrega mextizza.com a tu pantalla de inicio desde Safari.'));
    if (st === 'no-soportado') return Promise.reject(new Error('Este navegador no recibe notificaciones.'));
    if (!folio) return Promise.reject(new Error('Falta el folio del pedido.'));
    const permiso = Notification.requestPermission();
    return (async () => {
      if ((await permiso) !== 'granted') {
        throw new Error('Sin permiso no podemos avisarte. Puedes activarlo en los ajustes del navegador para mextizza.com.');
      }
      const [m, reg] = await Promise.all([mensajeria(), registroSW()]);
      const t = await m.getToken({ serviceWorkerRegistration: reg });
      if (!t) throw new Error('No pudimos activar los avisos en este navegador.');
      await mextizzaPushPedido(folio, t);
      anotar(folio);
      return t;
    })();
  }

  window.mextizzaAvisosCliente = { estado, activar };
}
