/**
 * Square social post: Bungee shout line over either the hard diagonal split or a flat
 * brand colour. Copy should be a number and a technique, not an adjective.
 *
 * @startingPoint section="Brand" subtitle="Square social post" viewport="420x420"
 */
export interface SocialTileProps {
  /** The shout line. Use \n via an array or a <>…<br/>…</> fragment for line breaks. */
  headline: React.ReactNode;
  /** Small tracked line beneath, e.g. "Nueva en el menú". */
  kicker?: string;
  /** diagonal = the 135° rosa split on negro carbón; flat = a solid brand colour. */
  treatment?: 'diagonal' | 'flat';
  /** Background for the flat treatment. */
  background?: string;
  headlineColor?: string;
  kickerColor?: string;
  style?: React.CSSProperties;
}
export function SocialTile(props: SocialTileProps): JSX.Element;
