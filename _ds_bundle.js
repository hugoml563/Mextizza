/* @ds-bundle: {"format":4,"namespace":"MextizzaDesignSystem_8a35ee","components":[{"name":"DotRow","sourcePath":"components/brand/DotRow.jsx"},{"name":"FramedPanel","sourcePath":"components/brand/FramedPanel.jsx"},{"name":"Lockup","sourcePath":"components/brand/Lockup.jsx"},{"name":"SectionLabel","sourcePath":"components/brand/SectionLabel.jsx"},{"name":"SocialTile","sourcePath":"components/brand/SocialTile.jsx"},{"name":"Stamp","sourcePath":"components/brand/Stamp.jsx"},{"name":"Swatch","sourcePath":"components/brand/Swatch.jsx"},{"name":"TapeStripe","sourcePath":"components/brand/TapeStripe.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/ui/Badge.jsx"},{"name":"Icon","sourcePath":"components/ui/Icon.jsx"},{"name":"Button","sourcePath":"components/ui/Button.jsx"},{"name":"Field","sourcePath":"components/ui/Field.jsx"},{"name":"MenuCard","sourcePath":"components/ui/MenuCard.jsx"},{"name":"MenuItem","sourcePath":"components/ui/MenuItem.jsx"},{"name":"QtyStepper","sourcePath":"components/ui/QtyStepper.jsx"},{"name":"RadioGroup","sourcePath":"components/ui/RadioGroup.jsx"},{"name":"StatusNote","sourcePath":"components/ui/StatusNote.jsx"}],"sourceHashes":{"components/brand/DotRow.jsx":"6a7e320cec05","components/brand/FramedPanel.jsx":"515999104455","components/brand/Lockup.jsx":"fdf13ac932da","components/brand/SectionLabel.jsx":"cf8868a97199","components/brand/SocialTile.jsx":"a93b506def40","components/brand/Stamp.jsx":"01e4aafc26b2","components/brand/Swatch.jsx":"d06477c9d469","components/brand/TapeStripe.jsx":"32a08589f124","components/brand/Wordmark.jsx":"dd6d0d5df13f","components/ui/Badge.jsx":"15b6c81c2f38","components/ui/Icon.jsx":"8ed2445f5ec2","components/ui/Button.jsx":"d6f3cce3450c","components/ui/Field.jsx":"18ac925d3c5e","components/ui/MenuCard.jsx":"6c2607fbecf8","components/ui/MenuItem.jsx":"97546a688a2e","components/ui/QtyStepper.jsx":"7b1a9d74326d","components/ui/RadioGroup.jsx":"6b50b81b2091","components/ui/StatusNote.jsx":"9eceb4795764"},"inlinedExternals":[],"unexposedExports":[]} */

/* Generado por scripts/build-ds-bundle.js. No editar a mano: los cambios van en
   components/brand/*.jsx y components/ui/*.jsx. Este paquete solo lleva componentes;
   el menu y la zona de reparto viven en ui_kits/menu-data.js y ui_kits/delivery-zone.js. */

(() => {

const __ds_ns = (window.MextizzaDesignSystem_8a35ee = window.MextizzaDesignSystem_8a35ee || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/DotRow.jsx
try { (() => {
const DEFAULT_DOTS = ['var(--rosa-mexicano)', 'var(--terracota-horno)', 'var(--dorado-masa)', 'var(--gris-asfalto)', 'var(--negro-carbon)'];
function DotRow({
  colors = DEFAULT_DOTS,
  size = 16,
  gap = 10,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      ...style
    }
  }, colors.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      background: c,
      boxShadow: 'var(--ring-dot)'
    }
  })));
}
Object.assign(__ds_scope, { DotRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/DotRow.jsx", error: String((e && e.message) || e) }); }

// components/brand/FramedPanel.jsx
try { (() => {
const VARIANTS = {
  object: {
    background: 'var(--surface-card)',
    border: 'var(--border-frame)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-body)'
  },
  info: {
    background: 'var(--surface-card)',
    border: 'var(--border-paper)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--text-body)',
    boxShadow: 'var(--shadow-soft)'
  },
  paper: {
    background: 'var(--surface-sunken)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--text-body)'
  },
  hero: {
    background: 'var(--surface-inverse)',
    border: 'none',
    borderRadius: 'var(--radius-lg)',
    color: 'var(--text-on-inverse)'
  }
};
function FramedPanel({
  variant = 'object',
  tape,
  padding,
  children,
  style
}) {
  const v = VARIANTS[variant] || VARIANTS.object;
  const pad = padding || (variant === 'hero' ? 'var(--pad-hero)' : variant === 'info' ? 'var(--pad-card)' : 'var(--pad-frame)');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: pad,
      ...v,
      ...style
    }
  }, tape && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      [tape]: 0,
      height: 10,
      background: 'var(--stripe-tape)'
    }
  }), children);
}
Object.assign(__ds_scope, { FramedPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/FramedPanel.jsx", error: String((e && e.message) || e) }); }

// components/brand/Lockup.jsx
try { (() => {
/* The founders' own artwork, cut out of assets/logo-letras-negras.png. Never redraw
   the peel, the cutter or the five ingredient icons — crop them from that file. */
const ART = {
  pala: {
    negro: 'assets/lockup-pala.png',
    hueso: 'assets/lockup-pala-hueso.png',
    ratio: 733 / 306,
    lettersOfHeight: 0.41
  },
  completo: {
    negro: 'assets/lockup-completo.png',
    hueso: 'assets/lockup-completo-hueso.png',
    ratio: 733 / 421,
    lettersOfHeight: 0.30
  },
  ingredientes: {
    negro: 'assets/ingredientes.png',
    hueso: 'assets/ingredientes.png',
    ratio: 535 / 102,
    lettersOfHeight: 1
  }
};

/**
 * The illustrated lockup: letters with the peel and cutter above (`pala`), the same plus
 * the five ingredient icons below (`completo`), or the ingredient strip on its own.
 */
function Lockup({
  variant = 'pala',
  tone = 'negro',
  size = 44,
  base = '',
  subtitle,
  tagline,
  align = 'center',
  style
}) {
  const art = ART[variant] || ART.pala;
  const height = size / art.lettersOfHeight;
  const inkColor = tone === 'hueso' ? 'var(--blanco-hueso)' : 'var(--negro-carbon)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: base + art[tone === 'hueso' ? 'hueso' : 'negro'],
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
      color: inkColor,
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
}
Object.assign(__ds_scope, { Lockup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Lockup.jsx", error: String((e && e.message) || e) }); }

// components/brand/SectionLabel.jsx
try { (() => {
function SectionLabel({
  children,
  color = 'var(--negro-carbon)',
  rule = true,
  style
}) {
  return /*#__PURE__*/React.createElement("h2", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'var(--font-label)',
      fontWeight: 400,
      fontSize: 11,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color,
      marginBottom: 20,
      ...style
    }
  }, children, rule && /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      height: 2,
      background: 'var(--negro-carbon)',
      opacity: 0.15
    }
  }));
}
Object.assign(__ds_scope, { SectionLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SectionLabel.jsx", error: String((e && e.message) || e) }); }

// components/brand/SocialTile.jsx
try { (() => {
function SocialTile({
  headline,
  kicker,
  treatment = 'diagonal',
  background = 'var(--terracota-horno)',
  headlineColor,
  kickerColor = 'var(--blanco-hueso)',
  style
}) {
  const diagonal = treatment === 'diagonal';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: '1',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-md)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: diagonal ? 'var(--gris-asfalto)' : background,
      ...style
    }
  }, diagonal && /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--split-diagonal)',
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      textAlign: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: 1.3,
      textTransform: 'uppercase',
      color: headlineColor || (diagonal ? 'var(--blanco)' : 'var(--dorado-masa)')
    }
  }, headline), kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 400,
      fontSize: 12,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: kickerColor,
      marginTop: 10
    }
  }, kicker)));
}
Object.assign(__ds_scope, { SocialTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/SocialTile.jsx", error: String((e && e.message) || e) }); }

// components/brand/Stamp.jsx
try { (() => {
function Stamp({
  lines = [],
  size = 130,
  color = 'var(--negro-carbon)',
  tilt = -6,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      border: `2px solid ${color}`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      transform: `rotate(${tilt}deg)`,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-label)',
      fontWeight: 400,
      fontSize: 11,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
      lineHeight: 1.5,
      color
    }
  }, lines.map((l, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("br", null), l))));
}
Object.assign(__ds_scope, { Stamp });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Stamp.jsx", error: String((e && e.message) || e) }); }

// components/brand/Swatch.jsx
try { (() => {
function Swatch({
  name,
  hex,
  note,
  fill,
  height = 120,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 'var(--radius-sm)',
      overflow: 'hidden',
      border: 'var(--border-hairline)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: fill || hex
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      padding: 'var(--pad-swatch-label)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: 0.5
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      font: 'var(--type-mono)',
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, hex), note && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      color: 'var(--text-muted)',
      marginTop: 6,
      lineHeight: 1.4
    }
  }, note)));
}
Object.assign(__ds_scope, { Swatch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Swatch.jsx", error: String((e && e.message) || e) }); }

// components/brand/TapeStripe.jsx
try { (() => {
function TapeStripe({
  height = 10,
  position,
  style
}) {
  const base = {
    height,
    background: 'var(--stripe-tape)',
    ...(position ? {
      position: 'absolute',
      left: 0,
      right: 0,
      [position]: 0
    } : {}),
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: base
  });
}
Object.assign(__ds_scope, { TapeStripe });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/TapeStripe.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
const SIZES = {
  sm: 24,
  md: 38,
  lg: 62,
  xl: 96
};

// Trazos reales de la marca (extraídos del SVG oficial "Logo Mextizza letras negras").
// Esta es la marca principal: letras negras, monótonas, sobre papel.
// M e x t i = índices 0–4, z z a = 5–7. Nunca redibujar estas curvas.
const VIEWBOX = '136.7 326.2 651.8 125.7';
const GLYPHS = [{
  t: '137.805569, 448.333179',
  d: 'M 1.921875 -95.625 C 1.921875 -100.332031 2.628906 -104.265625 4.046875 -107.421875 C 5.460938 -110.578125 7.320312 -113.0625 9.625 -114.875 C 11.925781 -116.695312 14.453125 -117.898438 17.203125 -118.484375 C 19.960938 -119.078125 22.71875 -119.101562 25.46875 -118.5625 C 28.226562 -118.03125 30.753906 -117 33.046875 -115.46875 C 35.347656 -113.945312 37.195312 -112.015625 38.59375 -109.671875 L 59.6875 -73.5625 L 80.859375 -109.671875 C 82.253906 -112.015625 84.113281 -113.945312 86.4375 -115.46875 C 88.769531 -117 91.3125 -118.03125 94.0625 -118.5625 C 96.8125 -119.101562 99.5625 -119.078125 102.3125 -118.484375 C 105.070312 -117.898438 107.601562 -116.695312 109.90625 -114.875 C 112.207031 -113.0625 114.050781 -110.578125 115.4375 -107.421875 C 116.832031 -104.265625 117.53125 -100.332031 117.53125 -95.625 L 117.609375 0 L 102.84375 0 L 102.84375 -94.5 C 102.84375 -97.175781 102.238281 -99.195312 101.03125 -100.5625 C 99.832031 -101.925781 98.390625 -102.5 96.703125 -102.28125 C 95.023438 -102.070312 93.460938 -100.867188 92.015625 -98.671875 L 62.578125 -53.34375 C 61.609375 -51.851562 60.707031 -51.039062 59.875 -50.90625 C 59.050781 -50.769531 58.101562 -51.476562 57.03125 -53.03125 L 27.515625 -98.671875 C 26.066406 -100.867188 24.488281 -102.070312 22.78125 -102.28125 C 21.070312 -102.5 19.613281 -101.925781 18.40625 -100.5625 C 17.207031 -99.195312 16.609375 -97.175781 16.609375 -94.5 L 16.53125 0 L 1.921875 0 Z M 86.484375 0 L 88.40625 -64.984375 L 72.359375 -38.421875 C 69.847656 -34.785156 67.066406 -32.363281 64.015625 -31.15625 C 60.960938 -29.957031 57.9375 -29.984375 54.9375 -31.234375 C 51.945312 -32.492188 49.25 -35 46.84375 -38.75 L 31.53125 -62.8125 L 33.046875 0 L 18.375 0 L 18.375 -94.5 C 18.375 -96.851562 18.828125 -98.5 19.734375 -99.4375 C 20.640625 -100.375 21.707031 -100.679688 22.9375 -100.359375 C 24.164062 -100.035156 25.265625 -99.125 26.234375 -97.625 L 55.515625 -52.140625 C 56.847656 -50.054688 58.273438 -49.015625 59.796875 -49.015625 C 61.328125 -49.015625 62.734375 -50.082031 64.015625 -52.21875 L 93.296875 -97.625 C 94.265625 -99.125 95.347656 -100.035156 96.546875 -100.359375 C 97.753906 -100.679688 98.796875 -100.375 99.671875 -99.4375 C 100.554688 -98.5 101 -96.851562 101 -94.5 L 101.078125 0 Z M 86.484375 0'
}, {
  t: '269.40378, 448.333179',
  d: 'M 39.875 -63.609375 C 36.445312 -63.609375 33.234375 -62.96875 30.234375 -61.6875 C 27.242188 -60.40625 24.613281 -58.628906 22.34375 -56.359375 C 20.070312 -54.085938 18.289062 -51.46875 17 -48.5 C 15.71875 -45.53125 15.078125 -42.332031 15.078125 -38.90625 C 15.078125 -35.488281 15.71875 -32.296875 17 -29.328125 C 18.289062 -26.359375 20.070312 -23.734375 22.34375 -21.453125 C 24.613281 -19.179688 27.242188 -17.40625 30.234375 -16.125 C 33.234375 -14.84375 36.445312 -14.203125 39.875 -14.203125 L 75.171875 -14.203125 L 75.171875 0 L 39.875 0 C 34.519531 0 29.488281 -1 24.78125 -3 C 20.082031 -5.007812 15.941406 -7.804688 12.359375 -11.390625 C 8.773438 -14.972656 5.976562 -19.117188 3.96875 -23.828125 C 1.96875 -28.535156 0.96875 -33.5625 0.96875 -38.90625 C 0.96875 -44.3125 1.96875 -49.351562 3.96875 -54.03125 C 5.976562 -58.707031 8.773438 -62.835938 12.359375 -66.421875 C 15.941406 -70.003906 20.082031 -72.796875 24.78125 -74.796875 C 29.488281 -76.804688 34.519531 -77.8125 39.875 -77.8125 C 44.363281 -77.8125 48.71875 -77.265625 52.9375 -76.171875 C 57.164062 -75.078125 60.988281 -73.351562 64.40625 -71 C 67.832031 -68.644531 70.613281 -65.617188 72.75 -61.921875 C 74.894531 -58.234375 76.128906 -53.769531 76.453125 -48.53125 C 76.671875 -45.59375 76.46875 -42.691406 75.84375 -39.828125 C 75.226562 -36.960938 73.929688 -34.359375 71.953125 -32.015625 L 57.84375 -31.921875 C 59.875 -34.171875 61.179688 -36.6875 61.765625 -39.46875 C 62.359375 -42.25 62.492188 -44.816406 62.171875 -47.171875 C 61.796875 -50.328125 60.628906 -53.132812 58.671875 -55.59375 C 56.722656 -58.050781 54.144531 -60 50.9375 -61.4375 C 47.726562 -62.882812 44.039062 -63.609375 39.875 -63.609375 Z M 75.171875 -15.890625 C 69.335938 -15.890625 63.46875 -15.898438 57.5625 -15.921875 C 51.65625 -15.953125 45.757812 -15.96875 39.875 -15.96875 C 36.71875 -15.96875 33.75 -16.554688 30.96875 -17.734375 C 28.1875 -18.910156 25.738281 -20.550781 23.625 -22.65625 C 21.507812 -24.769531 19.847656 -27.21875 18.640625 -30 C 17.441406 -32.78125 16.84375 -35.75 16.84375 -38.90625 C 16.84375 -42.0625 17.441406 -45.03125 18.640625 -47.8125 C 19.847656 -50.59375 21.507812 -53.039062 23.625 -55.15625 C 25.738281 -57.269531 28.1875 -58.914062 30.96875 -60.09375 C 33.75 -61.269531 36.71875 -61.859375 39.875 -61.859375 C 43.882812 -61.859375 47.375 -61.210938 50.34375 -59.921875 C 53.3125 -58.640625 55.660156 -56.890625 57.390625 -54.671875 C 59.128906 -52.453125 60.160156 -49.925781 60.484375 -47.09375 C 60.753906 -44.789062 60.644531 -42.394531 60.15625 -39.90625 C 59.675781 -37.425781 58.316406 -34.765625 56.078125 -31.921875 L 39.15625 -31.921875 L 39.15625 -35.296875 C 41.238281 -35.242188 42.894531 -35.628906 44.125 -36.453125 C 45.351562 -37.285156 46.191406 -38.328125 46.640625 -39.578125 C 47.097656 -40.835938 47.140625 -42.082031 46.765625 -43.3125 C 46.390625 -44.550781 45.628906 -45.597656 44.484375 -46.453125 C 43.335938 -47.304688 41.800781 -47.734375 39.875 -47.734375 C 38.269531 -47.734375 36.796875 -47.332031 35.453125 -46.53125 C 34.117188 -45.726562 33.050781 -44.65625 32.25 -43.3125 C 31.445312 -41.976562 31.046875 -40.507812 31.046875 -38.90625 C 31.046875 -37.25 31.457031 -35.738281 32.28125 -34.375 C 33.113281 -33.007812 34.222656 -31.9375 35.609375 -31.15625 C 37.003906 -30.382812 38.53125 -30.023438 40.1875 -30.078125 L 75.171875 -30.078125 Z M 75.171875 -15.890625'
}, {
  t: '358.323315, 448.333179',
  d: 'M 37.859375 -37.859375 L 21.65625 -21.421875 C 19.351562 -19.171875 17.570312 -16.546875 16.3125 -13.546875 C 15.0625 -10.554688 14.4375 -7.320312 14.4375 -3.84375 L 14.4375 0 L 0.328125 0 L 0.328125 -3.6875 C 0.328125 -8.613281 1.164062 -13.375 2.84375 -17.96875 C 4.53125 -22.570312 7.054688 -26.632812 10.421875 -30.15625 L 18.125 -37.859375 L 10.421875 -45.25 C 7.054688 -48.71875 4.53125 -52.695312 2.84375 -57.1875 C 1.164062 -61.6875 0.328125 -66.425781 0.328125 -71.40625 L 0.328125 -76.859375 L 14.4375 -76.859375 L 14.4375 -71.234375 C 14.4375 -67.867188 15.0625 -64.710938 16.3125 -61.765625 C 17.570312 -58.828125 19.351562 -56.207031 21.65625 -53.90625 Z M 16.125 -76.859375 L 30.328125 -76.859375 L 30.328125 -71.40625 C 30.328125 -69.632812 30.820312 -68 31.8125 -66.5 C 32.800781 -65.007812 33.988281 -63.632812 35.375 -62.375 C 36.769531 -61.113281 38.054688 -59.921875 39.234375 -58.796875 C 40.296875 -59.921875 41.507812 -61.113281 42.875 -62.375 C 44.238281 -63.632812 45.414062 -65.007812 46.40625 -66.5 C 47.394531 -68 47.890625 -69.632812 47.890625 -71.40625 L 47.890625 -76.859375 L 62.171875 -76.859375 L 62.171875 -71.234375 C 62.171875 -68.296875 61.554688 -65.421875 60.328125 -62.609375 C 59.097656 -59.804688 57.414062 -57.304688 55.28125 -55.109375 L 39.234375 -39.0625 L 22.78125 -55.109375 C 20.800781 -57.304688 19.195312 -59.804688 17.96875 -62.609375 C 16.738281 -65.421875 16.125 -68.296875 16.125 -71.234375 Z M 60 -37.859375 L 67.703125 -30.15625 C 71.128906 -26.632812 73.65625 -22.570312 75.28125 -17.96875 C 76.914062 -13.375 77.734375 -8.613281 77.734375 -3.6875 L 77.734375 0 L 63.703125 0 L 63.703125 -3.84375 C 63.703125 -7.320312 63.054688 -10.554688 61.765625 -13.546875 C 60.484375 -16.546875 58.722656 -19.171875 56.484375 -21.421875 L 40.1875 -37.859375 L 56.484375 -53.90625 C 58.722656 -56.207031 60.484375 -58.828125 61.765625 -61.765625 C 63.054688 -64.710938 63.703125 -67.867188 63.703125 -71.234375 L 63.703125 -76.859375 L 77.734375 -76.859375 L 77.734375 -71.40625 C 77.734375 -66.425781 76.914062 -61.6875 75.28125 -57.1875 C 73.65625 -52.695312 71.128906 -48.71875 67.703125 -45.25 Z M 16.125 -3.84375 C 16.125 -6.945312 16.738281 -9.914062 17.96875 -12.75 C 19.195312 -15.582031 20.800781 -18.097656 22.78125 -20.296875 L 39.234375 -36.34375 L 55.28125 -20.296875 C 57.414062 -18.097656 59.097656 -15.582031 60.328125 -12.75 C 61.554688 -9.914062 62.171875 -6.945312 62.171875 -3.84375 L 62.171875 0 L 47.890625 0 L 47.890625 -3.84375 C 47.890625 -5.664062 47.394531 -7.3125 46.40625 -8.78125 C 45.414062 -10.25 44.238281 -11.625 42.875 -12.90625 C 41.507812 -14.195312 40.296875 -15.429688 39.234375 -16.609375 C 38.054688 -15.429688 36.769531 -14.195312 35.375 -12.90625 C 33.988281 -11.625 32.800781 -10.25 31.8125 -8.78125 C 30.820312 -7.3125 30.328125 -5.664062 30.328125 -3.84375 L 30.328125 0 L 16.125 0 Z M 16.125 -3.84375'
}, {
  t: '447.563744, 448.333179',
  d: 'M 16.84375 -63.0625 L 16.84375 -80.625 C 16.84375 -84.050781 16.1875 -87.257812 14.875 -90.25 C 13.570312 -93.25 11.742188 -95.882812 9.390625 -98.15625 C 7.035156 -100.425781 4.28125 -102.097656 1.125 -103.171875 L 1.125 -117.765625 C 4.863281 -116.960938 8.457031 -115.582031 11.90625 -113.625 C 15.363281 -111.675781 18.453125 -109.054688 21.171875 -105.765625 C 23.898438 -102.484375 26.050781 -98.472656 27.625 -93.734375 C 29.207031 -89.003906 30 -83.457031 30 -77.09375 L 39.3125 -77.09375 L 39.3125 -63.0625 Z M 15 -80.625 C 15 -83.613281 14.410156 -86.484375 13.234375 -89.234375 C 12.054688 -91.992188 10.425781 -94.429688 8.34375 -96.546875 C 6.257812 -98.660156 3.851562 -100.253906 1.125 -101.328125 L 1.125 -38.421875 C 1.125 -33.078125 2.125 -28.050781 4.125 -23.34375 C 6.132812 -18.632812 8.90625 -14.488281 12.4375 -10.90625 C 15.96875 -7.320312 20.054688 -4.515625 24.703125 -2.484375 C 29.359375 -0.453125 34.359375 0.5625 39.703125 0.5625 L 39.703125 -13.3125 C 36.285156 -13.3125 33.078125 -13.96875 30.078125 -15.28125 C 27.085938 -16.59375 24.46875 -18.382812 22.21875 -20.65625 C 19.976562 -22.925781 18.210938 -25.570312 16.921875 -28.59375 C 15.640625 -31.613281 15 -34.8125 15 -38.1875 Z M 30.8125 -38.1875 C 30.8125 -36.582031 31.195312 -35.097656 31.96875 -33.734375 C 32.738281 -32.367188 33.804688 -31.269531 35.171875 -30.4375 C 36.535156 -29.613281 38.046875 -29.203125 39.703125 -29.203125 L 39.703125 -15.15625 C 36.492188 -15.15625 33.515625 -15.769531 30.765625 -17 C 28.015625 -18.238281 25.59375 -19.925781 23.5 -22.0625 C 21.414062 -24.195312 19.785156 -26.640625 18.609375 -29.390625 C 17.429688 -32.148438 16.84375 -35.082031 16.84375 -38.1875 L 16.84375 -61.203125 L 39.3125 -61.203125 L 39.3125 -47.328125 L 30.8125 -47.328125 Z M 30.8125 -38.1875'
}, {
  t: '499.259771, 448.333179',
  d: 'M 1.125 -97.15625 C 1.125 -100.3125 1.867188 -103.15625 3.359375 -105.6875 C 4.859375 -108.226562 6.890625 -110.257812 9.453125 -111.78125 C 12.023438 -113.3125 14.863281 -114.078125 17.96875 -114.078125 C 21.125 -114.078125 23.972656 -113.3125 26.515625 -111.78125 C 29.054688 -110.257812 31.085938 -108.226562 32.609375 -105.6875 C 34.128906 -103.15625 34.890625 -100.3125 34.890625 -97.15625 C 34.890625 -94.050781 34.128906 -91.210938 32.609375 -88.640625 C 31.085938 -86.078125 29.054688 -84.046875 26.515625 -82.546875 C 23.972656 -81.046875 21.125 -80.296875 17.96875 -80.296875 C 14.863281 -80.296875 12.023438 -81.046875 9.453125 -82.546875 C 6.890625 -84.046875 4.859375 -86.078125 3.359375 -88.640625 C 1.867188 -91.210938 1.125 -94.050781 1.125 -97.15625 Z M 15.96875 -97.15625 C 15.96875 -96.726562 16.15625 -96.328125 16.53125 -95.953125 C 16.90625 -95.578125 17.304688 -95.390625 17.734375 -95.390625 C 18.160156 -95.390625 18.53125 -95.578125 18.84375 -95.953125 C 19.164062 -96.328125 19.328125 -96.726562 19.328125 -97.15625 C 19.328125 -97.582031 19.164062 -97.953125 18.84375 -98.265625 C 18.53125 -98.585938 18.160156 -98.75 17.734375 -98.75 C 17.304688 -98.75 16.90625 -98.585938 16.53125 -98.265625 C 16.15625 -97.953125 15.96875 -97.582031 15.96875 -97.15625 Z M 2.734375 -77.25 L 17 -77.25 L 17 0 L 2.734375 0 Z M 32.8125 0 L 18.53125 0 L 18.53125 -77.25 L 32.8125 -77.25 Z M 32.8125 0'
}, {
  t: '546.142413, 448.333179',
  d: 'M 68.671875 -77.25 L 68.671875 -68.1875 L 47.015625 -30.078125 L 68.03125 -30.078125 L 68.03125 -16.359375 L 22.46875 -16.359375 L 50.21875 -63.21875 L 1.53125 -63.21875 L 1.53125 -77.25 Z M 1.53125 -0.15625 L 1.53125 -13.5625 L 21.578125 -47.8125 L 1.53125 -47.8125 L 1.53125 -61.53125 L 46.609375 -61.53125 L 18.859375 -14.203125 L 68.03125 -14.203125 L 68.03125 -0.15625 Z M 1.53125 -0.15625'
}, {
  t: '625.515379, 448.333179',
  d: 'M 68.671875 -77.25 L 68.671875 -68.1875 L 47.015625 -30.078125 L 68.03125 -30.078125 L 68.03125 -16.359375 L 22.46875 -16.359375 L 50.21875 -63.21875 L 1.53125 -63.21875 L 1.53125 -77.25 Z M 1.53125 -0.15625 L 1.53125 -13.5625 L 21.578125 -47.8125 L 1.53125 -47.8125 L 1.53125 -61.53125 L 46.609375 -61.53125 L 18.859375 -14.203125 L 68.03125 -14.203125 L 68.03125 -0.15625 Z M 1.53125 -0.15625'
}, {
  t: '704.888391, 448.333179',
  d: 'M 16.6875 -38.5 C 16.6875 -34.976562 17.34375 -31.703125 18.65625 -28.671875 C 19.96875 -25.648438 21.757812 -23.003906 24.03125 -20.734375 C 26.300781 -18.460938 28.945312 -16.6875 31.96875 -15.40625 C 34.988281 -14.125 38.1875 -13.484375 41.5625 -13.484375 C 45.675781 -13.484375 49.628906 -14.472656 53.421875 -16.453125 C 54.597656 -14.472656 56.003906 -12.570312 57.640625 -10.75 C 59.273438 -8.925781 61.023438 -7.210938 62.890625 -5.609375 C 59.734375 -3.691406 56.390625 -2.179688 52.859375 -1.078125 C 49.335938 0.0117188 45.570312 0.5625 41.5625 0.5625 C 36.375 0.5625 31.410156 -0.4375 26.671875 -2.4375 C 21.941406 -4.445312 17.757812 -7.226562 14.125 -10.78125 C 10.488281 -14.34375 7.613281 -18.488281 5.5 -23.21875 C 3.382812 -27.957031 2.328125 -33.050781 2.328125 -38.5 C 2.328125 -43.957031 3.34375 -49.050781 5.375 -53.78125 C 7.40625 -58.519531 10.210938 -62.679688 13.796875 -66.265625 C 17.378906 -69.847656 21.535156 -72.65625 26.265625 -74.6875 C 31.003906 -76.71875 36.101562 -77.734375 41.5625 -77.734375 C 46.957031 -77.734375 52.007812 -76.71875 56.71875 -74.6875 C 61.425781 -72.65625 65.570312 -69.847656 69.15625 -66.265625 C 72.738281 -62.679688 75.546875 -58.519531 77.578125 -53.78125 C 79.609375 -49.050781 80.625 -43.957031 80.625 -38.5 L 80.625 -16.28125 C 75.96875 -18.15625 72.410156 -21.097656 69.953125 -25.109375 C 67.492188 -29.117188 66.265625 -33.582031 66.265625 -38.5 C 66.265625 -41.925781 65.617188 -45.132812 64.328125 -48.125 C 63.046875 -51.125 61.28125 -53.773438 59.03125 -56.078125 C 56.789062 -58.378906 54.171875 -60.171875 51.171875 -61.453125 C 48.179688 -62.734375 44.976562 -63.375 41.5625 -63.375 C 38.082031 -63.375 34.84375 -62.734375 31.84375 -61.453125 C 28.851562 -60.171875 26.21875 -58.378906 23.9375 -56.078125 C 21.664062 -53.773438 19.890625 -51.125 18.609375 -48.125 C 17.328125 -45.132812 16.6875 -41.925781 16.6875 -38.5 Z M 32.734375 -38.5 C 32.734375 -40.050781 33.132812 -41.492188 33.9375 -42.828125 C 34.738281 -44.171875 35.804688 -45.253906 37.140625 -46.078125 C 38.484375 -46.910156 39.957031 -47.328125 41.5625 -47.328125 C 43.21875 -47.328125 44.726562 -46.910156 46.09375 -46.078125 C 47.457031 -45.253906 48.507812 -44.144531 49.25 -42.75 C 50 -41.363281 50.320312 -39.84375 50.21875 -38.1875 C 50.164062 -33.644531 50.882812 -29.257812 52.375 -25.03125 C 53.875 -20.800781 56 -16.945312 58.75 -13.46875 C 61.507812 -10 64.75 -7.046875 68.46875 -4.609375 C 72.1875 -2.179688 76.238281 -0.457031 80.625 0.5625 L 80.625 -14.4375 C 77.195312 -15.664062 74.28125 -17.492188 71.875 -19.921875 C 69.46875 -22.359375 67.648438 -25.179688 66.421875 -28.390625 C 65.191406 -31.609375 64.578125 -34.976562 64.578125 -38.5 C 64.578125 -41.65625 63.988281 -44.625 62.8125 -47.40625 C 61.632812 -50.1875 59.988281 -52.632812 57.875 -54.75 C 55.769531 -56.863281 53.328125 -58.519531 50.546875 -59.71875 C 47.765625 -60.925781 44.769531 -61.53125 41.5625 -61.53125 C 38.289062 -61.53125 35.25 -60.925781 32.4375 -59.71875 C 29.632812 -58.519531 27.175781 -56.863281 25.0625 -54.75 C 22.957031 -52.632812 21.316406 -50.1875 20.140625 -47.40625 C 18.960938 -44.625 18.375 -41.65625 18.375 -38.5 C 18.375 -35.238281 18.988281 -32.21875 20.21875 -29.4375 C 21.445312 -26.65625 23.128906 -24.222656 25.265625 -22.140625 C 27.410156 -20.054688 29.882812 -18.425781 32.6875 -17.25 C 35.5 -16.070312 38.457031 -15.484375 41.5625 -15.484375 C 43.59375 -15.484375 45.515625 -15.707031 47.328125 -16.15625 C 49.148438 -16.613281 50.835938 -17.269531 52.390625 -18.125 C 51.210938 -20.375 50.25 -22.726562 49.5 -25.1875 C 48.75 -27.644531 48.210938 -30.078125 47.890625 -32.484375 C 47.191406 -31.472656 46.269531 -30.722656 45.125 -30.234375 C 43.976562 -29.753906 42.789062 -29.515625 41.5625 -29.515625 C 39.957031 -29.515625 38.484375 -29.914062 37.140625 -30.71875 C 35.804688 -31.519531 34.738281 -32.601562 33.9375 -33.96875 C 33.132812 -35.332031 32.734375 -36.84375 32.734375 -38.5 Z M 32.734375 -38.5'
}];
function Wordmark({
  size = 'lg',
  vector = true,
  tagline,
  subtitle = 'Pizzería',
  showSubtitle = false,
  print = false,
  align = 'center',
  color = 'var(--text-wordmark)',
  accent,
  style
}) {
  const tail = accent || color;
  const px = typeof size === 'number' ? size : SIZES[size] || parseFloat(size) || SIZES.lg;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: align,
      ...style
    }
  }, vector ? /*#__PURE__*/React.createElement("svg", {
    viewBox: VIEWBOX,
    role: "img",
    "aria-label": "Mextizza",
    style: {
      height: px * 1.05,
      width: 'auto',
      display: 'inline-block',
      verticalAlign: 'top'
    }
  }, /*#__PURE__*/React.createElement("title", null, "Mextizza"), GLYPHS.map((g, i) => /*#__PURE__*/React.createElement("g", {
    key: i,
    transform: `translate(${g.t})`,
    fill: i < 5 ? color : tail
  }, /*#__PURE__*/React.createElement("path", {
    d: g.d
  })))) : /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: px,
      lineHeight: 1.2,
      letterSpacing: Math.max(1, px * 0.032),
      color,
      textShadow: print ? 'var(--shadow-wordmark)' : 'none'
    }
  }, "Mexti", /*#__PURE__*/React.createElement("span", {
    style: {
      color: tail
    }
  }, "zza")), showSubtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 400,
      fontSize: Math.max(11, px * 0.22),
      letterSpacing: Math.max(3, px * 0.1),
      textTransform: 'uppercase',
      color,
      opacity: 0.6,
      marginTop: 10
    }
  }, subtitle), tagline && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontWeight: 400,
      fontSize: 12,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'var(--terracota-horno)',
      marginTop: 14,
      lineHeight: 1.3
    }
  }, tagline));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/ui/Badge.jsx
try { (() => {
const TONES = {
  rosa: {
    background: 'var(--rosa-mexicano)',
    color: 'var(--blanco)'
  },
  dorado: {
    background: 'var(--dorado-masa)',
    color: 'var(--negro-carbon)'
  },
  terracota: {
    background: 'var(--terracota-horno)',
    color: 'var(--blanco-hueso)'
  },
  dark: {
    background: 'var(--negro-carbon)',
    color: 'var(--blanco-hueso)'
  },
  quiet: {
    background: 'transparent',
    color: 'var(--gris-texto)',
    border: '1px solid var(--negro-12)'
  }
};
function Badge({
  children,
  tone = 'rosa',
  style
}) {
  const t = TONES[tone] || TONES.rosa;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      fontFamily: 'var(--font-label)',
      fontWeight: 400,
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      lineHeight: 1,
      padding: '5px 8px',
      borderRadius: 'var(--radius-sm)',
      border: 'none',
      ...t,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/Badge.jsx", error: String((e && e.message) || e) }); }

// components/ui/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Lucide is a flagged substitution — the sources contain no UI icon set.
   Swapping it out means changing only this file. */
const PATHS = {
  cart: 'M8 21a1 1 0 100-2 1 1 0 000 2zM19 21a1 1 0 100-2 1 1 0 000 2zM2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  pin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
  plus: 'M5 12h14M12 5v14',
  minus: 'M5 12h14',
  check: 'M20 6L9 17l-5-5',
  chevronRight: 'M9 18l6-6-6-6',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronDown: 'M6 9l6 6 6-6',
  close: 'M18 6L6 18M6 6l12 12',
  whatsapp: 'M21 11.5a8.5 8.5 0 01-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1121 11.5z',
  flame: 'M12 22c4 0 7-2.7 7-6.5 0-4.6-5-6.4-4.2-11.5C11.5 5 9 7.6 9 11c-1 0-2-1-2.3-2.4C5.6 10 5 12 5 14.2 5 18.6 8 22 12 22z',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  bag: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  instagram: ['M17 2H7a5 5 0 00-5 5v10a5 5 0 005 5h10a5 5 0 005-5V7a5 5 0 00-5-5z', 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z', 'M17.5 6.5h.01'],
  facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z'
};
function Icon({
  name,
  size = 20,
  color = 'currentColor',
  strokeWidth = 2,
  style,
  ...rest
}) {
  const d = PATHS[name];
  if (!d) return null;
  const paths = Array.isArray(d) ? d : [d];
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    style: {
      display: 'block',
      flex: 'none',
      ...style
    }
  }, rest), paths.map((p, i) => /*#__PURE__*/React.createElement("path", {
    key: i,
    d: p
  })));
}
Icon.names = Object.keys(PATHS);
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/Icon.jsx", error: String((e && e.message) || e) }); }

// components/ui/Button.jsx
try { (() => {
const {
  Icon
} = __ds_scope;
const TONES = {
  primary: {
    background: 'var(--rosa-mexicano)',
    color: 'var(--blanco)',
    hover: 'var(--accent-hover)',
    press: 'var(--accent-press)',
    border: 'none'
  },
  dark: {
    background: 'var(--negro-carbon)',
    color: 'var(--blanco-hueso)',
    hover: 'var(--inverse-hover)',
    press: 'var(--negro-carbon)',
    border: 'none'
  },
  warm: {
    background: 'var(--terracota-horno)',
    color: 'var(--blanco-hueso)',
    hover: '#A9421F',
    press: '#8F3818',
    border: 'none'
  },
  outline: {
    background: 'transparent',
    color: 'var(--negro-carbon)',
    hover: 'rgba(26,26,26,0.06)',
    press: 'rgba(26,26,26,0.12)',
    border: 'var(--border-frame)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--negro-carbon)',
    hover: 'rgba(26,26,26,0.06)',
    press: 'rgba(26,26,26,0.12)',
    border: 'none'
  }
};
const SIZES = {
  sm: {
    padding: '8px 14px',
    fontSize: 12,
    letterSpacing: 1
  },
  md: {
    padding: '12px 20px',
    fontSize: 13,
    letterSpacing: 1
  },
  lg: {
    padding: '16px 28px',
    fontSize: 14,
    letterSpacing: 1.5
  }
};
function Button({
  children,
  tone = 'primary',
  size = 'md',
  icon,
  iconAfter,
  block,
  disabled,
  stamped = true,
  onClick,
  type = 'button',
  style
}) {
  const [state, setState] = React.useState('rest');
  const t = TONES[tone] || TONES.primary;
  const s = SIZES[size] || SIZES.md;
  const bg = disabled ? 'var(--gris-texto)' : state === 'press' ? t.press : state === 'hover' ? t.hover : t.background;
  const hardShadow = stamped && tone !== 'ghost' && !disabled;
  return /*#__PURE__*/React.createElement("button", {
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setState('hover'),
    onMouseLeave: () => setState('rest'),
    onMouseDown: () => setState('press'),
    onMouseUp: () => setState('hover'),
    style: {
      display: block ? 'flex' : 'inline-flex',
      width: block ? '100%' : 'auto',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      textTransform: 'uppercase',
      fontSize: s.fontSize,
      letterSpacing: s.letterSpacing,
      padding: s.padding,
      background: bg,
      color: disabled ? 'var(--blanco-hueso)' : t.color,
      border: t.border,
      borderRadius: 'var(--radius-sm)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      boxShadow: hardShadow && state !== 'press' ? 'var(--shadow-lift)' : 'none',
      transform: state === 'press' && hardShadow ? 'translate(2px, 2px)' : 'none',
      transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: size === 'lg' ? 20 : 16
  }), children, iconAfter && /*#__PURE__*/React.createElement(Icon, {
    name: iconAfter,
    size: size === 'lg' ? 20 : 16
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/Button.jsx", error: String((e && e.message) || e) }); }

// components/ui/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  as = 'input',
  type = 'text',
  options = [],
  value,
  onChange,
  placeholder,
  rows = 3,
  required = false,
  invalid = false,
  id,
  style
}) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || `f-${label ? label.replace(/\s+/g, '-').toLowerCase() : 'field'}`;
  const control = {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: 'var(--text-body)',
    background: 'var(--surface-card)',
    border: invalid ? '1px solid var(--terracota-horno)' : focus ? '1px solid var(--rosa-mexicano)' : '1px solid var(--negro-12)',
    borderRadius: 'var(--radius-sm)',
    padding: '11px 12px',
    outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : 'none',
    transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
  };
  const bind = {
    id: fid,
    value,
    onChange,
    placeholder,
    style: control,
    required,
    'aria-invalid': invalid || undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'block',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--negro-carbon)',
      marginBottom: 7
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rosa-mexicano)',
      marginLeft: 4
    }
  }, "*")), as === 'textarea' ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, bind)) : as === 'select' ? /*#__PURE__*/React.createElement("select", bind, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))) : /*#__PURE__*/React.createElement("input", _extends({
    type: type
  }, bind)), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      color: invalid ? 'var(--terracota-horno)' : 'var(--text-muted)',
      marginTop: 6
    }
  }, hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/Field.jsx", error: String((e && e.message) || e) }); }

// components/ui/MenuCard.jsx
try { (() => {
function MenuCard({
  kicker,
  title,
  headBackground = 'var(--negro-carbon)',
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      border: 'var(--border-paper)',
      boxShadow: 'var(--shadow-soft)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: headBackground,
      padding: 'var(--pad-card)',
      color: 'var(--blanco)'
    }
  }, kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: 'var(--dorado-masa)'
    }
  }, kicker), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: 26,
      marginTop: 5,
      lineHeight: 1.2
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--pad-card)'
    }
  }, children));
}
Object.assign(__ds_scope, { MenuCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/MenuCard.jsx", error: String((e && e.message) || e) }); }

// components/ui/MenuItem.jsx
try { (() => {
/* Cada foto vive en tres tamanos con el mismo nombre base: -thumb.webp (220px),
   -md.webp (600px) y .webp (1100px). Sin esto el menu bajaba imagenes de 1100px
   para pintarlas en miniaturas de 64px. */
function variantesFoto(src) {
  if (!src || src.slice(-5) !== ".webp") return undefined;
  var base = src.slice(0, -5);
  return base + "-thumb.webp 220w, " + base + "-md.webp 600w, " + src + " 1100w";
}
function MenuItem({
  name,
  description,
  price,
  photo,
  photoSize = 64,
  badge,
  divider = true,
  action,
  onClick,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 16,
      padding: photo ? '12px 0' : '10px 0',
      borderBottom: divider ? 'var(--border-dashed)' : 'none',
      cursor: clickable ? 'pointer' : 'default',
      transition: 'color var(--dur-fast) var(--ease-standard)',
      ...style
    }
  }, photo && /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: name,
    loading: "lazy",
    decoding: "async",
    srcSet: variantesFoto(photo),
    sizes: photoSize + "px",
    style: {
      width: photoSize,
      height: photoSize,
      flex: 'none',
      objectFit: 'cover',
      borderRadius: 'var(--radius-sm)',
      border: 'var(--border-paper)',
      transform: hover ? 'scale(1.06)' : 'scale(1)',
      transition: 'transform var(--dur-base) var(--ease-standard)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      lineHeight: 1.4,
      color: clickable && hover ? 'var(--rosa-mexicano)' : 'var(--text-body)'
    }
  }, name), badge), description && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 1.4,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, description)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flex: 'none'
    }
  }, price != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 800,
      fontSize: 14,
      color: 'var(--text-price)',
      whiteSpace: 'nowrap'
    }
  }, typeof price === 'number' ? `$${price}` : price), action));
}
Object.assign(__ds_scope, { MenuItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/MenuItem.jsx", error: String((e && e.message) || e) }); }

// components/ui/QtyStepper.jsx
try { (() => {
const {
  Icon
} = __ds_scope;
function QtyStepper({
  value = 1,
  min = 1,
  max = 20,
  onChange,
  size = 32,
  style
}) {
  const step = d => {
    const n = Math.min(max, Math.max(min, value + d));
    if (n !== value && onChange) onChange(n);
  };
  const btn = enabled => ({
    width: size,
    height: size,
    display: 'grid',
    placeItems: 'center',
    background: 'transparent',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
    color: enabled ? 'var(--negro-carbon)' : 'var(--negro-12)',
    cursor: enabled ? 'pointer' : 'not-allowed',
    transition: 'background var(--dur-fast) var(--ease-standard)'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      border: '1px solid var(--negro-12)',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-card)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Quitar uno",
    onClick: () => step(-1),
    disabled: value <= min,
    style: btn(value > min)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "minus",
    size: 14
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 26,
      textAlign: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Agregar uno",
    onClick: () => step(1),
    disabled: value >= max,
    style: btn(value < max)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 14
  })));
}
Object.assign(__ds_scope, { QtyStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/QtyStepper.jsx", error: String((e && e.message) || e) }); }

// components/ui/RadioGroup.jsx
try { (() => {
/**
 * A mandatory single-choice group rendered as paper tiles. Nothing is preselected —
 * the caller must treat `value == null` as an incomplete form.
 */
function RadioGroup({
  label,
  options = [],
  value,
  onChange,
  required = false,
  invalid = false,
  hint,
  columns,
  style
}) {
  const cols = columns || Math.min(options.length, 3);
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-label)',
      fontSize: 10,
      letterSpacing: 1,
      textTransform: 'uppercase',
      color: 'var(--negro-carbon)',
      marginBottom: 7
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--rosa-mexicano)',
      marginLeft: 4
    }
  }, "*")), /*#__PURE__*/React.createElement("div", {
    role: "radiogroup",
    "aria-label": label,
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${cols},1fr)`,
      gap: 8
    }
  }, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    const on = value === opt.value;
    return /*#__PURE__*/React.createElement("button", {
      key: opt.value,
      type: "button",
      role: "radio",
      "aria-checked": on,
      onClick: () => onChange && onChange(opt.value),
      style: {
        minHeight: 48,
        padding: '10px 12px',
        cursor: 'pointer',
        textAlign: 'left',
        background: on ? 'var(--surface-accent-soft)' : 'var(--surface-card)',
        border: on ? '2px solid var(--rosa-mexicano)' : invalid ? '1px solid var(--terracota-horno)' : '1px solid var(--negro-12)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: 9
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        flex: 'none',
        borderRadius: '50%',
        border: on ? '5px solid var(--rosa-mexicano)' : '2px solid var(--negro-12)'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-body)',
        fontWeight: on ? 700 : 500,
        fontSize: 13,
        color: 'var(--text-body)',
        lineHeight: 1.25
      }
    }, opt.label));
  })), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 11.5,
      marginTop: 7,
      color: invalid ? 'var(--terracota-horno)' : 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/RadioGroup.jsx", error: String((e && e.message) || e) }); }

// components/ui/StatusNote.jsx
try { (() => {
const {
  Icon
} = __ds_scope;
const TONES = {
  ok: {
    bg: 'var(--surface-accent-soft)',
    line: 'var(--rosa-mexicano)',
    ink: 'var(--rosa-mexicano)',
    icon: 'check'
  },
  warn: {
    bg: 'var(--surface-dough)',
    line: 'var(--dorado-masa)',
    ink: 'var(--terracota-horno)',
    icon: 'clock'
  },
  block: {
    bg: 'var(--surface-warm-soft)',
    line: 'var(--terracota-horno)',
    ink: 'var(--terracota-horno)',
    icon: 'close'
  }
};

/** A flat status panel: coverage checks, blocked states, confirmations. No shadow, no blur. */
function StatusNote({
  tone = 'ok',
  title,
  children,
  icon,
  style
}) {
  const t = TONES[tone] || TONES.ok;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: t.bg,
      border: `2px solid ${t.line}`,
      borderRadius: 'var(--radius-md)',
      padding: '13px 15px',
      display: 'flex',
      gap: 11,
      alignItems: 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 'none',
      marginTop: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon || t.icon,
    size: 17,
    color: t.ink
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 0
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 13.5,
      color: t.ink,
      lineHeight: 1.3
    }
  }, title), children && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontFamily: 'var(--font-body)',
      fontSize: 12.5,
      lineHeight: 1.55,
      color: 'var(--text-body)',
      marginTop: title ? 4 : 0
    }
  }, children)));
}
Object.assign(__ds_scope, { StatusNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/StatusNote.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DotRow = __ds_scope.DotRow;
__ds_ns.FramedPanel = __ds_scope.FramedPanel;
__ds_ns.Lockup = __ds_scope.Lockup;
__ds_ns.SectionLabel = __ds_scope.SectionLabel;
__ds_ns.SocialTile = __ds_scope.SocialTile;
__ds_ns.Stamp = __ds_scope.Stamp;
__ds_ns.Swatch = __ds_scope.Swatch;
__ds_ns.TapeStripe = __ds_scope.TapeStripe;
__ds_ns.Wordmark = __ds_scope.Wordmark;
__ds_ns.Badge = __ds_scope.Badge;
__ds_ns.Icon = __ds_scope.Icon;
__ds_ns.Button = __ds_scope.Button;
__ds_ns.Field = __ds_scope.Field;
__ds_ns.MenuCard = __ds_scope.MenuCard;
__ds_ns.MenuItem = __ds_scope.MenuItem;
__ds_ns.QtyStepper = __ds_scope.QtyStepper;
__ds_ns.RadioGroup = __ds_scope.RadioGroup;
__ds_ns.StatusNote = __ds_scope.StatusNote;

})();
