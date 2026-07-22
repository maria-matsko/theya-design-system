import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import { Badge } from '../Badge/Badge';
import styles from './Avatar.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg';
export type AvatarShape = 'round' | 'square';
export type AvatarVariant = 'icon' | 'image' | 'text';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  /**
   * Adds the lighter accent-ring treatment (blue-200 border, tinted
   * fill) instead of the solid primary fill. For `variant="image"` a
   * border is always shown; `outline` just switches its color/weight
   * and adds a white inset ring, matching Figma's two image treatments.
   */
  outline?: boolean;
  /**
   * Swaps the border for the angular "Avatar gradient" ring (blue-200
   * → purple-200 → teal-200, 4px) instead of a flat color — matches
   * the Figma variant with the light bg-primary-subtle fill and blue
   * text-link initials. Implies the same light fill/text treatment as
   * `outline`.
   */
  gradientBorder?: boolean;
  /** Image source, for `variant="image"`. */
  src?: string;
  alt?: string;
  /** Icon shown for `variant="icon"`. Defaults to a filled star, matching Figma's default. */
  icon?: ReactNode;
  /** Initials shown for `variant="text"`. Matches Figma's default ("AA"). */
  initials?: string;
  /** Shows a small danger-colored count badge in the top-right corner. */
  badgeCount?: ReactNode;
}

const ICON_SIZE: Record<AvatarSize, number> = { sm: 16, md: 24, lg: 32 };

export function Avatar({
  size = 'sm',
  shape = 'round',
  variant = 'icon',
  outline = false,
  gradientBorder = false,
  src,
  alt = '',
  icon,
  initials = 'AA',
  badgeCount,
  className,
  ...rest
}: AvatarProps) {
  const classNames = [
    styles.avatar,
    styles[`size-${size}`],
    styles[`shape-${shape}`],
    styles[`variant-${variant}`],
    outline ? styles.outline : '',
    gradientBorder ? styles.gradientBorder : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...rest}>
      {variant === 'image' ? (
        <img className={styles.image} src={src} alt={alt} />
      ) : variant === 'text' ? (
        <span className={styles.initials}>{initials}</span>
      ) : (
        <span className={styles.icon}>
          {icon ?? (
            <Icon name="star" variant={outline ? 'outline' : 'solid'} size={ICON_SIZE[size]} />
          )}
        </span>
      )}
      {badgeCount != null ? (
        <span className={styles.badge}>
          <Badge variant="qty" intent="danger" size="sm" count={badgeCount} />
        </span>
      ) : null}
    </div>
  );
}
