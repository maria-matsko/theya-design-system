import type { KeyboardEvent, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import { Badge } from '../Badge/Badge';
import styles from './Tabs.module.css';

export interface TabItem {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  /** Trailing count badge. */
  badge?: ReactNode;
  /** Shows a close (×) button on this tab. */
  closable?: boolean;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  onClose?: (value: string) => void;
  className?: string;
}

export function Tabs({ items, value, onChange, onClose, className }: TabsProps) {
  const activeIndex = items.findIndex((t) => t.value === value);

  const focusTabAt = (index: number) => {
    const el = document.getElementById(`tab-${items[index]?.value}`);
    el?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = (index + 1) % items.length;
      onChange(items[next].value);
      focusTabAt(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = (index - 1 + items.length) % items.length;
      onChange(items[prev].value);
      focusTabAt(prev);
    }
  };

  return (
    <div role="tablist" className={[styles.tabs, className ?? ''].filter(Boolean).join(' ')}>
      {items.map((item, i) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            id={`tab-${item.value}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            disabled={item.disabled}
            className={[styles.tab, isActive ? styles.active : ''].filter(Boolean).join(' ')}
            onClick={() => onChange(item.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            <span className={styles.content}>
              {item.icon ? <span className={styles.icon}>{item.icon}</span> : null}
              <span className={styles.label}>{item.label}</span>
              {item.badge != null ? (
                <span className={styles.badge}>
                  <Badge variant="qty" intent="danger" size="sm" count={item.badge} />
                </span>
              ) : null}
              {item.closable ? (
                <span
                  role="button"
                  aria-label={`Close ${typeof item.label === 'string' ? item.label : 'tab'}`}
                  className={styles.closeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose?.(item.value);
                  }}
                >
                  <Icon name="cross-thin" variant="custom" size={8} />
                </span>
              ) : null}
            </span>
            <span className={styles.line} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
