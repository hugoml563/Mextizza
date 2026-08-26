import React from 'react';

export function Swatch({ name, hex, note, fill, height = 120, style }) {
  return (
    <div style={{ borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: 'var(--border-hairline)', ...style }}>
      <div style={{ height, background: fill || hex }} />
      <div style={{ background: 'var(--surface-card)', padding: 'var(--pad-swatch-label)' }}>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>{name}</div>
        <div style={{ font: 'var(--type-mono)', color: 'var(--text-muted)', marginTop: 2 }}>{hex}</div>
        {note && <div style={{ fontFamily: 'var(--font-body)', fontSize: 11.5, color: 'var(--text-muted)', marginTop: 6, lineHeight: 1.4 }}>{note}</div>}
      </div>
    </div>
  );
}
