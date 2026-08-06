import type { ReactNode } from 'react';

export interface StatItem {
  label: string;
  value: ReactNode;
  link?: string;
}
