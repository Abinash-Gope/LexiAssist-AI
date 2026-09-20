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
  customContractText: string;
  customContractTitle: string;
}

// Retrieve persisted contract from localStorage if available
const getSavedCustomText = (): string => {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem('lexiassist_custom_text') || '' : '';
  } catch {
    return '';
  }
};

const getSavedCustomTitle = (): string => {
  try {
    return typeof window !== 'undefined' ? localStorage.getItem('lexiassist_custom_title') || '' : '';
  } catch {
    return '';
  }
};

const getSavedPreset = (): PresetType => {
  try {
    if (typeof window === 'undefined') return 'LEASE';
    const saved = localStorage.getItem('lexiassist_active_preset') as PresetType;
    if (saved === 'CUSTOM' && !localStorage.getItem('lexiassist_custom_text')) {
      return 'LEASE';
    }
    return saved || 'LEASE';
  } catch {
    return 'LEASE';
  }
};

const savedText = getSavedCustomText();
const savedTitle = getSavedCustomTitle();
const initialPreset = getSavedPreset();

const initialState: ContractUiState = {
  activePreset: initialPreset,
  selectedClauseId: initialPreset === 'MSA' ? 'msa-c3' : initialPreset === 'LEASE' ? 'lease-c5' : null,
  searchFilter: '',
  activeRiskFilter: 'ALL',
  documentZoom: 1.0,
  activeViewMode: 'ANNOTATED',
  customContractText: savedText,
  customContractTitle: savedTitle,
};

export const contractUiSlice = createSlice({
  name: 'contractUi',
  initialState,
  reducers: {
    setActivePreset: (state, action: PayloadAction<PresetType>) => {
      state.activePreset = action.payload;
      state.selectedClauseId = action.payload === 'LEASE' ? 'lease-c5' : action.payload === 'MSA' ? 'msa-c3' : null;
      // Persistence is handled by the listener middleware in store.ts
    },
    setCustomContract: (state, action: PayloadAction<{ text: string; title: string }>) => {
      state.customContractText = action.payload.text;
      state.customContractTitle = action.payload.title;
      state.activePreset = 'CUSTOM';
      state.selectedClauseId = null;
      // Persistence is handled by the listener middleware in store.ts
    },
    clearCustomContract: (state) => {
      state.customContractText = '';
      state.customContractTitle = '';
      state.activePreset = 'LEASE';
      state.selectedClauseId = 'lease-c5';
      // Persistence is handled by the listener middleware in store.ts
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
  setCustomContract,
  clearCustomContract,
  setSelectedClauseId,
  setSearchFilter,
  setActiveRiskFilter,
  setDocumentZoom,
  setActiveViewMode,
} = contractUiSlice.actions;

export default contractUiSlice.reducer;
