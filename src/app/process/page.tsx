import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionHeading, SectionLabel } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Proses Kerja",
  description: "Tahapan kerja Asia Engineer dari konsultasi awal hingga serah terima proyek.",
};

const STEPS = [
  { number: "01", title: "Konsultasi", desc: "Diskusi awal mengenai kebutuhan, target anggaran, dan visi proyek Anda." },
  { number: "02", title: "Survey Lokasi", desc: "Tim kami meninjau langsung kondisi lahan dan lingkungan sekitar." },
  { number: "03", title: "Review Desain", desc: "Penyusunan konsep desain dan struktur berdasarkan hasil survey." },
  { number: "04", title: "Perencanaan Anggaran", desc: "Penyusunan RAB (Rencana Anggaran Biaya) yang rinci dan transparan." },
  { number: "05", title: "Kontrak Kerja", desc: "Kesepakatan lingkup kerja, jadwal, dan ketentuan pembayaran tertulis." },
  { number: "06", title: "Konstruksi", desc: "Pelaksanaan pembangunan dengan pengawasan mutu berkala di lapangan." },
  { number: "07", title: "Inspeksi Kualitas", desc: "Pemeriksaan akhir terhadap struktur dan finishing sebelum serah terima." },
  { number: "08", title: "Serah Terima", desc: "Penyerahan bangunan lengkap dengan dokumentasi dan masa retensi." },
];

export default function ProcessPage() {
  return (
    <>
      <div className="relative flex h-[52vh] min-h-[380px] items-end bg-ink">
        <div className="container-content relative z-10 pb-16">
          <Reveal>
            <SectionLabel dark>Proses Kerja</SectionLabel>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl">
              Delapan tahap menuju bangunan yang Anda impikan.
            </h1>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content">
          <Reveal>
            <SectionHeading eyebrow="Alur Kerja" title="Transparan dari awal hingga akhir proyek." />
          </Reveal>
          <div className="mt-16 space-y-0">
            {STEPS.map((step, i) => (
              <Reveal key={step.number}>
                <div className="flex flex-col gap-6 border-t border-line py-10 sm:flex-row sm:items-center sm:gap-12">
                  <span className="font-mono-num text-4xl font-bold text-accent sm:w-24 sm:text-5xl">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 max-w-xl leading-relaxed text-muted">{step.desc}</p>
                  </div>
                </div>
                {i === STEPS.length - 1 && <div className="border-t border-line" />}
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section dark className="text-center">
        <div className="container-content">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Mulai proyek Anda dengan konsultasi tanpa biaya.
            </h2>
            <div className="mt-8">
              <ButtonLink href="/contact">Konsultasi Sekarang</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
