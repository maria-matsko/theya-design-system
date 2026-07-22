import type { HTMLAttributes, ReactNode } from 'react';

export type Theme = 'light' | 'dark';

export interface ThemeProviderProps extends HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
  children?: ReactNode;
}

export function ThemeProvider({ theme = 'light', children, style, ...rest }: ThemeProviderProps) {
  return (
    <div
      data-theme={theme === 'dark' ? 'dark' : undefined}
      style={{
        colorScheme: theme,
        backgroundColor: theme === 'dark' ? 'var(--color-bg-surface-bg-surface-base)' : undefined,
        color: theme === 'dark' ? 'var(--color-text-text-on-dark)' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
