"use server";

import { backendFetch } from "../../lib/api";

export async function finalizeRegistration(
  uuid: string,
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await backendFetch("/auth/finalize_registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid, password }),
    });

    const body = await res.json().catch(() => null);

    if (res.ok && body?.status === "ok") {
      return { ok: true };
    }

    return { ok: false, error: body?.error ?? "Registration failed." };
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again." };
  }
}
