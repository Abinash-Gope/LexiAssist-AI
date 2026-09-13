import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CompliancePillProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const CompliancePill: React.FC<CompliancePillProps> = ({
  className,
  variant = 'compact',
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border bg-amber-50 text-amber-900 border-amber-200 shadow-sm select-none',
          className
        )
      )}
      title="LexiAssist AI is an educational analysis tool and does not provide certified legal advice or attorney representation."
    >
      <ShieldAlert className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
      <span>
        {variant === 'full' ? (
          <>
            <strong>Legal Information Only:</strong> LexiAssist AI provides document analysis, not
            certified legal advice.
          </>
        ) : (
          'Legal Information Only • Not Certified Legal Advice'
        )}
      </span>
    </div>
  );
};
