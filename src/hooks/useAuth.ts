/**
 * Business Logic Hook: Authentication & Session Coordinator
 * Bridges Redux auth state with router navigation and login/logout handlers.
 */

import { useAppDispatch, useAppSelector } from '@/state/store';
import { loginSuccess, loginGuest, logout } from '@/state/slices/authSlice';
import { LoginCredentials, SignUpPayload, AuthResult } from '@/core/types/auth.types';
import { authenticateUser, registerUser } from '@/core/services/authService';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogin = (credentials: LoginCredentials): AuthResult => {
    const result = authenticateUser(credentials);
    if (result.success && result.user) {
      dispatch(loginSuccess(result.user));
    }
    return result;
  };

  const handleSignUp = (payload: SignUpPayload): AuthResult => {
    const result = registerUser(payload);
    if (result.success && result.user) {
      dispatch(loginSuccess(result.user));
    }
    return result;
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
