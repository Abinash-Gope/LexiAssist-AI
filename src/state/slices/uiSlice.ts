/**
 * Client UI State Slice (Redux Toolkit)
 * Strictly ephemeral UI state - Modals, drawers, and privacy toggle.
 * RULE: Never mirror server data here.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ActiveModal = 'PREP_KIT' | 'ARCHITECTURE' | 'WIPE_CONFIRMATION' | null;

interface UiState {
  activeModal: ActiveModal;
  isMobileSidebarOpen: boolean;
  isChatDrawerOpen: boolean;
  isIncognitoWiped: boolean;
  activeTheme: 'light' | 'dark';
}

const initialState: UiState = {
  activeModal: null,
  isMobileSidebarOpen: false,
  isChatDrawerOpen: false,
  isIncognitoWiped: false,
  activeTheme: 'light',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ActiveModal>) => {
      state.activeModal = action.payload;
    },
    closeModal: (state) => {
      state.activeModal = null;
    },
    toggleMobileSidebar: (state) => {
      state.isMobileSidebarOpen = !state.isMobileSidebarOpen;
    },
    toggleChatDrawer: (state) => {
      state.isChatDrawerOpen = !state.isChatDrawerOpen;
    },
    setChatDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isChatDrawerOpen = action.payload;
    },
    wipeSessionData: (state) => {
      state.isIncognitoWiped = true;
      state.activeModal = null;
    },
    resetWipeState: (state) => {
      state.isIncognitoWiped = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  toggleMobileSidebar,
  toggleChatDrawer,
  setChatDrawerOpen,
  wipeSessionData,
  resetWipeState,
} = uiSlice.actions;

export default uiSlice.reducer;
