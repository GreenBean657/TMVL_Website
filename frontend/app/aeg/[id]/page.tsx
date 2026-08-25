import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import AnomalyClassBar from "../../components/AnomalyClassBar";
import { backendFetch } from "../../lib/api";
import { parsePages, type Block } from "../../lib/wikidot";
import styles from "../../../css/aeg.module.css";

interface AegPageProps {
  params: Promise<{ id: string }>;
}

interface AegDoc {
  id: string;
  title: string;
  source: string;
}

async function getDoc(id: string): Promise<AegDoc | null> {
  const res = await backendFetch(`/aegs/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Backend returned ${res.status}`);
  return res.json();
}

function DocPage({
  docId,
  page,
  total,
  children,
}: {
  docId: string;
  page: number;
  total: number;
  children: ReactNode;
}) {
  return (
    <div className={styles.docPage}>
      <div className={styles.docHeader}>
        <span>{docId} — AEGIS Internal Document</span>
        <span>
          Page {page} of {total}
        </span>
      </div>
      {children}
    </div>
  );
}

// Renders **bold** inline markup
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 === 1 ? <strong key={i}>{part}</strong> : part,
      )}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "classBar":
      return <AnomalyClassBar params={block.params} />;
    case "heading":
      return (
        <h2 className={styles.heading}>
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className={styles.paragraph}>
          <RichText text={block.text} />
        </p>
      );
  }
}

export default async function AegPage({ params }: AegPageProps) {
  const { id } = await params;
  const doc = await getDoc(id);
  if (!doc) notFound();

  const docId = `AEG-${doc.id}`;
  const pages = parsePages(doc.source);
  const total = pages.length;

  return (
    <article className={styles.article}>
      <div className={styles.wrapper}>
        <Link
          href="/"
          className={styles.backLink}
        >
          &laquo; Return to AEG Database
        </Link>
      </div>

      {pages.map((blocks, index) => (
        <DocPage key={index} docId={docId} page={index + 1} total={total}>
          {index === 0 && (
            <></>
          )}

          {blocks.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}

          {index === total - 1 && (
            <footer className={styles.footer}>
              <p className={styles.restricted}>
                AEGIS Classification: Restricted
              </p>
              <p>
                Unauthorized distribution of this document is punishable by termination.
              </p>
            </footer>
          )}
        </DocPage>
      ))}
    </article>
  );
}
