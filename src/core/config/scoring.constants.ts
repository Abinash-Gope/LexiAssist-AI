/**
 * Risk Scoring Constants
 * Single source of truth for all score weights, caps, and floors used
 * across analyzeContract, generateCustomDiff, and generateUploadedDocDiff.
 * Strict isolation - Pure TypeScript.
 */

export const RISK_SCORING = {
  // Clause risk weights (shared across all scoring functions)
  HIGH_WEIGHT: 18,
  MEDIUM_WEIGHT: 8,
  MATERIAL_WEIGHT: 4,

  // analyzeContract scoring
  ANALYZE_BASELINE_SCORE: 88,
  ANALYZE_MIN_SCORE: 15,
  ANALYZE_MAX_SCORE: 98,

  // generateCustomDiff scoring (two-document comparison)
  CUSTOM_BASELINE_SCORE: 88,
  CUSTOM_MIN_ALTERED_SCORE: 20,
  CUSTOM_MAX_DELTA: 85,
  CUSTOM_DEFAULT_DELTA: 25,

  // generateUploadedDocDiff scoring (uploaded vs. AI baseline)
  UPLOAD_BASELINE_SCORE: 92,
  UPLOAD_MIN_ALTERED_SCORE: 18,
  UPLOAD_MAX_DELTA: 88,
  UPLOAD_DEFAULT_DELTA: 28,
} as const;
