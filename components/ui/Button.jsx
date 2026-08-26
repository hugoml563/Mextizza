import React from 'react';
import { Icon } from './Icon.jsx';

const TONES = {
  primary: { background: 'var(--rosa-mexicano)', color: 'var(--blanco)', hover: 'var(--accent-hover)', press: 'var(--accent-press)', border: 'none' },
  dark:    { background: 'var(--negro-carbon)', color: 'var(--blanco-hueso)', hover: 'var(--inverse-hover)', press: 'var(--negro-carbon)', border: 'none' },
  warm:    { background: 'var(--terracota-horno)', color: 'var(--blanco-hueso)', hover: '#A9421F', press: '#8F3818', border: 'none' },
  outline: { background: 'transparent', color: 'var(--negro-carbon)', hover: 'rgba(26,26,26,0.06)', press: 'rgba(26,26,26,0.12)', border: 'var(--border-frame)' },
  ghost:   { background: 'transparent', color: 'var(--negro-carbon)', hover: 'rgba(26,26,26,0.06)', press: 'rgba(26,26,26,0.12)', border: 'none' }
};

const SIZES = {
  sm: { padding: '8px 14px', fontSize: 12, letterSpacing: 1 },
  md: { padding: '12px 20px', fontSize: 13, letterSpacing: 1 },
  lg: { padding: '16px 28px', fontSize: 14, letterSpacing: 1.5 }
};

export function Button({ children, tone = 'primary', size = 'md', icon, iconAfter, block, disabled, stamped = true, onClick, type = 'button', style }) {
  const [state, setState] = React.useState('rest');
  const t = TONES[tone] || TONES.primary;
  const s = SIZES[size] || SIZES.md;
  const bg = disabled ? 'var(--gris-texto)' : state === 'press' ? t.press : state === 'hover' ? t.hover : t.background;
  const hardShadow = stamped && tone !== 'ghost' && !disabled;
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('rest')}
      onMouseDown={() => setState('press')}
      onMouseUp={() => setState('hover')}
      style={{
        display: block ? 'flex' : 'inline-flex', width: block ? '100%' : 'auto',
        alignItems: 'center', justifyContent: 'center', gap: 8,
        fontFamily: 'var(--font-body)', fontWeight: 600, textTransform: 'uppercase',
        fontSize: s.fontSize, letterSpacing: s.letterSpacing, padding: s.padding,
        background: bg, color: disabled ? 'var(--blanco-hueso)' : t.color, border: t.border,
        borderRadius: 'var(--radius-sm)', cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: hardShadow && state !== 'press' ? 'var(--shadow-lift)' : 'none',
        transform: state === 'press' && hardShadow ? 'translate(2px, 2px)' : 'none',
        transition: 'background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)',
        ...style
      }}>
      {icon && <Icon name={icon} size={size === 'lg' ? 20 : 16} />}
      {children}
      {iconAfter && <Icon name={iconAfter} size={size === 'lg' ? 20 : 16} />}
    </button>
  );
}
