const DS = window.MextizzaDesignSystem_8a35ee;
const { Wordmark, SectionLabel, Stamp, TapeStripe, DotRow, FramedPanel, SocialTile, Button, Badge, Field, QtyStepper, MenuCard, MenuItem, Icon, StatusNote } = DS;

/* Resilient reference: the compiled bundle may lag a fresh component by one build. */
const ART_FALLBACK = {
  pala: { negro: 'lockup-pala.png', hueso: 'lockup-pala-hueso.png', ratio: 733 / 306, cap: 0.41 },
  completo: { negro: 'lockup-completo.png', hueso: 'lockup-completo-hueso.png', ratio: 733 / 421, cap: 0.30 }
};
const Lockup = DS.Lockup || function LockupFallback({ variant = 'pala', tone = 'negro', size = 44, base = '', subtitle, tagline, align = 'center', style }) {
  const art = ART_FALLBACK[variant] || ART_FALLBACK.pala;
  const height = size / art.cap;
  return (
    <div style={{ textAlign: align, ...style }}>
      <img src={base + 'assets/' + art[tone === 'hueso' ? 'hueso' : 'negro']} alt="Mextizza"
        style={{ height, width: height * art.ratio, display: align === 'left' ? 'block' : 'inline-block' }} />
      {subtitle && <div style={{ fontFamily: 'var(--font-body)', fontSize: Math.max(11, size * 0.24), letterSpacing: Math.max(4, size * 0.14), textTransform: 'uppercase', color: tone === 'hueso' ? 'var(--blanco-hueso)' : 'var(--negro-carbon)', opacity: 0.6, marginTop: 10 }}>{subtitle}</div>}
      {tagline && <div style={{ fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--terracota-horno)', marginTop: 14, lineHeight: 1.3 }}>{tagline}</div>}
    </div>
  );
};


const webShell = {
  page: { maxWidth: 1080, margin: '0 auto', padding: '0 24px' }
};

/* `cinta` es el anuncio de promocion. Va DENTRO del encabezado para que quede
   pegado arriba junto con el, y despues de la cinta de colores — que se ancla
   al borde inferior de su propio contenedor, no del encabezado entero. */
/* Lo que dice la franja de seguimiento en celular, segun el estado. */
function textoPedidoActivo(p) {
  if (!p) return '';
  if (p.estado === 'horno') return 'Tu pizza está en el horno';
  if (p.estado === 'lista') return p.pickup ? 'Tu pedido está listo para recoger' : 'Tu pedido está listo';
  if (p.estado === 'camino') return 'Tu pedido va en camino';
  return 'Recibimos tu pedido';
}

function WebHeader({ count, onCart, onNav, view, folio, onSeguir, cinta, onCuenta, pedidoActivo }) {
  return (
    <header style={{
      background: 'rgba(245,240,232,0.82)', backdropFilter: 'blur(10px) saturate(140%)', WebkitBackdropFilter: 'blur(10px) saturate(140%)',
      position: 'sticky', top: 0, zIndex: 5, borderBottom: 'var(--border-paper)'
    }}>
      <div style={{ position: 'relative' }}>
      <div className="web-header-inner" style={{ ...webShell.page, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 92 }}>
        <a href="#" onClick={e => { e.preventDefault(); onNav('home'); }} style={{ borderBottom: 'none' }}>
          <Lockup variant="pala" size={27} align="left" base="../../" />
        </a>
        <nav className="web-header-nav" style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
          {[['menu', 'Menú'], ['proceso', 'La masa'], ['catering', 'Catering']].map(([k, l]) => (
            <a key={k} href={'#' + k} onClick={e => { e.preventDefault(); onNav(k); }} style={{
              fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase',
              color: view === k ? 'var(--rosa-mexicano-texto)' : 'var(--negro-carbon)',
              borderBottom: view === k ? '2px solid var(--rosa-mexicano-texto)' : '2px solid transparent', paddingBottom: 2
            }}>{l}</a>
          ))}
          {(
            <button className="web-header-seguir" onClick={onSeguir} aria-label="Seguir mi pedido" style={{
              display: 'flex', alignItems: 'center', gap: 7, background: 'transparent',
              border: '2px solid var(--terracota-horno)', borderRadius: 'var(--radius-sm)', padding: '9px 13px',
              color: 'var(--terracota-horno)', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase'
            }}>
              <Icon name="clock" size={16} />
              <span>Seguir</span>
            </button>
          )}
          {onCuenta && <BotonCuenta onAbrir={onCuenta} />}
          <button onClick={onCart} aria-label="Ver pedido" style={{
            display: 'flex', alignItems: 'center', gap: 8, background: count ? 'var(--rosa-mexicano)' : 'transparent',
            border: count ? 'none' : 'var(--border-frame)', borderRadius: 'var(--radius-sm)', padding: '9px 14px',
            color: count ? 'var(--blanco)' : 'var(--negro-carbon)', cursor: 'pointer',
            fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase'
          }}>
            <Icon name="cart" size={18} />
            <span>{count ? count : 'Pedido'}</span>
          </button>
        </nav>
      </div>
      <TapeStripe position="bottom" height={4} />
      </div>
      {/* Solo en celular (la regla vive en index.html): ahi Seguir sale del
          encabezado y aparece aqui, y solo mientras hay un pedido en curso.
          Es cuando de verdad importa; el resto del tiempo no ocupa lugar. */}
      {pedidoActivo && (
        <button className="franja-pedido" onClick={onSeguir} style={{
          alignItems: 'center', gap: 8, width: '100%', minHeight: 44, padding: '8px 24px',
          background: 'var(--blanco-hueso)', border: 'none', borderBottom: '2px solid var(--terracota-horno)',
          color: 'var(--terracota-horno)', cursor: 'pointer', textAlign: 'left',
          fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, letterSpacing: 0.5
        }}>
          <Icon name="clock" size={16} />
          <span style={{ flex: 1 }}>{textoPedidoActivo(pedidoActivo)}</span>
          <span style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>Ver</span>
        </button>
      )}
      {cinta}
    </header>
  );
}

function WebHero({ onNav }) {
  const [mounted, setMounted] = React.useState(false);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    const id = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(id);
  }, []);

  React.useEffect(() => {
    const el = imgRef.current;
    const canTilt = el && window.matchMedia('(hover: hover) and (pointer: fine)').matches
      && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canTilt) return;
    const handleMove = e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) scale(1.015)`;
    };
    const handleLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => { el.removeEventListener('mousemove', handleMove); el.removeEventListener('mouseleave', handleLeave); };
  }, []);

  return (
    <section style={{ background: 'var(--surface-page)', paddingTop: 72, paddingBottom: 84 }}>
      <div className="web-hero-grid" style={{ ...webShell.page, display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div style={{
            fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
            color: 'var(--rosa-mexicano-texto)', marginBottom: 20
          }}>Técnica italiana · Alma mexicana</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 4.9vw, 64px)', lineHeight: 1.01, color: 'var(--negro-carbon)', letterSpacing: -1 }}>
            Masa de 48 horas,<br />horneada <span style={{ color: 'var(--rosa-mexicano)' }}>al pedido</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6, color: 'var(--text-muted)',
            maxWidth: 500, marginTop: 22
          }}>
            {/* Antes: "Dark kitchen en Col. Lomas Lindas...". Jerga que el cliente no
                usa; lo que decide el pedido es el antojo y que llegue caliente. */}
            Tú pides y la metemos al horno. Llega calientita a tu puerta en Lomas Lindas y colonias vecinas.
          </p>
          <div className="web-hero-cta" style={{ display: 'flex', gap: 12, marginTop: 34 }}>
            <Button tone="primary" size="lg" icon="cart" onClick={() => onNav('menu')}>Ver el menú</Button>
            <Button tone="outline" size="lg" icon="whatsapp"
              onClick={() => window.open(mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'), '_blank', 'noopener')}>
              Pedir por WhatsApp
            </Button>
          </div>
          {/* Los dos datos que deciden el pedido, a un tamano que se lee. El modelo
              del horno no le dice nada a quien tiene hambre. */}
          <div style={{ display: 'flex', gap: 22, marginTop: 30, flexWrap: 'wrap' }}>
            {[['pin', 'Envío incluido'], ['clock', 'Hasta 40 min a tu puerta']].map(([ic, t]) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--negro-carbon)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15 }}>
                <Icon name={ic} size={16} />{t}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-photo-frame" style={{ position: 'relative' }}>
          <img ref={imgRef} src="../../assets/photos/pizza-serranita.webp" alt="Pizza Serranita recién salida del horno de piedra"
              srcSet="../../assets/photos/pizza-serranita-md.webp 600w, ../../assets/photos/pizza-serranita.webp 1100w"
              sizes="(max-width: 860px) 100vw, 45vw" fetchPriority="high" decoding="async"
            className="hero-photo-img" data-mounted={mounted} style={{
              width: '100%', aspectRatio: '4/5', objectFit: 'cover',
              borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-raised)'
            }} />
          <div className="hero-stamp" data-mounted={mounted} style={{ position: 'absolute', right: -16, bottom: -16, background: 'var(--surface-page)', borderRadius: '50%' }}>
            <Stamp lines={['Hecho a', 'mano', 'en 48h']} size={116} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* La carta. Antes eran tres tarjetas con renglones de miniaturas de 40px: en
   celular el precio y el boton se comian el ancho y cada descripcion quedaba
   partida palabra por palabra. Ahora las fotos mandan: en compu una cuadricula
   de 3x3 con la del mes primero (8 pizzas + ella, sin huecos); en celular un
   renglon por pizza con foto de 96px y el precio y el boton DEBAJO del texto.
   La regla vive en index.html (.carta-*). */
const fotoTam = (foto, tam) => String(foto || '').replace(/\.(webp|jpe?g)$/, '-' + tam + '.webp');

function BotonAgregar({ it, onAdd, onCustomize, added, chico }) {
  return (
    <Button size={chico ? 'sm' : 'md'} tone={added === it.id ? 'dark' : 'outline'}
      onClick={() => mextizzaAceptaComplementos(it) ? onCustomize(it) : onAdd(it)}>
      {added === it.id ? 'Agregado' : 'Agregar'}
    </Button>
  );
}

function WebMenu({ onAdd, onCustomize, added }) {
  const todas = MEXTIZZA_MENU.flatMap((g) => g.items);
  const esMes = (it) => it.flag === 'Del mes';
  const esPizza = (it) => typeof mextizzaEsPizza === 'function' ? mextizzaEsPizza(it.id) : /^Pizza /.test(it.name);
  const mes = todas.filter(esMes);
  const pizzas = mes.concat(todas.filter((it) => esPizza(it) && !esMes(it)));
  const cierre = todas.filter((it) => !esPizza(it));
  const brincar = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return (
    <section id="menu" className="reveal" style={{ background: 'var(--surface-sunken)', paddingTop: 64, paddingBottom: 72 }}>
      <div style={webShell.page}>
        <h2 className="carta-titulo">La carta</h2>
        <p className="carta-bajada">Todas salen del horno de piedra cuando entra tu pedido. Envío incluido en el precio.</p>
        <nav className="carta-chips" aria-label="Grupos de la carta">
          <a className="activo" href="#carta-pizzas" onClick={brincar('carta-pizzas')}>Pizzas</a>
          <a href="#carta-cierre" onClick={brincar('carta-cierre')}>Postres y bebidas</a>
        </nav>

        <div className="carta-pizzas" id="carta-pizzas">
          {pizzas.map((it) => (
            <article key={it.id} className={'carta-pizza' + (esMes(it) ? ' carta-mes' : '')}>
              <img src={fotoTam(it.photo, 'md')}
                srcSet={fotoTam(it.photo, 'thumb') + ' 220w, ' + fotoTam(it.photo, 'md') + ' 600w'}
                sizes="(min-width: 640px) 340px, 96px"
                alt={it.name} loading="lazy" decoding="async" width="530" height="600" />
              <div className="carta-cuerpo">
                {esMes(it) && <span className="carta-sello">La del mes</span>}
                <h3>{it.name.replace(/^Pizza /, '')}</h3>
                <p>{it.desc}</p>
                <div className="carta-fila">
                  <span className="carta-precio">${it.price}</span>
                  <BotonAgregar it={it} onAdd={onAdd} onCustomize={onCustomize} added={added} />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="carta-cierre" id="carta-cierre">
          <h3>Para cerrar</h3>
          <div className="carta-renglones">
            {cierre.map((it) => (
              <div key={it.id} className="carta-renglon">
                <img src={fotoTam(it.photo, 'thumb')} alt="" loading="lazy" decoding="async" width="60" height="60" />
                <div className="carta-nombre">{it.name}{it.desc ? <small>{it.desc}</small> : null}</div>
                <span className="carta-precio">${it.price}</span>
                <BotonAgregar it={it} onAdd={onAdd} onCustomize={onCustomize} added={added} chico />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* La tarjeta de premios y el 2x1 en la portada. Antes solo se veian en el
   carrito o en /promociones/: quien llegaba por primera vez no se enteraba.
   Los dias y los premios salen de las constantes que el build compara contra
   Code.gs, asi que esto no puede prometer algo distinto a lo que se cobra. */
function WebTarjeta() {
  const caja = React.useRef(null);
  const [visto, setVisto] = React.useState(false);
  React.useEffect(() => {
    const el = caja.current;
    if (!el || typeof IntersectionObserver !== 'function') { setVisto(true); return; }
    // La rebanada sale del horno cuando la seccion entra en pantalla, una vez.
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { setVisto(true); io.disconnect(); }
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Pizza = typeof PizzaSellos === 'function' ? PizzaSellos : null;
  const dosxuno = typeof MEXTIZZA_2X1 !== 'undefined' ? MEXTIZZA_2X1 : { nombre: 'Miércoles', desde: 19 };
  const hora = dosxuno.desde > 12 ? (dosxuno.desde - 12) + ' pm' : dosxuno.desde + ' am';
  const traviesa = typeof mextizzaProducto === 'function' && PREMIO_PRODUCTOS
    ? (mextizzaProducto(PREMIO_PRODUCTOS.pizza) || {}).name : '';
  return (
    <section className="tarjeta-portada reveal">
      <div className="tarjeta-rejilla" style={webShell.page}>
        <div className="tarjeta-pizza" ref={caja} aria-hidden="true">
          {Pizza && <Pizza llenas={visto ? 6 : 5} nueva={visto} pendiente={false}
            listos={{ brownie: false, pizza: false }} tam={260} />}
        </div>
        <div>
          <h2 className="carta-titulo">Completa la pizza y te regalamos una</h2>
          <p className="carta-bajada">Cada día que te llevamos pizza se hornea una rebanada de tu tarjeta. Se junta con tu teléfono.</p>
          <ul className="tarjeta-pasos">
            <li><span className="tarjeta-marca" style={{ background: '#5B3A26' }} />En la rebanada {CASILLA_BROWNIE} te toca un brownie.</li>
            <li><span className="tarjeta-marca" style={{ background: '#F4CD5E' }} />Con la {CASILLA_PIZZA} la pizza está completa: la {String(traviesa || 'Pizza Traviesa').replace(/^Pizza /, '')} va por nuestra cuenta.</li>
          </ul>
          <div className="tarjeta-2x1">
            <div className="tarjeta-2x1-grande">2x1</div>
            <div className="tarjeta-2x1-texto">
              <b>{dosxuno.nombre} de 2x1</b>
              <span>Desde las {hora}, pide dos pizzas y la de menor precio va por la casa.</span>
            </div>
          </div>
          <div className="tarjeta-ligas">
            <a href="/promociones/">Ver las bases</a>
            <a href="/app">Tu tarjeta también vive en la app</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* La masa. Eran tres tarjetas iguales con numeros tecnicos; ahora la foto de
   la masa (las burbujas de la fermentacion prueban mas que cualquier dato) y
   una frase con la escena primero. Los tres datos quedan en un renglon. */
function WebProcess() {
  const datos = [
    ['48 h', 'de fermentación en frío'],
    ['10 min', 'o menos en el horno de piedra'],
    ['40 min', 'o menos hasta tu puerta'],
  ];
  return (
    <section id="proceso" className="reveal" style={{ background: 'var(--surface-page)', padding: '72px 0' }}>
      <div className="masa-rejilla" style={webShell.page}>
        <img className="masa-foto" src="../../assets/photos/masa-48h-md.webp"
          srcSet="../../assets/photos/masa-48h-md.webp 338w, ../../assets/photos/masa-48h.webp 619w"
          sizes="(min-width: 860px) 380px, 100vw" loading="lazy" decoding="async" width="619" height="1100"
          alt="La masa de Mextizza después de 48 horas, con las burbujas de la fermentación" />
        <div>
          <h2 className="carta-titulo">Nuestra masa descansa dos días para que tú no esperes</h2>
          <p className="carta-bajada">
            La dejamos fermentar en frío 48 horas: por eso sale ligera y con la orilla llena de burbujas.
            Cuando pides, la estiramos, la horneamos y sale directo a tu puerta.
          </p>
          <div className="masa-datos">
            {datos.map(([n, t]) => (
              <div key={n}><b>{n}</b><span>{t}</span></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Los posts de Instagram pegados en la pared del catering. x/y/r en compu,
   xm/ym en celular (ahi se ven cinco). z: quien queda encima de quien. */
const CARTELES = [
  { post: 'traviesa', x: '-1%', y: '9%', r: '-6deg', z: 2, xm: '-8%', ym: '5%' },
  { post: 'cochinita', x: '12.5%', y: '32%', r: '4deg', z: 3, xm: '14%', ym: '36%' },
  { post: 'aloha', x: '26%', y: '5%', r: '-3deg', z: 2, xm: '33%', ym: '3%' },
  { post: 'roni', x: '40%', y: '28%', r: '5deg', z: 4, xm: '54%', ym: '33%' },
  { post: 'chisi', x: '53.5%', y: '4%', r: '-4deg', z: 2, soloCompu: true },
  { post: 'provola', x: '67%', y: '30%', r: '3deg', z: 3, soloCompu: true },
  { post: 'serranita', x: '80.5%', y: '7%', r: '-5deg', z: 2, xm: '70%', ym: '6%' },
];

/* La pared de tabique con los carteles. Los estilos viven en ui_kits/catering.css
   (los comparte la pagina de catering). Aqui solo va lo que necesita JavaScript:
   que se peguen uno por uno al entrar en pantalla, y que la inclinacion y el
   brillo sigan al cursor. Todo se escribe como variables de CSS, sin estado de
   React: el navegador hace la animacion. */
function ParedCarteles() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const pared = ref.current;
    if (!pared) return;
    const limpiar = [];
    const listo = () => { pared.classList.add('pegada'); limpiar.push(setTimeout(() => pared.classList.add('lista'), 1200)); };
    if (typeof IntersectionObserver === 'function') {
      const io = new IntersectionObserver((es) => {
        if (es.some((e) => e.isIntersecting)) { listo(); io.disconnect(); }
      }, { threshold: 0.3 });
      io.observe(pared);
      limpiar.push(() => io.disconnect());
    } else listo();

    const conMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const quieto = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (conMouse && !quieto) {
      pared.querySelectorAll('.cartel').forEach((c) => {
        /* Tras el despegue (450 ms) la inclinacion sigue al cursor sin rebote.
           Se mide desde el primer movimiento: si el cartel se mueve debajo del
           cursor, el navegador no avisa la entrada. */
        let desde = 0;
        const mover = (e) => {
          if (!desde) desde = performance.now();
          else if (performance.now() - desde > 450) c.classList.add('siguiendo');
          const r = c.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          c.style.setProperty('--ry', ((x - 0.5) * 12).toFixed(2) + 'deg');
          c.style.setProperty('--rx', ((0.5 - y) * 10).toFixed(2) + 'deg');
          c.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
          c.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
        };
        const salir = () => {
          desde = 0;
          c.classList.remove('siguiendo');
          c.style.setProperty('--rx', '0deg');
          c.style.setProperty('--ry', '0deg');
        };
        c.addEventListener('pointermove', mover);
        c.addEventListener('pointerleave', salir);
        limpiar.push(() => { c.removeEventListener('pointermove', mover); c.removeEventListener('pointerleave', salir); });
      });
    }
    return () => limpiar.forEach((f) => (typeof f === 'function' ? f() : clearTimeout(f)));
  }, []);

  return (
    <div ref={ref} className="pared animada" aria-hidden="true">
      <div className="pared-lienzo">
        <p className="pintura">Mextizza</p>
        <div className="calco">HECHO<br />A MANO<br />EN 48H</div>
        {CARTELES.map((c, i) => (
          <div key={c.post} className={'cartel' + (c.soloCompu ? ' solo-compu' : '')}
            style={{ '--x': c.x, '--y': c.y, '--r': c.r, '--z': c.z, '--xm': c.xm || '0%', '--ym': c.ym || '0%', '--d': (i * 110) + 'ms' }}>
            <img src={'../../assets/social/posts/post-' + c.post + '.webp'} alt="" loading="lazy" decoding="async" width="432" height="540" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Fecha de hoy en CDMX mas n dias, como AAAA-MM-DD: el minimo del calendario. */
function fechaCDMXMas(dias) {
  const hoy = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Mexico_City', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  const [a, m, d] = hoy.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d + dias, 12)).toISOString().slice(0, 10);
}
const fechaLegible = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(a, m - 1, d, 12)).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'UTC' });
};
const pesos = (v) => '$' + Math.round(v).toLocaleString('es-MX');

/* El catering. Antes: dos tarjetas con cinco etiquetas de ficha tecnica y un
   formulario de "Solicitar cotizacion" para un precio que ya es fijo. Ahora: la
   pared con los carteles, como va en tres pasos y una calculadora que dice el
   total y el anticipo al instante. La solicitud sigue llegando al Sheet. */
function WebCatering() {
  const c = MEXTIZZA_FACTS.catering;
  const [n, setN] = React.useState(25);
  const [fecha, setFecha] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [nombre, setNombre] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [attempted, setAttempted] = React.useState(false);
  const [enviando, setEnviando] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [folio, setFolio] = React.useState(null);

  const minimo = fechaCDMXMas(c.avisoDias || 4);
  const total = n * c.precio;
  const anticipo = total * (parseFloat(c.anticipo) / 100);
  const digits = tel.replace(/\D/g, '');
  const fallas = {
    fecha: !fecha ? 'Elige la fecha de tu fiesta.' : fecha < minimo ? 'Necesitamos ' + c.aviso + ' de anticipación.' : '',
    direccion: direccion.trim().length < 6 ? 'Escribe la dirección de la fiesta.' : '',
    nombre: !nombre.trim() ? 'Escribe tu nombre.' : '',
    tel: digits.length !== 10 ? 'Necesitamos 10 dígitos para escribirte por WhatsApp.' : '',
  };
  const valido = !Object.values(fallas).some(Boolean);

  const apartar = async (e) => {
    e.preventDefault();
    if (!valido) return setAttempted(true);
    setError(null);
    setEnviando(true);
    const dia = fechaLegible(fecha);
    try {
      const r = await mextizzaSolicitarCatering({
        nombre: nombre.trim(), telefono: digits, personas: n + ' personas', fecha_evento: dia + ' (' + fecha + ')',
        notas: 'Dirección: ' + direccion.trim() + '. Total ' + pesos(total) + ', anticipo ' + pesos(anticipo) + '.',
      });
      setFolio(r.folio);
      window.open(mextizzaWhatsappLink(
        'Hola, soy ' + nombre.trim() + '. Quiero apartar catering para ' + n + ' personas el ' + dia +
        ' en ' + direccion.trim() + '. Total ' + pesos(total) + ', anticipo ' + pesos(anticipo) + '. Mi teléfono es ' + digits + '.'
      ), '_blank', 'noopener');
    } catch (err) {
      setError('No se pudo enviar. Intenta de nuevo o escríbenos directo por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };

  const campo = (id, etiqueta, valor, cambiar, props, falla) => (
    <div className="campo">
      <label className="etiqueta" htmlFor={id}>{etiqueta}</label>
      <input id={id} value={valor} onChange={(e) => cambiar(e.target.value)} aria-invalid={attempted && !!falla}
        aria-describedby={attempted && falla ? id + '-error' : undefined} {...props} />
      {attempted && falla && <p className="error" id={id + '-error'}>{falla}</p>}
    </div>
  );

  return (
    <section id="catering" className="reveal" style={{ background: 'var(--surface-page)', paddingBottom: 76 }}>
      <ParedCarteles />
      <div style={{ ...webShell.page, marginTop: 34 }}>
        <h2 className="carta-titulo">El horno se va a tu fiesta</h2>
        <p className="carta-bajada" style={{ maxWidth: '46ch' }}>
          Tus invitados agarran su rebanada recién salida del horno. Tú te olvidas de la cocina y disfrutas la fiesta.
        </p>
        <div className="catering-rejilla">
          <div>
            <ol className="catering-pasos">
              <li><b>Apartas la fecha</b><span>{c.dias}, con {c.aviso} de anticipación y el {c.anticipo} de anticipo.</span></li>
              <li><b>Llegamos con el horno</b><span>Lo montamos y lo operamos nosotros, ahí mismo. Llevamos {c.incluye}.</span></li>
              <li><b>Sale pizza toda la fiesta</b><span>Durante {c.servicio}, de toda la carta, más ensalada César o Spring Mix.</span></li>
            </ol>
            <p className="catering-letra">Solo necesitamos un espacio al aire libre o ventilado y una superficie firme para montar el horno.
              Vamos a Atizapán y la zona norte del Estado de México; si tu fiesta queda más lejos, escríbenos y lo vemos.</p>
          </div>

          {folio ? (
            <div className="calcula">
              <StatusNote tone="ok" title="Fecha solicitada">
                Folio {folio}. Te escribimos por WhatsApp para confirmar la disponibilidad y el anticipo.
              </StatusNote>
            </div>
          ) : (
            <form className="calcula" onSubmit={apartar} noValidate>
              <h3>¿Cuántos van a ser?</h3>
              <span className="etiqueta" id="catering-personas">Invitados</span>
              <div className="contador" role="group" aria-labelledby="catering-personas">
                <button type="button" aria-label="Una persona menos" disabled={n <= c.min} onClick={() => setN((v) => Math.max(c.min, v - 1))}>−</button>
                <output aria-live="polite">{n}</output>
                <button type="button" aria-label="Una persona más" disabled={n >= c.max} onClick={() => setN((v) => Math.min(c.max, v + 1))}>+</button>
                <small>personas</small>
              </div>
              <p className="nota">
                {n === c.min ? 'El mínimo es ' + c.min + ': con menos no sale a cuenta montar el horno.'
                  : n === c.max ? '¿Son más de ' + c.max + '? Escríbenos y lo vemos.' : ''}
              </p>
              <div className="total" aria-live="polite">
                <div className="grande">{pesos(total)} <small>en total</small></div>
                <p>Apartas con <b>{pesos(anticipo)}</b>. Incluye {c.servicio} de pizza de toda la carta, ensalada, {c.incluye}.</p>
              </div>
              {campo('catering-fecha', 'Fecha', fecha, setFecha, { type: 'date', min: minimo }, fallas.fecha)}
              {campo('catering-direccion', 'Dirección de la fiesta', direccion, setDireccion,
                { placeholder: 'Calle, número y colonia', autoComplete: 'street-address' }, fallas.direccion)}
              {campo('catering-nombre', 'Tu nombre', nombre, setNombre, { autoComplete: 'name' }, fallas.nombre)}
              {campo('catering-tel', 'WhatsApp', tel, setTel, { type: 'tel', inputMode: 'tel', placeholder: '10 dígitos', autoComplete: 'tel-national' }, fallas.tel)}
              {error && <StatusNote tone="block" title="Algo falló" style={{ marginTop: 12 }}>{error}</StatusNote>}
              <button className="apartar" type="submit" disabled={enviando}>{enviando ? 'Enviando…' : 'Apartar mi fecha'}</button>
              <p className="pie">Te confirmamos disponibilidad por WhatsApp.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* Tarjeta con el marco de un post de redes: avatar, arroba, imagen cuadrada y
   pie. Sirve para cualquier imagen, asi que las piezas que se diseñen en Canva
   entran aqui igual que las fotos de producto.
   Sin likes ni comentarios: inventar esos numeros seria enseñarle al visitante
   una prueba social que no existe. */
function SocialPost({ imagen, alt, pie }) {
  return (
    <a className="social-foto" href={MEXTIZZA_SOCIAL.instagram} target="_blank" rel="noopener"
      aria-label={'Ver ' + alt + ' en el Instagram de Mextizza'}
      style={{ display: 'flex', flexDirection: 'column', background: 'var(--surface-card)',
        border: 'var(--border-frame)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
        borderBottom: 'var(--border-frame)', color: 'var(--negro-carbon)' }}>

      <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 8, padding: '9px 11px' }}>
        {/* lazy: son ocho copias a ~2900 px de scroll. Cargarlas al abrir la pagina
              gastaba datos del cliente antes de que nadie las viera. */}
          <img src="../../assets/social/mextizza-perfil-ig-fb-320.png" alt="" aria-hidden="true"
            loading="lazy" decoding="async"
          style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover', border: 'var(--border-paper)' }} />
        <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12.5 }}>mextizzamx</span>
        <Icon name="instagram" size={14} style={{ marginLeft: 'auto', opacity: 0.45 }} />
      </div>

      <div style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', background: 'var(--surface-sunken)' }}>
        <img src={imagen} alt={alt} loading="lazy" decoding="async"
          srcSet={imagen && imagen.slice(-5) === ".webp"
            ? imagen.slice(0, -5) + "-thumb.webp 220w, " + imagen.slice(0, -5) + "-md.webp 600w, " + imagen + " 1100w"
            : undefined}
          sizes="(max-width: 420px) 100vw, (max-width: 860px) 50vw, 25vw"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      <div style={{ flex: 1, padding: '10px 11px 12px', fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.45 }}>
        <b style={{ fontWeight: 700 }}>mextizzamx</b> <span style={{ color: 'var(--text-muted)' }}>{pie}</span>
      </div>
    </a>
  );
}
/* Carrusel horizontal con scroll-snap nativo: el swipe tactil, la rueda con
   shift y las flechas del teclado ya funcionan sin codigo. Solo hacen falta los
   botones, porque en escritorio con raton no hay forma obvia de descubrir que
   esto se desplaza. Los extremos se detectan con IntersectionObserver sobre la
   primera y la ultima tarjeta, no escuchando cada cuadro del scroll. */
function CarruselRedes({ fotos }) {
  const pista = React.useRef(null);
  const [enInicio, setEnInicio] = React.useState(true);
  const [enFin, setEnFin] = React.useState(false);

  React.useEffect(() => {
    const el = pista.current;
    if (!el || !el.children.length) return;
    const tarjetas = Array.from(el.children);
    const primera = tarjetas[0], ultima = tarjetas[tarjetas.length - 1];
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (e.target === primera) setEnInicio(e.isIntersecting);
        if (e.target === ultima) setEnFin(e.isIntersecting);
      });
    }, { root: el, threshold: 0.9 });
    io.observe(primera); io.observe(ultima);
    return () => io.disconnect();
  }, [fotos.length]);

  const mover = (dir) => {
    const el = pista.current;
    if (!el) return;
    const t = el.firstElementChild;
    const paso = t ? t.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    // El scroll-behavior del CSS no anula un behavior explicito en JS, asi que
    // la preferencia de movimiento reducido se consulta aqui tambien.
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * paso, behavior: suave ? "smooth" : "auto" });
  };

  const flecha = (dir, desactivada, etiqueta) => (
    <button type="button" onClick={() => mover(dir)} disabled={desactivada} aria-label={etiqueta}
      className="social-flecha" style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: 38, height: 38, borderRadius: "50%", cursor: desactivada ? "default" : "pointer",
        border: "var(--border-frame)", background: "var(--surface-card)",
        color: "var(--negro-carbon)", opacity: desactivada ? 0.3 : 1,
        transition: "opacity var(--dur-fast) var(--ease-standard)"
      }}>
      <Icon name={dir < 0 ? "chevronLeft" : "chevronRight"} size={18} />
    </button>
  );

  return (
    <div style={{ position: "relative" }}>
      <div ref={pista} className="social-pista" tabIndex={0} role="region"
        aria-label="Fotos de nuestras pizzas, desplazable horizontalmente">
        {fotos.map(it => (
          <div key={it.id} className="social-diapo">
            <SocialPost imagen={it.photo} alt={it.name} pie={it.name + ". " + it.desc} />
          </div>
        ))}
      </div>
      <div className="social-flechas" style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
        {flecha(-1, enInicio, "Ver fotos anteriores")}
        {flecha(1, enFin, "Ver mas fotos")}
      </div>
    </div>
  );
}

function WebSocial() {
  /* Rejilla de fotos reales que enlaza al perfil, en vez de un feed en vivo.
     Un feed de Instagram exigiria la Graph API (la Basic Display murio en dic
     2024), un token que caduca cada 60 dias y que NO puede vivir en este archivo
     porque se sirve abierto, mas abrir la CSP a dominios de Meta. Con fotos
     propias controlamos que se ve y no hay nada que mantener. */
  const fotos = MEXTIZZA_MENU
    .flatMap(g => g.items)
    .filter(it => it.photo && it.photo.includes('pizza-'));

  return (
    <section className="reveal" style={{ background: 'var(--surface-page)', paddingBottom: 76 }}>
      <div style={webShell.page}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h2 className="carta-titulo" style={{ margin: '0 0 18px' }}>Así salen del horno</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20 }}>
            <a href={mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.')} target="_blank" rel="noopener" aria-label="Mextizza en WhatsApp"
              style={{ display: 'flex', alignItems: 'center', borderBottom: 'none', color: 'var(--negro-carbon)', padding: 6 }}>
              <Icon name="whatsapp" size={18} />
            </a>
            <a href={MEXTIZZA_SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Mextizza en Instagram"
              style={{ display: 'flex', alignItems: 'center', gap: 7, borderBottom: 'none', color: 'var(--negro-carbon)' }}>
              <Icon name="instagram" size={18} />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13 }}>@mextizzamx</span>
            </a>
            <a href={MEXTIZZA_SOCIAL.facebook} target="_blank" rel="noopener" aria-label="Mextizza en Facebook"
              style={{ display: 'flex', alignItems: 'center', borderBottom: 'none', color: 'var(--negro-carbon)', padding: 6 }}>
              <Icon name="facebook" size={18} />
            </a>
          </div>
        </div>

        <CarruselRedes fotos={fotos} />
      </div>
    </section>
  );
}

// Que renglones del footer son enlaces. Los que no aparecen aqui quedan como texto.
const footerEnlaces = {
  'Pizza a domicilio en Atizapán': '/pizza-a-domicilio-atizapan/',
  'Catering con horno': '/catering-pizza-horno-de-lena/',
  'La pizza del mes': '/pizza-del-mes/',
  'Promociones': '/promociones/',
  'WhatsApp Business': mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'),
  'Sitio web': '/',
  'App Mextizza': '/app',
};

function WebFooter() {
  return (
    <footer style={{ background: 'var(--negro-carbon)', paddingTop: 56, paddingBottom: 44, position: 'relative' }}>
      <TapeStripe position="top" height={4} />
      <div className="web-footer-grid" style={{ ...webShell.page, display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 28 }}>
        <div>
          <Lockup variant="completo" tone="hueso" size={36} align="left" base="../../" subtitle="Pizzería" tagline="Horneada como allá, gozada como acá" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 22 }}>
            <a href={mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.')} target="_blank" rel="noopener" aria-label="Mextizza en WhatsApp"
              className="footer-icon-link" style={{ display: 'flex', color: 'var(--blanco-hueso)', opacity: 0.8, borderBottom: 'none', padding: 6 }}>
              <Icon name="whatsapp" size={19} />
            </a>
            <a href={MEXTIZZA_SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Mextizza en Instagram"
              className="footer-icon-link" style={{ display: 'flex', color: 'var(--blanco-hueso)', opacity: 0.8, borderBottom: 'none', padding: 6 }}>
              <Icon name="instagram" size={19} />
            </a>
            <a href={MEXTIZZA_SOCIAL.facebook} target="_blank" rel="noopener" aria-label="Mextizza en Facebook"
              className="footer-icon-link" style={{ display: 'flex', color: 'var(--blanco-hueso)', opacity: 0.8, borderBottom: 'none', padding: 6 }}>
              <Icon name="facebook" size={19} />
            </a>
          </div>
        </div>
        {[['Pedidos', ['WhatsApp Business', 'Sitio web', 'App Mextizza']], ['Operación', [MEXTIZZA_FACTS.zona, 'Radio de 3 km', 'Sólo entrega, sin salón']], ['Más', ['Pizza a domicilio en Atizapán', 'Catering con horno', 'La pizza del mes', 'Promociones']]].map(([t, items]) => (
          <div key={t}>
            <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--dorado-masa)', marginBottom: 14 }}>{t}</div>
            {items.map(i => footerEnlaces[i] ? (
              <a key={i} href={footerEnlaces[i]} {...(footerEnlaces[i].startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                className="footer-icon-link"
                style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.9, color: 'var(--blanco-hueso)', opacity: 0.7, borderBottom: 'none' }}>{i}</a>
            ) : (
              <div key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.9, color: 'var(--blanco-hueso)', opacity: 0.7 }}>{i}</div>
            ))}
          </div>
        ))}
      </div>
    </footer>
  );
}

Object.assign(window, { WebHeader, WebHero, WebMenu, WebTarjeta, WebProcess, WebCatering, WebSocial, WebFooter, webShell });
