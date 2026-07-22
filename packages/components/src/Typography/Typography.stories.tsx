import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Foundations/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'heading-3xl',
        'heading-2xl',
        'heading-xl',
        'heading-l',
        'heading-m',
        'heading-s',
        'heading-xs',
        'heading-2xs',
        'heading-3xs',
        'body-xl',
        'body-l',
        'body-m',
        'body-s',
        'body-xs',
      ],
    },
    weight: { control: 'select', options: [undefined, 'regular', 'medium', 'emphasize', 'strong'] },
    color: {
      control: 'select',
      options: ['default', 'subtle', 'subtler', 'link', 'on-dark', 'success', 'warning', 'danger'],
    },
  },
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Playground: Story = {};

const headingVariants = [
  'heading-3xl',
  'heading-2xl',
  'heading-xl',
  'heading-l',
  'heading-m',
  'heading-s',
  'heading-xs',
  'heading-2xs',
  'heading-3xs',
] as const;

const bodyVariants = ['body-xl', 'body-l', 'body-m', 'body-s', 'body-xs'] as const;

export const AllHeadings: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {headingVariants.map((v) => (
        <Typography key={v} variant={v}>
          {v} — The quick brown fox
        </Typography>
      ))}
    </div>
  ),
};

export const AllBodySizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {bodyVariants.map((v) => (
        <Typography key={v} variant={v}>
          {v} — The quick brown fox jumps over the lazy dog
        </Typography>
      ))}
    </div>
  ),
};

export const BodyWeights: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Typography variant="body-l">Regular (default)</Typography>
      <Typography variant="body-l" weight="medium">
        Medium (500)
      </Typography>
      <Typography variant="body-l" weight="emphasize">
        Emphasize (600)
      </Typography>
      <Typography variant="body-l" weight="strong">
        Strong (700)
      </Typography>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <Typography variant="body-l" color="default">
        Default
      </Typography>
      <Typography variant="body-l" color="subtle">
        Subtle
      </Typography>
      <Typography variant="body-l" color="subtler">
        Subtler
      </Typography>
      <Typography variant="body-l" color="link">
        Link
      </Typography>
      <Typography variant="body-l" color="success">
        Success
      </Typography>
      <Typography variant="body-l" color="warning">
        Warning
      </Typography>
      <Typography variant="body-l" color="danger">
        Danger
      </Typography>
    </div>
  ),
};
