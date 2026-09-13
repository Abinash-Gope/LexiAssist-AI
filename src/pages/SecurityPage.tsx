import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Trash2, EyeOff, ServerOff, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export const SecurityPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          Confidentiality & Privacy
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-primary tracking-tight">
          Your Contracts Are Never Stored
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
          Legal documents contain sensitive financial, personal, and proprietary information. We treat privacy as a non-negotiable architectural invariant.
        </p>
      </div>

      {/* 4 Pillars of Security */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-surface-light border-border-light space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <ServerOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            Zero Permanent Database Retention
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            LexiAssist AI does not store contract full-text in any persistent database. Ingestion and analysis occur within ephemeral, short-lived browser session memory.
          </p>
        </Card>

        <Card className="p-6 bg-surface-light border-border-light space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-brand flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            1-Click Ephemeral Data Wipe
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every workspace screen includes a prominent purge button. Clicking it instantly wipes all active contracts, cached risk heatmaps, and chat history.
          </p>
        </Card>

        <Card className="p-6 bg-surface-light border-border-light space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <EyeOff className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            No AI Model Training on User Data
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your documents are never used to train, fine-tune, or improve public foundation models. Your agreements remain strictly confidential to your session.
          </p>
        </Card>

        <Card className="p-6 bg-surface-light border-border-light space-y-3 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-primary font-headline">
            End-to-End Transport Encryption
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All data in transit is protected using TLS 1.3 encryption. Analysis pipelines strictly use isolated API channels with strict input sanitization.
          </p>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="bg-primary text-white p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" /> 100% Confidential
          </div>
          <h3 className="text-lg font-bold font-headline">Experience Safe Document Analysis</h3>
          <p className="text-xs text-slate-300">Try our pre-loaded samples or upload a contract with complete peace of mind.</p>
        </div>
        <Link to="/login">
          <Button variant="brand" size="md" className="font-semibold text-xs px-5 py-2.5">
            <span>Launch Secure Workspace</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
