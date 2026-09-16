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

export const FREELANCE_MSA_COMPARISON_DIFF: ContractDiffComparison = {
  baselineDocumentTitle: 'Original Master Services Agreement (v1.0)',
  baselineVersion: 'v1.0 (Balanced Mutual Terms)',
  alteredDocumentTitle: 'Client Revised Enterprise Draft (v2.0)',
  alteredVersion: 'v2.0 (Client Aggressive Redlines)',
  materialAlterationsCount: 4,
  newLiabilitiesCount: 3,
  omittedProtectionsCount: 1,
  baselineScore: 92,
  alteredScore: 42,
  riskScoreDelta: 50,
  activeFlagsCount: 4,
  clauses: [
    {
      id: 'diff-msa-1',
      sectionNumber: 'Section 3.2',
      title: 'Payment Terms & Net-90 Disbursements',
      baselineText: 'Invoices submitted by Consultant shall be reviewed and approved within ten (10) business days, with undisputed sums payable on standard Net-30 terms following invoice receipt.',
      alteredText: 'Invoices shall be reviewed within 45 days. Approved disbursements shall be paid on Net-90 terms following formal acceptance of deliverables. Client reserves right to hold 20% retainage indefinitely.',
      changeType: 'MODIFIED',
      severity: 'MEDIUM',
      semanticAnalysis: 'Extends invoice payment to Net-90 with 45-day review buffer, creating cash flow delays up to 135 days.',
      suggestedAction: 'COUNTER',
    },
    {
      id: 'diff-msa-2',
      sectionNumber: 'Section 7.1',
      title: 'Work-for-Hire & Universal IP Assignment',
      baselineText: 'Client owns final delivered client-specific work product upon payment in full. Consultant retains all rights in pre-existing background code, algorithms, tooling, and general industry know-how.',
      alteredText: 'Consultant irrevocably transfers and assigns all intellectual property, including prior inventions, background toolkits, algorithms, and general know-how developed before or during this agreement, throughout the universe in perpetuity.',
      changeType: 'MODIFIED',
      severity: 'HIGH',
      semanticAnalysis: 'Total expropriation of contractor prior tools, open-source utilities, and algorithmic frameworks. Strips contractor of their business toolkit.',
      statutoryWarning: 'Unconscionable overbroad assignment of pre-existing background property.',
      suggestedAction: 'REVERT',
    },
    {
      id: 'diff-msa-3',
      sectionNumber: 'Section 9.4',
      title: 'Indemnity & Unlimited Consequential Liability',
      baselineText: 'Mutual Liability Cap: Each party liability to the other for direct damages is capped at fees paid in prior 12 months. Neither party shall be liable for consequential or lost-profit damages.',
      alteredText: 'Consultant shall indemnify, defend, and hold Client harmless from any and all damages, claims, third-party actions, lost business profits, and incidental or consequential losses without monetary limitation.',
      changeType: 'MODIFIED',
      severity: 'HIGH',
      semanticAnalysis: 'Completely removes the mutual liability ceiling and exposes individual contractor to uncapped lost-profit claims for client enterprise systems.',
      statutoryWarning: 'Severe commercial asymmetry — uncapped indirect liability creates existential financial exposure.',
      suggestedAction: 'REVERT',
    },
    {
      id: 'diff-msa-4',
      sectionNumber: 'Section 11.2',
      title: '18-Month Global Non-Compete Restraint',
      baselineText: 'Standard Non-Solicitation: During agreement and for six (6) months post-termination, neither party shall solicit the other party employees or direct active clients.',
      alteredText: 'For eighteen (18) months following termination, Consultant shall not render consulting, engineering, or advisory services, directly or indirectly, to any entity competing in Client market worldwide.',
      changeType: 'MODIFIED',
      severity: 'HIGH',
      semanticAnalysis: 'Locks consultant out of their entire industry for 1.5 years worldwide under threat of injunction and litigation.',
      statutoryWarning: 'Overly broad geographic scope; void under California B&P § 16600 and restricted under FTC rule.',
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

export const FREELANCE_MSA_PREP_KIT_DATA: PrepKitData = {
  documentTitle: 'Master Services Agreement & IP Assignment',
  parties: {
    firstParty: 'Apex Media Enterprise Inc. (Client)',
    secondParty: 'Independent Contractor (Consultant)',
  },
  jurisdiction: 'State of Delaware',
  effectiveDate: 'November 1, 2026',
  overallScore: 44,
  executiveSummary: 'This Master Services Agreement is heavily biased toward the enterprise client. It imposes extreme cash-flow delays via Net-90 payment terms, attempts to seize all pre-existing consultant IP and know-how, demands uncapped liability for indirect lost profits, and restricts the contractor with an 18-month worldwide non-compete covenant.',
  keyRisks: [
    {
      section: 'Section 9.4',
      level: 'HIGH',
      summary: 'Uncapped Liability & Consequential Lost Profits',
      identifiedRisk: 'Exposes consultant to catastrophic business liability exceeding contract value.',
    },
    {
      section: 'Section 7.1',
      level: 'HIGH',
      summary: 'Perpetual Universal Pre-Existing IP Expropriation',
      identifiedRisk: 'Surrenders background tools, personal software frameworks, and career know-how.',
    },
    {
      section: 'Section 11.2',
      level: 'HIGH',
      summary: '18-Month Global Non-Compete Restraint',
      identifiedRisk: 'Severe restraint of trade barring independent contracting globally.',
    },
    {
      section: 'Section 3.2',
      level: 'MEDIUM',
      summary: 'Net-90 Payment Delay with 45-Day Verification',
      identifiedRisk: 'Forces contractor to finance enterprise operations for 4.5 months before payment.',
    },
  ],
  topConsultationQuestions: [
    {
      questionNumber: 1,
      question: 'How do we effectively limit contractor cumulative liability to the fees paid under this SOW in Section 9.4?',
      rationale: 'Consultants must never sign uncapped liability for enterprise lost profits without a financial ceiling.',
      suggestedObjective: 'Cap liability at total fees paid in preceding 6 months and mutually exclude consequential damages.',
    },
    {
      questionNumber: 2,
      question: 'How should Section 7.1 be carved out to preserve ownership of my background toolkits, libraries, and open-source assets?',
      rationale: 'Work-for-hire clauses should assign only newly created custom deliverables upon receipt of full payment.',
      suggestedObjective: 'Insert standard Background IP reservation and grant Client a non-exclusive license.',
    },
    {
      questionNumber: 3,
      question: 'Is the 18-month worldwide non-compete covenant in Section 11.2 legally enforceable against an independent contractor?',
      rationale: 'Many jurisdictions severely limit post-termination non-competes against independent contractors.',
      suggestedObjective: 'Strike the non-compete entirely and replace with reasonable non-solicitation of active clients.',
    },
    {
      questionNumber: 4,
      question: 'What statutory remedies or prompt payment provisions can we cite to reduce Net-90 to Net-30 in Section 3.2?',
      rationale: 'Net-90 with 45-day review delays compensation by over 135 calendar days.',
      suggestedObjective: 'Mandate Net-30 payment with statutory late payment interest of 1.5% per month.',
    },
  ],
  recommendedCounterClauses: [
    {
      section: 'Section 9.4',
      currentTerm: 'Consultant indemnifies Client for any losses including consequential damages without liability cap.',
      proposedTerm: "Mutual Liability Cap: Each party's aggregate liability shall not exceed total fees received by Consultant during the preceding six (6) months. Neither party shall be liable for indirect or lost profit damages.",
    },
    {
      section: 'Section 7.1',
      currentTerm: 'Consultant transfers all pre-existing toolkits, algorithms, and know-how in perpetuity.',
      proposedTerm: 'Consultant retains all right and title to pre-existing background materials and tools. Client receives a non-exclusive, perpetual license solely as incorporated into final deliverables.',
    },
  ],
};

export const SAMPLE_TEST_CONTRACT_RAW = `COMMERCIAL SAAS SERVICES AGREEMENT & ENTERPRISE TERMS
Effective Date: September 15, 2026
Jurisdiction: State of Delaware / Unilateral Counterparty Forum
Parties: NovaCloud Technologies Inc. ("Client") and Apex Dynamics Solutions LLC ("Provider")

Section 1.1: Scope of Engagement & Deliverables
Provider agrees to design, configure, and maintain enterprise distributed cloud orchestration software infrastructure in accordance with the specifications detailed in Statement of Work #4.

Section 2.4: Fees, Invoicing & 90-Day Administrative Holdback
Invoices submitted by Provider shall undergo an initial sixty (60) day verification and accounting review by Client. Upon approval, payment terms shall be Net-90 calendar days. Client reserves the unilateral, discretionary right to hold back twenty-five percent (25%) of all gross billable sums without interest as a reserve against future warranty contingencies.

Section 3.2: Perpetual Non-Compete & Worldwide Field Restriction
Provider covenants and agrees that during the term of this Agreement and for a period of thirty-six (36) months following any termination or expiration hereof, Provider shall not, directly or indirectly, anywhere worldwide, engage in, perform services for, consult with, invest in, or otherwise assist any enterprise, product, or service that competes in any capacity with Client’s current or contemplated lines of cloud business.

Section 5.1: Automatic Renewal & 120-Day Notice Window
This Agreement shall automatically renew for successive two (2) year terms unless Provider provides written notice of non-renewal via certified mail during a narrow five (5) day window exactly one hundred twenty (120) days prior to the expiration of the then-current term. Failure to deliver notice within this exact 5-day window shall irrevocably bind Provider to the subsequent 2-year renewal term.

Section 8.2: Total Assignment of All Background IP & Inventions
Provider hereby unconditionally and irrevocably assigns, transfers, and conveys to Client, globally in perpetuity, all worldwide right, title, and interest in and to all deliverables, algorithms, software architectures, know-how, and Provider's pre-existing open-source or proprietary tools, libraries, scripts, and utilities utilized in connection with this engagement.

Section 9.4: Unilateral Discretionary Termination by Client
Client reserves the right to terminate this Agreement or any Statement of Work at any time, with or without cause, immediately upon written notice to Provider, without incurring any early termination liability, kill fee, or obligation to pay unaccrued milestone balances. Provider shall have no reciprocal right to terminate without cause.

Section 11.2: Uncapped Provider Indemnification & Consequential Damages
Provider shall defend, indemnify, and hold harmless Client, its parent companies, affiliates, and enterprise customers from and against any and all claims, liabilities, commercial losses, regulatory fines, lost profits, business interruptions, and attorney's fees arising out of or related to this Agreement. Provider’s indemnity obligations shall be completely uncapped and shall not be subject to any financial ceiling or limitation of liability.

Section 14.3: Exclusive Unilateral Mandatory Arbitration & Fee Shifting
Any controversy or dispute arising under or relating to this Agreement shall be resolved exclusively through private binding arbitration held in Zurich, Switzerland, conducted under Swiss arbitration rules in the English language. In the event of any proceeding, Provider shall bear all filing fees, arbitrator stipends, and Client’s reasonable legal expenses regardless of the final outcome.`;
