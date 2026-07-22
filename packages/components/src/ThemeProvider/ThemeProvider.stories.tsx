import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider } from './ThemeProvider';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { Chip } from '../Chip/Chip';
import { Icon } from '@theya/icons';

const meta: Meta<typeof ThemeProvider> = {
  title: 'Foundations/ThemeProvider',
  component: ThemeProvider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Activates dark-theme CSS variables (data-theme="dark") that already exist in @theya/tokens. Wrap any part of your app in this to switch it to dark mode.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ThemeProvider>;

export const LightVsDark: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <ThemeProvider theme="light" style={{ padding: 24, borderRadius: 12, width: 320 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="gradient" type="filled">
            Gradient (no effect in light)
          </Button>
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip label="Active" intent="success" type="tonal" />
            <Chip label="Beta" intent="info" type="outlined" />
          </div>
        </div>
      </ThemeProvider>
      <ThemeProvider theme="dark" style={{ padding: 24, borderRadius: 12, width: 320 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Button variant="gradient" type="filled" leftIcon={<Icon name="user" size={16} />}>
            Gradient button
          </Button>
          <Button variant="gradient" type="outlined">
            Gradient border
          </Button>
          <div style={{ display: 'flex', gap: 8 }}>
            <Chip label="Active" intent="success" type="tonal" />
            <Chip label="Beta" intent="info" type="outlined" />
          </div>
        </div>
      </ThemeProvider>
    </div>
  ),
};

export const DarkThemeWithCard: Story = {
  render: () => (
    <ThemeProvider theme="dark" style={{ padding: 40 }}>
      <Card
        title="Dark mode card"
        description="Regular components render with their dark-token values automatically — no extra props needed."
        actions={
          <Button variant="gradient" type="filled" size="sm">
            Action
          </Button>
        }
      />
    </ThemeProvider>
  ),
};
