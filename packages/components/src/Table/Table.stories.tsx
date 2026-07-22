import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import type { TableColumn } from './Table';
import { Chip } from '../Chip/Chip';
import { Avatar } from '../Avatar/Avatar';
import { IconButton } from '../IconButton/IconButton';
import { Menu } from '../Menu/Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import { Pagination } from '../Pagination/Pagination';
import { BulkActionBar } from '../BulkActionBar/BulkActionBar';
import { Icon } from '@theya/icons';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
};

export default meta;

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  joinDate: string;
}

const employees: Employee[] = [
  { id: '1', name: 'John Doe', department: 'Marketing', position: 'Manager', status: 'Active', joinDate: '2021-03-15' },
  { id: '2', name: 'Maria Tan', department: 'Finance', position: 'Finance Manager', status: 'On Leave', joinDate: '2020-01-10' },
  { id: '3', name: 'Charlie Brown', department: 'Design', position: 'UI/UX Designer', status: 'Active', joinDate: '2022-07-01' },
  { id: '4', name: 'Dana White', department: 'HR', position: 'Recruiter', status: 'Active', joinDate: '2019-11-05' },
  { id: '5', name: 'Fiona Glenanne', department: 'Finance', position: 'Accountant', status: 'Inactive', joinDate: '2018-05-10' },
];

const statusIntent = (status: Employee['status']) =>
  status === 'Active' ? 'success' : status === 'On Leave' ? 'warning' : 'danger';

export const Basic: StoryObj<typeof Table<Employee>> = {
  render: () => {
    const columns: TableColumn<Employee>[] = [
      {
        key: 'name',
        header: 'Name',
        sortable: true,
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar variant="text" size="sm" initials={row.name.slice(0, 2).toUpperCase()} />
            {row.name}
          </div>
        ),
      },
      { key: 'department', header: 'Department', sortable: true },
      { key: 'position', header: 'Position' },
      {
        key: 'status',
        header: 'Status',
        render: (row) => <Chip label={row.status} intent={statusIntent(row.status)} type="tonal" />,
      },
      { key: 'joinDate', header: 'Join Date', sortable: true },
    ];
    return <Table columns={columns} data={employees} rowKey={(r) => r.id} />;
  },
};

/** Full pattern: selectable rows, sortable columns, per-row "…" menu, Pagination, and a floating BulkActionBar — recreating the Humaine / Uxerflow references. */
export const FullExample: StoryObj<typeof Table<Employee>> = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([]);
    const [sortKey, setSortKey] = useState('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const columns: TableColumn<Employee>[] = [
      {
        key: 'name',
        header: 'Name',
        sortable: true,
        render: (row) => (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar variant="text" size="sm" initials={row.name.slice(0, 2).toUpperCase()} />
            {row.name}
          </div>
        ),
      },
      { key: 'department', header: 'Department', sortable: true },
      { key: 'position', header: 'Position' },
      {
        key: 'status',
        header: 'Status',
        render: (row) => <Chip label={row.status} intent={statusIntent(row.status)} type="tonal" />,
      },
      { key: 'joinDate', header: 'Join Date', sortable: true },
    ];

    return (
      <div style={{ position: 'relative' }}>
        <Table
          columns={columns}
          data={employees}
          rowKey={(r) => r.id}
          selectable
          selectedKeys={selected}
          onSelectionChange={setSelected}
          sortKey={sortKey}
          sortDirection={sortDirection}
          onSortChange={(key, dir) => {
            setSortKey(key);
            setSortDirection(dir);
          }}
          rowActions={(row) => (
            <div style={{ position: 'relative' }}>
              <IconButton
                icon={<Icon name="menu" size={16} />}
                aria-label="Row actions"
                size="md"
                type="ghost"
                onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)}
              />
              {openMenuId === row.id ? (
                <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 10 }}>
                  <Menu width="standard">
                    <MenuItem icon={<Icon name="eye" size={16} />} text="View Profile" onClick={() => setOpenMenuId(null)} />
                    <MenuItem icon={<Icon name="edit" size={16} />} text="Edit Details" onClick={() => setOpenMenuId(null)} />
                    <MenuItem variant="divider" />
                    <MenuItem
                      icon={<Icon name="trash" size={16} />}
                      text="Delete Employee"
                      onClick={() => setOpenMenuId(null)}
                    />
                  </Menu>
                </div>
              ) : null}
            </div>
          )}
        />
        <Pagination page={page} totalPages={5} onPageChange={setPage} totalItems={134} pageSize={27} />

        {selected.length > 0 ? (
          <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)' }}>
            <BulkActionBar
              selectedCount={selected.length}
              onClearSelection={() => setSelected([])}
              actions={[
                { key: 'export', label: 'Export', icon: <Icon name="download" size={16} />, onClick: () => {} },
                { key: 'archive', label: 'Archive', icon: <Icon name="box" size={16} />, onClick: () => {} },
                { key: 'delete', label: 'Delete', icon: <Icon name="trash" size={16} />, onClick: () => {}, destructive: true },
              ]}
            />
          </div>
        ) : null}
      </div>
    );
  },
};

export const Empty: StoryObj<typeof Table<Employee>> = {
  render: () => {
    const columns: TableColumn<Employee>[] = [
      { key: 'name', header: 'Name' },
      { key: 'department', header: 'Department' },
    ];
    return <Table columns={columns} data={[]} rowKey={(r) => r.id} emptyState="No employees found." />;
  },
};
