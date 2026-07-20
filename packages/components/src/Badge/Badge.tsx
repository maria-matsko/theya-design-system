import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Badge.module.css';

/** Content mode — matches Figma's "Value" axis. */
export type BadgeVariant = 'qty' | 'icon' | 'dot-small' | 'dot-medium';

/** Matches Figma's "Intent" axis — a different set from Button (no primary/secondary). */
export type BadgeIntent = 'inactive' | 'info' | 'success' | 'warning' | 'danger';

/** Surface treatment. */
export type BadgeType = 'filled' | 'outlined';

/** Matches Figma's "Size" axis. */
export type BadgeSize = 'sm' | 'md';

/** Corner style. Only affects the "qty" and "dot" variants — "icon" is always circular. */
export type BadgeBorder = 'round' | 'squared';

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  /** Content mode. */
  variant?: BadgeVariant;
  /** Semantic color intent. */
  intent?: BadgeIntent;
  /** Surface treatment: solid fill or tinted/outlined. */
  type?: BadgeType;
  /** Size. */
  size?: BadgeSize;
  /** Corner style — ignored when variant is "icon" (always circular). */
  border?: BadgeBorder;
  /**
   * Text shown for variant="qty". Matches Figma's default ("5").
   * Accepts any short string — a count, "New", "99+", etc.
   */
  count?: ReactNode;
  /**
   * Icon shown for variant="icon". Required in that mode — there's no
   * sensible default, since the design references specific Basil status
   * icons (Danger/Warning/Delete-circle) that aren't in the current
   * @theya/icons download (see Badge.stories.tsx for the substitutes
   * used there, and a note on the gap).
   */
  icon?: ReactNode;
}

export function Badge({
  variant = 'qty',
  intent = 'inactive',
  type = 'filled',
  size = 'sm',
  border = 'round',
  count = '5',
  icon,
  className,
  ...rest
}: BadgeProps) {
  const classNames = [
    styles.badge,
    styles[`variant-${variant}`],
    styles[`intent-${intent}`],
    styles[`type-${type}`],
    styles[`size-${size}`],
    variant !== 'icon' ? styles[`border-${border}`] : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  if (variant === 'qty') {
    return (
      <div className={classNames} {...rest}>
        {count}
      </div>
    );
  }

  if (variant === 'dot-small' || variant === 'dot-medium') {
    return (
      <div className={classNames} {...rest}>
        <span className={styles.dot} />
      </div>
    );
  }

  // variant === 'icon'
  return (
    <div className={classNames} {...rest}>
      <span className={styles.icon}>{icon}</span>
    </div>
  );
}
