import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Avatar } from '../Avatar/Avatar';
import { AvatarGroup } from '../AvatarGroup/AvatarGroup';
import { Chip } from '../Chip/Chip';
import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';
import { Switch } from '../Switch/Switch';
import { Radio } from '../Radio/Radio';
import { Checkbox } from '../Checkbox/Checkbox';
import womanPhoto1 from '../assets/avatars/woman-1.jpg';
import manPhoto1 from '../assets/avatars/man-1.jpg';
import manPhoto2 from '../assets/avatars/man-2.jpg';
import { Icon } from '@theya/icons';
import novaWeb from '../assets/nova-web.jpg';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Ported from the corporate DS's SelectableCard pattern (see node 45339-10345 / examples at 45345-869) into Theya's own tokens and components. Slot-based: media, avatar, topLeft/topRight, favorite, eyebrow, title, status, description, details, chips, content, actions, choice.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card
      title="Card title"
      description="A short description explaining what this card represents and why it matters."
      actions={<Button size="sm">Action</Button>}
    />
  ),
};

export const WithMediaAndAvatar: Story = {
  render: () => (
    <Card
      media={<img src={novaWeb} alt="" />}
      avatar={<Avatar variant="image" src={novaWeb} size="md" outline />}
      title="Nova Web"
      titleTrailing={<Chip label="New" intent="info" type="tonal" />}
      description="Your new dashboard for managing everything in one place."
      actions={<Button size="sm">Open</Button>}
    />
  ),
};

export const WithTopRowControls: Story = {
  render: () => (
    <Card
      topLeft={
        <div style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="lightning" variant="solid" size={24} />
        </div>
      }
      topRight={
        <>
          <IconButton icon={<Icon name="settings" size={16} />} aria-label="Settings" size="sm" type="ghost" />
          <Switch defaultChecked />
        </>
      }
      title="Nova AI"
      status={
        <>
          <span>Active</span>
          <span>·</span>
          <span>Updated 2h ago</span>
        </>
      }
      description="AI-powered automation running in the background, keeping things tidy without you lifting a finger."
      chips={
        <>
          <Chip label="Automated" intent="success" type="tonal" />
          <Chip label="Beta" intent="warning" type="outlined" />
        </>
      }
    />
  ),
};

export const SingleChoice: Story = {
  render: () => {
    const [value, setValue] = useState('a');
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        {['a', 'b', 'c'].map((v) => (
          <Card
            key={v}
            choice={<Radio name="plan" checked={value === v} onChange={() => setValue(v)} />}
            selected={value === v}
            onClick={() => setValue(v)}
            title={`Plan ${v.toUpperCase()}`}
            description="Includes everything you need to get started, plus a bit more."
            details={
              <>
                <Icon name="check" size={12} />
                <span>Unlimited projects</span>
              </>
            }
          />
        ))}
      </div>
    );
  },
};

export const MultiChoice: Story = {
  render: () => {
    const [checked, setChecked] = useState<string[]>(['a']);
    const toggle = (v: string) =>
      setChecked((c) => (c.includes(v) ? c.filter((x) => x !== v) : [...c, v]));
    return (
      <div style={{ display: 'flex', gap: 16 }}>
        {['a', 'b'].map((v) => (
          <Card
            key={v}
            choice={<Checkbox checked={checked.includes(v)} onChange={() => toggle(v)} />}
            selected={checked.includes(v)}
            onClick={() => toggle(v)}
            title={`Feature ${v.toUpperCase()}`}
            description="A feature you can opt into, with its own settings and behavior."
          />
        ))}
      </div>
    );
  },
};

export const WithFavorite: Story = {
  render: () => (
    <Card
      favorite={<Icon name="star" variant="solid" size={16} />}
      title="Starred item"
      description="This card has been marked as a favorite."
    />
  ),
};

export const Selected: Story = {
  render: () => (
    <Card selected title="Selected card" description="This card is in a selected state." />
  ),
};

export const Disabled: Story = {
  render: () => (
    <Card disabled title="Disabled card" description="This card can't be interacted with." />
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <Card
      width={593}
      title="Wide card"
      description="A wider card, useful for row-style layouts with more horizontal content."
      status={
        <>
          <span>Status A</span>
          <span>·</span>
          <span>Status B</span>
        </>
      }
      actions={
        <>
          <IconButton icon={<Icon name="star" size={16} />} aria-label="Star" size="sm" type="ghost" />
          <IconButton icon={<Icon name="settings" size={16} />} aria-label="Settings" size="sm" type="ghost" />
        </>
      }
    />
  ),
};

/**
 * Recreates node 45408-1389 — a colored icon chip in the header, inline
 * icon+text status pairs, and Avatars + a Button combined in `details`.
 * Nothing new was needed in Card itself; every slot already accepts
 * arbitrary composed content.
 */
export const IconChipWithAvatarsAndButton: Story = {
  render: () => (
    <Card
      topLeft={
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: 'var(--color-bg-primary-bg-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-icon-icon-on-dark)',
          }}
        >
          <Icon name="lightning" variant="solid" size={16} />
        </div>
      }
      title="Team workspace"
      status={
        <>
          <Icon name="user" size={12} />
          <span>12 members</span>
          <Icon name="globe" size={12} />
          <span>Public</span>
        </>
      }
      description="A shared space for the whole team to collaborate on projects."
      details={
        <>
          <AvatarGroup size="sm" max={3}>
            <Avatar variant="image" src={womanPhoto1} />
            <Avatar variant="image" src={manPhoto1} />
            <Avatar variant="image" src={manPhoto2} />
          </AvatarGroup>
          <Button size="sm" type="outlined" intent="secondary">
            Invite
          </Button>
        </>
      }
    />
  ),
};
