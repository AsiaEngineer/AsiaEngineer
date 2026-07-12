"use client";

import { useMemo, useState } from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import { PROJECT_CATEGORIES } from "@/lib/utils";
import type { projects } from "@/db/schema";

type Project = typeof projects.$inferSelect;

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const query = search.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.title.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, search]);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "border-accent bg-accent text-white"
                : "border-line text-ink hover:border-accent"
            }`}
          >
            Semua
          </button>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                activeCategory === cat.value
                  ? "border-accent bg-accent text-white"
                  : "border-line text-ink hover:border-accent"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full lg:w-72">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama proyek atau lokasi..."
            aria-label="Cari proyek"
            className="w-full rounded-full border border-line bg-white px-5 py-2.5 text-sm focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted">
          Tidak ada proyek yang cocok dengan pencarian Anda.
        </p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} priority={i < 2} />
          ))}
        </div>
      )}
    </div>
  );
}
