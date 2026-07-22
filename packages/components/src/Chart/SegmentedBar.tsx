import type { ChartSeriesColor } from './LineChart';
import styles from './SegmentedBar.module.css';

const BAR_COLOR: Record<ChartSeriesColor, string> = {
  primary: 'var(--color-icon-icon-primary)',
  success: 'var(--color-icon-icon-success)',
  warning: 'var(--color-icon-icon-warning)',
  danger: 'var(--color-icon-icon-danger)',
  info: 'var(--color-icon-icon-info)',
  neutral: 'var(--color-icon-icon-subtle)',
};

export interface SegmentedBarSegment {
  value: number;
  color?: ChartSeriesColor;
  label?: string;
}

export interface SegmentedBarProps {
  segments: SegmentedBarSegment[];
  height?: number;
  /** Gap between segments in px. */
  gap?: number;
}

export function SegmentedBar({ segments, height = 8, gap = 2 }: SegmentedBarProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
  return (
    <div className={styles.segmentedTrack} style={{ height, gap }}>
      {segments.map((s, i) => (
        <div
          key={i}
          className={styles.segment}
          style={{
            flexGrow: s.value,
            flexBasis: 0,
            backgroundColor: BAR_COLOR[s.color ?? 'primary'],
          }}
          title={s.label ? `${s.label}: ${((s.value / total) * 100).toFixed(0)}%` : undefined}
        />
      ))}
    </div>
  );
}
