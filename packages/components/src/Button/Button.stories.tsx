import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import type { ButtonProps } from './Button';
import { Icon } from '@theya/icons';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat'],
      description:
        'Higher-level visual treatment. Only "flat" exists today — gradient/glass variants land in a later phase.',
    },
    type: {
      control: 'select',
      options: ['filled', 'outlined', 'ghost'],
      description: 'Surface treatment within "flat" — matches Figma\'s Type axis.',
    },
    intent: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    children: 'Button label',
    variant: 'flat',
    type: 'filled',
    intent: 'primary',
    size: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

const intents = ['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const;

export const AllIntentsFilled: Story = {
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {intents.map((intent) => (
        <Button key={intent} {...args} type="filled" intent={intent}>
          {intent}
        </Button>
      ))}
    </div>
  ),
};

export const AllIntentsOutlined: Story = {
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {intents.map((intent) => (
        <Button key={intent} {...args} type="outlined" intent={intent}>
          {intent}
        </Button>
      ))}
    </div>
  ),
};

export const AllIntentsGhost: Story = {
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
      {intents.map((intent) => (
        <Button key={intent} {...args} type="ghost" intent={intent}>
          {intent}
        </Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const IconOnly: Story = {
  args: {
    iconOnly: true,
    leftIcon: <Icon name="star" size={16} />,
  },
};

export const WithIcons: Story = {
  render: (args: ButtonProps) => (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button {...args} leftIcon={<Icon name="plus" size={16} />}>
        Icon before
      </Button>
      <Button {...args} rightIcon={<Icon name="arrow-right" size={16} />}>
        Icon after
      </Button>
      <Button
        {...args}
        leftIcon={<Icon name="download" size={16} />}
        rightIcon={<Icon name="caret-down" size={16} />}
      >
        Both
      </Button>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};
