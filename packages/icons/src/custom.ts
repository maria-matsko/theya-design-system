// Hand-added icons that aren't in the Basil download (a recurring gap —
// see Badge/Chip/TextField notes). Each entry is the raw inner SVG
// markup (no outer <svg> tag), fill already converted to currentColor
// so it inherits color like every other icon in this package.
//
// To add one: export the node's SVG from Figma, strip the outer <svg>
// wrapper, replace any hardcoded fill/stroke color with "currentColor",
// and add an entry here with the viewBox noted in a comment (Icon
// assumes a 0 0 24 24 viewBox by default — pass a custom one via the
// `viewBox` prop if a custom icon uses a different box, like this one).

export const customIcons: Record<string, string> = {
  // Figma "Icon12 / Cross" — viewBox 0 0 12 12, not the default 24x24.
  'cross-thin':
    '<path d="M2.67993 9.88334C2.52438 10.0389 2.2722 10.0389 2.11666 9.88334C1.96111 9.7278 1.96111 9.47562 2.11666 9.32007L5.43673 5.99999L2.11667 2.67993C1.96113 2.52438 1.96113 2.2722 2.11667 2.11666C2.27221 1.96111 2.52439 1.96111 2.67994 2.11666L6 5.43672L9.32006 2.11666C9.47561 1.96111 9.72779 1.96111 9.88333 2.11666C10.0389 2.2722 10.0389 2.52438 9.88333 2.67993L6.56327 5.99999L9.88334 9.32007C10.0389 9.47562 10.0389 9.7278 9.88334 9.88334C9.7278 10.0389 9.47562 10.0389 9.32007 9.88334L6 6.56326L2.67993 9.88334Z" fill="currentColor"/>',
};

export type CustomIconName = keyof typeof customIcons;

/** viewBox override per custom icon, since they aren't all 24x24 like Basil. */
export const customIconViewBox: Record<string, string> = {
  'cross-thin': '0 0 12 12',
};
