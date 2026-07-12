import type { Metadata } from "next";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import ServiceForm from "@/components/admin/ServiceForm";
import { createService } from "../actions";

export const metadata: Metadata = { title: "Tambah Layanan" };

export default function NewServicePage() {
  return (
    <div>
      <AdminHeader title="Tambah Layanan Baru" />
      <AdminCard>
        <ServiceForm action={createService} />
      </AdminCard>
    </div>
  );
}
