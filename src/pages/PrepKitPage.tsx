import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Upload } from 'lucide-react';
import { useDocumentAnalysis } from '@/hooks/useDocumentAnalysis';
import { useAppSelector } from '@/state/store';
import { RESIDENTIAL_LEASE_PRESET } from '@/core/presets/sampleContracts';
import { PrepKitBrief } from '@/components/features/prepKit/PrepKitBrief';
import { Button } from '@/components/ui/Button';

export const PrepKitPage: React.FC = () => {
  const { document, activePreset, switchPreset } = useDocumentAnalysis();
  const { customContractText, customContractTitle } = useAppSelector((state) => state.contractUi);

  // Fallback to Residential Lease if no document is actively in memory
  const effectiveDocument = document || RESIDENTIAL_LEASE_PRESET;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header & Preset Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-light p-4 rounded-xl border border-border-light shadow-level-1">
        <div className="flex items-center gap-3">
          <Link to="/dashboard">
            <Button size="sm" variant="outline" className="text-xs">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              <span>Workspace</span>
            </Button>
          </Link>
          <div className="h-4 w-px bg-slate-200 hidden sm:block" />
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand/10 text-brand flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold font-headline text-primary">
                Lawyer Prep Kit: {effectiveDocument.title}
              </h1>
              <p className="text-[11px] text-slate-500">
                Jurisdiction: {effectiveDocument.jurisdiction} • Safety Score: {effectiveDocument.overallScore}/100
              </p>
            </div>
          </div>
        </div>

        {/* Contract Switcher */}
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
      </div>

      {/* Attorney Consultation Kit View */}
      <PrepKitBrief document={effectiveDocument} />
    </div>
  );
};
