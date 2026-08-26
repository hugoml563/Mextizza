import React from 'react';

const TONES = {
  rosa: { background: 'var(--rosa-mexicano)', color: 'var(--blanco)' },
  dorado: { background: 'var(--dorado-masa)', color: 'var(--negro-carbon)' },
  terracota: { background: 'var(--terracota-horno)', color: 'var(--blanco-hueso)' },
  dark: { background: 'var(--negro-carbon)', color: 'var(--blanco-hueso)' },
  quiet: { background: 'transparent', color: 'var(--gris-texto)', border: '1px solid var(--negro-12)' }
};

export function Badge({ children, tone = 'rosa', style }) {
  const t = TONES[tone] || TONES.rosa;
  return (
    <span style={{
      display: 'inline-block', fontFamily: 'var(--font-label)', fontWeight: 400,
      fontSize: 10, letterSpacing: 1, textTransform: 'uppercase', lineHeight: 1,
      padding: '5px 8px', borderRadius: 'var(--radius-sm)', border: 'none', ...t, ...style
    }}>{children}</span>
  );
}
