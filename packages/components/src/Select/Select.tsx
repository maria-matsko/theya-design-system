import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import type { KeyboardEvent, ReactNode } from 'react';
import { Icon } from '@theya/icons';
import styles from './Select.module.css';

export type SelectVariant = 'outline' | 'filled' | 'flushed';
export type SelectSize = 'md' | 'lg'; // 32px / 40px
export type SelectWidth = 'sm' | 'md' | 'lg' | 'xl' | 'fluid'; // 60 / 200 / 348 / 500 / 100%

export interface SelectOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: ReactNode;
  variant?: SelectVariant;
  size?: SelectSize;
  width?: SelectWidth;
  label?: ReactNode;
  labelPosition?: 'top' | 'left';
  required?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  /** Extends Figma's error/description pattern with a success state (green border/background + 20px check icon), matching TextField. */
  success?: ReactNode | boolean;
  leftIcon?: ReactNode;
  disabled?: boolean;
  id?: string;
  className?: string;
  'aria-label'?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
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
  disabled,
  id,
  className,
  'aria-label': ariaLabel,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find((o) => o.value === currentValue);
  const hasError = Boolean(error);
  const hasSuccess = !hasError && Boolean(success);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const selectValue = useCallback(
    (v: string) => {
      if (value === undefined) setInternalValue(v);
      onChange?.(v);
      setOpen(false);
    },
    [value, onChange],
  );

  const handleTriggerKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
      const idx = options.findIndex((o) => o.value === currentValue);
      setActiveIndex(idx >= 0 ? idx : 0);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleListKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, options.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const opt = options[activeIndex];
      if (opt && !opt.disabled) selectValue(opt.value);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const shellClassNames = [
    styles.shell,
    styles[`variant-${variant}`],
    styles[`size-${size}`],
    styles[`width-${width}`],
    hasError ? styles.error : '',
    hasSuccess ? styles.success : '',
    open ? styles.open : '',
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
        <label htmlFor={selectId} className={styles.label}>
          {label}
          {required ? (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          ) : null}
        </label>
      ) : null}
      <div className={styles.valueColumn} ref={rootRef}>
        <button
          type="button"
          id={selectId}
          className={shellClassNames}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={ariaLabel}
          onClick={() => !disabled && setOpen((o) => !o)}
          onKeyDown={handleTriggerKeyDown}
        >
          {leftIcon ? <span className={styles.icon}>{leftIcon}</span> : null}
          <span className={[styles.value, selectedOption ? '' : styles.placeholder].join(' ')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {hasError ? (
            <span className={[styles.icon, styles.iconDanger].join(' ')} aria-hidden="true">
              <Icon name="danger" variant="solid" size={20} />
            </span>
          ) : hasSuccess ? (
            <span className={[styles.icon, styles.iconSuccess].join(' ')} aria-hidden="true">
              <Icon name="checked-box" variant="solid" size={20} />
            </span>
          ) : (
            <span className={[styles.chevron, open ? styles.chevronOpen : ''].join(' ')} aria-hidden="true">
              <Icon name="caret-down" size={16} />
            </span>
          )}
        </button>
        {open ? (
          <ul
            ref={listRef}
            role="listbox"
            className={styles.listbox}
            tabIndex={-1}
            onKeyDown={handleListKeyDown}
          >
            {options.map((opt, i) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === currentValue}
                className={[
                  styles.option,
                  opt.value === currentValue ? styles.optionSelected : '',
                  i === activeIndex ? styles.optionActive : '',
                  opt.disabled ? styles.optionDisabled : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => !opt.disabled && selectValue(opt.value)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                {opt.label}
              </li>
            ))}
          </ul>
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
}
