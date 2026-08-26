/**
 * The palette as a row of ringed dots — the signature that sits under the wordmark
 * on dark panels.
 */
export interface DotRowProps {
  /** Defaults to the full brand order: rosa, gris asfalto, terracota, dorado, hueso. */
  colors?: string[];
  size?: number;
  gap?: number;
  style?: React.CSSProperties;
}
export function DotRow(props: DotRowProps): JSX.Element;
