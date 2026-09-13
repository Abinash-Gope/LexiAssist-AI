import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, FileText, GitCompare, BookOpen, Cpu, ShieldCheck, Trash2, ArrowRight } from 'lucide-react';
import { CompliancePill } from '../ui/CompliancePill';
import { Button } from '../ui/Button';
import { useAppDispatch, useAppSelector } from '@/state/store';
import { setActivePreset } from '@/state/slices/contractUiSlice';
import { wipeSessionData } from '@/state/slices/uiSlice';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { activePreset } = useAppSelector((state) => state.contractUi);

  const navLinks = [
    { path: '/dashboard', label: 'Workspace', icon: FileText },
    { path: '/compare', label: 'Contract Diff', icon: GitCompare },
    { path: '/prep-kit', label: 'Lawyer Prep Kit', icon: BookOpen },
    { path: '/architecture', label: 'GenAI Architecture', icon: Cpu },
  ];

  const handleWipeData = () => {
    if (window.confirm('Wipe all ephemeral session contracts and chat history? This guarantees 100% zero data retention.')) {
      dispatch(wipeSessionData());
      window.location.reload();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-surface-light/95 backdrop-blur-md border-b border-border-light shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-level-1 group-hover:bg-primary-hover transition-colors">
                <Scale className="w-5 h-5 text-brand-foreground" />
              </div>
              <div>
                <span className="font-headline font-bold text-lg text-primary tracking-tight">
                  LexiAssist<span className="text-brand">AI</span>
                </span>
                <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 border border-slate-200 px-1.5 py-0.2 rounded">
                  Legal Access
                </span>
              </div>
            </Link>

            {/* Document Switcher Dropdown (Visible on Dashboard/Diff) */}
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-border-light">
              <span className="text-xs text-slate-500 font-medium">Active Contract:</span>
              <select
                value={activePreset}
                onChange={(e) => dispatch(setActivePreset(e.target.value as any))}
                className="text-xs font-semibold text-primary bg-surface-dim border border-border-light rounded-md px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-brand cursor-pointer hover:bg-slate-200 transition-colors"
              >
                <option value="LEASE">📄 Residential Lease 2026 (NY)</option>
                <option value="MSA">💼 Freelance Master Services (MSA)</option>
                <option value="CUSTOM">📤 Uploaded Custom Agreement</option>
              </select>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-level-1'
                      : 'text-slate-600 hover:text-primary hover:bg-surface-dim'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Compliance Guardrail & Actions */}
          <div className="flex items-center gap-3">
            <CompliancePill className="hidden xl:inline-flex" />

            <button
              onClick={handleWipeData}
              title="1-Click Ephemeral Data Wipe: Deletes all session text and chats"
              className="p-2 text-slate-400 hover:text-risk-high hover:bg-red-50 rounded-lg border border-transparent hover:border-risk-high-border transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <Link to="/login">
              <Button size="sm" variant="outline" className="hidden sm:inline-flex text-xs">
                Sign In
              </Button>
            </Link>

            <Link to="/dashboard">
              <Button size="sm" variant="brand" className="text-xs font-semibold">
                <span>Launch App</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
