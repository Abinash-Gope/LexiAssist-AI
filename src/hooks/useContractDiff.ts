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

export function useContractDiff() {
  const dispatch = useAppDispatch();
  const { activeFilter, isSyncScrollLocked, selectedDiffClauseId } = useAppSelector(
    (state) => state.diffUi
  );

  const { data: diffData, isLoading, error } = useDiffQuery();

  // Filter clauses according to active filter
  const filteredClauses = (diffData?.clauses || []).filter((clause: RedlineClause) => {
    if (activeFilter === 'HIGH_RISK_ONLY') {
      return clause.severity === 'HIGH';
    }
    if (activeFilter === 'FINANCIAL_ONLY') {
      return (
        clause.title.toLowerCase().includes('deposit') ||
        clause.title.toLowerCase().includes('escalat') ||
        clause.title.toLowerCase().includes('fee') ||
        clause.title.toLowerCase().includes('rent')
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
    filteredClauses,
    setFilter: handleFilterChange,
    toggleSync: handleToggleSyncScroll,
    selectDiffClause: handleSelectDiffClause,
  };
}
