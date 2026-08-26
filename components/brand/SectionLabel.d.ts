/**
 * Bungee 11px uppercase eyebrow with a trailing hairline rule — the brand's section divider.
 */
export interface SectionLabelProps {
  children: React.ReactNode;
  /** Label colour. Negro carbón by default; rosa mexicano for the first eyebrow on a page. */
  color?: string;
  /** Trailing 2px rule at 15% opacity. */
  rule?: boolean;
  style?: React.CSSProperties;
}
export function SectionLabel(props: SectionLabelProps): JSX.Element;
