import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import ProjectForm from "@/components/admin/ProjectForm";
import { updateProject } from "../actions";

export const metadata: Metadata = { title: "Edit Proyek" };
export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [project] = await db.select().from(projects).where(eq(projects.id, id)).limit(1);
  if (!project) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    await updateProject(id, formData);
  };

  return (
    <div>
      <AdminHeader title={`Edit Proyek: ${project.title}`} />
      <AdminCard>
        <ProjectForm action={updateWithId} project={project} />
      </AdminCard>
    </div>
  );
}
