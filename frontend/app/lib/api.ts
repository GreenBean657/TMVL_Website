export const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";

// Server-side fetch helper for calling the backend.
export async function backendFetch(path: string, init: RequestInit = {}) {
  return fetch(`${BACKEND_URL}${path}`, {
    ...init,
    cache: "no-store",
  });
}
