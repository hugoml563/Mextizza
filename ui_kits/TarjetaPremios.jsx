const { FramedPanel, TapeStripe, Badge } = window.MextizzaDesignSystem_8a35ee;

/* Tarjeta de sellos, compartida por la web y la app.

   Cuenta dias DISTINTOS con pedido, no pedidos: dos el mismo dia valen uno.
   Esa regla vive en el servidor (registrarDia_ en Code.gs); aqui solo se pinta
   lo que el servidor contesta, para que la tarjeta nunca prometa un premio que
   la caja no va a dar.

   Nueve rebanadas, la 4 y la 9 marcadas. Si alguien acumula de mas antes de
   canjear, la pizza se completa y los dias extra se dicen aparte: el ciclo
   resta 9 al canjear, no se va a cero, asi que esos dias no se pierden. */

const DIAS_TARJETA = 9;
const CASILLA_BROWNIE = 4;
const CASILLA_PIZZA = 9;

/* La tarjeta es una pizza de nueve rebanadas: cada dia con pedido entregado
   hornea una. Completar la pizza es ganarse una, asi que el dibujo cuenta la
   promocion sin tener que leerla. La rebanada 4 trae el brownie.

   La rebanada nueva sale del horno: entra chica, rebota y echa vapor. Las
   demas ya estaban ahi, no se animan. */
const CSS_TARJETA = [
  '@keyframes mxrebanada{',
  '0%{opacity:0;transform:scale(.35)}',
  '60%{opacity:1;transform:scale(1.12)}',
  '80%{transform:scale(.96)}',
  '100%{opacity:1;transform:scale(1)}}',
  '@keyframes mxvapor{0%{opacity:0;transform:translateY(4px)}25%{opacity:.85}100%{opacity:0;transform:translateY(-22px)}}',
  '@keyframes mxbrillo{0%{opacity:0}35%{opacity:.55}100%{opacity:0}}',
  '.mx-rebanada-nueva{transform-box:fill-box;transform-origin:center;animation:mxrebanada .7s cubic-bezier(.2,.9,.3,1.3) both}',
  '.mx-vapor{transform-box:fill-box;animation:mxvapor 1.6s ease-out .45s both}',
  '.mx-vapor+.mx-vapor{animation-delay:.7s}',
  '.mx-premio-listo{animation:mxbrillo 1.9s ease-in-out infinite}',
  /* Quien pidio menos movimiento ve la rebanada aparecer, sin rebote, vapor
     ni brillo. */
  '@media (prefers-reduced-motion:reduce){',
  '.mx-rebanada-nueva{animation:none}',
  '.mx-vapor{display:none}',
  '.mx-premio-listo{animation:none;opacity:.4}}',
].join('');

function inyectarCSS() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('mx-tarjeta-css')) return;
  const s = document.createElement('style');
  s.id = 'mx-tarjeta-css';
  s.textContent = CSS_TARJETA;
  document.head.appendChild(s);
}

/* Colores de la pizza. Los que la marca ya tiene salen de sus tokens; el queso
   y la albahaca no existen como token porque solo viven aqui. */
const PZ_QUESO = '#F4CD5E';
const PZ_ALBAHACA = '#3E7B3A';
const PZ_CHOCOLATE = '#5B3A26';
const PZ = { c: 100, plato: 97, borde: 92, queso: 79 };

function pzPunto(grados, r) {
  const a = grados * Math.PI / 180;
  return [PZ.c + r * Math.cos(a), PZ.c + r * Math.sin(a)];
}

// Rebanada k (0 = la de las doce), del centro hasta el radio r.
function pzRebanada(k, r) {
  const a0 = -90 + k * (360 / DIAS_TARJETA);
  const a1 = a0 + 360 / DIAS_TARJETA;
  const [x0, y0] = pzPunto(a0, r);
  const [x1, y1] = pzPunto(a1, r);
  return 'M' + PZ.c + ' ' + PZ.c + ' L' + x0.toFixed(2) + ' ' + y0.toFixed(2) +
    ' A' + r + ' ' + r + ' 0 0 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + 'Z';
}

const pzMitad = (k) => -90 + k * (360 / DIAS_TARJETA) + 180 / DIAS_TARJETA;

/* Los ingredientes de una rebanada horneada. Cada una los lleva un poco movidos
   para que la pizza no se vea hecha en serie. */
function Ingredientes({ k }) {
  const m = pzMitad(k);
  const mov = ((k * 37) % 11) - 5;
  const [p1x, p1y] = pzPunto(m + mov, 56);
  const [p2x, p2y] = pzPunto(m - 9 - mov / 2, 32);
  const [hx, hy] = pzPunto(m + 11 - mov / 2, 70);
  const pepe = { fill: 'var(--terracota-horno)' };
  return (
    <g>
      <circle cx={p1x} cy={p1y} r={8.5} style={pepe} />
      <circle cx={p1x - 2} cy={p1y - 2} r={2.2} style={{ fill: '#FFFFFF', opacity: 0.18 }} />
      <circle cx={p2x} cy={p2y} r={6} style={pepe} />
      <ellipse cx={hx} cy={hy} rx={6.5} ry={3} transform={'rotate(' + (m + 30) + ' ' + hx + ' ' + hy + ')'}
        style={{ fill: PZ_ALBAHACA }} />
    </g>
  );
}

/* La pizza. llenas: rebanadas horneadas. nueva: la ultima sale del horno.
   pendiente: la que sigue se marca, porque este pedido la hornea al llegar.
   listos: premios disponibles, que brillan. */
function PizzaSellos({ llenas, nueva, pendiente, listos, tam }) {
  const rebanadas = [];
  for (let k = 0; k < DIAS_TARJETA; k++) {
    const dia = k + 1;
    const horneada = dia <= llenas;
    const esPremio = dia === CASILLA_BROWNIE || dia === CASILLA_PIZZA;
    const listo = (dia === CASILLA_BROWNIE && listos.brownie) || (dia === CASILLA_PIZZA && listos.pizza);
    const espera = pendiente && dia === llenas + 1;

    if (horneada) {
      rebanadas.push(
        <g key={k} className={nueva && dia === llenas ? 'mx-rebanada-nueva' : undefined}>
          <path d={pzRebanada(k, PZ.borde)} style={{ fill: 'var(--dorado-masa)', stroke: 'var(--negro-carbon)', strokeWidth: 1.5, strokeLinejoin: 'round' }} />
          <path d={pzRebanada(k, PZ.queso)} style={{ fill: PZ_QUESO }} />
          <Ingredientes k={k} />
          {esPremio && <path d={pzRebanada(k, PZ.borde)} style={{ fill: 'none', stroke: 'var(--rosa-mexicano)', strokeWidth: 3, strokeLinejoin: 'round' }} />}
          {listo && <path className="mx-premio-listo" d={pzRebanada(k, PZ.borde)} style={{ fill: 'none', stroke: 'var(--rosa-mexicano)', strokeWidth: 7, strokeLinejoin: 'round' }} />}
        </g>
      );
    } else {
      const [tx, ty] = pzPunto(pzMitad(k), 60);
      rebanadas.push(
        <g key={k}>
          <path d={pzRebanada(k, PZ.borde)} style={{
            fill: espera ? 'var(--dorado-tinte)' : 'var(--blanco-hueso)',
            stroke: esPremio ? 'var(--rosa-mexicano)' : espera ? 'var(--negro-carbon)' : 'var(--hueso-linea)',
            strokeWidth: esPremio ? 2 : 1.5, strokeDasharray: '4 4', strokeLinejoin: 'round',
          }} />
          {espera && <path className="mx-premio-listo" d={pzRebanada(k, PZ.borde)} style={{ fill: 'var(--dorado-masa)' }} />}
          <text x={tx} y={ty + 7} textAnchor="middle" style={{
            fontFamily: 'var(--font-label)', fontSize: 19,
            fill: esPremio ? 'var(--rosa-mexicano-texto)' : 'var(--text-muted)',
          }}>{dia}</text>
        </g>
      );
    }
  }

  // El vapor sale de la rebanada recien horneada.
  let vapor = null;
  if (nueva && llenas > 0) {
    const [vx, vy] = pzPunto(pzMitad(llenas - 1), 46);
    vapor = [-7, 5].map((dx, i) => (
      <path key={i} className="mx-vapor" d={'M' + (vx + dx) + ' ' + (vy - 4) + ' q-5 -7 0 -13 q5 -6 0 -13'}
        style={{ fill: 'none', stroke: '#FFFFFF', strokeWidth: 2.5, strokeLinecap: 'round' }} />
    ));
  }

  // Marcas afuera del plato: un cuadrito de brownie en la 4, una rebanada en la 9.
  const [bx, by] = pzPunto(pzMitad(CASILLA_BROWNIE - 1), PZ.plato + 4);
  const [px, py] = pzPunto(pzMitad(CASILLA_PIZZA - 1), PZ.plato + 4);

  return (
    <svg viewBox="-14 -14 228 228" width={tam} height={tam} aria-hidden="true" style={{ display: 'block', flex: 'none', overflow: 'visible' }}>
      <circle cx={PZ.c} cy={PZ.c} r={PZ.plato} style={{ fill: 'var(--hueso-hondo)', stroke: 'var(--negro-carbon)', strokeWidth: 2 }} />
      {rebanadas}
      {vapor}
      <circle cx={PZ.c} cy={PZ.c} r={21} style={{ fill: 'var(--blanco-hueso)', stroke: 'var(--negro-carbon)', strokeWidth: 1.5 }} />
      <text x={PZ.c} y={PZ.c + 6} textAnchor="middle" style={{ fontFamily: 'var(--font-label)', fontSize: 16, fill: 'var(--negro-carbon)' }}>
        {llenas}/{DIAS_TARJETA}
      </text>
      <rect x={bx - 8} y={by - 8} width={16} height={16} rx={3} transform={'rotate(12 ' + bx + ' ' + by + ')'}
        style={{ fill: PZ_CHOCOLATE, stroke: 'var(--rosa-mexicano)', strokeWidth: 2 }} />
      <path d={'M' + (px - 8) + ' ' + (py - 7) + ' L' + (px + 8) + ' ' + (py - 7) + ' L' + px + ' ' + (py + 9) + 'Z'}
        style={{ fill: PZ_QUESO, stroke: 'var(--rosa-mexicano)', strokeWidth: 2, strokeLinejoin: 'round' }} />
    </svg>
  );
}

/* Si este telefono tiene mas rebanadas que la ultima vez que se vio su tarjeta
   en este navegador. El sello se gana al entregar, cuando nadie esta mirando;
   asi la rebanada sale del horno la siguiente vez que el cliente abre su
   tarjeta. La primera vez no se anima nada: no hay con que comparar. Al
   canjear la pizza la cuenta baja y tampoco se anima. */
function useRebanadaNueva(telefono, dias) {
  const [nueva, setNueva] = React.useState(false);
  React.useEffect(() => {
    const tel = String(telefono || '').replace(/\D/g, '');
    if (tel.length !== 10 || !(dias >= 0)) { setNueva(false); return; }
    const clave = 'mextizza.tarjeta.vista.' + tel;
    let antes = null;
    try { const v = localStorage.getItem(clave); antes = v === null ? null : Number(v); } catch (e) {}
    setNueva(antes !== null && dias > antes);
    try { localStorage.setItem(clave, String(dias)); } catch (e) {}
  }, [telefono, dias]);
  return nueva;
}

/* tarjeta: lo que contesta el servidor —
     { dias, brownie, pizza, faltanBrownie, faltanPizza, ciclos }
   animarUltimo: la ultima rebanada sale del horno. Se usa al confirmar un
   pedido; en el carrito la tarjeta se pinta quieta. */
/* pendiente: este pedido sellara un dia CUANDO SE ENTREGUE. Se marca la
   rebanada que viene en vez de darla por horneada: el sello se otorga al
   entregar, y un pedido cancelado no cuenta. */
/* compacto: la pizza chica a un lado y el mensaje al otro. Cabe en el dialogo
   de la cuenta sin volverlo una pantalla larga. */
/* telefono: con el, la rebanada ganada desde la ultima visita sale del horno. */
function TarjetaPremios({ tarjeta, animarUltimo = false, pendiente = false, titulo, style, compacto = false, telefono }) {
  React.useEffect(inyectarCSS, []);
  const dias = Math.max(0, Number(tarjeta && tarjeta.dias) || 0);
  const recienHorneada = useRebanadaNueva(pendiente ? '' : telefono, tarjeta ? dias : -1);
  if (!tarjeta) return null;

  const llenas = Math.min(dias, DIAS_TARJETA);
  const extra = Math.max(0, dias - DIAS_TARJETA);

  let mensaje;
  if (pendiente) mensaje = 'Tu rebanada ' + Math.min(dias + 1, DIAS_TARJETA) + ' se hornea cuando te entreguemos este pedido.';
  else if (tarjeta.pizza) mensaje = 'Pizza completa: tu Traviesa gratis te está esperando.';
  else if (tarjeta.brownie) mensaje = 'Tienes un brownie gratis esperándote.';
  else if (tarjeta.faltanBrownie > 0) {
    mensaje = tarjeta.faltanBrownie === 1
      ? 'Una rebanada más y el brownie es tuyo.'
      : 'Faltan ' + tarjeta.faltanBrownie + ' rebanadas para tu brownie.';
  } else {
    mensaje = tarjeta.faltanPizza === 1
      ? 'Una rebanada más y la Traviesa es tuya.'
      : 'Faltan ' + tarjeta.faltanPizza + ' rebanadas para tu Traviesa gratis.';
  }

  const descripcion = 'Pizza con ' + llenas + ' de ' + DIAS_TARJETA + ' rebanadas horneadas. ' +
    'La rebanada ' + CASILLA_BROWNIE + ' trae un brownie y la ' + CASILLA_PIZZA + ' completa tu Traviesa gratis.';

  const leyenda = (
    <p style={{
      fontFamily: 'var(--font-body)', fontSize: 11.5, lineHeight: 1.4, color: 'var(--text-muted)',
      margin: '6px 0 0', textAlign: compacto ? 'left' : 'center',
    }}>
      Cada día con pizza, una rebanada. Completa la pizza y te regalamos una.
    </p>
  );

  const textoMensaje = (
    <p style={{
      fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.45, color: 'var(--text-body)',
      margin: compacto ? 0 : '14px 0 0', textAlign: compacto ? 'left' : 'center',
    }}>{mensaje}</p>
  );

  return (
    <FramedPanel variant="object" style={{ position: 'relative', ...(compacto ? { padding: '18px 14px 14px' } : null), ...style }}>
      <TapeStripe position="top" height={4} />
      <div style={{ padding: '4px 2px 2px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: compacto ? 10 : 12 }}>
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 10.5, letterSpacing: 1.4,
            textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>{titulo || 'Tu tarjeta'}</span>
          {tarjeta.ciclos > 0 && !pendiente && (
            <Badge tone="dorado">{tarjeta.ciclos === 1 ? '1 pizza completa' : tarjeta.ciclos + ' pizzas completas'}</Badge>
          )}
        </div>

        <div role="img" aria-label={descripcion} style={compacto
          ? { display: 'flex', alignItems: 'center', gap: 14 }
          : { display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <PizzaSellos llenas={llenas} nueva={animarUltimo || recienHorneada} pendiente={pendiente}
            listos={{ brownie: !!tarjeta.brownie, pizza: !!tarjeta.pizza }} tam={compacto ? 116 : 176} />
          {compacto && <div style={{ minWidth: 0 }}>{textoMensaje}{leyenda}</div>}
        </div>

        {!compacto && textoMensaje}
        {!compacto && !pendiente && leyenda}

        {extra > 0 && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--text-muted)',
            textAlign: 'center', margin: '5px 0 0',
          }}>
            {extra === 1 ? 'Llevas 1 rebanada extra guardada.' : 'Llevas ' + extra + ' rebanadas extra guardadas.'} No se pierden.
          </p>
        )}
      </div>
    </FramedPanel>
  );
}

/* Pide una opinion en Google cuando el pedido ya se entrego: es el momento en
   que el cliente tiene la pizza enfrente. Sin reseñas la ficha no sube en el
   mapa, y Google ni siquiera reconoce el nombre (lo corrige a "Meztizza").

   Nunca a cambio de nada: Google prohibe dar premios, sellos o descuentos por
   una reseña, y puede borrarlas todas o suspender la ficha. Por eso esto vive
   lejos de la tarjeta y no la menciona. */
function PideResena({ style }) {
  const url = typeof MEXTIZZA_SOCIAL !== 'undefined' && MEXTIZZA_SOCIAL.resenaGoogle;
  if (!url) return null;
  const estrella = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z';
  return (
    <div style={{
      border: '2px solid var(--negro-carbon)', borderRadius: 'var(--radius-md)',
      background: 'var(--dorado-tinte)', padding: '14px 16px', ...style,
    }}>
      <div aria-hidden="true" style={{ display: 'flex', gap: 3, marginBottom: 8 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <svg key={i} width="18" height="18" viewBox="0 0 24 24">
            <path d={estrella} style={{ fill: 'var(--dorado-masa)', stroke: 'var(--negro-carbon)', strokeWidth: 1.2, strokeLinejoin: 'round' }} />
          </svg>
        ))}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1.15 }}>¿Cómo estuvo?</div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.5, margin: '6px 0 12px', color: 'var(--text-body)' }}>
        Si llegó como te la imaginabas, cuéntaselo a Google. Somos una cocina chiquita y así nos encuentran tus vecinos.
      </p>
      <a href={url} target="_blank" rel="noopener" style={{
        display: 'block', textAlign: 'center', padding: '12px 14px', minHeight: 44, boxSizing: 'border-box',
        borderRadius: 'var(--radius-sm)', background: 'var(--negro-carbon)', color: 'var(--blanco)',
        textDecoration: 'none', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
        letterSpacing: 0.8, textTransform: 'uppercase',
      }}>Dejar mi opinión en Google</a>
    </div>
  );
}

/* Que producto vale por cada premio. Tiene que decir lo mismo que PREMIOS en
   Code.gs: si aqui se ofrece canjear un producto y alla se espera otro, el
   cliente pide su premio y el servidor no se lo da. build-js.js compara las dos
   capas y detiene la construccion si dejan de coincidir. */
const PREMIO_PRODUCTOS = { brownie: 'chocolatoso', pizza: 'traviesa' };

/* Ofrece canjear un premio que el cliente YA tiene. Solo aparece cuando el
   producto esta en el carrito: regalar algo que no pidio no tiene sentido, y el
   servidor lo rechazaria igual.

   Es una sola opcion a la vez porque las promociones no se acumulan. Quien
   decide de verdad es el servidor: aqui solo se pide. */
/* agregado: el id del producto que ESTE componente metio al carrito con el
   boton del premio. Importa para saber que se puede retirar: si el cliente ya
   traia un brownie porque lo queria comprar, apagar el canje no debe quitarselo. */
function CanjeTarjeta({ tarjeta, lines, valor, onChange, onAgregar, onQuitar, agregado, style, telefono, sinCuenta }) {
  /* Cobrar un premio pide la cuenta duena de ese telefono: el servidor no lo
     aplica de otro modo. Aqui se refleja lo mismo, para no ofrecer algo que se
     va a cobrar completo. Y se aprovecha el momento: es cuando alguien tiene
     mas razones para entrar a su cuenta. */
  const cuenta = typeof useCuenta === 'function' ? useCuenta() : { usuario: null, telefono: '' };
  const [dialogo, setDialogo] = React.useState(false);
  const cerrarDialogo = React.useCallback(() => setDialogo(false), []);
  const tel = String(telefono || '').replace(/\D/g, '');
  // La cocina capturando un pedido de WhatsApp no necesita cuenta: el chat ya
  // prueba de quien es el numero, y el servidor lo acepta con su token.
  const puedeCobrar = !!sinCuenta || !!(cuenta.usuario && cuenta.telefono && cuenta.telefono === tel);
  React.useEffect(() => {
    if (puedeCobrar || !valor) return;
    // Si se pierde el permiso a medio checkout (cerro sesion, cambio el
    // telefono), el regalo que se metio al carrito sale con el canje.
    if (agregado && onQuitar) onQuitar(agregado);
    if (onChange) onChange(null);
  }, [puedeCobrar, valor]);

  if (!tarjeta) return null;

  if (!puedeCobrar && (tarjeta.pizza || tarjeta.brownie)) {
    const articulo = tarjeta.pizza && tarjeta.brownie ? 'una Traviesa y un brownie' : tarjeta.pizza ? 'una Traviesa' : 'un brownie';
    const ajeno = cuenta.usuario && cuenta.telefono && cuenta.telefono !== tel;
    return (
      <div style={{
        border: '2px solid var(--rosa-mexicano)', borderRadius: 'var(--radius-md)',
        background: 'var(--rosa-tinte)', padding: '12px 14px', ...style,
      }}>
        <div style={{
          fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1.3,
          textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)', marginBottom: 6,
        }}>Tu tarjeta tiene premio</div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, lineHeight: 1.5, margin: 0, color: 'var(--text-body)' }}>
          {ajeno
            ? 'Este teléfono tiene ' + articulo + ' gratis, pero tu cuenta tiene ligado otro número.'
            : cuenta.usuario
              ? 'Tienes ' + articulo + ' gratis. Liga este teléfono a tu cuenta para cobrarlo; solo se hace una vez.'
              : 'Tienes ' + articulo + ' gratis. Entra con tu cuenta para cobrarlo: tus sellos te esperan.'}
        </p>
        {!ajeno && (
          <button type="button" onClick={() => setDialogo(true)} style={{
            display: 'block', width: '100%', marginTop: 10, padding: '10px 12px', cursor: 'pointer',
            borderRadius: 'var(--radius-sm)', border: '2px solid var(--rosa-mexicano)',
            background: 'var(--surface-card)', color: 'var(--rosa-mexicano-texto)',
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, letterSpacing: 0.6, textTransform: 'uppercase',
          }}>{cuenta.usuario ? 'Ligar mi teléfono' : 'Entrar para cobrarlo'}</button>
        )}
        {typeof DialogoCuenta === 'function' && (
          <DialogoCuenta abierto={dialogo} onCerrar={cerrarDialogo} telefonoSugerido={tel} />
        )}
      </div>
    );
  }

  const enCarrito = (id) => (lines || []).some((l) => l.id === id);
  const disponibles = [];
  if (tarjeta.pizza) disponibles.push({
    clave: 'pizza', nombre: 'Traviesa', articulo: 'una Traviesa', id: PREMIO_PRODUCTOS.pizza });
  if (tarjeta.brownie) disponibles.push({
    clave: 'brownie', nombre: 'brownie', articulo: 'un brownie', id: PREMIO_PRODUCTOS.brownie });
  if (!disponibles.length) return null;

  /* Espejo de quedaPizzaPagada en Code.gs. Regalar la linea no puede dejar el
     pedido sin nada que cobrar: una Traviesa gratis sola sale en cero y el
     reparto lo pagamos nosotros. Si el servidor lo va a rechazar, aqui no se
     ofrece: prometer un premio y luego cobrarlo completo es peor que no
     ofrecerlo. */
  const esPizza = (id) => typeof mextizzaEsPizza === 'function' && mextizzaEsPizza(id);
  const quedaPizzaPagada = (idPremio) => (lines || []).some((l) => {
    if (!esPizza(l.id)) return false;
    return l.id !== idPremio || l.qty > 1;
  });

  const listos = disponibles.filter((p) => enCarrito(p.id) && quedaPizzaPagada(p.id));
  const bloqueados = disponibles.filter((p) => enCarrito(p.id) && !quedaPizzaPagada(p.id));
  const faltantes = disponibles.filter((p) => !enCarrito(p.id));

  return (
    <div style={{
      border: '2px solid var(--rosa-mexicano)', borderRadius: 'var(--radius-md)',
      background: 'var(--rosa-tinte)', padding: '12px 14px', ...style,
    }}>
      <div style={{
        fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1.3,
        textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)', marginBottom: 8,
      }}>Tu tarjeta tiene premio</div>

      {listos.map((p) => {
        const activo = valor === p.clave;
        return (
          <button key={p.clave} type="button" aria-pressed={activo}
            onClick={() => {
              if (!activo) return onChange(p.clave);
              /* Se arrepintio. Si el producto entro por el boton del premio, se
                 va con el: quedaba colgado en el carrito y pasaba de gratis a
                 cobrado sin que nadie lo pidiera. */
              onChange(null);
              if (agregado === p.id && onQuitar) onQuitar(p.id);
            }}
            style={{
              display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
              marginBottom: 6, padding: '10px 12px', borderRadius: 'var(--radius-sm)',
              border: '2px solid ' + (activo ? 'var(--rosa-mexicano)' : 'var(--hueso-linea)'),
              background: activo ? 'var(--surface-card)' : 'transparent',
              fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-body)',
            }}>
            <span style={{
              display: 'inline-block', width: 14, height: 14, marginRight: 9,
              borderRadius: 3, verticalAlign: -2,
              border: '2px solid var(--rosa-mexicano)',
              background: activo ? 'var(--rosa-mexicano)' : 'transparent',
            }} />
            Usar mi {p.nombre} gratis
          </button>
        );
      })}

      {/* Esta en el carrito, pero canjearlo dejaria el pedido en cero. */}
      {bloqueados.map((p) => (
        <p key={p.clave} style={{
          fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.45,
          color: 'var(--text-body)', margin: '2px 0 0',
        }}>
          Para canjear {p.articulo} gratis, agrega otra pizza a tu pedido.
        </p>
      ))}

      {/* El premio no esta en el carrito. Antes esto era solo un aviso, y
          obligaba a salirse del checkout, buscar el producto en el menu,
          agregarlo y volver. En un telefono, esa vuelta es donde la gente dice
          "ya luego" y no lo canjea nunca. El boton lo agrega y deja el canje
          puesto de una vez. */}
      {faltantes.map((p) => {
        const prod = typeof mextizzaProducto === 'function' ? mextizzaProducto(p.id) : null;
        if (!prod || !onAgregar) {
          return (
            <p key={p.clave} style={{
              fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.45,
              color: 'var(--text-body)', margin: '2px 0 0',
            }}>
              Tienes {p.articulo} gratis. Agrégalo a tu pedido para canjearlo.
            </p>
          );
        }
        return (
          <button key={p.clave} type="button"
            onClick={() => { onAgregar(prod); onChange(p.clave); }}
            style={{
              display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
              marginBottom: 6, padding: '10px 12px', borderRadius: 'var(--radius-sm)',
              border: '2px dashed var(--rosa-mexicano)', background: 'transparent',
              fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--text-body)',
            }}>
            <span style={{
              display: 'inline-block', width: 14, height: 14, marginRight: 9,
              borderRadius: 3, verticalAlign: -2, lineHeight: '10px', textAlign: 'center',
              border: '2px solid var(--rosa-mexicano)', color: 'var(--rosa-mexicano)',
              fontSize: 13, fontWeight: 700,
            }}>+</span>
            Agregar {p.articulo} gratis
          </button>
        );
      })}
    </div>
  );
}

/* Cuanto va a descontar el servidor por este pedido, para poder MOSTRARLO.

   Sin esto, agregar la Traviesa gratis subia el total de $229 a $428: el
   servidor cobraba bien, pero el cliente veia el precio subir justo al reclamar
   su premio, que es la peor forma posible de dar algo gratis.

   Es un espejo de aplicarPromos_ en Code.gs, no una segunda fuente de verdad:
   quien decide el cobro sigue siendo el servidor. Si las dos llegaran a
   discrepar, el pedido se cobra por lo que diga el servidor. Por eso aqui se es
   conservador — ante la duda, no se descuenta — y asi el error posible es
   cobrar de menos, nunca prometer un descuento que no llega.

   Devuelve { descuento, motivo } o null. */
/* El dia sale de MEXTIZZA_2X1, nunca escrito a mano: si la promocion se mueve,
   los avisos se mueven con ella. Antes decia 'viernes' en tres lugares, y mover
   la promocion habria dejado los tres anunciando el dia equivocado. */
const DIA_2X1_NOMBRE = (typeof MEXTIZZA_2X1 !== 'undefined' && MEXTIZZA_2X1.nombre) || '';
const DIA_2X1_MIN = (typeof MEXTIZZA_2X1 !== 'undefined' && MEXTIZZA_2X1.enMinuscula) || '';

/* Como se le llama a cada promocion en el ticket. */
const NOMBRE_PROMO = {
  '2x1': DIA_2X1_MIN ? '2x1 de ' + DIA_2X1_MIN : '2x1',
  'tarjeta:pizza': 'Traviesa de tu tarjeta',
  'tarjeta:brownie': 'Brownie de tu tarjeta',
};

function mextizzaDescuentoPrevisto(lines, tarjeta, usarPremio, hayDosPorUno) {
  const esPizza = (id) => typeof mextizzaEsPizza === 'function' && mextizzaEsPizza(id);
  const opciones = [];

  // Cada unidad por separado: dos pizzas iguales en una linea son dos unidades.
  const unidades = [];
  (lines || []).forEach((l) => {
    if (!esPizza(l.id)) return;
    for (let n = 0; n < l.qty; n++) unidades.push({ id: l.id, precio: l.price });
  });

  // 2x1: se regala la mas barata del par, una por pedido.
  if (hayDosPorUno && unidades.length >= 2) {
    const barata = unidades.slice().sort((a, b) => a.precio - b.precio)[0];
    opciones.push({ tipo: '2x1', valor: barata.precio });
  }

  // Premio de la tarjeta: pedido, disponible, y que quede algo que cobrar.
  if (tarjeta && usarPremio) {
    const id = PREMIO_PRODUCTOS[usarPremio];
    const disponible = usarPremio === 'pizza' ? tarjeta.pizza : tarjeta.brownie;
    const linea = (lines || []).filter((l) => l.id === id)[0];
    const quedaPagada = (lines || []).some((l) => esPizza(l.id) && (l.id !== id || l.qty > 1));
    if (disponible && linea && quedaPagada) {
      opciones.push({ tipo: 'tarjeta:' + usarPremio, valor: linea.price });
    }
  }

  if (!opciones.length) return null;
  // No se acumulan: gana la que mas le conviene al cliente.
  opciones.sort((a, b) => b.valor - a.valor);
  return { descuento: opciones[0].valor, motivo: opciones[0].tipo };
}

/* Lo que se regalo en ESTE pedido. El servidor manda { tipo, producto, valor };
   se nombra el producto y cuanto valia, para que el cliente vea el descuento
   aunque el total ya venga cobrado de menos. */
function AvisoPremio({ premio, style }) {
  if (!premio) return null;
  const texto = {
    '2x1': DIA_2X1_MIN ? 'Se aplicó tu 2x1 de ' + DIA_2X1_MIN : 'Se aplicó tu 2x1',
    'tarjeta:brownie': 'Canjeaste tu brownie de la tarjeta',
    'tarjeta:pizza': 'Canjeaste tu Traviesa de la tarjeta',
  }[premio.tipo] || 'Promoción aplicada';

  return (
    <div style={{
      border: '2px solid var(--rosa-mexicano)', borderRadius: 'var(--radius-md)',
      background: 'var(--rosa-tinte)', padding: '12px 14px', ...style,
    }}>
      <div style={{
        fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1.3,
        textTransform: 'uppercase', color: 'var(--rosa-mexicano-texto)', marginBottom: 4,
      }}>{texto}</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-body)' }}>
        {premio.producto} va por nuestra cuenta
        {premio.valor ? <span style={{ color: 'var(--text-muted)' }}>{' · $' + premio.valor + ' menos'}</span> : null}
      </div>
    </div>
  );
}

/* Aviso del 2x1. `activo` lo dice el servidor (campo dosPorUno), no
   el reloj del telefono: si el cliente trae mal la hora, el anuncio y el cobro
   dirian cosas distintas. */
function Aviso2x1({ activo, style }) {
  if (!activo) return null;
  return (
    <div role="status" style={{
      display: 'flex', alignItems: 'center', gap: 10,
      border: '2px solid var(--negro-carbon)', borderRadius: 'var(--radius-md)',
      background: 'var(--dorado-masa)', padding: '11px 14px', ...style,
    }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: 20, lineHeight: 1,
        color: 'var(--negro-carbon)', letterSpacing: 0.5, flexShrink: 0,
      }}>2x1</span>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.4, color: 'var(--negro-carbon)' }}>
        {DIA_2X1_NOMBRE} de 2x1: pide dos pizzas y la más barata va por nuestra cuenta.
      </span>
    </div>
  );
}

Object.assign(window, { PideResena, TarjetaPremios, AvisoPremio, Aviso2x1, CanjeTarjeta, PREMIO_PRODUCTOS, mextizzaDescuentoPrevisto, NOMBRE_PROMO, DIAS_TARJETA, CASILLA_BROWNIE, CASILLA_PIZZA });
