"use server";

import { cookies } from "next/headers";
import { backendFetch } from "../lib/api";

export async function login(
  username: string,
  password: string,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await backendFetch("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const body = await res.json().catch(() => null);

    if (res.ok && body?.status === "ok") {
      const cookieStore = await cookies();
      for (const header of res.headers.getSetCookie()) {
        const [pair, ...attrs] = header.split(/;\s*/);
        const eq = pair.indexOf("=");
        if (eq < 0) continue;
        const name = pair.slice(0, eq);
        const value = pair.slice(eq + 1);
        const options: {
          path: string;
          httpOnly: boolean;
          sameSite?: "lax" | "strict" | "none";
          secure?: boolean;
          maxAge?: number;
        } = { path: "/", httpOnly: true };
        for (const attr of attrs) {
          const [key, val = ""] = attr.split("=");
          const k = key.toLowerCase();
          if (k === "path") options.path = val;
          else if (k === "samesite") options.sameSite = val.toLowerCase() as "lax" | "strict" | "none";
          else if (k === "secure") options.secure = true;
          else if (k === "max-age") options.maxAge = Number(val);
        }
        cookieStore.set(name, value, options);
      }
      return { ok: true };
    }

    return { ok: false, error: body?.error ?? "Login failed." };
  } catch {
    return { ok: false, error: "Could not reach the server. Please try again." };
  }
}
