import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, GitCompare, BookOpen, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import { useDocumentAnalysis } from '@/hooks/useDocumentAnalysis';
import { useSampleContract } from '@/hooks/useSampleContract';
import { DocumentViewer } from '@/components/features/document/DocumentViewer';
import { RiskGaugeMeter } from '@/components/features/analysis/RiskGaugeMeter';
import { ClauseDeconstructionCard } from '@/components/features/analysis/ClauseDeconstructionCard';
import { ChatDrawer } from '@/components/features/chat/ChatDrawer';
import { Button } from '@/components/ui/Button';

export const DashboardPage: React.FC = () => {
  const {
    document,
    isLoading,
    selectedClause,
    selectedClauseId,
    searchFilter,
    activeRiskFilter,
    documentZoom,
    selectClause,
    setSearch,
    setRiskFilter,
    adjustZoom,
  } = useDocumentAnalysis();

  const { uploadFile } = useSampleContract();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  return (
    <div className="max-w-[1700px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Action & Preset Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-light p-4 rounded-xl border border-border-light shadow-level-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center font-bold font-headline">
            AI
          </div>
          <div>
            <h1 className="text-base font-bold font-headline text-primary">
              {document?.title || 'Legal Document Workstation'}
            </h1>
            <p className="text-xs text-slate-500">
              Interactive plain-English deconstruction, risk scoring & grounded citations.
            </p>
          </div>
        </div>

        {/* Global Action Triggers */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".txt,.md,.pdf"
            className="hidden"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs"
          >
            <Upload className="w-3.5 h-3.5 mr-1 text-slate-500" />
            <span>Upload Custom Contract</span>
          </Button>

          <Link to="/compare">
            <Button size="sm" variant="secondary" className="text-xs">
              <GitCompare className="w-3.5 h-3.5 mr-1 text-slate-600" />
              <span>Compare Versions</span>
            </Button>
          </Link>

          <Link to="/prep-kit">
            <Button size="sm" variant="brand" className="text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              <span>Export Lawyer Prep Kit</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Split-Screen Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[800px]">
        {/* Left Panel: Document Viewer (58% / 7 cols) */}
        <div className="lg:col-span-7 h-full">
          <DocumentViewer
            document={document}
            selectedClauseId={selectedClauseId}
            onSelectClause={selectClause}
            searchFilter={searchFilter}
            onSearchChange={setSearch}
            activeRiskFilter={activeRiskFilter}
            onRiskFilterChange={setRiskFilter}
            zoom={documentZoom}
            onZoomChange={adjustZoom}
          />
        </div>

        {/* Right Panel: AI Legal Analysis & Chat (42% / 5 cols) */}
        <div className="lg:col-span-5 h-full overflow-y-auto space-y-4 pr-1">
          {/* Risk Gauge Meter */}
          {document && (
            <RiskGaugeMeter
              score={document.overallScore}
              highRiskCount={document.riskSummary.highRiskCount}
              mediumRiskCount={document.riskSummary.mediumRiskCount}
              lowRiskCount={document.riskSummary.lowRiskCount}
            />
          )}

          {/* Active Clause Deconstruction Card */}
          <ClauseDeconstructionCard clause={selectedClause} />

          {/* Embedded Document Chat Assistant */}
          <ChatDrawer document={document} />
        </div>
      </div>
    </div>
  );
};
