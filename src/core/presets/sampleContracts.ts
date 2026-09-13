/**
 * Pre-loaded Real-World Legal Scenarios
 * Enables instant 1-click evaluator testing for Hackathon Demo.
 * Strict isolation - Pure TypeScript.
 */

import { ContractDocument } from '../types/contract.types';
import { ContractDiffComparison } from '../types/diff.types';
import { PrepKitData } from '../types/chat.types';

export const RESIDENTIAL_LEASE_PRESET: ContractDocument = {
  id: 'preset-lease-2026',
  title: 'Residential Tenancy & Lease Agreement (2026 Standard)',
  category: 'LEASES',
  jurisdiction: 'State of New York (NY Real Property Law)',
  parties: {
    firstParty: 'Hudson Valley Realty Management LLC (Lessor)',
    secondParty: 'Tenant (Lessee)',
  },
  effectiveDate: 'October 1, 2026',
  overallScore: 62,
  totalClauses: 6,
  riskSummary: {
    highRiskCount: 2,
    mediumRiskCount: 2,
    lowRiskCount: 2,
  },
  rawText: `RESIDENTIAL LEASE AGREEMENT — STANDARD TENANCY TERMS

Section 1.0: Demised Premises & Term of Tenancy
The Lessor hereby leases to Lessee the residential premises situated at Apartment 4B, 142 Mercer Street, New York, NY for a term commencing on October 1, 2026 and concluding September 30, 2027.

Section 4.1: Rent & Payment Deadlines
Lessee agrees to pay a Monthly Base Rent of $3,200.00 USD, payable on or before the first (1st) calendar day of each month. Payments received after the 5th day shall incur an immediate flat late surcharge of $150.00 USD.

Section 6.2: Security Deposit Deductions & Return
Lessor shall hold a Security Deposit equal to one month's rent ($3,200). Return of deposit shall occur within sixty (60) business days following surrender. Lessor reserves the unilateral right to deduct a non-refundable cleaning and administrative turnover surcharge of $450.00 regardless of the premise condition upon vacancy.

Section 8.3: Landlord Right of Entry & Inspection
Lessor, its agents, and prospective purchasers may enter the demised premises at any reasonable hour with a minimum of two (2) hours verbal or electronic notice to conduct inspections or show the apartment.

Section 12.2: Automatic Lease Renewal & Mandatory Escalation
In the absence of formal written cancellation delivered via certified mail no less than ninety (90) days prior to the expiration date, this Agreement shall automatically renew for a successive twelve (12) month term. Upon such renewal, the Monthly Base Rent shall automatically escalate by fifteen percent (15.0%).

Section 14.1: Unilateral Tenant Indemnification & Legal Fees
Tenant covenants to defend, indemnify, and hold completely harmless Lessor, its affiliates, and property managers against any and all claims, actions, damages, liabilities, and legal expenses, including all attorney fees, arising out of any occurrence on the premises, including claims occasioned in whole or in part by Lessor's own negligence.`,
  clauses: [
    {
      id: 'lease-c1',
      sectionNumber: 'Section 1.0',
      title: 'Premises & Term',
      originalText: 'The Lessor hereby leases to Lessee the residential premises situated at Apartment 4B, 142 Mercer Street, New York, NY for a term commencing on October 1, 2026 and concluding September 30, 2027.',
      plainEnglishSummary: 'States the rental address and confirms a 1-year lease term from Oct 1, 2026 to Sept 30, 2027.',
      severity: 'LOW',
    },
    {
      id: 'lease-c2',
      sectionNumber: 'Section 4.1',
      title: 'Rent Due Date & Late Fee',
      originalText: 'Lessee agrees to pay a Monthly Base Rent of $3,200.00 USD, payable on or before the first (1st) calendar day of each month. Payments received after the 5th day shall incur an immediate flat late surcharge of $150.00 USD.',
      plainEnglishSummary: 'Rent is $3,200/month due on the 1st. Paying after the 5th triggers an immediate $150 penalty.',
      severity: 'LOW',
    },
    {
      id: 'lease-c3',
      sectionNumber: 'Section 6.2',
      title: 'Deposit Return & $450 Cleaning Fee',
      originalText: 'Lessor shall hold a Security Deposit equal to one month rent ($3,200). Return of deposit shall occur within sixty (60) business days following surrender. Lessor reserves the unilateral right to deduct a non-refundable cleaning and administrative turnover surcharge of $450.00 regardless of the premise condition upon vacancy.',
      plainEnglishSummary: 'Landlord delays your deposit return to 60 business days (approx. 3 months) and automatically takes $450 for cleaning even if you leave the apartment spotless.',
      severity: 'MEDIUM',
      identifiedRisk: 'Statutory Violation & Arbitrary Deduction',
      statutoryReference: 'Violates NY Gen Oblig Law § 7-108 which mandates deposit return within 14 calendar days.',
      counterProposal: 'Lessor shall return the security deposit within fourteen (14) calendar days of vacancy with an itemized receipt. No non-refundable cleaning fees shall apply unless documented damage exceeds reasonable wear and tear.',
    },
    {
      id: 'lease-c4',
      sectionNumber: 'Section 8.3',
      title: 'Landlord Right of Entry (2-Hour Notice)',
      originalText: 'Lessor, its agents, and prospective purchasers may enter the demised premises at any reasonable hour with a minimum of two (2) hours verbal or electronic notice to conduct inspections or show the apartment.',
      plainEnglishSummary: 'The landlord can enter your home on just 2 hours of notice for viewings or arbitrary inspections.',
      severity: 'MEDIUM',
      identifiedRisk: 'Loss of Quiet Enjoyment & Privacy Intrusion',
      counterProposal: 'Lessor shall provide at least twenty-four (24) hours prior written notice before entering, except in bona fide emergencies.',
    },
    {
      id: 'lease-c5',
      sectionNumber: 'Section 12.2',
      title: 'Automatic Renewal with 15% Rent Hike',
      originalText: 'In the absence of formal written cancellation delivered via certified mail no less than ninety (90) days prior to the expiration date, this Agreement shall automatically renew for a successive twelve (12) month term. Upon such renewal, the Monthly Base Rent shall automatically escalate by fifteen percent (15.0%).',
      plainEnglishSummary: 'If you do not send a formal cancellation letter 90 days before your lease ends, you are automatically locked in for another full year, and your rent instantly jumps by 15% ($480/month increase).',
      severity: 'HIGH',
      identifiedRisk: 'Punitive Financial Lock-in & Above-Market Escalation',
      statutoryReference: 'New York GOL § 5-905 requires landlord to send a reminder notice between 15-30 days prior to automatic renewal.',
      counterProposal: 'Lease shall transition to a Month-to-Month agreement upon expiration with thirty (30) days notice to terminate. Any rent adjustment shall not exceed the regional Consumer Price Index (CPI) cap.',
    },
    {
      id: 'lease-c6',
      sectionNumber: 'Section 14.1',
      title: 'Unilateral Tenant Indemnity',
      originalText: "Tenant covenants to defend, indemnify, and hold completely harmless Lessor, its affiliates, and property managers against any and all claims, actions, damages, liabilities, and legal expenses, including all attorney fees, arising out of any occurrence on the premises, including claims occasioned in whole or in part by Lessor's own negligence.",
      plainEnglishSummary: "You are agreeing to pay all of the landlord's legal bills and damages, even if an injury or accident was caused by the landlord's own negligence.",
      severity: 'HIGH',
      identifiedRisk: 'Severe Uncapped Liability Transfer',
      statutoryReference: 'Unenforceable and void under NY Real Prop Law § 235-g, which prohibits exempting lessors from their own negligence.',
      counterProposal: 'Mutual Indemnification: Each party shall defend and indemnify the other solely against third-party claims resulting directly from their own gross negligence or willful misconduct.',
    },
  ],
  sections: [],
};

export const FREELANCE_MSA_PRESET: ContractDocument = {
  id: 'preset-freelance-msa',
  title: 'Master Services Agreement & IP Assignment',
  category: 'FREELANCE_MSA',
  jurisdiction: 'State of Delaware',
  parties: {
    firstParty: 'Apex Media Enterprise Inc. (Client)',
    secondParty: 'Independent Contractor (Consultant)',
  },
  effectiveDate: 'November 1, 2026',
  overallScore: 44,
  totalClauses: 4,
  riskSummary: {
    highRiskCount: 3,
    mediumRiskCount: 1,
    lowRiskCount: 0,
  },
  rawText: `MASTER SERVICES AGREEMENT

Section 3.2: Payment Terms & Net-90 Disbursements
Invoices shall be reviewed within 45 days. Approved disbursements shall be paid on Net-90 terms following formal acceptance of deliverables.

Section 7.1: Work-for-Hire & Universal IP Assignment
Consultant irrevocably transfers all intellectual property, including prior inventions, background toolkits, algorithms, and general know-how developed before or during this agreement, throughout the universe in perpetuity.

Section 9.4: Unlimited Contractor Liability
Consultant shall indemnify Client for any losses, including consequential, indirect, and lost profit damages, without any liability cap.

Section 11.2: Restrictive Non-Compete Covenant
For eighteen (18) months following termination, Consultant shall not render services, directly or indirectly, to any entity competing in Client's industry worldwide.`,
  clauses: [
    {
      id: 'msa-c1',
      sectionNumber: 'Section 3.2',
      title: 'Net-90 Payment Delay',
      originalText: 'Invoices shall be reviewed within 45 days. Approved disbursements shall be paid on Net-90 terms following formal acceptance of deliverables.',
      plainEnglishSummary: 'You may have to wait up to 135 days (4.5 months) to get paid for work completed.',
      severity: 'MEDIUM',
      identifiedRisk: 'Severe Cash Flow Strain',
      counterProposal: 'Invoices shall be deemed accepted within 10 business days and paid on standard Net-30 terms.',
    },
    {
      id: 'msa-c2',
      sectionNumber: 'Section 7.1',
      title: 'Universal Background IP Grab',
      originalText: 'Consultant irrevocably transfers all intellectual property, including prior inventions, background toolkits, algorithms, and general know-how developed before or during this agreement, throughout the universe in perpetuity.',
      plainEnglishSummary: 'Client claims ownership not only of the work you deliver, but also of your pre-existing tools, code libraries, and know-how.',
      severity: 'HIGH',
      identifiedRisk: 'Loss of Proprietary Tooling & Career Independence',
      counterProposal: 'Consultant retains all rights to Pre-Existing Tools and Background IP, granting Client a non-exclusive, perpetual license solely to use the deliverables.',
    },
    {
      id: 'msa-c3',
      sectionNumber: 'Section 9.4',
      title: 'Uncapped Liability for Consequential Damages',
      originalText: 'Consultant shall indemnify Client for any losses, including consequential, indirect, and lost profit damages, without any liability cap.',
      plainEnglishSummary: 'If an error occurs, you could be sued for millions in client lost profits with no financial limit.',
      severity: 'HIGH',
      identifiedRisk: 'Catastrophic Financial Liability',
      counterProposal: "Consultant's aggregate liability under this agreement shall be strictly capped at the total fees paid to Consultant in the prior 6 months. Consequential and lost profit damages shall be expressly excluded.",
    },
    {
      id: 'msa-c4',
      sectionNumber: 'Section 11.2',
      title: '18-Month Global Non-Compete',
      originalText: "For eighteen (18) months following termination, Consultant shall not render services, directly or indirectly, to any entity competing in Client's industry worldwide.",
      plainEnglishSummary: "Bans you from working for almost any company in the client's field anywhere in the world for 1.5 years.",
      severity: 'HIGH',
      identifiedRisk: 'Unreasonable Trade Restraint',
      counterProposal: 'Delete Section 11.2 in its entirety. Replace with standard non-solicitation of active employees and clients.',
    },
  ],
  sections: [],
};

export const LEASE_COMPARISON_DIFF: ContractDiffComparison = {
  baselineDocumentTitle: 'Standard Model Tenancy Lease (v1.0)',
  baselineVersion: 'v1.0 (Statutory Precedent)',
  alteredDocumentTitle: 'Hudson Valley Proposed Lease (v2.1)',
  alteredVersion: 'v2.1 (Counter-Proposal)',
  materialAlterationsCount: 4,
  newLiabilitiesCount: 2,
  omittedProtectionsCount: 1,
  baselineScore: 88,
  alteredScore: 50,
  riskScoreDelta: 38,
  activeFlagsCount: 3,
  clauses: [
    {
      id: 'diff-1',
      sectionNumber: 'Section 6.2',
      title: 'Security Deposit Turnaround & Deductions',
      baselineText: 'Lessor shall return tenant security deposit within fourteen (14) calendar days of lease termination. Standard deductions restricted exclusively to documented damage exceeding reasonable wear and tear.',
      alteredText: 'Lessor shall return tenant security deposit within sixty (60) business days following surrender. Lessor reserves the unilateral right to deduct a non-refundable cleaning surcharge of $450.00 regardless of condition upon vacancy.',
      changeType: 'MODIFIED',
      severity: 'HIGH',
      semanticAnalysis: 'Deposit return window extended by ~75 calendar days; introduces an arbitrary $450 non-refundable deduction.',
      statutoryWarning: 'Directly contradicts NY Gen Oblig Law § 7-108 (14-day limit).',
      suggestedAction: 'REVERT',
    },
    {
      id: 'diff-2',
      sectionNumber: 'Section 8.3',
      title: 'Lessor Right of Entry Notice',
      baselineText: 'Lessor shall provide at least twenty-four (24) hours advance written notice prior to entering premises for maintenance or showings.',
      alteredText: 'Lessor may enter the demised premises at any reasonable hour with a minimum of two (2) hours verbal or electronic notice.',
      changeType: 'MODIFIED',
      severity: 'MEDIUM',
      semanticAnalysis: 'Notice period slashed from 24 hours down to 2 hours, compromising privacy rights.',
      suggestedAction: 'COUNTER',
    },
    {
      id: 'diff-3',
      sectionNumber: 'Section 12.2',
      title: 'Renewal Terms & Escalation',
      baselineText: 'Upon expiration, agreement transitions to Month-to-Month with 30 days notice to terminate. Rent adjustments subject to mutual agreement or local guideline index.',
      alteredText: 'In absence of written cancellation 90 days prior, automatically renews for successive 12 months with mandatory 15% rent escalation.',
      changeType: 'MODIFIED',
      severity: 'HIGH',
      semanticAnalysis: 'Replaces flexible month-to-month tenancy with punitive 1-year lock-in and mandatory 15% rent increase.',
      statutoryWarning: 'Requires advance statutory warning under NY GOL § 5-905.',
      suggestedAction: 'REVERT',
    },
    {
      id: 'diff-4',
      sectionNumber: 'Section 14.1',
      title: 'Indemnification & Legal Exposure',
      baselineText: 'Mutual Indemnification. Each party indemnifies the other solely for direct damages caused by gross negligence or intentional misconduct.',
      alteredText: "Tenant covenants to defend, indemnify, and hold harmless Lessor against any claims and legal expenses, including claims occasioned in whole or in part by Lessor's own negligence.",
      changeType: 'MODIFIED',
      severity: 'HIGH',
      semanticAnalysis: 'Shifts 100% of legal liability and attorney fees onto tenant, even if the landlord causes the injury.',
      statutoryWarning: 'Void and unenforceable as against public policy under NY Real Prop Law § 235-g.',
      suggestedAction: 'REVERT',
    },
  ],
};

export const SAMPLE_PREP_KIT_DATA: PrepKitData = {
  documentTitle: 'Residential Tenancy & Lease Agreement (2026)',
  parties: {
    firstParty: 'Hudson Valley Realty Management LLC',
    secondParty: 'Tenant (Lessee)',
  },
  jurisdiction: 'New York (NY Real Property Law)',
  effectiveDate: 'October 1, 2026',
  overallScore: 62,
  executiveSummary: 'This residential lease heavily favors the lessor. It contains two clauses that are either void or unenforceable under New York statutory law (unilateral indemnity under RPL § 235-g and extended deposit retention past 14 days under GOL § 7-108). The 90-day automatic renewal with a 15% escalation poses substantial financial lock-in.',
  keyRisks: [
    {
      section: 'Section 12.2',
      level: 'HIGH',
      summary: 'Automatic 12-Month Lock-in with 15% Rent Escalation',
      identifiedRisk: 'Severe financial penalty if 90-day notice window is missed.',
    },
    {
      section: 'Section 14.1',
      level: 'HIGH',
      summary: 'Unilateral Tenant Indemnification for Landlord Negligence',
      identifiedRisk: 'Unenforceable under NY RPL § 235-g; exposes tenant to landlord lawsuits.',
    },
    {
      section: 'Section 6.2',
      level: 'MEDIUM',
      summary: '60-Business-Day Deposit Delay + Mandatory $450 Turnover Fee',
      identifiedRisk: 'Exceeds statutory 14-day limit under NY GOL § 7-108.',
    },
  ],
  topConsultationQuestions: [
    {
      questionNumber: 1,
      question: 'Is Section 14.1 completely void under NY Real Property Law § 235-g, and how should we strike it?',
      rationale: 'New York law voids contract provisions exempting landlords from their own negligence.',
      suggestedObjective: 'Restore standard mutual indemnity for gross negligence only.',
    },
    {
      questionNumber: 2,
      question: 'How can we legally enforce the statutory 14-day deposit return timeline under NY General Obligations Law § 7-108?',
      rationale: 'Landlords in NY cannot hold deposits for 60 business days or deduct automatic non-refundable cleaning fees.',
      suggestedObjective: 'Amend Section 6.2 to reference NY GOL § 7-108 explicitly.',
    },
    {
      questionNumber: 3,
      question: 'Can the landlord enforce a 90-day cancellation window without sending advance statutory notice under GOL § 5-905?',
      rationale: 'NY law requires landlords to send a written notice 15 to 30 days prior to the cutoff date.',
      suggestedObjective: 'Replace 90-day lock-in with a standard 30-day notice to transition to month-to-month.',
    },
    {
      questionNumber: 4,
      question: 'What is our exposure under the 2-hour landlord entry clause in Section 8.3?',
      rationale: 'Standard residential practice requires 24 hours written notice for non-emergency inspections.',
      suggestedObjective: 'Insert 24-hour advance written notice requirement.',
    },
    {
      questionNumber: 5,
      question: 'Are there any required state or lead-paint disclosures missing from this agreement?',
      rationale: 'Failure to provide required statutory disclosures can invalidate specific landlord remedies.',
      suggestedObjective: 'Verify comprehensive compliance before signing.',
    },
  ],
  recommendedCounterClauses: [
    {
      section: 'Section 12.2',
      currentTerm: 'Automatic 12-month renewal with 15% rent escalation upon 90-day silence.',
      proposedTerm: 'Lease transitions to Month-to-Month tenancy upon expiration with 30 days written notice to vacate. Any annual rent increase shall not exceed 3.5% or CPI index.',
    },
    {
      section: 'Section 14.1',
      currentTerm: 'Tenant indemnifies lessor even for lessor own negligence.',
      proposedTerm: 'Mutual Indemnity: Each party shall defend and indemnify the other solely against third-party claims resulting directly from their own gross negligence or willful misconduct.',
    },
  ],
};
