import { Button } from '@/components/ui/Button';

interface HeroStat {
  label: string;
  value: string;
}

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaHref: string;
  backgroundImageUrl: string;
  stats?: HeroStat[];
}

export function Hero({ title, subtitle, ctaText, ctaHref, backgroundImageUrl, stats }: HeroProps) {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      />
      {/* Overlay gradasi — bukan overlay hitam flat, supaya foto proyek tetap "berbicara" */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-secondary via-secondary/40 to-secondary/10" />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-40 md:px-8 md:pb-28">
        <h1 className="max-w-2xl font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-xl font-body text-lg text-white/80">{subtitle}</p>

        <div className="mt-8">
          <Button size="lg" href={ctaHref}>
            {ctaText}
          </Button>
        </div>

        {stats && stats.length > 0 && (
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/20 pt-6 md:max-w-xl">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-heading text-2xl font-bold text-primary md:text-3xl">
                  {stat.value}
                </dt>
                <dd className="mt-1 font-body text-xs text-white/70 md:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
