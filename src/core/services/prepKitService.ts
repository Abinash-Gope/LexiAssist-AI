/**
 * Lawyer Prep Kit Synthesis Service
 * Generates structured lawyer consultation guides from contract analysis data.
 * Uses NVIDIA NIM for AI enhancement with deterministic local fallback.
 * Strict isolation - Pure TypeScript, zero React imports.
 */

import { ENV } from '../config/env';
import { ContractDocument } from '../types/contract.types';
import { PrepKitData } from '../types/chat.types';
import {
  RESIDENTIAL_LEASE_PRESET,
  FREELANCE_MSA_PRESET,
  SAMPLE_PREP_KIT_DATA,
  FREELANCE_MSA_PREP_KIT_DATA,
} from '../presets/sampleContracts';
import { callNvidiaNim } from './nimClient';
import { validateAiPrepKitResponse } from '../utils/aiResponseValidator';

export function synthesizeLocalPrepKit(document: ContractDocument): PrepKitData {
  const highAndMedClauses = document.clauses.filter(
    (c) => c.severity === 'HIGH' || c.severity === 'MEDIUM'
  );

  const questions: Array<{
    questionNumber: number;
    question: string;
    rationale: string;
    suggestedObjective: string;
  }> = [];

  // Reuse the filtered list throughout to avoid redundant passes
  const sourceClauses = highAndMedClauses.length > 0 ? highAndMedClauses : document.clauses;

  sourceClauses.slice(0, 4).forEach((c, idx) => {
    const textLower = (c.title + ' ' + c.originalText).toLowerCase();
    let q = `How do we modify or strike ${c.sectionNumber} (${c.title}) to reduce unilateral legal exposure?`;
    let rationale = c.identifiedRisk || c.plainEnglishSummary;
    let objective = c.counterProposal
      ? `Adopt counter-proposal: ${c.counterProposal.slice(0, 80)}...`
      : 'Negotiate mutual balanced terms.';

    if (textLower.includes('indemn') || textLower.includes('liab')) {
      q = `How can we cap our liability and exclude indirect lost profits in ${c.sectionNumber} (${c.title})?`;
      rationale = 'Uncapped indemnification poses enterprise existential risk if litigation arises.';
      objective = 'Cap aggregate liability to fees paid and mandate mutual exclusion of consequential damages.';
    } else if (textLower.includes('renew') || textLower.includes('term')) {
      q = `Does ${c.sectionNumber} comply with statutory reminder notices, and can we transition to month-to-month?`;
      rationale = 'Automatic lock-in periods without written reminders violate statutory provisions in multiple jurisdictions.';
      objective = 'Require 30-day written notice and transition to month-to-month upon expiration.';
    } else if (
      textLower.includes('ip') ||
      textLower.includes('patent') ||
      textLower.includes('invention') ||
      textLower.includes('copyright')
    ) {
      q = `How do we carve out pre-existing background tools and frameworks from ${c.sectionNumber} (${c.title})?`;
      rationale = 'Broad IP assignment clauses can inadvertently surrender developer toolkits and independent know-how.';
      objective = 'Retain ownership of background IP and grant a non-exclusive license only.';
    } else if (textLower.includes('compete') || textLower.includes('solicit')) {
      q = `Is the restrictive covenant in ${c.sectionNumber} legally enforceable, and should it be narrowed?`;
      rationale = 'Post-termination non-competes are increasingly voided under recent statutory rules and state law.';
      objective = 'Strike the non-compete or limit strictly to non-solicitation of active customers.';
    } else if (
      textLower.includes('pay') ||
      textLower.includes('fee') ||
      textLower.includes('invoic')
    ) {
      q = `Can we reduce payment terms in ${c.sectionNumber} from delayed terms to standard Net-30?`;
      rationale = 'Excessive payment delays force contractors to finance client operations.';
      objective = 'Enforce standard Net-30 payment with statutory interest on overdue balances.';
    }

    questions.push({ questionNumber: idx + 1, question: q, rationale, suggestedObjective: objective });
  });

  if (questions.length === 0) {
    questions.push(
      {
        questionNumber: 1,
        question: 'Are there standard statutory protections in this jurisdiction that override these contract terms?',
        rationale: 'Local statutes often supersede contractual provisions regarding consumer or contractor rights.',
        suggestedObjective: 'Verify comprehensive statutory compliance.',
      },
      {
        questionNumber: 2,
        question: 'What is the dispute resolution procedure and where is venue located?',
        rationale: 'Arbitration in distant jurisdictions increases litigation expenses significantly.',
        suggestedObjective: 'Specify local neutral venue and mutual mediation.',
      }
    );
  }

  // Reuse `sourceClauses` to avoid a second .filter() call
  const keyRisks = sourceClauses.slice(0, 6).map((c) => ({
    section: c.sectionNumber,
    level: (c.severity === 'HIGH' || c.severity === 'MEDIUM' ? c.severity : 'MEDIUM') as
      | 'HIGH'
      | 'MEDIUM',
    summary: c.title,
    identifiedRisk: c.identifiedRisk || c.plainEnglishSummary,
  }));

  const recommendedCounterClauses = document.clauses
    .filter((c) => c.counterProposal)
    .slice(0, 4)
    .map((c) => ({
      section: c.sectionNumber,
      currentTerm: c.originalText.slice(0, 100) + '...',
      proposedTerm: c.counterProposal || '',
    }));

  return {
    documentTitle: document.title,
    parties: document.parties,
    jurisdiction: document.jurisdiction,
    effectiveDate: document.effectiveDate,
    overallScore: document.overallScore,
    executiveSummary: `Analysis of ${document.title} (${document.jurisdiction}) identified ${document.riskSummary.highRiskCount} high-risk provisions and ${document.riskSummary.mediumRiskCount} cautionary clauses. The primary exposures involve ${sourceClauses
      .map((c) => c.title)
      .slice(0, 2)
      .join(' and ')}. Consult counsel on the targeted questions below before signing.`,
    keyRisks,
    topConsultationQuestions: questions,
    recommendedCounterClauses,
  };
}

export async function generatePrepKit(document: ContractDocument): Promise<PrepKitData> {
  if (document.id === RESIDENTIAL_LEASE_PRESET.id) return SAMPLE_PREP_KIT_DATA;
  if (document.id === FREELANCE_MSA_PRESET.id) return FREELANCE_MSA_PREP_KIT_DATA;

  // 1. Immediately synthesize a high-quality deterministic kit
  const localKit = synthesizeLocalPrepKit(document);

  // 2. Fast non-blocking AI enhancement (3s timeout)
  if (ENV.NVIDIA_NIM_API_KEY) {
    try {
      const prepKitPrompt = `You are LexiAssist AI. Based on this legal document analysis:
Title: ${document.title}
High Risk Count: ${document.riskSummary.highRiskCount}
Clauses:
${document.clauses
  .slice(0, 6)
  .map((c) => `${c.sectionNumber} (${c.title}): ${c.originalText.slice(0, 150)}`)
  .join('\n')}

Generate the Top 3 strategic consultation questions for a lawyer consultation.
Return strict JSON with this shape:
{
  "executiveSummary": "Concise 2-sentence executive summary of risks",
  "questions": [
    {
      "questionNumber": 1,
      "question": "The question to ask",
      "rationale": "Why this matters",
      "suggestedObjective": "Negotiation goal"
    }
  ]
}`;

      const aiPrep = await callNvidiaNim(
        [
          { role: 'system', content: 'You output only valid JSON.' },
          { role: 'user', content: prepKitPrompt },
        ],
        { timeoutMs: 3000, maxTokens: 600 }
      );

      if (aiPrep) {
        const clean = aiPrep.replace(/```json/gi, '').replace(/```/g, '').trim();
        const validated = validateAiPrepKitResponse(JSON.parse(clean));
        if (validated.questions && validated.questions.length > 0) {
          localKit.topConsultationQuestions = validated.questions;
          if (validated.executiveSummary) localKit.executiveSummary = validated.executiveSummary;
        }
      }
    } catch {
      // AI enhancement timed out; localKit is already fully populated
    }
  }

  return localKit;
}
