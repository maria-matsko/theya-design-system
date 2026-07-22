import { Children, isValidElement, cloneElement } from 'react';
import type { CSSProperties, HTMLAttributes, ReactElement } from 'react';
import type { AvatarProps, AvatarSize } from '../Avatar/Avatar';
import styles from './AvatarGroup.module.css';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Size applied to every child Avatar (overrides each child's own size). */
  size?: AvatarSize;
  /** Avatar elements to stack. */
  children: ReactElement<AvatarProps>[];
  /** Cap how many avatars render before showing a "+N" overflow indicator. */
  max?: number;
}

const OVERLAP: Record<AvatarSize, number> = { sm: -12, md: -16, lg: -20 };

export function AvatarGroup({ size = 'sm', children, max, className, ...rest }: AvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const visible = max ? items.slice(0, max) : items;
  const overflow = max && items.length > max ? items.length - max : 0;

  return (
    <div
      className={[styles.group, className ?? ''].filter(Boolean).join(' ')}
      style={{ '--_overlap': `${OVERLAP[size]}px` } as CSSProperties}
      {...rest}
    >
      {visible.map((child, index) =>
        cloneElement(child, {
          key: index,
          size,
          className: [styles.item, child.props.className ?? ''].filter(Boolean).join(' '),
        }),
      )}
      {overflow > 0 ? (
        <div className={[styles.item, styles.overflow, styles[`size-${size}`]].join(' ')}>
          +{overflow}
        </div>
      ) : null}
    </div>
  );
}
