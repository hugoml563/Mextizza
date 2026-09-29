// Avisos push del Centro de Ventas: que un pedido nuevo llegue al telefono o a
// la tablet aunque el tablero este cerrado.
//
// El navegador se suscribe con Firebase Cloud Messaging y le deja su token a
// Code.gs (accion push_registrar, con el token de administrador). Al entrar un
// pedido, Code.gs le manda el aviso a todos los equipos registrados, y
// sw-cocina.js lo muestra.
//
// El SDK de Firebase (≈120 KB) solo se carga cuando alguien toca "Activar" o
// cuando este equipo ya tenia los avisos activos, para renovar su token.
//
// La configuracion de abajo NO es secreta: es la misma que ya viaja en el
// sitio para las cuentas (ui_kits/cuenta.js). Lo secreto, la llave para
// MANDAR avisos, vive en las propiedades del Apps Script.
//
// Mismo guard que sheets-config.js: el lienzo reinyecta los scripts del head.
if (!window.__mextizzaAvisosPushLoaded) {
  window.__mextizzaAvisosPushLoaded = true;

  const FIREBASE_COCINA = {
    apiKey: 'AIzaSyBeyO3tDxL3Cb6XGe6kX55VPbNpRSQYees',
    authDomain: 'mextizza-66ca7.firebaseapp.com',
    projectId: 'mextizza-66ca7',
    appId: '1:589792730409:web:4705d5567bd50b30126b38',
    messagingSenderId: '589792730409'
  };
  const VERSION_SDK = '12.19.0';
  const LS_TOKEN = 'mextizza.cocina.push';

  const leer = () => { try { return localStorage.getItem(LS_TOKEN) || ''; } catch (e) { return ''; } };
  const guardar = (t) => { try { t ? localStorage.setItem(LS_TOKEN, t) : localStorage.removeItem(LS_TOKEN); } catch (e) {} };

  const soportado = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;
  const esIOS = () => /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const instalada = () => (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
    navigator.standalone === true;

  /* En que situacion esta ESTE equipo. El tablero pinta un texto distinto
     para cada una, porque cada una se arregla de forma distinta. */
  function estado() {
    if (esIOS() && !instalada()) return 'instalar';   // iPhone: solo desde la pantalla de inicio
    if (!soportado()) return 'no-soportado';
    if (Notification.permission === 'denied') return 'bloqueado';
    if (Notification.permission === 'granted' && leer()) return 'activo';
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
        const app = window.firebase.apps.find((a) => a.name === 'cocina') ||
          window.firebase.initializeApp(FIREBASE_COCINA, 'cocina');
        return app.messaging();
      })();
      sdk.catch(() => { sdk = null; });
    }
    return sdk;
  }

  async function registroSW() {
    const reg = await navigator.serviceWorker.register('./sw-cocina.js');
    await navigator.serviceWorker.ready;
    return reg;
  }

  async function tokenNuevo() {
    const [m, reg] = await Promise.all([mensajeria(), registroSW()]);
    // Sin vapidKey: Firebase usa la suya por defecto, no hay que generar una.
    const t = await m.getToken({ serviceWorkerRegistration: reg });
    if (!t) throw new Error('Firebase no entregó un token para este equipo.');
    return t;
  }

  /* Un nombre para reconocer el equipo en la hoja push_equipos. */
  function nombreEquipo() {
    const ua = navigator.userAgent;
    const so = /Android/.test(ua) ? 'Android' : esIOS() ? 'iPhone/iPad' : /Windows/.test(ua) ? 'Windows' : /Mac/.test(ua) ? 'Mac' : 'Equipo';
    return so + (instalada() ? ' (app)' : ' (navegador)');
  }

  /* Pide permiso y registra el equipo. Tiene que llamarse DENTRO del toque:
     Safari solo muestra el permiso si viene directo de un gesto, por eso lo
     primero, antes de cualquier await, es requestPermission. */
  function activar() {
    const st = estado();
    if (st === 'instalar') return Promise.reject(new Error('En iPhone primero agrega Cocina a la pantalla de inicio desde Safari y ábrela desde ahí.'));
    if (st === 'no-soportado') return Promise.reject(new Error('Este navegador no recibe notificaciones.'));
    const permiso = Notification.requestPermission();
    return (async () => {
      if ((await permiso) !== 'granted') {
        throw new Error('Sin permiso no se pueden mandar avisos. Actívalo en los ajustes del navegador para este sitio.');
      }
      const t = await tokenNuevo();
      await mextizzaPushRegistrar(t, nombreEquipo());
      guardar(t);
      return t;
    })();
  }

  async function desactivar() {
    const t = leer();
    guardar('');
    if (!t) return;
    try { await mextizzaPushBaja(t); } catch (e) { /* si falla, Code.gs lo limpia al primer envio */ }
    try { const m = await mensajeria(); await m.deleteToken(); } catch (e) {}
  }

  async function probar() {
    const t = leer();
    if (!t) throw new Error('Este equipo no tiene los avisos activos.');
    await mextizzaPushProbar(t);
  }

  /* Firebase cambia el token de vez en cuando. Si este equipo ya tenia avisos,
     al abrir el tablero se pide el token otra vez y, si cambio, se registra el
     nuevo: sin esto, un dia los avisos dejarian de llegar sin decir nada. */
  async function renovar() {
    if (estado() !== 'activo') return;
    try {
      const t = await tokenNuevo();
      const viejo = leer();
      if (t !== viejo) {
        await mextizzaPushRegistrar(t, nombreEquipo());
        guardar(t);
        if (viejo) mextizzaPushBaja(viejo).catch(() => {});
      }
    } catch (e) { console.warn('No se pudo renovar el aviso push:', e); }
  }

  window.mextizzaAvisosPush = { estado, activar, desactivar, probar, renovar };
}
