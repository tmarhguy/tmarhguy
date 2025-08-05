// Theme configuration with type-safe theme tokens
export const themeConfig = {
  colors: {
    // Background colors
    background: {
      primary: 'bg-background',
      secondary: 'bg-secondary',
      muted: 'bg-muted',
      card: 'bg-card',
      popover: 'bg-popover',
    },
    // Text colors
    text: {
      primary: 'text-foreground',
      secondary: 'text-secondary-foreground',
      muted: 'text-muted-foreground',
      card: 'text-card-foreground',
      popover: 'text-popover-foreground',
    },
    // Border colors
    border: {
      default: 'border-border',
      input: 'border-input',
      ring: 'border-ring',
    },
    // Brand colors (theme-aware)
    brand: {
      text: {
        400: 'text-brand-400',
        500: 'text-brand-500',
        600: 'text-brand-600',
      },
      bg: {
        400: 'bg-brand-400',
        500: 'bg-brand-500',
        600: 'bg-brand-600',
      },
      border: {
        400: 'border-brand-400',
        500: 'border-brand-500',
        600: 'border-brand-600',
      }
    }
  },
  // Component-specific theme tokens
  components: {
    card: {
      base: 'bg-card border-border text-card-foreground',
      hover: 'hover:border-brand-600/50 hover:shadow-2xl hover:shadow-brand-600/20',
      elevated: 'bg-card border-border shadow-lg',
    },
    button: {
      primary: 'bg-brand-600 hover:bg-brand-500 text-white',
      secondary: 'bg-secondary hover:bg-secondary/80 text-secondary-foreground',
      outline: 'border-border text-foreground hover:bg-accent hover:text-accent-foreground',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
    },
    modal: {
      overlay: 'bg-background/80 backdrop-blur-sm',
      content: 'bg-card border-border',
    },
    section: {
      base: 'bg-background',
      muted: 'bg-muted/50',
      elevated: 'bg-card',
    }
  }
} as const;

// Type exports for type safety
export type ThemeConfig = typeof themeConfig;
export type ThemeColors = typeof themeConfig.colors;
export type ThemeComponents = typeof themeConfig.components;

// Helper function to get theme classes
export function getThemeClass(path: string): string {
  const keys = path.split('.');
  let current: unknown = themeConfig;
  
  for (const key of keys) {
    if (typeof current !== 'object' || current === null || !(key in current)) {
      console.warn(`Theme path not found: ${path}`);
      return '';
    }
    current = (current as Record<string, unknown>)[key];
  }
  
  return typeof current === 'string' ? current : '';
}

// Semantic color mappings for different component states
export const semanticColors = {
  // Dark elements that need special handling in light mode
  darkSurface: {
    // For surfaces that are dark in dark mode, light in light mode
    base: 'bg-gray-900 dark:bg-gray-900 light:bg-gray-100',
    hover: 'hover:bg-gray-800 dark:hover:bg-gray-800 light:hover:bg-gray-200',
    border: 'border-gray-700 dark:border-gray-700 light:border-gray-300',
  },
  // Medium contrast surfaces
  mutedSurface: {
    base: 'bg-gray-800 dark:bg-gray-800 light:bg-gray-50',
    hover: 'hover:bg-gray-700 dark:hover:bg-gray-700 light:hover:bg-gray-100',
    border: 'border-gray-600 dark:border-gray-600 light:border-gray-200',
  },
  // Text colors with proper contrast
  textColors: {
    primary: 'text-white dark:text-white light:text-gray-900',
    secondary: 'text-gray-300 dark:text-gray-300 light:text-gray-700',
    muted: 'text-gray-400 dark:text-gray-400 light:text-gray-600',
  },
  // Special effects
  effects: {
    glow: 'shadow-brand-600/20 dark:shadow-brand-600/20 light:shadow-brand-600/10',
    scanlines: 'opacity-20 dark:opacity-20 light:opacity-10',
  }
} as const;