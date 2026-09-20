/**
 * Contract Comparison Diff Query Hook (TanStack Query)
 * Manages async server state for side-by-side redline comparisons.
 * Uses a text fingerprint cache key to correctly distinguish document versions.
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { compareContracts } from '@/core/api/httpClient';
import { ContractDiffComparison } from '@/core/types/diff.types';

/** Cheap but reliable fingerprint for a pair of documents */
function buildDiffFingerprint(v1?: string, v2?: string): string {
  const f = (t?: string) => (t ? `${t.length}:${t.slice(0, 30)}` : '');
  return `${f(v1)}|${f(v2)}`;
}

export function useDiffQuery(
  presetId = 'lease',
  customV1Text?: string,
  customV2Text?: string,
  customV1Title?: string,
  customV2Title?: string
) {
  const textFingerprint = buildDiffFingerprint(customV1Text, customV2Text);

  return useQuery<ContractDiffComparison, Error>({
    queryKey: queryKeys.diff.compare(presetId, textFingerprint),
    queryFn: async () => {
      return compareContracts(presetId, customV1Text, customV2Text, customV1Title, customV2Title);
    },
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
