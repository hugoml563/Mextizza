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

function WebHeader({ count, onCart, onNav, view, folio, onSeguir }) {
  return (
    <header style={{
      background: 'rgba(245,240,232,0.82)', backdropFilter: 'blur(10px) saturate(140%)', WebkitBackdropFilter: 'blur(10px) saturate(140%)',
      position: 'sticky', top: 0, zIndex: 5, borderBottom: 'var(--border-paper)'
    }}>
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
            <button onClick={onSeguir} aria-label="Seguir mi pedido" style={{
              display: 'flex', alignItems: 'center', gap: 7, background: 'transparent',
              border: '2px solid var(--terracota-horno)', borderRadius: 'var(--radius-sm)', padding: '9px 13px',
              color: 'var(--terracota-horno)', cursor: 'pointer',
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase'
            }}>
              <Icon name="clock" size={16} />
              <span>Seguir</span>
            </button>
          )}
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
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(44px, 6vw, 84px)', lineHeight: 1.01, color: 'var(--negro-carbon)', letterSpacing: -1 }}>
            Masa de 48 horas,<br />horneada <span style={{ color: 'var(--rosa-mexicano)' }}>al pedido</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.6, color: 'var(--text-muted)',
            maxWidth: 500, marginTop: 22
          }}>
            {MEXTIZZA_FACTS.estilo}. Dark kitchen en {MEXTIZZA_FACTS.zona}. Sólo entrega, sin salón.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 34 }}>
            <Button tone="primary" size="lg" icon="cart" onClick={() => onNav('menu')}>Ver el menú</Button>
            <Button tone="outline" size="lg" icon="whatsapp"
              onClick={() => window.open(mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'), '_blank', 'noopener')}>
              Pedir por WhatsApp
            </Button>
          </div>
          <div style={{ display: 'flex', gap: 26, marginTop: 40, flexWrap: 'wrap' }}>
            {[['clock', MEXTIZZA_FACTS.radio], ['flame', 'Horno Gozney XL'], ['pin', 'Radio de 3 km']].map(([ic, t]) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontSize: 12.5 }}>
                <Icon name={ic} size={16} />{t}
              </span>
            ))}
          </div>
        </div>
        <div className="hero-photo-frame" style={{ position: 'relative' }}>
          <img ref={imgRef} src="../../assets/photos/pizza-serranita.jpeg" alt="Pizza Serranita recién salida del horno de piedra"
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

function WebMenu({ onAdd, onCustomize, added }) {
  return (
    <section id="menu" className="reveal" style={{ background: 'var(--surface-sunken)', paddingTop: 76, paddingBottom: 76 }}>
      <div style={webShell.page}>
        <SectionLabel>Menú · horno de piedra, masa de 48 h · envío incluido</SectionLabel>
        <div className="web-menu-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'start' }}>
          {MEXTIZZA_MENU.map((g, i) => (
            <MenuCard key={g.cat} kicker={g.cat} title={g.title}
              headBackground={i === 1 ? 'var(--terracota-horno)' : 'var(--negro-carbon)'}
              style={i === 0 ? { gridRow: 'span 2' } : undefined}>
              {g.note && (
                <p style={{ margin: '0 0 6px', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, lineHeight: 1.55, color: 'var(--text-muted)' }}>{g.note}</p>
              )}
              {g.items.map((it, j) => (
                <MenuItem key={it.id} name={it.name} description={it.desc} price={it.price} photo={it.photo}
                  divider={j < g.items.length - 1}
                  badge={it.flag ? <Badge tone={it.flag === 'Del mes' ? 'dorado' : 'rosa'}>{it.flag}</Badge> : null}
                  action={<Button size="sm" tone={added === it.id ? 'dark' : 'outline'}
                    onClick={() => g.cat === 'Para cerrar' ? onAdd(it) : onCustomize(it)}>
                    {added === it.id ? 'Agregado' : 'Agregar'}
                  </Button>} />
              ))}
            </MenuCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function WebProcess() {
  const steps = [
    ['48h', 'Fermentación fría', 'La masa descansa dos días completos en refrigeración con temperatura controlada. Rompe azúcares y gluten.'],
    ['≤10 min', 'Al horno, al pedido', 'Nada se hornea antes de que entre tu pedido. El Gozney XL cocina cada pizza en menos de diez minutos.'],
    ['≤30 min', 'A tu puerta', 'Radio de reparto de 3 km. Caja kraft con ventilación para que la orilla llegue crujiente.']
  ];
  return (
    <section id="proceso" style={{ background: 'var(--surface-page)', padding: '76px 0' }}>
      <div style={webShell.page}>
        <SectionLabel color="var(--rosa-mexicano-texto)">El proceso es el argumento</SectionLabel>
        <div className="web-process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {steps.map(([n, t, d], i) => (
            <div key={n} className="reveal" style={{ transitionDelay: (i * 80) + 'ms', background: 'var(--surface-card)', border: 'var(--border-paper)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-soft)', padding: 26 }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 40, color: [ 'var(--rosa-mexicano)', 'var(--terracota-horno)', 'var(--dorado-masa)' ][i], lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1, marginTop: 14 }}>{t}</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.65, color: 'var(--text-muted)', marginTop: 8 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WebCatering() {
  const c = MEXTIZZA_FACTS.catering;
  const [nombre, setNombre] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [personas, setPersonas] = React.useState('20 personas');
  const [fecha, setFecha] = React.useState('');
  const [attempted, setAttempted] = React.useState(false);
  const [enviando, setEnviando] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [folio, setFolio] = React.useState(null);

  const digits = tel.replace(/\D/g, '');
  const telOk = digits.length === 10;
  const valid = !!nombre.trim() && telOk && !!fecha.trim();

  const solicitar = async () => {
    if (!valid) return setAttempted(true);
    setError(null);
    setEnviando(true);
    try {
      const r = await mextizzaSolicitarCatering({ nombre, telefono: digits, personas, fecha_evento: fecha });
      setFolio(r.folio);
      window.open(mextizzaWhatsappLink(
        `Hola, soy ${nombre}. Quiero cotizar catering para ${personas} el ${fecha}. Mi teléfono es ${digits}.`
      ), '_blank', 'noopener');
    } catch (e) {
      setError('No se pudo enviar la solicitud. Intenta de nuevo o escríbenos directo por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section id="catering" className="reveal" style={{ background: 'var(--surface-page)', paddingBottom: 76 }}>
      <div style={webShell.page}>
        <SectionLabel>Catering de fin de semana</SectionLabel>
        <div className="web-catering-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'start' }}>
          <FramedPanel variant="object" tape="top">
            <div style={{ paddingTop: 8 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 27 }}>Horno en vivo en tu casa</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-muted)', marginTop: 10 }}>
                Llevamos el Gozney XL y horneamos frente a tus invitados. Eliges de todo el menú más ensalada César o Spring Mix.
              </p>
              <dl style={{ margin: '22px 0 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 20px' }}>
                {[['Por persona', '$' + c.precio], ['Mínimo', c.min + ' personas'], ['Máximo', c.max + ' personas'], ['Anticipo', c.anticipo], ['Anticipación', c.aviso]].map(([k, v]) => (
                  <div key={k}>
                    <dt style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</dt>
                    <dd style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 15 }}>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FramedPanel>
          <FramedPanel variant="info">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 23, marginBottom: 14 }}>Solicitar fecha</h3>
            {folio ? (
              <StatusNote tone="ok" title="Solicitud enviada">
                Folio {folio}. Te vamos a contactar por WhatsApp al número que dejaste para cuadrar el menú y el resto de los detalles.
              </StatusNote>
            ) : (
              <>
                <Field label="Nombre" required placeholder="Tu nombre" value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  invalid={attempted && !nombre.trim()} />
                <Field label="Teléfono" required type="tel" placeholder="55 1234 5678" value={tel}
                  onChange={e => setTel(e.target.value)}
                  invalid={attempted && !telOk}
                  hint={attempted && !telOk ? 'Necesitamos 10 dígitos para contactarte por WhatsApp.' : 'Te contactamos por WhatsApp a este número para cuadrar los detalles.'}
                  style={{ marginTop: 12 }} />
                <Field label="Personas" as="select" value={personas} onChange={e => setPersonas(e.target.value)}
                  options={['20 personas', '22 personas', '25 personas', '30 personas']} style={{ marginTop: 12 }} />
                <Field label="Fecha del evento" required placeholder="dd / mm / aaaa" value={fecha}
                  onChange={e => setFecha(e.target.value)}
                  invalid={attempted && !fecha.trim()}
                  hint={`Necesitamos ${c.aviso} de anticipación mínima.`} style={{ marginTop: 12 }} />
                {error && <StatusNote tone="block" title="Algo falló" style={{ marginTop: 12 }}>{error}</StatusNote>}
                <Button tone="warm" block disabled={enviando} onClick={solicitar} style={{ marginTop: 18 }}>
                  {enviando ? 'Enviando…' : 'Solicitar cotización'}
                </Button>
              </>
            )}
          </FramedPanel>
        </div>
      </div>
    </section>
  );
}

function WebSocial() {
  return (
    <section className="reveal" style={{ background: 'var(--surface-page)', paddingBottom: 76 }}>
      <div style={webShell.page}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <SectionLabel>En redes</SectionLabel>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 20 }}>
            <a href={mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.')} target="_blank" rel="noopener" aria-label="Mextizza en WhatsApp"
              style={{ display: 'flex', alignItems: 'center', borderBottom: 'none', color: 'var(--negro-carbon)' }}>
              <Icon name="whatsapp" size={18} />
            </a>
            <a href={MEXTIZZA_SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Mextizza en Instagram"
              style={{ display: 'flex', alignItems: 'center', gap: 7, borderBottom: 'none', color: 'var(--negro-carbon)' }}>
              <Icon name="instagram" size={18} />
              <span style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13 }}>@mextizzamx</span>
            </a>
            <a href={MEXTIZZA_SOCIAL.facebook} target="_blank" rel="noopener" aria-label="Mextizza en Facebook"
              style={{ display: 'flex', alignItems: 'center', borderBottom: 'none', color: 'var(--negro-carbon)' }}>
              <Icon name="facebook" size={18} />
            </a>
          </div>
        </div>
        <div className="web-social-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16 }}>
          <SocialTile treatment="flat" background="var(--negro-carbon)" headlineColor="var(--blanco-hueso)" headline={<>48 horas<br />de fermento</>} kicker="Horno de piedra" kickerColor="var(--dorado-masa)" />
          <SocialTile treatment="flat" background="var(--rosa-mexicano)" headlineColor="var(--blanco)" headline={<>Hecha por<br />mexicanos</>} kicker="Con técnica italiana" kickerColor="var(--blanco)" />
          <SocialTile treatment="flat" background="var(--terracota-horno)" headlineColor="var(--blanco-hueso)" headline={<>Pizza<br />Cochinita</>} kicker="Especial del mes" kickerColor="var(--dorado-tinte)" />
          <SocialTile treatment="flat" background="var(--dorado-masa)" headlineColor="var(--negro-carbon)" headline={<>Radio<br />3 km</>} kicker="30 min o menos" kickerColor="var(--negro-carbon)" />
        </div>
      </div>
    </section>
  );
}

function WebFooter() {
  return (
    <footer style={{ background: 'var(--negro-carbon)', paddingTop: 56, paddingBottom: 44, position: 'relative' }}>
      <TapeStripe position="top" height={4} />
      <div className="web-footer-grid" style={{ ...webShell.page, display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 28 }}>
        <div>
          <Lockup variant="completo" tone="hueso" size={36} align="left" base="../../" subtitle="Pizzería" tagline="Horneada como allá, gozada como acá" />
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 22 }}>
            <a href={mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.')} target="_blank" rel="noopener" aria-label="Mextizza en WhatsApp"
              className="footer-icon-link" style={{ display: 'flex', color: 'var(--blanco-hueso)', opacity: 0.8, borderBottom: 'none' }}>
              <Icon name="whatsapp" size={19} />
            </a>
            <a href={MEXTIZZA_SOCIAL.instagram} target="_blank" rel="noopener" aria-label="Mextizza en Instagram"
              className="footer-icon-link" style={{ display: 'flex', color: 'var(--blanco-hueso)', opacity: 0.8, borderBottom: 'none' }}>
              <Icon name="instagram" size={19} />
            </a>
            <a href={MEXTIZZA_SOCIAL.facebook} target="_blank" rel="noopener" aria-label="Mextizza en Facebook"
              className="footer-icon-link" style={{ display: 'flex', color: 'var(--blanco-hueso)', opacity: 0.8, borderBottom: 'none' }}>
              <Icon name="facebook" size={19} />
            </a>
          </div>
        </div>
        {[['Pedidos', ['WhatsApp Business', 'Sitio web', 'App Mextizza']], ['Operación', [MEXTIZZA_FACTS.zona, 'Radio de 3 km', 'Sólo entrega, sin salón']]].map(([t, items]) => (
          <div key={t}>
            <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--dorado-masa)', marginBottom: 14 }}>{t}</div>
            {items.map(i => i === 'WhatsApp Business' ? (
              <a key={i} href={mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.')} target="_blank" rel="noopener"
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

Object.assign(window, { WebHeader, WebHero, WebMenu, WebProcess, WebCatering, WebSocial, WebFooter, webShell });
