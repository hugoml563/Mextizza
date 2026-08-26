/**
 * The circular rubber stamp from the packaging mockup: 130px, 3px ring, rotated -8deg,
 * Bungee 11px uppercase inside. Use for provenance and process claims.
 */
export interface StampProps {
  /** Short lines, one per row. Three lines is the source's rhythm. */
  lines: string[];
  size?: number;
  /** Ring and text colour. Gris asfalto by default; negro carbón or rosa also correct. */
  color?: string;
  /** Rotation in degrees. -8 is the source value; keep it hand-stamped. */
  tilt?: number;
  style?: React.CSSProperties;
}
export function Stamp(props: StampProps): JSX.Element;
