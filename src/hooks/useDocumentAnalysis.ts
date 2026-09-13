/**
 * Business Logic Hook: Document Analysis Coordinator
 * Orchestrates TanStack Query analysis data with Redux UI state.
 * Presentation components call this hook, never raw queries or Redux actions.
 */

import { useAppDispatch, useAppSelector } from '@/state/store';
import {
  setSelectedClauseId,
  setSearchFilter,
  setActiveRiskFilter,
  setDocumentZoom,
  setActivePreset,
} from '@/state/slices/contractUiSlice';
import { useAnalyzeQuery } from '@/state/queries/useAnalyzeQuery';
import { ContractClause, RiskSeverity } from '@/core/types/contract.types';

export function useDocumentAnalysis() {
  const dispatch = useAppDispatch();
  const {
    activePreset,
    selectedClauseId,
    searchFilter,
    activeRiskFilter,
    documentZoom,
  } = useAppSelector((state) => state.contractUi);

  const { data: document, isLoading, error, refetch } = useAnalyzeQuery(activePreset);

  // Compute selected clause object
  const selectedClause: ContractClause | undefined =
    document?.clauses.find((c) => c.id === selectedClauseId) || document?.clauses[0];

  // Compute filtered clauses based on search query and risk badge filter
  const filteredClauses = (document?.clauses || []).filter((clause) => {
    const matchesSearch =
      searchFilter === '' ||
      clause.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      clause.sectionNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
      clause.originalText.toLowerCase().includes(searchFilter.toLowerCase()) ||
      clause.plainEnglishSummary.toLowerCase().includes(searchFilter.toLowerCase());

    const matchesRisk =
      activeRiskFilter === 'ALL' || clause.severity === activeRiskFilter;

    return matchesSearch && matchesRisk;
  });

  // Action handlers
  const handleSelectClause = (clauseId: string) => {
    dispatch(setSelectedClauseId(clauseId));
  };

  const handleSearchChange = (query: string) => {
    dispatch(setSearchFilter(query));
  };

  const handleRiskFilterChange = (filter: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW') => {
    dispatch(setActiveRiskFilter(filter));
  };

  const handleZoomChange = (delta: number) => {
    dispatch(setDocumentZoom(documentZoom + delta));
  };

  const handleSwitchPreset = (preset: 'LEASE' | 'MSA' | 'CUSTOM') => {
    dispatch(setActivePreset(preset));
  };

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
