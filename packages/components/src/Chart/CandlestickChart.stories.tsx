import type { Meta, StoryObj } from '@storybook/react';
import { CandlestickChart } from './CandlestickChart';

const meta: Meta<typeof CandlestickChart> = {
  title: 'Components/Chart/CandlestickChart',
  component: CandlestickChart,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CandlestickChart>;

const data = [
  { date: 'Jan', open: 74.321, high: 74.3225, low: 74.3195, close: 74.322 },
  { date: 'Feb', open: 74.322, high: 74.3228, low: 74.3205, close: 74.3208 },
  { date: 'Mar', open: 74.3208, high: 74.3232, low: 74.3212, close: 74.323 },
  { date: 'Apr', open: 74.323, high: 74.3233, low: 74.3215, close: 74.3217 },
  { date: 'May', open: 74.3217, high: 74.3228, low: 74.3208, close: 74.3225 },
  { date: 'Jun', open: 74.3225, high: 74.323, low: 74.3218, close: 74.322 },
  { date: 'Jul', open: 74.322, high: 74.3235, low: 74.3219, close: 74.3232 },
];

export const Default: Story = {
  args: { data, height: 320, valueFormatter: (v) => v.toFixed(4) },
};
