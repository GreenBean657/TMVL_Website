"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { login } from "./actions";
import styles from "../../css/login.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!username || !password) {
      setError("Please enter your username and password.");
      return;
    }

    setPending(true);
    const result = await login(username, password);
    setPending(false);

    if (result.ok) {
      router.push("/");
    } else {
      setError(result.error ?? "Login failed.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="username">
        Username
      </label>
      <input
        id="username"
        type="text"
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />

      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" className={styles.button} disabled={pending}>
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}
