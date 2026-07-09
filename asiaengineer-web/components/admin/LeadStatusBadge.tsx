export type LeadStatus =
  | 'Baru'
  | 'Dihubungi'
  | 'Survey Dijadwalkan'
  | 'Penawaran Dikirim'
  | 'Negosiasi'
  | 'Deal'
  | 'Tidak Jadi';

// Mapping warna eksplisit — sengaja tidak pakai fungsi hash warna otomatis
// biar warna tiap status konsisten & bisa diprediksi admin.
const STATUS_STYLES: Record<LeadStatus, string> = {
  Baru: 'bg-blue-100 text-blue-700',
  Dihubungi: 'bg-amber-100 text-amber-700',
  'Survey Dijadwalkan': 'bg-purple-100 text-purple-700',
  'Penawaran Dikirim': 'bg-orange-100 text-orange-700',
  Negosiasi: 'bg-yellow-100 text-yellow-800',
  Deal: 'bg-green-100 text-green-700',
  'Tidak Jadi': 'bg-red-100 text-red-700',
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-button px-3 py-1 font-body text-xs font-medium ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
