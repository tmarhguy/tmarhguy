import React, { type HTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverEffect = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-bg-deep border border-border-subtle p-6 transition-all duration-200',
          hoverEffect && 'hover:bg-bg-elevated hover:border-gold-dim',
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';
