import type { Meta, StoryObj } from '@storybook/react';
import { MenuItem } from './MenuItem';
import { Icon } from '@theya/icons';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['option', 'status', 'media', 'heading', 'divider'] },
    statusColor: { control: 'select', options: ['inactive', 'info', 'success', 'warning', 'danger'] },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    delimiter: { control: 'boolean' },
  },
  args: {
    text: 'Option',
    description: 'Description',
    icon: <Icon name="star" size={16} />,
  },
};

export default meta;
type Story = StoryObj<typeof MenuItem>;

export const Option: Story = {
  render: (args) => (
    <div style={{ width: 224 }}>
      <MenuItem {...args} onClick={() => {}} />
    </div>
  ),
};

export const Status: Story = {
  args: { variant: 'status' },
  render: (args) => (
    <div style={{ width: 224, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {(['inactive', 'info', 'success', 'warning', 'danger'] as const).map((c) => (
        <MenuItem key={c} {...args} statusColor={c} text={c} onClick={() => {}} />
      ))}
    </div>
  ),
};

export const Media: Story = {
  args: {
    variant: 'media',
    text: 'First custom option',
    description: 'Custom option description',
    mediaIcon: <Icon name="lightning" variant="solid" size={32} />,
  },
  render: (args) => (
    <div style={{ width: 266 }}>
      <MenuItem {...args} onClick={() => {}} />
    </div>
  ),
};

export const WithBadge: Story = {
  args: { badge: 99 },
  render: (args) => (
    <div style={{ width: 224 }}>
      <MenuItem {...args} onClick={() => {}} />
    </div>
  ),
};

export const Heading: Story = {
  args: { variant: 'heading', text: 'Group name' },
  render: (args) => (
    <div style={{ width: 224 }}>
      <MenuItem {...args} />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ width: 224, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <MenuItem text="Enable" description="Description" icon={<Icon name="star" size={16} />} onClick={() => {}} />
      <MenuItem
        text="Selected"
        description="Description"
        icon={<Icon name="star" size={16} />}
        selected
        onClick={() => {}}
      />
      <MenuItem
        text="Disabled"
        description="Description"
        icon={<Icon name="star" size={16} />}
        disabled
        onClick={() => {}}
      />
    </div>
  ),
};
