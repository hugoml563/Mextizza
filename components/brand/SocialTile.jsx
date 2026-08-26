import React from 'react';

export function SocialTile({ headline, kicker, treatment = 'diagonal', background = 'var(--terracota-horno)', headlineColor, kickerColor = 'var(--blanco-hueso)', style }) {
  const diagonal = treatment === 'diagonal';
  return (
    <div style={{
      aspectRatio: '1', position: 'relative', overflow: 'hidden',
      borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: diagonal ? 'var(--gris-asfalto)' : background, ...style
    }}>
      {diagonal && <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'var(--split-diagonal)', opacity: 0.9 }} />}
      <div style={{ position: 'relative', textAlign: 'center', padding: 24 }}>
        <div style={{
          fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 24, lineHeight: 1.3,
          textTransform: 'uppercase', color: headlineColor || (diagonal ? 'var(--blanco)' : 'var(--dorado-masa)')
        }}>{headline}</div>
        {kicker && <div style={{
          fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 12, letterSpacing: 2,
          textTransform: 'uppercase', color: kickerColor, marginTop: 10
        }}>{kicker}</div>}
      </div>
    </div>
  );
}
