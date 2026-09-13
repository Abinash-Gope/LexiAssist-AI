import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, GitCompare, FileText, ShieldAlert, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const FeaturesPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-brand uppercase tracking-wider bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
          Platform Capabilities
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-primary tracking-tight">
          Everything You Need to Understand Legal Contracts
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
          LexiAssist AI combines grounded legal NLP with intuitive visualization to eliminate predatory clause blindspots and save you hundreds in legal consultation fees.
        </p>
      </div>

      {/* Grid of Core Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-surface-light border-border-light space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            Plain-English Clause Deconstructor
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Translates dense legalese, indemnification clauses, liquidated damages, and archaic terms into everyday language anyone can understand.
          </p>
          <ul className="text-xs text-slate-500 space-y-1.5 pt-1">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Breaks down complex legal jargon</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Identifies hidden tenant & contractor traps</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-surface-light border-border-light space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <GitCompare className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            Side-by-Side Semantic Diff
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Upload two contract drafts to instantly pinpoint altered deadlines, deleted tenant protections, added liabilities, and the net risk delta.
          </p>
          <ul className="text-xs text-slate-500 space-y-1.5 pt-1">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Synchronized dual-column view</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Highlights legal meaning, not just text</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-surface-light border-border-light space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            Lawyer Prep Kit Generator
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generates an executive risk matrix and the top 5 targeted questions for legal counsel, cutting down billable consultation time.
          </p>
          <ul className="text-xs text-slate-500 space-y-1.5 pt-1">
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>One-click PDF & Markdown export</span>
            </li>
            <li className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Prioritized questions for first meeting</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 bg-surface-light border-border-light space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            Red / Amber / Green Risk Scoring
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Color-coded severity indicators instantly highlight dangerous clauses (Red), caution areas (Amber), and fair standard terms (Green).
          </p>
        </Card>

        <Card className="p-6 bg-surface-light border-border-light space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            Document-Grounded Q&A
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Ask natural-language questions about your agreement and receive exact clause citations with zero hallucination fallbacks.
          </p>
        </Card>

        <Card className="p-6 bg-surface-light border-border-light space-y-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            Pre-Loaded Sample Contracts
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Test residential leases, freelance MSAs, and contractor agreements immediately with 1-click presets—no file upload required.
          </p>
        </Card>
      </div>

      {/* CTA Banner */}
      <div className="bg-primary text-white p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="text-lg font-bold font-headline">Ready to examine your contract?</h3>
          <p className="text-xs text-slate-300">Start free with our instant evaluator guest mode or sign in.</p>
        </div>
        <Link to="/login">
          <Button variant="brand" size="md" className="font-semibold text-xs px-5 py-2.5">
            <span>Get Started Free</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
