import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import AnomalyClassBar from "../../components/AnomalyClassBar";
import { parsePages, type Block } from "../../lib/wikidot";

interface AegPageProps {
  params: Promise<{ id: string }>;
}

interface AegDoc {
  id: string;
  title: string;
  source: string;
}

async function getDoc(id: string): Promise<AegDoc | null> {
  const base = process.env.BACKEND_URL ?? "http://localhost:3001";
  const res = await fetch(`${base}/aegs/${id}`, { cache: "no-store" });
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
    <div className="mx-auto mb-8 min-h-[1000px] w-full max-w-3xl border border-[#b8c8c6] bg-white px-10 py-8 shadow-md">
      <div className="mb-6 flex justify-between border-b border-[#c8d6d4] pb-2 text-[10px] font-bold uppercase tracking-widest text-[#5f7370]">
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
        <h2 className="mt-6 mb-2 border-b border-[#c8d6d4] pb-1 font-serif text-xl font-bold uppercase tracking-wide text-[#134e4a] first:mt-0">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mb-4 leading-7">
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
    <article className="min-h-full p-6 font-sans text-[#222]">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-3 inline-block text-xs font-bold uppercase tracking-wider text-[#0f766e] hover:underline"
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
            <footer className="mt-8 border-t border-[#c8d6d4] pt-4 text-xs text-[#5f7370]">
              <p className="font-bold uppercase text-[#0f766e]">
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
