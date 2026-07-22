import {
  Funnel,
  FunnelChart as RFunnelChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { ChartSeriesColor } from './LineChart';
import styles from './LineChart.module.css';

const FILL_COLOR: Record<ChartSeriesColor, string> = {
  primary: 'var(--color-icon-icon-primary)',
  success: 'var(--color-icon-icon-success)',
  warning: 'var(--color-icon-icon-warning)',
  danger: 'var(--color-icon-icon-danger)',
  info: 'var(--color-icon-icon-info)',
  neutral: 'var(--color-icon-icon-subtle)',
};

export interface FunnelStep {
  label: string;
  value: number;
  color?: ChartSeriesColor;
}

export interface FunnelChartProps {
  data: FunnelStep[];
  height?: number;
  valueFormatter?: (value: number) => string;
}

function FunnelTooltip({
  active,
  payload,
  valueFormatter,
}: {
  active?: boolean;
  payload?: { payload: FunnelStep }[];
  valueFormatter?: (value: number) => string;
}) {
  if (!active || !payload || !payload.length) return null;
  const step = payload[0].payload;
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{step.label}</div>
      <div className={styles.tooltipRow}>
        <span className={styles.tooltipValue}>
          {valueFormatter ? valueFormatter(step.value) : step.value}
        </span>
      </div>
    </div>
  );
}

export function FunnelChart({ data, height = 300, valueFormatter }: FunnelChartProps) {
  const withFill = data.map((d, i) => ({
    ...d,
    fill: FILL_COLOR[d.color ?? (i === 0 ? 'success' : i === data.length - 1 ? 'danger' : 'warning')],
  }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RFunnelChart>
        <Tooltip content={<FunnelTooltip valueFormatter={valueFormatter} />} />
        <Funnel dataKey="value" data={withFill} isAnimationActive={false}>
          <LabelList
            dataKey="label"
            position="right"
            fill="var(--color-text-text)"
            stroke="none"
            fontFamily="var(--typography-body-m-font)"
            fontSize={14}
          />
        </Funnel>
      </RFunnelChart>
    </ResponsiveContainer>
  );
}
