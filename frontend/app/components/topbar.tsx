import Image from "next/image";
import Link from "next/link";
import styles from "../../css/components/topbar.module.css";

export default function Topbar() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand}>
          <Image
            src="/aegis-mark.png"
            alt="AEGIS logo"
            width={52}
            height={52}
          />
          <div className={styles.brandText}>
            <span className={styles.brandName}>
              AEGIS
            </span>
            <span className={styles.tagline}>
              Alter. Evaluate. Govern. Isolate. Secure.
            </span>
          </div>
        </Link>

        <div className={styles.userArea}>
          <span>Personnel: Senior Researcher</span>
          <Link href="/login" className={styles.login}>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
