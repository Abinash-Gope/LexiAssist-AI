import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, elevated = false, ...props }) => {
  return (
    <div
      className={twMerge(
        clsx(
          'bg-surface-light rounded-xl border border-border-light transition-all',
          elevated ? 'shadow-level-2' : 'shadow-level-1',
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};
