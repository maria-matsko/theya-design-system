import type { Meta, StoryObj } from '@storybook/react';
import { SegmentedBar } from './SegmentedBar';

const meta: Meta<typeof SegmentedBar> = {
  title: 'Components/Chart/SegmentedBar',
  component: SegmentedBar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SegmentedBar>;

/** Recreates the Nexfi spending-categories stacked bar. */
export const Default: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <SegmentedBar
        segments={[
          { value: 863, color: 'warning', label: 'Food & Health' },
          { value: 248, color: 'primary', label: 'Entertainments' },
          { value: 1835, color: 'info', label: 'Shopping' },
          { value: 1835, color: 'success', label: 'Investment' },
        ]}
      />
    </div>
  ),
};
