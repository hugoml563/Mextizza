const { FramedPanel, TapeStripe, Badge } = window.MextizzaDesignSystem_8a35ee;

/* Tarjeta de sellos, compartida por la web y la app.

   Cuenta dias DISTINTOS con pedido, no pedidos: dos el mismo dia valen uno.
   Esa regla vive en el servidor (registrarDia_ en Code.gs); aqui solo se pinta
   lo que el servidor contesta, para que la tarjeta nunca prometa un premio que
   la caja no va a dar.

   Nueve casillas, la 4 y la 9 marcadas. Si alguien acumula de mas antes de
   canjear, las casillas se llenan y los dias extra se dicen aparte: el ciclo
   resta 9 al canjear, no se va a cero, asi que esos dias no se pierden. */

const DIAS_TARJETA = 9;
const CASILLA_BROWNIE = 4;
const CASILLA_PIZZA = 9;

/* El sello nuevo cae con un golpe seco, como un sello de tinta de verdad: entra
   grande y girado, y se asienta. Los demas ya estaban ahi, no se animan. */
const CSS_TARJETA = [
  '@keyframes mxsello{',
  '0%{opacity:0;transform:scale(2.1) rotate(-24deg)}',
  '55%{opacity:1;transform:scale(.92) rotate(3deg)}',
  '75%{transform:scale(1.04) rotate(-1deg)}',
  '100%{opacity:1;transform:scale(1) rotate(0deg)}}',
  '@keyframes mxbrillo{0%{opacity:0}35%{opacity:.55}100%{opacity:0}}',
  '.mx-sello-nuevo{animation:mxsello .58s cubic-bezier(.2,.9,.3,1.4) both}',
  '.mx-premio-listo{animation:mxbrillo 1.9s ease-in-out infinite}',
  /* Quien pidio menos movimiento ve el sello aparecer, sin el golpe ni el brillo. */
  '@media (prefers-reduced-motion:reduce){',
  '.mx-sello-nuevo{animation:none}',
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

/* Una casilla. `estado`: 'vacia' | 'sellada' | 'nueva'. */
function Casilla({ n, estado, premio, listo }) {
  const pendiente = estado === 'pendiente';
  const sellada = estado !== 'vacia' && !pendiente;
  const esPremio = !!premio;
  const acento = 'var(--rosa-mexicano)';

  return (
    <div style={{ position: 'relative', paddingBottom: esPremio ? 15 : 0 }}>
      <div style={{
        aspectRatio: '1 / 1', borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: sellada
          ? '2px solid ' + (esPremio ? acento : 'var(--negro-carbon)')
          : pendiente ? '2px dashed var(--negro-carbon)'
          : '2px dashed ' + (esPremio ? acento : 'var(--hueso-linea)'),
        background: sellada ? (esPremio ? 'var(--rosa-tinte)' : 'var(--hueso-hondo)') : 'transparent',
        // Doble anillo: la casilla de premio se ve distinta aun sin leer nada.
        boxShadow: esPremio ? 'inset 0 0 0 3px var(--surface-card)' : 'none',
        position: 'relative',
      }}>
        {sellada && (
          <span
            className={estado === 'nueva' ? 'mx-sello-nuevo' : undefined}
            style={{
              fontFamily: 'var(--font-label)', fontSize: 13, fontWeight: 400,
              letterSpacing: 0.5, lineHeight: 1,
              color: esPremio ? 'var(--rosa-mexicano-texto)' : 'var(--negro-carbon)',
              // Los sellos de verdad no caen derechos.
              transform: 'rotate(' + (((n * 37) % 11) - 5) + 'deg)',
              display: 'block',
            }}>{n}</span>
        )}
        {pendiente && (
          <span className="mx-premio-listo" style={{
            fontFamily: 'var(--font-label)', fontSize: 13, letterSpacing: 0.5,
            color: 'var(--negro-carbon)', opacity: 0.55,
          }}>{n}</span>
        )}
        {!sellada && !pendiente && esPremio && (
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: 0.5,
            color: acento, opacity: 0.75,
          }}>{n}</span>
        )}
        {listo && (
          <span className="mx-premio-listo" aria-hidden="true" style={{
            position: 'absolute', inset: -5, borderRadius: '50%',
            border: '2px solid ' + acento, pointerEvents: 'none',
          }} />
        )}
      </div>
      {esPremio && (
        <span style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, textAlign: 'center',
          fontFamily: 'var(--font-label)', fontSize: 8.5, letterSpacing: 0.8,
          textTransform: 'uppercase', color: acento, whiteSpace: 'nowrap',
        }}>{premio}</span>
      )}
    </div>
  );
}

/* tarjeta: lo que contesta el servidor —
     { dias, brownie, pizza, faltanBrownie, faltanPizza, ciclos }
   animarUltimo: sella el dia recien ganado con el golpe. Se usa al confirmar un
   pedido; en el carrito la tarjeta se pinta quieta. */
/* pendiente: este pedido sellara un dia CUANDO SE ENTREGUE. Se dibuja la
   casilla que viene, en punteado, en vez de darla por ganada: el sello se otorga
   al entregar, y un pedido cancelado no cuenta. */
function TarjetaPremios({ tarjeta, animarUltimo = false, pendiente = false, titulo, style }) {
  React.useEffect(inyectarCSS, []);
  if (!tarjeta) return null;

  const dias = Math.max(0, Number(tarjeta.dias) || 0);
  const llenas = Math.min(dias, DIAS_TARJETA);
  const extra = Math.max(0, dias - DIAS_TARJETA);
  const premios = { [CASILLA_BROWNIE]: 'brownie', [CASILLA_PIZZA]: 'pizza' };

  const casillas = [];
  for (let n = 1; n <= DIAS_TARJETA; n++) {
    const sellada = n <= llenas;
    casillas.push(
      <Casilla key={n} n={n} premio={premios[n]}
        estado={sellada
          ? (animarUltimo && n === llenas ? 'nueva' : 'sellada')
          : (pendiente && n === llenas + 1 ? 'pendiente' : 'vacia')}
        listo={(n === CASILLA_BROWNIE && tarjeta.brownie) || (n === CASILLA_PIZZA && tarjeta.pizza)} />
    );
  }

  // Un solo renglon, el que importa ahora mismo.
  if (pendiente) {
    return (
      <FramedPanel variant="object" style={{ position: 'relative', ...style }}>
        <TapeStripe position="top" height={4} />
        <div style={{ padding: '4px 2px 2px' }}>
          <div style={{
            fontFamily: 'var(--font-label)', fontSize: 10.5, letterSpacing: 1.4,
            textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 12,
          }}>{titulo || 'Tu tarjeta'}</div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12, maxWidth: 236, margin: '0 auto',
          }}>{casillas}</div>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.45,
            color: 'var(--text-body)', textAlign: 'center', margin: '16px 0 0',
          }}>Tu día {Math.min(dias + 1, DIAS_TARJETA)} se sella cuando te entreguemos este pedido.</p>
        </div>
      </FramedPanel>
    );
  }

  let mensaje;
  if (tarjeta.pizza) mensaje = 'Tienes una Traviesa gratis esperándote.';
  else if (tarjeta.brownie) mensaje = 'Tienes un brownie gratis esperándote.';
  else if (tarjeta.faltanBrownie > 0) {
    mensaje = tarjeta.faltanBrownie === 1
      ? 'Un día más y el brownie es tuyo.'
      : 'Faltan ' + tarjeta.faltanBrownie + ' días para tu brownie.';
  } else {
    mensaje = tarjeta.faltanPizza === 1
      ? 'Un día más y la Traviesa es tuya.'
      : 'Faltan ' + tarjeta.faltanPizza + ' días para tu Traviesa gratis.';
  }

  return (
    <FramedPanel variant="object" style={{ position: 'relative', ...style }}>
      <TapeStripe position="top" height={4} />
      <div style={{ padding: '4px 2px 2px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10, marginBottom: 12 }}>
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 10.5, letterSpacing: 1.4,
            textTransform: 'uppercase', color: 'var(--text-muted)',
          }}>{titulo || 'Tu tarjeta'}</span>
          {tarjeta.ciclos > 0 && (
            <Badge tone="dorado">{tarjeta.ciclos === 1 ? '1 tarjeta llena' : tarjeta.ciclos + ' tarjetas llenas'}</Badge>
          )}
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12, maxWidth: 236, margin: '0 auto',
        }}>{casillas}</div>

        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.45,
          color: 'var(--text-body)', textAlign: 'center', margin: '16px 0 0',
        }}>{mensaje}</p>

        {extra > 0 && (
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--text-muted)',
            textAlign: 'center', margin: '5px 0 0',
          }}>
            {extra === 1 ? 'Llevas 1 día extra guardado.' : 'Llevas ' + extra + ' días extra guardados.'} No se pierden.
          </p>
        )}
      </div>
    </FramedPanel>
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
function CanjeTarjeta({ tarjeta, lines, valor, onChange, onAgregar, onQuitar, agregado, style }) {
  if (!tarjeta) return null;

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
/* Como se le llama a cada promocion en el ticket. */
const NOMBRE_PROMO = {
  '2x1': '2x1 de viernes',
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
    '2x1': 'Se aplicó tu 2x1 de viernes',
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

/* Aviso del 2x1 de viernes. `activo` lo dice el servidor (campo dosPorUno), no
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
        Viernes de 2x1: pide dos pizzas y la más barata va por nuestra cuenta.
      </span>
    </div>
  );
}

Object.assign(window, { TarjetaPremios, AvisoPremio, Aviso2x1, CanjeTarjeta, PREMIO_PRODUCTOS, mextizzaDescuentoPrevisto, NOMBRE_PROMO, DIAS_TARJETA, CASILLA_BROWNIE, CASILLA_PIZZA });
