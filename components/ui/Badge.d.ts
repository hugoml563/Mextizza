/**
 * Small Bungee flag for the claims the brand voice already makes: "Rotativa", "48h", "Nueva".
 */
export interface BadgeProps {
  children: React.ReactNode;
  tone?: 'rosa' | 'dorado' | 'terracota' | 'dark' | 'quiet';
  style?: React.CSSProperties;
}
export function Badge(props: BadgeProps): JSX.Element;
