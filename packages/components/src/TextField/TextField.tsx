import { forwardRef, useId } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './TextField.module.css';

export type TextFieldVariant = 'outline' | 'filled' | 'flushed';
export type TextFieldSize = 'md' | 'lg'; // 32px / 40px
/** Fixed pixel widths matching Figma's named sizes, or "fluid" for 100%. Defaults to "md" (200px). */
export type TextFieldWidth = 'sm' | 'md' | 'lg' | 'xl' | 'fluid'; // 60 / 200 / 348 / 500 / 100%

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'> {
  variant?: TextFieldVariant;
  size?: TextFieldSize;
  /** Field width. Defaults to "md" (200px) — pass "fluid" to fill the container instead. */
  width?: TextFieldWidth;
  label?: ReactNode;
  /** Defaults to "top" per DS convention — label above the field, not beside it. */
  labelPosition?: 'top' | 'left';
  required?: boolean;
  /** Neutral helper text shown below the field. Ignored if `error` is set. */
  description?: ReactNode;
  /** Shows the error (danger) state: red border/icon + this message below. */
  error?: ReactNode;
  /**
   * Shows the success state: green border/background + a 20px checkmark
   * on the right. Pass a message to also show green inline text below;
   * pass `true` for just the visual state with no message. Not in the
   * original Figma file — extends its error/description pattern
   * symmetrically (bg-success-subtler background, matching error's
   * bg-input-danger; 20px validation icons, matching error's size).
   * This is the DS standard going forward — apply the same to Select,
   * Password, TextArea, etc.
   */
  success?: ReactNode | boolean;
  leftIcon?: ReactNode;
  /** Shows a clear (×) button; called when it's clicked. Hidden when `error`/`success` show their own icon. */
  onClear?: () => void;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(function TextField(
  {
    variant = 'outline',
    size = 'md',
    width = 'md',
    label,
    labelPosition = 'top',
    required = false,
    description,
    error,
    success,
    leftIcon,
    onClear,
    disabled,
    readOnly,
    className,
    id,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const hasError = Boolean(error);
  const hasSuccess = !hasError && Boolean(success);

  const shellClassNames = [
    styles.shell,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`width-${width}`],
    hasError ? styles.error : '',
    hasSuccess ? styles.success : '',
    readOnly ? styles.readOnly : '',
  ]
    .filter(Boolean)
    .join(' ');

  const message = hasError ? error : hasSuccess && success !== true ? success : !hasSuccess ? description : null;
  const messageClassName = hasError ? styles.messageError : hasSuccess ? styles.messageSuccess : styles.messageNeutral;

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
        <div className={shellClassNames}>
          {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
          <input
            id={inputId}
            ref={ref}
            className={styles.input}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={hasError || undefined}
            {...rest}
          />
          {hasError ? (
            <span className={[styles.icon, styles.iconDanger].join(' ')} aria-hidden="true">
              <Icon name="danger" variant="solid" size={20} />
            </span>
          ) : hasSuccess ? (
            <span className={[styles.icon, styles.iconSuccess].join(' ')} aria-hidden="true">
              <Icon name="checked-box" variant="solid" size={20} />
            </span>
          ) : onClear ? (
            <button
              type="button"
              className={styles.clearButton}
              onClick={onClear}
              aria-label="Clear"
              tabIndex={-1}
            >
              <Icon name="cross-thin" variant="custom" size={12} />
            </button>
          ) : null}
        </div>
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
});
