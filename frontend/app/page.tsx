import Link from "next/link";

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
    <section className="min-h-full p-6 font-sans text-[#222]">
      <div className="mx-auto max-w-4xl border border-[#b8c8c6] bg-white p-8 shadow-sm">
        <div className="mb-6 border-b-2 border-[#0f766e] pb-3">
          <h1 className="font-serif text-3xl font-bold uppercase tracking-wide text-[#134e4a]">
            AEG Database
          </h1>
          <p className="mt-1 text-sm text-[#5f7370]">
            Classified entries for anomalous entities under AEGIS containment.
          </p>
        </div>

        <div className="mb-6 border border-[#0f766e] bg-[#f0fdfa] p-3 text-sm text-[#0f766e]">
          <strong>NOTICE:</strong> The following documents are restricted to personnel with Level-2 clearance or higher. Unauthorized access is logged and prosecuted under Facility Directive 9-Alpha.
        </div>

        {series.map((group) => (
          <div key={group.range} className="mb-8">
            <h2 className="mb-3 border-b border-[#c8d6d4] pb-1 font-serif text-lg font-bold uppercase tracking-wide text-[#134e4a]">
              AEGs {group.range}
            </h2>
            <ul className="space-y-1 text-sm">
              {group.items.map((item) => (
                <li key={item.id} className="-mx-2 flex gap-2 rounded px-2 py-0.5 transition hover:bg-[#f0fdfa]">
                  <span className="w-20 shrink-0 font-mono">
                    <Link
                      href={`/aeg/${item.id}`}
                      className="text-[#0f766e] underline hover:text-[#134e4a]"
                    >
                      AEG-{item.id}
                    </Link>
                  </span>
                  <span className="shrink-0 text-[#7a8a88]">-</span>
                  <span>{item.title}</span>
                  <span className="ml-auto text-xs font-bold text-[#0f766e]">
                    {item.class}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="border-t border-[#c8d6d4] pt-4 text-xs text-[#5f7370]">
          <p>
            Last database sync: <span className="font-mono">2026-08-11 21:47 UTC</span>.
            Report discrepancies to your Site Administrator.
          </p>
        </div>
      </div>
    </section>
  );
}
