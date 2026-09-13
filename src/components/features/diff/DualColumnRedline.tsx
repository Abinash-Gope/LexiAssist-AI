import React, { useRef } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight, RotateCcw, MessageSquareQuote } from 'lucide-react';
import { RedlineClause } from '@/core/types/diff.types';
import { Button } from '../../ui/Button';

interface DualColumnRedlineProps {
  clauses: RedlineClause[];
  selectedDiffClauseId: string | null;
  onSelectDiffClause: (clauseId: string) => void;
  isSyncScrollLocked: boolean;
}

export const DualColumnRedline: React.FC<DualColumnRedlineProps> = ({
  clauses,
  selectedDiffClauseId,
  onSelectDiffClause,
  isSyncScrollLocked,
}) => {
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const handleLeftScroll = () => {
    if (isSyncScrollLocked && leftColRef.current && rightColRef.current) {
      rightColRef.current.scrollTop = leftColRef.current.scrollTop;
    }
  };

  const handleRightScroll = () => {
    if (isSyncScrollLocked && leftColRef.current && rightColRef.current) {
      leftColRef.current.scrollTop = rightColRef.current.scrollTop;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[650px]">
      {/* Left Column: Baseline Precedent */}
      <div className="flex flex-col bg-surface-light border border-border-light rounded-xl overflow-hidden shadow-level-1">
        <div className="p-3 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Baseline: Standard Model Lease (v1.0)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            NY Statutory Precedent
          </span>
        </div>

        <div
          ref={leftColRef}
          onScroll={handleLeftScroll}
          className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/50 font-legal text-[14px]"
        >
          {clauses.map((clause) => {
            const isSelected = clause.id === selectedDiffClauseId;
            return (
              <div
                key={`base-${clause.id}`}
                onClick={() => onSelectDiffClause(clause.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand bg-white shadow-sm ring-1 ring-brand/20'
                    : 'border-border-light bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2 font-sans">
                  <span className="text-xs font-bold text-primary font-mono">
                    {clause.sectionNumber}: {clause.title}
                  </span>
                  <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Equitable Baseline
                  </span>
                </div>
                <p className="text-slate-800 leading-relaxed">{clause.baselineText}</p>
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
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Counter-Proposal: Proposed Landlord Lease (v2.1)
            </h3>
          </div>
          <span className="text-[10px] font-mono text-red-300 bg-red-900 px-2 py-0.5 rounded border border-red-800">
            Contains Material Redlines
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
                  ) : (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Modified Term
                    </span>
                  )}
                </div>

                {/* Redline Text Render */}
                <p className="text-slate-800 leading-relaxed">
                  {clause.alteredText}
                </p>

                {/* AI Semantic Delta Note */}
                <div className="bg-amber-50/80 border border-amber-200 rounded p-2.5 text-xs font-sans text-amber-950 space-y-1">
                  <div className="font-bold flex items-center gap-1 text-amber-900">
                    <MessageSquareQuote className="w-3.5 h-3.5 text-amber-700" />
                    <span>Semantic Impact Analysis</span>
                  </div>
                  <p>{clause.semanticAnalysis}</p>
                </div>

                {/* Statutory Warning if any */}
                {clause.statutoryWarning && (
                  <div className="bg-red-50 border border-red-200 rounded p-2.5 text-xs font-sans text-red-900 space-y-0.5">
                    <span className="font-bold block">⚠️ Statutory Precedent Violation:</span>
                    <p className="text-[11px] text-red-800">{clause.statutoryWarning}</p>
                  </div>
                )}

                {/* Remediation Action buttons */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 font-sans">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[11px] h-7 px-2 text-slate-700 hover:bg-slate-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Reverting ${clause.sectionNumber} to Standard Statutory Baseline Precedent.`);
                    }}
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Revert to Precedent
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
