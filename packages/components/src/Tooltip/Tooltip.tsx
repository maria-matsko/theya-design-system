import { useState, cloneElement, isValidElement } from 'react';
import type { ReactElement, ReactNode } from 'react';
import styles from './Tooltip.module.css';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
/** Where the arrow sits along the tooltip's edge (only meaningful for top/bottom placements). */
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  placement?: TooltipPlacement;
  align?: TooltipAlign;
  /** Max width in px — matches the reference's 200/400 options. Defaults to 200. */
  maxWidth?: number;
  showArrow?: boolean;
  /** Delay before showing, in ms. Defaults to 300. */
  delay?: number;
  disabled?: boolean;
}

export function Tooltip({
  content,
  children,
  placement = 'top',
  align = 'center',
  maxWidth = 200,
  showArrow = true,
  delay = 300,
  disabled = false,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  let timeout: ReturnType<typeof setTimeout>;

  const show = () => {
    if (disabled || !content) return;
    timeout = setTimeout(() => setVisible(true), delay);
  };
  const hide = () => {
    clearTimeout(timeout);
    setVisible(false);
  };

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
      })
    : children;

  return (
    <span className={styles.wrapper}>
      {trigger}
      {visible && content ? (
        <span
          role="tooltip"
          className={[styles.tooltip, styles[`placement-${placement}`], styles[`align-${align}`]].join(' ')}
          style={{ maxWidth }}
        >
          {content}
          {showArrow ? (
            <span className={[styles.arrow, styles[`arrow-${placement}`], styles[`arrow-align-${align}`]].join(' ')} />
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
