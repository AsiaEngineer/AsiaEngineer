"use client";

import Image from "next/image";
import { Field, inputClass, textareaClass } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import type { services } from "@/db/schema";

type Service = typeof services.$inferSelect;

export default function ServiceForm({
  action,
  service,
}: {
  action: (formData: FormData) => void;
  service?: Service;
}) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Judul Layanan" htmlFor="title">
          <input id="title" name="title" required defaultValue={service?.title} className={inputClass} />
        </Field>
        <Field label="Slug" htmlFor="slug">
          <input id="slug" name="slug" defaultValue={service?.slug} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field label="Ikon" htmlFor="icon" hint="home, building, factory, hammer, layout, clipboard">
          <input id="icon" name="icon" defaultValue={service?.icon} className={inputClass} />
        </Field>
        <Field label="Urutan Tampil" htmlFor="displayOrder">
          <input id="displayOrder" name="displayOrder" type="number" defaultValue={service?.displayOrder ?? 0} className={inputClass} />
        </Field>
        <Field label="Status" htmlFor="status">
          <select id="status" name="status" defaultValue={service?.status ?? "published"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </Field>
      </div>

      <Field label="Deskripsi Singkat" htmlFor="description">
        <textarea id="description" name="description" defaultValue={service?.description} className={textareaClass} />
      </Field>

      <Field label="Konten Lengkap" htmlFor="content">
        <textarea id="content" name="content" defaultValue={service?.content} className={textareaClass} />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Manfaat (satu per baris)" htmlFor="benefits">
          <textarea id="benefits" name="benefits" defaultValue={service?.benefits.join("\n")} className={textareaClass} />
        </Field>
        <Field label="Alur Kerja (satu per baris)" htmlFor="workflow">
          <textarea id="workflow" name="workflow" defaultValue={service?.workflow.join("\n")} className={textareaClass} />
        </Field>
      </div>

      <Field label="Gambar Hero" htmlFor="heroImageFile">
        {service?.heroImage && (
          <div className="relative mb-3 h-32 w-full max-w-sm overflow-hidden rounded-xl bg-neutral">
            <Image src={service.heroImage} alt="Gambar saat ini" fill className="object-cover" />
          </div>
        )}
        <input id="heroImageFile" name="heroImageFile" type="file" accept="image/*" className={inputClass} />
      </Field>

      <div className="flex items-center gap-3">
        <input id="featured" name="featured" type="checkbox" defaultChecked={service?.featured} className="h-5 w-5 accent-accent" />
        <label htmlFor="featured" className="text-sm font-medium text-ink">
          Tampilkan di beranda
        </label>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="SEO Title" htmlFor="seoTitle">
          <input id="seoTitle" name="seoTitle" defaultValue={service?.seoTitle} className={inputClass} />
        </Field>
        <Field label="SEO Description" htmlFor="seoDescription">
          <input id="seoDescription" name="seoDescription" defaultValue={service?.seoDescription} className={inputClass} />
        </Field>
      </div>

      <Button type="submit">Simpan Layanan</Button>
    </form>
  );
}
