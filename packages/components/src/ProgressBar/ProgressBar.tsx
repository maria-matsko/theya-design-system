import type { ReactNode } from 'react';
import styles from './ProgressBar.module.css';

export type ProgressBarColor = 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type ProgressBarSize = 'sm' | 'md' | 'lg';

const FILL_COLOR: Record<ProgressBarColor, string> = {
  primary: 'var(--color-icon-icon-primary)',
  success: 'var(--color-icon-icon-success)',
  warning: 'var(--color-icon-icon-warning)',
  danger: 'var(--color-icon-icon-danger)',
  info: 'var(--color-icon-icon-info)',
};

const BAR_HEIGHT: Record<ProgressBarSize, number> = { sm: 2, md: 8, lg: 12 };
const RING_DIAMETER: Record<ProgressBarSize, number> = { sm: 48, md: 64, lg: 96 };
const RING_THICKNESS: Record<ProgressBarSize, number> = { sm: 4, md: 6, lg: 8 };

export interface ProgressBarProps {
  /** 0–100. */
  value: number;
  variant?: 'bar' | 'ring' | 'ticks';
  size?: ProgressBarSize;
  color?: ProgressBarColor;
  /** Dots along the track at even intervals — matches the "Type 4" reference. Bar variant only. */
  showMilestones?: boolean;
  milestoneCount?: number;
  /** Number of tick marks — "ticks" variant only. */
  tickCount?: number;
  /** Content centered inside the ring — e.g. a percent or "1 of 4". Ring variant only. */
  centerContent?: ReactNode;
}

export function ProgressBar({
  value,
  variant = 'bar',
  size = 'md',
  color = 'primary',
  showMilestones = false,
  milestoneCount = 4,
  tickCount = 40,
  centerContent,
}: ProgressBarProps) {
  const percent = Math.max(0, Math.min(100, value));
  const fillColor = FILL_COLOR[color];

  if (variant === 'ticks') {
    const filledTicks = Math.round((percent / 100) * tickCount);
    return (
      <div
        className={styles.ticks}
        style={{ height: BAR_HEIGHT[size] }}
        role="progressbar"
        aria-valuenow={percent}
      >
        {Array.from({ length: tickCount }, (_, i) => (
          <span
            key={i}
            className={styles.tick}
            style={{ backgroundColor: i < filledTicks ? fillColor : undefined }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'ring') {
    const diameter = RING_DIAMETER[size];
    const thickness = RING_THICKNESS[size];
    const radius = (diameter - thickness) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className={styles.ringWrap} style={{ width: diameter, height: diameter }}>
        <svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border-border-subtler)"
            strokeWidth={thickness}
          />
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="none"
            stroke={fillColor}
            strokeWidth={thickness}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - percent / 100)}
            transform={`rotate(-90 ${diameter / 2} ${diameter / 2})`}
            className={styles.ringFill}
          />
        </svg>
        {centerContent ? <div className={styles.ringCenter}>{centerContent}</div> : null}
      </div>
    );
  }

  const height = BAR_HEIGHT[size];

  return (
    <div
      className={styles.track}
      style={{ height }}
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className={styles.fill} style={{ width: `${percent}%`, backgroundColor: fillColor }} />
      {showMilestones
        ? Array.from({ length: milestoneCount }, (_, i) => {
            const pos = ((i + 1) / (milestoneCount + 1)) * 100;
            return (
              <span
                key={i}
                className={styles.milestone}
                style={{
                  left: `${pos}%`,
                  backgroundColor: pos <= percent ? 'var(--color-bg-input-bg-input)' : fillColor,
                }}
              />
            );
          })
        : null}
    </div>
  );
}
