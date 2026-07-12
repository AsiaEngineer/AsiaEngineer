import type { Metadata } from "next";
import { Section, SectionLabel } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description: "Syarat dan ketentuan penggunaan layanan Asia Engineer.",
};

export default function TermsPage() {
  return (
    <>
      <div className="bg-ink pb-16 pt-40">
        <div className="container-content">
          <SectionLabel dark>Legal</SectionLabel>
          <h1 className="font-heading text-4xl font-bold text-white">Syarat & Ketentuan</h1>
        </div>
      </div>
      <Section className="bg-white">
        <div className="container-content max-w-3xl space-y-8 leading-relaxed text-muted">
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">1. Ruang Lingkup Layanan</h2>
            <p className="mt-3">
              Ketentuan ini berlaku untuk seluruh interaksi antara pengunjung situs web ini dengan
              Asia Engineer, termasuk permintaan informasi, konsultasi, dan pengajuan proyek.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">2. Akurasi Informasi</h2>
            <p className="mt-3">
              Kami berupaya menjaga akurasi informasi yang ditampilkan di situs ini. Namun, detail
              akhir proyek — termasuk harga, jadwal, dan spesifikasi — akan ditetapkan melalui
              kontrak kerja tertulis.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">3. Hak Kekayaan Intelektual</h2>
            <p className="mt-3">
              Seluruh konten, gambar, dan materi pada situs ini adalah milik Asia Engineer dan
              tidak boleh digunakan tanpa izin tertulis.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">4. Batasan Tanggung Jawab</h2>
            <p className="mt-3">
              Asia Engineer tidak bertanggung jawab atas kerugian yang timbul dari penggunaan
              informasi di situs ini di luar konteks kerja sama resmi yang telah disepakati.
            </p>
          </div>
          <div>
            <h2 className="font-heading text-xl font-bold text-ink">5. Perubahan Ketentuan</h2>
            <p className="mt-3">
              Ketentuan ini dapat diperbarui sewaktu-waktu melalui panel admin dan akan berlaku
              efektif sejak dipublikasikan pada halaman ini.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
