import React from 'react';

export function Stamp({ lines = [], size = 130, color = 'var(--negro-carbon)', tilt = -6, style }) {
  return (
    <div style={{
      width: size, height: size, border: `2px solid ${color}`, borderRadius: '50%',
      display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      transform: `rotate(${tilt}deg)`, ...style
    }}>
      <span style={{
        fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 11,
        letterSpacing: 0.5, textTransform: 'uppercase', lineHeight: 1.5, color
      }}>
        {lines.map((l, i) => <React.Fragment key={i}>{i > 0 && <br />}{l}</React.Fragment>)}
      </span>
    </div>
  );
}
