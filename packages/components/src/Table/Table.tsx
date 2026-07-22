import type { ReactNode } from 'react';
import { Icon } from '@theya/icons';
import { Checkbox } from '../Checkbox/Checkbox';
import styles from './Table.module.css';

export interface TableColumn<T> {
  key: string;
  header: ReactNode;
  render?: (row: T, index: number) => ReactNode;
  /** Reads `row[key]` directly when no `render` is given. */
  accessor?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
}

export type SortDirection = 'asc' | 'desc';

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  selectable?: boolean;
  selectedKeys?: string[];
  onSelectionChange?: (keys: string[]) => void;
  sortKey?: string;
  sortDirection?: SortDirection;
  onSortChange?: (key: string, direction: SortDirection) => void;
  onRowClick?: (row: T) => void;
  /** Trailing per-row actions cell, e.g. an "…" menu trigger. */
  rowActions?: (row: T) => ReactNode;
  emptyState?: ReactNode;
  stickyHeader?: boolean;
}

export function Table<T>({
  columns,
  data,
  rowKey,
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
  sortKey,
  sortDirection = 'asc',
  onSortChange,
  onRowClick,
  rowActions,
  emptyState,
  stickyHeader = false,
}: TableProps<T>) {
  const allKeys = data.map(rowKey);
  const allSelected = data.length > 0 && allKeys.every((k) => selectedKeys.includes(k));
  const someSelected = allKeys.some((k) => selectedKeys.includes(k));

  const toggleAll = () => {
    if (!onSelectionChange) return;
    onSelectionChange(allSelected ? [] : allKeys);
  };

  const toggleRow = (key: string) => {
    if (!onSelectionChange) return;
    onSelectionChange(
      selectedKeys.includes(key) ? selectedKeys.filter((k) => k !== key) : [...selectedKeys, key],
    );
  };

  const handleSort = (col: TableColumn<T>) => {
    if (!col.sortable || !onSortChange) return;
    const nextDirection: SortDirection = sortKey === col.key && sortDirection === 'asc' ? 'desc' : 'asc';
    onSortChange(col.key, nextDirection);
  };

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={stickyHeader ? styles.stickyHead : undefined}>
          <tr>
            {selectable ? (
              <th className={styles.checkboxCell}>
                <Checkbox checked={allSelected} indeterminate={someSelected && !allSelected} onChange={toggleAll} />
              </th>
            ) : null}
            {columns.map((col) => (
              <th
                key={col.key}
                className={[styles.headerCell, col.sortable ? styles.sortable : ''].join(' ')}
                style={{ width: col.width, textAlign: col.align ?? 'left' }}
                onClick={() => handleSort(col)}
              >
                <span className={styles.headerContent}>
                  {col.header}
                  {col.sortable ? (
                    <Icon
                      name="caret-down"
                      size={12}
                      style={{
                        opacity: sortKey === col.key ? 1 : 0.3,
                        transform: sortKey === col.key && sortDirection === 'desc' ? 'rotate(180deg)' : undefined,
                      }}
                    />
                  ) : null}
                </span>
              </th>
            ))}
            {rowActions ? <th className={styles.actionsHeaderCell} /> : null}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                className={styles.emptyCell}
                colSpan={columns.length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
              >
                {emptyState ?? 'No data'}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const key = rowKey(row);
              const selected = selectedKeys.includes(key);
              return (
                <tr
                  key={key}
                  className={[styles.row, selected ? styles.rowSelected : '', onRowClick ? styles.clickable : '']
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable ? (
                    <td className={styles.checkboxCell} onClick={(e) => e.stopPropagation()}>
                      <Checkbox checked={selected} onChange={() => toggleRow(key)} />
                    </td>
                  ) : null}
                  {columns.map((col) => (
                    <td key={col.key} className={styles.cell} style={{ textAlign: col.align ?? 'left' }}>
                      {col.render
                        ? col.render(row, index)
                        : col.accessor
                          ? col.accessor(row)
                          : String((row as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                  {rowActions ? (
                    <td className={styles.actionsCell} onClick={(e) => e.stopPropagation()}>
                      {rowActions(row)}
                    </td>
                  ) : null}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
