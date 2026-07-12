export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: Date | string, locale = "id-ID"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

export function formatDateTime(date: Date | string, locale = "id-ID"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

export function truncate(text: string, length = 140): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + "…";
}

export const LEAD_STATUS_LABELS: Record<string, string> = {
  baru: "Baru Masuk",
  dihubungi: "Sudah Dihubungi",
  survey_dijadwalkan: "Survey Dijadwalkan",
  penawaran_dikirim: "Penawaran Dikirim",
  negosiasi: "Negosiasi",
  deal: "Deal",
  tidak_jadi: "Tidak Jadi",
};

export const LEAD_STATUS_ORDER = [
  "baru",
  "dihubungi",
  "survey_dijadwalkan",
  "penawaran_dikirim",
  "negosiasi",
  "deal",
  "tidak_jadi",
];

export const LEAD_STATUS_COLORS: Record<string, string> = {
  baru: "bg-blue-100 text-blue-700 border-blue-200",
  dihubungi: "bg-amber-100 text-amber-700 border-amber-200",
  survey_dijadwalkan: "bg-purple-100 text-purple-700 border-purple-200",
  penawaran_dikirim: "bg-indigo-100 text-indigo-700 border-indigo-200",
  negosiasi: "bg-orange-100 text-orange-700 border-orange-200",
  deal: "bg-emerald-100 text-emerald-700 border-emerald-200",
  tidak_jadi: "bg-red-100 text-red-700 border-red-200",
};

export const PROJECT_CATEGORIES = [
  { value: "residential", label: "Residensial" },
  { value: "commercial", label: "Komersial" },
  { value: "industrial", label: "Industrial" },
  { value: "government", label: "Pemerintahan" },
  { value: "interior", label: "Interior" },
  { value: "renovation", label: "Renovasi" },
];

export function categoryLabel(value: string): string {
  return PROJECT_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
