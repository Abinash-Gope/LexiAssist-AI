/**
 * Centralized Query Keys Factory (TanStack Query)
 * Ensures deterministic cache keys across the app.
 * Use text fingerprints (not raw lengths) to avoid cache collisions
 * between different documents of the same character count.
 */

export const queryKeys = {
  contract: {
    all: ['contract'] as const,
    analyze: (preset: string, textFingerprint?: string) =>
      ['contract', 'analyze', preset, textFingerprint ?? ''] as const,
  },
  diff: {
    all: ['diff'] as const,
    compare: (presetId: string, textFingerprint?: string) =>
      ['diff', 'compare', presetId, textFingerprint ?? ''] as const,
  },
  prepKit: {
    all: ['prepKit'] as const,
    detail: (documentId: string) => ['prepKit', 'detail', documentId] as const,
  },
};
