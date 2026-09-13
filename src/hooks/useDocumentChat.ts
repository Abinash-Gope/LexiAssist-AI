/**
 * Business Logic Hook: Grounded Document Chat Coordinator
 * Handles multi-turn chat, citation click-to-highlight, and prompt suggestions.
 */

import { useState } from 'react';
import { useAppDispatch } from '@/state/store';
import { setSelectedClauseId } from '@/state/slices/contractUiSlice';
import { useChatMutation } from '@/state/queries/useChatMutation';
import { ContractDocument } from '@/core/types/contract.types';
import { ChatMessage } from '@/core/types/chat.types';

export function useDocumentChat(document: ContractDocument | undefined) {
  const dispatch = useAppDispatch();
  const chatMutation = useChatMutation();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'ASSISTANT',
      text: `Hello! I am your legal analysis copilot for **${
        document?.title || 'this agreement'
      }**. You can ask me any question about clauses, renewal terms, liabilities, or deadlines. Every answer is grounded directly in the text with verifiable citations.`,
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  /** Tracks which clauseId to pulse-highlight in the DocumentViewer when a citation is clicked */
  const [citationPulseId, setCitationPulseId] = useState<string | null>(null);

  const promptSuggestions = [
    'What is the automatic renewal penalty?',
    'Does the landlord have to give notice before entry?',
    'What are the security deposit deductions?',
    'Is the tenant indemnification clause fair?',
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || !document) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'USER',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');

    try {
      const assistantMessage = await chatMutation.mutateAsync({
        document,
        question: textToSend,
      });
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (e) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'ASSISTANT',
        text: 'Unable to analyze the document for this inquiry at this moment. Please check your network or try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  const handleCitationClick = (clauseId: string) => {
    // Select the clause in global state (triggers scroll in DocumentViewer)
    dispatch(setSelectedClauseId(clauseId));

    // Reset then set to guarantee the useEffect in DocumentViewer fires even for same id
    setCitationPulseId(null);
    requestAnimationFrame(() => {
      setCitationPulseId(clauseId);
      // Auto-clear after animation duration so it can be re-triggered
      setTimeout(() => setCitationPulseId(null), 2500);
    });
  };

  return {
    messages,
    inputQuery,
    isLoading: chatMutation.isPending,
    promptSuggestions,
    citationPulseId,
    setInputQuery,
    sendMessage: handleSendMessage,
    clickCitation: handleCitationClick,
  };
}
