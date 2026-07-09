import { MessageCircle } from 'lucide-react';

export function WhatsAppFloatingButton({
  phoneNumber,
  message = 'Halo, saya ingin bertanya soal layanan kontraktor.',
}: {
  phoneNumber: string;
  message?: string;
}) {
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform duration-hover hover:scale-105 active:scale-95"
    >
      <MessageCircle size={26} fill="white" strokeWidth={0} />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/40" />
    </a>
  );
}
