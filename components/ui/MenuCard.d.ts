/**
 * The printed-menu card: coloured header with a tracked kicker and a Colo Pro title,
 * white body holding MenuItem rows.
 *
 * @startingPoint section="UI" subtitle="Menu card with dashed item rows" viewport="700x400"
 */
export interface MenuCardProps {
  /** Small tracked category, e.g. "Mains", "Starters", "Postre". */
  kicker?: string;
  /** Colo Pro heading, e.g. "Pizzas de la casa". */
  title: string;
  /** Header fill. Gris asfalto by default; negro carbón and terracota also correct. */
  headBackground?: string;
  /** MenuItem rows. */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function MenuCard(props: MenuCardProps): JSX.Element;
