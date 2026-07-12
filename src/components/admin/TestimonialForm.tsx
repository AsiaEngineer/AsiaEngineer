"use client";

import Image from "next/image";
import { Field, inputClass, textareaClass } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import type { testimonials } from "@/db/schema";

type Testimonial = typeof testimonials.$inferSelect;

export default function TestimonialForm({
  action,
  testimonial,
}: {
  action: (formData: FormData) => void;
  testimonial?: Testimonial;
}) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Nama Klien" htmlFor="clientName">
          <input id="clientName" name="clientName" required defaultValue={testimonial?.clientName} className={inputClass} />
        </Field>
        <Field label="Perusahaan" htmlFor="company">
          <input id="company" name="company" defaultValue={testimonial?.company} className={inputClass} />
        </Field>
      </div>

      <Field label="Isi Testimoni" htmlFor="testimonial">
        <textarea id="testimonial" name="testimonial" defaultValue={testimonial?.testimonial} className={textareaClass} />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Rating (1-5)" htmlFor="rating">
          <input id="rating" name="rating" type="number" min={1} max={5} defaultValue={testimonial?.rating ?? 5} className={inputClass} />
        </Field>
        <Field label="Foto Klien (opsional)" htmlFor="photoFile">
          {testimonial?.photo && (
            <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full bg-neutral">
              <Image src={testimonial.photo} alt="Foto klien" fill className="object-cover" />
            </div>
          )}
          <input id="photoFile" name="photoFile" type="file" accept="image/*" className={inputClass} />
        </Field>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input type="checkbox" name="published" defaultChecked={testimonial?.published ?? true} className="h-5 w-5 accent-accent" />
          Publikasikan
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input type="checkbox" name="featured" defaultChecked={testimonial?.featured} className="h-5 w-5 accent-accent" />
          Tampilkan di beranda
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-ink">
          <input
            type="checkbox"
            name="isPlaceholder"
            defaultChecked={testimonial?.isPlaceholder ?? true}
            className="h-5 w-5 accent-accent"
          />
          Ini masih data contoh (placeholder)
        </label>
      </div>
      <p className="rounded-xl bg-amber-50 p-4 text-xs text-amber-700">
        Catatan: nonaktifkan opsi &ldquo;data contoh&rdquo; hanya setelah Anda mengganti isi testimoni ini
        dengan testimoni asli dari klien.
      </p>

      <Button type="submit">Simpan Testimoni</Button>
    </form>
  );
}
