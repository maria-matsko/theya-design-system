import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'heading-3xl'
  | 'heading-2xl'
  | 'heading-xl'
  | 'heading-l'
  | 'heading-m'
  | 'heading-s'
  | 'heading-xs'
  | 'heading-2xs'
  | 'heading-3xs'
  | 'body-xl'
  | 'body-l'
  | 'body-m'
  | 'body-s'
  | 'body-xs';

export type TypographyWeight = 'regular' | 'medium' | 'emphasize' | 'strong';
export type TypographyColor = 'default' | 'subtle' | 'subtler' | 'link' | 'on-dark' | 'success' | 'warning' | 'danger';

const DEFAULT_ELEMENT: Record<TypographyVariant, ElementType> = {
  'heading-3xl': 'h1',
  'heading-2xl': 'h1',
  'heading-xl': 'h2',
  'heading-l': 'h3',
  'heading-m': 'h4',
  'heading-s': 'h5',
  'heading-xs': 'h6',
  'heading-2xs': 'p',
  'heading-3xs': 'p',
  'body-xl': 'p',
  'body-l': 'p',
  'body-m': 'p',
  'body-s': 'p',
  'body-xs': 'p',
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  /** Overrides the font weight within the variant's own scale. Not every weight has an emphasize/strong sub-style for every variant — falls back to the variant's own base weight if unset. */
  weight?: TypographyWeight;
  color?: TypographyColor;
  /** HTML element to render. Defaults to a sensible tag per variant (h1–h6 for headings, p for body). */
  as?: ElementType;
  children?: ReactNode;
}

export function Typography({
  variant = 'body-m',
  weight,
  color = 'default',
  as,
  children,
  className,
  ...rest
}: TypographyProps) {
  const Element = as ?? DEFAULT_ELEMENT[variant];
  const classNames = [
    styles.text,
    styles[`variant-${variant}`],
    weight ? styles[`weight-${weight}`] : '',
    styles[`color-${color}`],
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Element className={classNames} {...rest}>
      {children}
    </Element>
  );
}
