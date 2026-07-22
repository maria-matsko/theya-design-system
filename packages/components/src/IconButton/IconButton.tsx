import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './IconButton.module.css';

/**
 * Matches Figma's "Type" axis for this component (Filled / Outlined /
 * Ghost / Ghost Inverse). "Ghost Inverse" is a solid dark-slate fill —
 * meant for placement on a light/white surface where a plain ghost
 * button wouldn't read, e.g. the disclosure chevron inside a filled
 * input field.
 */
export type IconButtonType = 'filled' | 'outlined' | 'ghost' | 'ghost-inverse';

/** Matches Button's height ruler: Small=28px / Medium=32px / Large=40px. */
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
  /** Surface treatment. */
  type?: IconButtonType;
  /** Size — drives the square container and icon size together. */
  size?: IconButtonSize;
  /** The icon to render. Required — this control never shows a label. */
  icon: ReactNode;
  /** Accessible label, since the button has no visible text. */
  'aria-label': string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    { type = 'filled', size = 'md', icon, disabled, className, ...rest },
    ref,
  ) {
    const classNames = [
      styles.button,
      styles[`type-${type}`],
      styles[`size-${size}`],
      className ?? '',
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        type="button"
        className={classNames}
        disabled={disabled}
        aria-disabled={disabled}
        {...rest}
      >
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      </button>
    );
  },
);
