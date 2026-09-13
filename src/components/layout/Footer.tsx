import React from 'react';
import { Scale, ShieldCheck, Lock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-slate-400 border-t border-slate-800 text-xs py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded bg-brand flex items-center justify-center">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <span className="font-headline font-bold text-base">LexiAssist AI</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              Empowering everyday individuals, tenants, and small business owners with GenAI-powered
              legal literacy, risk identification, and contract comparison.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Ephemeral Processing
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-blue-400" /> Zero Permanent Data Retention
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="hover:text-white transition-colors">
                  Core Capabilities
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors">
                  Pricing & Access
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-white transition-colors">
                  Security & Ephemeral Privacy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Sign In to Workspace
                </Link>
              </li>
            </ul>
          </div>

          {/* Hackathon Details */}
          <div>
            <h4 className="text-white font-semibold mb-3 uppercase tracking-wider text-[11px]">
              PromptWars Submission
            </h4>
            <p className="text-slate-400 text-xs mb-2">
              Theme: AI for Legal Assistance & Access
            </p>
            <p className="text-slate-500 text-[11px]">
              PromptWars Hackathon Project • Built with React & Unidirectional 4-Layer Architecture.
            </p>
          </div>
        </div>

        {/* Mandatory Legal Guardrail Notice */}
        <div className="pt-6 border-t border-slate-800/80 text-[11px] leading-relaxed text-slate-400 space-y-2">
          <p className="font-medium text-slate-300">
            <strong>IMPORTANT LEGAL DISCLAIMER:</strong> LexiAssist AI is an educational document-analysis and comprehension tool. It does not provide certified legal counsel, legal representation, or formal attorney-client privilege. Content generated through this platform should be used strictly for informational orientation and preparation prior to engaging certified legal practitioners.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-slate-400">
            <span>© 2026 LexiAssist AI. All rights reserved.</span>
            <span>Client-side Ephemeral Storage Active.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
