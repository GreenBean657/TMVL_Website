import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
  return (
    <header className="w-full border-b-4 border-[#0f766e] bg-white text-[#1a2e2c] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/aegis-mark.png"
            alt="AEGIS logo"
            width={52}
            height={52}
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-[0.3em] uppercase text-[#0f766e]">
              AEGIS
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#5f7370]">
              Alter. Evaluate. Govern. Isolate. Secure.
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-xs uppercase tracking-wider text-[#5f7370]">
          <span>Personnel: Senior Researcher</span>
          <button className="border border-[#0f766e] bg-white px-3 py-1 uppercase tracking-wider text-[#0f766e] transition hover:bg-[#0f766e] hover:text-white">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
