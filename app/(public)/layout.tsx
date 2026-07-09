import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloatingButton } from '@/components/layout/WhatsAppFloatingButton';

// Angka-angka ini nanti diganti fetch dari tabel `settings` di Tahap 4.
// Untuk Tahap 2, ditulis eksplisit di sini supaya preview bisa langsung dicek.
const PLACEHOLDER_WHATSAPP = '628123456789';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer whatsappNumber={PLACEHOLDER_WHATSAPP} />
      <WhatsAppFloatingButton phoneNumber={PLACEHOLDER_WHATSAPP} />
    </>
  );
}
