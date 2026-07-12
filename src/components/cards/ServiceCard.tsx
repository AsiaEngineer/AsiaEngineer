import Link from "next/link";
import type { services } from "@/db/schema";

type Service = typeof services.$inferSelect;

const ICONS: Record<string, string> = {
  home: "⌂",
  building: "▦",
  factory: "⚙",
  hammer: "🔨",
  layout: "▤",
  clipboard: "☰",
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col justify-between rounded-[24px] border border-line bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_rgba(17,17,17,0.08)] lg:p-10"
    >
      <div>
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-neutral text-2xl text-ink transition-colors duration-500 group-hover:bg-accent group-hover:text-white">
          {ICONS[service.icon] ?? "▦"}
        </span>
        <h3 className="mt-6 font-heading text-2xl font-bold text-ink">{service.title}</h3>
        <p className="mt-3 text-base leading-relaxed text-muted">{service.description}</p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-accent">
        Selengkapnya
        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
      </div>
    </Link>
  );
}
