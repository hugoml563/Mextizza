/**
 * A palette swatch with its Spanish name, hex in Courier, and the colour's stated job.
 * Preserve the rationale copy — it is part of the brand documentation.
 */
export interface SwatchProps {
  /** Spanish colour name, e.g. "Rosa Mexicano". */
  name: string;
  /** Hex string, shown in Courier. Also used as the fill unless `fill` is given. */
  hex: string;
  /** One-line rationale, e.g. "Energía, orgullo, identidad." */
  note?: string;
  /** Overrides the fill (for gradients or var() references). */
  fill?: string;
  height?: number;
  style?: React.CSSProperties;
}
export function Swatch(props: SwatchProps): JSX.Element;
