/**
 * The four legal Mextizza card species in one component. Light system: `object` and
 * `info` do most of the work; `hero` (negro carbón) is a deliberate accent, not the default.
 *
 * @startingPoint section="Brand" subtitle="The four card species" viewport="700x190"
 */
export interface FramedPanelProps {
  /** object = white + 2px black frame; info = white + paper hairline + soft shadow;
   *  paper = sunken hueso block, no border; hero = negro carbón panel (use sparingly). */
  variant?: 'object' | 'info' | 'paper' | 'hero';
  /** Pin the tape stripe to an edge. */
  tape?: 'top' | 'bottom';
  /** Overrides the variant's default padding. */
  padding?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export function FramedPanel(props: FramedPanelProps): JSX.Element;
