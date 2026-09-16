import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const publicNavLinks = [
    { path: '/features', label: 'Features' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/security', label: 'Security' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-xl border-b border-slate-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm group-hover:bg-primary-hover group-hover:scale-105 transition-all">
                <Scale className="w-3.5 h-3.5 text-brand-subtle" />
              </div>
              <div className="flex items-center">
                <span className="font-headline font-bold text-sm sm:text-base text-primary tracking-tight whitespace-nowrap">
                  LexiAssist<span className="text-brand">AI</span>
                </span>
                <span className="hidden sm:inline-flex ml-2 text-[9px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200/70 px-1.5 py-0.5 rounded whitespace-nowrap">
                  Legal Access
                </span>
              </div>
            </Link>
          </div>

          {/* Modern Floating Pill Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/60 shadow-xs flex-shrink-0">
            {publicNavLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-primary font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-primary hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Desktop CTAs: Route to Login */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            <Link
              to="/login"
              className="text-xs font-semibold text-slate-600 hover:text-primary px-3 py-1.5 rounded-lg hover:bg-slate-100/60 transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>

            <Link to="/login" className="flex-shrink-0">
              <Button size="sm" variant="brand" className="text-xs font-semibold shadow-sm px-3.5 h-8 gap-1.5 rounded-lg whitespace-nowrap">
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/login">
              <Button size="sm" variant="brand" className="text-xs h-8 px-2.5">
                Sign In
              </Button>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-border-light bg-surface-light px-4 pt-2 pb-6 space-y-3 animate-fade-in shadow-lg">
          <div className="flex flex-col space-y-1.5 pt-1">
            {publicNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-brand hover:bg-surface-dim rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-border-light flex flex-col gap-2">
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full text-xs">
                Sign In to Workspace
              </Button>
            </Link>
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="brand" size="sm" className="w-full text-xs font-semibold">
                <span>Get Started Free</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
