import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionLabel } from "@/components/ui/Section";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { getGallery } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Galeri visual proyek dan progres konstruksi Asia Engineer.",
};

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <div className="relative flex h-[52vh] min-h-[380px] items-end bg-ink">
        <div className="container-content relative z-10 pb-16">
          <Reveal>
            <SectionLabel dark>Galeri</SectionLabel>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl">
              Dokumentasi visual setiap tahap pekerjaan kami.
            </h1>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content">
          <GalleryGrid items={items} />
        </div>
      </Section>
    </>
  );
}
