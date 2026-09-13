/**
 * Contract Workspace UI State Slice (Redux Toolkit)
 * Manages active highlighted clause, active preset selection, and search query.
 * RULE: Server contract data is owned by TanStack Query, NOT here.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type PresetType = 'LEASE' | 'MSA' | 'CUSTOM';

interface ContractUiState {
  activePreset: PresetType;
  selectedClauseId: string | null;
  searchFilter: string;
  activeRiskFilter: 'ALL' | 'HIGH' | 'MEDIUM' | 'LOW';
  documentZoom: number; // 100% = 1.0
  activeViewMode: 'ANNOTATED' | 'CLEAN' | 'REDLINE';
}

const initialState: ContractUiState = {
  activePreset: 'LEASE',
  selectedClauseId: 'lease-c5', // Default focus on the automatic renewal clause
  searchFilter: '',
  activeRiskFilter: 'ALL',
  documentZoom: 1.0,
  activeViewMode: 'ANNOTATED',
};

export const contractUiSlice = createSlice({
  name: 'contractUi',
  initialState,
  reducers: {
    setActivePreset: (state, action: PayloadAction<PresetType>) => {
      state.activePreset = action.payload;
      state.selectedClauseId = action.payload === 'LEASE' ? 'lease-c5' : 'msa-c3';
    },
    setSelectedClauseId: (state, action: PayloadAction<string | null>) => {
      state.selectedClauseId = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.searchFilter = action.payload;
    },
    setActiveRiskFilter: (state, action: PayloadAction<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>) => {
      state.activeRiskFilter = action.payload;
    },
    setDocumentZoom: (state, action: PayloadAction<number>) => {
      state.documentZoom = Math.min(Math.max(action.payload, 0.75), 1.5);
    },
    setActiveViewMode: (state, action: PayloadAction<'ANNOTATED' | 'CLEAN' | 'REDLINE'>) => {
      state.activeViewMode = action.payload;
    },
  },
});

export const {
  setActivePreset,
  setSelectedClauseId,
  setSearchFilter,
  setActiveRiskFilter,
  setDocumentZoom,
  setActiveViewMode,
} = contractUiSlice.actions;

export default contractUiSlice.reducer;
