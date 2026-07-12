"use client";

import { useMemo, useState } from "react";
import FaqAccordion from "@/components/faq/FaqAccordion";
import type { faq } from "@/db/schema";

type Faq = typeof faq.$inferSelect;

export default function FaqExplorer({ items }: { items: Faq[] }) {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((i) => i.category)));
    return unique;
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [items, category, search]);

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Cari pertanyaan..."
        aria-label="Cari FAQ"
        className="w-full rounded-full border border-line bg-white px-6 py-4 text-sm focus:border-accent focus:outline-none"
      />

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`rounded-full border px-5 py-2 text-sm font-medium capitalize transition-colors ${
            category === "all" ? "border-accent bg-accent text-white" : "border-line text-ink hover:border-accent"
          }`}
        >
          Semua
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`rounded-full border px-5 py-2 text-sm font-medium capitalize transition-colors ${
              category === cat ? "border-accent bg-accent text-white" : "border-line text-ink hover:border-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10">
        <FaqAccordion items={filtered} />
      </div>
    </div>
  );
}
