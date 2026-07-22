import { useState } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '@theya/icons';
import { useNavCollapsed } from '../NavSidebar/NavSidebar';
import styles from './NavGroup.module.css';

export interface NavGroupProps {
  label: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  /** Icon-rail mode — hides the group header/chevron, just stacks the items. Defaults to the enclosing NavSidebar's collapsed state, if any. */
  collapsed?: boolean;
}

export function NavGroup({ label, children, defaultOpen = true, collapsed }: NavGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contextCollapsed = useNavCollapsed();
  const isCollapsed = collapsed ?? contextCollapsed;

  if (isCollapsed) {
    return <div className={styles.collapsedGroup}>{children}</div>;
  }

  return (
    <div className={styles.group}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.headerLabel}>{label}</span>
        <Icon
          name="caret-down"
          size={16}
          style={{ transform: open ? 'rotate(180deg)' : undefined, transition: 'transform 150ms ease' }}
        />
      </button>
      {open ? <div className={styles.content}>{children}</div> : null}
    </div>
  );
}
