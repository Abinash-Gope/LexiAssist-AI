import React, { useRef, useEffect, useState } from 'react';
import { ZoomIn, ZoomOut, Search, FileText, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { ContractDocument, ContractClause } from '@/core/types/contract.types';

interface DocumentViewerProps {
  document: ContractDocument | undefined;
  filteredClauses?: ContractClause[];
  selectedClauseId: string | null;
  onSelectClause: (clauseId: string) => void;
  searchFilter: string;
  onSearchChange: (query: string) => void;
  activeRiskFilter: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';
  onRiskFilterChange: (filter: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW') => void;
  zoom: number;
  onZoomChange: (delta: number) => void;
  /** When set, this clauseId receives a temporary glow-pulse to indicate a chat citation jump */
  citationPulseId?: string | null;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  document,
  filteredClauses,
  selectedClauseId,
  onSelectClause,
  searchFilter,
  onSearchChange,
  activeRiskFilter,
  onRiskFilterChange,
  zoom,
  onZoomChange,
  citationPulseId,
}) => {
  const clauseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [pulsingId, setPulsingId] = useState<string | null>(null);

  // Scroll to selected clause whenever it changes
  useEffect(() => {
    if (selectedClauseId && clauseRefs.current[selectedClauseId]) {
      clauseRefs.current[selectedClauseId]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [selectedClauseId]);

  // Fire pulse animation when a citation jump is triggered from chat
  useEffect(() => {
    if (citationPulseId) {
      setPulsingId(citationPulseId);
      const timer = setTimeout(() => setPulsingId(null), 2200);
      return () => clearTimeout(timer);
    }
  }, [citationPulseId]);

  if (!document) {
    return (
      <div className="flex items-center justify-center h-full p-12 text-slate-400">
        <FileText className="w-8 h-8 animate-pulse mr-2" />
        <span>Loading document content...</span>
      </div>
    );
  }

  const allCount = document.clauses.length;
  const highCount = document.clauses.filter((c) => c.severity === 'HIGH').length;
  const mediumCount = document.clauses.filter((c) => c.severity === 'MEDIUM').length;
  const lowCount = document.clauses.filter((c) => c.severity === 'LOW').length;

  const displayClauses = filteredClauses ?? document.clauses;

  return (
    <div className="flex flex-col h-full bg-surface-dim border border-border-light rounded-xl overflow-hidden shadow-level-1">
      {/* Document Viewer Toolbar */}
      <div className="flex flex-wrap items-center justify-between p-3 bg-surface-light border-b border-border-light gap-2">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[180px] max-w-xs">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search contract clauses..."
            value={searchFilter}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-surface-dim border border-border-light rounded-md focus:outline-none focus:ring-1 focus:ring-brand"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1">
          {[
            { id: 'ALL' as const, label: `All (${allCount})` },
            { id: 'HIGH' as const, label: `🔴 High (${highCount})` },
            { id: 'MEDIUM' as const, label: `🟡 Caution (${mediumCount})` },
            { id: 'LOW' as const, label: `🟢 Safe (${lowCount})` },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => onRiskFilterChange(id)}
              className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-all ${
                activeRiskFilter === id
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 pl-2 border-l border-border-light">
          <button
            onClick={() => onZoomChange(-0.1)}
            disabled={zoom <= 0.8}
            className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] font-mono text-slate-600 w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => onZoomChange(0.1)}
            disabled={zoom >= 1.4}
            className="p-1 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Contract Paper Viewer Canvas */}
      <div className="flex-1 p-6 overflow-y-auto bg-slate-100/60">
        <div
          style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          className="max-w-3xl mx-auto bg-surface-light p-8 sm:p-12 rounded-lg shadow-level-2 border border-slate-200/80 transition-transform duration-100"
        >
          {/* Header Title on Paper */}
          <div className="border-b-2 border-slate-900 pb-6 mb-8 text-center">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Verified Legal Agreement
            </span>
            <h1 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 mt-1 uppercase tracking-tight">
              {document.title}
            </h1>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 font-sans">
              <span><strong>Jurisdiction:</strong> {document.jurisdiction}</span>
              <span>•</span>
              <span><strong>Date:</strong> {document.effectiveDate}</span>
            </div>
          </div>

          {/* Clause Stream */}
          <div className="space-y-6 font-legal leading-relaxed text-slate-800 text-[15px]">
            {displayClauses.length === 0 ? (
              <div className="text-center py-12 px-4 border border-dashed border-slate-300 rounded-lg bg-slate-50/70">
                <AlertCircle className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                <p className="text-sm font-bold text-slate-700">No matching clauses found</p>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  No clauses match the current filter or search criteria. Try switching your risk badge filter or clearing your search term.
                </p>
                <button
                  onClick={() => {
                    onSearchChange('');
                    onRiskFilterChange('ALL');
                  }}
                  className="mt-3 px-3 py-1.5 text-xs font-semibold text-brand bg-brand/10 hover:bg-brand/20 rounded-md transition-colors"
                >
                  Reset Filters &amp; Show All Clauses
                </button>
              </div>
            ) : (
              displayClauses.map((clause: ContractClause) => {
                const isSelected = clause.id === selectedClauseId;

                // Border and background highlighting based on risk level
                let riskBorder = 'border-transparent';
                let riskBg = '';
                let badge = null;

                if (clause.severity === 'HIGH') {
                  riskBorder = 'border-l-4 border-l-risk-high';
                  riskBg = isSelected ? 'bg-red-50/80' : 'hover:bg-red-50/40';
                  badge = (
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-risk-high bg-risk-high-bg px-2 py-0.5 rounded border border-risk-high-border">
                      <AlertCircle className="w-3 h-3" /> High Risk Detected
                    </span>
                  );
                } else if (clause.severity === 'MEDIUM') {
                  riskBorder = 'border-l-4 border-l-risk-medium';
                  riskBg = isSelected ? 'bg-amber-50/80' : 'hover:bg-amber-50/40';
                  badge = (
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-bold uppercase tracking-wider text-risk-medium bg-risk-medium-bg px-2 py-0.5 rounded border border-risk-medium-border">
                      <AlertTriangle className="w-3 h-3" /> Caution Flagged
                    </span>
                  );
                } else {
                  riskBorder = isSelected ? 'border-l-4 border-l-brand' : 'border-l-4 border-l-transparent';
                  riskBg = isSelected ? 'bg-blue-50/40' : 'hover:bg-slate-50';
                  badge = (
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Standard Term
                    </span>
                  );
                }

                const isPulsing = clause.id === pulsingId;

                return (
                  <div
                    key={clause.id}
                    ref={(el) => (clauseRefs.current[clause.id] = el)}
                    onClick={() => onSelectClause(clause.id)}
                    className={`p-4 rounded-r-lg transition-all cursor-pointer ${riskBorder} ${riskBg} ${
                      isSelected ? 'ring-1 ring-slate-400/50 shadow-sm' : ''
                    } ${isPulsing ? 'citation-pulse-glow' : ''}`}
                    style={
                      isPulsing
                        ? {
                            animation: 'citationPulse 2.2s ease-out',
                          }
                        : undefined
                    }
                  >
                    {isPulsing && (
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand bg-brand/10 border border-brand/30 px-2 py-0.5 rounded mb-2 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping inline-block" />
                        Cited in Copilot Answer
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2 mb-2 font-sans">
                      <span className="text-xs font-bold text-primary font-mono tracking-wide">
                        {clause.sectionNumber}: {clause.title}
                      </span>
                      {badge}
                    </div>
                    <p className="text-slate-800 selection:bg-amber-200">
                      {clause.originalText}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Paper Footer */}
          <div className="mt-12 pt-6 border-t border-slate-200 text-center text-xs font-mono text-slate-400">
            [End of Document Extract • Generated for Legal Orientation]
          </div>
        </div>
      </div>
    </div>
  );
};
