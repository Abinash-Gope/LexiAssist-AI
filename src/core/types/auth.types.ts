/**
 * Authentication & User Session Types
 * Strict isolation - Pure TypeScript.
 */

export type UserRole = 'TENANT' | 'FREELANCER' | 'SMALL_BUSINESS' | 'RESEARCHER' | 'EVALUATOR';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isGuest: boolean;
  avatarUrl?: string;
  createdAt: string;
}

export interface AuthSessionState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: UserProfile;
}
