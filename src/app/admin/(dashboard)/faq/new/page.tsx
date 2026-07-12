import type { Metadata } from "next";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import FaqForm from "@/components/admin/FaqForm";
import { createFaq } from "../actions";

export const metadata: Metadata = { title: "Tambah FAQ" };

export default function NewFaqPage() {
  return (
    <div>
      <AdminHeader title="Tambah FAQ" />
      <AdminCard>
        <FaqForm action={createFaq} />
      </AdminCard>
    </div>
  );
}
