import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['bar', 'ring', 'ticks'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    color: { control: 'select', options: ['primary', 'success', 'warning', 'danger', 'info'] },
  },
  args: { value: 65 },
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Bar: Story = {
  render: (args) => (
    <div style={{ width: 300 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const BarSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <ProgressBar value={65} size="sm" />
      <ProgressBar value={65} size="md" />
      <ProgressBar value={65} size="lg" />
    </div>
  ),
};

/** Recreates the "Type 4" reference — thick bar with milestone markers. */
export const WithMilestones: Story = {
  args: { size: 'lg', showMilestones: true, milestoneCount: 4 },
  render: (args) => (
    <div style={{ width: 300 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const Ring: Story = {
  args: { variant: 'ring', value: 75 },
  render: (args) => <ProgressBar {...args} centerContent={<strong>75%</strong>} />,
};

/** Recreates the "Type 5" reference — ring with a "1 of 4" step counter. */
export const RingWithStepCounter: Story = {
  render: () => (
    <ProgressBar
      variant="ring"
      value={25}
      size="md"
      centerContent={
        <>
          <div style={{ fontFamily: 'var(--typography-body-xs-font)', fontSize: 10, color: 'var(--color-text-text-subtle)' }}>Status</div>
          <div style={{ fontFamily: 'var(--typography-body-s-font)', fontSize: 12, color: 'var(--color-text-text)' }}>1 of 4</div>
        </>
      }
    />
  ),
};

export const RingSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <ProgressBar variant="ring" value={70} size="sm" />
      <ProgressBar variant="ring" value={70} size="md" />
      <ProgressBar variant="ring" value={70} size="lg" />
    </div>
  ),
};

/** Recreates the Notivo tick-mark bar pattern. */
export const Ticks: Story = {
  args: { variant: 'ticks', value: 65 },
  render: (args) => (
    <div style={{ width: 300 }}>
      <ProgressBar {...args} />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      {(['primary', 'success', 'warning', 'danger', 'info'] as const).map((c) => (
        <ProgressBar key={c} value={60} color={c} />
      ))}
    </div>
  ),
};
