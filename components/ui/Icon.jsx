import React from 'react';

/* Lucide is a flagged substitution — the sources contain no UI icon set.
   Swapping it out means changing only this file. */
const PATHS = {
  cart: 'M8 21a1 1 0 100-2 1 1 0 000 2zM19 21a1 1 0 100-2 1 1 0 000 2zM2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12',
  clock: 'M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2',
  pin: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1116 0zM12 13a3 3 0 100-6 3 3 0 000 6z',
  plus: 'M5 12h14M12 5v14',
  minus: 'M5 12h14',
  check: 'M20 6L9 17l-5-5',
  chevronRight: 'M9 18l6-6-6-6',
  chevronLeft: 'M15 18l-6-6 6-6',
  chevronDown: 'M6 9l6 6 6-6',
  close: 'M18 6L6 18M6 6l12 12',
  whatsapp: 'M21 11.5a8.5 8.5 0 01-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1121 11.5z',
  flame: 'M12 22c4 0 7-2.7 7-6.5 0-4.6-5-6.4-4.2-11.5C11.5 5 9 7.6 9 11c-1 0-2-1-2.3-2.4C5.6 10 5 12 5 14.2 5 18.6 8 22 12 22z',
  user: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z',
  bag: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z',
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35'
};

export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 2, style, ...rest }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color}
      strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" style={{ display: 'block', flex: 'none', ...style }} {...rest}>
      <path d={d} />
    </svg>
  );
}

Icon.names = Object.keys(PATHS);
