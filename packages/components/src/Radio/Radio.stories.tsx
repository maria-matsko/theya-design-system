import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    label: 'Option',
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Radio {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
    );
  },
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['a', 'b', 'c'].map((v) => (
          <Radio
            key={v}
            name="demo-group"
            label={`Option ${v.toUpperCase()}`}
            checked={value === v}
            onChange={() => setValue(v)}
          />
        ))}
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Radio aria-label="Unchecked" />
      <Radio aria-label="Checked" checked readOnly />
      <Radio aria-label="Disabled unchecked" disabled />
      <Radio aria-label="Disabled checked" checked disabled readOnly />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Radio
        label="Option"
        description="Write short description"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};
