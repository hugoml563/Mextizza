import React from 'react';

/* The founders' own artwork, cut out of assets/logo-letras-negras.png. Never redraw
   the peel, the cutter or the five ingredient icons — crop them from that file. */
const ART = {
  pala: { negro: 'assets/lockup-pala.png', hueso: 'assets/lockup-pala-hueso.png', ratio: 733 / 306, lettersOfHeight: 0.41 },
  completo: { negro: 'assets/lockup-completo.png', hueso: 'assets/lockup-completo-hueso.png', ratio: 733 / 421, lettersOfHeight: 0.30 },
  ingredientes: { negro: 'assets/ingredientes.png', hueso: 'assets/ingredientes.png', ratio: 535 / 102, lettersOfHeight: 1 }
};

/**
 * The illustrated lockup: letters with the peel and cutter above (`pala`), the same plus
 * the five ingredient icons below (`completo`), or the ingredient strip on its own.
 */
export function Lockup({ variant = 'pala', tone = 'negro', size = 44, base = '', subtitle, tagline, align = 'center', style }) {
  const art = ART[variant] || ART.pala;
  const height = size / art.lettersOfHeight;
  const inkColor = tone === 'hueso' ? 'var(--blanco-hueso)' : 'var(--negro-carbon)';
  return (
    <div style={{ textAlign: align, ...style }}>
      <img src={base + art[tone === 'hueso' ? 'hueso' : 'negro']} alt="Mextizza"
        style={{ height, width: height * art.ratio, display: align === 'left' ? 'block' : 'inline-block' }} />
      {subtitle && <div style={{
        fontFamily: 'var(--font-body)', fontSize: Math.max(11, size * 0.24), letterSpacing: Math.max(4, size * 0.14),
        textTransform: 'uppercase', color: inkColor, opacity: 0.6, marginTop: 10
      }}>{subtitle}</div>}
      {tagline && <div style={{
        fontFamily: 'var(--font-label)', fontSize: 12, letterSpacing: 2, textTransform: 'uppercase',
        color: 'var(--terracota-horno)', marginTop: 14, lineHeight: 1.3
      }}>{tagline}</div>}
    </div>
  );
}
