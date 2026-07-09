import { Building2, HardHat, Ruler } from 'lucide-react';
import { Hero } from '@/components/sections/Hero';
import { CardLayanan } from '@/components/sections/CardLayanan';
import { CardPortofolio } from '@/components/sections/CardPortofolio';
import { CTASection } from '@/components/sections/CTASection';
import { FAQAccordion } from '@/components/ui/FAQAccordion';

// Semua data di bawah ini PLACEHOLDER untuk preview Tahap 2.
// Di Tahap 4, ini diganti fetch dari Supabase (hero_content, services, portfolio_projects, faqs).

const PLACEHOLDER_STATS = [
  { label: 'Proyek Selesai', value: '120+' },
  { label: 'Tahun Pengalaman', value: '15' },
  { label: 'Klien Puas', value: '98%' },
];

const PLACEHOLDER_SERVICES = [
  { icon: Building2, title: 'Konstruksi Bangunan', description: 'Ruko, rumah tinggal, hingga gedung komersial.' },
  { icon: HardHat, title: 'Renovasi', description: 'Renovasi total maupun sebagian dengan pengawasan ketat.' },
  { icon: Ruler, title: 'Desain & RAB', description: 'Perencanaan desain dan anggaran biaya yang transparan.' },
];

const PLACEHOLDER_PROJECTS = [
  { slug: 'ruko-2-lantai-bsd', title: 'Ruko 2 Lantai BSD', category: 'Komersial', location: 'Tangerang', thumbnailUrl: '/placeholder-project.jpg' },
  { slug: 'renovasi-rumah-menteng', title: 'Renovasi Rumah Menteng', category: 'Renovasi', location: 'Jakarta Pusat', thumbnailUrl: '/placeholder-project.jpg' },
  { slug: 'gudang-cikarang', title: 'Gudang Industri Cikarang', category: 'Industri', location: 'Bekasi', thumbnailUrl: '/placeholder-project.jpg' },
];

const PLACEHOLDER_FAQS = [
  { id: '1', question: 'Berapa lama proses survey?', answer: 'Survey lokasi biasanya dijadwalkan 1–3 hari setelah pengajuan.' },
  { id: '2', question: 'Apakah bisa konsultasi gratis?', answer: 'Ya, konsultasi awal via WhatsApp tidak dikenakan biaya.' },
];

export default function BerandaPage() {
  return (
    <>
      <Hero
        title="Wujudkan Bangunan Impian Anda Bersama Kontraktor Terpercaya"
        subtitle="Dari survey hingga serah terima — dikerjakan tim profesional dengan pengawasan penuh."
        ctaText="Minta Penawaran via WhatsApp"
        ctaHref="/kontak"
        backgroundImageUrl="/placeholder-hero.jpg"
        stats={PLACEHOLDER_STATS}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <h2 className="font-heading text-2xl font-bold text-secondary md:text-3xl">Layanan Kami</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PLACEHOLDER_SERVICES.map((s) => (
            <CardLayanan key={s.title} {...s} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <h2 className="font-heading text-2xl font-bold text-secondary md:text-3xl">Portofolio Unggulan</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {PLACEHOLDER_PROJECTS.map((p) => (
            <CardPortofolio key={p.slug} {...p} />
          ))}
        </div>
      </section>

      <CTASection
        title="Siap Mulai Proyek Anda?"
        description="Konsultasikan kebutuhan bangunan Anda sekarang, gratis dan tanpa komitmen."
        ctaText="Chat via WhatsApp"
        ctaHref="/kontak"
      />

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-8">
        <h2 className="font-heading text-2xl font-bold text-secondary md:text-3xl">FAQ</h2>
        <div className="mt-6">
          <FAQAccordion items={PLACEHOLDER_FAQS} />
        </div>
      </section>
    </>
  );
}
