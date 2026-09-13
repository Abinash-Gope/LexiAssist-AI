import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle2, Shield } from 'lucide-react';
import { Card } from '../../ui/Card';

interface RiskGaugeMeterProps {
  score: number; // 0 to 100
  highRiskCount: number;
  mediumRiskCount: number;
  lowRiskCount: number;
}

export const RiskGaugeMeter: React.FC<RiskGaugeMeterProps> = ({
  score,
  highRiskCount,
  mediumRiskCount,
  lowRiskCount,
}) => {
  // Score interpretation
  let statusText = 'Fair / Balanced Terms';
  let statusColor = 'text-risk-low';
  let barGradient = 'from-emerald-500 to-teal-600';

  if (score < 50) {
    statusText = 'Severe Risk & Imbalance';
    statusColor = 'text-risk-high';
    barGradient = 'from-red-600 to-rose-700';
  } else if (score < 75) {
    statusText = 'Moderate Risk Exposure';
    statusColor = 'text-risk-medium';
    barGradient = 'from-amber-500 to-orange-600';
  }

  return (
    <Card className="p-5 border-border-light bg-surface-light">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-brand" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-sans">
            Agreement Safety Score
          </h3>
        </div>
        <span className={`text-xs font-bold ${statusColor}`}>{statusText}</span>
      </div>

      {/* Numerical Meter & Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold font-headline text-primary tracking-tight">
              {score}
            </span>
            <span className="text-xs text-slate-400 font-mono">/ 100</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            {score >= 75 ? 'Low Overall Risk' : score >= 50 ? 'Requires Revision' : 'Do Not Sign As-Is'}
          </span>
        </div>

        {/* Multi-tier Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex border border-border-light">
          <div
            style={{ width: `${score}%` }}
            className={`h-full bg-gradient-to-r ${barGradient} transition-all duration-500 rounded-full`}
          />
        </div>
      </div>

      {/* Category Breakdown Chips */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border-light text-center">
        <div className="bg-risk-high-bg border border-risk-high-border p-2 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-risk-high mb-0.5">
            <AlertCircle className="w-3 h-3" />
            <span className="text-xs font-bold font-mono">{highRiskCount}</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-red-800">
            High Risk
          </span>
        </div>

        <div className="bg-risk-medium-bg border border-risk-medium-border p-2 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-risk-medium mb-0.5">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-xs font-bold font-mono">{mediumRiskCount}</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-800">
            Caution
          </span>
        </div>

        <div className="bg-risk-low-bg border border-risk-low-border p-2 rounded-lg">
          <div className="flex items-center justify-center gap-1 text-risk-low mb-0.5">
            <CheckCircle2 className="w-3 h-3" />
            <span className="text-xs font-bold font-mono">{lowRiskCount}</span>
          </div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800">
            Standard
          </span>
        </div>
      </div>
    </Card>
  );
};
