/**
 * Authentication & User Registry Service
 * Handles user account persistence, credential validation, and registration guardrails.
 * Backed by LocalStorage repository with pre-seeded demo credentials.
 */

import {
  RegisteredUser,
  UserProfile,
  LoginCredentials,
  SignUpPayload,
  AuthResult,
} from '@/core/types/auth.types';

export const REGISTERED_USERS_STORAGE_KEY = 'lexiassist_registered_users';

export const SEED_DEMO_USER: RegisteredUser = {
  id: 'seed-counsel-01',
  name: 'Legal Counsel',
  email: 'counsel@lexiassist.ai',
  passwordHash: 'password123',
  role: 'TENANT',
  createdAt: '2026-01-01T00:00:00.000Z',
};

/**
 * Retrieves all registered users from persistent storage.
 * Seeds the default counsel demo account if the store is empty.
 */
export function getRegisteredUsers(): RegisteredUser[] {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Failed to parse registered users from localStorage:', error);
  }

  // Seed default account
  saveRegisteredUsers([SEED_DEMO_USER]);
  return [SEED_DEMO_USER];
}

/**
 * Saves the registered users array to persistent storage.
 */
export function saveRegisteredUsers(users: RegisteredUser[]): void {
  try {
    localStorage.setItem(REGISTERED_USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Failed to save registered users to localStorage:', error);
  }
}

/**
 * Finds a registered user by email address (case-insensitive).
 */
export function findUserByEmail(email: string): RegisteredUser | undefined {
  const normalized = email.trim().toLowerCase();
  const users = getRegisteredUsers();
  return users.find((u) => u.email.trim().toLowerCase() === normalized);
}

/**
 * Registers a new user account.
 * Validates email uniqueness and minimum password complexity.
 */
export function registerUser(payload: SignUpPayload): AuthResult {
  const trimmedName = payload.name.trim();
  const trimmedEmail = payload.email.trim().toLowerCase();
  const password = payload.password || '';

  if (!trimmedName) {
    return { success: false, error: 'Full name is required.' };
  }

  if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  if (password.length < 6) {
    return {
      success: false,
      error: 'Password must be at least 6 characters long.',
    };
  }

  const existing = findUserByEmail(trimmedEmail);
  if (existing) {
    return {
      success: false,
      error: 'An account with this email already exists. Please sign in instead.',
    };
  }

  const newUser: RegisteredUser = {
    id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: trimmedName,
    email: trimmedEmail,
    passwordHash: password,
    role: payload.role || 'TENANT',
    createdAt: new Date().toISOString(),
  };

  const users = getRegisteredUsers();
  users.push(newUser);
  saveRegisteredUsers(users);

  const profile: UserProfile = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    isGuest: false,
    createdAt: newUser.createdAt,
  };

  return {
    success: true,
    user: profile,
  };
}

/**
 * Authenticates a user against registered accounts.
 * Enforces account existence check and password verification.
 */
export function authenticateUser(credentials: LoginCredentials): AuthResult {
  const trimmedEmail = credentials.email.trim().toLowerCase();
  const password = credentials.password || '';

  if (!trimmedEmail) {
    return { success: false, error: 'Email address is required.' };
  }

  if (!password) {
    return { success: false, error: 'Password is required.' };
  }

  const user = findUserByEmail(trimmedEmail);

  // Check if account has been created
  if (!user) {
    return {
      success: false,
      error: 'No account found with this email. Please check your email or create a free account first.',
    };
  }

  // Check password match
  if (user.passwordHash !== password) {
    return {
      success: false,
      error: 'Incorrect password. Please verify your credentials and try again.',
    };
  }

  const profile: UserProfile = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    isGuest: false,
    createdAt: user.createdAt,
  };

  return {
    success: true,
    user: profile,
  };
}
