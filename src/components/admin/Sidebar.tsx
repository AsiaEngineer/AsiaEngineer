"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/logout/actions";

const NAV_GROUPS = [
  {
    label: "Utama",
    items: [{ href: "/admin", label: "Dashboard", icon: "▦" }],
  },
  {
    label: "Konten",
    items: [
      { href: "/admin/projects", label: "Proyek", icon: "🏗" },
      { href: "/admin/gallery", label: "Galeri", icon: "🖼" },
      { href: "/admin/services", label: "Layanan", icon: "⚙" },
      { href: "/admin/team", label: "Tim", icon: "👤" },
      { href: "/admin/testimonials", label: "Testimoni", icon: "💬" },
      { href: "/admin/faq", label: "FAQ", icon: "❓" },
      { href: "/admin/articles", label: "Artikel", icon: "📰" },
    ],
  },
  {
    label: "Operasional",
    items: [
      { href: "/admin/messages", label: "Pesan Masuk", icon: "✉" },
      { href: "/admin/settings", label: "Pengaturan", icon: "⚒" },
    ],
  },
];

export default function Sidebar({ name, role }: { name: string; role: string }) {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-ink text-white lg:flex">
      <div className="border-b border-white/10 px-7 py-7">
        <p className="font-heading text-lg font-bold">Asia Engineer</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/40">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-8 overflow-y-auto px-4 py-6">
        {NAV_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
              {group.label}
            </p>
            <div className="mt-3 space-y-1">
              {group.items.map((item) => {
                const active = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                      active ? "bg-accent text-white" : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span aria-hidden="true">{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-6 py-6">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-xs capitalize text-white/40">{role.replace("_", " ")}</p>
        <form action={logoutAction}>
          <button type="submit" className="mt-4 text-xs font-semibold uppercase tracking-wider text-white/50 hover:text-accent">
            Keluar
          </button>
        </form>
      </div>
    </aside>
  );
}
