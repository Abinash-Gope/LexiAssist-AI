/**
 * Legal Text & Clause Parser Utility
 * Extracts sections, numbered clauses, and structure.
 * Strict isolation - Pure TypeScript.
 */

import { ContractClause, RiskSeverity } from '../types/contract.types';

export function parseRawContractText(rawText: string): ContractClause[] {
  const lines = rawText.split('\n');
  const clauses: ContractClause[] = [];

  // Regex pattern matching Section or Article prefixes like "Section 12.2:", "Clause 4:", "Article IV."
  const sectionRegex = /^(?:Section|Article|Clause|\d+\.)\s*(\d+(?:\.\d+)*)?[:.\s\-]+([^\n\r.]+)/i;

  let currentSection = 'Section 1.0';
  let currentTitle = 'General Provisions';
  let currentBuffer: string[] = [];
  let clauseIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const match = line.match(sectionRegex);
    if (match) {
      if (currentBuffer.length > 0) {
        const text = currentBuffer.join(' ');
        clauses.push(buildClause(clauseIndex++, currentSection, currentTitle, text));
        currentBuffer = [];
      }
      currentSection = match[1] ? `Section ${match[1]}` : `Section ${clauseIndex + 1}.0`;
      currentTitle = match[2] ? match[2].trim() : 'Provision';
      currentBuffer.push(line);
    } else {
      currentBuffer.push(line);
    }
  }

  if (currentBuffer.length > 0) {
    const text = currentBuffer.join(' ');
    clauses.push(buildClause(clauseIndex++, currentSection, currentTitle, text));
  }

  return clauses;
}

function buildClause(index: number, section: string, title: string, text: string): ContractClause {
  // Simple heuristic baseline categorization for newly uploaded raw text
  const lower = text.toLowerCase();
  let severity: RiskSeverity = 'LOW';
  let identifiedRisk: string | undefined;

  if (
    lower.includes('indemnify') ||
    lower.includes('hold harmless') ||
    lower.includes('unilateral') ||
    lower.includes('automatic renewal') ||
    lower.includes('penalty') ||
    lower.includes('liquidated damages') ||
    lower.includes('gross negligence')
  ) {
    severity = 'HIGH';
    identifiedRisk = 'Potential high liability or automatic financial commitment.';
  } else if (
    lower.includes('arbitration') ||
    lower.includes('waiver of jury') ||
    lower.includes('remedy') ||
    lower.includes('inspection') ||
    lower.includes('notice period')
  ) {
    severity = 'MEDIUM';
    identifiedRisk = 'Procedural constraint or shortened dispute window.';
  }

  return {
    id: `clause-${index + 1}`,
    sectionNumber: section,
    title: title,
    originalText: text,
    plainEnglishSummary: `Outlines terms and conditions governing ${title.toLowerCase()}.`,
    severity,
    identifiedRisk,
  };
}
