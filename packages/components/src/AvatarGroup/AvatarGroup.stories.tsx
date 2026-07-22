import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from './AvatarGroup';
import { Avatar } from '../Avatar/Avatar';
import womanPhoto1 from '../assets/avatars/woman-1.jpg';
import manPhoto1 from '../assets/avatars/man-1.jpg';
import manPhoto2 from '../assets/avatars/man-2.jpg';
import manPhoto3 from '../assets/avatars/man-3.jpg';
import womanPhoto2 from '../assets/avatars/woman-2.jpg';
import womanPhoto3 from '../assets/avatars/woman-3.jpg';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    max: { control: 'number' },
  },
  args: {
    size: 'sm',
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

/** All avatars render at the exact same pixel size regardless of variant (image/text/icon) — the group's `size` always wins. */
export const Playground: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar variant="image" src={womanPhoto1} alt="Team member" />
      <Avatar variant="image" src={manPhoto1} alt="Team member" />
      <Avatar variant="image" src={manPhoto2} alt="Team member" />
      <Avatar variant="text" initials="AA" />
      <Avatar variant="icon" />
    </AvatarGroup>
  ),
};

export const WithOverflow: Story = {
  args: { max: 3 },
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar variant="image" src={womanPhoto1} alt="Team member" />
      <Avatar variant="image" src={manPhoto1} alt="Team member" />
      <Avatar variant="image" src={manPhoto2} alt="Team member" />
      <Avatar variant="image" src={manPhoto3} alt="Team member" />
      <Avatar variant="image" src={womanPhoto2} alt="Team member" />
    </AvatarGroup>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <AvatarGroup key={size} size={size}>
          <Avatar variant="image" src={womanPhoto1} alt="Team member" />
          <Avatar variant="image" src={manPhoto1} alt="Team member" />
          <Avatar variant="text" initials="AA" />
        </AvatarGroup>
      ))}
    </div>
  ),
};

/** All six real photos together, at each size — confirms uniform sizing across every image's own aspect ratio. */
export const AllPhotos: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar variant="image" src={womanPhoto1} alt="Team member" />
      <Avatar variant="image" src={manPhoto1} alt="Team member" />
      <Avatar variant="image" src={manPhoto2} alt="Team member" />
      <Avatar variant="image" src={manPhoto3} alt="Team member" />
      <Avatar variant="image" src={womanPhoto2} alt="Team member" />
      <Avatar variant="image" src={womanPhoto3} alt="Team member" />
    </AvatarGroup>
  ),
};
