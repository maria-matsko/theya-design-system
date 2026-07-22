import { useState } from 'react';
import type { HTMLAttributes } from 'react';
import { Icon } from '@theya/icons';
import styles from './Rating.module.css';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current rating, 0–max. */
  value?: number;
  max?: number;
  /** Pixel size per star. Defaults to 16, matching Figma. */
  size?: number;
  /** If set, stars become clickable and call this with the new value. */
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export function Rating({
  value = 0,
  max = 5,
  size = 16,
  onChange,
  readOnly = false,
  className,
  ...rest
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const interactive = Boolean(onChange) && !readOnly;
  const displayValue = hoverValue ?? value;

  return (
    <div
      className={[styles.rating, interactive ? styles.interactive : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
      role={interactive ? 'radiogroup' : 'img'}
      aria-label={!interactive ? `${value} out of ${max} stars` : undefined}
      onMouseLeave={() => interactive && setHoverValue(null)}
      {...rest}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= displayValue;
        return (
          <span
            key={i}
            className={styles.star}
            role={interactive ? 'radio' : undefined}
            aria-checked={interactive ? starValue === value : undefined}
            aria-label={interactive ? `${starValue} star${starValue > 1 ? 's' : ''}` : undefined}
            tabIndex={interactive ? 0 : undefined}
            onMouseEnter={() => interactive && setHoverValue(starValue)}
            onClick={() => interactive && onChange?.(starValue)}
            onKeyDown={(e) => {
              if (interactive && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                onChange?.(starValue);
              }
            }}
          >
            <Icon name="star" variant={filled ? 'solid' : 'outline'} size={size} />
          </span>
        );
      })}
    </div>
  );
}
