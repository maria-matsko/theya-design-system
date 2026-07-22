import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, Toaster } from './Toaster';
import type { ToastItem } from './Toaster';
import { Button } from '../Button/Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toaster',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['progress', 'success', 'error', 'warning', 'info', 'accent'],
    },
  },
  args: {
    id: 'demo',
    title: 'Running step with progress indication',
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Playground: Story = {
  render: (args) => (
    <div style={{ background: '#f0f0f5', padding: 24 }}>
      <Toast {...args} />
    </div>
  ),
};

export const AllIntents: Story = {
  render: () => (
    <div style={{ background: '#f0f0f5', padding: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Toast id="1" intent="progress" title="Running step with progress indication" progress={75} />
      <Toast id="2" intent="success" title="Finished step with success (done)" description="Success message text." learnMoreHref="#" />
      <Toast id="3" intent="error" title="Failed step with error" description="Error message text." learnMoreHref="#" />
      <Toast id="4" intent="warning" title="Step with warning" description="Warning message text." learnMoreHref="#" />
      <Toast id="5" intent="info" title="Step with info" description="Info message text." learnMoreHref="#" />
      <Toast id="6" intent="accent" title="Accented message subject" description="Accented message text." learnMoreHref="#" />
    </div>
  ),
};

export const StackedToaster: Story = {
  render: () => {
    const [toasts, setToasts] = useState<ToastItem[]>([
      { id: '1', intent: 'success', title: 'File uploaded', description: 'report.pdf uploaded successfully.' },
      { id: '2', intent: 'error', title: 'Upload failed', description: 'photo.png could not be uploaded.', learnMoreHref: '#' },
    ]);
    return (
      <div style={{ position: 'relative', height: 300, background: '#f0f0f5' }}>
        <Button onClick={() => setToasts((t) => [...t, { id: String(Date.now()), intent: 'info', title: 'New notification' }])}>
          Add toast
        </Button>
        <Toaster
          toasts={toasts}
          onClose={(id) => setToasts((t) => t.filter((x) => x.id !== id))}
          position="top-right"
        />
      </div>
    );
  },
};
