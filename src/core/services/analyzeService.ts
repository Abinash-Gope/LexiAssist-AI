/**
 * Contract Analysis Service
 * Orchestrates deterministic clause parsing with optional AI enhancement.
 * Returns a fully populated ContractDocument, guaranteed to be non-null.
 * Strict isolation - Pure TypeScript, zero React imports.
 */

import { ENV } from '../config/env';
import { ContractDocument } from '../types/contract.types';
import { RESIDENTIAL_LEASE_PRESET, FREELANCE_MSA_PRESET } from '../presets/sampleContracts';
import { parseRawContractText } from '../parsers/clauseBoundary';
import { callNvidiaNim } from './nimClient';
import { validateAiAnalysisResponse } from '../utils/aiResponseValidator';
import { RISK_SCORING } from '../config/scoring.constants';

export async function analyzeContract(
  contractText: string,
  title: string
): Promise<ContractDocument> {
  if (!contractText || contractText.trim().length === 0) {
    return RESIDENTIAL_LEASE_PRESET;
  }

  // Short-circuit for preset text to avoid redundant AI calls
  if (
    contractText.includes('RESIDENTIAL LEASE AGREEMENT') &&
    contractText.includes('Mercer Street')
  ) {
    return RESIDENTIAL_LEASE_PRESET;
  }
  if (
    contractText.includes('MASTER SERVICES AGREEMENT') &&
    contractText.includes('Apex Media')
  ) {
    return FREELANCE_MSA_PRESET;
  }

  // 1. Deterministic parse — always succeeds, zero network dependency
  const parsedClauses = parseRawContractText(contractText);

  const highRiskCount = parsedClauses.filter((c) => c.severity === 'HIGH').length;
  const mediumRiskCount = parsedClauses.filter((c) => c.severity === 'MEDIUM').length;
  const lowRiskCount = parsedClauses.filter((c) => c.severity === 'LOW').length;

  let calculatedScore =
    RISK_SCORING.ANALYZE_BASELINE_SCORE -
    highRiskCount * RISK_SCORING.HIGH_WEIGHT -
    mediumRiskCount * RISK_SCORING.MEDIUM_WEIGHT;
  calculatedScore = Math.max(
    RISK_SCORING.ANALYZE_MIN_SCORE,
    Math.min(RISK_SCORING.ANALYZE_MAX_SCORE, calculatedScore)
  );

  // Basic metadata extraction from raw text
  let detectedJurisdiction = 'Delaware / General Commercial Jurisdiction';
  const jurMatch = contractText.match(/Jurisdiction:\s*([^\n\r]+)/i);
  if (jurMatch?.[1]) detectedJurisdiction = jurMatch[1].trim();

  let partyA = 'Client / Disclosing Party';
  let partyB = 'Service Provider / Contractor';
  const partiesMatch = contractText.match(/Parties:\s*([^\n\r]+)/i);
  if (partiesMatch?.[1]) {
    const parts = partiesMatch[1].split(/\band\b|\bvs\.?\b/i);
    if (parts.length >= 2) {
      partyA = parts[0].trim();
      partyB = parts[1].trim();
    }
  }

  const baselineDoc: ContractDocument = {
    id: `custom-doc-${Date.now()}`,
    title: title || 'Custom Uploaded Agreement',
    category: 'CUSTOM',
    jurisdiction: detectedJurisdiction,
    parties: { firstParty: partyA, secondParty: partyB },
    effectiveDate: new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
    overallScore: calculatedScore,
    totalClauses: parsedClauses.length,
    riskSummary: { highRiskCount, mediumRiskCount, lowRiskCount },
    rawText: contractText,
    clauses: parsedClauses,
    sections: [],
  };

  // 2. Fast non-blocking AI enhancement (3.5s timeout)
  if (ENV.NVIDIA_NIM_API_KEY) {
    try {
      const nimResponse = await callNvidiaNim(
        [
          {
            role: 'system',
            content: 'You are LexiAssist AI, a legal contract analysis engine. Output only valid JSON.',
          },
          {
            role: 'user',
            content: `Analyze this contract excerpt: ${contractText.slice(0, 3000)}. Return JSON: { "overallScore": number (0-100), "jurisdiction": string, "parties": { "firstParty": string, "secondParty": string } }`,
          },
        ],
        { timeoutMs: 3500, maxTokens: 400 }
      );

      if (nimResponse) {
        const cleanJson = nimResponse.replace(/```json/gi, '').replace(/```/g, '').trim();
        const validated = validateAiAnalysisResponse(JSON.parse(cleanJson));
        if (validated.overallScore !== undefined) baselineDoc.overallScore = validated.overallScore;
        if (validated.jurisdiction) baselineDoc.jurisdiction = validated.jurisdiction;
        if (validated.parties) baselineDoc.parties = validated.parties;
      }
    } catch {
      // AI enhancement timed out; baselineDoc is fully functional
    }
  }

  return baselineDoc;
}
