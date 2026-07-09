'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { clsx } from '@/lib/utils/clsx';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-secondary/10">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id} className="py-4">
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between text-left font-heading font-medium"
              aria-expanded={isOpen}
            >
              {item.question}
              <ChevronDown
                size={20}
                className={clsx(
                  'shrink-0 transition-transform duration-hover',
                  isOpen && 'rotate-180'
                )}
              />
            </button>
            <div
              className={clsx(
                'grid overflow-hidden transition-all duration-scroll',
                isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <p className="min-h-0 font-body text-secondary/70">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
