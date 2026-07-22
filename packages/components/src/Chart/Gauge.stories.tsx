import type { Meta, StoryObj } from '@storybook/react';
import { Gauge } from './Gauge';

const meta: Meta<typeof Gauge> = {
  title: 'Components/Chart/Gauge',
  component: Gauge,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Gauge>;

/** Recreates the "Borrowers by State" reference. */
export const Default: Story = {
  args: {
    value: 25.5,
    max: 30,
    label: 'Total Amount',
    valueFormatter: (v) => `$${v}M`,
  },
};

export const SolidColor: Story = {
  args: { ...Default.args, color: 'primary' },
};

export const LowValue: Story = {
  args: { value: 12, max: 100, label: 'Progress', color: 'gradient' },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <Gauge value={70} label="Small" size={140} />
      <Gauge value={70} label="Medium" size={200} />
      <Gauge value={70} label="Large" size={280} />
    </div>
  ),
};
