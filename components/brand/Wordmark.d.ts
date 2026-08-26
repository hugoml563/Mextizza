/**
 * The primary Mextizza mark: the official black letterforms, monotone, on paper.
 * Renders the real outlines traced from "Logo Mextizza letras negras" by default, so it
 * needs no font to load and is exact at any size. Set `vector={false}` for live Colo Pro
 * text (editable copy), or `accent` for the optional rosa tail on "zza".
 *
 * @startingPoint section="Brand" subtitle="Black wordmark on paper" viewport="700x260"
 */
export interface WordmarkProps {
  /** Display size. Named sizes map to the mockup's literal values: sm 24, md 38, lg 62, xl 96. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Official outlined letterforms (default). `false` renders live Colo Pro text. */
  vector?: boolean;
  /** Ink colour. Defaults to `--text-wordmark` (negro carbón). */
  color?: string;
  /** Optional different colour for the "zza" tail. Omit for a monotone mark. */
  accent?: string;
  /** Tagline set in Bungee terracota beneath. e.g. "Horneada como allá, gozada como acá" */
  tagline?: string;
  /** Descriptor under the wordmark. Defaults to "Pizzería". */
  subtitle?: string;
  /** Show the subtitle line. */
  showSubtitle?: boolean;
  /** Hard offset print shadow on the live-text mode. Off by default — the black mark on paper needs none. */
  print?: boolean;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}
export function Wordmark(props: WordmarkProps): JSX.Element;
