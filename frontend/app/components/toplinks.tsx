import Link from "next/link";

const links = [
  { label: "About", href: "#" },
  { label: "Community", href: "#" },
  { label: "Resources", href: "#" },
  { label: "Contact Us", href: "#" },
];

export default function Toplinks() {
  return (
    <nav className="w-full border-b border-[#d3dddd] bg-[#eef2f2] text-xs font-bold uppercase tracking-wide text-[#33403e]">
      <div className="mx-auto flex max-w-7xl items-center gap-0 px-4">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="border-r border-[#d3dddd] px-4 py-2 transition hover:bg-[#dce8e7] hover:text-[#0f766e]"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
