"use client";

import { useState } from "react";
import Link from "next/link";
import { logoutAction } from "@/app/admin/logout/actions";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/projects", label: "Proyek" },
  { href: "/admin/gallery", label: "Galeri" },
  { href: "/admin/services", label: "Layanan" },
  { href: "/admin/team", label: "Tim" },
  { href: "/admin/testimonials", label: "Testimoni" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/articles", label: "Artikel" },
  { href: "/admin/messages", label: "Pesan Masuk" },
  { href: "/admin/settings", label: "Pengaturan" },
];

export default function MobileAdminNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-white px-5 py-4 lg:hidden">
      <p className="font-heading font-bold text-ink">Asia Engineer Admin</p>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg border border-line px-3 py-1.5 text-sm"
      >
        Menu
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full max-h-[70vh] overflow-y-auto border-b border-line bg-white p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-ink hover:bg-neutral"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <form action={logoutAction} className="mt-3 border-t border-line pt-3">
            <button type="submit" className="text-sm font-semibold text-accent">
              Keluar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
