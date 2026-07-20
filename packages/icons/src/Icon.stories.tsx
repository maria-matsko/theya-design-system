import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { outlineIcons } from './generated/outline';
import { solidIcons } from './generated/solid';

const meta: Meta<typeof Icon> = {
  title: 'Foundations/Icons',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['outline', 'solid'] },
    size: { control: 'number' },
  },
  args: {
    name: 'star',
    variant: 'outline',
    size: 24,
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Playground: Story = {};

function Gallery({ variant }: { variant: 'outline' | 'solid' }) {
  const names = Object.keys(variant === 'solid' ? solidIcons : outlineIcons).sort();
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
        gap: 8,
      }}
    >
      {names.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 6,
            padding: 12,
            border: '1px solid #eee',
            borderRadius: 6,
          }}
        >
          <Icon name={name as never} variant={variant} size={20} />
          <span style={{ fontSize: 10, textAlign: 'center', wordBreak: 'break-word' }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  );
}

export const AllOutlineIcons: Story = {
  render: () => <Gallery variant="outline" />,
  parameters: { layout: 'padded' },
};

export const AllSolidIcons: Story = {
  render: () => <Gallery variant="solid" />,
  parameters: { layout: 'padded' },
};
