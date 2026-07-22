import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';
import { Icon } from '@theya/icons';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'select', options: ['inactive', 'info', 'success', 'warning', 'danger'] },
    type: { control: 'select', options: ['filled', 'tonal', 'outlined'] },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Chip',
    intent: 'info',
    type: 'filled',
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Playground: Story = {};

const intents = ['inactive', 'info', 'success', 'warning', 'danger'] as const;

export const AllIntentsFilled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {intents.map((intent) => (
        <Chip key={intent} {...args} type="filled" intent={intent} label={intent} />
      ))}
    </div>
  ),
};

export const AllIntentsTonal: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {intents.map((intent) => (
        <Chip key={intent} {...args} type="tonal" intent={intent} label={intent} />
      ))}
    </div>
  ),
};

export const AllIntentsOutlined: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {intents.map((intent) => (
        <Chip key={intent} {...args} type="outlined" intent={intent} label={intent} />
      ))}
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    icon: <Icon name="star" size={10} />,
  },
};

export const Removable: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    if (!visible) return <span style={{ color: '#888' }}>Removed</span>;
    return <Chip {...args} onClose={() => setVisible(false)} />;
  },
};

export const Disabled: Story = {
  args: { disabled: true, onClose: () => {} },
};

/** Chips can be clickable, matching Figma's Hover/Pressed/Focus states. */
export const Clickable: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        {...args}
        type={selected ? 'filled' : 'outlined'}
        onClick={() => setSelected((s) => !s)}
      />
    );
  },
};
