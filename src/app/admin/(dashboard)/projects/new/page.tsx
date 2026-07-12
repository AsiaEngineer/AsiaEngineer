import type { Metadata } from "next";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import ProjectForm from "@/components/admin/ProjectForm";
import { createProject } from "../actions";

export const metadata: Metadata = { title: "Tambah Proyek" };

export default function NewProjectPage() {
  return (
    <div>
      <AdminHeader title="Tambah Proyek Baru" description="Lengkapi detail proyek untuk ditampilkan di portofolio." />
      <AdminCard>
        <ProjectForm action={createProject} />
      </AdminCard>
    </div>
  );
}
