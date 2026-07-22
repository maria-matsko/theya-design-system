import { forwardRef, useId } from 'react';
import type { ReactNode, TextareaHTMLAttributes } from 'react';
import { Icon } from '@theya/icons';
import styles from './TextArea.module.css';

export type TextAreaWidth = 'sm' | 'md' | 'lg' | 'xl' | 'fluid'; // 60 / 200 / 348 / 500 / 100%

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'width'> {
  width?: TextAreaWidth;
  /** Drag-to-resize direction from the bottom-right corner handle. Defaults to "both". */
  resize?: 'vertical' | 'both' | 'none';
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  required?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  /** Extends Figma's error/description pattern with a success state, matching TextField/Select. */
  success?: ReactNode | boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  {
    width = 'fluid',
    resize = 'both',
    label,
    labelPosition = 'top',
    required = false,
    description,
    error,
    success,
    disabled,
    readOnly,
    className,
    id,
    rows = 4,
    ...rest
  },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const hasError = Boolean(error);
  const hasSuccess = !hasError && Boolean(success);

  const shellClassNames = [
    styles.shell,
    styles[`width-${width}`],
    styles[`resize-${resize}`],
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
        <label htmlFor={textareaId} className={styles.label}>
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
          <textarea
            id={textareaId}
            ref={ref}
            className={styles.textarea}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows}
            placeholder={rest.placeholder ?? ''}
            aria-invalid={hasError || undefined}
            {...rest}
          />
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
