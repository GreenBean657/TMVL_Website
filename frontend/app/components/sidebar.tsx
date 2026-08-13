"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../../css/components/sidebar.module.css";

const sections = [
  { label: "Main", items: [{ label: "Home", href: "/" }] },
  {
    label: "Database",
    items: [
      { label: "AEGs", href: "/aeg/001" },
      { label: "Characters", href: "#" },
      { label: "Archives", href: "#" },
      { label: "Tales", href: "#" },
    ],
  },
  {
    label: "Facility",
    items: [
      { label: "Personnel", href: "#" },
      { label: "Sites", href: "#" },
      { label: "Departments", href: "#" },
      { label: "Settings", href: "#" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.aside}>
      <div className={styles.header}>
        Site Navigation
      </div>
      <div className={styles.body}>
        {sections.map((section) => (
          <div key={section.label} className={styles.section}>
            <div className={styles.label}>
              {section.label}
            </div>
            <ul>
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`${styles.link} ${
                        active ? styles.active : styles.inactive
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
