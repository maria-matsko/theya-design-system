import type { ReactNode } from 'react';
import { StatusIcon } from '../StatusIcon/StatusIcon';
import type { StatusIconType } from '../StatusIcon/StatusIcon';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import styles from './ProgressState.module.css';

export type ProgressStateType = 'progress' | 'awaiting' | 'done' | 'error' | 'aborted';

const STATE_ICON: Record<ProgressStateType, StatusIconType> = {
  progress: 'progressing',
  awaiting: 'progressing',
  done: 'check',
  error: 'exclamation',
  aborted: 'cross',
};

export interface ProgressStateProps {
  type?: ProgressStateType;
  title: ReactNode;
  /** 0–100. Only rendered (and only meaningful) for type="progress". */
  value?: number;
  /** Toggles the "NN%" figure next to the title — only relevant for type="progress". */
  showPercent?: boolean;
  /** Neutral/explanatory text below the title. Omit to hide entirely. */
  description?: ReactNode;
  /** Bold trailing link inside the description, e.g. "Learn more". */
  linkText?: ReactNode;
  onLinkClick?: () => void;
}

export function ProgressState({
  type = 'progress',
  title,
  value = 0,
  showPercent = true,
  description,
  linkText,
  onLinkClick,
}: ProgressStateProps) {
  const isProgress = type === 'progress';
  const titleClassName = [styles.title, type === 'error' || isProgress ? styles.titleStrong : ''].join(' ');

  return (
    <div className={styles.state}>
      <div className={styles.iconSlot}>
        <StatusIcon status={STATE_ICON[type]} size={20} />
      </div>
      <div className={[styles.content, isProgress ? styles.contentSpaced : ''].join(' ')}>
        {isProgress ? (
          <div className={styles.progressRow}>
            <div className={styles.textCol}>
              <p className={titleClassName}>{title}</p>
              {description ? (
                <p className={styles.description}>
                  {description}
                  {linkText ? (
                    <>
                      {' '}
                      <a className={styles.link} onClick={onLinkClick}>
                        {linkText}
                      </a>
                    </>
                  ) : null}
                </p>
              ) : null}
            </div>
            {showPercent ? <span className={styles.percent}>{Math.round(value)}%</span> : null}
          </div>
        ) : (
          <>
            <p className={titleClassName}>{title}</p>
            {description ? (
              <p className={styles.description}>
                {description}
                {linkText ? (
                  <>
                    {' '}
                    <a className={styles.link} onClick={onLinkClick}>
                      {linkText}
                    </a>
                  </>
                ) : null}
              </p>
            ) : null}
          </>
        )}
        {isProgress ? <ProgressBar value={value} size="sm" /> : null}
      </div>
    </div>
  );
}
