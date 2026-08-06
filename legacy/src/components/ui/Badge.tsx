import React, { type HTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'green';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'gold', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-block font-mono text-[0.58rem] tracking-wider uppercase px-2.5 py-1 border',
          variant === 'gold' && 'border-gold-dim text-gold-champagne',
          variant === 'green' && 'border-verify-green/40 text-verify-green bg-verify-green/10',
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';
