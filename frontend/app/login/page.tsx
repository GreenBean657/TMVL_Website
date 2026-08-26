import LoginForm from "./LoginForm";
import styles from "../../css/login.module.css";

export default function LoginPage() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>
            Sign in with your AEGIS personnel credentials.
          </p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
