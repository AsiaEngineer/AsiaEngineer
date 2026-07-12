"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { team } from "@/db/schema";
import { saveUploadedFile } from "@/lib/upload";

export async function createTeamMember(formData: FormData) {
  const photoFile = formData.get("photoFile") as File | null;
  const photo = photoFile && photoFile.size > 0 ? (await saveUploadedFile(photoFile, "team")) || "" : "";

  await db.insert(team).values({
    name: String(formData.get("name") || ""),
    position: String(formData.get("position") || ""),
    biography: String(formData.get("biography") || ""),
    experience: String(formData.get("experience") || ""),
    linkedin: String(formData.get("linkedin") || ""),
    instagram: String(formData.get("instagram") || ""),
    photo,
    displayOrder: Number(formData.get("displayOrder")) || 0,
    status: (String(formData.get("status") || "published") as "draft" | "published" | "archived"),
  });

  revalidatePath("/admin/team");
  revalidatePath("/about");
  redirect("/admin/team");
}

export async function updateTeamMember(id: string, formData: FormData) {
  const [current] = await db.select().from(team).where(eq(team.id, id)).limit(1);
  if (!current) redirect("/admin/team");

  const photoFile = formData.get("photoFile") as File | null;
  const photo = photoFile && photoFile.size > 0 ? (await saveUploadedFile(photoFile, "team")) || current.photo : current.photo;

  await db
    .update(team)
    .set({
      name: String(formData.get("name") || ""),
      position: String(formData.get("position") || ""),
      biography: String(formData.get("biography") || ""),
      experience: String(formData.get("experience") || ""),
      linkedin: String(formData.get("linkedin") || ""),
      instagram: String(formData.get("instagram") || ""),
      photo,
      displayOrder: Number(formData.get("displayOrder")) || 0,
      status: (String(formData.get("status") || "published") as "draft" | "published" | "archived"),
      updatedAt: new Date(),
    })
    .where(eq(team.id, id));

  revalidatePath("/admin/team");
  revalidatePath("/about");
  redirect("/admin/team");
}

export async function deleteTeamMember(id: string, _formData: FormData) {
  await db.delete(team).where(eq(team.id, id));
  revalidatePath("/admin/team");
  revalidatePath("/about");
}
