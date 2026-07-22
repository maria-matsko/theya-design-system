import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    max: { control: 'number' },
    size: { control: 'number' },
  },
  args: {
    value: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Playground: Story = {};

export const AllValues: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {[0, 1, 2, 3, 4, 5].map((v) => (
        <Rating key={v} value={v} />
      ))}
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return <Rating value={value} onChange={setValue} />;
  },
};
