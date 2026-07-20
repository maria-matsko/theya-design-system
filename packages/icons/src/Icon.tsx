import type { SVGProps } from 'react';
import { outlineIcons } from './generated/outline';
import type { OutlineIconName } from './generated/outline';
import { solidIcons } from './generated/solid';
import type { SolidIconName } from './generated/solid';

export type { OutlineIconName, SolidIconName };

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  /** Icon name, e.g. "star", "search", "chevron-down". */
  name: OutlineIconName | SolidIconName;
  /** Visual style. Defaults to "outline" — Basil's primary style. */
  variant?: 'outline' | 'solid';
  /** Pixel size, applied to both width and height. Defaults to 16. */
  size?: number;
}

/**
 * Renders a Basil icon by name. Uses `currentColor`, so it inherits
 * text color from wherever it's placed (matches Button/IconButton/Fab,
 * which all set `color` on their icon slot rather than styling icons
 * directly).
 *
 * Note: if `name` doesn't exist in the chosen `variant`, this renders
 * nothing rather than throwing — deliberately lenient so a typo'd icon
 * name shows up as a visibly missing icon in dev, not a crashed page.
 */
export function Icon({ name, variant = 'outline', size = 16, ...rest }: IconProps) {
  const registry = variant === 'solid' ? solidIcons : outlineIcons;
  const markup = registry[name as keyof typeof registry];

  if (!markup) {
    return null;
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      dangerouslySetInnerHTML={{ __html: markup }}
      {...rest}
    />
  );
}
