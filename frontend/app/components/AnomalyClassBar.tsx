import Image from "next/image";

// Renders the anomaly-class-bar component, styled after
// https://scp-wiki.wikidot.com/component:anomaly-class-bar

const CLEARANCE_LABELS: Record<string, string> = {
  "1": "UNRESTRICTED",
  "2": "RESTRICTED",
  "3": "CONFIDENTIAL",
  "4": "SECRET",
  "5": "TOP SECRET",
  "6": "COSMIC TOP SECRET",
};

const DISRUPTION_NUM: Record<string, string> = {
  dark: "1",
  vlam: "2",
  keneq: "3",
  ekhi: "4",
  amida: "5",
};

const RISK_NUM: Record<string, string> = {
  notice: "1",
  caution: "2",
  warning: "3",
  danger: "4",
  critical: "5",
};

const CLASS_DOTS: Record<string, string> = {
  dark: "#009f6b",
  vlam: "#3b82f6",
  keneq: "#eab308",
  ekhi: "#f97316",
  amida: "#c40233",
  notice: "#009f6b",
  caution: "#84cc16",
  warning: "#eab308",
  danger: "#f97316",
  critical: "#c40233",
};

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" fill="#111111" />
      <path
        d="M8 10V7a4 4 0 0 1 8 0v3"
        fill="none"
        stroke="#111111"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function CircleBadge({ num, color }: { num: string; color: string }) {
  return (
    <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full bg-[#1f2937]">
      <span className="text-[11px] leading-none font-bold text-white">{num}</span>
      <span
        className="mt-1 h-4 w-4 rounded-full border border-white/50"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

export default function AnomalyClassBar({
  params,
}: {
  params: Record<string, string>;
}) {
  const itemNumber = params["item-number"] ?? "????";
  const clearance = params["clearance"] ?? "1";
  const clearanceLabel = CLEARANCE_LABELS[clearance] ?? "UNKNOWN";
  const containerClass = params["container-class"] ?? "none";
  const secondaryClass = params["secondary-class"] ?? "none";
  const secondaryIcon = params["secondary-icon"];
  const disruptionClass = (params["disruption-class"] ?? "dark").toLowerCase();
  const riskClass = (params["risk-class"] ?? "notice").toLowerCase();

  return (
    <div className="mb-8 font-sans text-[#111]">
      {/* Header: item number, pinstripes, clearance level */}
      <div className="flex items-end justify-between gap-6">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold tracking-tight">ITEM#:</span>
          <span className="text-6xl leading-none font-black tracking-tight">
            {itemNumber}
          </span>
        </div>
        <div className="mb-1.5 flex-1 space-y-1.5">
          <div className="h-1.5 bg-[#0e9aa8]" />
          <div className="h-1.5 bg-[#0e9aa8]" />
        </div>
        <div className="text-right leading-none">
          <div className="text-3xl font-black">LEVEL {clearance}</div>
          <div className="mt-1 text-xs font-bold tracking-[0.2em]">
            {clearanceLabel}
          </div>
        </div>
      </div>

      {/* Thick black divider */}
      <div className="my-1.5 h-2.5 bg-black" />

      {/* Body */}
      <div className="flex items-stretch">
        {/* Containment class */}
        <div className="flex flex-1 items-stretch">
          <div className="w-1.5 shrink-0 bg-[#ffd300]" />
          <div className="flex flex-1 items-center justify-between bg-[#fffbe6] px-4 py-3">
            <div>
              <div className="text-xs font-bold tracking-wide text-[#333]">
                CONTAINMENT CLASS:
              </div>
              <div className="text-4xl leading-none font-black uppercase">
                {containerClass}
              </div>
              {secondaryClass.toLowerCase() !== "none" && (
                <div className="mt-1 text-xs font-bold uppercase tracking-wide text-[#555]">
                  Secondary: {secondaryClass}
                </div>
              )}
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#ffd300]">
              <LockIcon />
            </div>
          </div>
        </div>

        {/* Disruption + risk */}
        <div className="flex flex-1 flex-col justify-center gap-2.5 bg-[#eef3f5] px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="h-9 w-1 shrink-0 bg-[#0e9aa8]" />
            <div className="flex flex-1 items-baseline gap-1.5">
              <span className="text-[10px] font-bold tracking-wide text-[#333]">
                DISRUPTION CLASS:
              </span>
              <span className="text-2xl leading-none font-extrabold uppercase">
                {disruptionClass}
              </span>
            </div>
            <CircleBadge
              num={DISRUPTION_NUM[disruptionClass] ?? "?"}
              color={CLASS_DOTS[disruptionClass] ?? "#6b7280"}
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-1 shrink-0 bg-[#0e9aa8]" />
            <div className="flex flex-1 items-baseline gap-1.5">
              <span className="text-[10px] font-bold tracking-wide text-[#333]">
                RISK CLASS:
              </span>
              <span className="text-2xl leading-none font-extrabold uppercase">
                {riskClass}
              </span>
            </div>
            <CircleBadge
              num={RISK_NUM[riskClass] ?? "?"}
              color={CLASS_DOTS[riskClass] ?? "#6b7280"}
            />
          </div>
        </div>

        {/* Class emblem */}
        {secondaryIcon && (
          <div className="flex items-center border-l-2 border-black bg-white px-3">
            <Image
              src={secondaryIcon}
              alt="class emblem"
              width={90}
              height={80}
              className="h-20 w-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
