import Link from "next/link";
import styles from "../../css/components/toplinks.module.css";

const links = [
  { label: "About", href: "#" },
  { label: "Community", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Toplinks() {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={styles.link}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
