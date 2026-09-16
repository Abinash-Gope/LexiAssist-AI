import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, CheckCircle2, AlertCircle, AlertTriangle, Scale, ShieldCheck, PenLine, Plus, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useLawyerPrepKit } from '@/hooks/useLawyerPrepKit';
import { ContractDocument } from '@/core/types/contract.types';
import { Button } from '../../ui/Button';
import { Card } from '../../ui/Card';

interface PrepKitBriefProps {
  document: ContractDocument | undefined;
}

export const PrepKitBrief: React.FC<PrepKitBriefProps> = ({ document }) => {
  const [customNotes, setCustomNotes] = useState<string[]>([
    'What is the estimated total cost exposure if I breach this agreement early?',
  ]);
  const [newNote, setNewNote] = useState('');
  const [showNotesEditor, setShowNotesEditor] = useState(true);

  const { prepKit, isLoading, error, exportPdf, exportMarkdown } = useLawyerPrepKit(
    document,
    customNotes
  );

  const addNote = () => {
    if (newNote.trim()) {
      setCustomNotes((prev) => [...prev, newNote.trim()]);
      setNewNote('');
    }
  };

  const removeNote = (index: number) => {
    setCustomNotes((prev) => prev.filter((_, i) => i !== index));
  };

  if (!document) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center bg-surface-light rounded-2xl border border-border-light shadow-level-1 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mx-auto">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 font-headline">No Contract Loaded</h3>
          <p className="text-xs text-slate-500 mt-1">
            Please select a contract from the workstation or upload an agreement to generate your lawyer prep kit.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/dashboard">
            <Button size="sm" variant="primary" className="text-xs font-semibold">
              Open Contract Workstation
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isLoading && !prepKit) {
    return (
      <div className="flex items-center justify-center p-16 text-slate-400">
        <FileText className="w-6 h-6 animate-pulse mr-2" />
        <span>Synthesizing attorney consultation brief...</span>
      </div>
    );
  }

  if (!prepKit) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center bg-surface-light rounded-2xl border border-border-light shadow-level-1 space-y-4">
        <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
        <div>
          <h3 className="text-base font-bold text-slate-900 font-headline">Prep Kit Unavailable</h3>
          <p className="text-xs text-slate-500 mt-1">
            Could not generate consultation questions for this document format.
          </p>
        </div>
        <div className="pt-2">
          <Link to="/dashboard">
            <Button size="sm" variant="outline" className="text-xs font-semibold">
              Return to Workspace
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-surface-light border border-border-light rounded-xl shadow-level-1">
        <div>
          <h2 className="text-sm font-bold font-headline text-primary">
            Attorney Consultation Preparation Kit
          </h2>
          <p className="text-xs text-slate-500">
            Export ready summary, flagged liabilities & targeted questions for counsel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => exportMarkdown(customNotes)} className="text-xs h-9">
            <FileText className="w-3.5 h-3.5 mr-1 text-slate-500" />
            <span>Export Markdown</span>
          </Button>

          <Button size="sm" variant="brand" onClick={() => exportPdf(customNotes)} className="text-xs h-9 font-semibold">
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Download PDF Brief</span>
          </Button>
        </div>
      </div>

      {/* Personal Consultation Notes Editor */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setShowNotesEditor(!showNotesEditor)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-amber-100/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <PenLine className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-bold text-amber-900">
              My Personal Consultation Notes
            </span>
            <span className="text-[11px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-semibold">
              {customNotes.length} note{customNotes.length !== 1 ? 's' : ''} — included in PDF
            </span>
          </div>
          {showNotesEditor ? (
            <ChevronUp className="w-4 h-4 text-amber-700" />
          ) : (
            <ChevronDown className="w-4 h-4 text-amber-700" />
          )}
        </button>

        {showNotesEditor && (
          <div className="px-5 pb-5 space-y-3 border-t border-amber-200">
            <p className="text-[11px] text-amber-700 mt-3">
              Add your own questions or concerns — they will be included as a personal notes section in the exported PDF brief.
            </p>

            {/* Existing notes */}
            <div className="space-y-2">
              {customNotes.map((note, index) => (
                <div
                  key={index}
                  className="flex items-start gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2.5 group"
                >
                  <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-800 text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-xs text-slate-800 flex-1 leading-relaxed">{note}</p>
                  <button
                    onClick={() => removeNote(index)}
                    className="text-slate-300 hover:text-red-500 transition-colors flex-shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new note */}
            <div className="flex gap-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addNote()}
                placeholder="Type a question or concern to ask your attorney..."
                className="flex-1 px-3 py-2 text-xs bg-white border border-amber-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={addNote}
                disabled={!newNote.trim()}
                className="text-xs border-amber-300 text-amber-800 hover:bg-amber-100"
              >
                <Plus className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Printable Brief Paper Container */}
      <div className="bg-surface-light p-8 sm:p-12 border border-border-light rounded-xl shadow-level-2 space-y-8">
        {/* Brief Header */}
        <div className="border-b-2 border-slate-900 pb-6">
          <div className="flex items-center justify-between text-xs text-slate-500 uppercase tracking-widest font-mono mb-1">
            <span>Confidential Legal Preparation</span>
            <span>Ref: {document?.id}</span>
          </div>
          <h1 className="text-2xl font-extrabold font-headline text-primary tracking-tight">
            ATTORNEY CONSULTATION BRIEF & RISK MATRIX
          </h1>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">
            Prepared by LexiAssist AI to structure client orientation, pinpoint statutory non-compliance, and maximize the efficiency of billable consultation hours.
          </p>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Agreement</span>
            <span className="font-semibold text-slate-900">{prepKit.documentTitle}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Jurisdiction</span>
            <span className="font-semibold text-slate-900">{prepKit.jurisdiction}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Effective Date</span>
            <span className="font-semibold text-slate-900">{prepKit.effectiveDate}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Safety Score</span>
            <span className="font-bold text-risk-medium text-sm">{prepKit.overallScore} / 100</span>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
            1. Executive Agreement Synthesis
          </h3>
          <p className="text-sm text-slate-800 leading-relaxed font-sans bg-surface-dim p-4 rounded-lg border border-border-light">
            {prepKit.executiveSummary}
          </p>
        </div>

        {/* Section 2: Flagged Risks Table */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
            2. Flagged Risk & Liability Matrix
          </h3>
          <div className="overflow-x-auto border border-border-light rounded-lg">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-border-light">
                  <th className="p-3">Section</th>
                  <th className="p-3">Risk Severity</th>
                  <th className="p-3">Provision Topic</th>
                  <th className="p-3">Identified Exposure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {prepKit.keyRisks.map((risk, i) => (
                  <tr key={i} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-slate-900">{risk.section}</td>
                    <td className="p-3">
                      {risk.level === 'HIGH' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-risk-high bg-risk-high-bg px-2 py-0.5 rounded border border-risk-high-border">
                          <AlertCircle className="w-3 h-3" /> High Risk
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-risk-medium bg-risk-medium-bg px-2 py-0.5 rounded border border-risk-medium-border">
                          <AlertTriangle className="w-3 h-3" /> Caution
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-medium text-slate-800">{risk.summary}</td>
                    <td className="p-3 text-slate-600">{risk.identifiedRisk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Top 5 Attorney Questions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border-light pb-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
              3. Top High-Priority Questions for Counsel (First 30 Minutes)
            </h3>
            <span className="text-[11px] text-brand font-semibold">
              Optimized for Billable Efficiency
            </span>
          </div>

          <div className="space-y-3">
            {prepKit.topConsultationQuestions.map((item) => (
              <div
                key={item.questionNumber}
                className="p-4 rounded-lg bg-surface-dim border border-border-light space-y-1.5"
              >
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    {item.questionNumber}
                  </span>
                  <div className="space-y-1 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {item.question}
                    </h4>
                    <p className="text-xs text-slate-600">
                      <strong>Legal Rationale:</strong> {item.rationale}
                    </p>
                    <p className="text-xs text-emerald-800 font-medium">
                      🎯 <strong>Target Objective:</strong> {item.suggestedObjective}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Personal Notes (if any) */}
        {customNotes.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans border-b border-border-light pb-2">
              4. My Personal Notes & Additional Questions
            </h3>
            <div className="space-y-2">
              {customNotes.map((note, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-amber-50/60 border border-amber-200 rounded-lg">
                  <span className="w-5 h-5 rounded-full bg-amber-400 text-white text-[10px] flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-xs text-amber-950 leading-relaxed">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legal Disclaimer Box */}
        <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
          <div className="font-bold flex items-center gap-1.5 text-amber-900">
            <Scale className="w-4 h-4 text-amber-700" />
            <span>Consultation Preparation Notice</span>
          </div>
          <p className="text-[11px] text-amber-900/90 leading-relaxed">
            This brief has been prepared by LexiAssist AI using document comprehension algorithms. It serves as an executive roadmap to help you discuss key provisions with a qualified, certified attorney. It does not constitute formal legal representation or binding legal counsel.
          </p>
        </div>
      </div>
    </div>
  );
};

