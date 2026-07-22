import type { ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './Toaster.module.css';

export type ToastIntent = 'progress' | 'success' | 'error' | 'warning' | 'info' | 'accent';

const INTENT_ICON: Partial<Record<ToastIntent, Parameters<typeof Icon>[0]['name']>> = {
  success: 'checked-box',
  accent: 'checked-box',
  error: 'danger',
  warning: 'info-triangle',
  info: 'info-circle',
};

export interface ToastItem {
  id: string;
  intent?: ToastIntent;
  title: ReactNode;
  /** Plain description text. Ignored if `description` (rich) is set. */
  description?: ReactNode;
  /** Trailing bold link shown after the description, e.g. "Learn more". */
  learnMoreHref?: string;
  onLearnMore?: () => void;
  /** 0–100. Only rendered for intent="progress". */
  progress?: number;
  progressLabel?: string;
  closable?: boolean;
}

export interface ToastProps extends ToastItem {
  onClose?: (id: string) => void;
}

export function Toast({
  id,
  intent = 'info',
  title,
  description,
  learnMoreHref,
  onLearnMore,
  progress,
  progressLabel = 'detailed progress',
  closable = true,
  onClose,
}: ToastProps) {
  const isDark = intent !== 'accent';

  return (
    <div className={[styles.toast, styles[`intent-${intent}`]].join(' ')} role="status">
      <div className={styles.titleRow}>
        {intent === 'progress' ? (
          <span className={styles.dotIcon} aria-hidden="true" />
        ) : (
          <span className={styles.icon} aria-hidden="true">
            <Icon name={INTENT_ICON[intent] ?? 'info-circle'} variant="solid" size={16} />
          </span>
        )}
        <p className={styles.title}>{title}</p>
        {closable ? (
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => onClose?.(id)}
            aria-label="Dismiss"
          >
            <Icon name="cross-thin" variant="custom" size={12} />
          </button>
        ) : null}
      </div>

      {intent === 'progress' && progress != null ? (
        <div className={styles.progressBlock}>
          <div className={styles.progressRow}>
            <span className={styles.progressLabel}>{progressLabel}</span>
            <span className={styles.progressPercent}>{Math.round(progress)}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div className={styles.progressFill} style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
          </div>
        </div>
      ) : null}

      {description && intent !== 'progress' ? (
        <div className={styles.description}>
          <p className={styles.descriptionText}>
            {description}{' '}
            {learnMoreHref || onLearnMore ? (
              <a
                href={learnMoreHref}
                onClick={onLearnMore}
                className={styles.learnMore}
              >
                Learn more
              </a>
            ) : null}
          </p>
        </div>
      ) : null}
    </div>
  );
}

export interface ToasterProps {
  toasts: ToastItem[];
  onClose?: (id: string) => void;
  /** Screen corner for the stack. Defaults to "top-right". */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function Toaster({ toasts, onClose, position = 'top-right' }: ToasterProps) {
  return (
    <div className={[styles.stack, styles[`position-${position}`]].join(' ')}>
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onClose={onClose} />
      ))}
    </div>
  );
}
