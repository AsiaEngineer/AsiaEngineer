import Link from "next/link";
import type { Settings } from "@/lib/data";

const FOOTER_NAV = [
  { href: "/about", label: "Tentang Kami" },
  { href: "/services", label: "Layanan" },
  { href: "/portfolio", label: "Portofolio" },
  { href: "/gallery", label: "Galeri" },
  { href: "/process", label: "Proses Kerja" },
  { href: "/faq", label: "FAQ" },
];

const LEGAL_NAV = [
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/terms", label: "Syarat & Ketentuan" },
];

export default function Footer({ settings }: { settings: Settings }) {
  const year = new Date().getFullYear();
  const hasSocial =
    settings.facebook || settings.instagram || settings.youtube || settings.linkedin;

  return (
    <footer className="blueprint-grid relative overflow-hidden bg-ink text-white">
      <div className="container-wide relative z-10 grid grid-cols-1 gap-14 py-20 lg:grid-cols-4 lg:gap-8 lg:py-24">
        <div className="lg:col-span-1">
          <p className="font-heading text-2xl font-bold">{settings.companyName || "Asia Engineer"}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Solusi konstruksi premium untuk proyek residensial, komersial, dan industrial dengan
            presisi rekayasa.
          </p>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
            Navigasi
          </p>
          <ul className="space-y-3">
            {FOOTER_NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-white/70 transition-colors hover:text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
            Kontak
          </p>
          <ul className="space-y-3 text-sm text-white/70">
            <li>{settings.address || "Alamat: Segera diisi Admin"}</li>
            <li>{settings.phone ? `Telp: ${settings.phone}` : "Telp: Segera diisi Admin"}</li>
            <li>{settings.companyEmail ? `Email: ${settings.companyEmail}` : "Email: Segera diisi Admin"}</li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-white/40">
            Media Sosial
          </p>
          {hasSocial ? (
            <ul className="space-y-3 text-sm text-white/70">
              {settings.instagram && (
                <li>
                  <a href={settings.instagram} className="hover:text-accent">
                    Instagram
                  </a>
                </li>
              )}
              {settings.facebook && (
                <li>
                  <a href={settings.facebook} className="hover:text-accent">
                    Facebook
                  </a>
                </li>
              )}
              {settings.linkedin && (
                <li>
                  <a href={settings.linkedin} className="hover:text-accent">
                    LinkedIn
                  </a>
                </li>
              )}
              {settings.youtube && (
                <li>
                  <a href={settings.youtube} className="hover:text-accent">
                    YouTube
                  </a>
                </li>
              )}
            </ul>
          ) : (
            <p className="placeholder-badge">Segera diisi Admin</p>
          )}
        </div>
      </div>

      <div className="container-wide relative z-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 text-xs text-white/40 lg:flex-row">
        <p>
          © {year} {settings.companyName || "Asia Engineer"}. Seluruh hak cipta dilindungi.
        </p>
        <div className="flex gap-6">
          {LEGAL_NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white/70">
              {item.label}
            </Link>
          ))}
          <a href="#top" className="hover:text-white/70">
            Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}
