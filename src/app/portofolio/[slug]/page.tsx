import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionLabel } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import ProjectCard from "@/components/cards/ProjectCard";
import { categoryLabel } from "@/lib/utils";
import { getProjectBySlug, getRelatedProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProjectBySlug(slug);
  if (!data) return { title: "Proyek Tidak Ditemukan" };
  const { project } = data;
  return {
    title: project.seoTitle || project.title,
    description: project.seoDescription || project.shortDescription,
    openGraph: { images: project.heroImage ? [project.heroImage] : [] },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getProjectBySlug(slug);
  if (!data) notFound();

  const { project, images } = data;
  const related = await getRelatedProjects(project.category, project.slug);

  const specs = [
    { label: "Kategori", value: categoryLabel(project.category) },
    { label: "Lokasi", value: `${project.location}${project.province ? ", " + project.province : ""}` },
    { label: "Klien", value: project.client || "Rahasia klien" },
    { label: "Tahun", value: String(project.year) },
    { label: "Luas Area", value: project.area || "-" },
    { label: "Durasi", value: project.duration || "-" },
    { label: "Status", value: project.status },
  ];

  return (
    <>
      <div className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden bg-ink">
        {project.heroImage ? (
          <Image src={project.heroImage} alt={project.title} fill priority className="object-cover opacity-70" />
        ) : null}
        <span className="absolute right-6 top-24 z-10 rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
          Ilustrasi Konsep
        </span>
        <div className="container-content relative z-10 pb-16">
          <Reveal>
            <SectionLabel dark>{categoryLabel(project.category)}</SectionLabel>
            <h1 className="max-w-3xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl">
              {project.title}
            </h1>
            <p className="mt-4 text-white/70">{project.location}{project.province ? `, ${project.province}` : ""}</p>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-ink">Ringkasan Proyek</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{project.fullDescription || project.shortDescription}</p>
            </Reveal>

            {project.challenges && (
              <Reveal delay={0.1}>
                <h2 className="mt-12 font-heading text-2xl font-bold text-ink">Tantangan</h2>
                <p className="mt-5 leading-relaxed text-muted">{project.challenges}</p>
              </Reveal>
            )}

            {project.engineeringSolution && (
              <Reveal delay={0.15}>
                <h2 className="mt-12 font-heading text-2xl font-bold text-ink">Solusi Rekayasa</h2>
                <p className="mt-5 leading-relaxed text-muted">{project.engineeringSolution}</p>
              </Reveal>
            )}

            {(project.constructionMethod || project.materials) && (
              <Reveal delay={0.2}>
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {project.constructionMethod && (
                    <div className="rounded-2xl bg-neutral p-6">
                      <h3 className="font-heading text-lg font-bold text-ink">Metode Konstruksi</h3>
                      <p className="mt-2 text-sm text-muted">{project.constructionMethod}</p>
                    </div>
                  )}
                  {project.materials && (
                    <div className="rounded-2xl bg-neutral p-6">
                      <h3 className="font-heading text-lg font-bold text-ink">Spesifikasi Material</h3>
                      <p className="mt-2 text-sm text-muted">{project.materials}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {images.length > 0 && (
              <Reveal delay={0.25}>
                <h2 className="mt-12 font-heading text-2xl font-bold text-ink">Galeri Proyek</h2>
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {images.map((img) => (
                    <div key={img.id} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral">
                      <Image src={img.image} alt={img.alt || project.title} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <div>
            <Reveal>
              <div className="rounded-[24px] border border-line p-8">
                <h3 className="font-heading text-lg font-bold text-ink">Informasi Proyek</h3>
                <dl className="mt-6 space-y-4">
                  {specs.map((spec) => (
                    <div key={spec.label} className="flex justify-between gap-4 border-b border-line pb-3 text-sm">
                      <dt className="text-muted">{spec.label}</dt>
                      <dd className="text-right font-medium text-ink">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <ButtonLink href="/contact" className="mt-8 w-full justify-center">
                  Diskusikan Proyek Serupa
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section className="bg-neutral">
          <div className="container-content">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">Proyek Terkait</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <Reveal key={p.id}>
                  <ProjectCard project={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  );
}
