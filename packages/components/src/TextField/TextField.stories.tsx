import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
import { Icon } from '@theya/icons';

const meta: Meta<typeof TextField> = {
  title: 'Components/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outline', 'filled', 'flushed'] },
    size: { control: 'select', options: ['md', 'lg'] },
    width: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'fluid'] },
    labelPosition: { control: 'select', options: ['top', 'left'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Field label',
    placeholder: 'Text',
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextField {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const Fluid: Story = {
  args: { width: 'fluid' },
};

export const FixedWidths: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <TextField {...args} width="sm" label='width="sm" (60px)' />
      <TextField {...args} width="md" label='width="md" (200px)' />
      <TextField {...args} width="lg" label='width="lg" (348px)' />
      <TextField {...args} width="xl" label='width="xl" (500px)' />
    </div>
  ),
};

export const LabelPosition: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TextField {...args} labelPosition="top" label="Label on top (default)" />
      <TextField {...args} labelPosition="left" label="Label on the left" />
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <TextField {...args} variant="outline" label="Outline" />
      <TextField {...args} variant="filled" label="Filled" />
      <TextField {...args} variant="flushed" label="Flushed" />
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    leftIcon: <Icon name="star" size={16} />,
  },
};

export const Clearable: Story = {
  render: (args) => {
    const [value, setValue] = useState('Some text');
    return (
      <TextField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue('')}
      />
    );
  },
};

export const WithDescription: Story = {
  args: {
    description: 'Write short description',
  },
};

export const ErrorState: Story = {
  args: {
    required: true,
    error: 'This required field contains an error. Please fix it',
    defaultValue: 'Invalid value',
  },
};

export const SuccessState: Story = {
  args: {
    success: 'Looks good!',
    defaultValue: 'valid@example.com',
  },
};

export const SuccessIconOnly: Story = {
  args: {
    success: true,
    defaultValue: 'valid@example.com',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: 'Text',
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    defaultValue: 'Read-only value',
  },
};
