/**
 * Business Logic Hook: Authentication & Session Coordinator
 * Bridges Redux auth state with router navigation and login/logout handlers.
 */

import { useAppDispatch, useAppSelector } from '@/state/store';
import { loginSuccess, loginGuest, logout } from '@/state/slices/authSlice';
import { LoginCredentials, SignUpPayload, UserProfile } from '@/core/types/auth.types';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogin = (credentials: LoginCredentials) => {
    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      name: credentials.email.split('@')[0] || 'Legal Counsel',
      email: credentials.email,
      role: 'TENANT',
      isGuest: false,
      createdAt: new Date().toISOString(),
    };
    dispatch(loginSuccess(profile));
  };

  const handleSignUp = (payload: SignUpPayload) => {
    const profile: UserProfile = {
      id: `user-${Date.now()}`,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      isGuest: false,
      createdAt: new Date().toISOString(),
    };
    dispatch(loginSuccess(profile));
  };

  const handleGuestLogin = () => {
    dispatch(loginGuest());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    isAuthenticated,
    user,
    login: handleLogin,
    signUp: handleSignUp,
    loginAsGuest: handleGuestLogin,
    logout: handleLogout,
  };
}
