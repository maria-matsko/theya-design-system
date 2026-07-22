import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';
import { Icon } from '@theya/icons';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  tags: ['autodocs'],
  argTypes: {
    level: { control: 'select', options: ['primary', 'secondary'] },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    strong: { control: 'boolean' },
    underline: { control: 'boolean' },
  },
  args: {
    children: 'Link text',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {};

export const Levels: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 24 }}>
      <Link {...args} level="primary" />
      <Link {...args} level="secondary" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Link {...args} size="sm" />
      <Link {...args} size="md" />
      <Link {...args} size="lg" />
      <Link {...args} size="xl" />
    </div>
  ),
};

export const StrongAndUnderline: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <Link {...args} strong={false} underline={false} />
      <Link {...args} strong underline={false} />
      <Link {...args} strong={false} underline />
      <Link {...args} strong underline />
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    startIcon: <Icon name="star" size={16} />,
    endIcon: <Icon name="arrow-right" size={16} />,
  },
};
