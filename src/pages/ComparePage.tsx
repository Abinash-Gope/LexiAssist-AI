import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  GitCompare,
  Mail,
  Download,
  Upload,
  FolderOpen,
  FileText,
  Sparkles,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { useContractDiff } from '@/hooks/useContractDiff';
import { useAppSelector } from '@/state/store';
import { MetricDeltaStrip } from '@/components/features/diff/MetricDeltaStrip';
import { DualColumnRedline } from '@/components/features/diff/DualColumnRedline';
import { Button } from '@/components/ui/Button';

const VERSION_PRESETS = [
  {
    id: 'lease',
    label: '🏠 Residential Lease',
    v1: 'Standard Model Lease (v1.0)',
    v2: 'Proposed Landlord Draft (v2.1)',
  },
  {
    id: 'msa',
    label: '📄 Freelancer MSA',
    v1: 'Original MSA (v1.0)',
    v2: 'Client Revised MSA (v2.0)',
  },
];

const STANDARD_MARKET_BASELINE_TEXT = `Section 2.1: Term and Bilateral Notice Period
This Agreement shall commence on the Effective Date and continue for an initial period of twelve (12) months. Either party may terminate this Agreement without cause upon providing thirty (30) days prior written notice.

Section 3.1: Professional Service Fees & Net-30 Terms
Client shall pay undisputed invoice balances within thirty (30) calendar days of receipt. No retainage or administrative deduction shall be withheld without mutual written agreement and prior written justification.

Section 6.2: Mutual Confidentiality & Data Protection
Each party agrees to safeguard the confidential information of the other using the same standard of care it applies to its own proprietary data, but in no event less than reasonable standard commercial care.

Section 8.2: Mutual Intellectual Property Safeguards
Client owns custom deliverables upon receipt of full payment. Consultant retains perpetual ownership of pre-existing background tools, general software frameworks, and standard utility scripts developed prior to this Agreement.

Section 10.1: Mutual Limitation of Liability
Each party's aggregate cumulative liability under this Agreement shall be limited to the total fees received during the preceding twelve (12) months. Neither party shall be liable for indirect, incidental, or consequential damages.

Section 12.3: Restrictive Covenants and Fair Competition
Neither party shall actively solicit the other party's direct employees during the active term of this agreement. No geographic or trade restraint of trade shall restrict post-termination independent contracting.

Section 14.1: Governing Law and Dispute Resolution
This Agreement shall be governed by the laws of the mutually agreed jurisdiction. Any dispute that cannot be resolved amicably shall first proceed to mediation before binding arbitration.`;

const SAMPLE_CUSTOM_DRAFT_1 = `Section 3.1: Professional Service Fees & Net-30 Terms
Client shall pay undisputed invoice balances within thirty (30) calendar days of receipt. No retainage shall be withheld without prior written justification.

Section 8.2: Mutual Intellectual Property Safeguards
Client owns deliverables upon receipt of full payment. Consultant retains perpetual ownership of pre-existing software, frameworks, and developer toolkits used in creating deliverables.

Section 10.1: Mutual Limitation of Liability
Each party's maximum cumulative liability under this agreement shall not exceed total fees received by Consultant during the preceding six (6) months.`;

const SAMPLE_CUSTOM_DRAFT_2 = `Section 3.1: Professional Service Fees & Net-90 Review Terms
Invoices shall undergo a sixty (60) day verification period. Approved sums shall be disbursed on Net-90 terms. Client reserves the unilateral right to withhold 25% administrative retainage.

Section 8.2: Universal IP Expropriation & Know-How Assignment
Consultant assigns to Client all intellectual property, including prior inventions, personal utility scripts, background algorithms, and general engineering know-how, globally in perpetuity.

Section 10.1: Uncapped Consultant Indemnity & Lost Profits
Consultant shall unconditionally defend and indemnify Client against all third-party claims, commercial losses, consequential damages, and enterprise lost revenues without any financial ceiling.`;

export const ComparePage: React.FC = () => {
  const { customContractText, customContractTitle, activePreset } = useAppSelector(
    (state) => state.contractUi
  );

  const [selectedPreset, setSelectedPreset] = useState<'lease' | 'msa' | 'uploaded' | 'custom'>(
    customContractText && activePreset === 'CUSTOM' ? 'uploaded' : 'lease'
  );
  const [customV1Name, setCustomV1Name] = useState('Standard Fair Market Baseline (v1.0)');
  const [customV2Name, setCustomV2Name] = useState(
    customContractTitle ? `${customContractTitle} (v2.0 Draft)` : 'Custom Revised Draft (v2.0)'
  );
  const [customV1Text, setCustomV1Text] = useState(STANDARD_MARKET_BASELINE_TEXT);
  const [customV2Text, setCustomV2Text] = useState(customContractText || '');
  const [showUploadZone, setShowUploadZone] = useState(false);
  const [customModeTab, setCustomModeTab] = useState<'files' | 'text'>('files');
  const [isComparingCustom, setIsComparingCustom] = useState(false);

  // Sync custom contract text from Redux if it exists
  useEffect(() => {
    if (customContractText) {
      setCustomV2Text((prev) => (prev ? prev : customContractText));
      setCustomV2Name((prev) => (prev ? prev : `${customContractTitle || 'Uploaded Agreement'} (v2.0 Draft)`));
      if (activePreset === 'CUSTOM') {
        setSelectedPreset('uploaded');
      }
    }
  }, [customContractText, customContractTitle, activePreset]);

  const v1InputRef = useRef<HTMLInputElement>(null);
  const v2InputRef = useRef<HTMLInputElement>(null);

  const isUploadedMode = selectedPreset === 'uploaded';
  const isCustomMode = selectedPreset === 'custom';

  const computedV1Text = isUploadedMode
    ? undefined
    : isCustomMode
    ? customV1Text
    : undefined;

  const computedV2Text = isUploadedMode
    ? customContractText
    : isCustomMode
    ? customV2Text
    : undefined;

  const computedV1Title = isUploadedMode
    ? 'AI Fair-Market Standard (Balanced Precedent)'
    : customV1Name || 'Custom Version 1 (Baseline)';

  const computedV2Title = isUploadedMode
    ? (customContractTitle || 'Uploaded Legal Agreement') + ' (Uploaded Draft)'
    : customV2Name || 'Custom Version 2 (Revised)';

  const {
    diffData,
    isLoading,
    activeFilter,
    isSyncScrollLocked,
    selectedDiffClauseId,
    allClauses,
    filteredClauses,
    setFilter,
    toggleSync,
    selectDiffClause,
  } = useContractDiff(
    selectedPreset,
    computedV1Text,
    computedV2Text,
    computedV1Title,
    computedV2Title
  );

  const currentPreset =
    selectedPreset === 'uploaded'
      ? {
          id: 'uploaded',
          label: `✨ ${customContractTitle || 'Uploaded Agreement'}`,
          v1: 'AI Fair-Market Standard (Balanced Precedent)',
          v2: `${customContractTitle || 'Uploaded Agreement'} (Uploaded Draft)`,
        }
      : VERSION_PRESETS.find((p) => p.id === selectedPreset);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, version: 1 | 2) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (version === 1) {
      setCustomV1Name(file.name);
    } else {
      setCustomV2Name(file.name);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (version === 1) {
        setCustomV1Text(content || file.name);
      } else {
        setCustomV2Text(content || file.name);
      }
    };
    reader.readAsText(file);
  };

  const handleLoadSampleTest = () => {
    setCustomV1Name('Vendor Standard MSA (v1.0)');
    setCustomV2Name('Client Enterprise Counter (v2.0)');
    setCustomV1Text(SAMPLE_CUSTOM_DRAFT_1);
    setCustomV2Text(SAMPLE_CUSTOM_DRAFT_2);
    setCustomModeTab('text');
  };

  const handleRunCustomDiff = () => {
    if (!customV1Text.trim() || !customV2Text.trim()) {
      alert('Please provide text or files for both Version 1 and Version 2 before comparing.');
      return;
    }
    setIsComparingCustom(true);
    setTimeout(() => {
      setSelectedPreset('custom');
      setIsComparingCustom(false);
    }, 400);
  };

  const handleDraftEmail = () => {
    const title = diffData?.alteredDocumentTitle || currentPreset?.v2 || 'Counter-Proposal';
    const clausesToMention = (diffData?.clauses || [])
      .filter((c) => c.severity === 'HIGH' || c.severity === 'MEDIUM')
      .slice(0, 3)
      .map((c, i) => `${i + 1}. ${c.sectionNumber} (${c.title}): ${c.semanticAnalysis} Suggested remedy: Revert or adopt equitable mutual precedent.`)
      .join('\n\n');

    const emailContent = `Subject: Proposed Revisions to ${title}

Dear Counterparty,

Upon careful review of your draft using LexiAssist AI, we propose the following amendments to align terms with fair market precedents:

${clausesToMention || '1. Review and adjust liability allocations to mutual standards.'}

We believe these changes bring the agreement into standard market practice and protect both parties equitably.

Please confirm acceptance of these amendments at your earliest convenience.

Best regards,
LexiAssist AI Document Review Team`;

    const blob = new Blob([emailContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Counter_Offer_Letter_Draft.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportRedline = () => {
    if (!diffData) return;
    const clauseBreakdown = diffData.clauses
      .map(
        (c) => `### ${c.sectionNumber}: ${c.title} [${c.severity} RISK]
- **Baseline:** ${c.baselineText}
- **Counter-Proposal:** ${c.alteredText}
- **AI Analysis:** ${c.semanticAnalysis}
${c.statutoryWarning ? `- **Statutory Warning:** ${c.statutoryWarning}\n` : ''}`
      )
      .join('\n\n');

    const report = `# Contract Redline Comparison Report
Prepared by LexiAssist AI

## Comparison Summary
- **Baseline Version:** ${diffData.baselineDocumentTitle} (${diffData.baselineVersion})
- **Counter-Proposal:** ${diffData.alteredDocumentTitle} (${diffData.alteredVersion})

## Risk Metrics
- **Risk Score Delta:** ${diffData.riskScoreDelta > 0 ? '+' : ''}${diffData.riskScoreDelta}%
- **Material Alterations:** ${diffData.materialAlterationsCount}
- **New Liabilities Added:** ${diffData.newLiabilitiesCount}
- **Omitted Protections:** ${diffData.omittedProtectionsCount}

## Clause-by-Clause Redline Analysis
${clauseBreakdown}

---
*Generated by LexiAssist AI. Not certified legal counsel.*`;

    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'LexiAssist_Redline_Report.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAiCounterProposal = () => {
    if (!diffData || !diffData.clauses.length) return;

    const fullCounterDoc = `${(diffData.alteredDocumentTitle || 'AGREEMENT').toUpperCase()} — AI BALANCED COUNTER-PROPOSAL
Prepared by LexiAssist AI • Legally Balanced Fair-Market Precedent
Generated: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

================================================================================
EXECUTIVE SUMMARY:
This document contains the AI-synthesized legally balanced counterpart terms 
corresponding to your original draft. All high-risk shifts (uncapped liabilities,
perpetual non-competes, payment delays, auto-renewal traps) have been amended 
to conform with standard commercial precedent and statutory fairness protections.
================================================================================

${diffData.clauses
  .map(
    (c) => `${c.sectionNumber}: ${c.title}
${c.baselineText}`
  )
  .join('\n\n')}

================================================================================
*Generated by LexiAssist AI Platform. Review with legal counsel prior to formal execution.*`;

    const blob = new Blob([fullCounterDoc], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(customContractTitle || 'Legal_Agreement').replace(/[^a-zA-Z0-9_-]/g, '_')}_AI_Balanced_Counter.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
              <span>{diffData?.baselineDocumentTitle || currentPreset?.v1 || 'Baseline'}</span>
              <span>vs.</span>
              <span className="text-risk-high font-bold">
                {diffData?.alteredDocumentTitle || currentPreset?.v2 || 'Counter-Proposal'}
              </span>
            </div>
            <h1 className="text-xl font-bold font-headline text-primary">
              Side-by-Side Contract Comparison & Semantic Diff
            </h1>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button size="sm" variant="brand" onClick={handleDownloadAiCounterProposal} className="text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 mr-1 text-amber-300" />
            <span>Download AI Balanced Agreement</span>
          </Button>
          <Button size="sm" variant="outline" onClick={handleDraftEmail} className="text-xs">
            <Mail className="w-3.5 h-3.5 mr-1 text-slate-500" />
            <span>Draft Counter Letter</span>
          </Button>
          <Button size="sm" variant="outline" onClick={handleExportRedline} className="text-xs font-semibold">
            <Download className="w-3.5 h-3.5 mr-1 text-slate-500" />
            <span>Export Report</span>
          </Button>
        </div>
      </div>

      {/* Uploaded Contract Session Banner */}
      {customContractText && (
        <div className="bg-gradient-to-r from-purple-50 via-indigo-50/50 to-blue-50 border border-purple-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <p className="text-xs font-bold text-purple-950 flex items-center gap-2">
                <span>Active Uploaded Contract Saved:</span>
                <span className="font-mono bg-white px-2 py-0.5 rounded border border-purple-200 text-purple-900 font-semibold">
                  {customContractTitle || 'Uploaded Agreement'}
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-full border border-emerald-200">
                  Ready to Compare
                </span>
              </p>
              <p className="text-[11px] text-purple-800 mt-0.5">
                Your contract is preserved across all pages. Compare it against standard fair-market baseline terms or load custom counterparties.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={selectedPreset === 'uploaded' ? 'brand' : 'outline'}
              onClick={() => setSelectedPreset('uploaded')}
              className="text-xs font-semibold"
            >
              <GitCompare className="w-3.5 h-3.5 mr-1" />
              <span>{selectedPreset === 'uploaded' ? 'Currently Comparing' : 'Compare with Market Baseline'}</span>
            </Button>
          </div>
        </div>
      )}

      {/* Version Switcher Panel */}
      <div className="bg-surface-light border border-border-light rounded-xl p-4 space-y-4 shadow-level-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Comparison Pair
            </p>
            <p className="text-[11px] text-slate-500">
              Select standard benchmark pairs or test your own contract versions side by side.
            </p>
          </div>

          <button
            onClick={() => setShowUploadZone(!showUploadZone)}
            className="text-xs text-brand hover:underline flex items-center gap-1.5 font-semibold bg-brand/10 px-3 py-1.5 rounded-lg transition-colors hover:bg-brand/15"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{showUploadZone ? 'Close Custom Comparison' : 'Upload or Test Custom Versions'}</span>
          </button>
        </div>

        {/* Preset Version Buttons */}
        <div className="flex flex-wrap gap-2.5 pt-1">
          {VERSION_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPreset(preset.id as 'lease' | 'msa');
              }}
              className={`px-4 py-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                selectedPreset === preset.id
                  ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/20'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span>{preset.label}</span>
                {selectedPreset === preset.id && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <span className="block text-[10px] font-normal opacity-75 mt-0.5">
                {preset.v1} vs {preset.v2}
              </span>
            </button>
          ))}

          {/* Uploaded Contract Preset Option */}
          {customContractText && (
            <button
              onClick={() => setSelectedPreset('uploaded')}
              className={`px-4 py-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                selectedPreset === 'uploaded'
                  ? 'bg-purple-950 text-white border-purple-950 shadow-sm ring-2 ring-purple-500/30'
                  : 'bg-purple-50 text-purple-900 border-purple-200 hover:border-purple-300 hover:bg-purple-100/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>✨ Uploaded: {customContractTitle || 'Uploaded Agreement'}</span>
                </span>
                {selectedPreset === 'uploaded' && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                )}
              </div>
              <span className="block text-[10px] font-normal opacity-80 mt-0.5">
                AI Fair-Market Standard (v1.0) vs {customContractTitle || 'Uploaded Draft'}
              </span>
            </button>
          )}

          {selectedPreset === 'custom' && (
            <button
              onClick={() => setSelectedPreset('custom')}
              className="px-4 py-2.5 rounded-lg border text-xs font-semibold text-left bg-purple-900 text-white border-purple-900 shadow-sm ring-2 ring-purple-500/30"
            >
              <div className="flex items-center justify-between gap-2">
                <span>✨ Custom Document Comparison</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <span className="block text-[10px] font-normal opacity-85 mt-0.5">
                {customV1Name || 'Custom Version 1'} vs {customV2Name || 'Custom Version 2'}
              </span>
            </button>
          )}
        </div>

        {/* Custom Upload & Test Zone */}
        {showUploadZone && (
          <div className="p-4 bg-slate-50 rounded-xl border border-border-light space-y-4 mt-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCustomModeTab('files')}
                  className={`text-xs px-3 py-1 rounded-md font-semibold transition-all ${
                    customModeTab === 'files'
                      ? 'bg-white shadow-sm text-primary border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FolderOpen className="w-3 h-3 inline mr-1" />
                  Upload 2 Files
                </button>
                <button
                  onClick={() => setCustomModeTab('text')}
                  className={`text-xs px-3 py-1 rounded-md font-semibold transition-all ${
                    customModeTab === 'text'
                      ? 'bg-white shadow-sm text-primary border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <FileText className="w-3 h-3 inline mr-1" />
                  Paste / Test Text
                </button>
              </div>

              <button
                onClick={handleLoadSampleTest}
                className="text-xs font-semibold text-brand flex items-center gap-1 hover:underline"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Sample Test Texts (1-Click)</span>
              </button>
            </div>

            {customModeTab === 'files' ? (
              /* Dual File Upload */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Version 1 Upload */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Version 1 — Original Benchmark Draft
                  </label>
                  <input
                    ref={v1InputRef}
                    type="file"
                    accept=".txt,.md,.pdf,.json"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 1)}
                  />
                  <button
                    onClick={() => v1InputRef.current?.click()}
                    className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg border-2 border-dashed transition-all text-left ${
                      customV1Name
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                        : 'border-slate-300 hover:border-brand text-slate-600 hover:text-brand bg-white'
                    }`}
                  >
                    <FolderOpen className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-medium truncate">
                      {customV1Name || 'Click to select Version 1 (.txt, .md, .pdf)'}
                    </span>
                  </button>
                  {customV1Text && (
                    <span className="text-[10px] text-emerald-700 block font-medium">
                      ✓ Ready for comparison ({customV1Text.length} characters)
                    </span>
                  )}
                </div>

                {/* Version 2 Upload */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Version 2 — Counter-Proposal / Revision Draft
                  </label>
                  <input
                    ref={v2InputRef}
                    type="file"
                    accept=".txt,.md,.pdf,.json"
                    className="hidden"
                    onChange={(e) => handleFileUpload(e, 2)}
                  />
                  <button
                    onClick={() => v2InputRef.current?.click()}
                    className={`w-full flex items-center gap-2 px-3 py-3 rounded-lg border-2 border-dashed transition-all text-left ${
                      customV2Name
                        ? 'border-emerald-400 bg-emerald-50 text-emerald-800'
                        : 'border-slate-300 hover:border-risk-high text-slate-600 hover:text-risk-high bg-white'
                    }`}
                  >
                    <FolderOpen className="w-4 h-4 flex-shrink-0" />
                    <span className="text-xs font-medium truncate">
                      {customV2Name || 'Click to select Version 2 (.txt, .md, .pdf)'}
                    </span>
                  </button>
                  {customV2Text && (
                    <span className="text-[10px] text-emerald-700 block font-medium">
                      ✓ Ready for comparison ({customV2Text.length} characters)
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* Dual Text Paste */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Version 1 Text (Original Baseline Draft)
                  </label>
                  <textarea
                    value={customV1Text}
                    onChange={(e) => {
                      setCustomV1Text(e.target.value);
                      if (!customV1Name) setCustomV1Name('Custom Original Text');
                    }}
                    placeholder="Paste original contract draft clauses here..."
                    className="w-full h-32 p-2.5 text-xs font-legal border border-slate-300 rounded-lg focus:ring-1 focus:ring-brand focus:border-brand bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Version 2 Text (Revised Counter-Proposal)
                  </label>
                  <textarea
                    value={customV2Text}
                    onChange={(e) => {
                      setCustomV2Text(e.target.value);
                      if (!customV2Name) setCustomV2Name('Custom Revised Text');
                    }}
                    placeholder="Paste counter-proposal or revised draft clauses here..."
                    className="w-full h-32 p-2.5 text-xs font-legal border border-slate-300 rounded-lg focus:ring-1 focus:ring-risk-high focus:border-risk-high bg-white"
                  />
                </div>
              </div>
            )}

            {/* Run Semantic Diff Button */}
            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleRunCustomDiff}
                disabled={isComparingCustom || !customV1Text.trim() || !customV2Text.trim()}
                className="text-xs font-semibold w-full sm:w-auto px-6"
              >
                {isComparingCustom ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                    <span>Analyzing Semantic Diff...</span>
                  </>
                ) : (
                  <>
                    <GitCompare className="w-3.5 h-3.5 mr-1.5" />
                    <span>Run Semantic Diff on Custom Versions</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
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
          clauses={allClauses}
        />
      )}

      {/* Dual Column Synchronized Redline Viewer */}
      <DualColumnRedline
        clauses={filteredClauses}
        selectedDiffClauseId={selectedDiffClauseId}
        onSelectDiffClause={selectDiffClause}
        isSyncScrollLocked={isSyncScrollLocked}
        baselineTitle={diffData?.baselineDocumentTitle}
        baselineVersion={diffData?.baselineVersion}
        counterTitle={diffData?.alteredDocumentTitle}
        counterVersion={diffData?.alteredVersion}
      />
    </div>
  );
};
