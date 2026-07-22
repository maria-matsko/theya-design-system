import type { SVGProps } from 'react';
import { outlineIcons } from './generated/outline';
import type { OutlineIconName } from './generated/outline';
import { solidIcons } from './generated/solid';
import type { SolidIconName } from './generated/solid';
import { iconViewBox } from './generated/viewbox';
import { customIcons, customIconViewBox } from './custom';
import type { CustomIconName } from './custom';

export type { OutlineIconName, SolidIconName, CustomIconName };

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Icon name, e.g. "star", "search", or a custom name like "cross-thin". */
  name: OutlineIconName | SolidIconName | CustomIconName;
  /**
   * Visual style. Defaults to "outline" — Basil's primary style.
   * "custom" looks up `name` in the hand-added registry (see custom.ts)
   * instead of Basil — use this for icons Basil's download doesn't have.
   */
  variant?: 'outline' | 'solid' | 'custom';
  /** Pixel size, applied to both width and height. Defaults to 16. */
  size?: number;
}

/**
 * Renders a Basil icon by name, or a hand-added custom one (see
 * custom.ts — a recurring gap in Basil's download: cross, checked/
 * danger circles, etc. aren't in the pack, so specific Figma exports
 * are kept there instead). Uses `currentColor`, so it inherits text
 * color from wherever it's placed.
 *
 * Note: if `name` doesn't exist in the chosen `variant`, this renders
 * nothing rather than throwing — deliberately lenient so a typo'd icon
 * name shows up as a visibly missing icon in dev, not a crashed page.
 */
export function Icon({ name, variant = 'outline', size = 16, ...rest }: IconProps) {
  if (variant === 'custom') {
    const markup = customIcons[name as CustomIconName];
    if (!markup) return null;
    const viewBox = customIconViewBox[name as CustomIconName] ?? '0 0 24 24';
    return (
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: markup }}
        {...rest}
      />
    );
  }

  const registry = variant === 'solid' ? solidIcons : outlineIcons;
  const markup = registry[name as keyof typeof registry];

  if (!markup) {
    return null;
  }

  const viewBox = iconViewBox[name as string] ?? '0 0 24 24';

  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: markup }}
      {...rest}
    />
  );
}
