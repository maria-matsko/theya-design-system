import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Switch.module.css';

/**
 * Color intent — matches Figma's Warning/Danger variants. These only
 * apply when the switch is checked; Figma doesn't draw an off-state
 * warning/danger treatment, so unchecked always uses the neutral
 * secondary colors regardless of `intent`.
 */
export type SwitchIntent = 'primary' | 'warning' | 'danger';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  intent?: SwitchIntent;
  /** Label shown next to the switch. Omit for a bare switch with no text. */
  label?: ReactNode;
  /** Small helper text below the label — only rendered when `label` is set. */
  description?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { intent = 'primary', label, description, disabled, className, id, ...rest },
  forwardedRef,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')}>
      <label className={styles.row} htmlFor={inputId}>
        <span className={styles.control}>
          <input
            id={inputId}
            type="checkbox"
            role="switch"
            className={styles.input}
            ref={forwardedRef}
            disabled={disabled}
            {...rest}
          />
          <span className={[styles.track, styles[`intent-${intent}`]].join(' ')} aria-hidden="true">
            <span className={styles.thumb}>
              <svg
                className={styles.checkIcon}
                width="7"
                height="6"
                viewBox="0 0 7 6"
                fill="none"
              >
                <path
                  d="M1 3L2.5 4.5L6 1"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </span>
        </span>
        {label ? <span className={styles.labelText}>{label}</span> : null}
      </label>
      {label && description ? (
        <span className={styles.description}>{description}</span>
      ) : null}
    </div>
  );
});
