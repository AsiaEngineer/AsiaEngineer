import type { Metadata } from "next";
import { AdminHeader, AdminCard } from "@/components/admin/AdminUI";
import TestimonialForm from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export const metadata: Metadata = { title: "Tambah Testimoni" };

export default function NewTestimonialPage() {
  return (
    <div>
      <AdminHeader title="Tambah Testimoni" />
      <AdminCard>
        <TestimonialForm action={createTestimonial} />
      </AdminCard>
    </div>
  );
}
