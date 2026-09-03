/* Generado por scripts/build-js.js. No editar a mano:
   los cambios van en los .jsx de origen. */

/* ui_kits/web/WebSurfaces.jsx */
(function () {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const DS = window.MextizzaDesignSystem_8a35ee;
const {
  Wordmark,
  SectionLabel,
  Stamp,
  TapeStripe,
  DotRow,
  FramedPanel,
  SocialTile,
  Button,
  Badge,
  Field,
  QtyStepper,
  MenuCard,
  MenuItem,
  Icon,
  StatusNote
} = DS;

/* Resilient reference: the compiled bundle may lag a fresh component by one build. */
const ART_FALLBACK = {
  pala: {
    negro: 'lockup-pala.png',
    hueso: 'lockup-pala-hueso.png',
    ratio: 733 / 306,
    cap: 0.41
  },
  completo: {
    negro: 'lockup-completo.png',
    hueso: 'lockup-completo-hueso.png',
    ratio: 733 / 421,
    cap: 0.30
  }
};
const Lockup = DS.Lockup || function LockupFallback({
  variant = 'pala',
  tone = 'negro',
  size = 44,
  base = '',
  subtitle,
  tagline,
  align = 'center',
  style
}) {
  const art = ART_FALLBACK[variant] || ART_FALLBACK.pala;
  const height = size / art.cap;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: base + 'assets/' + art[tone === 'hueso' ? 'hueso' : 'negro'],
    alt: "Mextizza",
    style: {
      height,
      width: height * art.ratio,
      display: align === 'left' ? 'block' : 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: Math.max(11, size * 0.24),
      letterSpacing: Math.max(4, size * 0.14),
      textTransform: 'uppercase',
      color: tone === 'hueso' ? 'var(--blanco-hueso)' : 'var(--negro-carbon)',
      opacity: 0.6,
      marginTop: 10
    }
  }, subtitle), tagline && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 12,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'var(--terracota-horno)',
      marginTop: 14,
      lineHeight: 1.3
    }
  }, tagline));
};
const webShell = {
  page: {
    maxWidth: 1080,
    margin: '0 auto',
    padding: '0 24px'
  }
};
function WebHeader({
  count,
  onCart,
  onNav,
  view,
  folio,
  onSeguir
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'rgba(245,240,232,0.82)',
      backdropFilter: 'blur(10px) saturate(140%)',
      WebkitBackdropFilter: 'blur(10px) saturate(140%)',
      position: 'sticky',
      top: 0,
      zIndex: 5,
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-header-inner",
    style: {
      ...webShell.page,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 92
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNav('home');
    },
    style: {
      borderBottom: 'none'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "pala",
    size: 27,
    align: "left",
    base: "../../"
  })), /*#__PURE__*/React.createElement("nav", {
    className: "web-header-nav",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, [['menu', 'Menú'], ['proceso', 'La masa'], ['catering', 'Catering']].map(([k, l]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    href: '#' + k,
    onClick: e => {
      e.preventDefault();
      onNav(k);
    },
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 500,
      fontSize: 13,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: view === k ? 'var(--rosa-mexicano-texto)' : 'var(--negro-carbon)',
      borderBottom: view === k ? '2px solid var(--rosa-mexicano-texto)' : '2px solid transparent',
      paddingBottom: 2
    }
  }, l)), /*#__PURE__*/React.createElement("button", {
    onClick: onSeguir,
    "aria-label": "Seguir mi pedido",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      background: 'transparent',
      border: '2px solid var(--terracota-horno)',
      borderRadius: 'var(--radius-sm)',
      padding: '9px 13px',
      color: 'var(--terracota-horno)',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: 1,
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, "Seguir")), /*#__PURE__*/React.createElement("button", {
    onClick: onCart,
    "aria-label": "Ver pedido",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      background: count ? 'var(--rosa-mexicano)' : 'transparent',
      border: count ? 'none' : 'var(--border-frame)',
      borderRadius: 'var(--radius-sm)',
      padding: '9px 14px',
      color: count ? 'var(--blanco)' : 'var(--negro-carbon)',
      cursor: 'pointer',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 12,
      letterSpacing: 1,
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cart",
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, count ? count : 'Pedido')))), /*#__PURE__*/React.createElement(TapeStripe, {
    position: "bottom",
    height: 4
  }));
}
function WebHero({
  onNav
}) {
  const [mounted, setMounted] = React.useState(false);
  const imgRef = React.useRef(null);
  React.useEffect(() => {
    const id = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(id);
  }, []);
  React.useEffect(() => {
    const el = imgRef.current;
    const canTilt = el && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canTilt) return;
    const handleMove = e => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) scale(1.015)`;
    };
    const handleLeave = () => {
      el.style.transform = '';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)',
      paddingTop: 72,
      paddingBottom: 84
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "web-hero-grid",
    style: {
      ...webShell.page,
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 56,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 11,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)',
      marginBottom: 20
    }
  }, "T\xE9cnica italiana \xB7 Alma mexicana"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(40px, 4.9vw, 64px)',
      lineHeight: 1.01,
      color: 'var(--negro-carbon)',
      letterSpacing: -1
    }
  }, "Masa de 48 horas,", /*#__PURE__*/React.createElement("br", null), "horneada ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rosa-mexicano)'
    }
  }, "al pedido")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 16,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      maxWidth: 500,
      marginTop: 22
    }
  }, MEXTIZZA_FACTS.estilo, ". Dark kitchen en ", MEXTIZZA_FACTS.zona, ". S\xF3lo entrega, sin sal\xF3n."), /*#__PURE__*/React.createElement("div", {
    className: "web-hero-cta",
    style: {
      display: 'flex',
      gap: 12,
      marginTop: 34
    }
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    icon: "cart",
    onClick: () => onNav('menu')
  }, "Ver el men\xFA"), /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "lg",
    icon: "whatsapp",
    onClick: () => window.open(mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'), '_blank', 'noopener')
  }, "Pedir por WhatsApp")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      marginTop: 40,
      flexWrap: 'wrap'
    }
  }, [['clock', MEXTIZZA_FACTS.radio], ['flame', 'Horno Gozney XL'], ['pin', 'Envío incluido']].map(([ic, t]) => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-body)',
      fontSize: 12.5
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 16
  }), t)))), /*#__PURE__*/React.createElement("div", {
    className: "hero-photo-frame",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    ref: imgRef,
    src: "../../assets/photos/pizza-serranita.webp",
    alt: "Pizza Serranita reci\xE9n salida del horno de piedra",
    srcSet: "../../assets/photos/pizza-serranita-md.webp 600w, ../../assets/photos/pizza-serranita.webp 1100w",
    sizes: "(max-width: 860px) 100vw, 45vw",
    fetchPriority: "high",
    decoding: "async",
    className: "hero-photo-img",
    "data-mounted": mounted,
    style: {
      width: '100%',
      aspectRatio: '4/5',
      objectFit: 'cover',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-raised)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero-stamp",
    "data-mounted": mounted,
    style: {
      position: 'absolute',
      right: -16,
      bottom: -16,
      background: 'var(--surface-page)',
      borderRadius: '50%'
    }
  }, /*#__PURE__*/React.createElement(Stamp, {
    lines: ['Hecho a', 'mano', 'en 48h'],
    size: 116
  })))));
}
function WebMenu({
  onAdd,
  onCustomize,
  added
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "menu",
    className: "reveal",
    style: {
      background: 'var(--surface-sunken)',
      paddingTop: 76,
      paddingBottom: 76
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: webShell.page
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Men\xFA"), /*#__PURE__*/React.createElement("div", {
    className: "web-menu-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 28,
      alignItems: 'start'
    }
  }, MEXTIZZA_MENU.map((g, i) => /*#__PURE__*/React.createElement(MenuCard, {
    key: g.cat,
    kicker: g.cat,
    title: g.title,
    headBackground: i === 1 ? 'var(--terracota-horno)' : 'var(--negro-carbon)',
    style: i === 0 ? {
      gridRow: 'span 2'
    } : undefined
  }, g.note && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 6px',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 13,
      lineHeight: 1.55,
      color: 'var(--text-muted)'
    }
  }, g.note), g.items.map((it, j) => /*#__PURE__*/React.createElement(MenuItem, {
    key: it.id,
    name: it.name,
    description: it.desc,
    price: it.price,
    photo: it.photo,
    divider: j < g.items.length - 1,
    badge: it.flag ? /*#__PURE__*/React.createElement(Badge, {
      tone: it.flag === 'Del mes' ? 'dorado' : 'rosa'
    }, it.flag) : null,
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      tone: added === it.id ? 'dark' : 'outline',
      onClick: () => g.cat === 'Para cerrar' ? onAdd(it) : onCustomize(it)
    }, added === it.id ? 'Agregado' : 'Agregar')
  })))))));
}
function WebProcess() {
  const steps = [['48h', 'Fermentación fría', 'La masa descansa dos días completos en refrigeración con temperatura controlada. Rompe azúcares y gluten.'], ['≤10 min', 'Al horno, al pedido', 'Nada se hornea antes de que entre tu pedido. El Gozney XL cocina cada pizza en menos de diez minutos.'], ['≤40 min', 'A tu puerta', 'Radio de reparto de 3 km. Caja kraft con ventilación para que la orilla llegue crujiente.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "proceso",
    style: {
      background: 'var(--surface-page)',
      padding: '76px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: webShell.page
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    color: "var(--rosa-mexicano-texto)"
  }, "El proceso es el argumento"), /*#__PURE__*/React.createElement("div", {
    className: "web-process-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, steps.map(([n, t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    className: "reveal",
    style: {
      transitionDelay: i * 80 + 'ms',
      background: 'var(--surface-card)',
      border: 'var(--border-paper)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-soft)',
      padding: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 40,
      color: ['var(--rosa-mexicano)', 'var(--terracota-horno)', 'var(--dorado-masa)'][i],
      lineHeight: 1
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      textTransform: 'uppercase',
      letterSpacing: 1,
      marginTop: 14
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.65,
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, d))))));
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
      const r = await mextizzaSolicitarCatering({
        nombre,
        telefono: digits,
        personas,
        fecha_evento: fecha
      });
      setFolio(r.folio);
      window.open(mextizzaWhatsappLink(`Hola, soy ${nombre}. Quiero cotizar catering para ${personas} el ${fecha}. Mi teléfono es ${digits}.`), '_blank', 'noopener');
    } catch (e) {
      setError('No se pudo enviar la solicitud. Intenta de nuevo o escríbenos directo por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "catering",
    className: "reveal",
    style: {
      background: 'var(--surface-page)',
      paddingBottom: 76
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: webShell.page
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Catering de fin de semana"), /*#__PURE__*/React.createElement("div", {
    className: "web-catering-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 28,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement(FramedPanel, {
    variant: "object",
    tape: "top"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 8
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 27
    }
  }, "Horno en vivo en tu casa"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginTop: 10
    }
  }, "Llevamos el Gozney XL y horneamos frente a tus invitados. Eliges de todo el men\xFA m\xE1s ensalada C\xE9sar o Spring Mix."), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: '22px 0 0',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px 20px'
    }
  }, [['Por persona', '$' + c.precio], ['Mínimo', c.min + ' personas'], ['Máximo', c.max + ' personas'], ['Anticipo', c.anticipo], ['Anticipación', c.aviso]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 15
    }
  }, v)))))), /*#__PURE__*/React.createElement(FramedPanel, {
    variant: "info"
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 23,
      marginBottom: 14
    }
  }, "Solicitar fecha"), folio ? /*#__PURE__*/React.createElement(StatusNote, {
    tone: "ok",
    title: "Solicitud enviada"
  }, "Folio ", folio, ". Te vamos a contactar por WhatsApp al n\xFAmero que dejaste para cuadrar el men\xFA y el resto de los detalles.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Nombre",
    required: true,
    placeholder: "Tu nombre",
    value: nombre,
    onChange: e => setNombre(e.target.value),
    invalid: attempted && !nombre.trim()
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Tel\xE9fono",
    required: true,
    type: "tel",
    placeholder: "55 1234 5678",
    value: tel,
    onChange: e => setTel(e.target.value),
    invalid: attempted && !telOk,
    hint: attempted && !telOk ? 'Necesitamos 10 dígitos para contactarte por WhatsApp.' : 'Te contactamos por WhatsApp a este número para cuadrar los detalles.',
    style: {
      marginTop: 12
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Personas",
    as: "select",
    value: personas,
    onChange: e => setPersonas(e.target.value),
    options: ['20 personas', '22 personas', '25 personas', '30 personas'],
    style: {
      marginTop: 12
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Fecha del evento",
    required: true,
    placeholder: "dd / mm / aaaa",
    value: fecha,
    onChange: e => setFecha(e.target.value),
    invalid: attempted && !fecha.trim(),
    hint: `Necesitamos ${c.aviso} de anticipación mínima.`,
    style: {
      marginTop: 12
    }
  }), error && /*#__PURE__*/React.createElement(StatusNote, {
    tone: "block",
    title: "Algo fall\xF3",
    style: {
      marginTop: 12
    }
  }, error), /*#__PURE__*/React.createElement(Button, {
    tone: "warm",
    block: true,
    disabled: enviando,
    onClick: solicitar,
    style: {
      marginTop: 18
    }
  }, enviando ? 'Enviando…' : 'Solicitar cotización'))))));
}

/* Tarjeta con el marco de un post de redes: avatar, arroba, imagen cuadrada y
   pie. Sirve para cualquier imagen, asi que las piezas que se diseñen en Canva
   entran aqui igual que las fotos de producto.
   Sin likes ni comentarios: inventar esos numeros seria enseñarle al visitante
   una prueba social que no existe. */
function SocialPost({
  imagen,
  alt,
  pie
}) {
  return /*#__PURE__*/React.createElement("a", {
    className: "social-foto",
    href: MEXTIZZA_SOCIAL.instagram,
    target: "_blank",
    rel: "noopener",
    "aria-label": 'Ver ' + alt + ' en el Instagram de Mextizza',
    style: {
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      border: 'var(--border-frame)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      borderBottom: 'var(--border-frame)',
      color: 'var(--negro-carbon)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '9px 11px'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/social/mextizza-perfil-ig-fb-320.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      width: 24,
      height: 24,
      borderRadius: '50%',
      objectFit: 'cover',
      border: 'var(--border-paper)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 12.5
    }
  }, "mextizzamx"), /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 14,
    style: {
      marginLeft: 'auto',
      opacity: 0.45
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1 / 1',
      overflow: 'hidden',
      background: 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: imagen,
    alt: alt,
    loading: "lazy",
    decoding: "async",
    srcSet: imagen && imagen.slice(-5) === ".webp" ? imagen.slice(0, -5) + "-thumb.webp 220w, " + imagen.slice(0, -5) + "-md.webp 600w, " + imagen + " 1100w" : undefined,
    sizes: "(max-width: 420px) 100vw, (max-width: 860px) 50vw, 25vw",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      padding: '10px 11px 12px',
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 700
    }
  }, "mextizzamx"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, pie)));
}
/* Carrusel horizontal con scroll-snap nativo: el swipe tactil, la rueda con
   shift y las flechas del teclado ya funcionan sin codigo. Solo hacen falta los
   botones, porque en escritorio con raton no hay forma obvia de descubrir que
   esto se desplaza. Los extremos se detectan con IntersectionObserver sobre la
   primera y la ultima tarjeta, no escuchando cada cuadro del scroll. */
function CarruselRedes({
  fotos
}) {
  const pista = React.useRef(null);
  const [enInicio, setEnInicio] = React.useState(true);
  const [enFin, setEnFin] = React.useState(false);
  React.useEffect(() => {
    const el = pista.current;
    if (!el || !el.children.length) return;
    const tarjetas = Array.from(el.children);
    const primera = tarjetas[0],
      ultima = tarjetas[tarjetas.length - 1];
    const io = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (e.target === primera) setEnInicio(e.isIntersecting);
        if (e.target === ultima) setEnFin(e.isIntersecting);
      });
    }, {
      root: el,
      threshold: 0.9
    });
    io.observe(primera);
    io.observe(ultima);
    return () => io.disconnect();
  }, [fotos.length]);
  const mover = dir => {
    const el = pista.current;
    if (!el) return;
    const t = el.firstElementChild;
    const paso = t ? t.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    // El scroll-behavior del CSS no anula un behavior explicito en JS, asi que
    // la preferencia de movimiento reducido se consulta aqui tambien.
    const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir * paso,
      behavior: suave ? "smooth" : "auto"
    });
  };
  const flecha = (dir, desactivada, etiqueta) => /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => mover(dir),
    disabled: desactivada,
    "aria-label": etiqueta,
    className: "social-flecha",
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 38,
      height: 38,
      borderRadius: "50%",
      cursor: desactivada ? "default" : "pointer",
      border: "var(--border-frame)",
      background: "var(--surface-card)",
      color: "var(--negro-carbon)",
      opacity: desactivada ? 0.3 : 1,
      transition: "opacity var(--dur-fast) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: dir < 0 ? "chevronLeft" : "chevronRight",
    size: 18
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: pista,
    className: "social-pista",
    tabIndex: 0,
    role: "region",
    "aria-label": "Fotos de nuestras pizzas, desplazable horizontalmente"
  }, fotos.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.id,
    className: "social-diapo"
  }, /*#__PURE__*/React.createElement(SocialPost, {
    imagen: it.photo,
    alt: it.name,
    pie: it.name + ". " + it.desc
  })))), /*#__PURE__*/React.createElement("div", {
    className: "social-flechas",
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: 10,
      marginTop: 16
    }
  }, flecha(-1, enInicio, "Ver fotos anteriores"), flecha(1, enFin, "Ver mas fotos")));
}
function WebSocial() {
  /* Rejilla de fotos reales que enlaza al perfil, en vez de un feed en vivo.
     Un feed de Instagram exigiria la Graph API (la Basic Display murio en dic
     2024), un token que caduca cada 60 dias y que NO puede vivir en este archivo
     porque se sirve abierto, mas abrir la CSP a dominios de Meta. Con fotos
     propias controlamos que se ve y no hay nada que mantener. */
  const fotos = MEXTIZZA_MENU.flatMap(g => g.items).filter(it => it.photo && it.photo.includes('pizza-'));
  return /*#__PURE__*/React.createElement("section", {
    className: "reveal",
    style: {
      background: 'var(--surface-page)',
      paddingBottom: 76
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: webShell.page
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "En redes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'),
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en WhatsApp",
    style: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: 'none',
      color: 'var(--negro-carbon)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 18
  })), /*#__PURE__*/React.createElement("a", {
    href: MEXTIZZA_SOCIAL.instagram,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en Instagram",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      borderBottom: 'none',
      color: 'var(--negro-carbon)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 18
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 13
    }
  }, "@mextizzamx")), /*#__PURE__*/React.createElement("a", {
    href: MEXTIZZA_SOCIAL.facebook,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en Facebook",
    style: {
      display: 'flex',
      alignItems: 'center',
      borderBottom: 'none',
      color: 'var(--negro-carbon)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "facebook",
    size: 18
  })))), /*#__PURE__*/React.createElement(CarruselRedes, {
    fotos: fotos
  })));
}

// Que renglones del footer son enlaces. Los que no aparecen aqui quedan como texto.
const footerEnlaces = {
  'Pizza a domicilio en Atizapán': '/pizza-a-domicilio-atizapan/',
  'Catering con horno': '/catering-pizza-horno-de-lena/',
  'La pizza del mes': '/pizza-del-mes/',
  'WhatsApp Business': mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'),
  'Sitio web': '/',
  'App Mextizza': '/app'
};
function WebFooter() {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--negro-carbon)',
      paddingTop: 56,
      paddingBottom: 44,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(TapeStripe, {
    position: "top",
    height: 4
  }), /*#__PURE__*/React.createElement("div", {
    className: "web-footer-grid",
    style: {
      ...webShell.page,
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Lockup, {
    variant: "completo",
    tone: "hueso",
    size: 36,
    align: "left",
    base: "../../",
    subtitle: "Pizzer\xEDa",
    tagline: "Horneada como all\xE1, gozada como ac\xE1"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'),
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en WhatsApp",
    className: "footer-icon-link",
    style: {
      display: 'flex',
      color: 'var(--blanco-hueso)',
      opacity: 0.8,
      borderBottom: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 19
  })), /*#__PURE__*/React.createElement("a", {
    href: MEXTIZZA_SOCIAL.instagram,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en Instagram",
    className: "footer-icon-link",
    style: {
      display: 'flex',
      color: 'var(--blanco-hueso)',
      opacity: 0.8,
      borderBottom: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 19
  })), /*#__PURE__*/React.createElement("a", {
    href: MEXTIZZA_SOCIAL.facebook,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en Facebook",
    className: "footer-icon-link",
    style: {
      display: 'flex',
      color: 'var(--blanco-hueso)',
      opacity: 0.8,
      borderBottom: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "facebook",
    size: 19
  })))), [['Pedidos', ['WhatsApp Business', 'Sitio web', 'App Mextizza']], ['Operación', [MEXTIZZA_FACTS.zona, 'Radio de 3 km', 'Sólo entrega, sin salón']], ['Más', ['Pizza a domicilio en Atizapán', 'Catering con horno', 'La pizza del mes']]].map(([t, items]) => /*#__PURE__*/React.createElement("div", {
    key: t
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--dorado-masa)',
      marginBottom: 14
    }
  }, t), items.map(i => footerEnlaces[i] ? /*#__PURE__*/React.createElement("a", _extends({
    key: i,
    href: footerEnlaces[i]
  }, footerEnlaces[i].startsWith('http') ? {
    target: '_blank',
    rel: 'noopener'
  } : {}, {
    className: "footer-icon-link",
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.9,
      color: 'var(--blanco-hueso)',
      opacity: 0.7,
      borderBottom: 'none'
    }
  }), i) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.9,
      color: 'var(--blanco-hueso)',
      opacity: 0.7
    }
  }, i))))));
}
Object.assign(window, {
  WebHeader,
  WebHero,
  WebMenu,
  WebProcess,
  WebCatering,
  WebSocial,
  WebFooter,
  webShell
});
})();

/* ui_kits/DeliveryForm.jsx */
(function () {
const {
  Field,
  RadioGroup,
  StatusNote,
  Badge,
  Icon
} = window.MextizzaDesignSystem_8a35ee;
const PAGOS = ['Efectivo', 'Transferencia', 'Tarjeta'];

/* Delivery form shared by the website drawer and the app cart.
   Two hard gates before an order can be placed:
   1. the address has to fall inside the 3 km radius (ui_kits/delivery-zone.js)
   2. a payment method has to be chosen — nothing is preselected */
/* inicial: datos guardados del cliente (nombre/telefono/calle/colonia) para
   prellenar el formulario en pedidos siguientes. Solo siembra el estado
   inicial, asi que el cliente puede sobrescribir cualquier campo. */
function DeliveryForm({
  compact = false,
  attempted = false,
  onValidChange,
  onDataChange,
  inicial
}) {
  const ini = inicial || {};
  const [nombre, setNombre] = React.useState(ini.nombre || '');
  const [tel, setTel] = React.useState(ini.telefono || '');
  const [calle, setCalle] = React.useState(ini.calle || '');
  const [colonia, setColonia] = React.useState(ini.colonia || '');
  const [horario, setHorario] = React.useState('Lo antes posible (≤40 min)');
  const [pago, setPago] = React.useState(null);
  const [notas, setNotas] = React.useState('');
  const digits = tel.replace(/\D/g, '');
  const telOk = digits.length === 10;
  const zona = colonia ? zonaEvaluar(colonia) : null;
  const zonaOk = !!zona && zona.estado === 'dentro';
  /* Fuera del horario de operacion el checkout se cierra: un pedido que no se
     puede cocinar es peor que ningun pedido. Se reevalua cada minuto para que
     la pantalla no se quede abierta si dan las 11 mientras el cliente escribe. */
  const [ahora, setAhora] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setAhora(new Date()), 60000);
    return () => clearInterval(id);
  }, []);
  const apertura = typeof mextizzaEstaAbierto === "function" ? mextizzaEstaAbierto(ahora) : {
    abierto: true,
    texto: ""
  };
  const valid = !!nombre.trim() && telOk && !!calle.trim() && zonaOk && !!pago && apertura.abierto;
  React.useEffect(() => {
    onValidChange && onValidChange(valid);
  }, [valid]);
  React.useEffect(() => {
    onDataChange && onDataChange({
      nombre,
      telefono: digits,
      calle,
      colonia,
      km: zona ? zona.km : null,
      horario,
      pago,
      notas
    });
  }, [nombre, digits, calle, colonia, horario, pago, notas]);
  const gap = compact ? 12 : 14;
  const tone = zona ? zona.estado === 'dentro' ? 'ok' : zona.estado === 'limite' ? 'warn' : 'block' : 'ok';
  return /*#__PURE__*/React.createElement("div", null, !apertura.abierto && /*#__PURE__*/React.createElement(StatusNote, {
    tone: "block",
    title: "Cocina cerrada",
    style: {
      marginBottom: 14
    }
  }, "Tomamos pedidos ", apertura.texto, ". Dejanos tu pedido por WhatsApp y lo preparamos en cuanto abramos."), /*#__PURE__*/React.createElement(Field, {
    label: "Nombre",
    required: true,
    placeholder: "Tu nombre",
    value: nombre,
    onChange: e => setNombre(e.target.value),
    invalid: attempted && !nombre.trim()
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Tel\xE9fono",
    required: true,
    type: "tel",
    placeholder: "55 1234 5678",
    value: tel,
    onChange: e => setTel(e.target.value),
    invalid: attempted && !telOk,
    hint: attempted && !telOk ? 'Necesitamos 10 dígitos para confirmarte por WhatsApp.' : 'Te confirmamos el pedido por WhatsApp a este número.',
    style: {
      marginTop: gap
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Calle y n\xFAmero",
    required: true,
    placeholder: "Av. Lomas Lindas 120, int. 4",
    value: calle,
    onChange: e => setCalle(e.target.value),
    invalid: attempted && !calle.trim(),
    style: {
      marginTop: gap
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Colonia",
    as: "select",
    required: true,
    value: colonia,
    onChange: e => setColonia(e.target.value),
    invalid: attempted && !zonaOk,
    options: ['', ...MEXTIZZA_ZONE.colonias.map(c => c.name)],
    style: {
      marginTop: gap
    }
  }), zona ? /*#__PURE__*/React.createElement(StatusNote, {
    tone: tone,
    title: zona.titulo,
    style: {
      marginTop: 12
    }
  }, zona.detalle) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginTop: 12,
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 15
  }), /*#__PURE__*/React.createElement("span", null, "Repartimos ", MEXTIZZA_ZONE.radioKm, " km a la redonda desde ", MEXTIZZA_ZONE.centro.nombre, ".")), /*#__PURE__*/React.createElement(Field, {
    label: "Horario",
    as: "select",
    value: horario,
    onChange: e => setHorario(e.target.value),
    options: ['Lo antes posible (≤40 min)', 'Programar para hoy', 'Programar para mañana'],
    style: {
      marginTop: gap
    }
  }), /*#__PURE__*/React.createElement("div", {
    "data-invalido": attempted && !pago ? 'true' : undefined
  }, /*#__PURE__*/React.createElement(RadioGroup, {
    label: "Forma de pago",
    required: true,
    options: PAGOS,
    value: pago,
    onChange: setPago,
    columns: compact ? 1 : 3,
    invalid: attempted && !pago,
    hint: attempted && !pago ? 'Elige una forma de pago para continuar.' : 'Se cobra al entregar. El envío ya está incluido en el precio.',
    style: {
      marginTop: gap + 4
    }
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Notas",
    as: "textarea",
    rows: 2,
    placeholder: "Sin cebolla, timbre 2",
    value: notas,
    onChange: e => setNotas(e.target.value),
    style: {
      marginTop: gap
    }
  }));
}
Object.assign(window, {
  DeliveryForm,
  PAGOS
});
})();

/* ui_kits/web/CartDrawer.jsx */
(function () {
/* El boton de confirmar vive al fondo; los campos que marca la validacion
   quedan arriba, fuera de vista. Sin mover la pantalla, presionarlo no cambia
   nada donde el usuario esta mirando y parece que no responde: nos paso a los
   dos al probarlo. Lleva la vista al primer campo que falta.

   Se llama desde un efecto, no desde el manejador del clic: ahi los campos
   marcados todavia no existen en el DOM y el selector no encontraba nada. */
function llevarAlPrimerFaltante() {
  const el = document.querySelector('[aria-invalid="true"], [data-invalido="true"]');
  if (!el) return;
  // Instantaneo a proposito. Con behavior 'smooth' el contenedor del carrito
  // simplemente no se movia, y aqui importa mas que el aviso se vea que la
  // suavidad del movimiento.
  el.scrollIntoView({
    block: 'center'
  });
}
const {
  Wordmark,
  TapeStripe,
  FramedPanel,
  Button,
  Badge,
  Field,
  QtyStepper,
  MenuItem,
  Icon,
  StatusNote
} = window.MextizzaDesignSystem_8a35ee;

/* Mismos estados que la app (Code.gs FLUJO) mapeados a los 4 pasos que ve el
   cliente. "lista" no tiene paso propio: sigue leyendose como en el horno
   hasta que el reparto sale. */
const WEB_ESTADO_A_PASO = {
  recibida: 0,
  confirmada: 0,
  horno: 1,
  lista: 1,
  camino: 2,
  entregada: 3
};
function SeguimientoPedido({
  folio
}) {
  const [orden, setOrden] = React.useState(null);
  const [sinRed, setSinRed] = React.useState(false);
  React.useEffect(() => {
    if (!folio || typeof mextizzaEstadoOrden !== "function") return;
    let vivo = true;
    const leer = async () => {
      try {
        const r = await mextizzaEstadoOrden(folio);
        if (vivo) {
          setOrden(r.orden);
          setSinRed(false);
        }
      } catch (e) {
        if (vivo) setSinRed(true);
      }
    };
    leer();
    const id = setInterval(leer, 30000);
    return () => {
      vivo = false;
      clearInterval(id);
    };
  }, [folio]);
  const cancelada = orden && orden.estado === "cancelada";
  const paso = orden ? WEB_ESTADO_A_PASO[orden.estado] != null ? WEB_ESTADO_A_PASO[orden.estado] : 0 : -1;
  const pasos = [["Confirmado", "Recibimos tu pedido"], ["En el horno", "Horno de piedra"], ["En camino", "Va para alla"], ["Entregado", ""]];
  const titulo = orden ? {
    recibida: "Pedido recibido",
    confirmada: "Confirmado",
    horno: "En el horno",
    lista: "Lista para salir",
    camino: "En camino",
    entregada: "Entregado",
    cancelada: "Cancelado"
  }[orden.estado] || "En proceso" : "Consultando...";
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 12,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22
    }
  }, titulo), /*#__PURE__*/React.createElement(Badge, {
    tone: cancelada ? "rosa" : "dark"
  }, "Pedido ", folio)), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12.5,
      color: "var(--text-muted)",
      marginTop: 6
    }
  }, cancelada ? orden.motivo_cancelacion || "El pedido fue cancelado." : sinRed ? "Sin conexion para actualizar el estado." : "Se actualiza solo. Te confirmamos por WhatsApp."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, pasos.map(([t, d], i) => {
    const hecho = !cancelada && paso >= i;
    return /*#__PURE__*/React.createElement("div", {
      key: t,
      style: {
        display: "flex",
        gap: 12,
        paddingBottom: i < pasos.length - 1 ? 16 : 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        flex: "none",
        borderRadius: "50%",
        display: "grid",
        placeItems: "center",
        background: hecho ? "var(--rosa-mexicano)" : "transparent",
        border: hecho ? "none" : "2px solid var(--negro-12)"
      }
    }, hecho && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 12,
      color: "var(--blanco)"
    })), i < pasos.length - 1 && /*#__PURE__*/React.createElement("span", {
      style: {
        width: 2,
        flex: 1,
        minHeight: 18,
        background: hecho ? "var(--rosa-mexicano)" : "var(--negro-12)",
        marginTop: 3
      }
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-body)",
        fontWeight: 700,
        fontSize: 13.5,
        color: hecho ? "var(--text-body)" : "var(--text-muted)"
      }
    }, t), d && /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 12,
        color: "var(--text-muted)",
        marginTop: 1
      }
    }, d)));
  })), orden && !cancelada && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 14,
      borderTop: "var(--border-paper)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "md",
    block: true,
    icon: "whatsapp",
    onClick: () => window.open(mextizzaWhatsappLink("Hola, necesito ayuda con mi pedido " + folio + "."), "_blank", "noopener")
  }, "Escr\xEDbenos por WhatsApp"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 11.5,
      color: "var(--text-muted)",
      textAlign: "center",
      marginTop: 7
    }
  }, "\xBFAlg\xFAn cambio o problema? M\xE1ndanos mensaje con tu folio.")));
}
function CartDrawer({
  open,
  lines,
  onClose,
  onQty,
  step,
  setStep,
  canal = 'Web',
  folioActivo,
  onOrdenCreada,
  onFolioEncontrado
}) {
  const [ready, setReady] = React.useState(false);
  const [attempted, setAttempted] = React.useState(false);
  // Un contador, no un booleano: al segundo intento fallido el valor no
  // cambiaria y el efecto no volveria a correr.
  const [intentos, setIntentos] = React.useState(0);
  React.useEffect(() => {
    if (!intentos) return;
    // Un respiro antes de buscar: los campos recien llenados tardan un render
    // en dejar de estar marcados, y sin esperar la vista salta al primero de
    // esos —que ya se veia— en vez de al que de verdad falta.
    const t = setTimeout(llevarAlPrimerFaltante, 60);
    return () => clearTimeout(t);
  }, [intentos]);
  const [entrega, setEntrega] = React.useState(null);
  const [enviando, setEnviando] = React.useState(false);
  const [error, setError] = React.useState(null);
  // El folio vive en el padre para que sobreviva a cerrar el carrito y a recargar.
  const folio = folioActivo;
  const [telBusca, setTelBusca] = React.useState("");
  const [buscando, setBuscando] = React.useState(false);
  const [errorBusca, setErrorBusca] = React.useState(null);
  const buscarPorTelefono = async () => {
    const digits = telBusca.replace(/[^0-9]/g, "");
    if (digits.length !== 10) return setErrorBusca("Escribe los 10 digitos de tu telefono.");
    setErrorBusca(null);
    setBuscando(true);
    try {
      const r = await mextizzaEstadoPorTelefono(digits);
      if (!r.orden) {
        setErrorBusca("No encontramos pedidos con ese numero.");
        return;
      }
      onFolioEncontrado && onFolioEncontrado(r.orden.folio);
      setStep("done");
    } catch (e) {
      setErrorBusca("No se pudo consultar. Revisa tu conexion.");
    } finally {
      setBuscando(false);
    }
  };
  const subtotal = lines.reduce((s, l) => s + (l.price + (l.addonTotal || 0)) * l.qty, 0);
  const confirmar = async () => {
    if (step === 'cart') return setStep('checkout');
    if (!ready) {
      setAttempted(true);
      setIntentos(n => n + 1);
      return;
    }
    setError(null);
    setEnviando(true);
    try {
      const r = await mextizzaCrearOrden({
        canal,
        lines,
        entrega
      });
      // El padre guarda el folio y vacia el carrito: antes las lineas se quedaban
      // ahi despues de enviar y el siguiente pedido arrancaba con el anterior dentro.
      onOrdenCreada && onOrdenCreada(r.folio);
      setStep('done');
    } catch (err) {
      setError('No se pudo enviar el pedido. Intenta de nuevo, o escríbenos por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(26,26,26,.42)',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: 'opacity var(--dur-base) var(--ease-standard)',
      zIndex: 40
    }
  }), /*#__PURE__*/React.createElement("aside", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Tu pedido",
    "aria-hidden": !open,
    style: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      width: 400,
      maxWidth: '92vw',
      background: 'var(--surface-card)',
      zIndex: 41,
      display: 'flex',
      flexDirection: 'column',
      boxShadow: 'var(--shadow-raised)',
      transform: open ? 'none' : 'translateX(100%)',
      transition: 'transform var(--dur-base) var(--ease-standard)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      padding: '22px 24px',
      position: 'relative',
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement(TapeStripe, {
    position: "bottom",
    height: 4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 23,
      color: 'var(--negro-carbon)'
    }
  }, step === 'cart' ? 'Tu pedido' : step === 'checkout' ? 'Entrega' : step === 'buscar' ? 'Seguir mi pedido' : 'Confirmado'), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--negro-carbon)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 20
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 24px'
    }
  }, step === 'cart' && (lines.length ? lines.map((l, i) => /*#__PURE__*/React.createElement(MenuItem, {
    key: l.key || l.id,
    name: l.name,
    description: l.addonNames && l.addonNames.length ? '+ ' + l.addonNames.join(', ') : l.desc,
    price: (l.price + (l.addonTotal || 0)) * l.qty,
    divider: i < lines.length - 1,
    action: /*#__PURE__*/React.createElement(QtyStepper, {
      value: l.qty,
      min: 0,
      onChange: n => onQty(l.key || l.id, n)
    })
  })) : /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-muted)',
      paddingTop: 8
    }
  }, "Tu pedido est\xE1 vac\xEDo. Agrega algo del men\xFA.")), step === 'checkout' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DeliveryForm, {
    compact: true,
    attempted: attempted,
    onValidChange: setReady,
    onDataChange: setEntrega
  }), error && /*#__PURE__*/React.createElement(StatusNote, {
    tone: "block",
    title: "Ups",
    style: {
      marginTop: 12
    }
  }, error)), step === 'buscar' && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 13,
      lineHeight: 1.6,
      color: "var(--text-muted)"
    }
  }, "Escribe el telefono con el que hiciste el pedido y te mostramos como va."), /*#__PURE__*/React.createElement(Field, {
    label: "Telefono",
    required: true,
    type: "tel",
    placeholder: "55 1234 5678",
    value: telBusca,
    onChange: e => setTelBusca(e.target.value),
    style: {
      marginTop: 14
    }
  }), errorBusca && /*#__PURE__*/React.createElement(StatusNote, {
    tone: "block",
    title: "Ups",
    style: {
      marginTop: 12
    }
  }, errorBusca), /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    block: true,
    disabled: buscando,
    style: {
      marginTop: 16
    },
    onClick: buscarPorTelefono
  }, buscando ? "Buscando..." : "Buscar mi pedido")), step === 'done' && /*#__PURE__*/React.createElement(FramedPanel, {
    variant: "object",
    style: {
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(SeguimientoPedido, {
    folio: folio
  }))), step !== 'done' && step !== 'buscar' && lines.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: 'var(--border-frame)',
      padding: '18px 24px',
      background: 'var(--surface-page)'
    }
  }, [['Subtotal', subtotal]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginBottom: 6
    }
  }, /*#__PURE__*/React.createElement("span", null, k), /*#__PURE__*/React.createElement("span", null, "$", v))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 8,
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 11,
      letterSpacing: 1,
      textTransform: 'uppercase'
    }
  }, "Total ", /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: 'none',
      letterSpacing: 0,
      color: 'var(--text-muted)'
    }
  }, "\xB7 env\xEDo incluido")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: 22,
      color: 'var(--text-price)'
    }
  }, "$", subtotal)), /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    block: true,
    iconAfter: "chevronRight",
    disabled: enviando,
    onClick: confirmar
  }, step === 'cart' ? 'Continuar' : enviando ? 'Enviando…' : 'Confirmar pedido'), step === 'checkout' && !ready && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: 9
    }
  }, "Faltan datos: direcci\xF3n dentro del radio y forma de pago."))));
}
Object.assign(window, {
  CartDrawer
});
})();

/* ui_kits/web/AddonsDialog.jsx */
(function () {
const {
  TapeStripe,
  FramedPanel,
  Button,
  Badge,
  QtyStepper,
  Icon
} = window.MextizzaDesignSystem_8a35ee;

/* Complementos picker — opens when a pizza is added from the menu. */
function AddonsDialog({
  item,
  onClose,
  onAdd
}) {
  const [picks, setPicks] = React.useState({});
  const [qty, setQty] = React.useState(1);
  React.useEffect(() => {
    setPicks({});
    setQty(1);
  }, [item && item.id]);
  React.useEffect(() => {
    if (!item) return;
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);
  if (!item) return null;
  const bump = (id, n) => setPicks(p => {
    const next = {
      ...p
    };
    if (n <= 0) delete next[id];else next[id] = n;
    return next;
  });
  const flat = MEXTIZZA_ADDONS.flatMap(g => g.items);
  const chosen = flat.filter(i => picks[i.id]);
  const addonTotal = chosen.reduce((s, i) => s + i.price * picks[i.id], 0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      background: 'rgba(26,26,26,.42)',
      zIndex: 50
    }
  }), /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    "aria-label": 'Complementos para ' + item.name,
    style: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      zIndex: 51,
      width: 620,
      maxWidth: '94vw',
      maxHeight: '86vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-raised)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-page)',
      padding: '22px 26px',
      position: 'relative',
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement(TapeStripe, {
    position: "bottom",
    height: 4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)'
    }
  }, "Complementos \xB7 opcional"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      marginTop: 5
    }
  }, item.name)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      background: 'transparent',
      border: 'none',
      color: 'var(--negro-carbon)',
      cursor: 'pointer',
      minWidth: 44,
      minHeight: 44
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "close",
    size: 20
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px 26px'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13.5,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      margin: '0 0 18px'
    }
  }, "Los quesos, carnes y verduras entran al horno con la pizza. El \xFAltimo toque va al salir."), /*#__PURE__*/React.createElement("div", {
    className: "web-addons-grid",
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '0 30px'
    }
  }, MEXTIZZA_ADDONS.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.id,
    style: {
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 9.5,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)',
      paddingBottom: 4
    }
  }, g.title), g.items.map((it, j) => {
    const n = picks[it.id] || 0;
    return /*#__PURE__*/React.createElement("div", {
      key: it.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        borderBottom: j < g.items.length - 1 ? 'var(--border-dashed)' : 'none'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => bump(it.id, n ? 0 : 1),
      "aria-pressed": n > 0,
      "aria-label": n ? 'Quitar ' + it.name : 'Agregar ' + it.name,
      style: {
        flex: 1,
        minHeight: 46,
        padding: '6px 0',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 11
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 22,
        height: 22,
        flex: 'none',
        borderRadius: 'var(--radius-sm)',
        background: n ? 'var(--rosa-mexicano)' : 'transparent',
        border: n ? 'none' : '2px solid var(--negro-12)',
        display: 'grid',
        placeItems: 'center'
      }
    }, n > 0 && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 13,
      color: "var(--blanco)"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontFamily: 'var(--font-body)',
        fontWeight: n ? 700 : 500,
        fontSize: 13.5,
        color: 'var(--text-body)'
      }
    }, it.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 13,
        color: 'var(--text-price)'
      }
    }, "+$", it.price)), n > 0 && /*#__PURE__*/React.createElement(QtyStepper, {
      value: n,
      min: 0,
      onChange: v => bump(it.id, v),
      size: 32
    }));
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: 'var(--border-frame)',
      background: 'var(--surface-page)',
      padding: '16px 26px',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(QtyStepper, {
    value: qty,
    onChange: setQty,
    size: 44
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, chosen.length ? chosen.length + (chosen.length === 1 ? ' complemento · +$' : ' complementos · +$') + addonTotal : 'Sin complementos'), /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    onClick: () => onAdd(item, qty, {
      addonTotal,
      addonNames: chosen.map(c => c.name + (picks[c.id] > 1 ? ' x' + picks[c.id] : ''))
    })
  }, `Agregar $${(item.price + addonTotal) * qty}`))));
}
Object.assign(window, {
  AddonsDialog
});
})();

/* ui_kits/web/Site.jsx */
(function () {
/* Componente raiz del sitio. Vivia como <script type="text/babel"> dentro de
   index.html; se movio a su propio archivo para que scripts/build-js.js lo
   compile junto con el resto y el navegador ya no necesite un compilador. */
function Site() {
  const modoCaptura = new URLSearchParams(location.search).get('canal') === 'whatsapp';
  const canal = modoCaptura ? 'WhatsApp' : 'Web';
  const [lines, setLines] = React.useState([]);
  // El folio del ultimo pedido se guarda en este navegador para que el cliente
  // pueda seguir su pizza aunque cierre la pestaña.
  const FOLIO_KEY = 'mextizza.web.folio';
  const [folio, setFolio] = React.useState(() => {
    try {
      return localStorage.getItem(FOLIO_KEY) || null;
    } catch (e) {
      return null;
    }
  });
  React.useEffect(() => {
    try {
      folio ? localStorage.setItem(FOLIO_KEY, folio) : localStorage.removeItem(FOLIO_KEY);
    } catch (e) {}
  }, [folio]);
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState('cart');
  const [added, setAdded] = React.useState(null);
  const [view, setView] = React.useState('home');
  const [custom, setCustom] = React.useState(null);
  const add = (it, q = 1, extra = {}) => {
    const key = it.id + (extra.addonNames && extra.addonNames.length ? ':' + extra.addonNames.join('|') : '');
    setLines(ls => {
      const e = ls.find(l => l.key === key);
      return e ? ls.map(l => l.key === key ? {
        ...l,
        qty: l.qty + q
      } : l) : [...ls, {
        ...it,
        ...extra,
        key,
        qty: q
      }];
    });
    setAdded(it.id);
    setTimeout(() => setAdded(null), 900);
    setStep('cart');
    setCustom(null);
  };
  const qty = (key, n) => setLines(ls => n <= 0 ? ls.filter(l => l.key !== key) : ls.map(l => l.key === key ? {
    ...l,
    qty: n
  } : l));
  const nav = k => {
    setView(k);
    const el = document.getElementById(k);
    window.scrollTo({
      top: el ? el.offsetTop - 90 : 0,
      behavior: 'smooth'
    });
  };
  const count = lines.reduce((s, l) => s + l.qty, 0);
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, modoCaptura && /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#1A1A1A',
      color: '#F5F0E8',
      textAlign: 'center',
      padding: '8px 12px',
      fontFamily: 'var(--font-label)',
      fontSize: 11,
      letterSpacing: 1,
      textTransform: 'uppercase'
    }
  }, "Modo captura \xB7 WhatsApp \u2014 este pedido se registra como canal WhatsApp"), /*#__PURE__*/React.createElement(WebHeader, {
    count: count,
    view: view,
    onNav: nav,
    onCart: () => {
      setOpen(true);
      setStep('cart');
    },
    folio: folio,
    onSeguir: () => {
      setOpen(true);
      setStep(folio ? 'done' : 'buscar');
    }
  }), /*#__PURE__*/React.createElement(WebHero, {
    onNav: nav
  }), /*#__PURE__*/React.createElement(WebMenu, {
    onAdd: add,
    onCustomize: setCustom,
    added: added
  }), /*#__PURE__*/React.createElement(WebProcess, null), /*#__PURE__*/React.createElement(WebCatering, null), /*#__PURE__*/React.createElement(WebSocial, null), /*#__PURE__*/React.createElement(WebFooter, null), /*#__PURE__*/React.createElement(AddonsDialog, {
    item: custom,
    onClose: () => setCustom(null),
    onAdd: add
  }), /*#__PURE__*/React.createElement(CartDrawer, {
    open: open,
    lines: lines,
    step: step,
    setStep: setStep,
    onQty: qty,
    onClose: () => setOpen(false),
    canal: canal,
    folioActivo: folio,
    onOrdenCreada: f => {
      setFolio(f);
      setLines([]);
    },
    onFolioEncontrado: setFolio
  }));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(Site, null));
})();