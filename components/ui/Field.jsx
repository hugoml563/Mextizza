import React from 'react';

export function Field({ label, hint, as = 'input', type = 'text', options = [], value, onChange, placeholder, rows = 3, required = false, invalid = false, id, style }) {
  const [focus, setFocus] = React.useState(false);
  const fid = id || `f-${label ? label.replace(/\s+/g, '-').toLowerCase() : 'field'}`;
  const control = {
    width: '100%', fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-body)',
    background: 'var(--surface-card)',
    border: invalid ? '1px solid var(--terracota-horno)' : focus ? '1px solid var(--rosa-mexicano)' : '1px solid var(--negro-12)',
    borderRadius: 'var(--radius-sm)', padding: '11px 12px', outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : 'none',
    transition: 'border-color var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)'
  };
  const bind = {
    id: fid, value, onChange, placeholder, style: control, required,
    'aria-invalid': invalid || undefined,
    onFocus: () => setFocus(true), onBlur: () => setFocus(false)
  };
  return (
    <label htmlFor={fid} style={{ display: 'block', ...style }}>
      {label && <span style={{
        display: 'block', fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: 1,
        textTransform: 'uppercase', color: 'var(--negro-carbon)', marginBottom: 7
      }}>{label}{required && <span style={{ color: 'var(--rosa-mexicano)', marginLeft: 4 }}>*</span>}</span>}
      {as === 'textarea' ? <textarea rows={rows} {...bind} />
        : as === 'select' ? <select {...bind}>{options.map(o => <option key={o} value={o}>{o}</option>)}</select>
        : <input type={type} {...bind} />}
      {hint && <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 11.5, color: invalid ? 'var(--terracota-horno)' : 'var(--text-muted)', marginTop: 6 }}>{hint}</span>}
    </label>
  );
}
