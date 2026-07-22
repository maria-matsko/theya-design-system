import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Menu.module.css';

export type MenuWidth = 'standard' | 'media' | 'fluid';

export interface MenuProps extends HTMLAttributes<HTMLDivElement> {
  /** "standard" (224px) fits MenuItem's option/status/heading variants; "media" (266px) fits the media variant. */
  width?: MenuWidth;
  children?: ReactNode;
}

export function Menu({ width = 'standard', children, className, ...rest }: MenuProps) {
  return (
    <div
      role="menu"
      className={[styles.menu, styles[`width-${width}`], className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
