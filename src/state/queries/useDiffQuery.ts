/**
 * Contract Comparison Diff Query Hook (TanStack Query)
 * Manages async server state for side-by-side redline comparisons.
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { compareContracts } from '@/core/api/httpClient';
import { ContractDiffComparison } from '@/core/types/diff.types';

export function useDiffQuery(baselineId = 'v1.0', alteredId = 'v2.1') {
  return useQuery<ContractDiffComparison, Error>({
    queryKey: queryKeys.diff.compare(baselineId, alteredId),
    queryFn: async () => {
      return compareContracts();
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
