import type { Meta, StoryObj } from '@storybook/react';
import { BulkActionBar } from './BulkActionBar';
import { Icon } from '@theya/icons';

const meta: Meta<typeof BulkActionBar> = {
  title: 'Components/BulkActionBar',
  component: BulkActionBar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: { component: 'Ported from the corporate DS BulkActionBar component.' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BulkActionBar>;

export const Default: Story = {
  args: {
    selectedCount: 2,
    onClearSelection: () => {},
    actions: [
      { key: 'star', label: 'Action 1', icon: <Icon name="star" size={16} />, onClick: () => {} },
      { key: 'shield', label: 'Action 2', icon: <Icon name="shield" size={16} />, onClick: () => {} },
      { key: 'delete', label: 'Action 3', icon: <Icon name="trash" size={16} />, onClick: () => {}, destructive: true },
    ],
  },
};

export const WithOverflow: Story = {
  args: {
    selectedCount: 3,
    onClearSelection: () => {},
    maxInlineActions: 2,
    actions: [
      { key: 'archive', label: 'Archive', icon: <Icon name="box" size={16} />, onClick: () => {} },
      { key: 'next', label: 'Next stage', icon: <Icon name="arrow-right" size={16} />, onClick: () => {} },
      { key: 'reject', label: 'Reject', onClick: () => {} },
      { key: 'remove', label: 'Remove', onClick: () => {}, destructive: true },
    ],
  },
};
