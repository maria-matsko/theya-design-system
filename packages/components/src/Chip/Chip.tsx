import type { ButtonHTMLAttributes, HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './Chip.module.css';

export type ChipIntent = 'inactive' | 'info' | 'success' | 'warning' | 'danger';
export type ChipType = 'filled' | 'tonal' | 'outlined';

export interface ChipProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  intent?: ChipIntent;
  type?: ChipType;
  label: ReactNode;
  /**
   * Optional leading icon. No default — Figma uses specific per-intent
   * status icons (Question/Info/Warning/Danger) that aren't all in the
   * current @theya/icons download, so pass your own rather than risk a
   * wrong auto-picked one.
   */
  icon?: ReactNode;
  /** Shows a close button; called when it's clicked. */
  onClose?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  /** Makes the chip itself clickable — renders as a real <button> with hover/pressed/focus states. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function Chip({
  intent = 'inactive',
  type = 'filled',
  label,
  icon,
  onClose,
  onClick,
  disabled,
  className,
  ...rest
}: ChipProps) {
  const classNames = [
    styles.chip,
    styles[`intent-${intent}`],
    styles[`type-${type}`],
    onClick ? styles.clickable : '',
    disabled ? styles.disabled : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      <span className={styles.label}>{label}</span>
      {onClose ? (
        <button
          type="button"
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            onClose(e);
          }}
          disabled={disabled}
          aria-label="Remove"
        >
          <Icon name="cross-thin" variant="custom" size={12} />
        </button>
      ) : null}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={classNames} onClick={onClick} disabled={disabled} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {content}
      </button>
    );
  }

  return (
    <div className={classNames} {...rest}>
      {content}
    </div>
  );
}
