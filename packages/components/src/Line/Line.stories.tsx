import type { Meta, StoryObj } from '@storybook/react';
import { Line } from './Line';

const meta: Meta<typeof Line> = {
  title: 'Components/Line',
  component: Line,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export default meta;
type Story = StoryObj<typeof Line>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Line />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ height: 60, display: 'flex' }}>
      <Line orientation="vertical" />
    </div>
  ),
};
