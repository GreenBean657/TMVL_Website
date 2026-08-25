import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BACKEND_URL, TOKEN_COOKIE } from "../lib/api";
import styles from "../../css/home.module.css";

async function login() {
  "use server";

  const res = await fetch(`${BACKEND_URL}/login`, { method: "POST" });
  if (!res.ok) throw new Error(`Login failed: backend returned ${res.status}`);
  const { token } = await res.json();

  (await cookies()).set(TOKEN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  redirect("/");
}

export default function LoginPage() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Personnel Login</h1>
          <p className={styles.subtitle}>
            Identify yourself to receive an AEGIS session token.
          </p>
        </div>

        <form action={login}>
          <p>
            <label htmlFor="username">Username</label>
            <br />
            <input id="username" name="username" type="text" />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <br />
            <input id="password" name="password" type="password" />
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
    </section>
  );
}
