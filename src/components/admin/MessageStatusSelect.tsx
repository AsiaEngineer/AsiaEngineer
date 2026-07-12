"use client";

import { useTransition } from "react";
import { LEAD_STATUS_LABELS, LEAD_STATUS_ORDER } from "@/lib/utils";
import { updateMessageStatus } from "@/app/admin/(dashboard)/messages/actions";

export default function MessageStatusSelect({ id, status }: { id: string; status: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const formData = new FormData();
        formData.set("status", e.target.value);
        startTransition(() => {
          updateMessageStatus(id, formData);
        });
      }}
      className="rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink focus:border-accent focus:outline-none"
    >
      {LEAD_STATUS_ORDER.map((s) => (
        <option key={s} value={s}>
          {LEAD_STATUS_LABELS[s]}
        </option>
      ))}
    </select>
  );
}
