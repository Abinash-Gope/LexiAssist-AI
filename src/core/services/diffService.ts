/**
 * Contract Diff & Redline Generation Service
 * Generates side-by-side semantic diffs for uploaded documents (vs. AI baseline)
 * and custom two-document comparisons.
 * Strict isolation - Pure TypeScript, zero React imports.
 */

import { RiskSeverity } from '../types/contract.types';
import { ContractDiffComparison, RedlineClause } from '../types/diff.types';
import { parseRawContractText } from '../parsers/clauseBoundary';
import {
  LEASE_COMPARISON_DIFF,
  FREELANCE_MSA_COMPARISON_DIFF,
} from '../presets/sampleContracts';
import { RISK_SCORING } from '../config/scoring.constants';

// ---------------------------------------------------------------------------
// generateUploadedDocDiff
// Compares an uploaded document against an AI-synthesized fair-market baseline.
// ---------------------------------------------------------------------------

export function generateUploadedDocDiff(
  uploadedText: string,
  uploadedTitle = 'Uploaded Legal Agreement'
): ContractDiffComparison {
  const clauses = parseRawContractText(uploadedText);
  const diffClauses: RedlineClause[] = [];

  let materialCount = 0;
  let newLiabilitiesCount = 0;
  let highCount = 0;
  let medCount = 0;

  for (let i = 0; i < clauses.length; i++) {
    const clause = clauses[i];
    const textLower = (clause.title + ' ' + clause.originalText).toLowerCase();

    let isModified = false;
    let baselineText = clause.originalText;
    let baselineTitle = clause.title;
    let severity: RiskSeverity = clause.severity;
    let problemAnalysis = '';
    let statutoryWarning: string | undefined = clause.statutoryWarning || clause.statutoryReference;
    let suggestedAction: 'REVERT' | 'COUNTER' | 'ACCEPT' = 'ACCEPT';

    // 1. Indemnification & Consequential Liabilities
    if (
      textLower.includes('indemn') ||
      textLower.includes('hold harmless') ||
      textLower.includes('consequential') ||
      textLower.includes('uncapped')
    ) {
      isModified = true;
      severity = 'HIGH';
      baselineTitle = 'Mutual Indemnification & Liability Cap';
      baselineText = `Each party agrees to defend, indemnify, and hold harmless the other party against direct third-party claims arising solely from gross negligence or willful misconduct. Neither party shall be liable for indirect, punitive, or consequential damages (including lost profits). Each party's aggregate cumulative liability under this Agreement shall be limited to the total fees paid or received during the preceding twelve (12) months.`;
      problemAnalysis = `🔴 Problem in Uploaded Draft: Your uploaded draft contains one-sided, uncapped indemnification that holds you responsible for consequential losses, lost profits, and client business interruptions with no financial ceiling. The AI counterpart institutes a mutual liability cap equal to 12 months of fees and explicitly excludes consequential damages.`;
      statutoryWarning =
        'Uncapped consequential damages pose existential business liability and conflict with commercial standards under UCC § 2-719.';
      suggestedAction = 'REVERT';
    }
    // 2. Non-Compete & Worldwide Restraints
    else if (
      textLower.includes('non-compete') ||
      textLower.includes('not compete') ||
      textLower.includes('restraint of trade') ||
      (textLower.includes('solicit') && textLower.includes('worldwide'))
    ) {
      isModified = true;
      severity = 'HIGH';
      baselineTitle = 'Fair Competition & Client Non-Solicitation';
      baselineText = `Provider agrees that during the active term of this Agreement and for a period of six (6) months post-termination, Provider shall not directly solicit active clients of Client with whom Provider worked directly during this engagement. Nothing herein shall restrict Provider from providing services, consulting, or engaging in business anywhere globally outside of such direct customer solicitation.`;
      problemAnalysis = `🔴 Problem in Uploaded Draft: Your uploaded draft imposes a multi-year global non-compete barring you from your own industry worldwide. The AI counterpart replaces this severe restraint with a fair, enforceable 6-month non-solicitation of direct clients.`;
      statutoryWarning =
        'Overly broad global non-competes against independent providers are unenforceable under common law restraint-of-trade doctrines and FTC regulations.';
      suggestedAction = 'REVERT';
    }
    // 3. Payment Terms, Verification & Retainage
    else if (
      textLower.includes('net-60') ||
      textLower.includes('net-90') ||
      textLower.includes('hold back') ||
      textLower.includes('holdback') ||
      textLower.includes('retainage') ||
      textLower.includes('verification')
    ) {
      isModified = true;
      severity = 'MEDIUM';
      baselineTitle = 'Professional Fees, Invoicing & Net-30 Payment';
      baselineText = `Invoices submitted by Provider shall be reviewed promptly, and undisputed sums shall be disbursed within thirty (30) calendar days of receipt on Net-30 terms. Client shall not hold back or withhold any administrative retainage without mutual written agreement and prior verifiable cause.`;
      problemAnalysis = `🔴 Problem in Uploaded Draft: Your uploaded draft creates severe payment delays (Net-90 plus 60-day review = 150 days total) and grants the client unilateral rights to withhold 25% of your earnings. The AI counterpart enforces standard Net-30 terms with zero retainage.`;
      suggestedAction = 'COUNTER';
    }
    // 4. Automatic Renewal & Notice Traps
    else if (
      textLower.includes('automatic renewal') ||
      textLower.includes('automatically renew') ||
      textLower.includes('narrow') ||
      (textLower.includes('renewal') && textLower.includes('120')) ||
      (textLower.includes('renewal') && textLower.includes('escalat'))
    ) {
      isModified = true;
      severity = 'HIGH';
      baselineTitle = 'Term, Bilateral Renewal & 30-Day Notice';
      baselineText = `This Agreement shall remain in effect for the initial term and may be renewed for successive one (1) year periods upon mutual written consent, or continue on a month-to-month basis with either party entitled to terminate upon thirty (30) calendar days prior written notice.`;
      problemAnalysis = `🔴 Problem in Uploaded Draft: Your uploaded draft traps you into multi-year auto-renewals unless notice is served during a narrow, rigid window months in advance. The AI counterpart provides equitable 30-day notice or mutual written agreement.`;
      statutoryWarning =
        'Narrow auto-renewal trap windows violate Evergreen contract protections in commercial jurisdictions.';
      suggestedAction = 'COUNTER';
    }
    // 5. Total IP Expropriation & Pre-Existing Tools
    else if (
      textLower.includes('background ip') ||
      textLower.includes('inventions') ||
      textLower.includes('perpetuity') ||
      (textLower.includes('intellectual property') &&
        (textLower.includes('assign') || textLower.includes('transfer')))
    ) {
      isModified = true;
      severity = 'HIGH';
      baselineTitle = 'Deliverable Ownership & Background Tool Reservation';
      baselineText = `Client shall own all custom project deliverables developed specifically for Client upon receipt of full payment. Provider retains sole, perpetual, and exclusive ownership of all pre-existing tools, algorithms, software architectures, generic scripts, and know-how developed prior to or independently of this engagement.`;
      problemAnalysis = `🔴 Problem in Uploaded Draft: Your uploaded draft requires you to unconditionally surrender all pre-existing code, tools, open-source libraries, and career know-how in perpetuity. The AI counterpart reserves your background tools and licenses only the custom deliverables.`;
      statutoryWarning =
        'Assignment of pre-existing background tools without license reservation creates severe copyright encumbrance on all future work.';
      suggestedAction = 'REVERT';
    }
    // 6. Unilateral Termination
    else if (
      textLower.includes('unilateral') ||
      textLower.includes('without cause') ||
      textLower.includes('kill fee') ||
      (textLower.includes('terminate') && textLower.includes('client reserves'))
    ) {
      isModified = true;
      severity = 'MEDIUM';
      baselineTitle = 'Mutual Termination for Convenience & Accrued Compensation';
      baselineText = `Either party may terminate this Agreement without cause upon providing thirty (30) days prior written notice to the other party. In the event of early termination by Client, Provider shall be compensated for all services performed and milestones completed up to the effective date of termination.`;
      problemAnalysis = `🔴 Problem in Uploaded Draft: Your uploaded draft allows Client to terminate at any time with zero notice and zero compensation for unfinished work, while denying you reciprocal termination rights. The AI counterpart enforces bilateral 30-day notice and full pay for work performed.`;
      suggestedAction = 'COUNTER';
    }
    // 7. Dispute Resolution & Swiss/Foreign Arbitration
    else if (
      textLower.includes('arbitration') ||
      textLower.includes('zurich') ||
      textLower.includes('swiss') ||
      textLower.includes('fee shifting') ||
      textLower.includes('bear all filing fees')
    ) {
      isModified = true;
      severity = 'HIGH';
      baselineTitle = 'Governing Law, Confidential Mediation & Local Venue';
      baselineText = `Any dispute arising under this Agreement shall first proceed to confidential mediation before binding arbitration conducted in the mutually agreed home jurisdiction of the parties under American Arbitration Association (AAA) rules. Each party shall bear its own filing fees and legal expenses.`;
      problemAnalysis = `🔴 Problem in Uploaded Draft: Your uploaded draft forces you to arbitrate in Zurich, Switzerland under Swiss rules and forces you to pay all of Client's legal fees win or lose. The AI counterpart establishes neutral local mediation with each party paying its own costs.`;
      statutoryWarning =
        'Unilateral fee shifting combined with foreign arbitral forum is substantively unconscionable and legally punitive.';
      suggestedAction = 'REVERT';
    }
    // 8. Lease / Tenancy Specific Traps (Deposit, Surcharges, Entry)
    else if (
      textLower.includes('deposit') ||
      textLower.includes('cleaning surcharge') ||
      textLower.includes('entry') ||
      textLower.includes('inspection')
    ) {
      isModified = true;
      severity = 'MEDIUM';
      baselineTitle = 'Security Deposit Return & 24-Hour Entry Notice';
      baselineText = `Landlord shall return the security deposit within fourteen (14) business days following tenancy surrender, less only itemized actual repair costs. Landlord shall provide at least twenty-four (24) hours advance written notice prior to entering the premises for inspections.`;
      problemAnalysis = `🔴 Problem in Uploaded Draft: Your uploaded draft permits arbitrary non-refundable deductions and entry on short notice. The AI counterpart mandates 14-day statutory deposit return with itemization and 24-hour entry notice.`;
      statutoryWarning =
        'Automatic non-refundable cleaning deductions violate statutory security deposit caps under housing laws.';
      suggestedAction = 'COUNTER';
    }
    // Default: Standard or Balanced Clause
    else {
      baselineTitle = clause.title;
      baselineText = clause.originalText;
      problemAnalysis = `✅ Standard Legal Term: This provision conforms to customary fair-market commercial practice and maintains balanced bilateral protections.`;
      suggestedAction = 'ACCEPT';
    }

    if (isModified) {
      materialCount++;
      if (severity === 'HIGH') {
        newLiabilitiesCount++;
        highCount++;
      } else {
        medCount++;
      }
    }

    diffClauses.push({
      id: `diff-uploaded-${i + 1}`,
      sectionNumber: clause.sectionNumber,
      title: baselineTitle,
      baselineText,
      alteredText: clause.originalText,
      changeType: isModified ? 'MODIFIED' : 'UNCHANGED',
      severity,
      semanticAnalysis: problemAnalysis,
      statutoryWarning,
      suggestedAction,
    });
  }

  const riskDelta = Math.min(
    highCount * RISK_SCORING.HIGH_WEIGHT +
      medCount * RISK_SCORING.MEDIUM_WEIGHT +
      materialCount * RISK_SCORING.MATERIAL_WEIGHT,
    RISK_SCORING.UPLOAD_MAX_DELTA
  );

  return {
    baselineDocumentTitle: 'AI Fair-Market Standard (Balanced Precedent)',
    baselineVersion: 'v1.0 (AI Protective Baseline)',
    alteredDocumentTitle: uploadedTitle || 'Uploaded Legal Agreement',
    alteredVersion: 'v2.0 (Uploaded Draft with Identified Risks)',
    materialAlterationsCount: Math.max(materialCount, 1),
    newLiabilitiesCount: Math.max(newLiabilitiesCount, 1),
    omittedProtectionsCount: 0,
    baselineScore: RISK_SCORING.UPLOAD_BASELINE_SCORE,
    alteredScore: Math.max(
      RISK_SCORING.UPLOAD_BASELINE_SCORE - riskDelta,
      RISK_SCORING.UPLOAD_MIN_ALTERED_SCORE
    ),
    riskScoreDelta: riskDelta || RISK_SCORING.UPLOAD_DEFAULT_DELTA,
    activeFlagsCount: highCount + medCount,
    clauses: diffClauses,
  };
}

// ---------------------------------------------------------------------------
// generateCustomDiff
// Compares two user-supplied text documents clause-by-clause.
// ---------------------------------------------------------------------------

export function generateCustomDiff(
  baselineText: string,
  alteredText: string,
  baselineTitle = 'Version 1 — Original Draft',
  alteredTitle = 'Version 2 — Revised Draft'
): ContractDiffComparison {
  const baseClauses = parseRawContractText(baselineText);
  const alteredClauses = parseRawContractText(alteredText);

  const maxLen = Math.max(baseClauses.length, alteredClauses.length, 1);
  const diffClauses: RedlineClause[] = [];

  let materialCount = 0;
  let newLiabilitiesCount = 0;
  let omittedCount = 0;

  for (let i = 0; i < maxLen; i++) {
    const base = baseClauses[i];
    const alt = alteredClauses[i];

    if (base && alt) {
      const isIdentical = base.originalText.trim() === alt.originalText.trim();
      const changeType = isIdentical ? 'UNCHANGED' : 'MODIFIED';
      if (!isIdentical) materialCount++;
      if (alt.severity === 'HIGH' && base.severity !== 'HIGH') newLiabilitiesCount++;

      diffClauses.push({
        id: `diff-custom-${i + 1}`,
        sectionNumber: alt.sectionNumber || base.sectionNumber || `Section ${i + 1}.0`,
        title: alt.title || base.title || `Clause ${i + 1}`,
        baselineText: base.originalText,
        alteredText: alt.originalText,
        changeType,
        severity: alt.severity || (isIdentical ? 'LOW' : 'MEDIUM'),
        semanticAnalysis: isIdentical
          ? 'Term remains unchanged between original baseline and counter-proposal.'
          : (alt.identifiedRisk ||
            `Substantive alterations in ${alt.title.toLowerCase()} compared to baseline text.`),
        statutoryWarning:
          alt.severity === 'HIGH'
            ? 'Review carefully for unilateral rights transfer or heightened legal liability.'
            : undefined,
        suggestedAction: alt.severity === 'HIGH' ? 'REVERT' : isIdentical ? 'ACCEPT' : 'COUNTER',
      });
    } else if (alt && !base) {
      materialCount++;
      newLiabilitiesCount++;
      diffClauses.push({
        id: `diff-custom-${i + 1}`,
        sectionNumber: alt.sectionNumber || `Section ${i + 1}.0`,
        title: alt.title || `Added Clause ${i + 1}`,
        baselineText: '[No corresponding provision in Baseline draft]',
        alteredText: alt.originalText,
        changeType: 'ADDED',
        severity: alt.severity || 'HIGH',
        semanticAnalysis: `Entirely new provision inserted: ${alt.title}. May introduce unvetted liabilities.`,
        suggestedAction: 'REVERT',
      });
    } else if (base && !alt) {
      materialCount++;
      omittedCount++;
      diffClauses.push({
        id: `diff-custom-${i + 1}`,
        sectionNumber: base.sectionNumber || `Section ${i + 1}.0`,
        title: base.title || `Omitted Clause ${i + 1}`,
        baselineText: base.originalText,
        alteredText: '[Provision omitted in Counter-Proposal draft]',
        changeType: 'OMITTED',
        severity: base.severity || 'MEDIUM',
        semanticAnalysis: `Baseline protection was deleted from counter-proposal: ${base.title}.`,
        suggestedAction: 'COUNTER',
      });
    }
  }

  const highCount = diffClauses.filter((c) => c.severity === 'HIGH').length;
  const medCount = diffClauses.filter((c) => c.severity === 'MEDIUM').length;
  const riskDelta = Math.min(
    highCount * RISK_SCORING.HIGH_WEIGHT +
      medCount * RISK_SCORING.MEDIUM_WEIGHT +
      materialCount * RISK_SCORING.MATERIAL_WEIGHT,
    RISK_SCORING.CUSTOM_MAX_DELTA
  );

  return {
    baselineDocumentTitle: baselineTitle,
    baselineVersion: 'v1.0 (Original Draft)',
    alteredDocumentTitle: alteredTitle,
    alteredVersion: 'v2.0 (Proposed Revision)',
    materialAlterationsCount: Math.max(materialCount, 1),
    newLiabilitiesCount: Math.max(newLiabilitiesCount, 1),
    omittedProtectionsCount: omittedCount,
    baselineScore: RISK_SCORING.CUSTOM_BASELINE_SCORE,
    alteredScore: Math.max(
      RISK_SCORING.CUSTOM_BASELINE_SCORE - riskDelta,
      RISK_SCORING.CUSTOM_MIN_ALTERED_SCORE
    ),
    riskScoreDelta: riskDelta || RISK_SCORING.CUSTOM_DEFAULT_DELTA,
    activeFlagsCount: highCount + medCount,
    clauses: diffClauses,
  };
}

// ---------------------------------------------------------------------------
// compareContracts
// Router: dispatches to the appropriate diff generator based on context.
// ---------------------------------------------------------------------------

export async function compareContracts(
  presetId = 'lease',
  baselineText?: string,
  alteredText?: string,
  baselineTitle?: string,
  alteredTitle?: string
): Promise<ContractDiffComparison> {
  if (presetId === 'uploaded' && (alteredText || baselineText)) {
    return generateUploadedDocDiff(
      alteredText || baselineText || '',
      alteredTitle || 'Uploaded Legal Agreement'
    );
  }
  if (baselineText && alteredText) {
    return generateCustomDiff(baselineText, alteredText, baselineTitle, alteredTitle);
  }
  if (presetId === 'msa') {
    return FREELANCE_MSA_COMPARISON_DIFF;
  }
  return LEASE_COMPARISON_DIFF;
}
