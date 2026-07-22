import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Icon } from '@theya/icons';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Ported from the corporate DS Tooltip component (direction/position/width axes → placement/align/maxWidth).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Playground: Story = {
  args: { content: 'This is a tooltip', delay: 0 },
  render: (args) => (
    <div style={{ padding: 80 }}>
      <Tooltip {...args}>
        <Button size="sm">Hover me</Button>
      </Tooltip>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 64, padding: 80 }}>
      <Tooltip content="Top tooltip" placement="top" delay={0}>
        <Button size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" placement="bottom" delay={0}>
        <Button size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" placement="left" delay={0}>
        <Button size="sm">Left</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" placement="right" delay={0}>
        <Button size="sm">Right</Button>
      </Tooltip>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 64, padding: 80 }}>
      <Tooltip content="Start-aligned arrow" placement="top" align="start" delay={0}>
        <Button size="sm">Start</Button>
      </Tooltip>
      <Tooltip content="Center-aligned arrow" placement="top" align="center" delay={0}>
        <Button size="sm">Center</Button>
      </Tooltip>
      <Tooltip content="End-aligned arrow" placement="top" align="end" delay={0}>
        <Button size="sm">End</Button>
      </Tooltip>
    </div>
  ),
};

export const OnIconButton: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="Settings" delay={0}>
        <IconButton icon={<Icon name="settings" size={16} />} aria-label="Settings" />
      </Tooltip>
    </div>
  ),
};

export const LongContentWideVariant: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip
        content="This is a longer tooltip that needs more horizontal room to read comfortably."
        maxWidth={400}
        delay={0}
      >
        <Button size="sm">Wide tooltip</Button>
      </Tooltip>
    </div>
  ),
};

export const NoArrow: Story = {
  render: () => (
    <div style={{ padding: 80 }}>
      <Tooltip content="No arrow here" showArrow={false} delay={0}>
        <Button size="sm">No arrow</Button>
      </Tooltip>
    </div>
  ),
};
