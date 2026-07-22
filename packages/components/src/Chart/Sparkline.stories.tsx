import type { Meta, StoryObj } from '@storybook/react';
import { Sparkline } from './Sparkline';

const meta: Meta<typeof Sparkline> = {
  title: 'Components/Chart/Sparkline',
  component: Sparkline,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sparkline>;

const sampleData = [
  4, 4, 5, 5, 6, 8, 10, 14, 18, 22, 26, 28, 30, 28, 26, 22, 18, 14, 10, 8, 6, 5, 5, 4,
];

export const Default: Story = {
  args: { data: sampleData },
  render: (args) => (
    <div style={{ width: 240 }}>
      <Sparkline {...args} />
    </div>
  ),
};

/** Recreates the metric-card pattern (light bars with a highlighted colored range in the middle). */
export const HighlightedRange: Story = {
  render: () => (
    <div style={{ width: 240 }}>
      <Sparkline data={sampleData} color="primary" highlightRange={[8, 16]} />
    </div>
  ),
};

export const MetricCardExample: Story = {
  render: () => (
    <div
      style={{
        width: 220,
        padding: 20,
        borderRadius: 12,
        background: '#f7f7fe',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ fontSize: 32, fontWeight: 500 }}>12</div>
      <div style={{ color: '#5f6190', fontSize: 14 }}>Automations Running</div>
      <Sparkline data={sampleData} color="neutral" highlightRange={[8, 16]} height={24} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 240 }}>
      {(['primary', 'success', 'warning', 'danger', 'info'] as const).map((c) => (
        <Sparkline key={c} data={sampleData} color={c} />
      ))}
    </div>
  ),
};
