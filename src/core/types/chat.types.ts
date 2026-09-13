/**
 * Grounded Document Q&A & Citation Types
 * Strict isolation - Pure TypeScript.
 */

export interface CitationSource {
  clauseId: string;
  sectionNumber: string;
  title: string;
  quoteSnippet: string;
  pageNumber?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'USER' | 'ASSISTANT' | 'SYSTEM';
  text: string;
  citations?: CitationSource[];
  timestamp: string;
  isUngroundedFallback?: boolean;
}

export interface ChatQueryRequest {
  documentId: string;
  question: string;
  documentContext: string;
}

export interface PrepKitData {
  documentTitle: string;
  parties: {
    firstParty: string;
    secondParty: string;
  };
  jurisdiction: string;
  effectiveDate: string;
  overallScore: number;
  executiveSummary: string;
  keyRisks: Array<{
    section: string;
    level: 'HIGH' | 'MEDIUM' | 'LOW';
    summary: string;
    identifiedRisk: string;
  }>;
  topConsultationQuestions: Array<{
    questionNumber: number;
    question: string;
    rationale: string;
    suggestedObjective: string;
  }>;
  recommendedCounterClauses: Array<{
    section: string;
    currentTerm: string;
    proposedTerm: string;
  }>;
}
