import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { Icon } from '@theya/icons';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Playground: Story = {
  render: () => {
    const [value, setValue] = useState('overview');
    return (
      <Tabs
        value={value}
        onChange={setValue}
        items={[
          { value: 'overview', label: 'Overview' },
          { value: 'settings', label: 'Settings' },
          { value: 'billing', label: 'Billing' },
        ]}
      />
    );
  },
};

export const WithIconsAndBadges: Story = {
  render: () => {
    const [value, setValue] = useState('inbox');
    return (
      <Tabs
        value={value}
        onChange={setValue}
        items={[
          { value: 'inbox', label: 'Inbox', icon: <Icon name="star" size={16} />, badge: 5 },
          { value: 'sent', label: 'Sent', icon: <Icon name="star" size={16} /> },
          { value: 'drafts', label: 'Drafts', badge: 12 },
        ]}
      />
    );
  },
};

export const Closable: Story = {
  render: () => {
    const [items, setItems] = useState([
      { value: 'a', label: 'File 1.tsx', closable: true },
      { value: 'b', label: 'File 2.tsx', closable: true },
      { value: 'c', label: 'File 3.tsx', closable: true },
    ]);
    const [value, setValue] = useState('a');
    return (
      <Tabs
        value={value}
        onChange={setValue}
        items={items}
        onClose={(v) => {
          const next = items.filter((i) => i.value !== v);
          setItems(next);
          if (value === v && next.length) setValue(next[0].value);
        }}
      />
    );
  },
};

export const DisabledTab: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <Tabs
        value={value}
        onChange={setValue}
        items={[
          { value: 'a', label: 'Available' },
          { value: 'b', label: 'Coming soon', disabled: true },
          { value: 'c', label: 'Available' },
        ]}
      />
    );
  },
};
