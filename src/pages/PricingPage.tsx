import React from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const PricingPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-brand uppercase tracking-wider bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
          Transparent Access
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-primary tracking-tight">
          Democratizing Legal Literacy for Everyone
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
          Fair, transparent access designed to protect everyday tenants, freelancers, and small business owners from predatory contract traps.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free Forever Tier */}
        <div className="bg-surface-light border-2 border-brand rounded-2xl p-6 sm:p-8 space-y-6 shadow-level-2 relative">
          <div className="absolute -top-3 right-6 bg-brand text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
            Community Access
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-primary font-headline">Free Forever</h3>
            <p className="text-xs text-slate-500">For tenants, freelancers, and individual signers.</p>
            <div className="pt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-primary font-headline">$0</span>
              <span className="text-xs text-slate-500">/ month</span>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Unlimited contract risk deconstruction</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Side-by-side contract diff comparison</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Grounded Q&A with clause citations</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Lawyer Prep Kit export (PDF & Markdown)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>100% ephemeral privacy (zero data retention)</span>
            </li>
          </ul>

          <Link to="/login" className="block pt-2">
            <Button variant="brand" className="w-full text-xs font-semibold py-2.5">
              <span>Get Started Free</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>

        {/* Legal Pro Tier */}
        <div className="bg-surface-light border border-border-light rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm opacity-90 relative">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-primary font-headline">Legal Pro & Teams</h3>
            <p className="text-xs text-slate-500">For legal clinics, law firms, and procurement.</p>
            <div className="pt-2 flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-slate-400 font-headline">Coming Soon</span>
            </div>
          </div>

          <ul className="space-y-3 text-xs text-slate-600">
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Batch multi-document ingestion</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Custom organizational playbooks</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Multi-counsel collaborative redlines</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Priority API processing speed</span>
            </li>
          </ul>

          <div className="pt-2">
            <Button variant="outline" disabled className="w-full text-xs py-2.5 text-slate-400 cursor-not-allowed">
              Waitlist Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
