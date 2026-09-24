const { Icon } = window.MextizzaDesignSystem_8a35ee;

/* Cuenta opcional: el boton del encabezado y el dialogo para entrar.

   Nada de esto se interpone entre el cliente y su pizza. El dialogo solo
   aparece si alguien toca "Entrar", y lo primero que dice es que es opcional.

   El estado viene de window.mextizzaCuenta (ui_kits/cuenta.js), que es quien
   habla con Firebase. Aqui solo se pinta. */

function useCuenta() {
  const [estado, setEstado] = React.useState(() =>
    window.mextizzaCuenta ? window.mextizzaCuenta.estado()
      : { listo: true, usuario: null, googleDisponible: false });
  React.useEffect(() =>
    window.mextizzaCuenta ? window.mextizzaCuenta.suscribir(setEstado) : undefined, []);
  return estado;
}

const primerNombre = (u) => String((u && (u.nombre || u.correo)) || '').split(/[\s@]/)[0];

function BotonCuenta({ onAbrir }) {
  const { usuario } = useCuenta();
  return (
    <button onClick={onAbrir} aria-label={usuario ? 'Mi cuenta' : 'Entrar a mi cuenta'} style={{
      display: 'flex', alignItems: 'center', gap: 7, background: 'transparent',
      border: 'var(--border-frame)', borderRadius: 'var(--radius-sm)', padding: '9px 12px',
      color: 'var(--negro-carbon)', cursor: 'pointer', maxWidth: 160,
      fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase'
    }}>
      <Icon name="user" size={17} />
      <span className="cuenta-texto" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {usuario ? primerNombre(usuario) : 'Entrar'}
      </span>
    </button>
  );
}

const estiloCampo = {
  width: '100%', boxSizing: 'border-box', padding: '12px 12px', marginTop: 5,
  border: '2px solid var(--negro-carbon)', borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-body)', fontSize: 16, background: '#FFFFFF', color: 'var(--negro-carbon)'
};
const estiloEtiqueta = {
  display: 'block', marginTop: 12, fontFamily: 'var(--font-body)', fontWeight: 600,
  fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--negro-carbon)'
};
const estiloPrimario = {
  width: '100%', marginTop: 16, padding: '13px 14px', minHeight: 48, cursor: 'pointer',
  background: 'var(--rosa-mexicano)', color: '#FFFFFF', border: 'none', borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase'
};
const estiloEnlace = {
  background: 'none', border: 'none', padding: '8px 0', cursor: 'pointer', color: 'var(--rosa-mexicano-texto)',
  fontFamily: 'var(--font-body)', fontSize: 13, textDecoration: 'underline'
};

function DialogoCuenta({ abierto, onCerrar, fijo = true }) {
  const { usuario, googleDisponible } = useCuenta();
  const [modo, setModo] = React.useState('entrar'); // entrar | crear | recuperar
  const [nombre, setNombre] = React.useState('');
  const [correo, setCorreo] = React.useState('');
  const [clave, setClave] = React.useState('');
  const [error, setError] = React.useState('');
  const [aviso, setAviso] = React.useState('');
  const [ocupado, setOcupado] = React.useState(false);
  const caja = React.useRef(null);
  const cerrarRef = React.useRef(null);

  React.useEffect(() => {
    if (!abierto) return;
    // El SDK empieza a bajar mientras la persona decide.
    window.mextizzaCuenta && window.mextizzaCuenta.precargar();
    setError(''); setAviso(''); setClave('');
    const previo = document.activeElement;
    if (cerrarRef.current) cerrarRef.current.focus();
    const alTeclear = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onCerrar(); return; }
      if (e.key !== 'Tab' || !caja.current) return;
      const foco = caja.current.querySelectorAll('button:not([disabled]), [href], input, [tabindex]:not([tabindex="-1"])');
      if (!foco.length) return;
      const primero = foco[0];
      const ultimo = foco[foco.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    };
    document.addEventListener('keydown', alTeclear);
    return () => {
      document.removeEventListener('keydown', alTeclear);
      try { previo && previo.focus && previo.focus(); } catch (e) {}
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  const C = window.mextizzaCuenta;
  const correr = async (fn) => {
    if (ocupado || !C) return;
    setOcupado(true); setError(''); setAviso('');
    try { await fn(); }
    catch (e) { setError(C.mensajeDeError(e)); }
    finally { setOcupado(false); }
  };

  const enviar = (e) => {
    e.preventDefault();
    if (modo === 'entrar') return correr(() => C.entrar(correo, clave));
    if (modo === 'crear') return correr(() => C.registrar(nombre, correo, clave));
    return correr(async () => {
      await C.recuperar(correo);
      setAviso('Te mandamos un correo para crear una contraseña nueva. Si no llega en unos minutos, revisa en spam.');
    });
  };

  const etiquetaBoton = modo === 'entrar' ? 'Entrar' : modo === 'crear' ? 'Crear mi cuenta' : 'Mandarme el correo';

  return (
    <div onClick={onCerrar} style={{
      position: fijo ? 'fixed' : 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(26,26,26,.62)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 18, overflowY: 'auto'
    }}>
      <div ref={caja} role="dialog" aria-modal="true" aria-labelledby="cuenta-titulo"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--blanco-hueso)', borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--negro-carbon)', padding: '24px 22px 20px',
          width: '100%', maxWidth: 380, position: 'relative', margin: 'auto',
          boxShadow: '0 18px 50px rgba(0,0,0,.35)'
        }}>
        <button ref={cerrarRef} onClick={onCerrar} aria-label="Cerrar"
          style={{
            position: 'absolute', top: 8, right: 8, width: 44, height: 44,
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            background: 'transparent', border: 'none', borderRadius: '50%'
          }}>
          <Icon name="close" size={19} />
        </button>

        {usuario ? (
          <div>
            <h2 id="cuenta-titulo" style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '4px 0 6px' }}>
              Hola, {primerNombre(usuario)}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, margin: 0, color: 'var(--gris-tinta, #4A4A4A)' }}>
              {usuario.conGoogle ? 'Entraste con tu cuenta de Google, ' : 'Entraste con '}{usuario.correo}.
            </p>
            <button onClick={() => correr(() => C.salir())} disabled={ocupado}
              style={{ ...estiloPrimario, background: 'transparent', color: 'var(--negro-carbon)', border: '2px solid var(--negro-carbon)' }}>
              {ocupado ? <span className="mx-puntos" aria-label="Cerrando"><i></i><i></i><i></i></span> : 'Cerrar sesión'}
            </button>
            {error && <p role="alert" style={{ color: 'var(--rosa-mexicano-texto)', fontSize: 13, marginTop: 10 }}>{error}</p>}
          </div>
        ) : (
          <div>
            <h2 id="cuenta-titulo" style={{ fontFamily: 'var(--font-display)', fontSize: 28, margin: '4px 0 6px' }}>
              {modo === 'recuperar' ? 'Nueva contraseña' : 'Tu cuenta'}
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, margin: 0, lineHeight: 1.5 }}>
              {modo === 'recuperar'
                ? 'Escribe tu correo y te mandamos un enlace para crear otra.'
                : 'Es opcional. Puedes pedir igual sin entrar.'}
            </p>

            {modo !== 'recuperar' && googleDisponible && (
              <div>
                <button onClick={() => correr(() => C.conGoogle())} disabled={ocupado}
                  style={{ ...estiloPrimario, background: '#FFFFFF', color: 'var(--negro-carbon)', border: '2px solid var(--negro-carbon)' }}>
                  Seguir con Google
                </button>
                <div aria-hidden="true" style={{
                  display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0 0',
                  fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--gris-tinta, #4A4A4A)'
                }}>
                  <span style={{ flex: 1, height: 1, background: 'rgba(26,26,26,.2)' }}></span>
                  o con tu correo
                  <span style={{ flex: 1, height: 1, background: 'rgba(26,26,26,.2)' }}></span>
                </div>
              </div>
            )}

            <form onSubmit={enviar} noValidate>
              {modo === 'crear' && (
                <label style={estiloEtiqueta}>Tu nombre
                  <input value={nombre} onChange={(e) => setNombre(e.target.value)}
                    autoComplete="name" maxLength={60} style={estiloCampo} />
                </label>
              )}
              <label style={estiloEtiqueta}>Correo
                <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)}
                  autoComplete="email" inputMode="email" required style={estiloCampo} />
              </label>
              {modo !== 'recuperar' && (
                <label style={estiloEtiqueta}>Contraseña
                  <input type="password" value={clave} onChange={(e) => setClave(e.target.value)}
                    autoComplete={modo === 'crear' ? 'new-password' : 'current-password'}
                    minLength={modo === 'crear' ? 8 : undefined} required style={estiloCampo} />
                  {modo === 'crear' && (
                    <span style={{ display: 'block', marginTop: 5, fontWeight: 400, fontSize: 12, letterSpacing: 0, textTransform: 'none' }}>
                      Mínimo 8 caracteres.
                    </span>
                  )}
                </label>
              )}

              {error && <p role="alert" style={{ color: 'var(--rosa-mexicano-texto)', fontFamily: 'var(--font-body)', fontSize: 13, margin: '12px 0 0' }}>{error}</p>}
              {aviso && <p role="status" style={{ fontFamily: 'var(--font-body)', fontSize: 13, margin: '12px 0 0' }}>{aviso}</p>}

              <button type="submit" disabled={ocupado} style={estiloPrimario}>
                {ocupado ? <span className="mx-puntos" aria-label="Un momento"><i></i><i></i><i></i></span> : etiquetaBoton}
              </button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
              {modo === 'entrar' && <button style={estiloEnlace} onClick={() => { setModo('crear'); setError(''); setAviso(''); }}>Crear una cuenta</button>}
              {modo === 'entrar' && <button style={estiloEnlace} onClick={() => { setModo('recuperar'); setError(''); setAviso(''); }}>Olvidé mi contraseña</button>}
              {modo !== 'entrar' && <button style={estiloEnlace} onClick={() => { setModo('entrar'); setError(''); setAviso(''); }}>Ya tengo cuenta</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { useCuenta, BotonCuenta, DialogoCuenta });
