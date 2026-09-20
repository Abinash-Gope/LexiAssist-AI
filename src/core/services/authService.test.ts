import { describe, it, expect, beforeEach } from 'vitest';
import {
  getRegisteredUsers,
  registerUser,
  authenticateUser,
  findUserByEmail,
  REGISTERED_USERS_STORAGE_KEY,
} from './authService';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes and seeds default demo counsel account when storage is empty', () => {
    const users = getRegisteredUsers();
    expect(users.length).toBeGreaterThanOrEqual(1);
    expect(users[0].email).toBe('counsel@lexiassist.ai');
    expect(users[0].passwordHash).toBe('password123');
  });

  it('rejects login when account does not exist', () => {
    const result = authenticateUser({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('No account found with this email');
    expect(result.user).toBeUndefined();
  });

  it('rejects login when password is incorrect', () => {
    const result = authenticateUser({
      email: 'counsel@lexiassist.ai',
      password: 'wrongpassword',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('Incorrect password');
    expect(result.user).toBeUndefined();
  });

  it('authenticates seed user with correct credentials', () => {
    const result = authenticateUser({
      email: 'counsel@lexiassist.ai',
      password: 'password123',
    });

    expect(result.success).toBe(true);
    expect(result.user).toBeDefined();
    expect(result.user?.email).toBe('counsel@lexiassist.ai');
    expect(result.user?.name).toBe('Legal Counsel');
  });

  it('supports case-insensitive email authentication', () => {
    const result = authenticateUser({
      email: '  COUNSEL@LexiAssist.AI  ',
      password: 'password123',
    });

    expect(result.success).toBe(true);
    expect(result.user?.email).toBe('counsel@lexiassist.ai');
  });

  it('successfully registers a new user account', () => {
    const signUpResult = registerUser({
      name: 'Jane Doe',
      email: 'jane.doe@firm.com',
      password: 'securePassword456',
      role: 'FREELANCER',
    });

    expect(signUpResult.success).toBe(true);
    expect(signUpResult.user).toBeDefined();
    expect(signUpResult.user?.name).toBe('Jane Doe');
    expect(signUpResult.user?.email).toBe('jane.doe@firm.com');
    expect(signUpResult.user?.role).toBe('FREELANCER');

    // Verify user is in registered repository
    const found = findUserByEmail('jane.doe@firm.com');
    expect(found).toBeDefined();
    expect(found?.name).toBe('Jane Doe');

    // Verify newly registered user can log in
    const loginResult = authenticateUser({
      email: 'jane.doe@firm.com',
      password: 'securePassword456',
    });
    expect(loginResult.success).toBe(true);
    expect(loginResult.user?.name).toBe('Jane Doe');
  });

  it('prevents registration with an already registered email', () => {
    const first = registerUser({
      name: 'User One',
      email: 'duplicate@test.com',
      password: 'validPassword1',
      role: 'TENANT',
    });
    expect(first.success).toBe(true);

    const second = registerUser({
      name: 'User Two',
      email: 'duplicate@test.com',
      password: 'validPassword2',
      role: 'TENANT',
    });

    expect(second.success).toBe(false);
    expect(second.error).toContain('already exists');
  });

  it('enforces password minimum length of 6 characters', () => {
    const result = registerUser({
      name: 'Short Pass User',
      email: 'shortpass@test.com',
      password: '123',
      role: 'TENANT',
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain('at least 6 characters');
  });
});
