import React from 'react';

const DEFAULT_DOTS = ['var(--rosa-mexicano)', 'var(--terracota-horno)', 'var(--dorado-masa)', 'var(--gris-asfalto)', 'var(--negro-carbon)'];

export function DotRow({ colors = DEFAULT_DOTS, size = 16, gap = 10, style }) {
  return (
    <div style={{ display: 'flex', gap, ...style }}>
      {colors.map((c, i) => (
        <span key={i} style={{ width: size, height: size, borderRadius: '50%', background: c, boxShadow: 'var(--ring-dot)' }} />
      ))}
    </div>
  );
}
