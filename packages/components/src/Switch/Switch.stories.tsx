import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    intent: { control: 'select', options: ['primary', 'warning', 'danger'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    label: 'Enable notifications',
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />
    );
  },
};

export const AllIntents: Story = {
  render: () => {
    const [state, setState] = useState({ primary: true, warning: true, danger: true });
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Switch
          label="Primary"
          checked={state.primary}
          onChange={(e) => setState((s) => ({ ...s, primary: e.target.checked }))}
        />
        <Switch
          intent="warning"
          label="Warning"
          checked={state.warning}
          onChange={(e) => setState((s) => ({ ...s, warning: e.target.checked }))}
        />
        <Switch
          intent="danger"
          label="Danger"
          checked={state.danger}
          onChange={(e) => setState((s) => ({ ...s, danger: e.target.checked }))}
        />
      </div>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <Switch aria-label="Off" />
      <Switch aria-label="On" checked readOnly />
      <Switch aria-label="Disabled off" disabled />
      <Switch aria-label="Disabled on" checked disabled readOnly />
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Switch
        label="Enable notifications"
        description="Write short description"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};
