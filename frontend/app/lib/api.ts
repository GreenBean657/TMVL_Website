import { cookies } from "next/headers";

export const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";
export const TOKEN_COOKIE = "aegis_token";

// Server-side fetch that forwards the login token (if any) to the backend.
export async function backendFetch(path: string, init: RequestInit = {}) {
  const token = (await cookies()).get(TOKEN_COOKIE)?.value;
  const headers = new Headers(init.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(`${BACKEND_URL}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });
}
