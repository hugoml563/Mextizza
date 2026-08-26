/**
 * One menu row: name in Oswald 700, ingredient list in 12px muted, price in terracota 800,
 * separated by the brand's dashed printed-menu rule.
 */
export interface MenuItemProps {
  name: string;
  /** Ingredient list plus a line of attitude, as on the printed menu sheet. */
  description?: string;
  /** A number renders as "$215"; pass a string for anything else. */
  price?: number | string;
  /** Square product photo shown at the start of the row. Real photography only — never an illustration. */
  photo?: string;
  /** Thumbnail edge in px. Defaults to 64. */
  photoSize?: number;
  /** A <Badge> for "Del mes", "Nueva", etc. */
  badge?: React.ReactNode;
  /** The dashed rule beneath. Off on the last row. */
  divider?: boolean;
  /** Trailing control, e.g. a QtyStepper or an add Button. */
  action?: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function MenuItem(props: MenuItemProps): JSX.Element;
