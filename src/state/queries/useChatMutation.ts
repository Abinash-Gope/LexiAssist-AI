/**
 * Grounded Q&A Chat Mutation Hook (TanStack Query)
 * Manages async mutations for asking contract questions with citations.
 */

import { useMutation } from '@tanstack/react-query';
import { askContractQuestion } from '@/core/api/httpClient';
import { ContractDocument } from '@/core/types/contract.types';
import { ChatMessage } from '@/core/types/chat.types';

interface ChatMutationVariables {
  document: ContractDocument;
  question: string;
}

export function useChatMutation() {
  return useMutation<ChatMessage, Error, ChatMutationVariables>({
    mutationFn: async ({ document, question }) => {
      return askContractQuestion(document, question);
    },
  });
}
