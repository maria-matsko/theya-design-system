import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { Badge } from '../Badge/Badge';
import { Line } from '../Line/Line';
import styles from './MenuItem.module.css';

export type MenuItemVariant = 'option' | 'status' | 'media' | 'heading' | 'divider';
export type MenuItemStatusColor = 'inactive' | 'info' | 'success' | 'warning' | 'danger';

export interface MenuItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  variant?: MenuItemVariant;
  /** Leading icon — used by "option". */
  icon?: ReactNode;
  /** Dot color — used by "status" (reuses Badge's dot). */
  statusColor?: MenuItemStatusColor;
  /** Large illustrated icon (~32px) — used by "media". */
  mediaIcon?: ReactNode;
  text?: ReactNode;
  description?: ReactNode;
  /** Trailing count pill, e.g. 99. */
  badge?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  /** Adds a bottom divider line under the item. */
  delimiter?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function MenuItem({
  variant = 'option',
  icon,
  statusColor = 'info',
  mediaIcon,
  text,
  description,
  badge,
  selected = false,
  disabled = false,
  delimiter = false,
  onClick,
  className,
  ...rest
}: MenuItemProps) {
  if (variant === 'divider') {
    return (
      <div className={styles.dividerWrap}>
        <Line />
      </div>
    );
  }

  if (variant === 'heading') {
    return (
      <div className={[styles.heading, className ?? ''].filter(Boolean).join(' ')} {...rest}>
        {text}
      </div>
    );
  }

  const interactive = !disabled && Boolean(onClick);

  const classNames = [
    styles.item,
    styles[`variant-${variant}`],
    selected ? styles.selected : '',
    disabled ? styles.disabled : '',
    interactive ? styles.interactive : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classNames}
      role={onClick ? 'menuitem' : undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      {...rest}
    >
      {variant === 'media' ? (
        <span className={styles.mediaIcon}>{mediaIcon}</span>
      ) : variant === 'status' ? (
        <span className={styles.statusIcon}>
          <Badge variant="dot-medium" intent={statusColor} size="sm" />
        </span>
      ) : icon ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
        {description ? <p className={styles.description}>{description}</p> : null}
      </div>
      {badge != null ? (
        <span className={styles.badge}>
          <Badge variant="qty" intent="danger" size="sm" count={badge} />
        </span>
      ) : null}
      {delimiter ? <div className={styles.delimiter} /> : null}
    </div>
  );
}
