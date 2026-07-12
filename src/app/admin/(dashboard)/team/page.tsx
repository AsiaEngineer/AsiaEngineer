import type { Metadata } from "next";
import Link from "next/link";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { team } from "@/db/schema";
import { AdminHeader, AdminButtonLink, AdminCard } from "@/components/admin/AdminUI";
import DeleteButton from "@/components/admin/DeleteButton";
import { deleteTeamMember } from "./actions";

export const metadata: Metadata = { title: "Kelola Tim" };
export const dynamic = "force-dynamic";

export default async function AdminTeamPage() {
  const members = await db.select().from(team).orderBy(asc(team.displayOrder));

  return (
    <div>
      <AdminHeader
        title="Kelola Tim"
        description="Anggota tim yang ditampilkan pada halaman Tentang Kami."
        action={<AdminButtonLink href="/admin/team/new">+ Tambah Anggota</AdminButtonLink>}
      />
      {members.length === 0 && (
        <AdminCard>
          <p className="text-muted">
            Belum ada anggota tim. Tambahkan data tim asli Anda — hindari menggunakan nama atau
            foto yang tidak sesuai dengan anggota tim sesungguhnya.
          </p>
        </AdminCard>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <AdminCard key={member.id}>
            <p className="font-heading font-bold text-ink">{member.name}</p>
            <p className="text-sm text-muted">{member.position}</p>
            <div className="mt-4 flex items-center gap-4">
              <Link href={`/admin/team/${member.id}`} className="text-sm font-medium text-accent">
                Edit
              </Link>
              <DeleteButton action={deleteTeamMember.bind(null, member.id)} />
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
