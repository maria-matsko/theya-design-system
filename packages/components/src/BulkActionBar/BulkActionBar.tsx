import { useState } from 'react';
import type { ReactNode } from 'react';
import { Icon } from '@theya/icons';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import styles from './BulkActionBar.module.css';

export interface BulkAction {
  key: string;
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  destructive?: boolean;
}

export interface BulkActionBarProps {
  selectedCount: number;
  onClearSelection?: () => void;
  actions: BulkAction[];
  /** Actions beyond this count collapse into the trailing "…" overflow menu. Defaults to 3. */
  maxInlineActions?: number;
}

export function BulkActionBar({
  selectedCount,
  onClearSelection,
  actions,
  maxInlineActions = 3,
}: BulkActionBarProps) {
  const [overflowOpen, setOverflowOpen] = useState(false);
  const inlineActions = actions.slice(0, maxInlineActions);
  const overflowActions = actions.slice(maxInlineActions);

  if (selectedCount === 0) return null;

  return (
    <div className={styles.bar} role="toolbar">
      <div className={styles.selectedCell}>
        {onClearSelection ? (
          <button type="button" className={styles.checkbox} onClick={onClearSelection} aria-label="Clear selection">
            <Icon name="checked-box" variant="solid" size={20} />
          </button>
        ) : null}
        <span className={styles.count}>
          {selectedCount} selected
        </span>
      </div>

      <div className={styles.tools}>
        {inlineActions.map((action) => (
          <button
            key={action.key}
            type="button"
            className={[styles.action, action.destructive ? styles.destructive : ''].join(' ')}
            onClick={action.onClick}
          >
            {action.icon ? <span className={styles.actionIcon}>{action.icon}</span> : null}
            {action.label}
          </button>
        ))}

        {overflowActions.length > 0 ? (
          <div className={styles.overflowWrap}>
            <button
              type="button"
              className={styles.overflowButton}
              onClick={() => setOverflowOpen((o) => !o)}
              aria-label="More actions"
            >
              <Icon name="menu" size={16} />
            </button>
            {overflowOpen ? (
              <div className={styles.overflowMenu}>
                <Menu width="fluid">
                  {overflowActions.map((action) => (
                    <MenuItem
                      key={action.key}
                      icon={action.icon}
                      text={action.label}
                      onClick={() => {
                        action.onClick();
                        setOverflowOpen(false);
                      }}
                    />
                  ))}
                </Menu>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
