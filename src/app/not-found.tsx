import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="blueprint-grid-dark relative flex min-h-[100svh] flex-col items-center justify-center bg-ink px-6 text-center text-white">
      <p className="font-mono-num text-sm uppercase tracking-[0.3em] text-accent">Error 404</p>
      <h1 className="mt-6 text-balance font-heading text-4xl font-bold sm:text-6xl">
        Blueprint Tidak Ditemukan
      </h1>
      <p className="mx-auto mt-6 max-w-md text-white/60">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan. Mari kembali ke jalur yang
        benar.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <ButtonLink href="/">Kembali ke Beranda</ButtonLink>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-[14px] border border-white/30 px-9 py-4 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-ink"
        >
          Hubungi Kami
        </Link>
      </div>
    </div>
  );
}
