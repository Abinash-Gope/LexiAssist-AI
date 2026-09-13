import React from 'react';
import { Scale, AlertCircle, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const ContractTeaserSection: React.FC = () => {
  return (
    <section id="preview" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      <Card className="p-6 sm:p-8 bg-surface-light border-border-light shadow-level-2 hover:shadow-level-3 transition-shadow space-y-6">
        <div className="flex items-center justify-between border-b border-border-light pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-primary font-headline">
                Live Contract Risk Deconstruction Teaser
              </h3>
              <span className="text-xs text-slate-500">
                Residential Tenancy Agreement — Section 12.2 Auto-Renewal
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-risk-high bg-risk-high-bg px-2.5 py-1 rounded-full border border-risk-high-border flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" /> High Risk Detected
          </span>
        </div>

        {/* Split comparison preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Opaque Legalese */}
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Opaque Legalese (Contract Text)
            </span>
            <p className="text-xs text-slate-800 font-legal leading-relaxed italic">
              "In the absence of formal written cancellation delivered no less than ninety (90) days prior to the expiration date, this Agreement shall automatically renew for a successive twelve (12) month term. Upon such renewal, Monthly Base Rent shall automatically escalate by fifteen percent (15.0%)..."
            </p>
          </div>

          {/* Plain English Translation */}
          <div className="bg-emerald-50/60 p-5 rounded-lg border border-emerald-200 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-600" /> Plain-English Takeaway
            </span>
            <ul className="text-xs text-slate-800 space-y-1.5 list-disc list-inside">
              <li>
                <strong>Automatic 1-Year Lock-In:</strong> If you miss the 90-day cancellation window, you are trapped for another full year with zero cancellation recourse.
              </li>
              <li>
                <strong>Mandatory $480/Month Rent Hike:</strong> Rent automatically increases by 15% on Day 1 of renewal (exceeds statutory guidelines).
              </li>
            </ul>
          </div>
        </div>
      </Card>
    </section>
  );
};
