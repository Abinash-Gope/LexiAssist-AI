/**
 * Business Logic Hook: Document Analysis Coordinator
 * Orchestrates TanStack Query analysis data with Redux UI state.
 * Presentation components call this hook, never raw queries or Redux actions.
 */

import { useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/state/store';
import {
  setSelectedClauseId,
  setSearchFilter,
  setActiveRiskFilter,
  setDocumentZoom,
  setActivePreset,
} from '@/state/slices/contractUiSlice';
import { useAnalyzeQuery } from '@/state/queries/useAnalyzeQuery';
import { ContractClause } from '@/core/types/contract.types';

export function useDocumentAnalysis() {
  const dispatch = useAppDispatch();
  const {
    activePreset,
    selectedClauseId,
    searchFilter,
    activeRiskFilter,
    documentZoom,
    customContractText,
    customContractTitle,
  } = useAppSelector((state) => state.contractUi);

  const { data: document, isLoading, error, refetch } = useAnalyzeQuery(
    activePreset,
    activePreset === 'CUSTOM' ? customContractText : '',
    activePreset === 'CUSTOM' ? customContractTitle : ''
  );

  // Memoized selected clause object
  const selectedClause = useMemo<ContractClause | undefined>(() => {
    if (!document?.clauses?.length) return undefined;
    return document.clauses.find((c) => c.id === selectedClauseId) || document.clauses[0];
  }, [document, selectedClauseId]);

  // Memoized filtered clauses with pre-normalized search string
  const filteredClauses = useMemo(() => {
    if (!document?.clauses) return [];
    const normalized = searchFilter.trim().toLowerCase();

    return document.clauses.filter((clause) => {
      const matchesRisk =
        activeRiskFilter === 'ALL' || clause.severity === activeRiskFilter;
      if (!matchesRisk) return false;

      if (!normalized) return true;

      return (
        clause.title.toLowerCase().includes(normalized) ||
        clause.sectionNumber.toLowerCase().includes(normalized) ||
        clause.plainEnglishSummary.toLowerCase().includes(normalized) ||
        clause.originalText.toLowerCase().includes(normalized)
      );
    });
  }, [document, searchFilter, activeRiskFilter]);

  // Stable action handlers wrapped in useCallback
  const handleSelectClause = useCallback((clauseId: string) => {
    dispatch(setSelectedClauseId(clauseId));
  }, [dispatch]);

  const handleSearchChange = useCallback((query: string) => {
    dispatch(setSearchFilter(query));
  }, [dispatch]);

  const handleRiskFilterChange = useCallback((filter: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW') => {
    dispatch(setActiveRiskFilter(filter));
  }, [dispatch]);

  const handleZoomChange = useCallback((delta: number) => {
    dispatch(setDocumentZoom(documentZoom + delta));
  }, [dispatch, documentZoom]);

  const handleSwitchPreset = useCallback((preset: 'LEASE' | 'MSA' | 'CUSTOM') => {
    dispatch(setActivePreset(preset));
  }, [dispatch]);

  return {
    document,
    isLoading,
    error,
    selectedClause,
    selectedClauseId,
    filteredClauses,
    searchFilter,
    activeRiskFilter,
    documentZoom,
    activePreset,
    refetch,
    selectClause: handleSelectClause,
    setSearch: handleSearchChange,
    setRiskFilter: handleRiskFilterChange,
    adjustZoom: handleZoomChange,
    switchPreset: handleSwitchPreset,
  };
}
