import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Password } from './Password';

const meta: Meta<typeof Password> = {
  title: 'Components/Password',
  component: Password,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'fluid'] },
    labelPosition: { control: 'select', options: ['top', 'left'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
    showStrength: { control: 'boolean' },
  },
  args: {
    label: 'Password',
    placeholder: 'Enter password',
  },
};

export default meta;
type Story = StoryObj<typeof Password>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Password {...args} value={value} onChange={(e) => setValue(e.target.value)} />
    );
  },
};

export const WithStrengthMeter: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <Password
        {...args}
        showStrength
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

/**
 * Demonstrates all three gradient stages by pre-filling values that
 * satisfy 0–1, 2–3, and 4–5 of the default 5 rules.
 */
export const StrengthStages: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Password
        label="Weak (0–1 rules)"
        showStrength
        defaultValue="abc"
        width="lg"
      />
      <Password
        label="Medium (2–3 rules)"
        showStrength
        defaultValue="abcdefgh1"
        width="lg"
      />
      <Password
        label="Strong (4–5 rules)"
        showStrength
        defaultValue="Abcdefgh1!"
        width="lg"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    required: true,
    error: 'Password is required',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'secret123' },
};
