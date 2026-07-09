import { Button } from '@/components/ui/Button';

interface CTASectionProps {
  title: string;
  description?: string;
  ctaText: string;
  ctaHref: string;
}

/**
 * Section ajakan RFQ — dipakai berulang di akhir halaman Layanan,
 * Detail Proyek, dan Beranda. Teks & link 100% via props, jangan hardcode.
 */
export function CTASection({ title, description, ctaText, ctaHref }: CTASectionProps) {
  return (
    <section className="bg-primary-light">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8">
        <h2 className="font-heading text-2xl font-bold text-secondary md:text-3xl">{title}</h2>
        {description && (
          <p className="mx-auto mt-3 max-w-xl font-body text-secondary/70">{description}</p>
        )}
        <div className="mt-6">
          <Button size="lg" href={ctaHref}>
            {ctaText}
          </Button>
        </div>
      </div>
    </section>
  );
}
