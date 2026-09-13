import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'HIGH' | 'MEDIUM' | 'LOW' | 'NEUTRAL' | 'BRAND';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'NEUTRAL',
  size = 'md',
  ...props
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full border transition-colors';

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  const variantClasses = {
    HIGH: 'bg-risk-high-bg text-risk-high border-risk-high-border',
    MEDIUM: 'bg-risk-medium-bg text-risk-medium border-risk-medium-border',
    LOW: 'bg-risk-low-bg text-risk-low border-risk-low-border',
    NEUTRAL: 'bg-surface-dim text-slate-600 border-border-light',
    BRAND: 'bg-brand-subtle text-brand border-blue-200',
  };

  const dotClasses = {
    HIGH: 'bg-risk-high',
    MEDIUM: 'bg-risk-medium',
    LOW: 'bg-risk-low',
    NEUTRAL: 'bg-slate-400',
    BRAND: 'bg-brand',
  };

  return (
    <span className={twMerge(clsx(baseClasses, sizeClasses[size], variantClasses[variant], className))} {...props}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', dotClasses[variant])} />
      {children}
    </span>
  );
};
