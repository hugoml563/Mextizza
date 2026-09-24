// Cuenta opcional de cliente, con Firebase Authentication.
//
// PEDIR NO REQUIERE CUENTA, y eso no debe cambiar: cada paso antes de pagar
// cuesta pedidos. La cuenta existe para lo que un invitado no puede hacer con
// seguridad, como cobrar un premio de la tarjeta sin que otro lo cobre por el
// con solo saber su telefono.
//
// El SDK de Firebase pesa 172 KB y NO se carga al abrir la pagina. Solo se
// carga cuando alguien toca "Entrar", o al volver alguien que ya habia entrado
// antes en este navegador (lo marca una bandera en localStorage). Un invitado
// nunca paga ese peso.
//
// La configuracion de abajo NO es secreta: Firebase la manda a cualquier
// navegador que abra el sitio. La seguridad viene de los dominios autorizados
// en la consola y de que Apps Script valida cada token con Google antes de
// creerle. Por eso puede vivir en un repositorio publico, a diferencia del
// token de administrador.
//
// Sin Google Analytics a proposito: el aviso de privacidad dice que no hay
// seguimiento, y cargar getAnalytics() lo volveria falso.
if (!window.__mextizzaCuentaLoaded) {
  window.__mextizzaCuentaLoaded = true;

  const MEXTIZZA_FIREBASE = {
    apiKey: 'AIzaSyBeyO3tDxL3Cb6XGe6kX55VPbNpRSQYees',
    authDomain: 'mextizza-66ca7.firebaseapp.com',
    projectId: 'mextizza-66ca7',
    appId: '1:589792730409:web:4705d5567bd50b30126b38'
  };
  /* Para el login nativo de Google en Android, que Google exige: dentro de un
     WebView bloquea su pantalla de acceso. */
  const MEXTIZZA_GOOGLE_WEB_CLIENT_ID =
    '589792730409-vk04mo0fvgcavk2m99akpavrdtc71le6.apps.googleusercontent.com';

  const VERSION_SDK = '12.19.0';
  const BANDERA = 'mextizza.cuenta.activa';

  /* La carpeta vendor/ se calcula desde donde vive este archivo, asi sirve
     igual en la web (/ui_kits/cuenta.js) y dentro del APK. */
  const BASE_VENDOR = (() => {
    try { return new URL('../vendor/', document.currentScript.src).href; }
    catch (e) { return '/vendor/'; }
  })();

  const esApp = () => !!(window.Capacitor && window.Capacitor.isNativePlatform &&
    window.Capacitor.isNativePlatform());

  const leerBandera = () => { try { return !!localStorage.getItem(BANDERA); } catch (e) { return false; } };
  const ponerBandera = (si) => {
    try { si ? localStorage.setItem(BANDERA, '1') : localStorage.removeItem(BANDERA); } catch (e) {}
  };

  let usuario = null;
  // Sin bandera no hay sesion que restaurar: se sabe desde ya que es invitado.
  let listo = !leerBandera();
  const oyentes = new Set();

  const estado = () => ({
    listo,
    usuario: usuario ? {
      uid: usuario.uid,
      nombre: usuario.displayName || '',
      correo: usuario.email || '',
      conGoogle: (usuario.providerData || []).some(p => p && p.providerId === 'google.com')
    } : null,
    // Google en la app necesita el plugin nativo, que todavia no llega. Hasta
    // entonces el boton no se ofrece ahi en vez de fallar al tocarlo.
    googleDisponible: !esApp()
  });
  const avisar = () => { const e = estado(); oyentes.forEach(f => { try { f(e); } catch (x) {} }); };

  const cargarScript = (src) => new Promise((ok, mal) => {
    const s = document.createElement('script');
    s.src = src;
    s.onload = ok;
    s.onerror = () => mal(new Error('sdk'));
    document.head.appendChild(s);
  });

  let cargando = null;
  function cargarSdk() {
    if (cargando) return cargando;
    cargando = cargarScript(BASE_VENDOR + 'firebase-app-compat-' + VERSION_SDK + '.js')
      .then(() => cargarScript(BASE_VENDOR + 'firebase-auth-compat-' + VERSION_SDK + '.js'))
      .then(() => {
        const app = window.firebase.apps.length
          ? window.firebase.app() : window.firebase.initializeApp(MEXTIZZA_FIREBASE);
        const auth = app.auth();
        // Los correos de Firebase (recuperar contrasena) salen en espanol.
        auth.languageCode = 'es';
        return new Promise((ok) => {
          let primera = true;
          auth.onAuthStateChanged((u) => {
            usuario = u || null;
            listo = true;
            // Si la sesion guardada ya no existe, se apaga la bandera para no
            // volver a cargar el SDK de gusto en la proxima visita.
            ponerBandera(!!u);
            avisar();
            if (primera) { primera = false; ok(auth); }
          });
        });
      })
      .catch((e) => {
        cargando = null;
        listo = true;
        avisar();
        throw e;
      });
    return cargando;
  }

  /* Los codigos de Firebase traducidos a algo que un cliente entienda. El
     mensaje original ("auth/invalid-credential") no le dice nada a nadie. */
  const MENSAJES = {
    'auth/invalid-credential': 'El correo o la contraseña no coinciden.',
    'auth/wrong-password': 'El correo o la contraseña no coinciden.',
    'auth/user-not-found': 'El correo o la contraseña no coinciden.',
    'auth/invalid-email': 'Ese correo no parece válido.',
    'auth/missing-password': 'Falta la contraseña.',
    'auth/weak-password': 'La contraseña es muy corta. Usa al menos 8 caracteres.',
    'auth/email-already-in-use': 'Ya hay una cuenta con ese correo. Entra con él.',
    'auth/too-many-requests': 'Demasiados intentos. Espera unos minutos y vuelve a probar.',
    'auth/network-request-failed': 'No hay conexión. Revisa tu internet.',
    'auth/popup-blocked': 'Tu navegador bloqueó la ventana de Google. Permite ventanas emergentes para mextizza.com.',
    'auth/popup-closed-by-user': '',
    'auth/cancelled-popup-request': '',
    'auth/user-disabled': 'Esta cuenta está desactivada. Escríbenos por WhatsApp.',
    'auth/account-exists-with-different-credential':
      'Ese correo ya tiene cuenta con otro método. Entra con tu contraseña.',
    'sdk': 'No se pudo abrir el inicio de sesión. Revisa tu conexión y vuelve a probar.'
  };
  const mensajeDeError = (e) => {
    const c = (e && (e.code || e.message)) || '';
    return c in MENSAJES ? MENSAJES[c] : 'Algo salió mal. Vuelve a probar en un momento.';
  };

  const mextizzaCuenta = {
    estado,
    suscribir(fn) { oyentes.add(fn); fn(estado()); return () => oyentes.delete(fn); },

    /* Se llama al abrir el dialogo: asi el SDK ya viene en camino mientras la
       persona decide, y el boton no se siente lento al tocarlo. */
    precargar() { return cargarSdk().catch(() => null); },

    async conGoogle() {
      const auth = await cargarSdk();
      // Ventana emergente, no redireccion: la redireccion falla en Safari y en
      // navegadores que bloquean almacenamiento de terceros, porque el sitio no
      // vive en firebaseapp.com. Firebase recomienda la ventana para ese caso.
      const proveedor = new window.firebase.auth.GoogleAuthProvider();
      proveedor.setCustomParameters({ prompt: 'select_account' });
      await auth.signInWithPopup(proveedor);
    },

    async entrar(correo, clave) {
      const auth = await cargarSdk();
      await auth.signInWithEmailAndPassword(String(correo).trim(), clave);
    },

    async registrar(nombre, correo, clave) {
      if (!clave || clave.length < 8) {
        const e = new Error(); e.code = 'auth/weak-password'; throw e;
      }
      const auth = await cargarSdk();
      const cred = await auth.createUserWithEmailAndPassword(String(correo).trim(), clave);
      const limpio = String(nombre || '').trim().slice(0, 60);
      if (limpio) {
        await cred.user.updateProfile({ displayName: limpio });
        usuario = auth.currentUser;
        avisar();
      }
    },

    async recuperar(correo) {
      const auth = await cargarSdk();
      await auth.sendPasswordResetEmail(String(correo).trim());
    },

    async salir() {
      const auth = await cargarSdk();
      await auth.signOut();
    },

    /* El token que el servidor valida con Google. Null si no hay sesion: la
       cuenta es opcional, asi que "sin token" es un caso normal, no un error. */
    async token() {
      if (!usuario) return null;
      try { return await usuario.getIdToken(); } catch (e) { return null; }
    },

    mensajeDeError,
    MEXTIZZA_GOOGLE_WEB_CLIENT_ID
  };

  window.mextizzaCuenta = mextizzaCuenta;

  // Solo quien ya habia entrado en este navegador paga la carga del SDK.
  if (leerBandera()) cargarSdk().catch(() => {});
}
