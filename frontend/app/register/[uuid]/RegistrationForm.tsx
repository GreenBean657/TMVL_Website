"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { finalizeRegistration } from "./actions";
import styles from "../../../css/register.module.css";

export default function RegistrationForm({ uuid }: { uuid: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setPending(true);
    const result = await finalizeRegistration(uuid, password);
    setPending(false);

    if (result.ok) {
      router.push("/login");
    } else {
      setError(result.error ?? "Registration failed.");
    }
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
      />

      <label className={styles.label} htmlFor="confirm">
        Confirm Password
      </label>
      <input
        id="confirm"
        type="password"
        className={styles.input}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        autoComplete="new-password"
      />

      {error && <div className={styles.error}>{error}</div>}

      <button type="submit" className={styles.button} disabled={pending}>
        {pending ? "Registering…" : "Create Account"}
      </button>
    </form>
  );
}
