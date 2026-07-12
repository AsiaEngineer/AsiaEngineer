"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { gallery } from "@/db/schema";

type GalleryItem = typeof gallery.$inferSelect;

const CATEGORIES = [
  { value: "all", label: "Semua" },
  { value: "residential", label: "Residensial" },
  { value: "commercial", label: "Komersial" },
  { value: "industrial", label: "Industrial" },
  { value: "interior", label: "Interior" },
  { value: "construction", label: "Konstruksi" },
];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (category === "all" ? items : items.filter((i) => i.category === category)),
    [items, category]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            type="button"
            onClick={() => setCategory(cat.value)}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              category === cat.value ? "border-accent bg-accent text-white" : "border-line text-ink hover:border-accent"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted">Belum ada foto pada kategori ini.</p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral"
            >
              <Image
                src={item.image}
                alt={item.alt || item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </button>
          ))}
        </div>
      )}

      {activeIndex !== null && filtered[activeIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau gambar"
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-6"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            aria-label="Tutup"
            className="absolute right-6 top-6 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20"
            onClick={() => setActiveIndex(null)}
          >
            ×
          </button>
          {filtered.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Sebelumnya"
                className="absolute left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:left-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((activeIndex - 1 + filtered.length) % filtered.length);
                }}
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Berikutnya"
                className="absolute right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xl text-white hover:bg-white/20 sm:right-8"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((activeIndex + 1) % filtered.length);
                }}
              >
                ›
              </button>
            </>
          )}
          <div
            className="relative h-[70vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[activeIndex].image}
              alt={filtered[activeIndex].alt || filtered[activeIndex].title}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
