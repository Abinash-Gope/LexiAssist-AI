/**
 * Central Redux Toolkit Store
 * Strictly houses pure UI & session state.
 *
 * localStorage persistence is handled by `persistenceMiddleware` here,
 * NOT inside individual reducers — keeping reducers as pure functions.
 */

import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import uiReducer from './slices/uiSlice';
import contractUiReducer, {
  setActivePreset,
  setCustomContract,
  clearCustomContract,
} from './slices/contractUiSlice';
import diffUiReducer from './slices/diffUiSlice';
import authReducer from './slices/authSlice';

// ---------------------------------------------------------------------------
// Persistence Middleware
// All localStorage side-effects live here, outside reducers, so that reducers
// remain pure functions (testable without a DOM / localStorage mock).
// ---------------------------------------------------------------------------

const persistenceMiddleware = createListenerMiddleware();

persistenceMiddleware.startListening({
  actionCreator: setActivePreset,
  effect: (action) => {
    try {
      localStorage.setItem('lexiassist_active_preset', action.payload);
    } catch { /* quota exceeded or private browsing — safe to ignore */ }
  },
});

persistenceMiddleware.startListening({
  actionCreator: setCustomContract,
  effect: (action) => {
    try {
      localStorage.setItem('lexiassist_custom_text', action.payload.text);
      localStorage.setItem('lexiassist_custom_title', action.payload.title);
      localStorage.setItem('lexiassist_active_preset', 'CUSTOM');
    } catch { /* quota exceeded or private browsing — safe to ignore */ }
  },
});

persistenceMiddleware.startListening({
  actionCreator: clearCustomContract,
  effect: () => {
    try {
      localStorage.removeItem('lexiassist_custom_text');
      localStorage.removeItem('lexiassist_custom_title');
      localStorage.setItem('lexiassist_active_preset', 'LEASE');
    } catch { /* quota exceeded or private browsing — safe to ignore */ }
  },
});

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contractUi: contractUiReducer,
    diffUi: diffUiReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistenceMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom typed hooks for use throughout the application
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
