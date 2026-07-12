import Link from "next/link";
import Image from "next/image";
import { categoryLabel } from "@/lib/utils";
import type { projects } from "@/db/schema";

type Project = typeof projects.$inferSelect;

export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group relative block overflow-hidden rounded-[24px] bg-neutral"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/11]">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-neutral text-sm text-muted">
            Gambar belum tersedia
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
        <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
          Ilustrasi
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {categoryLabel(project.category)} · {project.year}
            </p>
            <h3 className="mt-2 font-heading text-xl font-bold text-white sm:text-2xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-white/70">{project.location}</p>
          </div>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:rotate-45">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
