/**
 * Application Environment Configuration
 * Strict isolation - Pure TypeScript.
 */

export const ENV = {
  APP_NAME: 'LexiAssist AI',
  APP_THEME: 'AI for Legal Assistance & Access',
  VERSION: '1.0.0',
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || '',
  GEMINI_MODEL: 'gemini-2.5-flash',
  ENABLE_LOCAL_MOCK_FALLBACK: true, // Guarantees seamless demo operation even if user has no API key entered
} as const;
