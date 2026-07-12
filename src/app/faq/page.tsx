import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionLabel } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import FaqExplorer from "@/components/faq/FaqExplorer";
import { getFaq } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
  description: "Jawaban atas pertanyaan umum seputar layanan konstruksi Asia Engineer.",
};

export default async function FaqPage() {
  const items = await getFaq();

  return (
    <>
      <div className="relative flex h-[46vh] min-h-[340px] items-end bg-ink">
        <div className="container-content relative z-10 pb-16">
          <Reveal>
            <SectionLabel dark>FAQ</SectionLabel>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl">
              Pertanyaan yang sering diajukan.
            </h1>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content max-w-3xl">
          <FaqExplorer items={items} />

          <div className="mt-14 rounded-[24px] bg-neutral p-8 text-center">
            <p className="font-heading text-xl font-bold text-ink">Masih ada pertanyaan lain?</p>
            <p className="mt-2 text-muted">Tim kami siap membantu menjawab kebutuhan spesifik proyek Anda.</p>
            <ButtonLink href="/contact" className="mt-6">
              Hubungi Kami
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
