import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { team } from "@/db/schema";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import TeamForm from "@/components/admin/TeamForm";
import { updateTeamMember } from "../actions";

export const metadata: Metadata = { title: "Edit Anggota Tim" };
export const dynamic = "force-dynamic";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [member] = await db.select().from(team).where(eq(team.id, id)).limit(1);
  if (!member) notFound();

  const updateWithId = async (formData: FormData) => {
    "use server";
    await updateTeamMember(id, formData);
  };

  return (
    <div>
      <AdminHeader title={`Edit: ${member.name}`} />
      <AdminCard>
        <TeamForm action={updateWithId} member={member} />
      </AdminCard>
    </div>
  );
}
