"use client";

import Image from "next/image";
import { Field, inputClass, textareaClass } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import type { articles } from "@/db/schema";

type Article = typeof articles.$inferSelect;

export default function ArticleForm({
  action,
  article,
}: {
  action: (formData: FormData) => void;
  article?: Article;
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Judul" htmlFor="title">
          <input id="title" name="title" required defaultValue={article?.title} className={inputClass} />
        </Field>
        <Field label="Slug" htmlFor="slug">
          <input id="slug" name="slug" defaultValue={article?.slug} className={inputClass} />
        </Field>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field label="Penulis" htmlFor="author">
          <input id="author" name="author" defaultValue={article?.author ?? "Tim Asia Engineer"} className={inputClass} />
        </Field>
        <Field label="Kategori" htmlFor="category">
          <input id="category" name="category" defaultValue={article?.category ?? "berita"} className={inputClass} />
        </Field>
        <Field label="Estimasi Baca (menit)" htmlFor="readingTime">
          <input id="readingTime" name="readingTime" type="number" defaultValue={article?.readingTime ?? 3} className={inputClass} />
        </Field>
      </div>
      <Field label="Ringkasan" htmlFor="excerpt">
        <textarea id="excerpt" name="excerpt" defaultValue={article?.excerpt} className={textareaClass} />
      </Field>
      <Field label="Konten" htmlFor="content">
        <textarea id="content" name="content" rows={10} defaultValue={article?.content} className={textareaClass} />
      </Field>
      <Field label="Gambar Sampul" htmlFor="coverFile">
        {article?.cover && (
          <div className="relative mb-3 h-32 w-full max-w-sm overflow-hidden rounded-xl bg-neutral">
            <Image src={article.cover} alt="Sampul saat ini" fill className="object-cover" />
          </div>
        )}
        <input id="coverFile" name="coverFile" type="file" accept="image/*" className={inputClass} />
      </Field>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input type="checkbox" name="published" defaultChecked={article?.published} className="h-5 w-5 accent-accent" />
          Publikasikan
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input type="checkbox" name="featured" defaultChecked={article?.featured} className="h-5 w-5 accent-accent" />
          Artikel unggulan
        </label>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="SEO Title" htmlFor="seoTitle">
          <input id="seoTitle" name="seoTitle" defaultValue={article?.seoTitle} className={inputClass} />
        </Field>
        <Field label="SEO Description" htmlFor="seoDescription">
          <input id="seoDescription" name="seoDescription" defaultValue={article?.seoDescription} className={inputClass} />
        </Field>
      </div>
      <Button type="submit">Simpan Artikel</Button>
    </form>
  );
}
