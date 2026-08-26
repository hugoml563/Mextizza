/**
 * The only icon component. Wraps a small Lucide-derived glyph set at 2px stroke —
 * a FLAGGED SUBSTITUTION, since Mextizza's sources contain no UI icon set.
 * Never fill an icon; never draw a new one inline.
 */
export type IconName =
  | 'cart' | 'clock' | 'pin' | 'plus' | 'minus' | 'check'
  | 'chevronRight' | 'chevronLeft' | 'chevronDown' | 'close'
  | 'whatsapp' | 'flame' | 'user' | 'bag' | 'star' | 'search';

export interface IconProps {
  name: IconName;
  /** 20 or 24. Nothing smaller than 16. */
  size?: number;
  color?: string;
  /** Always 2 unless you have a reason. */
  strokeWidth?: number;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element | null;
