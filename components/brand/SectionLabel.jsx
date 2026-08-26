import React from 'react';

export function SectionLabel({ children, color = 'var(--negro-carbon)', rule = true, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 11,
      letterSpacing: 1, textTransform: 'uppercase', color,
      marginBottom: 20, ...style
    }}>
      {children}
      {rule && <span style={{ flex: 1, height: 2, background: 'var(--negro-carbon)', opacity: 0.15 }} />}
    </div>
  );
}
