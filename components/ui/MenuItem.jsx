import React from 'react';

export function MenuItem({ name, description, price, photo, photoSize = 64, badge, divider = true, action, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16,
        padding: photo ? '12px 0' : '10px 0', borderBottom: divider ? 'var(--border-dashed)' : 'none',
        cursor: clickable ? 'pointer' : 'default',
        transition: 'color var(--dur-fast) var(--ease-standard)', ...style
      }}>
      {photo && <img src={photo} alt={name} style={{
        width: photoSize, height: photoSize, flex: 'none', objectFit: 'cover',
        borderRadius: 'var(--radius-sm)', border: 'var(--border-paper)',
        transform: hover ? 'scale(1.06)' : 'scale(1)',
        transition: 'transform var(--dur-base) var(--ease-standard)'
      }} />}
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 14, lineHeight: 1.4,
            color: clickable && hover ? 'var(--rosa-mexicano)' : 'var(--text-body)'
          }}>{name}</span>
          {badge}
        </div>
        {description && <div style={{
          fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: 12, lineHeight: 1.4,
          color: 'var(--text-muted)', marginTop: 2
        }}>{description}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 'none' }}>
        {price != null && <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 800, fontSize: 14,
          color: 'var(--text-price)', whiteSpace: 'nowrap'
        }}>{typeof price === 'number' ? `$${price}` : price}</span>}
        {action}
      </div>
    </div>
  );
}
