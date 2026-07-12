import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";
import { Section, SectionLabel } from "@/components/ui/Section";
import ContactForm from "@/components/contact/ContactForm";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hubungi Kami",
  description: "Ceritakan kebutuhan proyek konstruksi Anda kepada tim insinyur Asia Engineer.",
};

export default async function ContactPage() {
  const settings = await getSettings();

  const infoItems = [
    { label: "Alamat Kantor", value: settings.address },
    { label: "Telepon", value: settings.phone },
    { label: "WhatsApp", value: settings.whatsapp },
    { label: "Email", value: settings.companyEmail },
    { label: "Jam Operasional", value: settings.workingHours || "Senin – Jumat, 09.00 – 17.00 WIB" },
  ];

  return (
    <>
      <div className="relative flex h-[46vh] min-h-[340px] items-end bg-ink">
        <div className="container-content relative z-10 pb-16">
          <Reveal>
            <SectionLabel dark>Kontak</SectionLabel>
            <h1 className="max-w-2xl text-balance font-heading text-4xl font-bold text-white sm:text-5xl">
              Ceritakan Rencana Proyek Anda
            </h1>
            <p className="mt-4 max-w-lg text-white/70">
              Isi formulir di bawah ini dan tim kami akan merespons dalam 1–2 hari kerja.
            </p>
          </Reveal>
        </div>
      </div>

      <Section className="bg-white">
        <div className="container-content grid grid-cols-1 gap-14 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal>
              <div className="rounded-[24px] border border-line p-8">
                <h3 className="font-heading text-lg font-bold text-ink">Informasi Kontak</h3>
                <dl className="mt-6 space-y-5">
                  {infoItems.map((item) => (
                    <div key={item.label}>
                      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                        {item.label}
                      </dt>
                      <dd className="mt-1 text-sm text-ink">
                        {item.value || <span className="placeholder-badge">Segera diisi Admin</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[24px] border border-line">
                {settings.googleMaps ? (
                  <iframe
                    src={settings.googleMaps}
                    title="Lokasi Kantor Asia Engineer"
                    className="h-64 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="flex h-64 w-full flex-col items-center justify-center gap-3 bg-neutral text-center">
                    <span className="placeholder-badge">Peta Segera Diisi Admin</span>
                    <p className="max-w-[220px] text-xs text-muted">
                      Lokasi kantor akan ditampilkan di sini setelah tautan Google Maps ditambahkan.
                    </p>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
