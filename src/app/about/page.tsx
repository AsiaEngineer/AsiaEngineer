import type { Metadata } from "next";
import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionHeading, SectionLabel } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import TeamCard from "@/components/cards/TeamCard";
import { getTeam } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Mengenal Asia Engineer, perusahaan konstruksi yang mengutamakan presisi rekayasa, integritas, dan keselamatan kerja di setiap proyek.",
};

const TIMELINE = [
  { year: "Tahun Pendirian", title: "Awal Berdiri", desc: "Asia Engineer dibentuk oleh tim insinyur sipil dengan fokus pada kualitas struktur dan transparansi proses kerja." },
  { year: "Pertumbuhan", title: "Perluasan Layanan", desc: "Cakupan layanan berkembang dari residensial menuju proyek komersial dan industrial." },
  { year: "Hari Ini", title: "Fokus Saat Ini", desc: "Kami terus memperkuat standar mutu, keselamatan kerja, dan pengalaman klien di setiap proyek yang ditangani." },
  { year: "Ke Depan", title: "Visi Berkelanjutan", desc: "Mengembangkan metode konstruksi yang lebih efisien dan ramah lingkungan tanpa mengorbankan kualitas." },
];

const VALUES = [
  { title: "Presisi", desc: "Perhitungan struktur dan detail teknis dikerjakan dengan standar yang ketat." },
  { title: "Integritas", desc: "Kejujuran dalam anggaran, material, dan komunikasi dengan klien." },
  { title: "Keselamatan", desc: "Standar K3 diterapkan konsisten untuk melindungi seluruh tim di lapangan." },
  { title: "Inovasi", desc: "Terbuka terhadap metode dan material konstruksi yang lebih efisien." },
  { title: "Komitmen", desc: "Menyelesaikan setiap proyek sesuai kesepakatan waktu dan mutu." },
];

const COMPARISON = [
  { aspect: "Perencanaan", asia: "Perhitungan struktur detail sebelum konstruksi dimulai", typical: "Sering langsung eksekusi tanpa perencanaan matang" },
  { aspect: "Kualitas Material", asia: "Material diverifikasi sesuai spesifikasi teknis", typical: "Kualitas material tidak selalu konsisten" },
  { aspect: "Pengawasan", asia: "Pengawasan mutu berkala di setiap tahap", typical: "Pengawasan minim setelah kontrak berjalan" },
  { aspect: "Keselamatan", asia: "Standar K3 diterapkan di seluruh lokasi kerja", typical: "Standar keselamatan sering diabaikan" },
  { aspect: "Transparansi", asia: "Laporan progres dan anggaran disampaikan berkala", typical: "Komunikasi progres terbatas" },
];

export default async function AboutPage() {
  const team = await getTeam();

  return (
    <>
      <div className="relative flex h-[70vh] min-h-[480px] items-end overflow-hidden bg-ink">
        <Image
          src="/images/about/about-office.jpg"
          alt="Ilustrasi tim insinyur Asia Engineer meninjau rencana konstruksi"
          fill
          priority
          className="object-cover opacity-70"
        />
        <span className="absolute right-6 top-24 z-10 rounded-full border border-white/25 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/70 backdrop-blur-sm">
          Ilustrasi Konsep
        </span>
        <div className="container-content relative z-10 pb-20">
          <Reveal>
            <SectionLabel dark>Tentang Kami</SectionLabel>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              Insinyur di balik setiap struktur yang kami bangun.
            </h1>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>Perjalanan Kami</SectionLabel>
            <h2 className="font-heading text-3xl font-bold text-ink sm:text-4xl">Cerita Asia Engineer</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              Asia Engineer hadir sebagai perusahaan konstruksi yang mengutamakan pendekatan
              rekayasa dalam setiap keputusan pembangunan. Kami percaya hasil yang baik berasal
              dari perencanaan yang matang, pengawasan yang konsisten, dan komunikasi yang jujur
              dengan klien.
            </p>
          </Reveal>
          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="border-l-2 border-line pl-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{item.year}</p>
                  <h3 className="mt-2 font-heading text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-neutral">
        <div className="container-content grid grid-cols-1 gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionLabel>Visi</SectionLabel>
            <p className="mt-4 font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl">
              Menjadi mitra konstruksi paling dipercaya untuk proyek residensial, komersial, dan
              industrial di Indonesia.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionLabel>Misi</SectionLabel>
            <p className="mt-4 font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl">
              Menghadirkan proses konstruksi yang presisi, transparan, dan aman bagi setiap klien
              dan tim di lapangan.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section className="bg-white">
        <div className="container-content">
          <Reveal>
            <SectionHeading eyebrow="Nilai Inti" title="Prinsip yang memandu setiap pekerjaan kami." />
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.05}>
                <div className="h-full rounded-[20px] border border-line p-6">
                  <h3 className="font-heading text-lg font-bold text-ink">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {team.length > 0 && (
        <Section className="bg-neutral">
          <div className="container-content">
            <Reveal>
              <SectionHeading eyebrow="Tim Kami" title="Orang-orang di balik Asia Engineer." />
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {team.map((member) => (
                <Reveal key={member.id}>
                  <TeamCard member={member} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>
      )}

      <Section className="bg-white">
        <div className="container-content">
          <Reveal>
            <SectionHeading eyebrow="Perbandingan" title="Mengapa memilih Asia Engineer." />
          </Reveal>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line text-sm text-muted">
                  <th className="py-4 pr-4 font-medium">Aspek</th>
                  <th className="py-4 pr-4 font-medium text-accent">Asia Engineer</th>
                  <th className="py-4 font-medium">Kontraktor Umum</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.aspect} className="border-b border-line/70">
                    <td className="py-5 pr-4 font-semibold text-ink">{row.aspect}</td>
                    <td className="py-5 pr-4 text-sm text-ink">{row.asia}</td>
                    <td className="py-5 text-sm text-muted">{row.typical}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section dark className="text-center">
        <div className="container-content">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold text-white sm:text-4xl">
              Mari diskusikan proyek Anda bersama tim insinyur kami.
            </h2>
            <div className="mt-8">
              <ButtonLink href="/contact">Hubungi Insinyur Kami</ButtonLink>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
