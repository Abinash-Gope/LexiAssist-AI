import React, { useState } from 'react';
import { Copy, Check, Sparkles, Scale, AlertTriangle, AlertCircle, FileText } from 'lucide-react';
import { ContractClause } from '@/core/types/contract.types';
import { Card } from '../../ui/Card';
import { Button } from '../../ui/Button';

interface ClauseDeconstructionCardProps {
  clause: ContractClause | undefined;
}

export const ClauseDeconstructionCard: React.FC<ClauseDeconstructionCardProps> = ({
  clause,
}) => {
  const [copied, setCopied] = useState(false);

  if (!clause) {
    return (
      <Card className="p-8 text-center text-slate-400 border-dashed">
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-xs">Select any highlighted clause on the left to inspect its plain-English breakdown and risks.</p>
      </Card>
    );
  }

  const handleCopyCounterProposal = () => {
    if (clause.counterProposal) {
      navigator.clipboard.writeText(clause.counterProposal);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isHighRisk = clause.severity === 'HIGH';
  const isMediumRisk = clause.severity === 'MEDIUM';

  return (
    <Card className="p-5 border-border-light bg-surface-light shadow-level-1 space-y-4">
      {/* Clause Header */}
      <div className="flex items-start justify-between gap-3 border-b border-border-light pb-3">
        <div>
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
            Selected Provision
          </span>
          <h3 className="text-sm font-bold font-headline text-primary mt-0.5">
            {clause.sectionNumber}: {clause.title}
          </h3>
        </div>

        {isHighRisk && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-risk-high bg-risk-high-bg px-2.5 py-1 rounded-full border border-risk-high-border">
            <AlertCircle className="w-3.5 h-3.5" /> High Risk
          </span>
        )}
        {isMediumRisk && (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-risk-medium bg-risk-medium-bg px-2.5 py-1 rounded-full border border-risk-medium-border">
            <AlertTriangle className="w-3.5 h-3.5" /> Caution
          </span>
        )}
        {!isHighRisk && !isMediumRisk && (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Standard Term
          </span>
        )}
      </div>

      {/* Plain English Translation */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4 space-y-2">
        <div className="flex items-center gap-1.5 text-xs font-bold text-brand uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plain-English Breakdown</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          {clause.plainEnglishSummary}
        </p>
      </div>

      {/* Identified Risk Callout */}
      {clause.identifiedRisk && (
        <div className="bg-red-50/70 border border-red-200 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-900">
            <AlertCircle className="w-3.5 h-3.5 text-red-600" />
            <span>Identified Risk Factor</span>
          </div>
          <p className="text-xs text-red-800 font-medium">
            {clause.identifiedRisk}
          </p>
        </div>
      )}

      {/* Statutory Legal Precedent Reference */}
      {clause.statutoryReference && (
        <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-3 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Statutory Precedent / Law</span>
          </div>
          <p className="text-xs text-blue-800 font-medium">
            {clause.statutoryReference}
          </p>
        </div>
      )}

      {/* Actionable Counter-Proposal */}
      {clause.counterProposal && (
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 flex items-center gap-1">
              <span>⚖️ Recommended Counter-Clause</span>
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyCounterProposal}
              className="text-[11px] h-7 px-2.5 bg-white border-emerald-300 text-emerald-800 hover:bg-emerald-50"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600 mr-1" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 mr-1" />
                  Copy Language
                </>
              )}
            </Button>
          </div>
          <p className="text-xs text-emerald-900 font-serif italic bg-white/80 p-2.5 rounded border border-emerald-100">
            "{clause.counterProposal}"
          </p>
        </div>
      )}
    </Card>
  );
};
