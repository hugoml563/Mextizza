const { Field, RadioGroup, StatusNote, Badge, Icon } = window.MextizzaDesignSystem_8a35ee;

const PAGOS = ['Efectivo', 'Transferencia', 'Tarjeta'];

/* Delivery form shared by the website drawer and the app cart.
   Two hard gates before an order can be placed:
   1. the address has to fall inside the 3 km radius (ui_kits/delivery-zone.js)
   2. a payment method has to be chosen — nothing is preselected */
/* inicial: datos guardados del cliente (nombre/telefono/calle/colonia) para
   prellenar el formulario en pedidos siguientes. Solo siembra el estado
   inicial, asi que el cliente puede sobrescribir cualquier campo. */
function DeliveryForm({ compact = false, attempted = false, onValidChange, onDataChange, inicial }) {
  const ini = inicial || {};
  const [nombre, setNombre] = React.useState(ini.nombre || '');
  const [tel, setTel] = React.useState(ini.telefono || '');
  const [calle, setCalle] = React.useState(ini.calle || '');
  const [colonia, setColonia] = React.useState(ini.colonia || '');
  const [horario, setHorario] = React.useState('Lo antes posible (≤30 min)');
  const [pago, setPago] = React.useState(null);
  const [notas, setNotas] = React.useState('');

  const digits = tel.replace(/\D/g, '');
  const telOk = digits.length === 10;
  const zona = colonia ? zonaEvaluar(colonia) : null;
  const zonaOk = !!zona && zona.estado === 'dentro';
  const valid = !!nombre.trim() && telOk && !!calle.trim() && zonaOk && !!pago;

  React.useEffect(() => { onValidChange && onValidChange(valid); }, [valid]);
  React.useEffect(() => {
    onDataChange && onDataChange({ nombre, telefono: digits, calle, colonia, km: zona ? zona.km : null, horario, pago, notas });
  }, [nombre, digits, calle, colonia, horario, pago, notas]);

  const gap = compact ? 12 : 14;
  const tone = zona ? (zona.estado === 'dentro' ? 'ok' : zona.estado === 'limite' ? 'warn' : 'block') : 'ok';

  return (
    <div>
      <Field label="Nombre" required placeholder="Tu nombre" value={nombre}
        onChange={e => setNombre(e.target.value)}
        invalid={attempted && !nombre.trim()} />

      <Field label="Teléfono" required type="tel" placeholder="55 1234 5678" value={tel}
        onChange={e => setTel(e.target.value)}
        invalid={attempted && !telOk}
        hint={attempted && !telOk ? 'Necesitamos 10 dígitos para confirmarte por WhatsApp.' : 'Te confirmamos el pedido por WhatsApp a este número.'}
        style={{ marginTop: gap }} />

      <Field label="Calle y número" required placeholder="Av. Lomas Lindas 120, int. 4" value={calle}
        onChange={e => setCalle(e.target.value)}
        invalid={attempted && !calle.trim()}
        style={{ marginTop: gap }} />

      <Field label="Colonia" as="select" required value={colonia}
        onChange={e => setColonia(e.target.value)}
        invalid={attempted && !zonaOk}
        options={['', ...MEXTIZZA_ZONE.colonias.map(c => c.name)]}
        style={{ marginTop: gap }} />

      {zona ? (
        <StatusNote tone={tone} title={zona.titulo} style={{ marginTop: 12 }}>
          {zona.detalle}
        </StatusNote>
      ) : (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginTop: 12,
          fontFamily: 'var(--font-body)', fontSize: 12.5, color: 'var(--text-muted)'
        }}>
          <Icon name="pin" size={15} />
          <span>Repartimos {MEXTIZZA_ZONE.radioKm} km a la redonda desde {MEXTIZZA_ZONE.centro.nombre}.</span>
        </div>
      )}

      <Field label="Horario" as="select" value={horario} onChange={e => setHorario(e.target.value)}
        options={['Lo antes posible (≤30 min)', 'Programar para hoy', 'Programar para mañana']}
        style={{ marginTop: gap }} />

      <RadioGroup label="Forma de pago" required options={PAGOS} value={pago} onChange={setPago}
        columns={compact ? 1 : 3}
        invalid={attempted && !pago}
        hint={attempted && !pago ? 'Elige una forma de pago para continuar.' : 'Se cobra al entregar. El envío ya está incluido en el precio.'}
        style={{ marginTop: gap + 4 }} />

      <Field label="Notas" as="textarea" rows={2} placeholder="Sin cebolla, timbre 2" value={notas}
        onChange={e => setNotas(e.target.value)}
        style={{ marginTop: gap }} />
    </div>
  );
}

Object.assign(window, { DeliveryForm, PAGOS });
