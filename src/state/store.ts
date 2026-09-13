/**
 * Central Redux Toolkit Store
 * Strictly houses pure UI & session state.
 */

import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import uiReducer from './slices/uiSlice';
import contractUiReducer from './slices/contractUiSlice';
import diffUiReducer from './slices/diffUiSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    contractUi: contractUiReducer,
    diffUi: diffUiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom typed hooks for use throughout the application
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
