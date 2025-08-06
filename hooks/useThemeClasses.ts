"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { themeConfig, semanticColors } from "@/lib/theme";

export function useThemeClasses() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Return default dark theme classes during SSR to prevent hydration mismatch
  if (!mounted) {
    return {
      theme: 'dark',
      resolvedTheme: 'dark',
      ...themeConfig,
      semantic: semanticColors,
      isDark: true,
      isLight: false,
    };
  }

  const currentTheme = resolvedTheme || theme || 'dark';
  const isDark = currentTheme === 'dark';
  const isLight = currentTheme === 'light';

  return {
    theme: currentTheme,
    resolvedTheme: currentTheme,
    ...themeConfig,
    semantic: semanticColors,
    isDark,
    isLight,
  };
}

// Utility function to conditionally apply theme classes
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}