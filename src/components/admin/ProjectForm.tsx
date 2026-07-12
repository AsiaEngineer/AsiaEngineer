"use client";

import Image from "next/image";
import { Field, inputClass, textareaClass } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import { PROJECT_CATEGORIES } from "@/lib/utils";
import type { projects } from "@/db/schema";

type Project = typeof projects.$inferSelect;

export default function ProjectForm({
  action,
  project,
}: {
  action: (formData: FormData) => void;
  project?: Project;
}) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Judul Proyek" htmlFor="title">
          <input id="title" name="title" required defaultValue={project?.title} className={inputClass} />
        </Field>
        <Field label="Slug (opsional, otomatis dari judul)" htmlFor="slug">
          <input id="slug" name="slug" defaultValue={project?.slug} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field label="Kategori" htmlFor="category">
          <select id="category" name="category" defaultValue={project?.category ?? "residential"} className={inputClass}>
            {PROJECT_CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Tahun" htmlFor="year">
          <input id="year" name="year" type="number" defaultValue={project?.year ?? new Date().getFullYear()} className={inputClass} />
        </Field>
        <Field label="Status Publikasi" htmlFor="statusPublish">
          <select id="statusPublish" name="statusPublish" defaultValue={project?.statusPublish ?? "published"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Lokasi" htmlFor="location">
          <input id="location" name="location" defaultValue={project?.location} className={inputClass} />
        </Field>
        <Field label="Provinsi" htmlFor="province">
          <input id="province" name="province" defaultValue={project?.province} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field label="Klien" htmlFor="client">
          <input id="client" name="client" defaultValue={project?.client} className={inputClass} />
        </Field>
        <Field label="Luas Area" htmlFor="area">
          <input id="area" name="area" placeholder="cth. 320 m²" defaultValue={project?.area} className={inputClass} />
        </Field>
        <Field label="Durasi" htmlFor="duration">
          <input id="duration" name="duration" placeholder="cth. 8 bulan" defaultValue={project?.duration} className={inputClass} />
        </Field>
      </div>

      <Field label="Ringkasan Singkat" htmlFor="shortDescription">
        <textarea id="shortDescription" name="shortDescription" defaultValue={project?.shortDescription} className={textareaClass} />
      </Field>

      <Field label="Deskripsi Lengkap" htmlFor="fullDescription">
        <textarea id="fullDescription" name="fullDescription" defaultValue={project?.fullDescription} className={textareaClass} />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Tantangan" htmlFor="challenges">
          <textarea id="challenges" name="challenges" defaultValue={project?.challenges} className={textareaClass} />
        </Field>
        <Field label="Solusi Rekayasa" htmlFor="engineeringSolution">
          <textarea id="engineeringSolution" name="engineeringSolution" defaultValue={project?.engineeringSolution} className={textareaClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Metode Konstruksi" htmlFor="constructionMethod">
          <textarea id="constructionMethod" name="constructionMethod" defaultValue={project?.constructionMethod} className={textareaClass} />
        </Field>
        <Field label="Spesifikasi Material" htmlFor="materials">
          <textarea id="materials" name="materials" defaultValue={project?.materials} className={textareaClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Gambar Hero" htmlFor="heroImageFile" hint="Kosongkan jika tidak ingin mengganti gambar.">
          {project?.heroImage && (
            <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl bg-neutral">
              <Image src={project.heroImage} alt="Gambar hero saat ini" fill className="object-cover" />
            </div>
          )}
          <input id="heroImageFile" name="heroImageFile" type="file" accept="image/*" className={inputClass} />
        </Field>
        <Field label="Gambar Thumbnail" htmlFor="thumbnailFile" hint="Digunakan pada kartu portofolio.">
          {project?.thumbnail && (
            <div className="relative mb-3 h-32 w-full overflow-hidden rounded-xl bg-neutral">
              <Image src={project.thumbnail} alt="Thumbnail saat ini" fill className="object-cover" />
            </div>
          )}
          <input id="thumbnailFile" name="thumbnailFile" type="file" accept="image/*" className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Tag (pisahkan dengan koma)" htmlFor="tags">
          <input id="tags" name="tags" defaultValue={project?.tags.join(", ")} className={inputClass} />
        </Field>
        <div className="flex items-center gap-3 pt-8">
          <input id="featured" name="featured" type="checkbox" defaultChecked={project?.featured} className="h-5 w-5 accent-accent" />
          <label htmlFor="featured" className="text-sm font-medium text-ink">
            Tampilkan sebagai proyek unggulan
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="SEO Title" htmlFor="seoTitle">
          <input id="seoTitle" name="seoTitle" defaultValue={project?.seoTitle} className={inputClass} />
        </Field>
        <Field label="SEO Description" htmlFor="seoDescription">
          <input id="seoDescription" name="seoDescription" defaultValue={project?.seoDescription} className={inputClass} />
        </Field>
      </div>

      <Button type="submit">Simpan Proyek</Button>
    </form>
  );
}
