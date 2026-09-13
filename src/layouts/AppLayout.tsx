import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Scale,
  FileText,
  GitCompare,
  BookOpen,
  Trash2,
  LogOut,
  ChevronDown,
  Menu,
  X,
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
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = [
    { path: '/dashboard', label: 'Document Workspace', icon: FileText },
    { path: '/compare', label: 'Side-by-Side Diff', icon: GitCompare },
    { path: '/prep-kit', label: 'Lawyer Prep Kit', icon: BookOpen },
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
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-[1750px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand & Contract Selector */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-hover group-hover:scale-105 transition-all">
                <Scale className="w-3.5 h-3.5 text-brand-subtle" />
              </div>
              <div className="flex items-center">
                <span className="font-headline font-bold text-sm sm:text-base text-primary tracking-tight">
                  LexiAssist<span className="text-brand">AI</span>
                </span>
                <span className="hidden sm:inline-flex ml-2 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200/70 px-1.5 py-0.5 rounded">
                  Studio
                </span>
              </div>
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden md:block" />

            {/* Styled Contract Switcher */}
            <div className="hidden md:flex items-center relative">
              <div className="absolute left-2.5 pointer-events-none text-brand">
                <FileText className="w-3.5 h-3.5" />
              </div>
              <select
                value={activePreset}
                onChange={(e) => dispatch(setActivePreset(e.target.value as any))}
                className="appearance-none text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-full pl-8 pr-7 py-1.5 focus:outline-none focus:ring-2 focus:ring-brand/20 cursor-pointer shadow-xs transition-all"
              >
                <option value="LEASE">NY Residential Lease (2026)</option>
                <option value="MSA">Freelancer Master Services (MSA)</option>
                <option value="CUSTOM">Custom Uploaded Agreement</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>
          </div>

          {/* Modern Segmented Floating Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/70 shadow-xs">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-primary font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-primary hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-brand' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile & Security Bar */}
          <div className="flex items-center gap-2.5">
            {/* Subtle Guardrail Badge */}
            <div className="hidden 2xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border border-amber-200/80 bg-amber-50/80 text-amber-800">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Legal Info Only</span>
            </div>

            {/* 1-Click Ephemeral Data Wipe */}
            <button
              onClick={handleWipeData}
              title="1-Click Ephemeral Data Wipe: Erases all session contracts"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-risk-high bg-slate-50 hover:bg-red-50 border border-slate-200/80 hover:border-risk-high-border transition-all shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-risk-high" />
              <span className="hidden sm:inline">Purge Data</span>
            </button>

            {/* Authenticated User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pr-2.5 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 shadow-xs transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand to-primary text-white flex items-center justify-center text-[10px] font-bold">
                  {user?.name?.slice(0, 2).toUpperCase() || 'GU'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-semibold text-xs text-slate-700 leading-none truncate max-w-[100px]">
                    {user?.name || 'Evaluator'}
                  </div>
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-200/90 rounded-2xl shadow-level-2 py-1.5 z-50 animate-fade-in">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-primary truncate">{user?.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                    {user?.isGuest && (
                      <span className="inline-block mt-1 text-[9px] font-bold text-brand bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/80">
                        ⚡ Evaluator Mode
                      </span>
                    )}
                  </div>

                  <Link
                    to="/"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
                  >
                    <span>Public Home</span>
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

            {/* Mobile Menu Trigger for Workspace */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Workspace Menu"
              >
                {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileNavOpen && (
          <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-3 animate-fade-in shadow-lg">
            <div className="flex flex-col space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileNavOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-brand font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile Contract Switcher */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Active Contract
              </span>
              <select
                value={activePreset}
                onChange={(e) => {
                  dispatch(setActivePreset(e.target.value as any));
                  setIsMobileNavOpen(false);
                }}
                className="w-full text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand"
              >
                <option value="LEASE">NY Residential Lease (2026)</option>
                <option value="MSA">Freelancer Master Services (MSA)</option>
                <option value="CUSTOM">Custom Uploaded Agreement</option>
              </select>
            </div>
          </div>
        )}
      </header>

      {/* Main Workspace Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
