import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionHeading, SectionLabel } from "@/components/ui/Section";
import ServiceCard from "@/components/cards/ServiceCard";
import { getServices } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan konstruksi Asia Engineer meliputi residensial, komersial, industrial, renovasi, interior fit-out, dan manajemen proyek.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <div className="relative flex h-[52vh] min-h-[380px] items-end bg-ink">
        <div className="container-content relative z-10 pb-16">
          <Reveal>
            <SectionLabel dark>Layanan Kami</SectionLabel>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl">
              Solusi konstruksi menyeluruh, dari konsep hingga serah terima.
            </h1>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Kategori Layanan"
              title="Setiap layanan ditangani tim spesialis sesuai kompleksitasnya."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.04}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
