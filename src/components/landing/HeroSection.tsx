import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CompliancePill } from '@/components/ui/CompliancePill';
import { useAuth } from '@/hooks/useAuth';

export const HeroSection: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative pt-6 sm:pt-10 pb-2 overflow-hidden text-center">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(37,99,235,0.08),rgba(255,255,255,0))]" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {/* Hackathon Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50/90 border border-blue-200/80 text-xs font-semibold text-brand shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-brand" />
          <span>PromptWars Hackathon • AI for Legal Assistance & Access</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] xl:text-5xl font-extrabold font-headline text-primary tracking-tight leading-[1.15] max-w-5xl mx-auto">
          Understand Any Legal Contract in Seconds,
          <br className="hidden sm:inline" />{' '}
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
            Not Billable Hours
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-sans leading-relaxed">
          LexiAssist AI demystifies opaque legalese, highlights predatory clauses in red, compares version differences, and generates your attorney consultation prep kit.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link to={isAuthenticated ? "/dashboard" : "/login"}>
            <Button size="lg" variant="brand" className="font-semibold shadow-level-2 hover:shadow-level-3">
              <span>{isAuthenticated ? "Open Document Workspace" : "Start Free Contract Review"}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link to="/features">
            <Button size="lg" variant="secondary" className="font-semibold">
              <GitCompare className="w-4 h-4 mr-1.5 text-slate-600" />
              <span>Explore Capabilities</span>
            </Button>
          </Link>
        </div>

        {/* Compliance & Trust Banner */}
        <div className="pt-1">
          <CompliancePill variant="full" />
        </div>
      </div>
    </section>
  );
};
