import type { ReactNode, MouseEventHandler } from 'react';
import { useNavCollapsed } from '../NavSidebar/NavSidebar';
import styles from './NavItem.module.css';

export interface NavItemProps {
  icon?: ReactNode;
  label: ReactNode;
  /** Trailing count/label, e.g. a notification count. */
  badge?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Icon-only rail mode. Defaults to the enclosing NavSidebar's collapsed state, if any. */
  collapsed?: boolean;
  /** Shows a small caption under the icon in collapsed mode. */
  showCollapsedLabel?: boolean;
  /** Indents the item — used for items nested inside a NavGroup. */
  nested?: boolean;
}

export function NavItem({
  icon,
  label,
  badge,
  active = false,
  disabled = false,
  href = '#',
  onClick,
  collapsed,
  showCollapsedLabel = true,
  nested = false,
}: NavItemProps) {
  const contextCollapsed = useNavCollapsed();
  const isCollapsed = collapsed ?? contextCollapsed;

  const classNames = [
    styles.item,
    active ? styles.active : '',
    disabled ? styles.disabled : '',
    isCollapsed ? styles.collapsed : '',
    nested ? styles.nested : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classNames}
      href={disabled ? undefined : href}
      onClick={disabled ? undefined : onClick}
      aria-current={active ? 'page' : undefined}
      aria-disabled={disabled || undefined}
    >
      {icon ? <span className={styles.icon}>{icon}</span> : null}
      {isCollapsed ? (
        showCollapsedLabel ? <span className={styles.collapsedLabel}>{label}</span> : null
      ) : (
        <>
          <span className={styles.label}>{label}</span>
          {badge != null ? <span className={styles.badge}>{badge}</span> : null}
        </>
      )}
    </a>
  );
}
