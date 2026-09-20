import React, { useRef, useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  MessageSquareQuote,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { RedlineClause } from '@/core/types/diff.types';
import { Button } from '../../ui/Button';

interface DualColumnRedlineProps {
  clauses: RedlineClause[];
  selectedDiffClauseId: string | null;
  onSelectDiffClause: (clauseId: string) => void;
  isSyncScrollLocked: boolean;
  baselineTitle?: string;
  baselineVersion?: string;
  counterTitle?: string;
  counterVersion?: string;
}

const DualColumnRedlineComponent: React.FC<DualColumnRedlineProps> = ({
  clauses,
  selectedDiffClauseId,
  onSelectDiffClause,
  isSyncScrollLocked,
  baselineTitle,
  baselineVersion,
  counterTitle,
  counterVersion,
}) => {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const isSyncingRef = useRef(false);
  const [copiedClauseId, setCopiedClauseId] = useState<string | null>(null);

  const handleCopyClause = (text: string, id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedClauseId(id);
    setTimeout(() => setCopiedClauseId(null), 2000);
  };

  const handleLeftScroll = () => {
    if (!isSyncScrollLocked || !leftColRef.current || !rightColRef.current) return;
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;
    rightColRef.current.scrollTop = leftColRef.current.scrollTop;
    requestAnimationFrame(() => {
      isSyncingRef.current = false;
    });
  };

  const handleRightScroll = () => {
    if (!isSyncScrollLocked || !leftColRef.current || !rightColRef.current) return;
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;
    leftColRef.current.scrollTop = rightColRef.current.scrollTop;
    requestAnimationFrame(() => {
      isSyncingRef.current = false;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[650px]">
      {/* Left Column: Baseline Precedent */}
      <div className="flex flex-col bg-surface-light border border-border-light rounded-xl overflow-hidden shadow-level-1">
        <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider truncate">
              {baselineTitle || 'AI Fair-Market Legal Baseline (v1.0)'}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 flex-shrink-0">
            {baselineVersion || 'AI Balanced Standard'}
          </span>
        </div>

        <div
          ref={leftColRef}
          onScroll={handleLeftScroll}
          className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50 font-legal text-[14px]"
        >
          {clauses.map((clause) => {
            const isSelected = clause.id === selectedDiffClauseId;
            const isCopied = copiedClauseId === `base-${clause.id}`;

            return (
              <div
                key={`base-${clause.id}`}
                onClick={() => onSelectDiffClause(clause.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer space-y-2.5 ${
                  isSelected
                    ? 'border-brand bg-white shadow-sm ring-1 ring-brand/20'
                    : 'border-border-light bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-sans">
                  <span className="text-xs font-bold text-primary font-mono">
                    {clause.sectionNumber}: {clause.title}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    AI Balanced Standard
                  </span>
                </div>
                <p className="text-slate-800 leading-relaxed">{clause.baselineText}</p>

                <div className="flex items-center justify-end pt-2 border-t border-slate-100 font-sans">
                  <button
                    onClick={(e) => handleCopyClause(clause.baselineText, `base-${clause.id}`, e)}
                    className="text-[11px] text-brand hover:text-brand-dark font-semibold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-brand/5"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy AI Clause</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Counter-Proposal Redline */}
      <div className="flex flex-col bg-surface-light border border-border-light rounded-xl overflow-hidden shadow-level-1">
        <div className="p-3 bg-red-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-ping" />
            <h3 className="text-xs font-bold uppercase tracking-wider truncate">
              {counterTitle || 'Uploaded Legal Draft (v2.0)'}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-red-300 bg-red-900 px-2 py-0.5 rounded border border-red-800 flex-shrink-0">
            {counterVersion || 'Draft with Risks'}
          </span>
        </div>

        <div
          ref={rightColRef}
          onScroll={handleRightScroll}
          className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50 font-legal text-[14px]"
        >
          {clauses.map((clause) => {
            const isSelected = clause.id === selectedDiffClauseId;
            const isHigh = clause.severity === 'HIGH';
            const isMedium = clause.severity === 'MEDIUM';
            const isCopied = copiedClauseId === `alt-${clause.id}`;

            return (
              <div
                key={`alt-${clause.id}`}
                onClick={() => onSelectDiffClause(clause.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer space-y-3 ${
                  isSelected
                    ? 'border-red-400 bg-white shadow-sm ring-1 ring-red-400/30'
                    : 'border-border-light bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-sans">
                  <span className="text-xs font-bold text-primary font-mono">
                    {clause.sectionNumber}: {clause.title}
                  </span>
                  {isHigh ? (
                    <span className="text-[10px] font-bold text-risk-high bg-risk-high-bg px-2 py-0.5 rounded border border-risk-high-border flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> High Liability Shift
                    </span>
                  ) : isMedium ? (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      🟡 Moderate Term Shift
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Standard Commercial Term
                    </span>
                  )}
                </div>

                {/* Redline Text Render */}
                <p className="text-slate-800 leading-relaxed">
                  {clause.alteredText}
                </p>

                {/* "What is the problem here?" Analysis */}
                <div className="bg-amber-50/90 border border-amber-200 rounded-lg p-3 text-xs font-sans text-amber-950 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <MessageSquareQuote className="w-3.5 h-3.5 text-amber-700" />
                    <span>What is the problem in your uploaded draft?</span>
                  </div>
                  <p className="leading-relaxed text-amber-900">{clause.semanticAnalysis}</p>
                </div>

                {/* Statutory Warning if any */}
                {clause.statutoryWarning && (
                  <div className="bg-red-50 border border-red-200 rounded p-2.5 text-xs font-sans text-red-900 space-y-0.5">
                    <span className="font-bold block">⚠️ Statutory Precedent Violation:</span>
                    <p className="text-[11px] text-red-800 leading-relaxed">{clause.statutoryWarning}</p>
                  </div>
                )}

                {/* Remediation Action buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 font-sans">
                  <span className="text-[10px] text-slate-500 font-medium">
                    Recommended: <strong className="text-slate-700">{clause.suggestedAction || 'COUNTER'}</strong>
                  </span>

                  <button
                    onClick={(e) => handleCopyClause(clause.baselineText, `alt-${clause.id}`, e)}
                    className="text-[11px] text-brand hover:text-brand-dark font-semibold flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-brand/5"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied AI Fix!</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>Copy AI Recommended Replacement</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const DualColumnRedline = React.memo(DualColumnRedlineComponent);

