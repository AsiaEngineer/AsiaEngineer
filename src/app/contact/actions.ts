"use server";

import { z } from "zod";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

const schema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  company: z.string().optional().default(""),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(6, "Nomor telepon tidak valid"),
  projectType: z.string().optional().default(""),
  budget: z.string().optional().default(""),
  location: z.string().optional().default(""),
  message: z.string().min(10, "Ceritakan kebutuhan Anda minimal 10 karakter"),
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
};

export async function submitContactForm(
  _prev: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: String(formData.get("name") || ""),
    company: String(formData.get("company") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    projectType: String(formData.get("projectType") || ""),
    budget: String(formData.get("budget") || ""),
    location: String(formData.get("location") || ""),
    message: String(formData.get("message") || ""),
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      errors[issue.path[0] as string] = issue.message;
    }
    return { success: false, message: "Mohon periksa kembali data yang diisi.", errors };
  }

  try {
    await db.insert(contactMessages).values({
      ...parsed.data,
      status: "baru",
    });

    return {
      success: true,
      message:
        "Terima kasih. Permintaan Anda telah kami terima. Tim kami akan segera menghubungi Anda.",
    };
  } catch {
    return {
      success: false,
      message: "Terjadi kesalahan pada server. Silakan coba lagi beberapa saat lagi.",
    };
  }
}
