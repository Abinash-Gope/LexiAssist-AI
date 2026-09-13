/**
 * Lawyer Prep Kit Query Hook (TanStack Query)
 * Manages async server state for generating the attorney consultation kit.
 */

import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import { generatePrepKit } from '@/core/api/httpClient';
import { ContractDocument } from '@/core/types/contract.types';
import { PrepKitData } from '@/core/types/chat.types';

export function usePrepKitQuery(document: ContractDocument | undefined) {
  return useQuery<PrepKitData, Error>({
    queryKey: queryKeys.prepKit.detail(document?.id || 'none'),
    queryFn: async () => {
      if (!document) throw new Error('No contract loaded');
      return generatePrepKit(document);
    },
    enabled: !!document,
    staleTime: 1000 * 60 * 30,
  });
}
