import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Fab.module.css';

/** Matches Figma's "Color" axis for FAB. */
export type FabColor = 'light-primary' | 'white' | 'inverse' | 'primary';

/** Matches Figma's Size axis: Small=22px / Medium=36px / Large=56px container. */
export type FabSize = 'sm' | 'md' | 'lg';

/** Squircle (rounded-square) or fully round. */
export type FabShape = 'square' | 'round';

export interface FabProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  /** Background/icon color treatment. */
  color?: FabColor;
  /** Size — drives the square container and icon size together. */
  size?: FabSize;
  /** Container shape. Defaults to "square" (rounded-square), matching the original spec. */
  shape?: FabShape;
  /** The icon to render. Required — a FAB never shows a label. */
  icon: ReactNode;
  /** Accessible label, since the button has no visible text. */
  'aria-label': string;
}

export const Fab = forwardRef<HTMLButtonElement, FabProps>(function Fab(
  { color = 'primary', size = 'lg', shape = 'square', icon, disabled, className, ...rest },
  ref,
) {
  const classNames = [
    styles.fab,
    styles[`color-${color}`],
    styles[`size-${size}`],
    styles[`shape-${shape}`],
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
});
