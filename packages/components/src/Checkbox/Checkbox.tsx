import { forwardRef, useEffect, useId, useRef } from 'react';
import type { InputHTMLAttributes, MutableRefObject, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './Checkbox.module.css';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Shows a dash instead of a checkmark — for "some but not all" selection. */
  indeterminate?: boolean;
  /** Label shown next to the box. Omit for a bare checkbox with no text. */
  label?: ReactNode;
  /** Small helper text below the label — only rendered when `label` is set. */
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  function Checkbox(
    { indeterminate = false, label, description, disabled, className, id, ...rest },
    forwardedRef,
  ) {
    const innerRef = useRef<HTMLInputElement | null>(null);
    const generatedId = useId();
    const inputId = id ?? generatedId;

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const setRefs = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    const field = (
      <div className={[styles.field, className ?? ''].filter(Boolean).join(' ')}>
        <label className={styles.row} htmlFor={inputId}>
          <span className={styles.control}>
            <input
              id={inputId}
              type="checkbox"
              className={styles.input}
              ref={setRefs}
              disabled={disabled}
              {...rest}
            />
            <span className={styles.box} aria-hidden="true">
              <Icon name="check" size={16} className={styles.checkIcon} />
              <span className={styles.indeterminateBar} />
            </span>
          </span>
          {label ? <span className={styles.labelText}>{label}</span> : null}
        </label>
        {label && description ? (
          <span className={styles.description}>{description}</span>
        ) : null}
      </div>
    );

    return field;
  },
);
