import { useState } from 'react';
import { Icon } from '@theya/icons';
import { IconButton } from '../IconButton/IconButton';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import styles from './Pagination.module.css';

export interface PaginationProps {
  /** 1-indexed current page. */
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** Total row count, for the "1–5 of 13" label. Omit to hide it. */
  totalItems?: number;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showFirstLast?: boolean;
}

function getPageList(page: number, totalPages: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const window = 1;
  for (let i = 1; i <= totalPages; i++) {
    const isEdge = i === 1 || i === totalPages;
    const isNearCurrent = Math.abs(i - page) <= window;
    if (isEdge || isNearCurrent) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis');
    }
  }
  return pages;
}

export function Pagination({
  page,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
  showFirstLast = true,
}: PaginationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pages = getPageList(page, totalPages);

  const rangeStart = pageSize ? (page - 1) * pageSize + 1 : undefined;
  const rangeEnd = pageSize && totalItems ? Math.min(page * pageSize, totalItems) : undefined;

  return (
    <div className={styles.paginator}>
      <div className={styles.pages}>
        {showFirstLast ? (
          <IconButton
            icon={<Icon name="skip-prev" size={16} />}
            aria-label="First page"
            type="ghost"
            size="md"
            disabled={page <= 1}
            onClick={() => onPageChange(1)}
          />
        ) : null}
        <IconButton
          icon={<Icon name="caret-left" size={16} />}
          aria-label="Previous page"
          type="ghost"
          size="md"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        />
        {pages.map((p, i) =>
          p === 'ellipsis' ? (
            <span key={`e-${i}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={[styles.pageItem, p === page ? styles.pageItemActive : ''].join(' ')}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          ),
        )}
        <IconButton
          icon={<Icon name="caret-right" size={16} />}
          aria-label="Next page"
          type="ghost"
          size="md"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        />
        {showFirstLast ? (
          <IconButton
            icon={<Icon name="skip-next" size={16} />}
            aria-label="Last page"
            type="ghost"
            size="md"
            disabled={page >= totalPages}
            onClick={() => onPageChange(totalPages)}
          />
        ) : null}
      </div>

      <div className={styles.meta}>
        {onPageSizeChange && pageSize ? (
          <div className={styles.rowsPerPage}>
            <span>Rows per page:</span>
            <div className={styles.rowsPerPageMenu}>
              <button type="button" className={styles.rowsPerPageButton} onClick={() => setMenuOpen((o) => !o)}>
                {pageSize}
                <Icon name="caret-down" size={12} />
              </button>
              {menuOpen ? (
                <div className={styles.menuAnchor}>
                  <Menu width="fluid">
                    {pageSizeOptions.map((size) => (
                      <MenuItem
                        key={size}
                        text={String(size)}
                        selected={size === pageSize}
                        onClick={() => {
                          onPageSizeChange(size);
                          setMenuOpen(false);
                        }}
                      />
                    ))}
                  </Menu>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
        {totalItems != null && rangeStart != null ? (
          <span className={styles.rowCount}>
            {rangeStart}–{rangeEnd ?? totalItems} of {totalItems}
          </span>
        ) : null}
      </div>
    </div>
  );
}
