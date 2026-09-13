/**
 * Feature: Drag-and-Drop Contract Upload Modal
 * Supports PDF/TXT/MD file upload, raw text paste, and an animated multi-stage AI scanning pipeline.
 */

import React, { useState, useRef, useCallback } from 'react';
import {
  X,
  Upload,
  FileText,
  ClipboardPaste,
  CheckCircle2,
  Sparkles,
  Loader2,
  FolderOpen,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../../ui/Button';

interface ContractUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadFile: (file: File) => void;
  onLoadPreset: (preset: 'LEASE' | 'MSA') => void;
}

type ScanStage = 'idle' | 'extracting' | 'parsing' | 'scoring' | 'done';

const SCAN_STAGES: Record<ScanStage, { label: string; detail: string; progress: number }> = {
  idle: { label: '', detail: '', progress: 0 },
  extracting: {
    label: 'Extracting Text & Sections',
    detail: 'Parsing document structure and clause boundaries...',
    progress: 25,
  },
  parsing: {
    label: 'Analyzing Legal Language',
    detail: 'Identifying obligations, liabilities, and defined terms...',
    progress: 55,
  },
  scoring: {
    label: 'Calculating Risk Vectors',
    detail: 'Scoring 0-100 safety gauge and flagging high-risk provisions...',
    progress: 80,
  },
  done: {
    label: 'Analysis Complete',
    detail: 'Document successfully loaded into the workspace.',
    progress: 100,
  },
};

export const ContractUploadModal: React.FC<ContractUploadModalProps> = ({
  isOpen,
  onClose,
  onUploadFile,
  onLoadPreset,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [isDragActive, setIsDragActive] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [scanStage, setScanStage] = useState<ScanStage>('idle');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runScanAnimation = async (onComplete: () => void) => {
    const stages: ScanStage[] = ['extracting', 'parsing', 'scoring', 'done'];
    for (const stage of stages) {
      setScanStage(stage);
      await new Promise((r) => setTimeout(r, stage === 'done' ? 600 : 900));
    }
    onComplete();
    setTimeout(() => {
      setScanStage('idle');
      onClose();
    }, 800);
  };

  const handleFileAccepted = useCallback(
    (file: File) => {
      setUploadedFileName(file.name);
      runScanAnimation(() => onUploadFile(file));
    },
    [onUploadFile, onClose]
  );

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileAccepted(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => setIsDragActive(false);

  const handlePasteSubmit = () => {
    if (!pasteText.trim()) return;
    const blob = new Blob([pasteText], { type: 'text/plain' });
    const file = new File([blob], 'pasted-contract.txt', { type: 'text/plain' });
    setUploadedFileName('pasted-contract.txt');
    runScanAnimation(() => onUploadFile(file));
  };

  if (!isOpen) return null;

  const currentStage = SCAN_STAGES[scanStage];
  const isScanning = scanStage !== 'idle';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!isScanning ? onClose : undefined}
      />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-headline text-primary">Load Contract Document</h2>
              <p className="text-[11px] text-slate-500">Upload a file or paste contract text for AI analysis</p>
            </div>
          </div>
          {!isScanning && (
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {isScanning ? (
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-full bg-brand/10 border-2 border-brand/30 flex items-center justify-center mx-auto">
                {scanStage === 'done' ? (
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                ) : (
                  <Sparkles className="w-7 h-7 text-brand animate-pulse" />
                )}
              </div>
              <p className="text-xs text-slate-500 font-mono truncate">{uploadedFileName}</p>
            </div>
            <div className="space-y-3">
              {(['extracting', 'parsing', 'scoring', 'done'] as ScanStage[]).map((stage, i) => {
                const stageData = SCAN_STAGES[stage];
                const stageOrder = ['extracting', 'parsing', 'scoring', 'done'];
                const isActive = scanStage === stage;
                const isDone = stageOrder.indexOf(scanStage) > stageOrder.indexOf(stage);
                return (
                  <div key={stage} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold transition-all ${isDone ? 'bg-emerald-500 text-white' : isActive ? 'bg-brand text-white' : 'bg-slate-200 text-slate-500'}`}>
                      {isDone ? <CheckCircle2 className="w-3 h-3" /> : i + 1}
                    </div>
                    <div className="flex-1">
                      <p className={`text-xs font-semibold ${isActive ? 'text-brand' : isDone ? 'text-emerald-700' : 'text-slate-400'}`}>{stageData.label}</p>
                      {isActive && <p className="text-[11px] text-slate-500">{stageData.detail}</p>}
                    </div>
                    {isActive && <Loader2 className="w-3.5 h-3.5 text-brand animate-spin" />}
                  </div>
                );
              })}
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand to-purple-500 rounded-full transition-all duration-700" style={{ width: `${currentStage.progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Load - Demo Contracts</p>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { onLoadPreset('LEASE'); onClose(); }} className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 hover:border-brand hover:bg-slate-50 transition-all text-left group">
                  <span className="text-lg">🏠</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 group-hover:text-primary">Residential Lease</p>
                    <p className="text-[10px] text-slate-400">NY Standard (2026)</p>
                  </div>
                </button>
                <button onClick={() => { onLoadPreset('MSA'); onClose(); }} className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 hover:border-brand hover:bg-slate-50 transition-all text-left group">
                  <span className="text-lg">📄</span>
                  <div>
                    <p className="text-xs font-semibold text-slate-900 group-hover:text-primary">Freelancer MSA</p>
                    <p className="text-[10px] text-slate-400">High-Risk Indemnity</p>
                  </div>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-[11px] text-slate-400 font-semibold uppercase">or upload your own</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>
            <div className="flex bg-slate-100 rounded-lg p-0.5">
              <button onClick={() => setActiveTab('upload')} className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${activeTab === 'upload' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                <FolderOpen className="w-3.5 h-3.5" /> File Upload
              </button>
              <button onClick={() => setActiveTab('paste')} className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center justify-center gap-1.5 ${activeTab === 'paste' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                <ClipboardPaste className="w-3.5 h-3.5" /> Paste Text
              </button>
            </div>
            {activeTab === 'upload' ? (
              <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onClick={() => fileInputRef.current?.click()} className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${isDragActive ? 'border-brand bg-brand/5' : 'border-slate-200 hover:border-slate-400 hover:bg-slate-50/70'}`}>
                <input ref={fileInputRef} type="file" accept=".txt,.md,.pdf" className="hidden" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleFileAccepted(file); }} />
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDragActive ? 'bg-brand/20' : 'bg-slate-100'}`}>
                    <Upload className={`w-6 h-6 ${isDragActive ? 'text-brand' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{isDragActive ? 'Drop to analyze contract' : 'Drag & drop your contract here'}</p>
                    <p className="text-xs text-slate-400 mt-1">Supports .pdf, .txt, .md — or click to browse</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <textarea value={pasteText} onChange={(e) => setPasteText(e.target.value)} placeholder="Paste the full contract text here..." rows={8} className="w-full px-3.5 py-3 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand resize-none font-mono leading-relaxed" />
                <Button variant="primary" size="sm" disabled={!pasteText.trim()} onClick={handlePasteSubmit} className="w-full text-xs font-semibold">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                  Analyze Pasted Contract Text
                </Button>
              </div>
            )}
            <div className="flex items-start gap-2 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-emerald-800 leading-relaxed"><strong>Privacy:</strong> Your document is processed in-browser and not transmitted to external servers.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
