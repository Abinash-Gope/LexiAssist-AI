/**
 * AI Response Validator
 * Validates and sanitizes raw AI API responses before they are merged into
 * application state. Prevents XSS injection, type coercion, and oversized
 * string attacks from malformed or adversarial model output.
 * Strict isolation - Pure TypeScript, zero React imports.
 */

import { ContractDocument } from '../types/contract.types';

/** Strip HTML-dangerous characters and clamp string length */
export function sanitizeString(val: unknown, maxLength = 200): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[<>&"']/g, '') // Strip HTML metacharacters
    .slice(0, maxLength)
    .trim();
}

/**
 * Validates the shape of the JSON blob returned by AI for contract analysis.
 * Returns only the fields that pass type and range checks — never assigns
 * arbitrary keys to application state.
 */
export function validateAiAnalysisResponse(
  raw: unknown
): Partial<Pick<ContractDocument, 'overallScore' | 'jurisdiction' | 'parties'>> {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};

  const r = raw as Record<string, unknown>;
  const result: Partial<Pick<ContractDocument, 'overallScore' | 'jurisdiction' | 'parties'>> = {};

  // overallScore: must be a finite number in [0, 100]
  if (
    typeof r.overallScore === 'number' &&
    Number.isFinite(r.overallScore) &&
    r.overallScore >= 0 &&
    r.overallScore <= 100
  ) {
    result.overallScore = Math.max(15, Math.min(95, r.overallScore));
  }

  // jurisdiction: must be a non-empty string
  if (typeof r.jurisdiction === 'string' && r.jurisdiction.length > 0) {
    result.jurisdiction = sanitizeString(r.jurisdiction, 150);
  }

  // parties: must be an object with firstParty and secondParty strings
  if (r.parties && typeof r.parties === 'object' && !Array.isArray(r.parties)) {
    const p = r.parties as Record<string, unknown>;
    if (typeof p.firstParty === 'string' && typeof p.secondParty === 'string') {
      result.parties = {
        firstParty: sanitizeString(p.firstParty, 100),
        secondParty: sanitizeString(p.secondParty, 100),
      };
    }
  }

  return result;
}

/**
 * Validates the shape of the JSON blob returned by AI for prep kit generation.
 * Returns only questions that have the required fields.
 */
export function validateAiPrepKitResponse(raw: unknown): {
  executiveSummary?: string;
  questions?: Array<{
    questionNumber: number;
    question: string;
    rationale: string;
    suggestedObjective: string;
  }>;
} {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};

  const r = raw as Record<string, unknown>;
  const result: ReturnType<typeof validateAiPrepKitResponse> = {};

  if (typeof r.executiveSummary === 'string' && r.executiveSummary.length > 0) {
    result.executiveSummary = sanitizeString(r.executiveSummary, 600);
  }

  if (Array.isArray(r.questions)) {
    result.questions = (r.questions as unknown[])
      .filter(
        (q) =>
          q &&
          typeof q === 'object' &&
          typeof (q as Record<string, unknown>).question === 'string' &&
          typeof (q as Record<string, unknown>).rationale === 'string' &&
          typeof (q as Record<string, unknown>).suggestedObjective === 'string'
      )
      .map((q, idx) => {
        const item = q as Record<string, unknown>;
        return {
          questionNumber:
            typeof item.questionNumber === 'number' ? item.questionNumber : idx + 1,
          question: sanitizeString(item.question, 300),
          rationale: sanitizeString(item.rationale, 300),
          suggestedObjective: sanitizeString(item.suggestedObjective, 300),
        };
      });
  }

  return result;
}
