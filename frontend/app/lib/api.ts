import { cookies } from "next/headers";

export const BACKEND_URL = process.env.BACKEND_URL ?? "https://green.pengucc.com";

// Server-side fetch helper for calling the backend.
// Forwards the incoming request's cookies so session-authed backend
// endpoints see the same session as the browser.
export async function backendFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);

  let cookieHeader = "";
  try {
    const cookieStore = await cookies();
    cookieHeader = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
  } catch {}

  if (cookieHeader && !headers.has("cookie")) {
    headers.set("cookie", cookieHeader);
  }

  return fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}
