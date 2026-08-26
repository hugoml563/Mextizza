/**
 * The four-colour 45° sealing-tape band — the brand's signature texture.
 * Rosa → gris asfalto → terracota → dorado, 10px per stripe.
 */
export interface TapeStripeProps {
  /** Band thickness. 10px on packaging; up to ~40px as a decorative divider. */
  height?: number;
  /** Absolutely pin the band to an edge of the nearest positioned parent. */
  position?: 'top' | 'bottom';
  style?: React.CSSProperties;
}
export function TapeStripe(props: TapeStripeProps): JSX.Element;
