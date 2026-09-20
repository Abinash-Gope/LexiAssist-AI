/**
 * Authentication Client State Slice (Redux Toolkit)
 * Manages active user profile, guest evaluation mode, and session persistence.
 * RULE: Pure client UI session state.
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile, AuthSessionState } from '@/core/types/auth.types';

const STORAGE_KEY = 'lexiassist_auth_session';

// Safely read initial session from localStorage
const loadInitialSession = (): AuthSessionState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed?.isAuthenticated && parsed?.user) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Failed to parse stored auth session:', e);
  }

  return {
    isAuthenticated: false,
    user: null,
  };
};

const initialState: AuthSessionState = loadInitialSession();

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated: true, user: action.payload }));
      } catch (e) {
        console.error('LocalStorage write error:', e);
      }
    },
    loginGuest: (state) => {
      const guest: UserProfile = {
        id: `guest-${Date.now()}`,
        name: 'Guest Reviewer',
        email: 'guest@lexiassist.ai',
        role: 'EVALUATOR',
        isGuest: true,
        createdAt: new Date().toISOString(),
      };
      state.isAuthenticated = true;
      state.user = guest;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated: true, user: guest }));
      } catch (e) {
        console.error('LocalStorage write error:', e);
      }
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error('LocalStorage remove error:', e);
      }
    },
  },
});

export const { loginSuccess, loginGuest, logout } = authSlice.actions;

export default authSlice.reducer;
