/**
 * Quantity control for a cart line. Square, hairline-bordered, Oswald 700 numeral.
 */
export interface QtyStepperProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (next: number) => void;
  /** Height of each tap target. Keep >= 32 on web, >= 44 on mobile. */
  size?: number;
  style?: React.CSSProperties;
}
export function QtyStepper(props: QtyStepperProps): JSX.Element;
