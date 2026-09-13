import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, GitCompare, Mail, Download, ShieldCheck } from 'lucide-react';
import { useContractDiff } from '@/hooks/useContractDiff';
import { MetricDeltaStrip } from '@/components/features/diff/MetricDeltaStrip';
import { DualColumnRedline } from '@/components/features/diff/DualColumnRedline';
import { Button } from '@/components/ui/Button';

export const ComparePage: React.FC = () => {
  const {
    diffData,
    isLoading,
    activeFilter,
    isSyncScrollLocked,
    selectedDiffClauseId,
    filteredClauses,
    setFilter,
    toggleSync,
    selectDiffClause,
  } = useContractDiff();

  const handleDraftEmail = () => {
    alert(
      'Draft Counter-Offer Email Generated:\n\nSubject: Proposed Revisions to Residential Lease (Apartment 4B)\n\nDear Lessor Management,\n\nUpon review of the draft lease, we wish to propose three standard amendments to align with NY statutory practice:\n1. Section 6.2: Restrict deposit return to 14 days per NY GOL § 7-108 and eliminate non-refundable cleaning surcharges.\n2. Section 12.2: Convert renewal into a month-to-month tenancy with 30 days notice.\n3. Section 14.1: Restore mutual indemnification for gross negligence.\n\nPlease let us know if you can confirm these amendments.\n\nBest regards,\nProspective Lessee'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button size="sm" variant="outline" className="text-xs">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Back to Workspace</span>
            </Button>
          </Link>

          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span>Standard Model Lease (v1.0)</span>
              <span>vs.</span>
              <span className="text-risk-high font-bold">Proposed Landlord Draft (v2.1)</span>
            </div>
            <h1 className="text-xl font-bold font-headline text-primary">
              Side-by-Side Contract Comparison & Semantic Diff
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleDraftEmail}
            className="text-xs"
          >
            <Mail className="w-3.5 h-3.5 mr-1 text-slate-500" />
            <span>Draft Counter-Offer Email</span>
          </Button>

          <Button
            size="sm"
            variant="brand"
            onClick={() => alert('Redline Comparison Report exported.')}
            className="text-xs font-semibold"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Export Redline Report</span>
          </Button>
        </div>
      </div>

      {/* Metric Delta Strip */}
      {diffData && (
        <MetricDeltaStrip
          materialAlterationsCount={diffData.materialAlterationsCount}
          newLiabilitiesCount={diffData.newLiabilitiesCount}
          omittedProtectionsCount={diffData.omittedProtectionsCount}
          riskScoreDelta={diffData.riskScoreDelta}
          activeFilter={activeFilter}
          onFilterChange={setFilter}
          isSyncScrollLocked={isSyncScrollLocked}
          onToggleSyncScroll={toggleSync}
        />
      )}

      {/* Dual Column Synchronized Redline Viewer */}
      <DualColumnRedline
        clauses={filteredClauses}
        selectedDiffClauseId={selectedDiffClauseId}
        onSelectDiffClause={selectDiffClause}
        isSyncScrollLocked={isSyncScrollLocked}
      />
    </div>
  );
};
