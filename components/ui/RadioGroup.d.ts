/**
 * A mandatory single-choice group as paper tiles — payment method, delivery window,
 * anything where exactly one answer is required and nothing may be preselected.
 * Tiles are 48px tall so they clear the mobile hit-target floor.
 */
export interface RadioGroupProps {
  label?: string;
  /** Plain strings, or `{ value, label }` when the stored value differs from the copy. */
  options?: (string | { value: string; label: string })[];
  /** The chosen value. `null`/`undefined` means the user has not answered. */
  value?: string | null;
  onChange?: (value: string) => void;
  /** Rosa asterisk on the label. Use it — this component exists for required choices. */
  required?: boolean;
  /** Terracota borders and hint: the "you must pick one" error state. */
  invalid?: boolean;
  hint?: string;
  /** Tile columns. Defaults to the option count, capped at 3. */
  columns?: number;
  style?: React.CSSProperties;
}

export declare function RadioGroup(props: RadioGroupProps): JSX.Element;
