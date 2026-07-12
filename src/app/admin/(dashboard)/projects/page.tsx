import type { Metadata } from "next";
import Link from "next/link";
import { desc } from "drizzle-orm";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { AdminHeader, AdminButtonLink, AdminCard } from "@/components/admin/AdminUI";
import DeleteButton from "@/components/admin/DeleteButton";
import { categoryLabel } from "@/lib/utils";
import { deleteProject } from "./actions";

export const metadata: Metadata = { title: "Kelola Proyek" };
export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt));

  return (
    <div>
      <AdminHeader
        title="Kelola Proyek"
        description="Portofolio proyek yang tampil di halaman publik."
        action={<AdminButtonLink href="/admin/projects/new">+ Tambah Proyek</AdminButtonLink>}
      />

      <AdminCard className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-line bg-neutral/60 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-6 py-4">Judul</th>
              <th className="px-6 py-4">Kategori</th>
              <th className="px-6 py-4">Tahun</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Unggulan</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {allProjects.map((project) => (
              <tr key={project.id} className="border-b border-line last:border-none">
                <td className="px-6 py-4 font-medium text-ink">{project.title}</td>
                <td className="px-6 py-4 text-muted">{categoryLabel(project.category)}</td>
                <td className="px-6 py-4 text-muted">{project.year}</td>
                <td className="px-6 py-4 capitalize text-muted">{project.statusPublish}</td>
                <td className="px-6 py-4">{project.featured ? "Ya" : "-"}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-4">
                    <Link href={`/admin/projects/${project.id}`} className="text-sm font-medium text-accent">
                      Edit
                    </Link>
                    <DeleteButton action={deleteProject.bind(null, project.id)} />
                  </div>
                </td>
              </tr>
            ))}
            {allProjects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-muted">
                  Belum ada proyek. Tambahkan proyek pertama Anda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </AdminCard>
    </div>
  );
}
