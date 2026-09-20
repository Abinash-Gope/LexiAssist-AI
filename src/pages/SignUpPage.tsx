import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Scale, ShieldCheck, Zap, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CompliancePill } from '@/components/ui/CompliancePill';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/core/types/auth.types';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, loginAsGuest } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('TENANT');
  const [consentChecked, setConsentChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!consentChecked) {
      setError(
        'Please acknowledge that LexiAssist AI provides document analysis and legal information, not certified legal counsel.'
      );
      return;
    }
    const result = signUp({ name: fullName, email, password, role });
    if (!result.success) {
      setError(result.error || 'Account creation failed. Please try again.');
      return;
    }
    navigate('/dashboard');
  };

  const handleGuestAccess = () => {
    loginAsGuest();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Column: Brand & Trust */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white p-12 flex-col justify-between relative overflow-hidden">
        <div className="space-y-6 relative z-10">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand flex items-center justify-center">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <span className="font-headline font-bold text-lg">LexiAssist AI</span>
          </Link>

          <div className="space-y-3 pt-8">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Join the Movement for Fair Contracts
            </span>
            <h2 className="text-3xl font-extrabold font-headline leading-tight">
              Sign Agreements with Complete Peace of Mind
            </h2>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              Never be blindsided by automatic 15% rent increases, uncapped indemnity clauses, or unilateral modification rights again.
            </p>
          </div>

          <div className="space-y-3 pt-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Zero Document Retention • 100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>Always Free for Individual Tenants & Freelance Creators</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-slate-800 text-[11px] text-slate-400">
          <CompliancePill />
        </div>
      </div>

      {/* Right Column: Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-surface-dim">
        <div className="w-full max-w-md bg-surface-light p-8 rounded-2xl border border-border-light shadow-level-2 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-headline text-primary">
              Create Your Free Account
            </h2>
            <p className="text-xs text-slate-500">
              Start reviewing agreements with AI-powered clarity and certified citations.
            </p>
          </div>

          {/* Hackathon Quick Bypass */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs text-brand font-medium">
              <Zap className="w-3.5 h-3.5 text-brand flex-shrink-0" />
              <span>Evaluating this project?</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGuestAccess}
              className="text-[11px] h-7 px-2.5 bg-white border-blue-300 text-brand"
            >
              1-Click Guest Access
            </Button>
          </div>

          {error && (
            <div
              role="alert"
              className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-fade-in"
            >
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold">{error}</p>
                {error.includes('already exists') && (
                  <Link
                    to="/login"
                    className="inline-block text-brand font-bold hover:underline"
                  >
                    Click here to sign in instead →
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSignUpSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              required
              placeholder="Alex Morgan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <Input
              label="Email Address"
              type="email"
              required
              placeholder="you@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              placeholder="Must be at least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Persona Role Selector */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                Primary Use Case
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3.5 py-2.5 bg-surface-light border border-border-light rounded-lg text-sm text-primary focus:outline-none focus:ring-1 focus:ring-brand cursor-pointer"
              >
                <option value="TENANT">Tenant / Renter (Residential Leases)</option>
                <option value="FREELANCER">Freelancer / Contractor (MSAs & Work Orders)</option>
                <option value="SMALL_BUSINESS">Small Business Owner (Vendor & Supplier Contracts)</option>
                <option value="RESEARCHER">Legal Student / Hackathon Evaluator</option>
              </select>
            </div>

            {/* Mandatory Guardrail Consent Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={consentChecked}
                  onChange={(e) => setConsentChecked(e.target.checked)}
                  className="rounded border-slate-300 mt-0.5 text-brand focus:ring-brand"
                />
                <span>
                  I understand that <strong>LexiAssist AI</strong> is an educational document-analysis tool and does not provide formal legal advice or attorney-client representation.
                </span>
              </label>
            </div>

            <Button type="submit" variant="primary" className="w-full font-semibold">
              Create Free Account
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
