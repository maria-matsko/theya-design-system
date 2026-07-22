import type { ReactNode } from 'react';
import type { ChartSeriesColor } from './LineChart';
import styles from './Gauge.module.css';

const ARC_COLOR: Record<ChartSeriesColor, string> = {
  primary: 'var(--color-icon-icon-primary)',
  success: 'var(--color-icon-icon-success)',
  warning: 'var(--color-icon-icon-warning)',
  danger: 'var(--color-icon-icon-danger)',
  info: 'var(--color-icon-icon-info)',
  neutral: 'var(--color-icon-icon-subtle)',
};

export interface GaugeProps {
  value: number;
  max?: number;
  /** Outer diameter in px. The arc itself renders at half this height (semi-circle). Defaults to 220. */
  size?: number;
  thickness?: number;
  /** Solid intent color, or "gradient" for the green→orange→red sweep from the reference. Defaults to "gradient". */
  color?: ChartSeriesColor | 'gradient';
  label?: ReactNode;
  valueFormatter?: (value: number) => string;
}

export function Gauge({
  value,
  max = 100,
  size = 220,
  thickness = 14,
  color = 'gradient',
  label,
  valueFormatter,
}: GaugeProps) {
  const radius = (size - thickness) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const percent = Math.max(0, Math.min(1, value / max)) * 100;
  const gradientId = 'theya-gauge-gradient';

  const trackPath = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 1 1 ${cx + radius} ${cy}`;

  return (
    <div className={styles.gauge} style={{ width: size }}>
      <svg width={size} height={size / 2 + thickness} viewBox={`0 0 ${size} ${size / 2 + thickness / 2}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-icon-icon-success)" />
            <stop offset="50%" stopColor="var(--color-icon-icon-warning)" />
            <stop offset="100%" stopColor="var(--color-icon-icon-danger)" />
          </linearGradient>
        </defs>
        <path
          d={trackPath}
          fill="none"
          stroke="var(--color-border-border-subtler)"
          strokeWidth={thickness}
          strokeLinecap="round"
          pathLength={100}
        />
        <path
          d={trackPath}
          fill="none"
          stroke={color === 'gradient' ? `url(#${gradientId})` : ARC_COLOR[color]}
          strokeWidth={thickness}
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray={`${percent} 100`}
          className={styles.arc}
        />
      </svg>
      <div className={styles.center}>
        <div className={styles.value}>{valueFormatter ? valueFormatter(value) : value}</div>
        {label ? <div className={styles.label}>{label}</div> : null}
      </div>
    </div>
  );
}
