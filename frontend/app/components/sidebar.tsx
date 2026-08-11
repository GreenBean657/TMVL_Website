"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

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
    <aside className="w-64 border-r border-[#d3dddd] bg-[#f4f7f7] text-[13px]">
      <div className="border-b border-[#d3dddd] bg-[#e8efef] p-3 text-xs font-bold uppercase tracking-wider text-[#4a5c5a]">
        Site Navigation
      </div>
      <div className="p-3">
        {sections.map((section) => (
          <div key={section.label} className="mb-4">
            <div className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#0f766e]">
              {section.label}
            </div>
            <ul className="space-y-0">
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`block border-l-2 py-1 pl-2 transition ${
                        active
                          ? "border-[#0f766e] bg-[#dce8e7] font-bold text-[#0f766e]"
                          : "border-transparent text-[#33403e] hover:bg-[#e4ecec] hover:text-[#0f766e]"
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
