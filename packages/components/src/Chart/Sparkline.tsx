import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';
import type { ChartSeriesColor } from './LineChart';

const BAR_COLOR: Record<ChartSeriesColor, string> = {
  primary: 'var(--color-icon-icon-primary)',
  success: 'var(--color-icon-icon-success)',
  warning: 'var(--color-icon-icon-warning)',
  danger: 'var(--color-icon-icon-danger)',
  info: 'var(--color-icon-icon-info)',
  neutral: 'var(--color-icon-icon-subtle)',
};

export interface SparklineProps {
  /** Bar values. */
  data: number[];
  color?: ChartSeriesColor;
  height?: number;
  /** Index of a single bar to render in `color` while the rest stay neutral gray — matches the "highlighted range" look in the reference dashboards. */
  highlightIndex?: number;
  /** Index range [start, end) to highlight, as an alternative to a single index. */
  highlightRange?: [number, number];
}

export function Sparkline({
  data,
  color = 'primary',
  height = 32,
  highlightIndex,
  highlightRange,
}: SparklineProps) {
  const chartData = data.map((value, i) => ({ value, i }));
  const neutralColor = 'var(--color-border-border-subtler)';
  const activeColor = BAR_COLOR[color];

  const isHighlighted = (i: number) => {
    if (highlightRange) return i >= highlightRange[0] && i < highlightRange[1];
    if (highlightIndex != null) return i === highlightIndex;
    return true; // no highlight spec — color every bar
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={chartData} barCategoryGap="10%">
        <Bar dataKey="value" radius={[2, 2, 2, 2]} isAnimationActive animationDuration={600} animationEasing="ease-out">
          {chartData.map((_, i) => (
            <Cell key={i} fill={isHighlighted(i) ? activeColor : neutralColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
