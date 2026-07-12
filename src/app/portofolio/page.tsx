import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionLabel } from "@/components/ui/Section";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portofolio",
  description:
    "Jelajahi portofolio proyek konstruksi Asia Engineer mulai dari residensial, komersial, hingga industrial.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <div className="relative flex h-[52vh] min-h-[380px] items-end bg-ink">
        <div className="container-content relative z-10 pb-16">
          <Reveal>
            <SectionLabel dark>Portofolio</SectionLabel>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl">
              Proyek yang mencerminkan presisi rekayasa kami.
            </h1>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content">
          <PortfolioGrid projects={projects} />
        </div>
      </Section>
    </>
  );
}
