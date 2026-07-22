import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './Breadcrumbs.module.css';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  /** Defaults to a home icon on the first item, none on the rest — pass `null` to suppress. */
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items, className, ...rest }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={[styles.bar, className ?? ''].filter(Boolean).join(' ')}
      {...rest}
    >
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const icon = item.icon !== undefined ? item.icon : index === 0 ? <Icon name="home" size={12} /> : null;

          return (
            <li key={index} className={styles.item}>
              {isLast ? (
                <span className={styles.current}>
                  {icon ? <span className={styles.icon}>{icon}</span> : null}
                  {item.label}
                </span>
              ) : (
                <>
                  <a href={item.href} onClick={item.onClick} className={styles.link}>
                    {icon ? <span className={styles.icon}>{icon}</span> : null}
                    {item.label}
                  </a>
                  <span className={styles.separator} aria-hidden="true">
                    <Icon name="caret-right" size={16} />
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
