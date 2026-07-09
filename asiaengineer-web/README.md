# asiaengineer-web — Tahap 2

Project ini adalah **fondasi** (Setup Project & Design System) sesuai roadmap 10 tahap.
Belum ada koneksi database sungguhan — semua data di halaman beranda masih **placeholder**,
dan itu sudah sesuai rencana (Tahap 3 baru bikin database, Tahap 4 baru sambungkan datanya).

## Cara menjalankan di komputermu

1. Extract zip ini, buka terminal di foldernya.
2. `npm install`
3. Salin `.env.example` jadi `.env.local`, isi dengan key dari Supabase & Resend
   (boleh dikosongkan dulu untuk sekadar lihat tampilan — belum dipakai di Tahap 2 ini).
4. `npm run dev` → buka `http://localhost:3000`
5. Kalau tampilan beranda placeholder sudah muncul dengan benar (hero, layanan, portofolio, FAQ, tombol WA di kanan bawah) — Tahap 2 selesai, boleh lanjut ke Tahap 3.

## Deploy ke Vercel

1. Push folder ini ke repo GitHub kamu.
2. Import repo di Vercel.
3. Isi environment variables yang sama seperti `.env.local` di Project Settings → Environment Variables Vercel.
4. Deploy.

## Yang sudah ada

- Design tokens aktif (`tailwind.config.ts`, `app/globals.css`) — warna, font Poppins/Inter, radius, shadow, durasi animasi sesuai section 3 master prompt.
- 11 komponen dasar: `Button`, `Card`, `Modal`, `FAQAccordion`, `Navbar`, `Footer`, `WhatsAppFloatingButton`, `Hero`, `CTASection`, `CardPortofolio`, `CardLayanan`, `ImageGallery`, `LeadStatusBadge`.
- Halaman beranda contoh yang memakai semua komponen di atas dengan data placeholder — bukti design system jalan, bukan halaman final.

## Yang BELUM ada (menyusul di tahap berikutnya)

- Koneksi Supabase (Tahap 3) — folder `lib/supabase/` sengaja masih kosong.
- Halaman publik lain (Tentang, Layanan, Portofolio, dst) — Tahap 4.
- Dashboard admin — Tahap 5.
- Ganti `placeholder-hero.jpg` & `placeholder-project.jpg` di folder `/public` dengan foto asli — dilakukan admin lewat CMS setelah Tahap 5/6, bukan dengan ganti file manual.

## Catatan keamanan

`SUPABASE_SERVICE_ROLE_KEY` di `.env.example` cuma boleh dipakai di kode server
(route handler `/api/*`), tidak pernah di client component — key ini bypass semua RLS.
