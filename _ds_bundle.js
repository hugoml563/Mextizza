/* @ds-bundle: {"format":4,"namespace":"MextizzaDesignSystem_8a35ee","components":[{"name":"DotRow","sourcePath":"components/brand/DotRow.jsx"},{"name":"FramedPanel","sourcePath":"components/brand/FramedPanel.jsx"},{"name":"Lockup","sourcePath":"components/brand/Lockup.jsx"},{"name":"SectionLabel","sourcePath":"components/brand/SectionLabel.jsx"},{"name":"SocialTile","sourcePath":"components/brand/SocialTile.jsx"},{"name":"Stamp","sourcePath":"components/brand/Stamp.jsx"},{"name":"Swatch","sourcePath":"components/brand/Swatch.jsx"},{"name":"TapeStripe","sourcePath":"components/brand/TapeStripe.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"Badge","sourcePath":"components/ui/Badge.jsx"},{"name":"Button","sourcePath":"components/ui/Button.jsx"},{"name":"Field","sourcePath":"components/ui/Field.jsx"},{"name":"Icon","sourcePath":"components/ui/Icon.jsx"},{"name":"MenuCard","sourcePath":"components/ui/MenuCard.jsx"},{"name":"MenuItem","sourcePath":"components/ui/MenuItem.jsx"},{"name":"QtyStepper","sourcePath":"components/ui/QtyStepper.jsx"},{"name":"RadioGroup","sourcePath":"components/ui/RadioGroup.jsx"},{"name":"StatusNote","sourcePath":"components/ui/StatusNote.jsx"}],"sourceHashes":{"components/brand/DotRow.jsx":"6a7e320cec05","components/brand/FramedPanel.jsx":"515999104455","components/brand/Lockup.jsx":"fdf13ac932da","components/brand/SectionLabel.jsx":"3f5408c8c8b0","components/brand/SocialTile.jsx":"a93b506def40","components/brand/Stamp.jsx":"01e4aafc26b2","components/brand/Swatch.jsx":"d06477c9d469","components/brand/TapeStripe.jsx":"32a08589f124","components/brand/Wordmark.jsx":"dd6d0d5df13f","components/ui/Badge.jsx":"15b6c81c2f38","components/ui/Button.jsx":"d6f3cce3450c","components/ui/Field.jsx":"18ac925d3c5e","components/ui/Icon.jsx":"2a2c674192d5","components/ui/MenuCard.jsx":"6c2607fbecf8","components/ui/MenuItem.jsx":"b25ae7ba0320","components/ui/QtyStepper.jsx":"7b1a9d74326d","components/ui/RadioGroup.jsx":"6b50b81b2091","components/ui/StatusNote.jsx":"9eceb4795764","docs/doc-page.js":"f52ae9c02fca","ui_kits/DeliveryForm.jsx":"487e0dafe011","ui_kits/app/AppScreens.jsx":"850b68466299","ui_kits/delivery-zone.js":"7970a56fa140","ui_kits/menu-data.js":"ce66b918f699","ui_kits/web/AddonsDialog.jsx":"f45654a4b424","ui_kits/web/CartDrawer.jsx":"6f5cc5b157cd","ui_kits/web/WebSurfaces.jsx":"4990d67f9068"},"inlinedExternals":[],"unexposedExports":[]} */

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
   the peel, the cutter or the five ingredient icons â€” crop them from that file. */
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

// Trazos reales de la marca (extraÃ­dos del SVG oficial "Logo Mextizza letras negras").
// Esta es la marca principal: letras negras, monÃ³tonas, sobre papel.
// M e x t i = Ã­ndices 0â€“4, z z a = 5â€“7. Nunca redibujar estas curvas.
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
  subtitle = 'PizzerÃ­a',
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

// components/ui/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Lucide is a flagged substitution â€” the sources contain no UI icon set.
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
  }, icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === 'lg' ? 20 : 16
  }), children, iconAfter && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconAfter,
    size: size === 'lg' ? 20 : 16
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/Button.jsx", error: String((e && e.message) || e) }); }

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
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
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
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 14
  })));
}
Object.assign(__ds_scope, { QtyStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/ui/QtyStepper.jsx", error: String((e && e.message) || e) }); }

// components/ui/RadioGroup.jsx
try { (() => {
/**
 * A mandatory single-choice group rendered as paper tiles. Nothing is preselected â€”
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
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
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

// docs/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> â€” paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates â€” up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure â€” any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING â€” paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden â€” letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      â€” portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     â€” the same, landscape
 *   width / height              â€” explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22Ã—30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">â€¦one page's designâ€¦</section>
 *     <section class="page" id="p2">â€¦</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size â€” letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export â€”
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it â€” letter and A4 alike â€” without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>â€¦bodyâ€¦</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting â€” the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    â€” letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only â€” it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) â€” set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height â€” the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  â€” printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height â€” browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns â€” only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> â€” browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body â€”
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length â†’ px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject â€” callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding â€” they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that â€” the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    /* Monolithic at print: Blink slices a transform-scaled child at
     * fragmentainer boundaries mapped in UNSCALED layout coordinates
     * (transforms are paint-time), so the .fit box (authored size, e.g.
     * 1400x990) gets cut at the page's free block space and spills onto
     * a second sheet even though its SCALED footprint fits the page by
     * construction. overflow:hidden makes .fit-box a scroll container â€”
     * monolithic under fragmentation (css-break-3) â€” so the scaled
     * content prints atomically on one sheet. No clipping for content
     * within the authored box: .fit-box is calc-sized to exactly the
     * scaled footprint. (Content that bleeds past content-width/height
     * is clipped at the footprint â€” fit mode's contract; it previously
     * painted beyond it at print.) Print-only, so the screen rendering
     * keeps visible overflow for editor affordances.
     * The export path injects the same rule into frozen copies
     * (print-eval.ts om-print-fit-contain). The .fit-mode scope is
     * load-bearing: .fit-box wraps slotted content in EVERY mode, and an
     * unscoped overflow:hidden would make whole flowing documents
     * monolithic (one truncated sheet). overflow:hidden, never clip â€”
     * clip is not a scroll container, so not monolithic. */
    @media print {
      .fit-mode .fit-box { overflow: hidden; }
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it â€” page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps â€” explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero â€” a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours â€”
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed â€” print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio â€”
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order â€” the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share â€” so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all â€” the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog â€” so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design â€” pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size â€” but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) â€” card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists â€” margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins â€” a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content â€” shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view â€” without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner â€” the first connected true-size doc-page â€” and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time â€”
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one â€” take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack â€” content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "docs/doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/DeliveryForm.jsx
try { (() => {
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
   2. a payment method has to be chosen â€” nothing is preselected */
function DeliveryForm({
  compact = false,
  attempted = false,
  onValidChange
}) {
  const [nombre, setNombre] = React.useState('');
  const [tel, setTel] = React.useState('');
  const [calle, setCalle] = React.useState('');
  const [colonia, setColonia] = React.useState('');
  const [horario, setHorario] = React.useState('Lo antes posible (â‰¤30 min)');
  const [pago, setPago] = React.useState(null);
  const digits = tel.replace(/\D/g, '');
  const telOk = digits.length === 10;
  const zona = colonia ? zonaEvaluar(colonia) : null;
  const zonaOk = !!zona && zona.estado === 'dentro';
  const valid = !!nombre.trim() && telOk && !!calle.trim() && zonaOk && !!pago;
  React.useEffect(() => {
    onValidChange && onValidChange(valid);
  }, [valid]);
  const gap = compact ? 12 : 14;
  const tone = zona ? zona.estado === 'dentro' ? 'ok' : zona.estado === 'limite' ? 'warn' : 'block' : 'ok';
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Field, {
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
    hint: attempted && !telOk ? 'Necesitamos 10 dÃ­gitos para confirmarte por WhatsApp.' : 'Te confirmamos el pedido por WhatsApp a este nÃºmero.',
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
    options: ['Lo antes posible (â‰¤30 min)', 'Programar para hoy', 'Programar para maÃ±ana'],
    style: {
      marginTop: gap
    }
  }), /*#__PURE__*/React.createElement(RadioGroup, {
    label: "Forma de pago",
    required: true,
    options: PAGOS,
    value: pago,
    onChange: setPago,
    columns: compact ? 1 : 3,
    invalid: attempted && !pago,
    hint: attempted && !pago ? 'Elige una forma de pago para continuar.' : 'Se cobra al entregar. El envÃ­o ya estÃ¡ incluido en el precio.',
    style: {
      marginTop: gap + 4
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Notas",
    as: "textarea",
    rows: 2,
    placeholder: "Sin cebolla, timbre 2",
    style: {
      marginTop: gap
    }
  }));
}
Object.assign(window, {
  DeliveryForm,
  PAGOS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/DeliveryForm.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/AppScreens.jsx
try { (() => {
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
  Icon
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

/* Phone frame â€” 390x844, the app's design viewport. */
function Phone({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
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
  const tabs = [['menu', 'bag', 'MenÃº'], ['pedido', 'cart', 'Pedido'], ['seguir', 'clock', 'Seguir'], ['perfil', 'user', 'Perfil']];
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
        color: on ? 'var(--rosa-mexicano)' : 'var(--gris-texto)'
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
  }, MEXTIZZA_FACTS.estilo, ". Entregamos en Lomas Lindas y colonias vecinas.")), /*#__PURE__*/React.createElement("div", {
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
  }, "Entrar con mi n\xFAmero"), /*#__PURE__*/React.createElement(Button, {
    tone: "outline",
    size: "lg",
    block: true,
    icon: "whatsapp"
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
  }, "Lomas Lindas \xB7 llega en ~30 min"))), /*#__PURE__*/React.createElement(TapeStripe, {
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
      color: 'var(--rosa-mexicano)',
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
      tone: added === it.id ? 'dark' : 'outline',
      onClick: () => onAdd(it)
    }, added === it.id ? 'âœ“' : '+')
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
      width: 38,
      height: 38,
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
      color: 'var(--rosa-mexicano)'
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
      width: 34,
      height: 34,
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
      color: 'var(--rosa-mexicano)'
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
      size: 34
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
  }, chosen.length ? chosen.length + (chosen.length === 1 ? ' complemento' : ' complementos') + ' Â· +$' + addonTotal : 'Sin complementos'), /*#__PURE__*/React.createElement("span", {
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
  count
}) {
  const subtotal = lines.reduce((s, l) => s + (l.price + (l.addonTotal || 0)) * l.qty, 0);
  const [ready, setReady] = React.useState(false);
  const [attempted, setAttempted] = React.useState(false);
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
      size: 36
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
      color: 'var(--rosa-mexicano)',
      marginBottom: 12
    }
  }, "Entrega y pago"), /*#__PURE__*/React.createElement(DeliveryForm, {
    compact: true,
    attempted: attempted,
    onValidChange: setReady
  }))), lines.length > 0 && /*#__PURE__*/React.createElement("div", {
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
    onClick: () => ready ? onConfirm() : setAttempted(true)
  }, `Confirmar Â· $${subtotal}`), !ready && /*#__PURE__*/React.createElement("p", {
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
function AppTracking({
  tab,
  onTab,
  count
}) {
  const steps = [['Confirmado', 'Recibimos tu pedido', true], ['En el horno', 'Gozney XL Â· â‰¤10 min', true], ['En camino', 'Mandadito asignado', false], ['Entregado', '', false]];
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
    tone: "dorado"
  }, "Pedido #1042"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 32,
      marginTop: 12
    }
  }, "Llega 20:10"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      color: 'var(--text-muted)',
      marginTop: 6
    }
  }, "Estimado 28 min \xB7 radio de 3 km")), /*#__PURE__*/React.createElement(TapeStripe, {
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
  }, d)))), /*#__PURE__*/React.createElement(FramedPanel, {
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
Object.assign(window, {
  Phone,
  StatusBar,
  TabBar,
  AppWelcome,
  AppMenu,
  AppDetail,
  AppAddons,
  AppCart,
  AppTracking
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/AppScreens.jsx", error: String((e && e.message) || e) }); }

// ui_kits/delivery-zone.js
try { (() => {
// Zona de reparto Mextizza â€” dark kitchen en Col. Lomas Lindas, AtizapÃ¡n de Zaragoza.
// La cocina estÃ¡ en CP 52947; el plan de negocios fija un radio de reparto de 3 km.
// Las coordenadas de las colonias son aproximadas (centroide de la colonia) y sirven
// para validar cobertura en el prototipo. En producciÃ³n esto se resuelve geocodificando
// la direcciÃ³n capturada y midiendo contra el mismo centro y el mismo radio.
const MEXTIZZA_ZONE = {
  centro: {
    lat: 19.5453,
    lng: -99.2745,
    nombre: 'Lomas Lindas, AtizapÃ¡n de Zaragoza'
  },
  radioKm: 3,
  // cobertura normal â€” el envÃ­o ya viene incluido en el precio
  radioMaximoKm: 5,
  // franja de excepciÃ³n: sÃ³lo con confirmaciÃ³n por WhatsApp
  colonias: [{
    name: 'Lomas Lindas',
    lat: 19.5453,
    lng: -99.2745
  }, {
    name: 'Villas de la Hacienda',
    lat: 19.5492,
    lng: -99.2791
  }, {
    name: 'Las Alamedas',
    lat: 19.5531,
    lng: -99.2679
  }, {
    name: 'Bulevares',
    lat: 19.5399,
    lng: -99.2662
  }, {
    name: 'Lomas de AtizapÃ¡n',
    lat: 19.5568,
    lng: -99.2829
  }, {
    name: 'Adolfo LÃ³pez Mateos (centro)',
    lat: 19.5561,
    lng: -99.2603
  }, {
    name: 'Calacoaya',
    lat: 19.5291,
    lng: -99.2571
  }, {
    name: 'Fuentes de SatÃ©lite',
    lat: 19.5312,
    lng: -99.2471
  }, {
    name: 'Hacienda de Valle Escondido',
    lat: 19.5721,
    lng: -99.3048
  }, {
    name: 'Lomas Verdes',
    lat: 19.5171,
    lng: -99.2351
  }, {
    name: 'Ciudad SatÃ©lite',
    lat: 19.5101,
    lng: -99.2382
  }, {
    name: 'Condado de Sayavedra',
    lat: 19.6062,
    lng: -99.3211
  }, {
    name: 'Echegaray',
    lat: 19.4891,
    lng: -99.2338
  }, {
    name: 'Interlomas',
    lat: 19.3952,
    lng: -99.2812
  }]
};
function zonaDistanciaKm(lat, lng) {
  const R = 6371,
    rad = d => d * Math.PI / 180;
  const dLat = rad(lat - MEXTIZZA_ZONE.centro.lat);
  const dLng = rad(lng - MEXTIZZA_ZONE.centro.lng);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(MEXTIZZA_ZONE.centro.lat)) * Math.cos(rad(lat)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.asin(Math.sqrt(a)) * 10) / 10;
}

/** â†’ { colonia, km, estado: 'dentro' | 'limite' | 'fuera', titulo, detalle } | null */
function zonaEvaluar(nombreColonia) {
  const c = MEXTIZZA_ZONE.colonias.find(x => x.name === nombreColonia);
  if (!c) return null;
  const km = zonaDistanciaKm(c.lat, c.lng);
  if (km <= MEXTIZZA_ZONE.radioKm) return {
    colonia: c.name,
    km,
    estado: 'dentro',
    titulo: 'Dentro del radio de reparto',
    detalle: `A ${km} km de la cocina. Llega en 30 minutos o menos, con el envÃ­o ya incluido en el precio.`
  };
  if (km <= MEXTIZZA_ZONE.radioMaximoKm) return {
    colonia: c.name,
    km,
    estado: 'limite',
    titulo: 'Fuera del radio, en zona de excepciÃ³n',
    detalle: `A ${km} km â€” el radio es de ${MEXTIZZA_ZONE.radioKm} km. No podemos procesar el pedido en automÃ¡tico; escrÃ­benos por WhatsApp y lo confirmamos a mano.`
  };
  return {
    colonia: c.name,
    km,
    estado: 'fuera',
    titulo: 'Fuera de la zona de reparto',
    detalle: `A ${km} km de la cocina, muy lejos del radio de ${MEXTIZZA_ZONE.radioKm} km. TodavÃ­a no llegamos hasta allÃ¡.`
  };
}
Object.assign(window, {
  MEXTIZZA_ZONE,
  zonaDistanciaKm,
  zonaEvaluar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/delivery-zone.js", error: String((e && e.message) || e) }); }

// ui_kits/menu-data.js
try { (() => {
// Canonical menu â€” transcribed verbatim from the delivered menu sheet.
// `photo` paths are relative to a page in ui_kits/<kit>/. Only four dishes have real
// photography so far; the rest deliberately carry none â€” no stand-ins.
// (assets/menu-mextizza.png). Names, descriptions and prices are the real ones;
// do not substitute values from the business plan or the BOM.
// El envÃ­o YA estÃ¡ considerado en el precio de cada pizza: ninguna superficie cobra
// envÃ­o aparte ni lo desglosa como lÃ­nea.
const MEXTIZZA_MENU = [{
  cat: 'Del horno',
  title: 'Pizzas',
  note: 'Todas nuestras pizzas estÃ¡n hechas en horno de piedra, con una masa fermentada en frÃ­o 48 horas.',
  items: [{
    id: 'serranita',
    name: 'Pizza Serranita',
    desc: 'JamÃ³n Serrano, arÃºgula fresca, queso parmesano y salsa de tomate artesanal.',
    price: 229,
    photo: '../../assets/photos/pizza-serranita.jpeg'
  }, {
    id: 'aloha',
    name: 'Pizza Aloha',
    desc: 'La clÃ¡sica que divide opiniones, jamÃ³n, piÃ±a y salsa de tomate artesanal. Sin pena.',
    price: 189
  }, {
    id: 'newyork',
    name: 'Pizza Newyork',
    desc: 'Salsa de tomate artesanal a la vodka con crema. Una capa de sabor que no vas a adivinar a la primera mordida.',
    price: 199,
    photo: '../../assets/photos/pizza-newyork.jpeg'
  }, {
    id: 'provola',
    name: 'Pizza Provola',
    desc: 'Doble queso, doble provolone. Simple y por eso funciona.',
    price: 229,
    photo: '../../assets/photos/pizza-provola.jpeg'
  }, {
    id: 'chisi',
    name: 'Pizza Chisi',
    desc: 'Queso monterrey, provolone, parmesano y un toque de gorgonzolaâ€¦ Para los que no negocian con el queso.',
    price: 219,
    photo: '../../assets/photos/pizza-chisi.jpeg'
  }, {
    id: 'combinada',
    name: 'Pizza Combinada',
    desc: 'JamÃ³n, champiÃ±ones, pimiento y cebolla. Para los que quieren un poco de todo.',
    price: 229
  }, {
    id: 'roni',
    name: 'Pizza Roni',
    desc: 'Peperoni clÃ¡sico, sin vueltas. La que pides cuando ya sabes lo que quieres.',
    price: 189
  }, {
    id: 'traviesa',
    name: 'Pizza Traviesa',
    desc: 'Peperoni con un toque de miel picanteâ€¦ dulce, picante y un poco atrevida.',
    price: 199
  }]
}, {
  cat: 'Rotativa',
  title: 'Pizza especial del mes',
  note: 'Una sola pizza rota cada mes. Ã‰sta es la de ahora.',
  items: [{
    id: 'cochinita',
    name: 'Pizza Cochinita',
    desc: 'Lo que le da nombre a la casa: cochinita pibil, frijoles refritos y cebolla morada.',
    price: 229,
    flag: 'Del mes'
  }]
}, {
  cat: 'Para cerrar',
  title: 'Postres y bebidas',
  items: [{
    id: 'chocolatoso',
    name: 'Brownie',
    desc: '',
    price: 40
  }, {
    id: 'refresco-coca',
    name: 'Refresco Coca-Cola',
    desc: '600 ml',
    price: 35
  }, {
    id: 'refresco-sprite',
    name: 'Refresco Sprite',
    desc: '600 ml',
    price: 35
  }, {
    id: 'agua',
    name: 'Agua Mineral',
    desc: '',
    price: 35
  }]
}];
// Complementos por pizza. Los precios son INFERIDOS del BOM (costo de insumo x margen
// del plan) y estÃ¡n pendientes de confirmar con los fundadores.
const MEXTIZZA_ADDONS = [{
  id: 'queso',
  title: 'MÃ¡s queso',
  note: 'Se agrega antes del horno.',
  items: [{
    id: 'mozzarella',
    name: 'Doble mozzarella',
    price: 35
  }, {
    id: 'provolone',
    name: 'Doble provolone',
    price: 45
  }, {
    id: 'gorgonzola',
    name: 'Gorgonzola',
    price: 50
  }, {
    id: 'parmesano',
    name: 'Parmesano en hojuelas',
    price: 40
  }]
}, {
  id: 'carne',
  title: 'MÃ¡s carne',
  items: [{
    id: 'peperoni',
    name: 'Peperoni extra',
    price: 45
  }, {
    id: 'jamon',
    name: 'JamÃ³n',
    price: 35
  }, {
    id: 'serrano',
    name: 'JamÃ³n serrano',
    price: 65
  }, {
    id: 'cochinita-add',
    name: 'Cochinita pibil',
    price: 60
  }]
}, {
  id: 'verdura',
  title: 'Verduras',
  items: [{
    id: 'champinones',
    name: 'ChampiÃ±ones',
    price: 30
  }, {
    id: 'pimiento',
    name: 'Pimiento',
    price: 25
  }, {
    id: 'morada',
    name: 'Cebolla morada',
    price: 20
  }, {
    id: 'arugula',
    name: 'ArÃºgula fresca',
    price: 30
  }]
}, {
  id: 'toque',
  title: 'El Ãºltimo toque',
  note: 'Va encima al salir del horno.',
  items: [{
    id: 'miel',
    name: 'Miel picante',
    price: 20
  }, {
    id: 'vodka',
    name: 'Salsa a la vodka',
    price: 35
  }, {
    id: 'orilla',
    name: 'Orilla rellena de queso',
    price: 55
  }]
}];
const MEXTIZZA_FACTS = {
  envioIncluido: true,
  radio: '3 km Â· hasta 30 min puerta a puerta',
  fermento: 'FermentaciÃ³n frÃ­a de 48 horas',
  estilo: 'Horno de piedra, masa fermentada en frÃ­o 48 horas',
  catering: {
    precio: 235,
    min: 20,
    max: 30,
    anticipo: '30%',
    aviso: '4 dÃ­as'
  },
  zona: 'Col. Lomas Lindas, AtizapÃ¡n de Zaragoza'
};
Object.assign(window, {
  MEXTIZZA_MENU,
  MEXTIZZA_ADDONS,
  MEXTIZZA_FACTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/menu-data.js", error: String((e && e.message) || e) }); }

// ui_kits/web/AddonsDialog.jsx
try { (() => {
const {
  TapeStripe,
  FramedPanel,
  Button,
  Badge,
  QtyStepper,
  Icon
} = window.MextizzaDesignSystem_8a35ee;

/* Complementos picker â€” opens when a pizza is added from the menu. */
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
      color: 'var(--rosa-mexicano)'
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
      color: 'var(--rosa-mexicano)',
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
  }, chosen.length ? chosen.length + (chosen.length === 1 ? ' complemento Â· +$' : ' complementos Â· +$') + addonTotal : 'Sin complementos'), /*#__PURE__*/React.createElement(Button, {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/AddonsDialog.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/CartDrawer.jsx
try { (() => {
const {
  Wordmark,
  TapeStripe,
  FramedPanel,
  Button,
  Badge,
  Field,
  QtyStepper,
  MenuItem,
  Icon
} = window.MextizzaDesignSystem_8a35ee;
function CartDrawer({
  open,
  lines,
  onClose,
  onQty,
  step,
  setStep
}) {
  const [ready, setReady] = React.useState(false);
  const [attempted, setAttempted] = React.useState(false);
  const subtotal = lines.reduce((s, l) => s + (l.price + (l.addonTotal || 0)) * l.qty, 0);
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
  }, step === 'cart' ? 'Tu pedido' : step === 'checkout' ? 'Entrega' : 'Confirmado'), /*#__PURE__*/React.createElement("button", {
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
  }, "Tu pedido est\xE1 vac\xEDo. Agrega algo del men\xFA.")), step === 'checkout' && /*#__PURE__*/React.createElement(DeliveryForm, {
    attempted: attempted,
    onValidChange: setReady
  }), step === 'done' && /*#__PURE__*/React.createElement(FramedPanel, {
    variant: "object",
    style: {
      marginTop: 8,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 32,
    color: "var(--rosa-mexicano)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 24
    }
  }, "Pedido confirmado"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--text-muted)'
    }
  }, "Entra al horno en cuanto lo confirmemos por WhatsApp. Llega en 30 minutos o menos."), /*#__PURE__*/React.createElement(Badge, {
    tone: "dark"
  }, "Pedido #1042")))), step !== 'done' && lines.length > 0 && /*#__PURE__*/React.createElement("div", {
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
    onClick: () => {
      if (step === 'cart') return setStep('checkout');
      if (!ready) return setAttempted(true);
      setStep('done');
    }
  }, step === 'cart' ? 'Continuar' : 'Confirmar pedido'), step === 'checkout' && !ready && /*#__PURE__*/React.createElement("p", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/CartDrawer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/web/WebSurfaces.jsx
try { (() => {
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
  Icon
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
  view
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: 'var(--surface-page)',
      position: 'sticky',
      top: 0,
      zIndex: 5,
      borderBottom: 'var(--border-paper)'
    }
  }, /*#__PURE__*/React.createElement("div", {
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
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 30
    }
  }, [['menu', 'MenÃº'], ['proceso', 'La masa'], ['catering', 'Catering']].map(([k, l]) => /*#__PURE__*/React.createElement("a", {
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
      color: view === k ? 'var(--rosa-mexicano)' : 'var(--negro-carbon)',
      borderBottom: view === k ? '2px solid var(--rosa-mexicano)' : '2px solid transparent',
      paddingBottom: 2
    }
  }, l)), /*#__PURE__*/React.createElement("button", {
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
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)',
      paddingTop: 72,
      paddingBottom: 84
    }
  }, /*#__PURE__*/React.createElement("div", {
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
      color: 'var(--rosa-mexicano)',
      marginBottom: 20
    }
  }, "T\xE9cnica italiana \xB7 Alma mexicana"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(40px, 5vw, 68px)',
      lineHeight: 1.06,
      color: 'var(--negro-carbon)',
      letterSpacing: 1
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
  }, MEXTIZZA_FACTS.estilo, ". Dark kitchen en ", MEXTIZZA_FACTS.zona, " \u2014 s\xF3lo entrega, sin sal\xF3n."), /*#__PURE__*/React.createElement("div", {
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
    icon: "whatsapp"
  }, "Pedir por WhatsApp")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      marginTop: 40,
      flexWrap: 'wrap'
    }
  }, [['clock', MEXTIZZA_FACTS.radio], ['flame', 'Horno Gozney XL'], ['pin', 'Radio de 3 km']].map(([ic, t]) => /*#__PURE__*/React.createElement("span", {
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
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/photos/pizza-serranita.jpeg",
    alt: "Pizza Serranita reci\xE9n salida del horno de piedra",
    style: {
      width: '100%',
      aspectRatio: '4/5',
      objectFit: 'cover',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-raised)'
    }
  }), /*#__PURE__*/React.createElement("div", {
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
    style: {
      background: 'var(--surface-sunken)',
      paddingTop: 76,
      paddingBottom: 76
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: webShell.page
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Men\xFA \u2014 horno de piedra, masa de 48 h \xB7 env\xEDo incluido"), /*#__PURE__*/React.createElement("div", {
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
  const steps = [['48h', 'FermentaciÃ³n frÃ­a', 'La masa descansa dos dÃ­as completos en refrigeraciÃ³n con temperatura controlada. Rompe azÃºcares y gluten.'], ['â‰¤10 min', 'Al horno, al pedido', 'Nada se hornea antes de que entre tu pedido. El Gozney XL cocina cada pizza en menos de diez minutos.'], ['â‰¤30 min', 'A tu puerta', 'Radio de reparto de 3 km. Caja kraft con ventilaciÃ³n para que la orilla llegue crujiente.']];
  return /*#__PURE__*/React.createElement("section", {
    id: "proceso",
    style: {
      background: 'var(--surface-page)',
      padding: '76px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: webShell.page
  }, /*#__PURE__*/React.createElement(SectionLabel, {
    color: "var(--rosa-mexicano)"
  }, "El proceso es el argumento"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: 24
    }
  }, steps.map(([n, t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
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
  return /*#__PURE__*/React.createElement("section", {
    id: "catering",
    style: {
      background: 'var(--surface-page)',
      paddingBottom: 76
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: webShell.page
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "Catering de fin de semana"), /*#__PURE__*/React.createElement("div", {
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
  }, [['Por persona', '$' + c.precio], ['MÃ­nimo', c.min + ' personas'], ['MÃ¡ximo', c.max + ' personas'], ['Anticipo', c.anticipo], ['AnticipaciÃ³n', c.aviso]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
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
  }, "Solicitar fecha"), /*#__PURE__*/React.createElement(Field, {
    label: "Nombre",
    placeholder: "Tu nombre"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Personas",
    as: "select",
    options: ['20 personas', '22 personas', '25 personas', '30 personas'],
    style: {
      marginTop: 12
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Fecha del evento",
    placeholder: "dd / mm / aaaa",
    hint: `Necesitamos ${c.aviso} de anticipaciÃ³n mÃ­nima.`,
    style: {
      marginTop: 12
    }
  }), /*#__PURE__*/React.createElement(Button, {
    tone: "warm",
    block: true,
    style: {
      marginTop: 18
    }
  }, "Solicitar cotizaci\xF3n")))));
}
function WebSocial() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)',
      paddingBottom: 76
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: webShell.page
  }, /*#__PURE__*/React.createElement(SectionLabel, null, "En redes"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4,1fr)',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(SocialTile, {
    treatment: "flat",
    background: "var(--negro-carbon)",
    headlineColor: "var(--blanco-hueso)",
    headline: /*#__PURE__*/React.createElement(React.Fragment, null, "48 horas", /*#__PURE__*/React.createElement("br", null), "de fermento"),
    kicker: "Horno de piedra",
    kickerColor: "var(--dorado-masa)"
  }), /*#__PURE__*/React.createElement(SocialTile, {
    treatment: "flat",
    background: "var(--rosa-mexicano)",
    headlineColor: "var(--blanco)",
    headline: /*#__PURE__*/React.createElement(React.Fragment, null, "Hecha por", /*#__PURE__*/React.createElement("br", null), "mexicanos"),
    kicker: "Con t\xE9cnica italiana",
    kickerColor: "var(--blanco)"
  }), /*#__PURE__*/React.createElement(SocialTile, {
    treatment: "flat",
    background: "var(--terracota-horno)",
    headlineColor: "var(--blanco-hueso)",
    headline: /*#__PURE__*/React.createElement(React.Fragment, null, "Pizza", /*#__PURE__*/React.createElement("br", null), "Cochinita"),
    kicker: "Especial del mes",
    kickerColor: "var(--dorado-tinte)"
  }), /*#__PURE__*/React.createElement(SocialTile, {
    treatment: "flat",
    background: "var(--dorado-masa)",
    headlineColor: "var(--negro-carbon)",
    headline: /*#__PURE__*/React.createElement(React.Fragment, null, "Radio", /*#__PURE__*/React.createElement("br", null), "3 km"),
    kicker: "30 min o menos",
    kickerColor: "var(--negro-carbon)"
  }))));
}
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
    style: {
      ...webShell.page,
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr',
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
  })), [['Pedidos', ['WhatsApp Business', 'Sitio web', 'App Mextizza']], ['OperaciÃ³n', [MEXTIZZA_FACTS.zona, 'Radio de 3 km', 'SÃ³lo entrega â€” sin salÃ³n']]].map(([t, items]) => /*#__PURE__*/React.createElement("div", {
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
  }, t), items.map(i => /*#__PURE__*/React.createElement("div", {
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
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/web/WebSurfaces.jsx", error: String((e && e.message) || e) }); }

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

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.MenuCard = __ds_scope.MenuCard;

__ds_ns.MenuItem = __ds_scope.MenuItem;

__ds_ns.QtyStepper = __ds_scope.QtyStepper;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.StatusNote = __ds_scope.StatusNote;

})();
