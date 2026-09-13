/**
 * Contract Analysis Query Hook (TanStack Query)
 * Manages async server state for contract digestion and risk scoring.
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { analyzeContract } from '@/core/api/httpClient';
import { ContractDocument } from '@/core/types/contract.types';
import { RESIDENTIAL_LEASE_PRESET, FREELANCE_MSA_PRESET } from '@/core/presets/sampleContracts';

export function useAnalyzeQuery(preset: 'LEASE' | 'MSA' | 'CUSTOM', customText = '', customTitle = '') {
  return useQuery<ContractDocument, Error>({
    queryKey: queryKeys.contract.analyze(preset, customText.length),
    queryFn: async () => {
      if (preset === 'LEASE') {
        return RESIDENTIAL_LEASE_PRESET;
      }
      if (preset === 'MSA') {
        return FREELANCE_MSA_PRESET;
      }
      return analyzeContract(customText, customTitle);
    },
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });
}
