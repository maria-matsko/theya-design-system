import type { Meta, StoryObj } from '@storybook/react';
import { StatusMessage } from './StatusMessage';
import { Button } from '../Button/Button';

const meta: Meta<typeof StatusMessage> = {
  title: 'Components/StatusMessage',
  component: StatusMessage,
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'select', options: ['success', 'info', 'warning', 'danger'] },
  },
  args: {
    title: 'Status message title',
    children: 'Status message content',
  },
};

export default meta;
type Story = StoryObj<typeof StatusMessage>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 421 }}>
      <StatusMessage {...args} />
    </div>
  ),
};

export const AllIntents: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 421 }}>
      {(['success', 'info', 'warning', 'danger'] as const).map((intent) => (
        <StatusMessage key={intent} {...args} intent={intent} />
      ))}
    </div>
  ),
};

export const WithAction: Story = {
  args: {
    action: (
      <Button type="outlined" size="sm" intent="secondary">
        Status
      </Button>
    ),
  },
  render: (args) => (
    <div style={{ width: 421 }}>
      <StatusMessage {...args} />
    </div>
  ),
};

export const Dismissible: Story = {
  render: (args) => (
    <div style={{ width: 421 }}>
      <StatusMessage {...args} onClose={() => {}} />
    </div>
  ),
};

export const TitleOnly: Story = {
  args: { children: undefined },
  render: (args) => (
    <div style={{ width: 421 }}>
      <StatusMessage {...args} />
    </div>
  ),
};
