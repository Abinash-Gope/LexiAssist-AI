/**
 * Contract Comparison Diff Query Hook (TanStack Query)
 * Manages async server state for side-by-side redline comparisons.
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { compareContracts } from '@/core/api/httpClient';
import { ContractDiffComparison } from '@/core/types/diff.types';

export function useDiffQuery(
  presetId = 'lease',
  customV1Text?: string,
  customV2Text?: string,
  customV1Title?: string,
  customV2Title?: string
) {
  return useQuery<ContractDiffComparison, Error>({
    queryKey: ['diff', 'compare', presetId, customV1Text?.length || 0, customV2Text?.length || 0],
    queryFn: async () => {
      return compareContracts(presetId, customV1Text, customV2Text, customV1Title, customV2Title);
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
