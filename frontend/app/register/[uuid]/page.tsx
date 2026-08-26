import { backendFetch } from "../../lib/api";
import RegistrationForm from "./RegistrationForm";
import styles from "../../../css/register.module.css";

interface RegisterPageProps {
  params: Promise<{ uuid: string }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { uuid } = await params;

  let res: Response;
  try {
    res = await backendFetch("/auth/fetch_registration_uuid", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uuid }),
    });
  } catch {
    return (
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Registration</h1>
          </div>
          <div className={styles.error}>
            The registration service is currently unavailable. Please try again later.
          </div>
        </div>
      </section>
    );
  }

  if (!res.ok) {
    let message = "This registration link is invalid or has expired.";
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {}
    return (
      <section className={styles.section}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Registration</h1>
          </div>
          <div className={styles.error}>{message}</div>
        </div>
      </section>
    );
  }

  const data: { player_username: string } = await res.json();

  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Registration</h1>
          <p className={styles.subtitle}>
            Welcome, <span className={styles.username}>{data.player_username}</span>.
            Create a password to finalize your account.
          </p>
        </div>
        <RegistrationForm uuid={uuid} />
      </div>
    </section>
  );
}
