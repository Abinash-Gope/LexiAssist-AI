/**
 * Contract Analysis Query Hook (TanStack Query)
 * Manages async server state for contract digestion and risk scoring.
 * Uses a text fingerprint cache key (not raw length) to correctly distinguish
 * different contracts that happen to have the same character count.
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { analyzeContract } from '@/core/api/httpClient';
import { ContractDocument } from '@/core/types/contract.types';
import { RESIDENTIAL_LEASE_PRESET, FREELANCE_MSA_PRESET } from '@/core/presets/sampleContracts';

/** Cheap but reliable fingerprint: length + first 50 + last 50 characters */
function buildTextFingerprint(text: string): string {
  if (!text) return '';
  return `${text.length}-${text.slice(0, 50)}-${text.slice(-50)}`;
}

export function useAnalyzeQuery(preset: 'LEASE' | 'MSA' | 'CUSTOM', customText = '', customTitle = '') {
  const textFingerprint = preset === 'CUSTOM' ? buildTextFingerprint(customText) : '';

  return useQuery<ContractDocument, Error>({
    queryKey: queryKeys.contract.analyze(preset, textFingerprint),
    queryFn: async () => {
      if (preset === 'LEASE') return RESIDENTIAL_LEASE_PRESET;
      if (preset === 'MSA') return FREELANCE_MSA_PRESET;
      return analyzeContract(customText, customTitle);
    },
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });
}
