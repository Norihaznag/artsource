'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FAQ } from '@/types/database';

interface FAQSectionProps {
  faqs: FAQ[];
}

function FAQItem({ faq }: { faq: FAQ }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-secondary-200 last:border-b-0">
      <button
        className="w-full py-5 flex items-center justify-between text-left gap-4"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-secondary-900">
          {faq.question_fr}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-secondary-500 transition-transform flex-shrink-0',
            isOpen && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        )}
      >
        <p className="text-secondary-600 leading-relaxed">
          {faq.answer_fr}
        </p>
      </div>
    </div>
  );
}

export function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs.length) return null;

  return (
    <section className="py-16 md:py-24 bg-secondary-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-4">
              Questions Fréquentes
            </h2>
            <p className="text-lg text-secondary-600">
              Vous avez des questions? Voici les réponses aux questions les plus courantes.
            </p>
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            {faqs.map((faq) => (
              <FAQItem key={faq.id} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
