import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scale, ShieldCheck, Zap, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { CompliancePill } from '@/components/ui/CompliancePill';
import { useAuth } from '@/hooks/useAuth';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginAsGuest, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  // If user is already authenticated, don't show login form - go directly to workspace
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, from, navigate]);

  // Load remembered email if previously stored
  useEffect(() => {
    try {
      const remembered = localStorage.getItem('lexiassist_remembered_email');
      if (remembered) {
        setEmail(remembered);
      }
    } catch { /* ignore */ }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const result = login({ email, password });
    if (!result.success) {
      setError(result.error || 'Authentication failed. Please check your credentials.');
      return;
    }

    // Persist remembered email for easy future logins
    try {
      if (rememberDevice) {
        localStorage.setItem('lexiassist_remembered_email', email.trim().toLowerCase());
      } else {
        localStorage.removeItem('lexiassist_remembered_email');
      }
    } catch { /* ignore */ }

    navigate(from, { replace: true });
  };

  const handleGuestDemo = () => {
    loginAsGuest();
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Column: Brand & Authority */}
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
              AI for Legal Assistance & Access
            </span>
            <h2 className="text-3xl font-extrabold font-headline leading-tight">
              Democratizing Legal Comprehension for Everyone
            </h2>
            <p className="text-sm text-slate-300 max-w-md leading-relaxed">
              We level the playing field so renters, freelancers, and small businesses never sign an agreement with hidden traps.
            </p>
          </div>

          <div className="space-y-3 pt-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Grounded GenAI with exact clause citations</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-blue-400" />
              <span>100% Ephemeral Document Processing (Zero Data Retention)</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-8 border-t border-slate-800 text-[11px] text-slate-400">
          <CompliancePill />
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-surface-dim">
        <div className="w-full max-w-md bg-surface-light p-8 rounded-2xl border border-border-light shadow-level-2 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold font-headline text-primary">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-slate-500">
              Access your document intelligence dashboard and saved reports.
            </p>
          </div>

          {/* Hackathon Evaluator Fast-Track */}
          <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-brand">
              <Zap className="w-3.5 h-3.5 text-brand" />
              <span>PromptWars Evaluator Fast-Track</span>
            </div>
            <p className="text-[11px] text-slate-600">
              Judging this project? Skip registration and enter the demo workspace immediately with pre-loaded legal contracts.
            </p>
            <Button
              type="button"
              variant="brand"
              size="sm"
              onClick={handleGuestDemo}
              className="w-full text-xs font-semibold"
            >
              <span>Launch 1-Click Guest Demo</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-border-light w-full" />
            <span className="bg-surface-light px-3 text-[10px] uppercase font-bold text-slate-400 absolute font-mono">
              Or sign in with email
            </span>
          </div>

          {error && (
            <div
              role="alert"
              className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-700 animate-fade-in"
            >
              <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="font-semibold">{error}</p>
                {error.includes('No account found') && (
                  <Link
                    to="/signup"
                    className="inline-block text-brand font-bold hover:underline"
                  >
                    Click here to create a free account →
                  </Link>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            {/* Quick Demo Helper */}
            <div className="flex items-center justify-between text-[11px] bg-slate-50 px-3 py-2 rounded-lg border border-slate-200/80">
              <span className="text-slate-600">
                Demo Account: <code className="text-slate-800 font-semibold font-mono">counsel@lexiassist.ai</code>
              </span>
              <button
                type="button"
                onClick={() => {
                  setEmail('counsel@lexiassist.ai');
                  setPassword('password123');
                  setError(null);
                }}
                className="text-brand font-semibold hover:underline cursor-pointer ml-2 whitespace-nowrap"
              >
                Use Demo
              </button>
            </div>

            <Input
              label="Work or Personal Email"
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-1.5 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  className="rounded border-slate-300 text-brand focus:ring-brand"
                />
                <span>Remember this device</span>
              </label>
              <a href="#forgot" className="text-brand hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Sign In to Workspace
            </Button>
          </form>

          <p className="text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand font-semibold hover:underline">
              Create free account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
