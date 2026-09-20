import React from 'react';
import { Send, Bot, User, Sparkles, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';
import { useDocumentChat } from '@/hooks/useDocumentChat';
import { ContractDocument } from '@/core/types/contract.types';
import { Button } from '../../ui/Button';

interface ChatDrawerProps {
  document: ContractDocument | undefined;
  /** Callback fired with clauseId when a citation pill is clicked, so parent can pass it to DocumentViewer */
  onCitationPulse?: (clauseId: string | null) => void;
}

const ChatDrawerComponent: React.FC<ChatDrawerProps> = ({ document, onCitationPulse }) => {
  const {
    messages,
    inputQuery,
    isLoading,
    promptSuggestions,
    citationPulseId,
    setInputQuery,
    sendMessage,
    clickCitation,
  } = useDocumentChat(document);

  // Sync citationPulseId up to parent (DashboardPage) whenever it changes
  React.useEffect(() => {
    if (onCitationPulse) onCitationPulse(citationPulseId ?? null);
  }, [citationPulseId, onCitationPulse]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="flex flex-col h-[560px] bg-surface-light border border-border-light rounded-xl overflow-hidden shadow-level-1">
      {/* Drawer Header */}
      <div className="p-4 border-b border-border-light bg-surface-dim/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold font-headline text-primary">
              Grounded Contract Q&A Copilot
            </h3>
            <span className="text-[10px] text-slate-500">Citations strictly backed by contract text</span>
          </div>
        </div>
        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Zero Hallucination
        </span>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/30">
        {messages.map((msg) => {
          const isUser = msg.sender === 'USER';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 text-xs leading-relaxed ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-6 h-6 rounded bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-xl p-3.5 space-y-2 shadow-sm ${
                  isUser
                    ? 'bg-primary text-white rounded-tr-none'
                    : msg.isUngroundedFallback
                    ? 'bg-amber-50 text-amber-950 border border-amber-200 rounded-tl-none'
                    : 'bg-white text-slate-800 border border-border-light rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Clickable Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="pt-2 mt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    <span className="text-[10px] text-slate-400 font-semibold block w-full">
                      Cited Document Provisions:
                    </span>
                    {msg.citations.map((c) => (
                      <button
                        key={c.clauseId}
                        onClick={() => clickCitation(c.clauseId)}
                        className="inline-flex items-center gap-1 text-[10px] font-mono bg-blue-50 text-brand px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100 transition-colors"
                        title={c.quoteSnippet}
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{c.sectionNumber}</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-0.5" />
                      </button>
                    ))}
                  </div>
                )}

                <div className={`text-[9px] ${isUser ? 'text-slate-300 text-right' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </div>
              </div>

              {isUser && (
                <div className="w-6 h-6 rounded bg-brand text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-2 text-xs text-slate-500 items-center p-2 bg-slate-100/50 rounded-lg max-w-[200px]">
            <Sparkles className="w-3.5 h-3.5 text-brand animate-spin" />
            <span>Verifying contract text...</span>
          </div>
        )}
      </div>

      {/* Prompt Suggestions */}
      <div className="px-4 py-2 border-t border-border-light bg-surface-dim/30 overflow-x-auto flex gap-1.5 no-scrollbar">
        {promptSuggestions.map((prompt, i) => (
          <button
            key={i}
            onClick={() => sendMessage(prompt)}
            disabled={isLoading}
            className="text-[11px] whitespace-nowrap px-2.5 py-1 rounded-full bg-surface-light border border-border-light text-slate-700 hover:border-brand hover:text-brand transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleFormSubmit} className="p-3 border-t border-border-light bg-surface-light flex gap-2">
        <input
          type="text"
          placeholder="Ask a question about this contract..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          disabled={isLoading}
          className="flex-1 px-3.5 py-2 text-xs bg-surface-dim border border-border-light rounded-lg focus:outline-none focus:ring-1 focus:ring-brand"
        />
        <Button
          type="submit"
          size="sm"
          variant="primary"
          disabled={!inputQuery.trim() || isLoading}
          className="px-3"
        >
          <Send className="w-3.5 h-3.5" />
        </Button>
      </form>
    </div>
  );
};

export const ChatDrawer = React.memo(ChatDrawerComponent);

