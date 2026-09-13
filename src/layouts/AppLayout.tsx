import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Scale,
  FileText,
  GitCompare,
  BookOpen,
  Cpu,
  Trash2,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { CompliancePill } from '@/components/ui/CompliancePill';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/state/store';
import { setActivePreset } from '@/state/slices/contractUiSlice';
import { wipeSessionData } from '@/state/slices/uiSlice';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();
  const { activePreset } = useAppSelector((state) => state.contractUi);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navLinks = [
    { path: '/dashboard', label: 'Document Workspace', icon: FileText },
    { path: '/compare', label: 'Side-by-Side Diff', icon: GitCompare },
    { path: '/prep-kit', label: 'Lawyer Prep Kit', icon: BookOpen },
    { path: '/architecture', label: 'GenAI Architecture', icon: Cpu },
  ];

  const handleWipeData = () => {
    if (
      window.confirm(
        'Purge all session contract text, analysis cache, and chat history? This guarantees 100% ephemeral privacy.'
      )
    ) {
      dispatch(wipeSessionData());
      window.location.reload();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface-dim font-sans antialiased text-primary selection:bg-brand-subtle selection:text-brand">
      {/* Workspace Top Application Bar */}
      <header className="sticky top-0 z-40 bg-surface-light border-b border-border-light shadow-sm">
        <div className="max-w-[1700px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Brand & Contract Selector */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-level-1 group-hover:bg-primary-hover transition-colors">
                <Scale className="w-4 h-4" />
              </div>
              <span className="font-headline font-bold text-base text-primary tracking-tight">
                LexiAssist<span className="text-brand">AI</span>
              </span>
            </Link>

            {/* Active Document Switcher */}
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-border-light">
              <span className="text-xs font-medium text-slate-500">Contract:</span>
              <select
                value={activePreset}
                onChange={(e) => dispatch(setActivePreset(e.target.value as any))}
                className="text-xs font-semibold text-primary bg-surface-dim border border-border-light rounded-md px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-brand cursor-pointer hover:bg-slate-200 transition-colors"
              >
                <option value="LEASE">📄 Residential Lease (2026 NY)</option>
                <option value="MSA">💼 Freelancer Master Services (MSA)</option>
                <option value="CUSTOM">📤 Uploaded Agreement</option>
              </select>
            </div>
          </div>

          {/* Workspace Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-slate-600 hover:text-primary hover:bg-surface-dim'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Security Bar */}
          <div className="flex items-center gap-3">
            <CompliancePill className="hidden xl:inline-flex" />

            {/* 1-Click Ephemeral Data Purge */}
            <button
              onClick={handleWipeData}
              title="1-Click Ephemeral Data Wipe: Erases all session contracts"
              className="p-2 text-slate-400 hover:text-risk-high hover:bg-red-50 rounded-lg border border-transparent hover:border-risk-high-border transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Authenticated User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg border border-border-light bg-surface-dim hover:bg-slate-200 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold font-headline">
                  {user?.name?.slice(0, 2).toUpperCase() || 'JD'}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-semibold text-primary leading-none truncate max-w-[120px]">
                    {user?.name || 'Evaluator'}
                  </div>
                  <div className="text-[10px] text-slate-500 capitalize mt-0.5">
                    {user?.role?.toLowerCase() || 'guest'}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface-light border border-border-light rounded-xl shadow-level-2 py-1 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-border-light">
                    <p className="text-xs font-bold text-primary truncate">{user?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    {user?.isGuest && (
                      <span className="inline-block mt-1 text-[9px] font-bold text-brand bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200">
                        ⚡ Evaluator Mode Active
                      </span>
                    )}
                  </div>

                  <Link
                    to="/architecture"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-surface-dim transition-colors"
                  >
                    <Cpu className="w-3.5 h-3.5 text-slate-400" />
                    <span>GenAI Architecture</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-risk-high hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
