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
import { LineChart } from '../Chart/LineChart';

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
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 4,
            background: 'var(--color-bg-primary-bg-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-icon-icon-primary)',
          }}
        >
          <Icon name="star" variant="solid" size={20} />
        </div>
      }
      topRight={
        <>
          <IconButton icon={<Icon name="settings" size={16} />} aria-label="Settings" size="md" type="ghost" />
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
          <IconButton icon={<Icon name="star" size={16} />} aria-label="Star" size="md" type="ghost" />
          <IconButton icon={<Icon name="settings" size={16} />} aria-label="Settings" size="md" type="ghost" />
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
            background: 'var(--color-bg-primary-bg-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-icon-icon-primary)',
          }}
        >
          <Icon name="star" variant="solid" size={16} />
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <AvatarGroup size="sm" max={3}>
            <Avatar variant="image" src={womanPhoto1} />
            <Avatar variant="image" src={manPhoto1} />
            <Avatar variant="image" src={manPhoto2} />
          </AvatarGroup>
          <Button size="sm" type="outlined" intent="secondary">
            Invite
          </Button>
        </div>
      }
    />
  ),
};

/** Recreates node 45408-4225 — a small tinted icon chip, title, description. No new capability needed. */
export const SimpleIconTitleDescription: Story = {
  render: () => (
    <Card
      topLeft={
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: 'var(--color-bg-primary-bg-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-icon-icon-primary)',
          }}
        >
          <Icon name="star" variant="solid" size={16} />
        </div>
      }
      title="Nova"
      description="Your AI-powered assistant for everyday tasks."
    />
  ),
};

/** Recreates node 45388-11936 — icon + title + inline status row (rating + separator + copy-count), no media. */
export const IconWithInlineStatusRow: Story = {
  render: () => (
    <Card
      topLeft={
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 4,
            background: 'var(--color-bg-primary-bg-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-icon-icon-primary)',
          }}
        >
          <Icon name="star" variant="solid" size={16} />
        </div>
      }
      title="Component library"
      status={
        <>
          <Icon name="star" variant="solid" size={12} />
          <span>4.8</span>
          <span>·</span>
          <Icon name="copy" size={12} />
          <span>1.2k copies</span>
        </>
      }
      description="A shared set of reusable UI building blocks for the team."
    />
  ),
};

/** Recreates node 45388-8010 — media + small top logo + description + a details row split between an icon+text on the left and a Chip on the right. */
export const MediaWithDetailsRowAndChip: Story = {
  render: () => (
    <Card
      media={<img src={novaWeb} alt="" />}
      topLeft={
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 4,
            background: 'var(--color-bg-primary-bg-primary-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-icon-icon-primary)',
          }}
        >
          <Icon name="star" variant="solid" size={20} />
        </div>
      }
      title="Nova Web"
      description="Your new dashboard for managing everything in one place."
      details={
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="wallet" size={12} />
            <span>$12,400 raised</span>
          </div>
          <Chip label="54K" intent="info" type="filled" />
        </div>
      }
    />
  ),
};

/** Recreates node 45408-1389 — eyebrow + header with a trailing external-link icon + description + a chart in `content` + a bottom Button. */
export const StatCardWithChart: Story = {
  render: () => (
    <Card
      width={280}
      eyebrow={
        <span
          style={{
            fontFamily: 'var(--typography-body-s-font)',
            fontSize: 'var(--typography-body-s-size)',
            color: 'var(--color-text-text-subtler)',
          }}
        >
          Net Revenue
        </span>
      }
      title={
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'var(--typography-heading-heading-l-font)',
            fontWeight: 'var(--typography-weight-medium)',
            fontSize: 'var(--typography-heading-heading-l-size)',
            lineHeight: 'var(--typography-heading-heading-l-line-height)',
            color: 'var(--color-text-text)',
          }}
        >
          +$34.58M
          <Icon name="arrow-up" size={16} style={{ transform: 'rotate(45deg)', color: 'var(--color-icon-icon-success)' }} />
        </span>
      }
      description="With Nova, every customer idea becomes a site or app in seconds"
      content={
        <div style={{ marginTop: 16 }}>
          <LineChart
            data={[
              { x: 1, v: 20 },
              { x: 2, v: 18 },
              { x: 3, v: 22 },
              { x: 4, v: 19 },
              { x: 5, v: 30 },
              { x: 6, v: 45 },
            ]}
            xKey="x"
            series={[{ key: 'v', color: 'primary' }]}
            variant="area"
            height={100}
            showGrid={false}
            showYAxis={false}
          />
        </div>
      }
      actions={<Button size="sm">Label</Button>}
    />
  ),
};
