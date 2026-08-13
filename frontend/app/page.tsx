import Link from "next/link";
import styles from "../css/home.module.css";

const series = [
  { range: "001 to 099", items: [
    { id: "001", title: "The Hollow Choir", class: "Euclid" },
    { id: "002", title: "The Living Room", class: "Safe" },
    { id: "003", title: "Biological Motherboard", class: "Euclid" },
    { id: "004", title: "The 12 Rusty Keys", class: "Euclid" },
    { id: "005", title: "Skeleton Key", class: "Safe" },
  ]},
];

export default function Home() {
  return (
    <section className={styles.section}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            AEG Database
          </h1>
          <p className={styles.subtitle}>
            Classified entries for anomalous entities under AEGIS containment.
          </p>
        </div>

        <div className={styles.notice}>
          <strong>NOTICE:</strong> The following documents are restricted to personnel with Level-2 clearance or higher. Unauthorized access is logged and prosecuted under Facility Directive 9-Alpha.
        </div>

        {series.map((group) => (
          <div key={group.range} className={styles.group}>
            <h2 className={styles.groupTitle}>
              AEGs {group.range}
            </h2>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <span className={styles.itemId}>
                    <Link
                      href={`/aeg/${item.id}`}
                      className={styles.itemLink}
                    >
                      AEG-{item.id}
                    </Link>
                  </span>
                  <span className={styles.dash}>-</span>
                  <span>{item.title}</span>
                  <span className={styles.itemClass}>
                    {item.class}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className={styles.footer}>
          <p>
            Last database sync: <span className={styles.mono}>2026-08-11 21:47 UTC</span>.
            Report discrepancies to your Site Administrator.
          </p>
        </div>
      </div>
    </section>
  );
}
