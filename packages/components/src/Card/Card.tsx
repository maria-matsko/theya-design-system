import type { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick' | 'title' | 'content'> {
  /** Full-width image (or logo) across the top of the card. */
  media?: ReactNode;
  /**
   * An Avatar overlapping the bottom edge of `media` — pass e.g.
   * `<Avatar variant="image" src="..." size="md" />`. Centered
   * horizontally and vertically centered on the media's bottom edge,
   * matching the corporate DS pattern.
   */
  avatar?: ReactNode;
  /** Leading content in the top row — icon or logo. */
  topLeft?: ReactNode;
  /** Trailing content in the top row — Chip, IconButton(s), Switch, etc. */
  topRight?: ReactNode;
  /** Favorite star (or similar), pinned to the top-right corner. */
  favorite?: ReactNode;
  eyebrow?: ReactNode;
  title?: ReactNode;
  /** Shown right after the title — e.g. a status Chip. */
  titleTrailing?: ReactNode;
  /** Row of small icon+text status items below the title. */
  status?: ReactNode;
  description?: ReactNode;
  /** Small icon+text detail row (file size, date, etc). */
  details?: ReactNode;
  /** Row of Chips. */
  chips?: ReactNode;
  /** Freeform extra content — nested actions, rich content, etc. */
  content?: ReactNode;
  /** Bottom action row — Button(s). */
  actions?: ReactNode;
  /** Selection control on the left — pass `<Radio />` or `<Checkbox />`. */
  choice?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  /** Adds a permanent resting shadow (lighter than the flat variant's hover shadow). */
  elevated?: boolean;
  /** The card itself isn't interactive as a whole, even if `onClick` is set (e.g. when only an inner Button should be clickable). */
  nonClickable?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  /** Card width. Defaults to 280px, matching the reference. */
  width?: number | string;
}

export function Card({
  media,
  avatar,
  topLeft,
  topRight,
  favorite,
  eyebrow,
  title,
  titleTrailing,
  status,
  description,
  details,
  chips,
  content,
  actions,
  choice,
  selected = false,
  disabled = false,
  elevated = false,
  nonClickable = false,
  onClick,
  width = 280,
  className,
  style,
  ...rest
}: CardProps) {
  const clickable = Boolean(onClick) && !disabled && !nonClickable;

  return (
    <div
      className={[
        styles.card,
        selected ? styles.selected : '',
        disabled ? styles.disabled : '',
        clickable ? styles.clickable : '',
        elevated ? styles.elevated : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ width, ...style }}
      onClick={disabled ? undefined : onClick}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-disabled={disabled || undefined}
      aria-pressed={clickable ? selected : undefined}
      {...rest}
    >
      {media ? <div className={styles.media}>{media}</div> : null}
      {avatar ? <div className={styles.avatar}>{avatar}</div> : null}

      <div className={styles.body}>
        {choice ? <div className={styles.choice}>{choice}</div> : null}

        <div className={[styles.content, avatar ? styles.contentWithAvatar : ''].filter(Boolean).join(' ')}>
          {topLeft || topRight || favorite ? (
            <div className={styles.topRow}>
              {topLeft ? <div className={styles.topLeft}>{topLeft}</div> : null}
              <div className={styles.topSpacer} />
              {topRight ? <div className={styles.topRight}>{topRight}</div> : null}
              {favorite ? <div className={styles.favorite}>{favorite}</div> : null}
            </div>
          ) : null}

          {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}

          <div className={styles.text}>
            {title || titleTrailing ? (
              <div className={styles.header}>
                {title ? <span className={styles.title}>{title}</span> : null}
                {titleTrailing}
              </div>
            ) : null}
            {status ? <div className={styles.status}>{status}</div> : null}
            {description ? <p className={styles.description}>{description}</p> : null}
            {details ? <div className={styles.details}>{details}</div> : null}
            {content}
          </div>

          {chips ? <div className={styles.chips}>{chips}</div> : null}
          {actions ? <div className={styles.actions}>{actions}</div> : null}
        </div>
      </div>
    </div>
  );
}
