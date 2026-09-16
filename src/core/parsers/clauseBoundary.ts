/**
 * Legal Text & Clause Parser Utility
 * Extracts sections, numbered clauses, and structure.
 * Strict isolation - Pure TypeScript.
 */

import { ContractClause, RiskSeverity } from '../types/contract.types';

export function parseRawContractText(rawText: string): ContractClause[] {
  if (!rawText || !rawText.trim()) return [];

  // Normalize line endings and clean any binary markers if extracted from files
  const cleanText = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = cleanText.split('\n');
  const clauses: ContractClause[] = [];

  // Pattern 1: Explicit prefixes: "Section 1.1: Title", "Article II - Term", "Clause 4. Payment", "1.1 Rent Due"
  const prefixRegex = /^(?:Section|Article|Clause|\d+\.)\s*([0-9IVXLCDM]+(?:\.[0-9IVXLCDM]+)*)?[:.\s\-]+([^\n\r.]{3,})/i;

  // Pattern 2: Standard legal uppercase headers (e.g. "INDEMNIFICATION", "GOVERNING LAW & VENUE")
  const capsHeaderRegex = /^(?:[0-9IVXLCDM]+[.)\s]+)?([A-Z\s&/]{4,50})(?::|\s*$)/;

  let currentSection = '';
  let currentTitle = '';
  let currentBuffer: string[] = [];
  let clauseIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) {
      // Paragraph separator
      continue;
    }

    // Check for Section/Article pattern
    const prefixMatch = line.match(prefixRegex);
    const capsMatch = !prefixMatch && line.length < 60 ? line.match(capsHeaderRegex) : null;

    if (prefixMatch || capsMatch) {
      if (currentBuffer.length > 0 && currentTitle) {
        const text = currentBuffer.join(' ').trim();
        if (text.length > 15) {
          clauses.push(buildClause(clauseIndex++, currentSection, currentTitle, text));
        }
        currentBuffer = [];
      }

      if (prefixMatch) {
        currentSection = prefixMatch[1] ? `Section ${prefixMatch[1]}` : `Section ${clauseIndex + 1}.0`;
        currentTitle = prefixMatch[2] ? prefixMatch[2].trim() : 'Provision';
      } else if (capsMatch) {
        currentSection = `Section ${clauseIndex + 1}.0`;
        currentTitle = toTitleCase(capsMatch[1].trim());
      }
      currentBuffer.push(line);
    } else {
      if (!currentTitle) {
        // Document title or preamble before first section
        currentSection = 'Preamble / Recitals';
        currentTitle = 'Agreement Overview & Parties';
      }
      currentBuffer.push(line);
    }
  }

  // Push final buffer
  if (currentBuffer.length > 0) {
    const text = currentBuffer.join(' ').trim();
    if (text.length > 10) {
      clauses.push(buildClause(clauseIndex++, currentSection || 'Section 1.0', currentTitle || 'General Terms', text));
    }
  }

  // Fallback: If document had no identifiable sections, split by paragraphs
  if (clauses.length <= 1 && cleanText.length > 200) {
    const paragraphs = cleanText
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p.length > 30);

    if (paragraphs.length > 1) {
      return paragraphs.map((p, idx) => {
        const firstLine = p.split('\n')[0].replace(/[:\-]/g, '').trim();
        const title = firstLine.length > 5 && firstLine.length < 50 ? firstLine : `Provision ${idx + 1}`;
        return buildClause(idx, `Section ${idx + 1}.0`, title, p);
      });
    }
  }

  return clauses;
}

function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildClause(index: number, section: string, title: string, text: string): ContractClause {
  const lower = (title + ' ' + text).toLowerCase();
  let severity: RiskSeverity = 'LOW';
  let identifiedRisk: string | undefined;
  let counterProposal: string | undefined;
  let plainSummary = `Outlines terms and conditions governing ${title.toLowerCase()}.`;

  // High Risk Pattern 1: Uncapped Indemnity or Negligence
  if (
    lower.includes('indemn') ||
    lower.includes('hold harmless') ||
    lower.includes('gross negligence') ||
    lower.includes('uncapped')
  ) {
    severity = 'HIGH';
    identifiedRisk = 'Potential unilateral indemnification transfer exposing party to uncapped legal liabilities.';
    plainSummary = 'You agree to defend and pay for legal costs, claims, and damages, which could expose you to massive financial liability.';
    counterProposal = 'Mutual Indemnification: Each party shall defend and indemnify the other solely against third-party claims resulting directly from their own gross negligence or willful misconduct, with total liability capped at fees paid.';
  }
  // High Risk Pattern 2: Automatic Renewal & Escalation
  else if (
    lower.includes('automatic renewal') ||
    lower.includes('automatically renew') ||
    lower.includes('escalat') ||
    (lower.includes('renewal') && lower.includes('notice'))
  ) {
    severity = 'HIGH';
    identifiedRisk = 'Automatic multi-year term renewal with mandatory price escalation if notice window is missed.';
    plainSummary = 'The agreement renews automatically without explicit consent unless written cancellation is provided within a narrow window.';
    counterProposal = 'Agreement transitions to a Month-to-Month term upon expiration with thirty (30) days notice to terminate. Any rate adjustment shall not exceed 3.5% or regional CPI.';
  }
  // High Risk Pattern 3: Restrictive Non-Compete & Restraint of Trade
  else if (
    lower.includes('non-compete') ||
    lower.includes('not compete') ||
    lower.includes('restraint of trade') ||
    (lower.includes('solicit') && lower.includes('worldwide'))
  ) {
    severity = 'HIGH';
    identifiedRisk = 'Overly broad non-compete covenant restricting professional activities post-termination.';
    plainSummary = 'Prohibits you from working with competing companies or in your industry for an extended duration.';
    counterProposal = 'Restrictive Covenants: Neither party shall actively solicit direct employees during the active term. No geographic or trade restraint shall restrict post-termination contracting.';
  }
  // High Risk Pattern 4: Universal IP Expropriation
  else if (
    lower.includes('work-for-hire') ||
    lower.includes('inventions') ||
    lower.includes('perpetuity') ||
    (lower.includes('intellectual property') && (lower.includes('assign') || lower.includes('transfer')))
  ) {
    severity = 'HIGH';
    identifiedRisk = 'Universal transfer of pre-existing background toolkits, software frameworks, and personal know-how.';
    plainSummary = 'Requires transfer of all inventions and tools to the counterparty, potentially including pre-existing developer code.';
    counterProposal = 'Consultant retains all ownership of pre-existing tools, libraries, and frameworks. Client receives a non-exclusive license solely for deliverable utilization.';
  }
  // Medium Risk Pattern 1: Unilateral Termination
  else if (
    lower.includes('termination') ||
    lower.includes('terminate without cause') ||
    lower.includes('right to terminate')
  ) {
    severity = 'MEDIUM';
    identifiedRisk = 'Unilateral termination rights without reciprocal cancellation privileges or cure period.';
    plainSummary = 'Sets termination procedures; verify that both parties have fair notice and a 30-day window to cure defaults.';
    counterProposal = 'Either party may terminate for convenience with thirty (30) days advance written notice, and for material breach following a 30-day cure period.';
  }
  // Medium Risk Pattern 2: Payment Delays & Retainage
  else if (
    lower.includes('net-60') ||
    lower.includes('net-90') ||
    lower.includes('holdback') ||
    lower.includes('retainage') ||
    lower.includes('verification period')
  ) {
    severity = 'MEDIUM';
    identifiedRisk = 'Excessive payment verification periods (Net-60/Net-90) or unilateral fee holdbacks.';
    plainSummary = 'Payment disbursements are significantly delayed or subject to discretionary withholding.';
    counterProposal = 'Invoices shall be disbursed within thirty (30) calendar days of receipt (Net-30). No retainage shall be withheld without mutual written agreement.';
  }
  // Medium Risk Pattern 3: Dispute Resolution & Foreign Arbitration
  else if (
    lower.includes('arbitration') ||
    lower.includes('venue') ||
    lower.includes('jurisdiction') ||
    lower.includes('waiver of jury')
  ) {
    severity = 'MEDIUM';
    identifiedRisk = 'Mandatory binding arbitration in distant forum or unilateral fee-shifting provisions.';
    plainSummary = 'Specifies legal dispute mechanisms; arbitration in remote locations can make disputes prohibitively expensive.';
    counterProposal = 'Any dispute shall first be submitted to good-faith mediation in a mutually agreed neutral jurisdiction, with each party bearing its own costs.';
  }

  return {
    id: `clause-${index + 1}`,
    sectionNumber: section,
    title: title,
    originalText: text,
    plainEnglishSummary: plainSummary,
    severity,
    identifiedRisk,
    counterProposal,
  };
}
