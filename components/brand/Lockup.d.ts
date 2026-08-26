/**
 * The illustrated Mextizza lockup — the founders' own artwork, cropped out of
 * `assets/logo-letras-negras.png`. Use this wherever the mark should carry its
 * illustration; use `Wordmark` when only the letterforms belong (tight headers, stamps,
 * anywhere the artwork would be smaller than legible).
 *
 * Never redraw the peel, the cutter or the ingredient icons as SVG — crop the PNG.
 */
export interface LockupProps {
  /** pala = peel + cutter above the letters. completo = that plus the five ingredient
   *  icons below. ingredientes = the icon strip alone, as a rule or signature. */
  variant?: 'pala' | 'completo' | 'ingredientes';
  /** negro for paper grounds, hueso for negro carbón. The illustration keeps its own
   *  colours in both; only the black ink flips. */
  tone?: 'negro' | 'hueso';
  /** Cap height of the LETTERS in px — the artwork scales around it, so a `pala` and a
   *  `completo` at the same `size` show the same size wordmark. */
  size?: number;
  /** Path prefix for the asset, e.g. "../../" from a nested page. */
  base?: string;
  /** "Pizzería" line under the mark. */
  subtitle?: string;
  /** Tagline in terracota under that. */
  tagline?: string;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}

export declare function Lockup(props: LockupProps): JSX.Element;
