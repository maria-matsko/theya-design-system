import type { HTMLAttributes } from 'react';
import styles from './Line.module.css';

export interface LineProps extends HTMLAttributes<HTMLHRElement> {
  /** Direction of the rule. Defaults to horizontal. */
  orientation?: 'horizontal' | 'vertical';
}

export function Line({ orientation = 'horizontal', className, ...rest }: LineProps) {
  return (
    <hr
      className={[styles.line, styles[orientation], className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}
