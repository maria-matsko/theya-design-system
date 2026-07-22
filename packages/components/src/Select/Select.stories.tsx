import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry (disabled)', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outline', 'filled', 'flushed'] },
    size: { control: 'select', options: ['md', 'lg'] },
    width: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'fluid'] },
    labelPosition: { control: 'select', options: ['top', 'left'] },
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    options: fruitOptions,
    label: 'Field label',
    placeholder: 'Select a fruit',
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Playground: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <Select {...args} variant="outline" label="Outline" />
      <Select {...args} variant="filled" label="Filled" />
      <Select {...args} variant="flushed" label="Flushed" />
    </div>
  ),
};

export const WithDescription: Story = {
  args: { description: 'Choose your favorite' },
};

export const ErrorState: Story = {
  args: {
    required: true,
    error: 'This required field contains an error. Please fix it',
  },
};

export const SuccessState: Story = {
  args: {
    success: 'Looks good!',
    defaultValue: 'apple',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'apple' },
};

export const LabelPosition: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Select {...args} labelPosition="top" label="Label on top (default)" />
      <Select {...args} labelPosition="left" label="Label on the left" />
    </div>
  ),
};
