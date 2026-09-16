/**
 * Business Logic Hook: Contract Diff Coordinator
 * Combines TanStack Query diff data with Redux filter state and sync scroll logic.
 */

import { useAppDispatch, useAppSelector } from '@/state/store';
import {
  setDiffFilter,
  toggleSyncScroll,
  setSelectedDiffClauseId,
  DiffFilter,
} from '@/state/slices/diffUiSlice';
import { useDiffQuery } from '@/state/queries/useDiffQuery';
import { RedlineClause } from '@/core/types/diff.types';

export function useContractDiff(
  presetId = 'lease',
  customV1Text?: string,
  customV2Text?: string,
  customV1Title?: string,
  customV2Title?: string
) {
  const dispatch = useAppDispatch();
  const { activeFilter, isSyncScrollLocked, selectedDiffClauseId } = useAppSelector(
    (state) => state.diffUi
  );

  const { data: diffData, isLoading, error } = useDiffQuery(
    presetId,
    customV1Text,
    customV2Text,
    customV1Title,
    customV2Title
  );

  const allClauses = diffData?.clauses || [];

  // Filter clauses according to active filter
  const filteredClauses = allClauses.filter((clause: RedlineClause) => {
    if (activeFilter === 'HIGH_RISK_ONLY') {
      return clause.severity === 'HIGH';
    }
    if (activeFilter === 'MODERATE_RISK_ONLY') {
      return clause.severity === 'MEDIUM';
    }
    if (activeFilter === 'FINANCIAL_ONLY') {
      const lower = (clause.title + ' ' + clause.baselineText + ' ' + clause.alteredText).toLowerCase();
      return (
        lower.includes('deposit') ||
        lower.includes('escalat') ||
        lower.includes('fee') ||
        lower.includes('rent') ||
        lower.includes('payment') ||
        lower.includes('disbursement') ||
        lower.includes('invoic') ||
        lower.includes('price') ||
        lower.includes('$')
      );
    }
    return true;
  });

  const selectedClause = diffData?.clauses.find((c) => c.id === selectedDiffClauseId) || diffData?.clauses[0];

  const handleFilterChange = (filter: DiffFilter) => {
    dispatch(setDiffFilter(filter));
  };

  const handleToggleSyncScroll = () => {
    dispatch(toggleSyncScroll());
  };

  const handleSelectDiffClause = (clauseId: string) => {
    dispatch(setSelectedDiffClauseId(clauseId));
  };

  return {
    diffData,
    isLoading,
    error,
    activeFilter,
    isSyncScrollLocked,
    selectedClause,
    selectedDiffClauseId,
    allClauses,
    filteredClauses,
    setFilter: handleFilterChange,
    toggleSync: handleToggleSyncScroll,
    selectDiffClause: handleSelectDiffClause,
  };
}
