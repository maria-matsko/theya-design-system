import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './StatusMessage.module.css';

export type StatusMessageIntent = 'success' | 'info' | 'warning' | 'danger';

/**
 * Default status icon per intent. "info"/"warning" fall back to the
 * closest available Basil icons (info-circle / info-triangle) — the
 * exact bare "Info"/"Warning" assets Figma references aren't in the
 * current @theya/icons download (same recurring gap as Badge/Chip).
 */
const DEFAULT_ICON: Record<StatusMessageIntent, Parameters<typeof Icon>[0]['name']> = {
  success: 'checked-box',
  info: 'info-circle',
  warning: 'info-triangle',
  danger: 'danger',
};

export interface StatusMessageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  intent?: StatusMessageIntent;
  title?: ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  /** Optional action slot below the content — pass a Button, Link, etc. */
  action?: ReactNode;
  /** Shows a close button; called when it's clicked. */
  onClose?: () => void;
}

export function StatusMessage({
  intent = 'info',
  title,
  children,
  icon,
  action,
  onClose,
  className,
  ...rest
}: StatusMessageProps) {
  return (
    <div
      className={[styles.message, styles[`intent-${intent}`], className ?? '']
        .filter(Boolean)
        .join(' ')}
      role="status"
      {...rest}
    >
      <span className={styles.accentLine} aria-hidden="true" />
      <span className={styles.icon} aria-hidden="true">
        {icon ?? <Icon name={DEFAULT_ICON[intent]} variant="solid" size={20} />}
      </span>
      <div className={styles.content}>
        {title ? <p className={styles.title}>{title}</p> : null}
        {children ? <p className={styles.text}>{children}</p> : null}
        {action ? <div className={styles.action}>{action}</div> : null}
      </div>
      {onClose ? (
        <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Dismiss">
          <Icon name="cross-thin" variant="custom" size={12} />
        </button>
      ) : null}
    </div>
  );
}
