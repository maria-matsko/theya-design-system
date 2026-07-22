import type { Meta, StoryObj } from '@storybook/react';
import { ProgressState } from './ProgressState';

const meta: Meta<typeof ProgressState> = {
  title: 'Components/ProgressState',
  component: ProgressState,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['progress', 'awaiting', 'done', 'error', 'aborted'] },
  },
  args: {
    title: 'Installing WordPress',
    description: 'Some message and probably a',
    linkText: 'link',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressState>;

export const Progress: Story = {
  args: { type: 'progress', value: 28 },
  render: (args) => (
    <div style={{ width: 400 }}>
      <ProgressState {...args} />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 400 }}>
      <ProgressState
        type="progress"
        title="Installing WordPress"
        value={28}
        description="Some message and probably a"
        linkText="link"
      />
      <ProgressState
        type="awaiting"
        title="Installing WordPress"
        description="Some message and probably a"
        linkText="link"
      />
      <ProgressState type="done" title="WordPress successfully installed" />
      <ProgressState
        type="error"
        title="Couldn't install WordPress"
        description="Not enough disk space."
        linkText="Learn more"
      />
      <ProgressState
        type="aborted"
        title="The step couldn't be continued"
        description="Not enough disk space."
        linkText="Learn more"
      />
    </div>
  ),
};

export const NoDescription: Story = {
  args: { type: 'progress', value: 50, description: undefined },
  render: (args) => (
    <div style={{ width: 400 }}>
      <ProgressState {...args} />
    </div>
  ),
};

export const NoPercent: Story = {
  args: { type: 'progress', value: 50, showPercent: false },
  render: (args) => (
    <div style={{ width: 400 }}>
      <ProgressState {...args} />
    </div>
  ),
};
