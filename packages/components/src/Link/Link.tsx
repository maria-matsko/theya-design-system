import type { AnchorHTMLAttributes, ReactNode } from 'react';
import styles from './Link.module.css';

export type LinkLevel = 'primary' | 'secondary';
export type LinkSize = 'sm' | 'md' | 'lg' | 'xl'; // body-s(12) / body-m(14) / body-l(16) / heading-xl(32)

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  level?: LinkLevel;
  size?: LinkSize;
  /** Bold weight — matches Figma's "Strong" toggle. */
  strong?: boolean;
  underline?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children?: ReactNode;
}

export function Link({
  level = 'primary',
  size = 'sm',
  strong = false,
  underline = false,
  startIcon,
  endIcon,
  children,
  className,
  ...rest
}: LinkProps) {
  const classNames = [
    styles.link,
    styles[`level-${level}`],
    styles[`size-${size}`],
    strong ? styles.strong : '',
    underline ? styles.underline : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a className={classNames} {...rest}>
      {startIcon ? <span className={styles.icon}>{startIcon}</span> : null}
      {children}
      {endIcon ? <span className={styles.icon}>{endIcon}</span> : null}
    </a>
  );
}
