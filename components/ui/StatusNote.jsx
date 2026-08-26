import React from 'react';
import { Icon } from './Icon.jsx';

const TONES = {
  ok: { bg: 'var(--surface-accent-soft)', line: 'var(--rosa-mexicano)', ink: 'var(--rosa-mexicano)', icon: 'check' },
  warn: { bg: 'var(--surface-dough)', line: 'var(--dorado-masa)', ink: 'var(--terracota-horno)', icon: 'clock' },
  block: { bg: 'var(--surface-warm-soft)', line: 'var(--terracota-horno)', ink: 'var(--terracota-horno)', icon: 'close' }
};

/** A flat status panel: coverage checks, blocked states, confirmations. No shadow, no blur. */
export function StatusNote({ tone = 'ok', title, children, icon, style }) {
  const t = TONES[tone] || TONES.ok;
  return (
    <div style={{
      background: t.bg, border: `2px solid ${t.line}`, borderRadius: 'var(--radius-md)',
      padding: '13px 15px', display: 'flex', gap: 11, alignItems: 'flex-start', ...style
    }}>
      <span style={{ flex: 'none', marginTop: 1 }}><Icon name={icon || t.icon} size={17} color={t.ink} /></span>
      <span style={{ minWidth: 0 }}>
        {title && <span style={{
          display: 'block', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13.5,
          color: t.ink, lineHeight: 1.3
        }}>{title}</span>}
        {children && <span style={{
          display: 'block', fontFamily: 'var(--font-body)', fontSize: 12.5, lineHeight: 1.55,
          color: 'var(--text-body)', marginTop: title ? 4 : 0
        }}>{children}</span>}
      </span>
    </div>
  );
}
