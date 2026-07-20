import type { Meta, StoryObj } from '@storybook/react';
import { Fab } from './Fab';

const StarIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 2l2.9 6.3 6.9.8-5.1 4.8 1.4 6.8L12 17.3 5.9 20.7l1.4-6.8-5.1-4.8 6.9-.8L12 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const meta: Meta<typeof Fab> = {
  title: 'Components/Fab',
  component: Fab,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['light-primary', 'white', 'inverse', 'primary'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    icon: <StarIcon />,
    'aria-label': 'Favorite',
    color: 'primary',
    size: 'lg',
  },
};

export default meta;
type Story = StoryObj<typeof Fab>;

export const Playground: Story = {};

const colors = ['light-primary', 'white', 'inverse', 'primary'] as const;

export const AllColors: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: 16 }}>
      {colors.map((color) => (
        <Fab key={color} {...args} color={color} />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Fab {...args} size="sm" />
      <Fab {...args} size="md" />
      <Fab {...args} size="lg" />
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};
