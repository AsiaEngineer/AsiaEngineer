"use client";

import { useState } from "react";
import type { faq } from "@/db/schema";

type Faq = typeof faq.$inferSelect;

export default function FaqAccordion({ items }: { items: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  if (items.length === 0) {
    return <p className="text-muted">Belum ada pertanyaan pada kategori ini.</p>;
  }

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="font-heading text-lg font-semibold text-ink sm:text-xl">
                {item.question}
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-lg transition-transform duration-300 ${
                  isOpen ? "rotate-45 border-accent text-accent" : "text-ink"
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className="grid overflow-hidden transition-all duration-500 ease-in-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 leading-relaxed text-muted">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
