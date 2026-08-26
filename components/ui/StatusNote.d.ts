/**
 * A flat status panel — a 2px coloured frame over a soft tint, an icon, a bold line and
 * a sentence. Use it for coverage checks, blocked orders and confirmations. Never a
 * blurred toast: this is a printed notice.
 */
export interface StatusNoteProps {
  /** ok = rosa (all good), warn = dorado (needs a human), block = terracota (cannot proceed). */
  tone?: 'ok' | 'warn' | 'block';
  title?: string;
  /** The explanation. One or two sentences — say what to do next, not just what failed. */
  children?: React.ReactNode;
  /** Override the tone's default icon name. */
  icon?: string;
  style?: React.CSSProperties;
}

export declare function StatusNote(props: StatusNoteProps): JSX.Element;
