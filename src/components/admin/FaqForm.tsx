"use client";

import { Field, inputClass, textareaClass } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import type { faq } from "@/db/schema";

type Faq = typeof faq.$inferSelect;

export default function FaqForm({
  action,
  item,
}: {
  action: (formData: FormData) => void;
  item?: Faq;
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field label="Kategori" htmlFor="category">
          <input id="category" name="category" defaultValue={item?.category ?? "umum"} className={inputClass} />
        </Field>
        <Field label="Prioritas Urutan" htmlFor="priority">
          <input id="priority" name="priority" type="number" defaultValue={item?.priority ?? 0} className={inputClass} />
        </Field>
        <div className="flex items-center gap-3 pt-8">
          <input id="published" name="published" type="checkbox" defaultChecked={item?.published ?? true} className="h-5 w-5 accent-accent" />
          <label htmlFor="published" className="text-sm font-medium text-ink">
            Publikasikan
          </label>
        </div>
      </div>
      <Field label="Pertanyaan" htmlFor="question">
        <input id="question" name="question" required defaultValue={item?.question} className={inputClass} />
      </Field>
      <Field label="Jawaban" htmlFor="answer">
        <textarea id="answer" name="answer" defaultValue={item?.answer} className={textareaClass} />
      </Field>
      <Button type="submit">Simpan FAQ</Button>
    </form>
  );
}
