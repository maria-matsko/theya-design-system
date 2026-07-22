import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

/**
 * Visual treatment axis. "gradient" uses the dark-theme gradient
 * tokens (fill for type="filled", a gradient border for
 * type="outlined"/"ghost"). "gradient-animated" | "glass" remain
 * reserved for later.
 */
export type ButtonVariant = 'flat' | 'gradient';

/**
 * Surface treatment within the "flat" variant — matches Figma's
 * "Type" axis (Filled / Outlined / Ghost).
 */
export type ButtonType = 'filled' | 'outlined' | 'ghost';

/** Matches Figma's "Level" axis. */
export type ButtonIntent =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info';

/** Matches Figma's "Size" axis: Small=28px / Medium=32px / Large=40px. */
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'type'> {
  /** Visual treatment. Reserved for future gradient/glass variants. */
  variant?: ButtonVariant;
  /** Surface treatment: solid fill, outlined, or borderless. */
  type?: ButtonType;
  /** Semantic color intent. */
  intent?: ButtonIntent;
  /** Size, drives height, padding, and typography together. */
  size?: ButtonSize;
  /** Stretches the button to the width of its container. */
  fullWidth?: boolean;
  /** Renders as a square icon-only button (no label). Provide the icon via leftIcon. */
  iconOnly?: boolean;
  /** Icon rendered before the label (or the sole icon when iconOnly is set). */
  leftIcon?: ReactNode;
  /** Icon rendered after the label. */
  rightIcon?: ReactNode;
  children?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'flat',
      type = 'filled',
      intent = 'primary',
      size = 'md',
      fullWidth = false,
      iconOnly = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const classNames = [
      styles.button,
      styles[`variant-${variant}`],
      styles[`type-${type}`],
      styles[`intent-${intent}`],
      styles[`size-${size}`],
      fullWidth ? styles.fullWidth : '',
      iconOnly ? styles.iconOnly : '',
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
        {leftIcon ? (
          <span className={styles.icon} aria-hidden="true">
            {leftIcon}
          </span>
        ) : null}
        {!iconOnly && children ? (
          <span className={styles.label}>{children}</span>
        ) : null}
        {!iconOnly && rightIcon ? (
          <span className={styles.icon} aria-hidden="true">
            {rightIcon}
          </span>
        ) : null}
      </button>
    );
  },
);
