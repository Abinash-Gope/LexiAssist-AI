import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UploadCloud, Search, FileCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-brand uppercase tracking-wider bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
          Simple 3-Step Process
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-primary tracking-tight">
          How LexiAssist AI Works
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
          From opaque legalese to crystal-clear understanding and consultation preparation in under 30 seconds.
        </p>
      </div>

      {/* Steps Detailed Walkthrough */}
      <div className="space-y-8">
        {/* Step 1 */}
        <Card className="p-6 sm:p-8 bg-surface-light border-border-light shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand font-extrabold text-lg flex items-center justify-center flex-shrink-0">
            01
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <UploadCloud className="w-4 h-4 text-brand" />
              <h3 className="text-lg font-bold text-primary font-headline">
                Upload or Choose a Contract
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Upload any PDF, plain text (.txt), or Markdown (.md) document. Alternatively, select from our pre-loaded real-world agreements—such as a 2026 Residential Lease with hidden auto-renewal fees, or a Freelancer Master Services Agreement (MSA)—to start exploring instantly.
            </p>
          </div>
        </Card>

        {/* Step 2 */}
        <Card className="p-6 sm:p-8 bg-surface-light border-border-light shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 font-extrabold text-lg flex items-center justify-center flex-shrink-0">
            02
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-600" />
              <h3 className="text-lg font-bold text-primary font-headline">
                Instant Risk Scoring & Plain-English Translation
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our legal NLP engine parses the agreement clause-by-clause, assigning a 0–100 overall safety score. Predatory terms, unfair liability caps, and one-sided arbitration rules are highlighted in Red (High Risk), Amber (Caution), or Green (Standard).
            </p>
          </div>
        </Card>

        {/* Step 3 */}
        <Card className="p-6 sm:p-8 bg-surface-light border-border-light shadow-sm flex flex-col md:flex-row items-start gap-6">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 font-extrabold text-lg flex items-center justify-center flex-shrink-0">
            03
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-lg font-bold text-primary font-headline">
                Generate Your Lawyer Consultation Prep Kit
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Synthesize your review into a formatted PDF or Markdown Prep Kit. Arrive at legal counsel or counterparty negotiations prepared with the top 5 strategic questions, saving costly billable consultation hours.
            </p>
          </div>
        </Card>
      </div>

      {/* Ephemeral Guarantee */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <span>
          <strong>100% Client-Side Privacy:</strong> Documents are processed in volatile browser session memory and never saved to a permanent database.
        </span>
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <Link to="/login">
          <Button size="lg" variant="brand" className="font-semibold shadow-level-2">
            <span>Test a Sample Contract Now</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
