/**
 * Contract Diff UI State Slice (Redux Toolkit)
 * Handles synchronized scroll lock, active diff filter, and selected redline clause.
 * RULE: Server diff data is owned by TanStack Query, NOT here.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DiffFilter = 'ALL' | 'HIGH_RISK_ONLY' | 'FINANCIAL_ONLY';

interface DiffUiState {
  activeFilter: DiffFilter;
  isSyncScrollLocked: boolean;
  selectedDiffClauseId: string | null;
}

const initialState: DiffUiState = {
  activeFilter: 'ALL',
  isSyncScrollLocked: true,
  selectedDiffClauseId: 'diff-3', // Default focus on 15% escalation diff
};

export const diffUiSlice = createSlice({
  name: 'diffUi',
  initialState,
  reducers: {
    setDiffFilter: (state, action: PayloadAction<DiffFilter>) => {
      state.activeFilter = action.payload;
    },
    toggleSyncScroll: (state) => {
      state.isSyncScrollLocked = !state.isSyncScrollLocked;
    },
    setSelectedDiffClauseId: (state, action: PayloadAction<string | null>) => {
      state.selectedDiffClauseId = action.payload;
    },
  },
});

export const { setDiffFilter, toggleSyncScroll, setSelectedDiffClauseId } = diffUiSlice.actions;

export default diffUiSlice.reducer;
