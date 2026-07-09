type ClassValue = string | number | boolean | undefined | null;

/**
 * Penggabung className ringan. Kalau nanti butuh conditional class yang lebih
 * kompleks, bisa upgrade ke library `clsx` — tapi untuk kebutuhan sekarang
 * fungsi kecil ini cukup dan menghindari dependency tambahan.
 */
export function clsx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
