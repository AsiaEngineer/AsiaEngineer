import HeroCinematic from "@/components/home/HeroCinematic";
import Reveal from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import ServiceCard from "@/components/cards/ServiceCard";
import ProjectCard from "@/components/cards/ProjectCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import FaqAccordion from "@/components/faq/FaqAccordion";
import {
  getFeaturedProjects,
  getFaq,
  getServices,
  getSettings,
  getTestimonials,
} from "@/lib/data";

export const dynamic = "force-dynamic";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Konsultasi",
    description:
      "Kami mendengarkan kebutuhan, target anggaran, dan visi Anda untuk menyusun arah proyek yang tepat.",
  },
  {
    number: "02",
    title: "Perencanaan",
    description:
      "Tim insinyur menyusun desain struktur, RAB, dan jadwal kerja secara rinci sebelum konstruksi dimulai.",
  },
  {
    number: "03",
    title: "Konstruksi",
    description:
      "Pelaksanaan di lapangan diawasi ketat untuk memastikan mutu material dan metode kerja sesuai standar.",
  },
  {
    number: "04",
    title: "Serah Terima",
    description:
      "Setelah inspeksi akhir, proyek diserahterimakan lengkap dengan dokumentasi dan masa retensi.",
  },
];

export default async function HomePage() {
  const [settings, services, featuredProjects, testimonials, faqItems] = await Promise.all([
    getSettings(),
    getServices(),
    getFeaturedProjects(),
    getTestimonials(),
    getFaq(),
  ]);

  return (
    <>
      <HeroCinematic />

      {/* COMPANY STATEMENT */}
      <Section className="bg-white">
        <div className="container-content">
          <Reveal>
            <p className="text-balance font-heading text-[26px] font-medium leading-[1.4] text-ink sm:text-[34px] lg:text-[44px]">
              {settings.companyName || "Asia Engineer"} membangun ruang yang kokoh secara struktur
              dan bermakna secara desain. Setiap proyek dikerjakan oleh tim insinyur yang
              memprioritaskan presisi, keselamatan, dan transparansi — dari perencanaan awal
              hingga hari serah terima.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* STATISTICS */}
      <Section className="bg-neutral py-16 lg:py-20">
        <div className="container-content grid grid-cols-2 gap-10 lg:grid-cols-4">
          {[
            { value: 40, suffix: "+", label: "Proyek Selesai" },
            { value: 8, suffix: "+", label: "Tahun Pengalaman" },
            { value: 25, suffix: "+", label: "Klien Terlayani" },
            { value: 50000, suffix: "+", label: "Meter Persegi Dibangun" },
          ].map((stat) => (
            <Reveal key={stat.label}>
              <p className="font-mono-num text-3xl font-bold text-ink sm:text-4xl lg:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FEATURED SERVICES */}
      <Section className="bg-white">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Layanan Kami"
              title="Solusi konstruksi menyeluruh untuk setiap kebutuhan."
              description="Dari hunian pribadi hingga fasilitas industrial berskala besar, kami menangani proyek dengan pendekatan rekayasa yang konsisten."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.slice(0, 6).map((service) => (
              <Reveal key={service.id}>
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <ButtonLink href="/services" variant="ghost" className="text-ink">
              Lihat Semua Layanan →
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* FEATURED PROJECTS */}
      <Section className="bg-neutral">
        <div className="container-content">
          <Reveal>
            <SectionHeading
              eyebrow="Portofolio Unggulan"
              title="Proyek yang membuktikan presisi rekayasa kami."
            />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featuredProjects.slice(0, 4).map((project, i) => (
              <Reveal key={project.id} className={i === 0 ? "lg:col-span-2" : ""}>
                <ProjectCard project={project} priority={i === 0} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <ButtonLink href="/portfolio" variant="ghost" className="text-ink">
              Lihat Semua Proyek →
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* ENGINEERING PHILOSOPHY */}
      <Section dark className="blueprint-grid relative overflow-hidden">
        <div className="container-content relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="Filosofi Rekayasa"
              dark
              title="Kami percaya bangunan yang baik lahir dari perhitungan yang benar, bukan sekadar tampilan."
              description="Setiap keputusan desain diuji terhadap standar struktur, efisiensi material, dan keselamatan jangka panjang — bukan tren sesaat."
            />
          </Reveal>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { title: "Presisi", desc: "Setiap ukuran dan beban dihitung secara cermat sebelum eksekusi." },
              { title: "Integritas", desc: "Material dan metode kerja diawasi tanpa kompromi terhadap mutu." },
              { title: "Keselamatan", desc: "Standar K3 diterapkan konsisten di setiap tahapan proyek." },
            ].map((item) => (
              <Reveal key={item.title}>
                <div className="border-t border-white/15 pt-6">
                  <h3 className="font-heading text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* PROCESS */}
      <Section className="bg-white">
        <div className="container-content">
          <Reveal>
            <SectionHeading eyebrow="Proses Kerja" title="Empat tahap menuju bangunan yang Anda impikan." />
          </Reveal>
          <div className="relative mt-16 grid grid-cols-1 gap-10 lg:grid-cols-4">
            <div className="absolute left-0 right-0 top-6 hidden h-px bg-line lg:block" aria-hidden="true" />
            {PROCESS_STEPS.map((step) => (
              <Reveal key={step.number}>
                <div className="relative">
                  <span className="font-mono-num text-sm font-semibold text-accent">{step.number}</span>
                  <h3 className="mt-4 font-heading text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <Section className="bg-neutral">
          <div className="container-content">
            <Reveal>
              <SectionHeading eyebrow="Testimoni Klien" title="Kepercayaan yang kami jaga di setiap proyek." />
            </Reveal>
            <div className="mt-14 flex snap-x gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-3 lg:overflow-visible">
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.id} className="snap-start">
                  <TestimonialCard testimonial={t} />
                </div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* FAQ PREVIEW */}
      {faqItems.length > 0 && (
        <Section className="bg-white">
          <div className="container-content max-w-3xl">
            <Reveal>
              <SectionHeading eyebrow="Pertanyaan Umum" title="Hal yang sering ditanyakan calon klien." />
            </Reveal>
            <div className="mt-12">
              <FaqAccordion items={faqItems.slice(0, 4)} />
            </div>
            <div className="mt-10">
              <ButtonLink href="/faq" variant="ghost" className="text-ink">
                Lihat Semua FAQ →
              </ButtonLink>
            </div>
          </div>
        </Section>
      )}

      {/* FINAL CTA */}
      <Section dark className="text-center">
        <div className="container-content">
          <Reveal>
            <h2 className="text-balance font-heading text-[32px] font-bold leading-tight text-white sm:text-[48px] lg:text-[56px]">
              Siap mewujudkan proyek konstruksi Anda?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-white/70">
              Konsultasikan kebutuhan Anda dengan tim insinyur kami. Tanpa tekanan, tanpa biaya konsultasi awal.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <ButtonLink href="/contact" variant="primary">
                Hubungi Kami Sekarang
              </ButtonLink>
              {settings.whatsapp ? (
                <ButtonLink
                  href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat via WhatsApp
                </ButtonLink>
              ) : (
                <span className="placeholder-badge">WhatsApp: Segera diisi Admin</span>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
