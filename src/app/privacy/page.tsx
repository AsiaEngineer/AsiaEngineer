import type { Metadata } from "next";
import { Section, SectionLabel } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: "Kebijakan privasi Asia Engineer terkait penggunaan data pengunjung dan klien.",
};

export default function PrivacyPage() {
  return (
    <>
      <div className="bg-ink pb-16 pt-40">
        <div className="container-content">
          <SectionLabel dark>Legal</SectionLabel>
          <h1 className="font-heading text-4xl font-bold text-white">Kebijakan Privasi</h1>
        </div>
      </div>
      <Section className="bg-white">
        <div className="container-content max-w-3xl space-y-8 leading-relaxed text-muted">
          <p>Terakhir diperbarui: dapat diedit melalui panel Admin.</p>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">1. Informasi yang Kami Kumpulkan</h2>
            <p className="mt-3">
              Kami dapat mengumpulkan informasi yang Anda berikan secara langsung melalui formulir
              kontak, seperti nama, alamat email, nomor telepon, dan detail proyek yang Anda
              sampaikan.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">2. Penggunaan Informasi</h2>
            <p className="mt-3">
              Informasi yang dikumpulkan digunakan semata-mata untuk merespons permintaan Anda,
              memberikan penawaran layanan, dan meningkatkan kualitas komunikasi antara Asia
              Engineer dan calon klien.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">3. Perlindungan Data</h2>
            <p className="mt-3">
              Kami menerapkan langkah keamanan yang wajar untuk melindungi data pribadi Anda dari
              akses, perubahan, atau pengungkapan yang tidak sah.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">4. Berbagi Informasi</h2>
            <p className="mt-3">
              Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga untuk
              kepentingan pemasaran tanpa persetujuan Anda.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">5. Kontak</h2>
            <p className="mt-3">
              Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, silakan hubungi kami
              melalui halaman Kontak.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
