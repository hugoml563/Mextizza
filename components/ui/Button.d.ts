/**
 * A stamped key: hard 2px offset shadow at rest, pressing flat on click. Uppercase Oswald.
 * Hover darkens — never lightens, never fades.
 *
 * @startingPoint section="UI" subtitle="Button tones, sizes and states" viewport="700x220"
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary = rosa; dark = negro carbón; warm = terracota; outline = 3px frame; ghost = bare. */
  tone?: 'primary' | 'dark' | 'warm' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  /** Leading icon name from Icon. */
  icon?: string;
  /** Trailing icon name from Icon. */
  iconAfter?: string;
  block?: boolean;
  disabled?: boolean;
  /** The hard offset shadow + press-flat behaviour. Off for inline/ghost use. */
  stamped?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
