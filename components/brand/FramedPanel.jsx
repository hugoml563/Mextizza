import React from 'react';

const VARIANTS = {
  object: { background: 'var(--surface-card)', border: 'var(--border-frame)', borderRadius: 'var(--radius-md)', color: 'var(--text-body)' },
  info: { background: 'var(--surface-card)', border: 'var(--border-paper)', borderRadius: 'var(--radius-md)', color: 'var(--text-body)', boxShadow: 'var(--shadow-soft)' },
  paper: { background: 'var(--surface-sunken)', border: 'none', borderRadius: 'var(--radius-lg)', color: 'var(--text-body)' },
  hero: { background: 'var(--surface-inverse)', border: 'none', borderRadius: 'var(--radius-lg)', color: 'var(--text-on-inverse)' }
};

export function FramedPanel({ variant = 'object', tape, padding, children, style }) {
  const v = VARIANTS[variant] || VARIANTS.object;
  const pad = padding || (variant === 'hero' ? 'var(--pad-hero)' : variant === 'info' ? 'var(--pad-card)' : 'var(--pad-frame)');
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: pad, ...v, ...style }}>
      {tape && <div aria-hidden="true" style={{ position: 'absolute', left: 0, right: 0, [tape]: 0, height: 10, background: 'var(--stripe-tape)' }} />}
      {children}
    </div>
  );
}
