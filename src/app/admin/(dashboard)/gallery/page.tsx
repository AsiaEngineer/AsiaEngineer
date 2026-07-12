import type { Metadata } from "next";
import Image from "next/image";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { gallery } from "@/db/schema";
import { AdminHeader, AdminCard, Field, inputClass } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import DeleteButton from "@/components/admin/DeleteButton";
import { createGalleryItem, deleteGalleryItem } from "./actions";

export const metadata: Metadata = { title: "Kelola Galeri" };
export const dynamic = "force-dynamic";

const CATEGORIES = ["residential", "commercial", "industrial", "interior", "construction", "completed"];

export default async function AdminGalleryPage() {
  const items = await db.select().from(gallery).orderBy(desc(gallery.createdAt));

  return (
    <div>
      <AdminHeader title="Kelola Galeri" description="Unggah foto untuk ditampilkan di halaman Galeri." />

      <AdminCard className="mb-8">
        <h2 className="font-heading text-lg font-bold text-ink">Unggah Foto Baru</h2>
        <form action={createGalleryItem} className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Field label="Judul" htmlFor="title">
            <input id="title" name="title" className={inputClass} />
          </Field>
          <Field label="Kategori" htmlFor="category">
            <select id="category" name="category" className={inputClass} defaultValue="residential">
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Teks Alt" htmlFor="alt">
            <input id="alt" name="alt" className={inputClass} />
          </Field>
          <Field label="Keterangan" htmlFor="caption">
            <input id="caption" name="caption" className={inputClass} />
          </Field>
          <Field label="File Gambar" htmlFor="imageFile">
            <input id="imageFile" name="imageFile" type="file" accept="image/*" required className={inputClass} />
          </Field>
          <div className="flex items-center gap-3 pt-8">
            <input id="featured" name="featured" type="checkbox" className="h-5 w-5 accent-accent" />
            <label htmlFor="featured" className="text-sm font-medium text-ink">
              Tandai sebagai unggulan
            </label>
          </div>
          <div className="sm:col-span-2">
            <Button type="submit">Unggah Foto</Button>
          </div>
        </form>
      </AdminCard>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="overflow-hidden rounded-2xl border border-line bg-white">
            <div className="relative aspect-square">
              <Image src={item.image} alt={item.alt || item.title} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-medium text-ink">{item.title || "(Tanpa judul)"}</p>
              <p className="text-xs capitalize text-muted">{item.category}</p>
              <div className="mt-2">
                <DeleteButton action={deleteGalleryItem.bind(null, item.id)} />
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-muted">Belum ada foto di galeri.</p>}
      </div>
    </div>
  );
}
