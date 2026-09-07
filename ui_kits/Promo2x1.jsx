const { Icon, Button } = window.MextizzaDesignSystem_8a35ee;

/* Anuncio del 2x1 en la portada (web) y al entrar (app).

   El dia y la hora salen de MEXTIZZA_2X1, nunca escritos a mano: mover la
   promocion no puede dejar un letrero anunciando el dia equivocado.

   Los dos avisos son informativos. El descuento lo decide el servidor
   (es2x1_ en Code.gs) con su propio reloj; si el telefono trae mal la hora, lo
   peor que pasa es que el letrero no cuadre — el cobro no cambia. */

const P2X1 = (typeof MEXTIZZA_2X1 !== 'undefined')
  ? MEXTIZZA_2X1
  : { dia: 3, desde: 19, nombre: 'Miércoles', enMinuscula: 'miércoles' };

// 19 -> "7 pm". La promocion siempre cae de noche, pero la conversion se hace
// bien por si algun dia se mueve a la mañana.
function horaBonita(h) {
  const ampm = h >= 12 ? 'pm' : 'am';
  const doce = h % 12 === 0 ? 12 : h % 12;
  return doce + ' ' + ampm;
}

const HORA_2X1_TEXTO = horaBonita(P2X1.desde);
const MENSAJE_2X1 = P2X1.nombre + ' de 2x1 · desde las ' + HORA_2X1_TEXTO +
  ' · pide dos pizzas y la más barata va por nuestra cuenta';

/* ------------------------------------------------------------------ web ---
   Cinta bajo el encabezado. Negro con dorado: 7.9:1 de contraste, y no compite
   con el rosa, que en esta pagina es el color de las acciones. Una cinta rosa
   habria peleado con el boton de pedir. */
function CintaPromo({ activo, vistaPrevia, style }) {
  if (!activo && !vistaPrevia) return null;

  // Cuatro copias llenan una pantalla ancha; el grupo va duplicado para que el
  // ciclo no tenga costura. Solo la primera se anuncia a un lector de pantalla:
  // las demas son la misma frase repetida.
  const grupo = (oculto) => (
    <div className="mx-cinta-grupo" aria-hidden={oculto || undefined}
      style={{ display: 'flex', flexShrink: 0 }}>
      {[0, 1, 2, 3].map((i) => (
        <span key={i} aria-hidden={oculto || i > 0 ? 'true' : undefined}
          style={{
            display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
            fontFamily: 'var(--font-body)', letterSpacing: 0.2,
            color: 'var(--dorado-masa)',
          }}>
          <b style={{
            fontFamily: 'var(--font-display)', letterSpacing: 0.5,
            color: 'var(--dorado-masa)', lineHeight: 1,
          }}>2x1</b>
          {MENSAJE_2X1}
          <span aria-hidden="true" style={{ opacity: 0.5 }}>·</span>
        </span>
      ))}
    </div>
  );

  return (
    /* El relleno y los tamanos viven en tokens/base.css, no aqui: en linea
       ganaban siempre y dejaban muerto el ajuste para telefono. */
    <div className="mx-cinta" style={{
      background: 'var(--negro-carbon)',
      borderBottom: '2px solid var(--dorado-masa)', ...style,
    }}>
      <div className="mx-cinta-pista">
        {grupo(false)}
        {grupo(true)}
      </div>
      {/* Solo en vista previa. Si alguien cae aqui por accidente un dia que no
          es de promocion, tiene que quedarle claro que no hay 2x1 hoy. */}
      {vistaPrevia && !activo && (
        /* En pantalla ancha va sobrepuesta a la derecha; en telefono pasa a su
           propio renglon, porque encimada tapaba justo el mensaje que se quiere
           revisar. El posicionamiento vive en base.css. */
        <span className="mx-cinta-vista">Vista previa · hoy no hay 2x1</span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ app ---
   Aviso al entrar, solo el dia de la promocion y una vez al dia.

   Se muestra aunque todavia no sean las 7: quien abre la app en la tarde
   alcanza a planear su pedido. Por eso el texto dice a que hora empieza en vez
   de afirmar que ya esta activa, que seria mentira a las 4 de la tarde. */

const CLAVE_VISTO = 'mextizza:promo2x1:visto';

function hoyEnCDMX() {
  try {
    return new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit',
    }).format(new Date());
  } catch (e) {
    return String(new Date().getDate());
  }
}

/* Decide si toca mostrarlo. Fuera de aqui nadie tiene que saber la regla. */
function debeMostrarPromo() {
  if (typeof mextizzaAhoraCDMX !== 'function') return false;
  if (mextizzaAhoraCDMX().dia !== P2X1.dia) return false;
  try {
    return window.localStorage.getItem(CLAVE_VISTO) !== hoyEnCDMX();
  } catch (e) {
    // Sin almacenamiento se muestra igual: mejor repetirlo que perderlo.
    return true;
  }
}

function marcarPromoVista() {
  try { window.localStorage.setItem(CLAVE_VISTO, hoyEnCDMX()); } catch (e) {}
}

function PopupPromo({ abierto, onCerrar, onVerMenu, vistaPrevia }) {
  const caja = React.useRef(null);
  const cerrarRef = React.useRef(null);

  /* Al abrir, el foco entra al dialogo y queda atrapado dentro: con Tab no se
     debe poder llegar a la pantalla de atras, que esta tapada. Al cerrar,
     regresa a donde estaba. */
  React.useEffect(() => {
    if (!abierto) return;
    const previo = document.activeElement;
    if (cerrarRef.current) cerrarRef.current.focus();

    const alTeclear = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onCerrar(); return; }
      if (e.key !== 'Tab' || !caja.current) return;
      const foco = caja.current.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
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

  const yaEmpezo = typeof mextizzaEs2x1 === 'function' && mextizzaEs2x1();
  const esDiaDePromo = typeof mextizzaAhoraCDMX === 'function' &&
    mextizzaAhoraCDMX().dia === P2X1.dia;

  return (
    <div onClick={onCerrar} style={{
      position: 'absolute', inset: 0, zIndex: 60,
      background: 'rgba(26,26,26,.62)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 22,
    }}>
      <div ref={caja} role="dialog" aria-modal="true" aria-labelledby="promo-titulo"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--negro-carbon)', borderRadius: 'var(--radius-lg)',
          border: '2px solid var(--dorado-masa)', padding: '26px 22px 22px',
          width: '100%', maxWidth: 320, position: 'relative',
          boxShadow: '0 18px 50px rgba(0,0,0,.45)',
        }}>
        <button ref={cerrarRef} onClick={onCerrar} aria-label="Cerrar el aviso"
          style={{
            position: 'absolute', top: 8, right: 8, width: 44, height: 44,
            display: 'grid', placeItems: 'center', cursor: 'pointer',
            background: 'transparent', border: 'none', borderRadius: '50%',
            color: 'var(--dorado-masa)',
          }}>
          <Icon name="close" size={19} color="var(--dorado-masa)" />
        </button>

        <div style={{
          fontFamily: 'var(--font-display)', fontSize: 54, lineHeight: 1,
          color: 'var(--dorado-masa)', textAlign: 'center', letterSpacing: 1,
        }}>2x1</div>

        <h2 id="promo-titulo" style={{
          fontFamily: 'var(--font-display)', fontSize: 21, lineHeight: 1.15,
          color: 'var(--blanco, #fff)', textAlign: 'center', margin: '14px 0 0',
        }}>Hoy es {P2X1.enMinuscula} de 2x1</h2>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5,
          color: 'var(--dorado-masa)', textAlign: 'center', margin: '10px 0 0',
        }}>
          Pide dos pizzas y la más barata va por nuestra cuenta.
        </p>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.5,
          color: 'rgba(255,255,255,.72)', textAlign: 'center', margin: '8px 0 0',
        }}>
          {vistaPrevia && !esDiaDePromo
            ? 'Vista previa — hoy no es ' + P2X1.enMinuscula + ', no hay 2x1.'
            : yaEmpezo
              ? 'Está activa ahorita mismo.'
              : 'Empieza a las ' + HORA_2X1_TEXTO + '.'}
        </p>

        <Button tone="primary" size="lg" block iconAfter="chevronRight"
          onClick={onVerMenu} style={{ marginTop: 20 }}>
          Ver el menú
        </Button>
      </div>
    </div>
  );
}

Object.assign(window, {
  CintaPromo, PopupPromo, debeMostrarPromo, marcarPromoVista, MENSAJE_2X1,
});
