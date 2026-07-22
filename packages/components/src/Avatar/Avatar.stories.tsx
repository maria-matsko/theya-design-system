import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import womanPhoto from '../assets/avatars/woman-1.jpg';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    shape: { control: 'select', options: ['round', 'square'] },
    variant: { control: 'select', options: ['icon', 'image', 'text'] },
    outline: { control: 'boolean' },
    gradientBorder: { control: 'boolean' },
    initials: { control: 'text' },
  },
  args: {
    size: 'md',
    shape: 'round',
    variant: 'icon',
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar {...args} variant="icon" />
      <Avatar {...args} variant="text" initials="AA" />
      <Avatar {...args} variant="image" src={womanPhoto} alt="User" />
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar {...args} shape="round" />
      <Avatar {...args} shape="square" />
    </div>
  ),
};

export const OutlineTreatment: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar {...args} variant="icon" outline={false} />
      <Avatar {...args} variant="icon" outline />
      <Avatar {...args} variant="image" src={womanPhoto} outline={false} />
      <Avatar {...args} variant="image" src={womanPhoto} outline />
    </div>
  ),
};

/** The angular "Avatar gradient" ring (blue-200 → purple-200 → teal-200), matching the Figma spec. */
export const GradientBorder: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar {...args} variant="text" initials="AA" gradientBorder />
      <Avatar {...args} variant="icon" gradientBorder />
      <Avatar {...args} variant="image" src={womanPhoto} gradientBorder />
    </div>
  ),
};

export const WithBadge: Story = {
  args: {
    badgeCount: 5,
  },
};
