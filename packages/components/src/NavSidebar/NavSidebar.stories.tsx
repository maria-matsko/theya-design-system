import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { NavSidebar } from './NavSidebar';
import { NavGroup } from '../NavGroup/NavGroup';
import { NavItem } from '../NavItem/NavItem';
import { Button } from '../Button/Button';
import { Avatar } from '../Avatar/Avatar';
import { ProgressBar } from '../ProgressBar/ProgressBar';
import { Icon } from '@theya/icons';
import logoTheya from '../assets/logo-theya.svg';

const meta: Meta<typeof NavSidebar> = {
  title: 'Components/NavSidebar',
  component: NavSidebar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof NavSidebar>;

function DemoLogo() {
  return <img src={logoTheya} alt="Theya" style={{ height: 28, width: 'auto' }} />;
}

/** Basic grouped nav with icons, badges, and a Create button reserved up top (Mailchimp pattern). */
export const LightDefault: Story = {
  render: () => {
    const [active, setActive] = useState('balance');
    return (
      <div style={{ height: 700 }}>
        <NavSidebar
          logo={<DemoLogo />}
          createButton={
            <Button fullWidth size="sm" leftIcon={<Icon name="plus" size={16} />}>
              Create
            </Button>
          }
          profile={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8 }}>
              <Avatar variant="text" size="sm" initials="MK" />
              <div style={{ fontSize: 13, fontFamily: 'var(--typography-body-m-font)' }}>
                <div style={{ fontWeight: 500 }}>Maria K.</div>
              </div>
            </div>
          }
          footerWidget={
            <div
              style={{
                padding: 12,
                borderRadius: 8,
                background: 'var(--color-bg-primary-bg-primary-subtle)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                fontFamily: 'var(--typography-body-m-font)',
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 500 }}>Cloud Storage</div>
              <ProgressBar value={24} size="sm" />
              <div style={{ fontSize: 11, color: 'var(--color-text-text-subtler)' }}>
                248 mb of 2 GB used
              </div>
            </div>
          }
        >
          <NavGroup label="My Profile">
            <NavItem
              icon={<Icon name="apps" size={16} />}
              label="Overview"
              active={active === 'overview'}
              onClick={() => setActive('overview')}
            />
            <NavItem
              icon={<Icon name="wallet" size={16} />}
              label="Balance"
              active={active === 'balance'}
              onClick={() => setActive('balance')}
            />
            <NavItem
              icon={<Icon name="globe" size={16} />}
              label="Travel"
              badge={22}
              active={active === 'travel'}
              onClick={() => setActive('travel')}
            />
            <NavItem
              icon={<Icon name="camera" size={16} />}
              label="Gallery"
              active={active === 'gallery'}
              onClick={() => setActive('gallery')}
            />
            <NavItem
              icon={<Icon name="chart-pie" size={16} />}
              label="Analytics"
              badge={28}
              active={active === 'analytics'}
              onClick={() => setActive('analytics')}
            />
          </NavGroup>
        </NavSidebar>
      </div>
    );
  },
};

/** Same sidebar with the dark theme, matching the existing Theya dark sidebar. */
export const DarkTheme: Story = {
  render: () => {
    const [active, setActive] = useState('balance');
    return (
      <div style={{ height: 700 }}>
        <NavSidebar theme="dark" logo={<DemoLogo />}>
          <NavGroup label="My Profile">
            <NavItem
              icon={<Icon name="apps" size={16} />}
              label="Overview"
              active={active === 'overview'}
              onClick={() => setActive('overview')}
            />
            <NavItem
              icon={<Icon name="wallet" size={16} />}
              label="Balance"
              active={active === 'balance'}
              onClick={() => setActive('balance')}
            />
            <NavItem icon={<Icon name="globe" size={16} />} label="Travel" badge={22} />
            <NavItem icon={<Icon name="camera" size={16} />} label="Gallery" />
          </NavGroup>
          <NavGroup label="Tools & Integrations">
            <NavItem icon={<Icon name="lightning" size={16} />} label="Integrations" />
            <NavItem icon={<Icon name="document" size={16} />} label="API Documentation" />
          </NavGroup>
        </NavSidebar>
      </div>
    );
  },
};

/** Collapse/expand toggle, recreating the icon-rail pattern from the Navio reference. */
export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ height: 700, display: 'flex' }}>
        <NavSidebar
          logo={<DemoLogo />}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        >
          <NavGroup label="My Profile">
            <NavItem icon={<Icon name="apps" size={16} />} label="Overview" />
            <NavItem icon={<Icon name="wallet" size={16} />} label="Balance" active />
            <NavItem icon={<Icon name="globe" size={16} />} label="Travel" badge={22} />
            <NavItem icon={<Icon name="camera" size={16} />} label="Gallery" />
            <NavItem icon={<Icon name="chart-pie" size={16} />} label="Analytics" badge={28} />
          </NavGroup>
        </NavSidebar>
      </div>
    );
  },
};

/** Nested groups with a notification-count badge, matching the Figr reference. */
export const MultipleGroups: Story = {
  render: () => (
    <div style={{ height: 700 }}>
      <NavSidebar logo={<DemoLogo />}>
        <NavItem icon={<Icon name="apps" size={16} />} label="Home" />
        <NavItem icon={<Icon name="document" size={16} />} label="Projects" />
        <NavItem icon={<Icon name="document" size={16} />} label="Subscriptions Dashboard" active />
        <NavItem icon={<Icon name="user" size={16} />} label="Team Management" badge={3} />
        <NavItem icon={<Icon name="chart-pie" size={16} />} label="Reports" />
        <NavItem icon={<Icon name="settings" size={16} />} label="Settings" />
        <NavGroup label="Tools & Integrations">
          <NavItem icon={<Icon name="lightning" size={16} />} label="Integrations" />
          <NavItem icon={<Icon name="document" size={16} />} label="API Documentation" />
          <NavItem icon={<Icon name="document" size={16} />} label="Logs" />
        </NavGroup>
      </NavSidebar>
    </div>
  ),
};
