import { createContext, useContext } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './NavSidebar.module.css';

export type NavSidebarTheme = 'light' | 'dark';

const NavCollapsedContext = createContext(false);
export const useNavCollapsed = () => useContext(NavCollapsedContext);

const THEME_VARS: Record<NavSidebarTheme, CSSProperties> = {
  light: {
    ['--theya-nav-bg' as string]: 'var(--color-bg-surface-bg-surface)',
    ['--theya-nav-text' as string]: 'var(--color-text-text-subtle)',
    ['--theya-nav-text-active' as string]: 'var(--color-text-text)',
    ['--theya-nav-text-subtle' as string]: 'var(--color-text-text-subtler)',
    ['--theya-nav-bg-hover' as string]: 'var(--color-bg-secondary-bg-secondary-subtle-hover)',
    ['--theya-nav-bg-active' as string]: 'var(--color-bg-secondary-bg-secondary-subtle)',
    ['--theya-nav-border' as string]: 'var(--color-border-border-subtle)',
    ['--theya-nav-badge-bg' as string]: 'var(--color-bg-secondary-bg-secondary-subtle)',
    ['--theya-nav-badge-text' as string]: 'var(--color-text-text-subtler)',
  },
  dark: {
    ['--theya-nav-bg' as string]: 'var(--color-bg-layout-bg-sidebar)',
    ['--theya-nav-text' as string]: 'var(--color-text-text-on-dark)',
    ['--theya-nav-text-active' as string]: 'var(--color-text-text-on-dark)',
    ['--theya-nav-text-subtle' as string]: 'var(--color-text-text-subtle-on-dark)',
    ['--theya-nav-bg-hover' as string]: 'var(--color-bg-layout-bg-sidebar-section)',
    ['--theya-nav-badge-bg' as string]: 'var(--color-bg-layout-bg-sidebar-section)',
    ['--theya-nav-badge-text' as string]: 'var(--color-text-text-on-dark)',
    ['--theya-nav-bg-active' as string]: 'var(--color-bg-layout-bg-sidebar-selected)',
    ['--theya-nav-border' as string]: 'var(--color-bg-layout-bg-sidebar-section)',
  },
};

export interface NavSidebarProps {
  /** Logo slot, top-left of the header. */
  logo?: ReactNode;
  /** "Create" / "Add new" button slot, reserved in the header next to the logo. */
  createButton?: ReactNode;
  /** NavGroup / NavItem tree. */
  children: ReactNode;
  /** Widget card slot at the bottom — a progress bar, chart, storage meter, etc. */
  footerWidget?: ReactNode;
  /** User profile slot, below the widget. */
  profile?: ReactNode;
  theme?: NavSidebarTheme;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  width?: number;
  collapsedWidth?: number;
  /** Shows small captions under icons in collapsed mode. */
  showCollapsedLabels?: boolean;
}

export function NavSidebar({
  logo,
  createButton,
  children,
  footerWidget,
  profile,
  theme = 'light',
  collapsed = false,
  onToggleCollapse,
  width = 240,
  collapsedWidth = 64,
  showCollapsedLabels = true,
}: NavSidebarProps) {
  return (
    <NavCollapsedContext.Provider value={collapsed}>
      <div
        className={[styles.sidebar, styles[`theme-${theme}`], collapsed ? styles.collapsed : '']
          .filter(Boolean)
          .join(' ')}
        style={{ width: collapsed ? collapsedWidth : width, ...THEME_VARS[theme] }}
        data-collapsed-labels={showCollapsedLabels}
      >
        {(logo || createButton || onToggleCollapse) ? (
          <div className={styles.header}>
            <div className={styles.headerTop}>
              {logo ? <div className={styles.logo}>{logo}</div> : null}
              {onToggleCollapse ? (
                <button
                  type="button"
                  className={styles.collapseToggle}
                  onClick={onToggleCollapse}
                  aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <Icon name={collapsed ? 'caret-right' : 'caret-left'} size={16} />
                </button>
              ) : null}
            </div>
            {createButton && !collapsed ? <div className={styles.createSlot}>{createButton}</div> : null}
          </div>
        ) : null}

        <nav className={styles.nav}>{children}</nav>

        {(footerWidget || profile) ? (
          <div className={styles.footer}>
            {footerWidget && !collapsed ? <div className={styles.widget}>{footerWidget}</div> : null}
            {profile ? <div className={styles.profile}>{profile}</div> : null}
          </div>
        ) : null}
      </div>
    </NavCollapsedContext.Provider>
  );
}
