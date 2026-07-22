import {
  Bar,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styles from './LineChart.module.css';

export interface Candle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandlestickChartProps {
  data: Candle[];
  height?: number;
  valueFormatter?: (value: number) => string;
}

interface CandleShapeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: Candle;
}

function CandleShape({ x = 0, y = 0, width = 0, height = 0, payload }: CandleShapeProps) {
  if (!payload) return null;
  const { open, high, low, close } = payload;
  const isUp = close >= open;
  const color = isUp ? 'var(--color-icon-icon-success)' : 'var(--color-icon-icon-danger)';

  const range = high - low || 1;
  const pxPerUnit = height / range;
  const bodyTop = y + (high - Math.max(open, close)) * pxPerUnit;
  const bodyBottom = y + (high - Math.min(open, close)) * pxPerUnit;
  const bodyHeight = Math.max(1, bodyBottom - bodyTop);
  const bodyWidth = Math.max(2, width * 0.6);
  const bodyX = x + (width - bodyWidth) / 2;
  const wickX = x + width / 2;

  return (
    <g>
      <line x1={wickX} x2={wickX} y1={y} y2={y + height} stroke={color} strokeWidth={1} />
      <rect x={bodyX} y={bodyTop} width={bodyWidth} height={bodyHeight} fill={color} rx={1} />
    </g>
  );
}

function CandleTooltip({
  active,
  payload,
  valueFormatter,
}: {
  active?: boolean;
  payload?: { payload: Candle }[];
  valueFormatter?: (value: number) => string;
}) {
  if (!active || !payload || !payload.length) return null;
  const c = payload[0].payload;
  const f = valueFormatter ?? ((v: number) => v.toString());
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipLabel}>{c.date}</div>
      <div className={styles.tooltipRow}>
        <span className={styles.tooltipName}>Open</span>
        <span className={styles.tooltipValue}>{f(c.open)}</span>
      </div>
      <div className={styles.tooltipRow}>
        <span className={styles.tooltipName}>High</span>
        <span className={styles.tooltipValue}>{f(c.high)}</span>
      </div>
      <div className={styles.tooltipRow}>
        <span className={styles.tooltipName}>Low</span>
        <span className={styles.tooltipValue}>{f(c.low)}</span>
      </div>
      <div className={styles.tooltipRow}>
        <span className={styles.tooltipName}>Close</span>
        <span className={styles.tooltipValue}>{f(c.close)}</span>
      </div>
    </div>
  );
}

export function CandlestickChart({ data, height = 320, valueFormatter }: CandlestickChartProps) {
  const axisStyle = {
    fontSize: 12,
    fontFamily: 'var(--typography-body-s-font)',
    fill: 'var(--color-text-text-subtler)',
  };

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <XAxis dataKey="date" tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis domain={['auto', 'auto']} tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip content={<CandleTooltip valueFormatter={valueFormatter} />} />
        <Bar dataKey={(d: Candle) => [d.low, d.high]} shape={<CandleShape />} isAnimationActive={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
