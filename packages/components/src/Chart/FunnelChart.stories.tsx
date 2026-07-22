import type { Meta, StoryObj } from '@storybook/react';
import { FunnelChart } from './FunnelChart';

const meta: Meta<typeof FunnelChart> = {
  title: 'Components/Chart/FunnelChart',
  component: FunnelChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FunnelChart>;

/** Recreates the "Details" funnel from the mortgage-dashboard reference. */
export const Default: Story = {
  args: {
    data: [
      { label: 'Opened Request', value: 27800 },
      { label: 'Engaged', value: 18626 },
      { label: 'EOI Sent', value: 6672 },
    ],
    height: 300,
    valueFormatter: (v) => v.toLocaleString(),
  },
};
