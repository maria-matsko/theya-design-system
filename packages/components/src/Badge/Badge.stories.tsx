import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Icon } from '@theya/icons';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['qty', 'icon', 'dot-small', 'dot-medium'],
    },
    intent: {
      control: 'select',
      options: ['inactive', 'info', 'success', 'warning', 'danger'],
    },
    type: { control: 'select', options: ['filled', 'outlined'] },
    size: { control: 'select', options: ['sm', 'md'] },
    border: { control: 'select', options: ['round', 'squared'] },
  },
  args: {
    variant: 'qty',
    intent: 'info',
    type: 'filled',
    size: 'sm',
    border: 'round',
    count: '5',
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

const intents = ['inactive', 'info', 'success', 'warning', 'danger'] as const;

export const AllIntentsFilled: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {intents.map((intent) => (
        <Badge key={intent} {...args} type="filled" intent={intent} />
      ))}
    </div>
  ),
};

export const AllIntentsOutlined: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {intents.map((intent) => (
        <Badge key={intent} {...args} type="outlined" intent={intent} />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Badge {...args} size="sm" />
      <Badge {...args} size="md" />
    </div>
  ),
};

export const RoundVsSquared: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Badge {...args} border="round" />
      <Badge {...args} border="squared" />
    </div>
  ),
};

export const Dots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {intents.map((intent) => (
        <Badge key={intent} variant="dot-small" intent={intent} />
      ))}
      {intents.map((intent) => (
        <Badge key={intent} variant="dot-medium" intent={intent} size="md" />
      ))}
    </div>
  ),
};

/**
 * The Figma file references specific Basil status icons (Danger,
 * Warning, Delete-circle) for this variant that aren't in the current
 * @theya/icons download — that pack's Status category doesn't include
 * them under any name. "Info" and "Success" below use real matches
 * (info-circle, checked-box); "Warning" uses info-triangle as the
 * closest available stand-in. Danger/Inactive are left out rather than
 * guessing with a visually wrong icon — swap in the real icons once
 * the fuller Basil set is available.
 */
export const IconVariant: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Badge variant="icon" intent="info" type="filled" size="sm" icon={<Icon name="info-circle" variant="solid" size={16} />} />
        <Badge variant="icon" intent="info" type="outlined" size="sm" icon={<Icon name="info-circle" variant="outline" size={16} />} />
        <Badge variant="icon" intent="success" type="filled" size="sm" icon={<Icon name="checked-box" variant="solid" size={16} />} />
        <Badge variant="icon" intent="success" type="outlined" size="sm" icon={<Icon name="checked-box" variant="outline" size={16} />} />
        <Badge variant="icon" intent="warning" type="filled" size="sm" icon={<Icon name="info-triangle" variant="solid" size={16} />} />
        <Badge variant="icon" intent="warning" type="outlined" size="sm" icon={<Icon name="info-triangle" variant="outline" size={16} />} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Badge variant="icon" intent="info" type="filled" size="md" icon={<Icon name="info-circle" variant="solid" size={20} />} />
        <Badge variant="icon" intent="info" type="outlined" size="md" icon={<Icon name="info-circle" variant="outline" size={20} />} />
        <Badge variant="icon" intent="success" type="filled" size="md" icon={<Icon name="checked-box" variant="solid" size={20} />} />
        <Badge variant="icon" intent="success" type="outlined" size="md" icon={<Icon name="checked-box" variant="outline" size={20} />} />
        <Badge variant="icon" intent="warning" type="filled" size="md" icon={<Icon name="info-triangle" variant="solid" size={20} />} />
        <Badge variant="icon" intent="warning" type="outlined" size="md" icon={<Icon name="info-triangle" variant="outline" size={20} />} />
      </div>
    </div>
  ),
};
