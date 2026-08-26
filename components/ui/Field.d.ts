/**
 * Labelled input / select / textarea for the checkout flow. Bungee micro-label above,
 * rosa focus ring.
 */
export interface FieldProps {
  /** Uppercase Bungee label. */
  label?: string;
  /** Helper line beneath, e.g. delivery-radius or lead-time copy. */
  hint?: string;
  as?: 'input' | 'select' | 'textarea';
  /** Native input type — use 'tel' for phone numbers, 'email' for email. */
  type?: string;
  /** Marks the label with a rosa asterisk and sets the native required flag. */
  required?: boolean;
  /** Terracota border and terracota hint text — the error state. */
  invalid?: boolean;
  /** Options for as="select". */
  options?: string[];
  value?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  placeholder?: string;
  rows?: number;
  id?: string;
  style?: React.CSSProperties;
}
export function Field(props: FieldProps): JSX.Element;
