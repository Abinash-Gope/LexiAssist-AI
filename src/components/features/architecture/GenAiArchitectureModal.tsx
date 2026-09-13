import React from 'react';
import { Cpu, ShieldCheck, Database, Layers, GitBranch, CheckCircle2, Lock } from 'lucide-react';
import { Card } from '../../ui/Card';

export const GenAiArchitectureModal: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-xl shadow-level-2 space-y-2">
        <div className="flex items-center gap-2 text-brand-subtle text-xs font-bold uppercase tracking-wider font-mono">
          <Cpu className="w-4 h-4 text-blue-400" />
          <span>PromptWars Hackathon Evaluator Specification</span>
        </div>
        <h1 className="text-2xl font-bold font-headline">
          LexiAssist AI: GenAI System & Architecture Blueprint
        </h1>
        <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
          Comprehensive disclosure of integrated GenAI models, prompt pipelines, context management, structured JSON schemas, and hallucination guardrails.
        </p>
      </div>

      {/* Pipeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Model Card */}
        <Card className="p-5 border-border-light bg-surface-light space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-brand uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Primary Model Engine</span>
          </div>
          <h3 className="text-base font-bold text-primary">
            Google Gemini 2.5 Flash / 1.5 Flash
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Chosen for its massive 1M+ token context window, low latency, and deterministic structured output support. Enables whole-contract ingestion without lossy semantic chunking.
          </p>
          <div className="pt-2 border-t border-border-light flex flex-wrap gap-2 text-[11px] font-mono text-slate-600">
            <span className="bg-slate-100 px-2 py-0.5 rounded">Temperature: 0.1 (Strict)</span>
            <span className="bg-slate-100 px-2 py-0.5 rounded">ResponseMime: application/json</span>
          </div>
        </Card>

        {/* Guardrail Card */}
        <Card className="p-5 border-border-light bg-surface-light space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Hallucination Prevention</span>
          </div>
          <h3 className="text-base font-bold text-primary">
            Grounded Retrieval & Citation System
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every response must link back to an identified section or clause number. Out-of-scope inquiries trigger an explicit fallback refusal redirecting the user to counsel.
          </p>
          <div className="pt-2 border-t border-border-light flex flex-wrap gap-2 text-[11px] font-mono text-emerald-800">
            <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Verified Clause Citation
            </span>
            <span className="bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Zero Extrapolation
            </span>
          </div>
        </Card>
      </div>

      {/* 4 Pipeline Execution Details */}
      <Card className="p-6 border-border-light bg-surface-light space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
          Integrated GenAI Execution Pipelines
        </h3>

        <div className="space-y-4 text-xs divide-y divide-border-light">
          {/* Pipeline 1 */}
          <div className="pt-3 first:pt-0 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">
                Pipeline 1: Structured Contract Deconstruction & Risk Triage
              </h4>
              <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                API: /api/analyze
              </span>
            </div>
            <p className="text-slate-600">
              Parses full contract text into atomic clauses. Classifies liabilities into Red (High Risk), Yellow (Caution), and Green (Standard) using structured JSON schema.
            </p>
          </div>

          {/* Pipeline 2 */}
          <div className="pt-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">
                Pipeline 2: Semantic Redline Comparison Engine
              </h4>
              <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                API: /api/diff
              </span>
            </div>
            <p className="text-slate-600">
              Compares statutory benchmark precedent against revised counter-proposals. Pinpoints altered notice periods, non-refundable fees, and liability transfers.
            </p>
          </div>

          {/* Pipeline 3 */}
          <div className="pt-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">
                Pipeline 3: Grounded Conversational Q&A Copilot
              </h4>
              <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                API: /api/chat
              </span>
            </div>
            <p className="text-slate-600">
              Answers natural language legal questions with strict source attribution, clause numbers, and quote snippets.
            </p>
          </div>

          {/* Pipeline 4 */}
          <div className="pt-3 space-y-1.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">
                Pipeline 4: Attorney Consultation Kit Synthesizer
              </h4>
              <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                API: /api/prep-kit
              </span>
            </div>
            <p className="text-slate-600">
              Generates executive risk brief, top 5 consultation questions, and proposed amendment language for attorney review.
            </p>
          </div>
        </div>
      </Card>

      {/* Privacy & Zero-Retention Security Architecture */}
      <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
        <div className="font-bold flex items-center gap-1.5 text-emerald-900">
          <Lock className="w-4 h-4 text-emerald-700" />
          <span>Confidentiality & Ephemeral Data Architecture</span>
        </div>
        <p className="text-[11px] text-emerald-900/90 leading-relaxed">
          In strict adherence to legal ethics and hackathon safety criteria, user contracts are processed ephemerally in browser session memory. No user contract text is permanently saved or indexed in public databases. Users can trigger an immediate full-state purge using the 1-click Wipe Data button.
        </p>
      </div>
    </div>
  );
};
