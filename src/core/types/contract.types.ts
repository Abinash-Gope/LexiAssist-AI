/**
 * Core Contract & Document Domain Types
 * Strict isolation - Pure TypeScript, zero React imports.
 */

export type RiskSeverity = 'HIGH' | 'MEDIUM' | 'LOW';

export interface ContractClause {
  id: string;
  sectionNumber: string;
  title: string;
  originalText: string;
  plainEnglishSummary: string;
  severity: RiskSeverity;
  identifiedRisk?: string;
  statutoryReference?: string;
  counterProposal?: string;
  pageNumber?: number;
  highlightCoordinates?: {
    lineStart: number;
    lineEnd: number;
  };
}

export interface ContractSection {
  sectionNumber: string;
  title: string;
  clauses: ContractClause[];
}

export interface ContractDocument {
  id: string;
  title: string;
  category: 'LEASES' | 'EMPLOYMENT' | 'FREELANCE_MSA' | 'NDA' | 'SUPPLIER_VENDOR' | 'CUSTOM';
  rawText: string;
  jurisdiction: string;
  parties: {
    firstParty: string;
    secondParty: string;
  };
  effectiveDate: string;
  clauses: ContractClause[];
  sections: ContractSection[];
  totalClauses: number;
  overallScore: number; // 0 to 100
  riskSummary: {
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
  };
}
