import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';
import { Button } from '../Button/Button';

const ChevronDown = () => (
  <svg width="100%" height="100%" viewBox="0 0 16 16" fill="none">
    <path
      d="M4 6l4 4 4-4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost', 'ghost-inverse'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    icon: <ChevronDown />,
    'aria-label': 'Toggle',
    type: 'filled',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

const types = ['filled', 'outlined', 'ghost', 'ghost-inverse'] as const;

export const AllTypes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      {types.map((type) => (
        <IconButton key={type} {...args} type={type} />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <IconButton {...args} size="sm" />
      <IconButton {...args} size="md" />
      <IconButton {...args} size="lg" />
    </div>
  ),
};

/** IconButton's height ruler matches Button's exactly at every size — they always line up side by side. */
export const AlignedWithButton: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <IconButton {...args} size="sm" />
        <Button size="sm">Small</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <IconButton {...args} size="md" />
        <Button size="md">Medium</Button>
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <IconButton {...args} size="lg" />
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
