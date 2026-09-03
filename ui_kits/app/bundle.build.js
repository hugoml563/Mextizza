/* Generado por scripts/build-js.js. No editar a mano:
   los cambios van en los .jsx de origen. */

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

/* ui_kits/app/AppScreens.jsx */
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
const DS = window.MextizzaDesignSystem_8a35ee;
const {
  Wordmark,
  TapeStripe,
  Stamp,
  DotRow,
  FramedPanel,
  Button,
  Badge,
  Field,
  QtyStepper,
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

/* Phone frame — 390x844, the app's design viewport. */
function Phone({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "app-phone-frame",
    style: {
      width: 390,
      height: 844,
      background: 'var(--surface-page)',
      borderRadius: 'var(--radius-lg)',
      border: 'var(--border-frame)',
      overflow: 'hidden',
      position: 'relative',
      boxShadow: 'var(--shadow-raised)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, children);
}
function StatusBar({
  dark
}) {
  const c = dark ? 'var(--blanco-hueso)' : 'var(--negro-carbon)';
  return /*#__PURE__*/React.createElement("div", {
    className: "app-status-bar",
    style: {
      height: 34,
      flex: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      fontWeight: 600,
      color: c
    }
  }, /*#__PURE__*/React.createElement("span", null, "19:40"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 2
    }
  }, [5, 8, 11].map(h => /*#__PURE__*/React.createElement("span", {
    key: h,
    style: {
      width: 3,
      height: h,
      background: c,
      borderRadius: 1
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 9,
      border: `1.5px solid ${c}`,
      borderRadius: 2,
      padding: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      width: '70%',
      height: '100%',
      background: c,
      borderRadius: 1
    }
  }))));
}
function TabBar({
  tab,
  onTab,
  count
}) {
  const tabs = [['menu', 'bag', 'Menú'], ['pedido', 'cart', 'Pedido'], ['seguir', 'clock', 'Seguir'], ['perfil', 'user', 'Perfil']];
  return /*#__PURE__*/React.createElement("nav", {
    style: {
      flex: 'none',
      background: 'var(--surface-card)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      position: 'relative',
      paddingBottom: 8,
      borderTop: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement(TapeStripe, {
    position: "top",
    height: 3
  }), tabs.map(([k, ic, l]) => {
    const on = tab === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      onClick: () => onTab(k),
      style: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '14px 0 6px',
        display: 'grid',
        justifyItems: 'center',
        gap: 5,
        position: 'relative',
        color: on ? 'var(--rosa-mexicano-texto)' : 'var(--gris-texto)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: ic,
      size: 22
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-label)',
        fontSize: 9,
        letterSpacing: 0.5,
        textTransform: 'uppercase'
      }
    }, l), k === 'pedido' && count > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: 8,
        right: 26,
        minWidth: 16,
        height: 16,
        padding: '0 4px',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--rosa-mexicano)',
        color: 'var(--blanco)',
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 10,
        display: 'grid',
        placeItems: 'center'
      }
    }, count));
  }));
}

/* ---------- Screen 1: login / welcome ---------- */
function AppWelcome({
  onEnter
}) {
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement(TapeStripe, {
    position: "top",
    height: 4
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 28px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "completo",
    size: 50,
    base: "../../",
    subtitle: "Pizzer\xEDa",
    tagline: "Horneada como all\xE1, gozada como ac\xE1"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginTop: 30
    }
  }, MEXTIZZA_FACTS.estilo, ". Entregamos en Lomas Lindas y colonias vecinas."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'),
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en WhatsApp",
    style: {
      display: 'flex',
      color: 'var(--text-muted)',
      borderBottom: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "whatsapp",
    size: 20
  })), /*#__PURE__*/React.createElement("a", {
    href: MEXTIZZA_SOCIAL.instagram,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en Instagram",
    style: {
      display: 'flex',
      color: 'var(--text-muted)',
      borderBottom: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 20
  })), /*#__PURE__*/React.createElement("a", {
    href: MEXTIZZA_SOCIAL.facebook,
    target: "_blank",
    rel: "noopener",
    "aria-label": "Mextizza en Facebook",
    style: {
      display: 'flex',
      color: 'var(--text-muted)',
      borderBottom: 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "facebook",
    size: 20
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 24px 28px',
      display: 'grid',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    block: true,
    onClick: onEnter
  }, "Ver el men\xFA"), /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "lg",
    block: true,
    icon: "whatsapp",
    onClick: () => window.open(mextizzaWhatsappLink('Hola, quiero hacer un pedido en Mextizza.'), '_blank', 'noopener')
  }, "Pedir por WhatsApp"))));
}

/* ---------- Screen 2: menu ---------- */
function AppMenu({
  onAdd,
  onOpen,
  tab,
  onTab,
  count,
  added
}) {
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      background: 'var(--surface-page)',
      position: 'relative',
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement(Lockup, {
    variant: "pala",
    size: 26,
    align: "left",
    base: "../../"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginTop: 12,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "pin",
    size: 14
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12
    }
  }, "Lomas Lindas \xB7 llega en ~40 min"))), /*#__PURE__*/React.createElement(TapeStripe, {
    position: "bottom",
    height: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '18px 20px 24px',
      background: 'var(--surface-card)'
    }
  }, MEXTIZZA_MENU.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.cat,
    style: {
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)',
      marginBottom: 10
    }
  }, g.title), g.items.map((it, j) => /*#__PURE__*/React.createElement(MenuItem, {
    key: it.id,
    name: it.name,
    description: it.desc,
    price: it.price,
    photo: it.photo,
    photoSize: 58,
    divider: j < g.items.length - 1,
    onClick: () => onOpen(it),
    badge: it.flag ? /*#__PURE__*/React.createElement(Badge, {
      tone: it.flag === 'Del mes' ? 'dorado' : 'rosa'
    }, it.flag) : null,
    action: /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      tone: added === it.id ? 'dark' : 'outline'
      /* stopPropagation: MenuItem puts the row's onClick on the same
         wrapper that holds this button, so without it one tap on "+"
         both added the item AND opened the detail screen — where the
         customer added it a second time. */,
      onClick: e => {
        e.stopPropagation();
        onAdd(it);
      }
    }, added === it.id ? '✓' : '+')
  }))))), /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    onTab: onTab,
    count: count
  }));
}

/* ---------- Screen 3: product detail ---------- */
function AppDetail({
  item,
  onBack,
  onAdd,
  onCustomize
}) {
  const [q, setQ] = React.useState(1);
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      height: 300,
      background: 'var(--surface-sunken)',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }
  }, item.photo && /*#__PURE__*/React.createElement("img", {
    src: item.photo,
    alt: item.name,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0
    }
  }), item.photo && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 0 55% 0',
      background: 'linear-gradient(rgba(26,26,26,.45),transparent)',
      zIndex: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement(StatusBar, {
    dark: !!item.photo
  })), /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    "aria-label": "Volver",
    style: {
      position: 'absolute',
      top: 44,
      left: 16,
      zIndex: 3,
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-card)',
      border: 'var(--border-frame)',
      color: 'var(--negro-carbon)',
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      position: 'relative',
      zIndex: 2
    }
  }, !item.photo && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, "Fotograf\xEDa pendiente")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      right: 16,
      bottom: -22,
      zIndex: 3
    }
  }, /*#__PURE__*/React.createElement(Stamp, {
    lines: ['Fermento', '48h'],
    size: 92,
    style: {
      background: 'var(--surface-page)',
      borderRadius: '50%'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '30px 20px 20px',
      background: 'var(--surface-card)'
    }
  }, item.flag && /*#__PURE__*/React.createElement(Badge, {
    tone: item.flag === 'Del mes' ? 'dorado' : 'rosa'
  }, item.flag), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 30,
      marginTop: 12,
      lineHeight: 1.15
    }
  }, item.name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      lineHeight: 1.6,
      color: 'var(--text-muted)',
      marginTop: 8
    }
  }, item.desc), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: 26,
      color: 'var(--text-price)',
      marginTop: 16
    }
  }, "$", item.price), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      marginTop: 18,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "quiet"
  }, "Horno de piedra"), /*#__PURE__*/React.createElement(Badge, {
    tone: "quiet"
  }, "Masa de 48h"), /*#__PURE__*/React.createElement(Badge, {
    tone: "quiet"
  }, "Horneada al pedido")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onCustomize && onCustomize(item),
    style: {
      width: '100%',
      marginTop: 22,
      textAlign: 'left',
      cursor: 'pointer',
      background: 'var(--surface-accent-soft)',
      border: '2px solid var(--rosa-mexicano)',
      borderRadius: 'var(--radius-md)',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--text-body)'
    }
  }, "Complementos"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      marginTop: 3
    }
  }, "\xBFM\xE1s queso? \xBFM\xE1s peperoni?")), /*#__PURE__*/React.createElement(Icon, {
    name: "chevronRight",
    size: 20,
    color: "var(--rosa-mexicano)"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Notas para la cocina",
    as: "textarea",
    rows: 2,
    placeholder: "Sin cebolla, orilla bien dorada",
    style: {
      marginTop: 18
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      borderTop: 'var(--border-paper)',
      background: 'var(--surface-page)',
      padding: '16px 20px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(QtyStepper, {
    value: q,
    onChange: setQ,
    size: 44
  }), /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    block: true,
    onClick: () => onAdd(item, q)
  }, `Agregar $${item.price * q}`)));
}

/* ---------- Screen 4: add-ons / complementos ---------- */
function AppAddons({
  item,
  onBack,
  onAdd
}) {
  const [picks, setPicks] = React.useState({});
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
  const total = item.price + addonTotal;
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      background: 'var(--surface-page)',
      position: 'relative',
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '2px 20px 16px',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onBack,
    "aria-label": "Volver",
    style: {
      width: 44,
      height: 44,
      flex: 'none',
      marginTop: 4,
      borderRadius: 'var(--radius-sm)',
      background: 'transparent',
      border: 'var(--border-frame)',
      color: 'var(--negro-carbon)',
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevronLeft",
    size: 18
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 26,
      lineHeight: 1.15
    }
  }, "Complementos"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, "Sobre tu ", item.name, " \xB7 opcional"))), /*#__PURE__*/React.createElement(TapeStripe, {
    position: "bottom",
    height: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px 20px 20px',
      background: 'var(--surface-card)'
    }
  }, MEXTIZZA_ADDONS.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.id,
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)'
    }
  }, g.title), g.note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 3
    }
  }, g.note), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, g.items.map((it, j) => {
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
        minHeight: 48,
        padding: '8px 0',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 24,
        height: 24,
        flex: 'none',
        borderRadius: 'var(--radius-sm)',
        background: n ? 'var(--rosa-mexicano)' : 'transparent',
        border: n ? 'none' : '2px solid var(--negro-12)',
        display: 'grid',
        placeItems: 'center'
      }
    }, n > 0 && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 14,
      color: "var(--blanco)"
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontFamily: 'var(--font-body)',
        fontWeight: n ? 700 : 500,
        fontSize: 14,
        color: 'var(--text-body)'
      }
    }, it.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: 700,
        fontSize: 13.5,
        color: 'var(--text-price)',
        minWidth: 42,
        textAlign: 'right'
      }
    }, "+$", it.price)), n > 0 && /*#__PURE__*/React.createElement(QtyStepper, {
      value: n,
      min: 0,
      onChange: v => bump(it.id, v),
      size: 44
    }));
  })))), /*#__PURE__*/React.createElement(FramedPanel, {
    variant: "paper"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "C\xF3mo se cocina"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, "Los quesos, carnes y verduras entran al horno con la pizza. El \xFAltimo toque se agrega al salir, para que no se queme."))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      borderTop: 'var(--border-paper)',
      background: 'var(--surface-page)',
      padding: '14px 20px 22px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, chosen.length ? chosen.length + (chosen.length === 1 ? ' complemento' : ' complementos') + ' · +$' + addonTotal : 'Sin complementos'), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: 20,
      color: 'var(--text-price)'
    }
  }, "$", total)), /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    block: true,
    onClick: () => onAdd(item, 1, {
      addonTotal,
      addonNames: chosen.map(c => c.name + (picks[c.id] > 1 ? ' x' + picks[c.id] : ''))
    })
  }, "Agregar al pedido")));
}

/* ---------- Screen 5: cart / checkout ---------- */
function AppCart({
  lines,
  onQty,
  onConfirm,
  tab,
  onTab,
  count,
  inicialCliente
}) {
  const subtotal = lines.reduce((s, l) => s + (l.price + (l.addonTotal || 0)) * l.qty, 0);
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
  const confirmar = async () => {
    if (!ready) {
      setAttempted(true);
      setIntentos(n => n + 1);
      return;
    }
    setError(null);
    setEnviando(true);
    try {
      const {
        folio
      } = await mextizzaCrearOrden({
        canal: 'App',
        lines,
        entrega
      });
      // entrega viaja de vuelta para que la app guarde los datos del cliente
      // y prellene el formulario en el siguiente pedido.
      onConfirm(folio, entrega);
    } catch (err) {
      setError('No se pudo enviar el pedido. Intenta de nuevo, o escríbenos por WhatsApp.');
    } finally {
      setEnviando(false);
    }
  };
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      background: 'var(--surface-page)',
      position: 'relative',
      paddingBottom: 16,
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 27,
      padding: '4px 20px 0'
    }
  }, "Tu pedido"), /*#__PURE__*/React.createElement(TapeStripe, {
    position: "bottom",
    height: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '14px 20px',
      background: 'var(--surface-card)'
    }
  }, lines.length ? lines.map((l, i) => /*#__PURE__*/React.createElement(MenuItem, {
    key: l.key || l.id,
    name: l.name,
    description: l.addonNames && l.addonNames.length ? '+ ' + l.addonNames.join(', ') : l.desc,
    price: (l.price + (l.addonTotal || 0)) * l.qty,
    divider: i < lines.length - 1,
    action: /*#__PURE__*/React.createElement(QtyStepper, {
      value: l.qty,
      min: 0,
      onChange: n => onQty(l.key || l.id, n),
      size: 44
    })
  })) : /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 14,
      color: 'var(--text-muted)',
      paddingTop: 8
    }
  }, "Tu pedido est\xE1 vac\xEDo."), lines.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 20,
      borderTop: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)',
      marginBottom: 12
    }
  }, "Entrega y pago"), /*#__PURE__*/React.createElement(DeliveryForm, {
    compact: true,
    attempted: attempted,
    inicial: inicialCliente,
    onValidChange: setReady,
    onDataChange: setEntrega
  }), error && /*#__PURE__*/React.createElement(StatusNote, {
    tone: "block",
    title: "Ups",
    style: {
      marginTop: 12
    }
  }, error))), lines.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      borderTop: 'var(--border-paper)',
      background: 'var(--surface-page)',
      padding: '16px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, "Env\xEDo incluido en el precio"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: 20,
      color: 'var(--text-price)'
    }
  }, "$", subtotal)), /*#__PURE__*/React.createElement(Button, {
    tone: "primary",
    size: "lg",
    block: true,
    iconAfter: "chevronRight",
    disabled: enviando,
    onClick: confirmar
  }, enviando ? 'Enviando…' : `Confirmar · $${subtotal}`), !ready && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11,
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: 8
    }
  }, "Faltan datos: direcci\xF3n dentro del radio y forma de pago.")), /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    onTab: onTab,
    count: count
  }));
}

/* ---------- Screen 6: order tracking ---------- */
/* Backend order states, in flow order (Code.gs FLUJO), mapped onto the four
   steps the customer sees. 'lista' has no separate step — it still reads as
   "en el horno" until the delivery actually leaves. */
const ESTADO_A_PASO = {
  recibida: 0,
  confirmada: 0,
  horno: 1,
  lista: 1,
  camino: 2,
  entregada: 3
};
function AppTracking({
  tab,
  onTab,
  count,
  folio
}) {
  const [orden, setOrden] = React.useState(null);
  const [errorEstado, setErrorEstado] = React.useState(false);

  // Poll the real order state while this screen is open. Without a folio (the
  // design gallery in index.html) it stays on the static placeholder below.
  React.useEffect(() => {
    if (!folio || typeof mextizzaEstadoOrden !== 'function') return;
    let vivo = true;
    const leer = async () => {
      try {
        const {
          orden
        } = await mextizzaEstadoOrden(folio);
        if (vivo) {
          setOrden(orden);
          setErrorEstado(false);
        }
      } catch (e) {
        if (vivo) setErrorEstado(true);
      }
    };
    leer();
    const id = setInterval(leer, 30000);
    return () => {
      vivo = false;
      clearInterval(id);
    };
  }, [folio]);
  const cancelada = orden && orden.estado === 'cancelada';
  const pasoActual = orden ? ESTADO_A_PASO[orden.estado] != null ? ESTADO_A_PASO[orden.estado] : 0 : 1;
  const baseSteps = [['Confirmado', 'Recibimos tu pedido'], ['En el horno', 'Gozney XL · ≤10 min'], ['En camino', 'Mandadito asignado'], ['Entregado', '']];
  const steps = baseSteps.map(([t, d], i) => [t, d, orden ? !cancelada && i <= pasoActual : i <= 1]);
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      background: 'var(--surface-page)',
      position: 'relative',
      paddingBottom: 22,
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 0'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: cancelada ? 'rosa' : 'dorado'
  }, "Pedido #", folio || '1042'), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      marginTop: 12
    }
  }, orden ? {
    recibida: 'Pedido recibido',
    confirmada: 'Confirmado',
    horno: 'En el horno',
    lista: 'Lista para salir',
    camino: 'En camino',
    entregada: 'Entregado',
    cancelada: 'Cancelado'
  }[orden.estado] || 'En proceso' : folio ? 'Consultando…' : 'Llega 20:10'), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, cancelada ? orden.motivo_cancelacion || 'El pedido fue cancelado.' : errorEstado ? 'Sin conexión para actualizar el estado.' : folio ? 'Se actualiza solo · radio de 3 km' : 'Estimado ≤40 min · radio de 3 km')), /*#__PURE__*/React.createElement(TapeStripe, {
    position: "bottom",
    height: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '22px 20px',
      background: 'var(--surface-card)'
    }
  }, steps.map(([t, d, done], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: 14,
      paddingBottom: i < steps.length - 1 ? 22 : 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      flex: 'none',
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center',
      background: done ? 'var(--rosa-mexicano)' : 'transparent',
      border: done ? 'none' : '2px solid var(--negro-12)'
    }
  }, done && /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 13,
    color: "var(--blanco)"
  })), i < steps.length - 1 && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 2,
      flex: 1,
      minHeight: 26,
      background: done ? 'var(--rosa-mexicano)' : 'var(--negro-12)',
      marginTop: 4
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      color: done ? 'var(--text-body)' : 'var(--text-muted)'
    }
  }, t), d && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, d)))), orden && !cancelada && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "md",
    block: true,
    icon: "whatsapp",
    onClick: () => window.open(mextizzaWhatsappLink('Hola, necesito ayuda con mi pedido ' + folio + '.'), '_blank', 'noopener')
  }, "Escr\xEDbenos por WhatsApp"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      color: 'var(--text-muted)',
      textAlign: 'center',
      marginTop: 7
    }
  }, "\xBFAlg\xFAn cambio o problema? M\xE1ndanos mensaje con tu folio.")), /*#__PURE__*/React.createElement(FramedPanel, {
    variant: "paper",
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "Al recibir"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, "Abre la caja de inmediato: la ventilaci\xF3n del kraft evita que la orilla se reblandezca."))), /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    onTab: onTab,
    count: count
  }));
}

/* 5526577352 -> 55 2657 7352. Solo presentación: lo guardado y lo que viaja
   al backend sigue siendo la cadena de 10 dígitos. */
function mextizzaTelFormato(tel) {
  const d = String(tel || '').replace(/\D/g, '');
  return d.length === 10 ? d.slice(0, 2) + ' ' + d.slice(2, 6) + ' ' + d.slice(6) : tel || '';
}

/* ---------- Screen 7: perfil ----------
   No hay cuentas ni contraseñas: la app guarda los datos del cliente en el
   propio teléfono (localStorage). Esta pantalla es donde esos datos se ven,
   se usan y — importante para privacidad — se pueden borrar. */
function AppPerfil({
  tab,
  onTab,
  count,
  cliente,
  folio,
  onVerPedido,
  onBorrarDatos
}) {
  const c = cliente || {};
  const tieneDatos = !!(c.nombre || c.telefono || c.calle);
  const fila = (etiqueta, valor) => /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      padding: '10px 0',
      borderBottom: 'var(--border-dashed)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      flex: 'none'
    }
  }, etiqueta), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 13.5,
      color: 'var(--text-body)',
      textAlign: 'right',
      minWidth: 0,
      wordBreak: 'break-word'
    }
  }, valor));
  return /*#__PURE__*/React.createElement(Phone, null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 'none',
      background: 'var(--surface-page)',
      position: 'relative',
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement(StatusBar, null), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 20px 18px'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 27
    }
  }, "Perfil"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, tieneDatos ? 'Guardado en este teléfono, no en la nube.' : 'Aún no has hecho tu primer pedido.')), /*#__PURE__*/React.createElement(TapeStripe, {
    position: "bottom",
    height: 3
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '18px 20px 24px',
      background: 'var(--surface-card)'
    }
  }, folio && /*#__PURE__*/React.createElement(FramedPanel, {
    variant: "paper",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)'
    }
  }, "Tu \xFAltimo pedido"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: 19,
      marginTop: 6
    }
  }, "Pedido #", folio), /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "sm",
    iconAfter: "chevronRight",
    style: {
      marginTop: 12
    },
    onClick: onVerPedido
  }, "Ver seguimiento")), tieneDatos && /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)',
      marginBottom: 4
    }
  }, "Tus datos de entrega"), c.nombre && fila('Nombre', c.nombre), c.telefono && fila('Teléfono', mextizzaTelFormato(c.telefono)), c.calle && fila('Dirección', c.calle), c.colonia && fila('Colonia', c.colonia), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 10,
      lineHeight: 1.5
    }
  }, "Se llenan solos en tu pr\xF3ximo pedido. Puedes cambiarlos ah\xED mismo.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--rosa-mexicano-texto)',
      marginBottom: 10
    }
  }, "Contacto"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "md",
    block: true,
    icon: "whatsapp",
    onClick: () => window.open(mextizzaWhatsappLink('Hola, tengo una pregunta sobre mi pedido.'), '_blank', 'noopener')
  }, "Escr\xEDbenos por WhatsApp"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "md",
    block: true,
    icon: "instagram",
    onClick: () => window.open(MEXTIZZA_SOCIAL.instagram, '_blank', 'noopener')
  }, "Instagram"), /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "md",
    block: true,
    icon: "facebook",
    onClick: () => window.open(MEXTIZZA_SOCIAL.facebook, '_blank', 'noopener')
  }, "Facebook")))), /*#__PURE__*/React.createElement(FramedPanel, {
    variant: "paper",
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "De la casa"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, MEXTIZZA_FACTS.fermento, ". Repartimos ", MEXTIZZA_FACTS.radio, ", desde ", MEXTIZZA_FACTS.zona, ". Env\xEDo incluido en el precio.")), (tieneDatos || folio) && /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "md",
    block: true,
    onClick: onBorrarDatos
  }, "Borrar mis datos de este tel\xE9fono")), /*#__PURE__*/React.createElement(TabBar, {
    tab: tab,
    onTab: onTab,
    count: count
  }));
}
Object.assign(window, {
  Phone,
  StatusBar,
  TabBar,
  AppWelcome,
  AppMenu,
  AppDetail,
  AppAddons,
  AppCart,
  AppTracking,
  AppPerfil
});
})();

/* ui_kits/app/AppMobile.jsx */
(function () {
/* Icon viene del design system. Este archivo lo usaba sin declararlo, apoyado
   en que el ambito de AppScreens.jsx se filtrara: al compilar el JSX cada
   archivo quedo aislado y la referencia se rompio, pero solo al abrir el
   detalle de una pizza, que es donde se usa. Los demas archivos si lo declaran. */
const {
  Icon
} = window.MextizzaDesignSystem_8a35ee;
/* Real single-screen navigator for the installable app (Capacitor build).
   Reuses the exact same screen components as the design-gallery AppKit in
   index.html — this file only adds navigation state, it does not duplicate
   any screen markup. Keep index.html (the "show all 6 at once" design
   review page) and this file (the real click-through) in sync when a
   screen's props change. */

/* Navigation is driven through the real browser history (pushState/popstate)
   rather than plain React state. That is deliberate: the Capacitor default
   hardware-back behaviour is `webView.canGoBack() ? goBack() : finish()`.
   With no history entries the WebView can never go back, so Android back
   always hit finish() and killed the app. Pushing real entries makes the
   built-in path do the right thing even if the JS plugin listener below
   never attaches. */
const NAV_ROOT = {
  entered: false,
  tab: 'menu',
  screen: 'list',
  depth: 0
};

/* Survives the app being closed: an open order folio has to outlive the
   process or the customer loses tracking for a pizza that is still being
   made. Cart lines are kept too so a half-built order is not lost. */
const MEXTIZZA_LS_KEY = 'mextizza.app.v1';
function mextizzaLoadPersisted() {
  try {
    const raw = window.localStorage.getItem(MEXTIZZA_LS_KEY);
    const d = raw ? JSON.parse(raw) : null;
    return d && typeof d === 'object' ? d : null;
  } catch (e) {
    return null;
  } // private mode / storage disabled
}
function AppMobile() {
  const saved = React.useRef(mextizzaLoadPersisted()).current;
  const [nav, setNav] = React.useState(saved && saved.entered ? {
    ...NAV_ROOT,
    entered: true
  } : NAV_ROOT);
  const navRef = React.useRef(nav);
  navRef.current = nav;
  const {
    entered,
    tab,
    screen
  } = nav;
  const [detail, setDetail] = React.useState(MEXTIZZA_MENU[1].items.find(x => x.id === 'cochinita'));
  const [custom, setCustom] = React.useState(MEXTIZZA_MENU[0].items.find(x => x.id === 'roni'));
  const [lines, setLines] = React.useState(saved && Array.isArray(saved.lines) ? saved.lines : []);
  const [added, setAdded] = React.useState(null);
  const [folio, setFolio] = React.useState(saved && saved.folio || null);
  const [cliente, setCliente] = React.useState(saved && saved.cliente || null);
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);
  React.useEffect(() => {
    try {
      window.localStorage.setItem(MEXTIZZA_LS_KEY, JSON.stringify({
        entered,
        lines,
        folio,
        cliente
      }));
    } catch (e) {/* storage unavailable — degrade to in-memory only */}
  }, [entered, lines, folio, cliente]);

  /* --- history-backed navigation --- */
  const go = patch => {
    const next = {
      ...navRef.current,
      ...patch,
      depth: navRef.current.depth + 1
    };
    navRef.current = next;
    try {
      window.history.pushState(next, '');
    } catch (e) {}
    setNav(next);
  };
  const back = (steps = 1) => {
    try {
      window.history.go(-steps);
    } catch (e) {}
  };
  React.useEffect(() => {
    try {
      window.history.replaceState(navRef.current, '');
    } catch (e) {}
    const onPop = e => {
      const s = e.state && typeof e.state === 'object' && e.state.tab ? e.state : NAV_ROOT;
      navRef.current = s;
      setNav(s);
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const showToast = msg => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };
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
  };
  /* Detail and Addons sit one and two history entries deep respectively, so
     returning to the menu list is a real history rewind — that keeps the
     back stack honest instead of piling on a forward entry. */
  const addAndReturn = steps => (it, q = 1, extra = {}) => {
    add(it, q, extra);
    showToast(`${it.name} agregado al pedido`);
    back(steps);
  };
  const qty = (key, n) => setLines(ls => n <= 0 ? ls.filter(l => l.key !== key) : ls.map(l => l.key === key ? {
    ...l,
    qty: n
  } : l));
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const goTab = t => go({
    tab: t,
    screen: 'list'
  });

  /* If the JS listener does attach, this runs instead of the Capacitor
     default; both paths end up calling the same history rewind, so behaviour
     matches either way. Only a true root screen exits the app. */
  const handleBack = React.useCallback(() => {
    if (navRef.current.depth > 0) {
      back(1);
      return;
    }
    try {
      const cap = window.Capacitor;
      if (cap.Plugins && cap.Plugins.App) cap.Plugins.App.exitApp();else cap.nativeCallback('App', 'exitApp', {});
    } catch (e) {}
  }, []);
  React.useEffect(() => {
    let handle,
      cancelled = false,
      attempts = 0;
    const tryRegister = () => {
      if (cancelled) return;
      try {
        const cap = window.Capacitor;
        if (!(cap && cap.isNativePlatform && cap.isNativePlatform())) return; // browser preview
        if (cap.Plugins && cap.Plugins.App && typeof cap.Plugins.App.addListener === 'function') {
          cap.Plugins.App.addListener('backButton', handleBack).then(h => {
            if (!cancelled) handle = h;
          }).catch(() => {});
          return;
        }
        if (typeof cap.addListener === 'function') {
          handle = cap.addListener('App', 'backButton', handleBack);
          return;
        }
      } catch (e) {/* fall through to retry */}
      if (attempts++ < 20) setTimeout(tryRegister, 150);
    };
    tryRegister();
    return () => {
      cancelled = true;
      try {
        handle && handle.remove();
      } catch (e) {}
    };
  }, [handleBack]);
  let content;
  if (!entered) {
    content = /*#__PURE__*/React.createElement(AppWelcome, {
      onEnter: () => go({
        entered: true
      })
    });
  } else if (tab === 'menu') {
    if (screen === 'detail') {
      content = /*#__PURE__*/React.createElement(AppDetail, {
        item: detail,
        onBack: () => back(1),
        onAdd: addAndReturn(1),
        onCustomize: it => {
          setCustom(it);
          go({
            screen: 'addons'
          });
        }
      });
    } else if (screen === 'addons') {
      content = /*#__PURE__*/React.createElement(AppAddons, {
        item: custom,
        onBack: () => back(1),
        onAdd: addAndReturn(2)
      });
    } else {
      content = /*#__PURE__*/React.createElement(AppMenu, {
        added: added,
        onOpen: it => {
          setDetail(it);
          go({
            screen: 'detail'
          });
        },
        onAdd: it => {
          add(it);
          showToast(`${it.name} agregado al pedido`);
        },
        tab: tab,
        onTab: goTab,
        count: count
      });
    }
  } else if (tab === 'pedido') {
    content = /*#__PURE__*/React.createElement(AppCart, {
      lines: lines,
      onQty: qty,
      tab: tab,
      onTab: goTab,
      count: count,
      inicialCliente: cliente,
      onConfirm: (nuevoFolio, entrega) => {
        setFolio(nuevoFolio);
        // Solo los campos reutilizables del próximo pedido: nada de método de
        // pago ni notas, que son decisiones de cada pedido, no del cliente.
        if (entrega) setCliente({
          nombre: entrega.nombre,
          telefono: entrega.telefono,
          calle: entrega.calle,
          colonia: entrega.colonia
        });
        setLines([]);
        showToast(nuevoFolio ? `Pedido #${nuevoFolio} enviado` : 'Pedido enviado');
        go({
          tab: 'seguir',
          screen: 'list'
        });
      }
    });
  } else if (tab === 'seguir') {
    content = /*#__PURE__*/React.createElement(AppTracking, {
      tab: tab,
      onTab: goTab,
      count: count,
      folio: folio
    });
  } else {
    content = /*#__PURE__*/React.createElement(AppPerfil, {
      tab: tab,
      onTab: goTab,
      count: count,
      cliente: cliente,
      folio: folio,
      onVerPedido: () => goTab('seguir'),
      onBorrarDatos: () => {
        try {
          window.localStorage.removeItem(MEXTIZZA_LS_KEY);
        } catch (e) {}
        setCliente(null);
        setFolio(null);
        setLines([]);
        showToast('Datos borrados de este teléfono');
      }
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, content, toast && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 96,
      transform: 'translateX(-50%)',
      zIndex: 999,
      background: 'var(--negro-carbon)',
      color: 'var(--blanco-hueso)',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      fontSize: 13.5,
      padding: '12px 20px',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-raised)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      maxWidth: '85vw'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "var(--rosa-mexicano)"
  }), toast));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(AppMobile, null));
})();