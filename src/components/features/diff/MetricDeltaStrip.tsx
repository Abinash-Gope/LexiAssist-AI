import React from 'react';
import { AlertCircle, AlertTriangle, ShieldAlert, Lock, Unlock, Filter } from 'lucide-react';
import { Card } from '../../ui/Card';
import { DiffFilter } from '@/state/slices/diffUiSlice';

interface MetricDeltaStripProps {
  materialAlterationsCount: number;
  newLiabilitiesCount: number;
  omittedProtectionsCount: number;
  riskScoreDelta: number;
  activeFilter: DiffFilter;
  onFilterChange: (filter: DiffFilter) => void;
  isSyncScrollLocked: boolean;
  onToggleSyncScroll: () => void;
}

export const MetricDeltaStrip: React.FC<MetricDeltaStripProps> = ({
  materialAlterationsCount,
  newLiabilitiesCount,
  omittedProtectionsCount,
  riskScoreDelta,
  activeFilter,
  onFilterChange,
  isSyncScrollLocked,
  onToggleSyncScroll,
}) => {
  return (
    <div className="space-y-3">
      {/* 4 Cards Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="p-4 border-amber-200 bg-amber-50/50">
          <div className="flex items-center justify-between text-amber-800 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Material Alterations</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold font-headline text-amber-950">
            {materialAlterationsCount}
          </div>
          <p className="text-[11px] text-amber-800/80 mt-0.5">Substantive term modifications</p>
        </Card>

        <Card className="p-4 border-red-200 bg-red-50/50">
          <div className="flex items-center justify-between text-red-800 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">New Liabilities</span>
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-extrabold font-headline text-red-950">
            {newLiabilitiesCount}
          </div>
          <p className="text-[11px] text-red-800/80 mt-0.5">Unilateral indemnity & penalty shifts</p>
        </Card>

        <Card className="p-4 border-slate-200 bg-slate-50/80">
          <div className="flex items-center justify-between text-slate-700 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Protections Omitted</span>
            <ShieldAlert className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-2xl font-extrabold font-headline text-slate-900">
            {omittedProtectionsCount}
          </div>
          <p className="text-[11px] text-slate-600 mt-0.5">Notice & cure periods deleted</p>
        </Card>

        <Card className="p-4 border-red-300 bg-red-100/60 shadow-level-1">
          <div className="flex items-center justify-between text-red-900 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Risk Delta</span>
            <span className="text-[10px] font-bold bg-red-200 px-1.5 py-0.5 rounded text-red-800">
              CRITICAL
            </span>
          </div>
          <div className="text-2xl font-extrabold font-headline text-red-950">
            +{riskScoreDelta}%
          </div>
          <p className="text-[11px] text-red-900/80 mt-0.5">Significant liability deterioration</p>
        </Card>
      </div>

      {/* Filter and Synchronized Scroll Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-surface-light border border-border-light rounded-xl">
        <div className="flex items-center gap-1 text-xs text-slate-600">
          <Filter className="w-3.5 h-3.5 mr-1" />
          <span className="font-semibold mr-2">Filter Diffs:</span>
          {(['ALL', 'HIGH_RISK_ONLY', 'FINANCIAL_ONLY'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => onFilterChange(filter)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:bg-surface-dim'
              }`}
            >
              {filter === 'ALL' && 'Show All (4)'}
              {filter === 'HIGH_RISK_ONLY' && '🔴 High Risk Only (3)'}
              {filter === 'FINANCIAL_ONLY' && '💰 Financial Only (2)'}
            </button>
          ))}
        </div>

        <button
          onClick={onToggleSyncScroll}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
            isSyncScrollLocked
              ? 'bg-blue-50 border-blue-200 text-blue-800'
              : 'bg-surface-light border-border-light text-slate-600 hover:bg-slate-50'
          }`}
        >
          {isSyncScrollLocked ? (
            <>
              <Lock className="w-3 h-3 text-brand" />
              <span>Synchronized Scroll Locked</span>
            </>
          ) : (
            <>
              <Unlock className="w-3 h-3 text-slate-400" />
              <span>Synchronized Scroll Unlocked</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
