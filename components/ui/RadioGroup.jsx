import React from 'react';

/**
 * A mandatory single-choice group rendered as paper tiles. Nothing is preselected —
 * the caller must treat `value == null` as an incomplete form.
 */
export function RadioGroup({ label, options = [], value, onChange, required = false, invalid = false, hint, columns, style }) {
  const cols = columns || Math.min(options.length, 3);
  return (
    <div style={style}>
      {label && (
        <span style={{
          display: 'block', fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1,
          textTransform: 'uppercase', color: 'var(--negro-carbon)', marginBottom: 7
        }}>{label}{required && <span style={{ color: 'var(--rosa-mexicano)', marginLeft: 4 }}>*</span>}</span>
      )}
      <div role="radiogroup" aria-label={label} style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},1fr)`, gap: 8 }}>
        {options.map(o => {
          const opt = typeof o === 'string' ? { value: o, label: o } : o;
          const on = value === opt.value;
          return (
            <button key={opt.value} type="button" role="radio" aria-checked={on}
              onClick={() => onChange && onChange(opt.value)} style={{
                minHeight: 48, padding: '10px 12px', cursor: 'pointer', textAlign: 'left',
                background: on ? 'var(--surface-accent-soft)' : 'var(--surface-card)',
                border: on ? '2px solid var(--rosa-mexicano)'
                  : invalid ? '1px solid var(--terracota-horno)' : '1px solid var(--negro-12)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex', alignItems: 'center', gap: 9
              }}>
              <span style={{
                width: 16, height: 16, flex: 'none', borderRadius: '50%',
                border: on ? '5px solid var(--rosa-mexicano)' : '2px solid var(--negro-12)'
              }} />
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: on ? 700 : 500, fontSize: 13,
                color: 'var(--text-body)', lineHeight: 1.25
              }}>{opt.label}</span>
            </button>
          );
        })}
      </div>
      {hint && <span style={{
        display: 'block', fontFamily: 'var(--font-body)', fontSize: 11.5, marginTop: 7,
        color: invalid ? 'var(--terracota-horno)' : 'var(--text-muted)'
      }}>{hint}</span>}
    </div>
  );
}
