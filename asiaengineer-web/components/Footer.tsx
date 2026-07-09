import Link from 'next/link';

const FOOTER_LINKS = [
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/portofolio', label: 'Portofolio' },
  { href: '/kontak', label: 'Kontak' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms' },
];

export function Footer({
  businessName = 'asiaengineer',
  address,
  whatsappNumber,
}: {
  businessName?: string;
  address?: string;
  whatsappNumber?: string;
}) {
  return (
    <footer className="bg-secondary text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-heading text-lg font-bold">{businessName}</p>
          {address && <p className="mt-2 font-body text-sm text-white/70">{address}</p>}
        </div>

        <nav>
          <p className="font-heading text-sm font-semibold uppercase tracking-wide text-white/50">
            Navigasi
          </p>
          <ul className="mt-3 space-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-body text-sm text-white/80 hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {whatsappNumber && (
          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wide text-white/50">
              Kontak
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block font-body text-sm text-white/80 hover:text-primary"
            >
              WhatsApp: {whatsappNumber}
            </a>
          </div>
        )}
      </div>

      <div className="border-t border-white/10 py-4 text-center font-body text-xs text-white/50">
        © {new Date().getFullYear()} {businessName}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
