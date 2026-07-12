"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";
import { Button } from "@/components/ui/Button";

const initialState: LoginState = {};

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-[14px] border border-line px-5 py-3.5 text-sm focus:border-accent focus:outline-none"
          placeholder="admin@asiaengineer.co.id"
        />
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-ink">
          Kata Sandi
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full rounded-[14px] border border-line px-5 py-3.5 text-sm focus:border-accent focus:outline-none"
          placeholder="••••••••"
        />
      </div>
      {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      <Button type="submit" disabled={pending} className="w-full justify-center">
        {pending ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
