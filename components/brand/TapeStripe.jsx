import React from 'react';

export function TapeStripe({ height = 10, position, style }) {
  const base = {
    height,
    background: 'var(--stripe-tape)',
    ...(position ? { position: 'absolute', left: 0, right: 0, [position]: 0 } : {}),
    ...style
  };
  return <div aria-hidden="true" style={base} />;
}
