const { StatusNote, Icon } = window.MextizzaDesignSystem_8a35ee;

/* Direccion de la cocina para quien pasa a recoger.

   Aparece DESPUES de confirmar el pedido, no en el checkout. Es un domicilio
   particular: mostrarla a cualquiera que le pique al boton la volvia visible sin
   haber pedido nada. En el checkout basta con decir la colonia, que ya es
   publica porque es el centro del radio de reparto.

   La direccion no viaja en el codigo — el repositorio es publico. Se pide al
   servidor y se guarda en el navegador para no repetir la llamada, que contra
   Apps Script tarda un par de segundos. */

const MEXTIZZA_PICKUP_CACHE = 'mextizza:pickup';

function mapsUrl(direccion) {
  // Formato documentado y estable de Google Maps. Funciona en el navegador y
  // abre la app de Maps en el telefono.
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion);
}

function DireccionRecoger({ activo, style }) {
  const [dir, setDir] = React.useState(() => {
    try { return window.localStorage.getItem(MEXTIZZA_PICKUP_CACHE) || ''; } catch (e) { return ''; }
  });

  React.useEffect(() => {
    if (!activo || dir || typeof mextizzaPickup !== 'function') return;
    let vivo = true;
    mextizzaPickup()
      .then((r) => {
        if (!vivo || !r.direccion) return;
        setDir(r.direccion);
        try { window.localStorage.setItem(MEXTIZZA_PICKUP_CACHE, r.direccion); } catch (e) {}
      })
      // Si falla, abajo se ofrece pedirla por WhatsApp: mejor eso que un hueco.
      .catch(() => {});
    return () => { vivo = false; };
  }, [activo, dir]);

  if (!activo) return null;

  return (
    <StatusNote tone="ok" title="Pasa por tu pedido a nuestra cocina" style={style}>
      {dir ? (
        <>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>{dir}</div>
          <a href={mapsUrl(dir)} target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: 1,
              textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)',
              textDecoration: 'underline', textUnderlineOffset: 3,
            }}>
            <Icon name="pin" size={14} />
            Abrir en Google Maps
          </a>
        </>
      ) : 'Cargando la dirección…'}
    </StatusNote>
  );
}

Object.assign(window, { DireccionRecoger });
