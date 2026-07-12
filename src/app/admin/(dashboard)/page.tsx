import Link from "next/link";
import type { Metadata } from "next";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import { getDashboardStats } from "@/lib/data";
import { LEAD_STATUS_COLORS, LEAD_STATUS_LABELS, formatDateTime } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard Admin" };
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const widgets = [
    { label: "Total Proyek", value: stats.totalProjects, href: "/admin/projects" },
    { label: "Proyek Terbit", value: stats.publishedProjects, href: "/admin/projects" },
    { label: "Pesan Masuk (Baru)", value: stats.newLeads, href: "/admin/messages" },
    { label: "Total Pesan", value: stats.totalMessages, href: "/admin/messages" },
    { label: "Proyek Deal", value: stats.dealCount, href: "/admin/messages" },
    { label: "Item Galeri", value: stats.totalGallery, href: "/admin/gallery" },
  ];

  return (
    <div>
      <AdminHeader title="Dashboard" description="Ringkasan aktivitas website Asia Engineer." />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        {widgets.map((widget) => (
          <Link key={widget.label} href={widget.href}>
            <AdminCard className="transition-shadow hover:shadow-lg">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">{widget.label}</p>
              <p className="mt-3 font-mono-num text-3xl font-bold text-ink">{widget.value}</p>
            </AdminCard>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminCard>
          <h2 className="font-heading text-lg font-bold text-ink">Pesan Terbaru</h2>
          <div className="mt-4 space-y-4">
            {stats.recentMessages.length === 0 && (
              <p className="text-sm text-muted">Belum ada pesan masuk.</p>
            )}
            {stats.recentMessages.map((message) => (
              <div key={message.id} className="flex items-start justify-between gap-3 border-b border-line pb-4 last:border-none">
                <div>
                  <p className="text-sm font-semibold text-ink">{message.name}</p>
                  <p className="text-xs text-muted">{formatDateTime(message.createdAt)}</p>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-[11px] font-medium ${LEAD_STATUS_COLORS[message.status]}`}>
                  {LEAD_STATUS_LABELS[message.status]}
                </span>
              </div>
            ))}
          </div>
          <Link href="/admin/messages" className="mt-4 inline-block text-sm font-semibold text-accent">
            Lihat semua pesan →
          </Link>
        </AdminCard>

        <AdminCard>
          <h2 className="font-heading text-lg font-bold text-ink">Proyek Terbaru</h2>
          <div className="mt-4 space-y-4">
            {stats.recentProjects.length === 0 && (
              <p className="text-sm text-muted">Belum ada proyek ditambahkan.</p>
            )}
            {stats.recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between gap-3 border-b border-line pb-4 last:border-none">
                <div>
                  <p className="text-sm font-semibold text-ink">{project.title}</p>
                  <p className="text-xs text-muted">{project.location}</p>
                </div>
                <span className="text-xs font-medium capitalize text-muted">{project.statusPublish}</span>
              </div>
            ))}
          </div>
          <Link href="/admin/projects" className="mt-4 inline-block text-sm font-semibold text-accent">
            Kelola proyek →
          </Link>
        </AdminCard>
      </div>
    </div>
  );
}
