import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'select', options: ['sm', 'md', 'lg', 'xl', 'fluid'] },
    resize: { control: 'select', options: ['vertical', 'both', 'none'] },
    labelPosition: { control: 'select', options: ['top', 'left'] },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    label: 'Field label',
    placeholder: 'Text',
    width: 'md',
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Playground: Story = {
  render: (args) => {
    const [value, setValue] = useState('');
    return <TextArea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
  },
};

export const WithValue: Story = {
  args: {
    defaultValue:
      'This is a longer piece of text to show how the textarea handles content that wraps across multiple lines, and scrolls once it exceeds the visible height.',
  },
};

export const ResizeBoth: Story = {
  args: { resize: 'both', width: 'lg' },
};

export const NoResize: Story = {
  args: { resize: 'none' },
};

export const WithDescription: Story = {
  args: { description: 'Write short description' },
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
    defaultValue: 'Valid content',
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Text' },
};

export const ReadOnly: Story = {
  args: { readOnly: true, defaultValue: 'Read-only value' },
};

export const LabelPosition: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <TextArea {...args} labelPosition="top" label="Label on top (default)" />
      <TextArea {...args} labelPosition="left" label="Label on the left" />
    </div>
  ),
};
