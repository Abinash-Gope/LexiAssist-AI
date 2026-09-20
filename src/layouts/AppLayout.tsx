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
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/state/store';
import { setActivePreset, clearCustomContract } from '@/state/slices/contractUiSlice';
import { wipeSessionData } from '@/state/slices/uiSlice';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, logout } = useAuth();
  const { activePreset, customContractTitle } = useAppSelector((state) => state.contractUi);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = [
    { path: '/dashboard', label: 'Document Workspace', icon: FileText },
    { path: '/compare', label: 'Side-by-Side Diff', icon: GitCompare },
    { path: '/prep-kit', label: 'Lawyer Prep Kit', icon: BookOpen },
  ];

  const handleWipeData = () => {
    const isConfirmed = window.confirm(
      'Purge all stored contracts, analysis data, and session cache from Local Storage?\n\nThis will permanently delete any uploaded contracts, clear all temporary storage, and reset the platform to standard defaults.'
    );

    if (!isConfirmed) return;

    try {
      // 1. Explicitly clear all known LexiAssist localStorage keys
      localStorage.removeItem('lexiassist_custom_text');
      localStorage.removeItem('lexiassist_custom_title');
      localStorage.removeItem('lexiassist_active_preset');

      // 2. Scan and remove any other lingering lexiassist, query or cache keys
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (
          key &&
          key !== 'lexiassist_auth_session' &&
          key !== 'lexiassist_registered_users' &&
          key !== 'lexiassist_remembered_email' &&
          (key.startsWith('lexiassist') ||
            key.toLowerCase().includes('contract') ||
            key.toLowerCase().includes('query') ||
            key.toLowerCase().includes('tanstack'))
        ) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));

      // 3. Clear session storage
      sessionStorage.clear();

      // 4. Reset Redux store states
      dispatch(clearCustomContract());
      dispatch(wipeSessionData());

      // 5. Navigate to dashboard and refresh to clean memory
      window.location.href = '/dashboard';
    } catch (err) {
      console.error('Error during data purge:', err);
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
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-[1750px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
          {/* Left: Brand & Context Indicator */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-hover group-hover:scale-105 transition-all">
                <Scale className="w-3.5 h-3.5 text-brand-subtle" />
              </div>
              <div className="flex items-center">
                <span className="font-headline font-bold text-sm sm:text-base text-primary tracking-tight whitespace-nowrap">
                  LexiAssist<span className="text-brand">AI</span>
                </span>
                <span className="hidden sm:inline-flex ml-2 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200/70 px-1.5 py-0.5 rounded whitespace-nowrap">
                  Studio
                </span>
              </div>
            </Link>

            <div className="h-4 w-px bg-slate-200 hidden md:block" />

            {/* Active Contract Indicator Badge */}
            {activePreset === 'CUSTOM' ? (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                <span className="max-w-[130px] truncate">{customContractTitle || 'Uploaded Contract'}</span>
              </span>
            ) : (
              <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200/80 whitespace-nowrap">
                <span>{activePreset === 'LEASE' ? '🏠 Residential Lease' : '📄 Freelancer MSA'}</span>
              </span>
            )}
          </div>

          {/* Center: Modern Segmented Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-full border border-slate-200/70 shadow-xs flex-shrink-0">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
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

          {/* Right: AI Engine Badge, Purge Button & User Profile */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Dual AI Engine Indicator */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border border-emerald-200 bg-emerald-50 text-emerald-800 shadow-xs whitespace-nowrap flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>NVIDIA NIM + Gemini</span>
            </div>

            {/* Prominent Data Purge Button */}
            <button
              onClick={handleWipeData}
              title="Purge all contract text and analysis from Local Storage"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 hover:border-rose-300 transition-all shadow-xs flex-shrink-0 whitespace-nowrap cursor-pointer active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-600" />
              <span>Purge Data</span>
            </button>

            {/* Authenticated User Menu */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 pr-2.5 rounded-full border border-slate-200/80 bg-white hover:bg-slate-50 shadow-xs transition-all flex-shrink-0 whitespace-nowrap cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-brand to-primary text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  {user?.name?.slice(0, 2).toUpperCase() || 'GU'}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="font-semibold text-xs text-slate-700 leading-none truncate max-w-[85px]">
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
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      handleWipeData();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-left font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Purge Local Data</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition-colors text-left border-t border-slate-100 mt-1"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger for Workspace */}
            <div className="flex lg:hidden items-center flex-shrink-0">
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

            {/* Mobile Data Purge Button */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Local Storage Data</span>
              <button
                onClick={() => {
                  setIsMobileNavOpen(false);
                  handleWipeData();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                <span>Purge Data</span>
              </button>
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
