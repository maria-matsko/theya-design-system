import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Radio.module.css';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label shown next to the circle. Omit for a bare radio with no text. */
  label?: ReactNode;
  /** Small helper text below the label — only rendered when `label` is set. */
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { label, description, disabled, className, id, ...rest },
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
            type="radio"
            className={styles.input}
            ref={forwardedRef}
            disabled={disabled}
            {...rest}
          />
          <span className={styles.circle} aria-hidden="true">
            <span className={styles.dot} />
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
