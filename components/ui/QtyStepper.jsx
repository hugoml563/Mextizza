import React from 'react';
import { Icon } from './Icon.jsx';

export function QtyStepper({ value = 1, min = 1, max = 20, onChange, size = 32, style }) {
  const step = (d) => { const n = Math.min(max, Math.max(min, value + d)); if (n !== value && onChange) onChange(n); };
  const btn = (enabled) => ({
    width: size, height: size, display: 'grid', placeItems: 'center',
    background: 'transparent', border: 'none', borderRadius: 'var(--radius-sm)',
    color: enabled ? 'var(--negro-carbon)' : 'var(--negro-12)',
    cursor: enabled ? 'pointer' : 'not-allowed',
    transition: 'background var(--dur-fast) var(--ease-standard)'
  });
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center',
      border: '1px solid var(--negro-12)', borderRadius: 'var(--radius-sm)',
      background: 'var(--surface-card)', ...style
    }}>
      <button type="button" aria-label="Quitar uno" onClick={() => step(-1)} disabled={value <= min} style={btn(value > min)}>
        <Icon name="minus" size={14} />
      </button>
      <span style={{
        minWidth: 26, textAlign: 'center', fontFamily: 'var(--font-body)',
        fontWeight: 700, fontSize: 14, color: 'var(--text-body)'
      }}>{value}</span>
      <button type="button" aria-label="Agregar uno" onClick={() => step(1)} disabled={value >= max} style={btn(value < max)}>
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}
