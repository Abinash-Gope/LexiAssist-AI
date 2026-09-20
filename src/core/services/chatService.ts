/**
 * Grounded Contract Q&A Chat Service
 * Answers user questions strictly grounded in the provided contract document,
 * with citation support. Uses NVIDIA NIM → Gemini → deterministic fallback.
 * Strict isolation - Pure TypeScript, zero React imports.
 */

import { ENV } from '../config/env';
import { ContractDocument } from '../types/contract.types';
import { ChatMessage, CitationSource } from '../types/chat.types';
import { callNvidiaNim } from './nimClient';

/** Legal keyword stems for clause-to-question matching */
const KEYWORD_PAIRS: ReadonlyArray<[string, string]> = [
  ['renew', 'renew'],
  ['escalat', 'escalat'],
  ['indemn', 'indemn'],
  ['deposit', 'deposit'],
  ['clean', 'clean'],
  ['rent', 'rent'],
  ['enter', 'enter'],
  ['notic', 'notic'],
  ['fee', 'fee'],
  ['late', 'late'],
  ['non-compete', 'non-compete'],
  ['ip', 'ip'],
  ['pay', 'pay'],
];

/** Topics clearly outside the scope of a contract document */
const OUT_OF_SCOPE_TERMS = ['weather', 'president', 'bitcoin', 'football', 'dinner', 'recipe'];

function buildMatchedClauses(
  document: ContractDocument,
  queryLower: string
): CitationSource[] {
  const matched: CitationSource[] = [];
  for (const clause of document.clauses) {
    const textLower = (
      clause.originalText +
      ' ' +
      clause.title +
      ' ' +
      clause.plainEnglishSummary
    ).toLowerCase();

    const hasMatch = KEYWORD_PAIRS.some(
      ([queryKw, textKw]) => queryLower.includes(queryKw) && textLower.includes(textKw)
    );

    if (hasMatch) {
      matched.push({
        clauseId: clause.id,
        sectionNumber: clause.sectionNumber,
        title: clause.title,
        quoteSnippet: clause.originalText.slice(0, 160) + '...',
      });
    }
  }
  return matched;
}

function buildTimestamp(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function buildDeterministicAnswer(document: ContractDocument, matchedClauses: CitationSource[]): string {
  if (matchedClauses.length === 0) {
    return `Based on a review of **${document.title}**, there is no explicit clause specifically dictating that exact question. However, standard statutory protections in ${document.jurisdiction} may apply. You may wish to include this question in your Lawyer Prep Kit.`;
  }

  const primary = document.clauses.find((c) => c.id === matchedClauses[0].clauseId);
  let text = `According to **${primary?.sectionNumber} (${primary?.title})**, ${primary?.plainEnglishSummary}`;
  if (primary?.identifiedRisk) {
    text += `\n\n⚠️ **Risk Note:** ${primary.identifiedRisk}`;
  }
  if (primary?.statutoryReference) {
    text += `\n\n⚖️ **Legal Benchmark:** ${primary.statutoryReference}`;
  }
  return text;
}

export async function askContractQuestion(
  document: ContractDocument,
  question: string
): Promise<ChatMessage> {
  const queryLower = question.toLowerCase();
  const matchedClauses = buildMatchedClauses(document, queryLower);

  // Reject clearly out-of-scope topics
  const isOutOfScope =
    matchedClauses.length === 0 &&
    OUT_OF_SCOPE_TERMS.some((term) => queryLower.includes(term));

  if (isOutOfScope) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'ASSISTANT',
      text: 'This document does not contain information regarding this topic. LexiAssist AI is grounded strictly in the provided legal agreement. Please consult the document provisions or seek qualified legal counsel for outside matters.',
      timestamp: buildTimestamp(),
      isUngroundedFallback: true,
    };
  }

  // Build a focused context — only matched clauses for efficiency; fall back to
  // the first 8 clauses if no keyword match was found.
  const matchedIds = new Set(matchedClauses.map((m) => m.clauseId));
  const contextClauses =
    matchedIds.size > 0
      ? document.clauses.filter((c) => matchedIds.has(c.id))
      : document.clauses.slice(0, 8);

  const clauseContext = contextClauses
    .map((c) => `[${c.sectionNumber} - ${c.title}]: ${c.originalText}`)
    .join('\n\n');

  // 1. Live AI Answering via NVIDIA NIM
  if (ENV.NVIDIA_NIM_API_KEY) {
    try {
      const systemPrompt = `You are LexiAssist AI, a legal document copilot.
You answer user questions strictly based on the provided contract text.
Always cite the relevant Section Number and Title in your answer.
Do not invent or assume terms not in the document.
Keep the explanation clear, objective, and in plain English.
Contract title: "${document.title}".
Jurisdiction: "${document.jurisdiction}".`;

      const userPrompt = `Document Clauses:\n${clauseContext}\n\nUser Question: "${question}"\n\nProvide a concise answer citing the relevant section:`;

      const aiAnswer = await callNvidiaNim(
        [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        { maxTokens: 600 }
      );

      if (aiAnswer) {
        return {
          id: `msg-${Date.now()}`,
          sender: 'ASSISTANT',
          text: aiAnswer,
          citations: matchedClauses.slice(0, 2),
          timestamp: buildTimestamp(),
        };
      }
    } catch (err) {
      console.warn('NVIDIA NIM chat failed, trying Gemini/fallback:', err);
    }
  }

  // 2. Live AI Answering via Google Gemini
  if (ENV.GEMINI_API_KEY) {
    try {
      const geminiPrompt = `You are LexiAssist AI, a legal document copilot.
Answer the user's question strictly based on the following contract clauses.
Always cite the relevant Section Number and Title in bold.
Contract: "${document.title}".
Clauses:\n${clauseContext}\n\nQuestion: "${question}"`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${ENV.GEMINI_MODEL}:generateContent?key=${ENV.GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: geminiPrompt }] }] }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text as string | undefined;
        if (text) {
          return {
            id: `msg-${Date.now()}`,
            sender: 'ASSISTANT',
            text,
            citations: matchedClauses.slice(0, 2),
            timestamp: buildTimestamp(),
          };
        }
      }
    } catch (err) {
      console.warn('Gemini chat call failed:', err);
    }
  }

  // 3. Deterministic fallback grounded in matched clauses
  return {
    id: `msg-${Date.now()}`,
    sender: 'ASSISTANT',
    text: buildDeterministicAnswer(document, matchedClauses),
    citations: matchedClauses.slice(0, 2),
    timestamp: buildTimestamp(),
  };
}
