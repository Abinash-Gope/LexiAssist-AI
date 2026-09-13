/**
 * Contract Comparison & Semantic Diff Domain Types
 * Strict isolation - Pure TypeScript.
 */

import { RiskSeverity } from './contract.types';

export type DiffChangeType = 'MODIFIED' | 'ADDED' | 'OMITTED' | 'UNCHANGED';

export interface RedlineClause {
  id: string;
  sectionNumber: string;
  title: string;
  baselineText: string;
  alteredText: string;
  changeType: DiffChangeType;
  severity: RiskSeverity;
  semanticAnalysis: string;
  statutoryWarning?: string;
  suggestedAction?: 'REVERT' | 'COUNTER' | 'ACCEPT';
}

export interface ContractDiffComparison {
  baselineDocumentTitle: string;
  baselineVersion: string;
  alteredDocumentTitle: string;
  alteredVersion: string;
  materialAlterationsCount: number;
  newLiabilitiesCount: number;
  omittedProtectionsCount: number;
  baselineScore: number;
  alteredScore: number;
  riskScoreDelta: number; // e.g. +38 (indicating 38% increase in risk exposure)
  clauses: RedlineClause[];
  activeFlagsCount: number;
}
