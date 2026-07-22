import type { Meta, StoryObj } from '@storybook/react';
import { StatusIcon } from './StatusIcon';

const meta: Meta<typeof StatusIcon> = {
  title: 'Components/StatusIcon',
  component: StatusIcon,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['check', 'exclamation', 'cross', 'warning', 'progressing', 'empty', 'disable'],
    },
  },
  args: { status: 'check' },
};

export default meta;
type Story = StoryObj<typeof StatusIcon>;

export const Playground: Story = {};

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {(['check', 'exclamation', 'cross', 'warning', 'progressing', 'empty', 'disable'] as const).map(
        (s) => (
          <StatusIcon key={s} status={s} />
        ),
      )}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <StatusIcon status="progressing" size={16} />
      <StatusIcon status="progressing" size={20} />
      <StatusIcon status="progressing" size={28} />
    </div>
  ),
};
