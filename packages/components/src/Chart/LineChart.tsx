import {
  Area,
  AreaChart as RAreaChart,
  CartesianGrid,
  Line,
  LineChart as RLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from './LineChart.module.css';

export type ChartSeriesColor = 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const SERIES_COLOR: Record<ChartSeriesColor, string> = {
  primary: 'var(--color-icon-icon-primary)',
  success: 'var(--color-icon-icon-success)',
  warning: 'var(--color-icon-icon-warning)',
  danger: 'var(--color-icon-icon-danger)',
  info: 'var(--color-icon-icon-info)',
  neutral: 'var(--color-icon-icon-subtle)',
};

export interface ChartSeries {
  key: string;
  label?: string;
  color?: ChartSeriesColor;
}

export interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  series: ChartSeries[];
  /** "line" draws plain strokes; "area" fills beneath with a gradient. Defaults to "line". */
  variant?: 'line' | 'area';
  height?: number;
  showGrid?: boolean;
  showYAxis?: boolean;
  valueFormatter?: (value: number) => string;
}

function ChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
  valueFormatter?: (value: number) => string;
}) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{label}</div>
      {payload.map((item, i) => (
        <div key={i} className={styles.tooltipRow}>
          <span className={styles.tooltipDot} style={{ backgroundColor: item.color }} />
          <span className={styles.tooltipName}>{item.name}</span>
          <span className={styles.tooltipValue}>
            {valueFormatter ? valueFormatter(item.value) : item.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function LineChart({
  data,
  xKey,
  series,
  variant = 'line',
  height = 300,
  showGrid = true,
  showYAxis = true,
  valueFormatter,
}: LineChartProps) {
  const axisStyle = {
    fontSize: 12,
    fontFamily: 'var(--typography-body-s-font)',
    fill: 'var(--color-text-text-subtler)',
  };

  if (variant === 'area') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <RAreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            {series.map((s) => {
              const color = SERIES_COLOR[s.color ?? 'primary'];
              return (
                <linearGradient key={s.key} id={`chart-gradient-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
          {showGrid ? (
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-border-subtler)" vertical={false} />
          ) : null}
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
          {showYAxis ? <YAxis tick={axisStyle} axisLine={false} tickLine={false} /> : null}
          <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
          {series.map((s) => {
            const color = SERIES_COLOR[s.color ?? 'primary'];
            return (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.label ?? s.key}
                stroke={color}
                strokeWidth={2}
                fill={`url(#chart-gradient-${s.key})`}
              />
            );
          })}
        </RAreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RLineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        {showGrid ? (
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-border-subtler)" vertical={false} />
        ) : null}
        <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
        {showYAxis ? <YAxis tick={axisStyle} axisLine={false} tickLine={false} /> : null}
        <Tooltip content={<ChartTooltip valueFormatter={valueFormatter} />} />
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label ?? s.key}
            stroke={SERIES_COLOR[s.color ?? 'primary']}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </RLineChart>
    </ResponsiveContainer>
  );
}
