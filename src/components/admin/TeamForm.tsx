"use client";

import Image from "next/image";
import { Field, inputClass, textareaClass } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/Button";
import type { team } from "@/db/schema";

type TeamMember = typeof team.$inferSelect;

export default function TeamForm({
  action,
  member,
}: {
  action: (formData: FormData) => void;
  member?: TeamMember;
}) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Nama" htmlFor="name">
          <input id="name" name="name" required defaultValue={member?.name} className={inputClass} />
        </Field>
        <Field label="Jabatan" htmlFor="position">
          <input id="position" name="position" defaultValue={member?.position} className={inputClass} />
        </Field>
      </div>

      <Field label="Biografi Singkat" htmlFor="biography">
        <textarea id="biography" name="biography" defaultValue={member?.biography} className={textareaClass} />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Field label="Pengalaman" htmlFor="experience" hint="cth. 10 tahun">
          <input id="experience" name="experience" defaultValue={member?.experience} className={inputClass} />
        </Field>
        <Field label="LinkedIn (opsional)" htmlFor="linkedin">
          <input id="linkedin" name="linkedin" defaultValue={member?.linkedin} className={inputClass} />
        </Field>
        <Field label="Instagram (opsional)" htmlFor="instagram">
          <input id="instagram" name="instagram" defaultValue={member?.instagram} className={inputClass} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Urutan Tampil" htmlFor="displayOrder">
          <input id="displayOrder" name="displayOrder" type="number" defaultValue={member?.displayOrder ?? 0} className={inputClass} />
        </Field>
        <Field label="Status" htmlFor="status">
          <select id="status" name="status" defaultValue={member?.status ?? "published"} className={inputClass}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </Field>
      </div>

      <Field label="Foto" htmlFor="photoFile">
        {member?.photo && (
          <div className="relative mb-3 h-32 w-32 overflow-hidden rounded-xl bg-neutral">
            <Image src={member.photo} alt="Foto saat ini" fill className="object-cover" />
          </div>
        )}
        <input id="photoFile" name="photoFile" type="file" accept="image/*" className={inputClass} />
      </Field>

      <Button type="submit">Simpan Anggota Tim</Button>
    </form>
  );
}
