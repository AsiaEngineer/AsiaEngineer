import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionLabel } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { getServiceBySlug, getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Layanan Tidak Ditemukan" };
  return {
    title: service.seoTitle || service.title,
    description: service.seoDescription || service.description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [service, allServices] = await Promise.all([getServiceBySlug(slug), getServices()]);

  if (!service) notFound();

  const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="relative flex h-[56vh] min-h-[400px] items-end overflow-hidden bg-ink">
        {service.heroImage ? (
          <Image src={service.heroImage} alt={service.title} fill className="object-cover opacity-60" />
        ) : null}
        <div className="container-content relative z-10 pb-16">
          <Reveal>
            <SectionLabel dark>Layanan</SectionLabel>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl">
              {service.title}
            </h1>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-lg leading-relaxed text-muted">{service.content || service.description}</p>
            </Reveal>

            {service.benefits.length > 0 && (
              <Reveal delay={0.1}>
                <h2 className="mt-12 font-heading text-2xl font-bold text-ink">Manfaat</h2>
                <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 rounded-2xl bg-neutral p-5 text-sm text-ink">
                      <span className="mt-0.5 text-accent">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {service.workflow.length > 0 && (
              <Reveal delay={0.15}>
                <h2 className="mt-12 font-heading text-2xl font-bold text-ink">Alur Kerja</h2>
                <ol className="mt-6 space-y-4">
                  {service.workflow.map((step, i) => (
                    <li key={step} className="flex items-start gap-4 border-b border-line pb-4">
                      <span className="font-mono-num text-sm font-semibold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-ink">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal>
              <div className="rounded-[24px] border border-line bg-neutral p-8">
                <h3 className="font-heading text-xl font-bold text-ink">Tertarik dengan layanan ini?</h3>
                <p className="mt-3 text-sm text-muted">
                  Konsultasikan kebutuhan proyek Anda dengan tim insinyur kami tanpa biaya awal.
                </p>
                <ButtonLink href="/contact" className="mt-6 w-full justify-center">
                  Ajukan Konsultasi
                </ButtonLink>
              </div>
            </Reveal>

            {otherServices.length > 0 && (
              <Reveal delay={0.1}>
                <div className="mt-8">
                  <h3 className="font-heading text-lg font-bold text-ink">Layanan Lainnya</h3>
                  <ul className="mt-4 space-y-3">
                    {otherServices.map((s) => (
                      <li key={s.id}>
                        <a href={`/services/${s.slug}`} className="text-sm text-muted hover:text-accent">
                          {s.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
