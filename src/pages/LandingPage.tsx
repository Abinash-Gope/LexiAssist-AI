import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, ArrowRight, ShieldCheck, Sparkles, GitCompare, FileText, CheckCircle2, Lock, Eye, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CompliancePill } from '@/components/ui/CompliancePill';
import { Card } from '@/components/ui/Card';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Hackathon Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-brand">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span>PromptWars Hackathon • AI for Legal Assistance & Access</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold font-headline text-primary tracking-tight leading-[1.1]">
            Understand Any Legal Contract in Seconds,{' '}
            <span className="text-brand underline decoration-brand/30 decoration-wavy">
              Not Billable Hours
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
            LexiAssist AI demystifies opaque legalese, highlights predatory clauses in red, compares version differences, and generates your attorney consultation prep kit.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link to="/dashboard">
              <Button size="lg" variant="brand" className="font-semibold shadow-level-2">
                <span>Start Free Contract Review</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/compare">
              <Button size="lg" variant="secondary">
                <GitCompare className="w-4 h-4 mr-1 text-slate-600" />
                <span>Explore Contract Diff Demo</span>
              </Button>
            </Link>
          </div>

          {/* Compliance & Trust Banner */}
          <div className="pt-6">
            <CompliancePill variant="full" />
          </div>
        </div>
      </section>

      {/* Live Contract Teaser Preview Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="p-6 sm:p-8 bg-surface-light border-border-light shadow-level-3 space-y-6">
          <div className="flex items-center justify-between border-b border-border-light pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-primary font-headline">
                  Live Contract Risk Deconstruction Teaser
                </h3>
                <span className="text-xs text-slate-500">
                  Residential Tenancy Agreement — Section 12.2 Auto-Renewal
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-risk-high bg-risk-high-bg px-2.5 py-1 rounded-full border border-risk-high-border flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> High Risk Detected
            </span>
          </div>

          {/* Split comparison preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Opaque Legalese */}
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                Opaque Legalese (Contract Text)
              </span>
              <p className="text-xs text-slate-800 font-legal leading-relaxed italic">
                "In the absence of formal written cancellation delivered no less than ninety (90) days prior to the expiration date, this Agreement shall automatically renew for a successive twelve (12) month term. Upon such renewal, Monthly Base Rent shall automatically escalate by fifteen percent (15.0%)..."
              </p>
            </div>

            {/* Plain English Translation */}
            <div className="bg-emerald-50/60 p-5 rounded-lg border border-emerald-200 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" /> Plain-English Takeaway
              </span>
              <ul className="text-xs text-slate-800 space-y-1.5 list-disc list-inside">
                <li>
                  <strong>Automatic 1-Year Lock-In:</strong> If you miss the 90-day cancellation window, you are trapped for another full year with zero cancellation recourse.
                </li>
                <li>
                  <strong>Mandatory $480/Month Rent Hike:</strong> Rent automatically increases by 15% on Day 1 of renewal (exceeds statutory guidelines).
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </section>

      {/* 3 Core Value Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary">
            Designed for Legal Accessibility & Balance
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Everything you need to review contracts with clarity, spot hidden traps, and arrive prepared for legal counsel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 border-border-light bg-surface-light space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-primary font-headline">
              Plain-English Legalese Deconstructor
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Translates complex indemnification, liquidated damages, and Latin clauses into simple, actionable bullet points anyone can understand.
            </p>
          </Card>

          <Card className="p-6 border-border-light bg-surface-light space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <GitCompare className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-primary font-headline">
              Side-by-Side Semantic Diff
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload two contract versions to instantly spot altered notice deadlines, added liabilities, deleted tenant protections, and the net risk delta.
            </p>
          </Card>

          <Card className="p-6 border-border-light bg-surface-light space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-primary font-headline">
              Lawyer Prep Kit Generator
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Synthesizes an executive risk summary and the top 5 targeted questions for counsel, saving you hundreds of dollars in billable consultation hours.
            </p>
          </Card>
        </div>
      </section>

      {/* Zero Data Retention Security Promise */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary text-white p-8 rounded-2xl shadow-level-3 space-y-4 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> 100% Confidential & Ephemeral
            </div>
            <h3 className="text-xl font-bold font-headline">
              Your Contracts Are Never Stored Permanently
            </h3>
            <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
              We process contract text in ephemeral browser session memory. Use the 1-click Wipe Data button at any time to purge all active documents.
            </p>
          </div>
          <Link to="/dashboard" className="flex-shrink-0">
            <Button variant="brand" className="font-semibold text-xs">
              Launch Workspace Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
