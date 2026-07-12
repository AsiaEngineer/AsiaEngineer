import type { Metadata } from "next";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import TeamForm from "@/components/admin/TeamForm";
import { createTeamMember } from "../actions";

export const metadata: Metadata = { title: "Tambah Anggota Tim" };

export default function NewTeamMemberPage() {
  return (
    <div>
      <AdminHeader title="Tambah Anggota Tim" />
      <AdminCard>
        <TeamForm action={createTeamMember} />
      </AdminCard>
    </div>
  );
}
