import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { MenuItem } from '../MenuItem/MenuItem';
import { Button } from '../Button/Button';
import { Icon } from '@theya/icons';
import rocketIcon from '../assets/rocket.svg';
import protectIcon from '../assets/protect.svg';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    width: { control: 'select', options: ['standard', 'media', 'fluid'] },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Standalone: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem
        text="Option 1"
        description="Description"
        icon={<Icon name="star" size={16} />}
        badge={99}
        onClick={() => {}}
      />
      <MenuItem
        text="Option 2"
        description="Description"
        icon={<Icon name="star" size={16} />}
        selected
        onClick={() => {}}
      />
      <MenuItem variant="divider" />
      <MenuItem
        text="Option 3"
        description="Description"
        icon={<Icon name="star" size={16} />}
        onClick={() => {}}
      />
    </Menu>
  ),
};

export const WithGroupHeading: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem variant="heading" text="Group name" />
      <MenuItem text="Option 1" icon={<Icon name="star" size={16} />} onClick={() => {}} />
      <MenuItem text="Option 2" icon={<Icon name="star" size={16} />} onClick={() => {}} />
    </Menu>
  ),
};

export const StatusItems: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem variant="status" statusColor="success" text="Online" onClick={() => {}} />
      <MenuItem variant="status" statusColor="warning" text="Away" onClick={() => {}} />
      <MenuItem variant="status" statusColor="inactive" text="Offline" onClick={() => {}} />
    </Menu>
  ),
};

export const MediaItems: Story = {
  args: { width: 'media' },
  render: (args) => (
    <Menu {...args}>
      <MenuItem
        variant="media"
        text="Rockets"
        description="Launch something new"
        mediaIcon={<img src={rocketIcon} alt="" width={32} height={32} />}
        onClick={() => {}}
      />
      <MenuItem
        variant="media"
        text="Shield"
        description="Stay protected"
        mediaIcon={<img src={protectIcon} alt="" width={32} height={32} />}
        onClick={() => {}}
      />
    </Menu>
  ),
};

/**
 * The three trigger patterns you asked about — a chevron icon button,
 * a Select, and a text link with a chevron — all anchoring the same
 * Menu underneath.
 */
export const AnchoredUnderTriggers: Story = {
  render: () => {
    const [openA, setOpenA] = useState(false);
    const [openB, setOpenB] = useState(false);

    const menu = (
      <Menu>
        <MenuItem text="Option 1" icon={<Icon name="star" size={16} />} onClick={() => {}} />
        <MenuItem text="Option 2" icon={<Icon name="star" size={16} />} onClick={() => {}} />
        <MenuItem text="Option 3" icon={<Icon name="star" size={16} />} onClick={() => {}} />
      </Menu>
    );

    return (
      <div style={{ display: 'flex', gap: 48, height: 260, alignItems: 'flex-start' }}>
        <div style={{ position: 'relative' }}>
          <Button
            rightIcon={<Icon name="caret-down" size={16} />}
            onClick={() => setOpenA((o) => !o)}
          >
            Button trigger
          </Button>
          {openA ? <div style={{ position: 'absolute', top: '100%', marginTop: 4 }}>{menu}</div> : null}
        </div>
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setOpenB((o) => !o)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              color: 'var(--color-text-text-link)',
              cursor: 'pointer',
              fontFamily: 'var(--typography-body-m-font)',
              fontSize: 'var(--typography-body-m-size)',
              fontWeight: 'var(--typography-weight-medium)',
            }}
          >
            Text link trigger
            <Icon name="caret-down" size={16} />
          </button>
          {openB ? <div style={{ position: 'absolute', top: '100%', marginTop: 4 }}>{menu}</div> : null}
        </div>
      </div>
    );
  },
};
