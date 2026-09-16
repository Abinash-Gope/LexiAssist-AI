import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Upload, GitCompare, BookOpen } from 'lucide-react';
import { useDocumentAnalysis } from '@/hooks/useDocumentAnalysis';
import { useSampleContract } from '@/hooks/useSampleContract';
import { useAppSelector } from '@/state/store';
import { DocumentViewer } from '@/components/features/document/DocumentViewer';
import { RiskGaugeMeter } from '@/components/features/analysis/RiskGaugeMeter';
import { ClauseDeconstructionCard } from '@/components/features/analysis/ClauseDeconstructionCard';
import { ChatDrawer } from '@/components/features/chat/ChatDrawer';
import { ContractUploadModal } from '@/components/features/document/ContractUploadModal';
import { Button } from '@/components/ui/Button';

export const DashboardPage: React.FC = () => {
  const {
    document,
    isLoading,
    selectedClause,
    selectedClauseId,
    filteredClauses,
    searchFilter,
    activeRiskFilter,
    documentZoom,
    activePreset,
    selectClause,
    setSearch,
    setRiskFilter,
    adjustZoom,
    switchPreset,
  } = useDocumentAnalysis();

  const { uploadFile, loadPreset } = useSampleContract();
  const { customContractText, customContractTitle } = useAppSelector((state) => state.contractUi);

  /** Citation pulse id lifted from ChatDrawer to pass into DocumentViewer */
  const [citationPulseId, setCitationPulseId] = useState<string | null>(null);
  /** Controls visibility of the Contract Upload Modal */
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

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
              Interactive plain-English deconstruction, risk scoring &amp; grounded citations.
            </p>
          </div>
        </div>

        {/* Contract Preset Switcher */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => switchPreset('LEASE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activePreset === 'LEASE'
                ? 'bg-white text-primary shadow-xs border border-border-light'
                : 'text-slate-600 hover:bg-white/80'
            }`}
          >
            🏠 Residential Lease
          </button>
          <button
            onClick={() => switchPreset('MSA')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              activePreset === 'MSA'
                ? 'bg-white text-primary shadow-xs border border-border-light'
                : 'text-slate-600 hover:bg-white/80'
            }`}
          >
            📄 Freelancer MSA
          </button>
          {customContractText && (
            <button
              onClick={() => switchPreset('CUSTOM')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                activePreset === 'CUSTOM'
                  ? 'bg-purple-900 text-white shadow-xs'
                  : 'text-purple-700 bg-purple-50 hover:bg-purple-100/80 border border-purple-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-purple-400 inline-block animate-pulse" />
              <span>✨ {customContractTitle || 'Uploaded Agreement'}</span>
            </button>
          )}
        </div>

        {/* Global Action Triggers */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsUploadModalOpen(true)}
            className="text-xs"
          >
            <Upload className="w-3.5 h-3.5 mr-1 text-slate-500" />
            <span>Upload Custom Contract</span>
          </Button>

          <Link to="/compare">
            <Button size="sm" variant="secondary" className="text-xs relative">
              <GitCompare className="w-3.5 h-3.5 mr-1 text-slate-600" />
              <span>Compare Versions</span>
              {customContractText && (
                <span className="ml-1.5 text-[10px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded-full border border-purple-200">
                  Ready
                </span>
              )}
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
            citationPulseId={citationPulseId}
            filteredClauses={filteredClauses}
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
          <ChatDrawer document={document} onCitationPulse={setCitationPulseId} />
        </div>
      </div>

      {/* Contract Upload Modal */}
      <ContractUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadFile={uploadFile}
        onLoadPreset={loadPreset}
      />
    </div>
  );
};
