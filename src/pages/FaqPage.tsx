import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const FaqPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: 'Does LexiAssist AI replace a certified lawyer or attorney?',
      a: 'No. LexiAssist AI strictly provides educational document comprehension, risk identification, and consultation preparation. It does not offer formal legal counsel, attorney-client privilege, or court representation. Its primary purpose is to help you understand what you are signing and arrive prepared for certified counsel.',
    },
    {
      q: 'Are my confidential contracts saved permanently on your servers?',
      a: 'Never. LexiAssist AI processes documents ephemerally in volatile browser session memory. We have a strict zero-retention policy. You can also click the 1-Click Wipe Data button at any time to purge all text and session history immediately.',
    },
    {
      q: 'What types of legal contracts can I analyze?',
      a: 'LexiAssist AI is optimized for everyday high-impact agreements including Residential Tenancy Leases, Freelancer Master Services Agreements (MSAs), Non-Disclosure Agreements (NDAs), Software Terms of Service, and Independent Contractor Agreements.',
    },
    {
      q: 'How does the Side-by-Side Semantic Diff work?',
      a: 'Unlike basic text diff tools that only highlight string differences, our semantic engine analyzes legal impact changes—such as altered notice periods, removed tenant protections, modified payment caps, and changes in liability.',
    },
    {
      q: 'Can I export a summary to share with my attorney or counterparty?',
      a: 'Yes! With one click, you can generate and download a professional Lawyer Consultation Prep Kit in PDF or Markdown format, complete with an executive risk summary and the top 5 targeted questions for your attorney.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-3 max-w-xl mx-auto">
        <span className="text-xs font-bold text-brand uppercase tracking-wider bg-blue-50 border border-blue-200/80 px-3 py-1 rounded-full">
          Answers & Clarity
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-headline text-primary tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-sans leading-relaxed">
          Everything you need to know about our legal information guardrails, security, and features.
        </p>
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openFaqIndex === idx;
          return (
            <div
              key={faq.q}
              className="border border-border-light rounded-xl bg-surface-light transition-all overflow-hidden shadow-xs hover:border-slate-300"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-primary hover:text-brand transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ml-3 ${
                    isOpen ? 'transform rotate-180 text-brand' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Support Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-brand flex items-center justify-center mx-auto">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-primary font-headline">
            Still Have Questions?
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Test our platform with zero commitment using our 1-click evaluator guest mode. No credit card or registration required.
          </p>
        </div>
        <div>
          <Link to="/login">
            <Button size="md" variant="brand" className="text-xs font-semibold">
              <span>Start Free Review</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
