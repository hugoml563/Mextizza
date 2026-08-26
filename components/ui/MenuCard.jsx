import React from 'react';

export function MenuCard({ kicker, title, headBackground = 'var(--negro-carbon)', children, style }) {
  return (
    <div style={{
      background: 'var(--surface-card)', borderRadius: 'var(--radius-md)', overflow: 'hidden',
      border: 'var(--border-paper)', boxShadow: 'var(--shadow-soft)', ...style
    }}>
      <div style={{ background: headBackground, padding: 'var(--pad-card)', color: 'var(--blanco)' }}>
        {kicker && <div style={{
          fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: 'var(--dorado-masa)'
        }}>{kicker}</div>}
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 26, marginTop: 5, lineHeight: 1.2 }}>{title}</h3>
      </div>
      <div style={{ padding: 'var(--pad-card)' }}>{children}</div>
    </div>
  );
}
