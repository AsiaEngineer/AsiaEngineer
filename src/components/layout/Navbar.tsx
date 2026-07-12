"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Settings } from "@/lib/data";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang" },
  { href: "/services", label: "Layanan" },
  { href: "/portfolio", label: "Portofolio" },
  { href: "/gallery", label: "Galeri" },
  { href: "/process", label: "Proses" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Kontak" },
];

export default function Navbar({ settings }: { settings: Settings }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "bg-white/95 shadow-[0_4px_30px_rgba(0,0,0,0.06)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <nav
        className={`container-wide flex items-center justify-between transition-all duration-500 ${
          scrolled ? "h-[72px]" : "h-[88px]"
        }`}
      >
        <Link
          href="/"
          className={`font-heading text-lg font-bold tracking-tight transition-colors ${
            solid ? "text-ink" : "text-white"
          }`}
        >
          {settings.companyName || "Asia Engineer"}
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-accent ${
                pathname === link.href ? "text-accent" : solid ? "text-ink" : "text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(255,107,0,0.3)]"
          >
            Hubungi Kami
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Tutup menu" : "Buka menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-[2px] w-6 transition-all duration-300 ${
              solid ? "bg-ink" : "bg-white"
            } ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`h-[2px] w-6 transition-all duration-300 ${
              solid ? "bg-ink" : "bg-white"
            } ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`h-[2px] w-6 transition-all duration-300 ${
              solid ? "bg-ink" : "bg-white"
            } ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 top-0 z-40 flex flex-col bg-ink text-white transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="mt-[88px] flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={`border-b border-white/10 py-4 text-3xl font-heading font-semibold transition-all duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              } ${pathname === link.href ? "text-accent" : "text-white"}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="px-8 pb-10 text-sm text-white/50">
          {settings.whatsapp ? (
            <a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`} className="text-accent">
              WhatsApp: {settings.whatsapp}
            </a>
          ) : (
            "Hubungi kami"
          )}
        </div>
      </div>
    </header>
  );
}
