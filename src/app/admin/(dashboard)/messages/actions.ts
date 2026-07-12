"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const VALID_STATUSES = [
  "baru",
  "dihubungi",
  "survey_dijadwalkan",
  "penawaran_dikirim",
  "negosiasi",
  "deal",
  "tidak_jadi",
] as const;

export async function updateMessageStatus(id: string, formData: FormData) {
  const status = String(formData.get("status") || "baru");
  if (!VALID_STATUSES.includes(status as (typeof VALID_STATUSES)[number])) return;

  await db
    .update(contactMessages)
    .set({ status: status as (typeof VALID_STATUSES)[number] })
    .where(eq(contactMessages.id, id));

  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string, _formData: FormData) {
  await db.delete(contactMessages).where(eq(contactMessages.id, id));
  revalidatePath("/admin/messages");
}
