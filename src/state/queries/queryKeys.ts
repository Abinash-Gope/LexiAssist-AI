/**
 * Centralized Query Keys Factory (TanStack Query)
 * Ensures deterministic cache keys across the app.
 */

export const queryKeys = {
  contract: {
    all: ['contract'] as const,
    analyze: (preset: string, customTextLength?: number) =>
      ['contract', 'analyze', preset, customTextLength] as const,
  },
  diff: {
    all: ['diff'] as const,
    compare: (baselineId: string, alteredId: string) =>
      ['diff', 'compare', baselineId, alteredId] as const,
  },
  prepKit: {
    all: ['prepKit'] as const,
    detail: (documentId: string) => ['prepKit', 'detail', documentId] as const,
  },
};
