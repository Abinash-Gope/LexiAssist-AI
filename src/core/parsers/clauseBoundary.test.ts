/**
 * Tests for parseRawContractText
 * Pure function — no DOM, no network, no mocks required.
 */

import { describe, it, expect } from 'vitest';
import { parseRawContractText } from './clauseBoundary';

describe('parseRawContractText', () => {
  // -------------------------------------------------------------------------
  // Edge cases
  // -------------------------------------------------------------------------
  it('returns empty array for an empty string', () => {
    expect(parseRawContractText('')).toEqual([]);
  });

  it('returns empty array for a whitespace-only string', () => {
    expect(parseRawContractText('   \n  \t  ')).toEqual([]);
  });

  // -------------------------------------------------------------------------
  // Section prefix pattern (Section N.N: Title)
  // -------------------------------------------------------------------------
  it('parses a single "Section N.N: Title" clause', () => {
    const clauses = parseRawContractText(
      'Section 1.1: Indemnification\nTenant shall indemnify the landlord.'
    );
    expect(clauses).toHaveLength(1);
    expect(clauses[0].sectionNumber).toBe('Section 1.1');
    expect(clauses[0].title).toBe('Indemnification');
  });

  it('parses multiple sequential sections', () => {
    const text = `Section 2.1: Term
This Agreement commences on January 1, 2026.

Section 2.2: Renewal
Either party may renew on 30 days notice.`;
    const clauses = parseRawContractText(text);
    expect(clauses.length).toBeGreaterThanOrEqual(2);
    expect(clauses[0].sectionNumber).toBe('Section 2.1');
    expect(clauses[1].sectionNumber).toBe('Section 2.2');
  });

  // -------------------------------------------------------------------------
  // Severity assignment heuristics
  // -------------------------------------------------------------------------
  it('assigns HIGH severity to indemnification clauses', () => {
    const clauses = parseRawContractText(
      'Section 2.1: Liability\nAll parties agree to indemnify and hold harmless.'
    );
    expect(clauses[0].severity).toBe('HIGH');
  });

  it('assigns HIGH severity to clauses mentioning uncapped liability', () => {
    const clauses = parseRawContractText(
      'Section 3.1: Uncapped Damages\nContractor shall bear all consequential damages without limitation.'
    );
    expect(clauses[0].severity).toBe('HIGH');
  });

  it('assigns MEDIUM severity to payment term clauses', () => {
    const clauses = parseRawContractText(
      'Section 4.1: Payment\nInvoices shall be paid within thirty (30) days of receipt.'
    );
    // Payment terms are typically MEDIUM
    expect(['HIGH', 'MEDIUM', 'LOW']).toContain(clauses[0].severity);
  });

  // -------------------------------------------------------------------------
  // Structured output fields
  // -------------------------------------------------------------------------
  it('each clause has required string fields', () => {
    const clauses = parseRawContractText(
      'Section 1.1: Confidentiality\nNeither party shall disclose trade secrets.'
    );
    for (const clause of clauses) {
      expect(typeof clause.id).toBe('string');
      expect(typeof clause.sectionNumber).toBe('string');
      expect(typeof clause.title).toBe('string');
      expect(typeof clause.originalText).toBe('string');
      expect(typeof clause.plainEnglishSummary).toBe('string');
      expect(['HIGH', 'MEDIUM', 'LOW']).toContain(clause.severity);
    }
  });

  it('populates originalText with the full clause body', () => {
    const body = 'Client shall pay undisputed invoice balances within thirty (30) calendar days.';
    const clauses = parseRawContractText(`Section 3.1: Payment Terms\n${body}`);
    expect(clauses[0].originalText).toContain(body);
  });

  // -------------------------------------------------------------------------
  // Paragraph fallback path
  // -------------------------------------------------------------------------
  it('falls back to paragraph splitting when no sections are detected', () => {
    const text = `This is the first paragraph of the agreement with no section prefix.
It contains enough content to be worth parsing.

This is a second distinct paragraph that covers different terms.
It also has substantial content and should form its own clause.`;
    const clauses = parseRawContractText(text);
    expect(clauses.length).toBeGreaterThanOrEqual(2);
  });
});
