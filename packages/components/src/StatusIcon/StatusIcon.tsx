import { Icon } from '@theya/icons';
import styles from './StatusIcon.module.css';

export type StatusIconType =
  | 'check'
  | 'exclamation'
  | 'cross'
  | 'warning'
  | 'progressing'
  | 'empty'
  | 'disable';

export interface StatusIconProps {
  status: StatusIconType;
  /** Diameter in px. Defaults to 20, matching the reference. */
  size?: number;
}

export function StatusIcon({ status, size = 20 }: StatusIconProps) {
  const iconSize = Math.round(size * 0.6);

  return (
    <span
      className={[styles.icon, styles[`status-${status}`]].join(' ')}
      style={{ width: size, height: size }}
      role="img"
      aria-label={status}
    >
      {status === 'check' ? <Icon name="check" size={iconSize} /> : null}
      {status === 'cross' ? <Icon name="cross-thin" variant="custom" size={iconSize} /> : null}
      {status === 'exclamation' ? <Icon name="danger" variant="solid" size={iconSize} /> : null}
      {status === 'warning' ? <Icon name="info-triangle" variant="solid" size={iconSize} /> : null}
      {status === 'progressing' ? <span className={styles.pulseDot} /> : null}
      {status === 'disable' ? <span className={styles.staticDot} /> : null}
    </span>
  );
}
