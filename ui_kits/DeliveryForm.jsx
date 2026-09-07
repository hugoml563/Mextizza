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
  const [horario, setHorario] = React.useState('Lo antes posible (≤40 min)');
  const [pago, setPago] = React.useState(null);
  const [notas, setNotas] = React.useState('');

  /* Recoger o que se lo llevemos. Va PRIMERO porque decide que campos tienen
     sentido: a quien pasa por su pizza no se le pide direccion ni se le evalua
     la zona de reparto. */
  const [modo, setModo] = React.useState('domicilio');
  // Con el servicio apagado no hay modo que elegir: todo va a domicilio.
  const servicioPickup = typeof MEXTIZZA_PICKUP_ACTIVO !== 'undefined' && MEXTIZZA_PICKUP_ACTIVO;
  const pickup = servicioPickup && modo === 'pickup';


  const digits = tel.replace(/\D/g, '');
  const telOk = digits.length === 10;
  const zona = colonia ? zonaEvaluar(colonia) : null;
  const zonaOk = !!zona && zona.estado === 'dentro';
  /* Fuera de horario el checkout se cierra: un pedido que nadie puede cocinar
     es peor que ningun pedido, porque el cliente se queda esperando algo que no
     va a llegar. Se reevalua cada minuto para que la pantalla no se quede
     bloqueada si dan las 4 mientras el cliente escribe, ni siga abierta si dan
     las 11 a media captura. */
  const [ahora, setAhora] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const apertura = typeof mextizzaEstaAbierto === "function"
    ? mextizzaEstaAbierto(ahora)
    : { abierto: true, texto: "" };

  // Recogiendo no hay direccion que validar ni zona que evaluar.
  const datosEntrega = pickup || (!!calle.trim() && zonaOk);
  const valid = !!nombre.trim() && telOk && datosEntrega && !!pago && apertura.abierto;

  React.useEffect(() => { onValidChange && onValidChange(valid); }, [valid]);
  React.useEffect(() => {
    onDataChange && onDataChange({
      nombre, telefono: digits, horario, pago, notas,
      entrega_tipo: modo,
      calle: pickup ? '' : calle,
      colonia: pickup ? '' : colonia,
      km: pickup ? null : (zona ? zona.km : null),
    });
  }, [nombre, digits, calle, colonia, horario, pago, notas, modo]);

  const gap = compact ? 12 : 14;
  const tone = zona ? (zona.estado === 'dentro' ? 'ok' : zona.estado === 'limite' ? 'warn' : 'block') : 'ok';

  return (
    <div>
      {!apertura.abierto && (
        <StatusNote tone="block" title="El horno está apagado" style={{ marginBottom: 14 }}>
          Abrimos {apertura.texto.toLowerCase()}. Si quieres dejarlo apuntado desde ahorita, escríbenos por WhatsApp.
        </StatusNote>
      )}
      {/* Primero como lo recibe: decide que se le pregunta despues. Con el
          servicio de recoger apagado no hay nada que elegir. */}
      {servicioPickup && (
      <RadioGroup label="¿Cómo lo recibes?" required
        options={['A domicilio', 'Paso a recogerlo']}
        value={pickup ? 'Paso a recogerlo' : 'A domicilio'}
        onChange={(v) => setModo(v === 'Paso a recogerlo' ? 'pickup' : 'domicilio')}
        columns={2}
        hint={pickup
          ? 'Te descontamos $' + MEXTIZZA_PICKUP_DESCUENTO + ' por recogerlo tú.'
          : 'El envío ya está incluido en el precio.'}
        style={{ marginBottom: gap + 2 }} />
      )}

      {/* Aqui solo la colonia, que ya es publica: es el centro del radio de
          reparto que el sitio anuncia. La direccion exacta es un domicilio
          particular y aparece al confirmar el pedido, no antes. */}
      {pickup && (
        <StatusNote tone="ok" title="Recoges en nuestra cocina" style={{ marginBottom: gap + 2 }}>
          Estamos en {MEXTIZZA_ZONE.centro.nombre}. Te damos la dirección exacta,
          con mapa, en cuanto confirmes tu pedido.
        </StatusNote>
      )}

      <Field label="Nombre" required placeholder="Tu nombre" value={nombre}
        onChange={e => setNombre(e.target.value)}
        invalid={attempted && !nombre.trim()} />

      <Field label="Teléfono" required type="tel" placeholder="55 1234 5678" value={tel}
        onChange={e => setTel(e.target.value)}
        invalid={attempted && !telOk}
        hint={attempted && !telOk ? 'Necesitamos 10 dígitos para confirmarte por WhatsApp.' : 'Te confirmamos el pedido por WhatsApp a este número.'}
        style={{ marginTop: gap }} />

      {/* A quien pasa por su pizza no se le pide direccion ni se le evalua la
          zona de reparto: no hay nada que repartir. */}
      {!pickup && (
        <>
          <Field label="Calle y número" required placeholder="Av. Lomas Lindas 120, int. 4" value={calle}
            onChange={e => setCalle(e.target.value)}
            invalid={attempted && !calle.trim()}
            style={{ marginTop: gap }} />

          <Field label="Colonia" as="select" required value={colonia}
            onChange={e => setColonia(e.target.value)}
            invalid={attempted && !zonaOk}
            options={['', ...MEXTIZZA_ZONE.colonias.map(c => c.name)]}
            style={{ marginTop: gap }} />
        </>
      )}

      {pickup ? null : zona ? (
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
        options={['Lo antes posible (≤40 min)', 'Programar para hoy', 'Programar para mañana']}
        style={{ marginTop: gap }} />

      {/* Field emite aria-invalid, RadioGroup no. Sin este marcador, un pedido al
          que solo le falta la forma de pago no tendria a donde llevar la vista. */}
      <div data-invalido={attempted && !pago ? 'true' : undefined}>
        <RadioGroup label="Forma de pago" required options={PAGOS} value={pago} onChange={setPago}
          columns={compact ? 1 : 3}
          invalid={attempted && !pago}
                    hint={attempted && !pago
            ? 'Elige una forma de pago para continuar.'
            : (pickup ? 'Se cobra al entregarte el pedido en la cocina.' : 'Se cobra al entregar. El envío ya está incluido en el precio.')}
          style={{ marginTop: gap + 4 }} />
      </div>

      <Field label="Notas" as="textarea" rows={2} placeholder="Sin cebolla, timbre 2" value={notas}
        onChange={e => setNotas(e.target.value)}
        style={{ marginTop: gap }} />
    </div>
  );
}

Object.assign(window, { DeliveryForm, PAGOS });
