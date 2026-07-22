import type { Meta, StoryObj } from '@storybook/react';
import { LivePlayground } from './LivePlayground';

const meta: Meta<typeof LivePlayground> = {
  title: 'Playground/Live Editor',
  component: LivePlayground,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Type JSX using any Theya component (Button, IconButton, Fab, Badge, Checkbox, Radio, Switch, Icon) — no import statements needed, they\'re all in scope. The preview updates as you type.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LivePlayground>;

export const Default: Story = {};

export const FormControls: Story = {
  args: {
    code: `<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <Checkbox label="Subscribe to newsletter" defaultChecked />
  <Radio label="Option A" name="demo" defaultChecked />
  <Radio label="Option B" name="demo" />
  <Switch label="Enable notifications" defaultChecked />
</div>`,
  },
};

export const ButtonShowcase: Story = {
  args: {
    code: `<div style={{ display: 'flex', gap: 12 }}>
  <Button intent="primary">Primary</Button>
  <Button intent="danger" type="outlined">Danger</Button>
  <Button intent="success" iconOnly leftIcon={<Icon name="check" size={16} />} />
</div>`,
  },
};
