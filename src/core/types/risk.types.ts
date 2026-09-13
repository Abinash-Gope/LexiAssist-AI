/**
 * Risk Assessment & Obligation Scoring Types
 * Strict isolation - Pure TypeScript.
 */

import { RiskSeverity, ContractClause } from './contract.types';

export interface RiskCategorySummary {
  severity: RiskSeverity;
  count: number;
  label: string;
  badgeClass: string;
  description: string;
}

export interface RiskScoreReport {
  documentId: string;
  overallScore: number; // 0 (Severe Risk) to 100 (Equitable / Safe)
  riskLevel: 'CRITICAL' | 'MODERATE' | 'LOW_RISK';
  keyTakeaway: string;
  highRiskClauses: ContractClause[];
  cautionClauses: ContractClause[];
  standardClauses: ContractClause[];
  breakdown: {
    financialExposure: number; // 0-100
    liabilityImbalance: number; // 0-100
    terminationHardship: number; // 0-100
  };
  analyzedAt: string;
}
