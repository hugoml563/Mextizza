const { Button, Icon } = window.MextizzaDesignSystem_8a35ee;

/* Piezas del seguimiento que comparten la web y la app.

   Nacen de un hueco: cuando la cocina cancelaba un pedido, el cliente casi
   nunca se enteraba. La web solo lo veia con el carrito abierto, la franja del
   celular simplemente desaparecia, y quien habia cerrado la pagina no recibia
   nada. Ahora el cancelado se dice claro, con el motivo que escribio la cocina
   y una salida para resolverlo. */

/* Vuelve a consultar en cuanto el cliente regresa a la pestana o a la app.
   Esperar el siguiente ciclo de 30 s es justo el rato en que alguien ya
   desbloqueo el telefono para ver como va su pizza. */
function useAlVolver(fn) {
  const ref = React.useRef(fn);
  ref.current = fn;
  React.useEffect(() => {
    const vis = () => { if (document.visibilityState === 'visible') ref.current(); };
    const foco = () => ref.current();
    document.addEventListener('visibilitychange', vis);
    window.addEventListener('focus', foco);
    // En la app, Capacitor avisa cuando vuelve del fondo; el WebView no siempre lo hace.
    let quitar = null;
    try {
      const AppCap = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.App;
      if (AppCap && AppCap.addListener) {
        const h = AppCap.addListener('appStateChange', (s) => { if (s && s.isActive) ref.current(); });
        quitar = () => Promise.resolve(h).then((x) => x && x.remove && x.remove()).catch(() => {});
      }
    } catch (e) { /* sin el plugin, basta con visibilitychange */ }
    return () => {
      document.removeEventListener('visibilitychange', vis);
      window.removeEventListener('focus', foco);
      if (quitar) quitar();
    };
  }, []);
}

/* Si el pedido se cancela con la pestana en segundo plano: el titulo lo dice,
   y si el cliente ya dio permiso de notificaciones, sale una. Con la misma
   etiqueta que el push del servidor, asi que nunca se ven dos. */
function avisarCancelacionLocal(folio, motivo) {
  if (document.visibilityState === 'visible') return;
  const antes = document.title;
  document.title = '● Pedido cancelado — Mextizza';
  const volver = () => {
    if (document.visibilityState !== 'visible') return;
    document.title = antes;
    document.removeEventListener('visibilitychange', volver);
  };
  document.addEventListener('visibilitychange', volver);
  try {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Cancelamos tu pedido ' + folio, {
        body: motivo || 'Abre Mextizza para ver qué pasó.',
        tag: 'pedido-' + folio,
        icon: '/assets/social/mextizza-app-icon-192.png'
      });
    }
  } catch (e) { /* en la app o sin permiso no hay notificacion local */ }
}

/* El pedido cancelado, dicho de frente: que paso y que puede hacer. */
function PedidoCancelado({ folio, motivo, onCarta, style }) {
  const escribir = () => window.open(mextizzaWhatsappLink(
    'Hola, me cancelaron el pedido ' + folio + '.'), '_blank', 'noopener');
  return (
    <div role="status" style={{
      padding: '14px 16px', background: 'var(--rosa-tinte)', border: '2px solid var(--rosa-mexicano)',
      borderRadius: 12, ...style
    }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.15 }}>Cancelamos tu pedido</div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5, margin: '6px 0 12px' }}>
        {motivo || 'Tuvimos que cancelar tu pedido. Escríbenos y te contamos qué pasó.'}
      </p>
      <Button size="md" block icon="whatsapp" onClick={escribir}>Escríbenos por WhatsApp</Button>
      {onCarta && (
        <Button tone="outline" size="md" block style={{ marginTop: 8 }} onClick={onCarta}>Ver la carta</Button>
      )}
    </div>
  );
}

/* "Avisame si algo cambia": el navegador del cliente se suscribe a las
   notificaciones de SU pedido (ui_kits/avisos-cliente.js). Solo se ofrece donde
   funciona; en iPhone sin el sitio instalado, o dentro de la app, no aparece. */
function AvisamePedido({ folio, style }) {
  const av = window.mextizzaAvisosCliente;
  const [estado, setEstado] = React.useState(() => (av ? av.estado(folio) : 'no-soportado'));
  const [ocupado, setOcupado] = React.useState(false);
  const [msg, setMsg] = React.useState('');
  React.useEffect(() => { if (av) setEstado(av.estado(folio)); }, [folio]);
  if (!av || !folio || estado === 'no-soportado' || estado === 'instalar') return null;

  const texto = { fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.45, color: 'var(--text-muted)', margin: 0 };
  if (estado === 'activo') {
    return (
      <p style={{ ...texto, display: 'flex', gap: 6, alignItems: 'center', ...style }}>
        <Icon name="check" size={14} color="var(--verde-ok, #2E7D5B)" /> Te avisamos aquí si algo cambia con tu pedido.
      </p>
    );
  }
  if (estado === 'bloqueado') {
    return <p style={{ ...texto, ...style }}>Tu navegador tiene bloqueadas las notificaciones de mextizza.com. Si quieres que te avisemos, actívalas en los ajustes del sitio.</p>;
  }
  return (
    <div style={style}>
      <Button tone="outline" size="md" block icon="clock" disabled={ocupado} onClick={() => {
        setOcupado(true); setMsg('');
        av.activar(folio)
          .then(() => setEstado('activo'))
          .catch((e) => { setMsg(String((e && e.message) || e)); setEstado(av.estado(folio)); })
          .then(() => setOcupado(false));
      }}>{ocupado ? 'Activando…' : 'Avísame si algo cambia'}</Button>
      {msg && <p role="alert" style={{ ...texto, marginTop: 6, color: 'var(--rosa-mexicano-texto)' }}>{msg}</p>}
    </div>
  );
}

Object.assign(window, { useAlVolver, avisarCancelacionLocal, PedidoCancelado, AvisamePedido });
