import { forwardRef, useId, useMemo, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './Password.module.css';

export interface PasswordRule {
  label: ReactNode;
  test: (value: string) => boolean;
}

const DEFAULT_RULES: PasswordRule[] = [
  { label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { label: 'One lowercase letter', test: (v) => /[a-z]/.test(v) },
  { label: 'One number', test: (v) => /[0-9]/.test(v) },
  { label: 'One special character', test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export interface PasswordProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'width'> {
  width?: 'sm' | 'md' | 'lg' | 'xl' | 'fluid';
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  required?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  /**
   * Shows the strength meter (gradient bar + checklist) below the
   * field. Rules default to a standard 5-criteria set; pass your own
   * to change what's checked. Gradient: 0–1 rules met → solid red;
   * 2–3 → red→orange; 4–5 → red→orange→green.
   */
  showStrength?: boolean;
  rules?: PasswordRule[];
}

export const Password = forwardRef<HTMLInputElement, PasswordProps>(
  function Password(
    {
      width = 'md',
      label,
      labelPosition = 'top',
      required = false,
      description,
      error,
      showStrength = false,
      rules = DEFAULT_RULES,
      disabled,
      className,
      id,
      value,
      defaultValue,
      onChange,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const [visible, setVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(String(defaultValue ?? ''));
    const currentValue = value !== undefined ? String(value) : internalValue;
    const hasError = Boolean(error);

    const passed = useMemo(
      () => rules.filter((r) => r.test(currentValue)).length,
      [rules, currentValue],
    );

    const strengthClass =
      passed >= 4 ? styles.strengthHigh : passed >= 2 ? styles.strengthMid : styles.strengthLow;

    const shellClassNames = [
      styles.shell,
      hasError ? styles.error : '',
    ]
      .filter(Boolean)
      .join(' ');

    const message = hasError ? error : description;
    const messageClassName = hasError ? styles.messageError : styles.messageNeutral;

    return (
      <div
        className={[styles.field, styles[`label-${labelPosition}`], className ?? '']
          .filter(Boolean)
          .join(' ')}
      >
        {label ? (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required ? (
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            ) : null}
          </label>
        ) : null}
        <div className={styles.valueColumn}>
          <div className={[shellClassNames, styles[`width-${width}`]].join(' ')}>
            <input
              id={inputId}
              ref={ref}
              type={visible ? 'text' : 'password'}
              className={styles.input}
              disabled={disabled}
              value={currentValue}
              onChange={(e) => {
                if (value === undefined) setInternalValue(e.target.value);
                onChange?.(e);
              }}
              aria-invalid={hasError || undefined}
              {...rest}
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              <Icon name={visible ? 'eye' : 'eye-closed'} size={16} />
            </button>
          </div>
          {showStrength ? (
            <div className={[styles.strength, styles[`width-${width}`]].join(' ')}>
              <div className={styles.strengthTrack}>
                <div
                  className={[styles.strengthFill, strengthClass].join(' ')}
                  style={{ width: `${(passed / rules.length) * 100}%` }}
                />
              </div>
              <ul className={styles.ruleList}>
                {rules.map((rule, i) => {
                  const met = rule.test(currentValue);
                  return (
                    <li
                      key={i}
                      className={[styles.rule, met ? styles.ruleMet : ''].filter(Boolean).join(' ')}
                    >
                      <span className={styles.ruleIcon} aria-hidden="true">
                        <Icon name={met ? 'check' : 'cross'} size={12} />
                      </span>
                      {rule.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
          {message ? (
            <div className={[styles.message, messageClassName].join(' ')}>
              {hasError ? (
                <span className={styles.messageIcon} aria-hidden="true">
                  <Icon name="danger" variant="solid" size={12} />
                </span>
              ) : null}
              <span className={styles.messageText}>{message}</span>
            </div>
          ) : null}
        </div>
      </div>
    );
  },
);
