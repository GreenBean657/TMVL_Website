import Image from "next/image";

const DISRUPTION_NAME: Record<string, string> = {
  dark: "Dark",
  vlam: "Vlam",
  keneq: "Klam",
  ekhi: "Ekhi",
  amida: "Amida"
}

const DISRUPTION_URL: Record<string, string> = {
  dark: "/disruption/dark.svg",
  vlam: "/disruption/vlam.svg",
  keneq: "/disruption/keneq.svg",
  ekhi: "/disruption/ekhi.svg",
  amida: "/disruption/amida.svg"
}

const RISK_NAME: Record<string, string> = {
  notice: "Notice",
  caution: "Caution",
  warning: "Warning",
  danger: "Danger",
  critical: "Critical",
}


const RISK_URL: Record<string, string> = {
  notice: "/risk/notice.svg",
  caution: "/risk/caution.svg",
  warning: "/risk/warning.svg",
  danger: "/risk/danger.svg",
  critical: "/risk/critical.svg"
}

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

  ursa: "#004bad",
  lyra: "#c1ebab",
  orion: "#ffdd5b",
  cygnus: "#ffdd5b",
  drako: "#ab1415",
  hydra: "#ab1415",
  cassiopeia: "#710c67",
  ophiuchus: "#710c67"
};

const TIER_LIGHT: Record<string, string> = {
  ursa: "#cde1fb",
  lyra: "#e0f2d6",
  orion: "#fbf1cd",
  cygnus: "#fbf1cd",
  drako: "#f6d2d2",
  hydra: "#f6d2d2",
  cassiopeia: "#f7d1f3",
  ophiuchus: "#f7d1f3"
}

const TIER_URL: Record<string, string> = {
  ursa: "/tier/Ursa.png",
  lyra: "/tier/Lyra.png",
  orion: "/tier/Orion.png",
  cygnus: "/tier/Cygnus.png",
  drako: "/tier/Drako.png",
  hydra: "/tier/Hydra.png",
  cassiopeia: "/tier/Cassiopeia.png",
}

function DisruptionRiskSideBar({ color }: { color: string }) {
  return (
      <div className="w-2 shrink-0 self-stretch"
           style={{background: color}}
      />
  )
}
function ContainmentTier({ tier, color_main, color_back }: { tier: string, color_main: string, color_back: string }) {
  return (
      <div className="flex w-[320px] shrink-0 items-stretch">
        <div className="w-1.5 shrink-0 "
          style={{backgroundColor: color_main}}
        />
        <div className="flex flex-1 items-center justify-between gap-3 px-3 py-3"
             style={{backgroundColor: color_back}}
        >
          <div className="min-w-0">
            <div className="text-xs font-bold tracking-wide text-[#333]">
              OBJECT CLASS:
            </div>
            <div className="text-3xl leading-none font-black uppercase whitespace-nowrap">
              URSA
            </div>
          </div>
          <div className="flex h-20 w-20 shrink-0 items-center justify-center">
            <Image
                src={TIER_URL[tier] ?? "/tier/Ursa.png"}
                alt={tier}
                width={90}
                height={80}
                className="h-20 w-auto object-contain"
            />
          </div>
        </div>
      </div>
  );
}

function CircleBadge({ name, color, url }: { name: string; color: string; url: string }) {
  return (
      <div
          className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full border-[3px]"
          style={{ backgroundColor: color }}
      >
        <Image alt={name} src={url} width={120} height={120} />
      </div>
  );
}

export default function AnomalyClassBar({
                                          params,
                                        }: {
  params: Record<string, string>;
}) {
  const itemNumber = params["item-number"] ?? "????";
  const containerClass = params["container-class"] ?? "none";
  const disruptionClass = (params["disruption-class"] ?? "dark").toLowerCase();
  const riskClass = (params["risk-class"] ?? "notice").toLowerCase();

  return (
      <div className="mb-8 font-sans text-[#111]">
        {/* Header: item number, pinstripes, clearance level */}
        <div className="flex items-end justify-between gap-6">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">AEG#:</span>
            <span className="text-6xl leading-none font-black tracking-tight">
            {itemNumber}
          </span>
          </div>
          <div className="text-right leading-none">
            <div className="text-3xl font-black">BIOLOGY DEPARTMENT</div>
            <div className="mt-1 text-xs font-bold tracking-[0.2em]">
              Genetic Development Division
            </div>
          </div>
        </div>

        {/* Thick black divider */}
        <div className="my-1.5 h-2.5 bg-black" />

        {/* Body */}
        <div className="flex items-stretch">
          {/* Containment class */}
          <ContainmentTier
              tier={containerClass}
              color_main={CLASS_DOTS[containerClass] ?? CLASS_DOTS["ursa"]}
              color_back={TIER_LIGHT[containerClass] ?? TIER_LIGHT["ursa"]}
          />
          {/* Disruption + risk */}
          <div className="flex flex-1 flex-col gap-2.5 bg-[#eef3f5] px-4">
            <div className="flex flex-1 items-center gap-3 bg-[#d6eaf2]"> {/* Disruption BG */}
              <DisruptionRiskSideBar
                  color={CLASS_DOTS[disruptionClass] ?? "#6b7280"}
              />
              {/* Disruption Left Header */}
              <div className="flex flex-1 flex-col items-start">
              <span className="text-[10px] font-bold tracking-wide text-[#333]">
                DISRUPTION CLASS:
              </span>
                <span className="text-2xl leading-none font-extrabold uppercase">
               {disruptionClass}
              </span>
              </div>
              <CircleBadge
                  name={DISRUPTION_NAME[disruptionClass] ?? "?"}
                  color={CLASS_DOTS[disruptionClass] ?? "#6b7280"}
                  url={DISRUPTION_URL[disruptionClass] ?? "?"}
              />
            </div>
            <div className="flex flex-1 items-center gap-3 bg-[#d6eaf2]"> {/* Risk BG */}
              <DisruptionRiskSideBar
                  color={CLASS_DOTS[riskClass] ?? "#6b7280"}
              />
              <div className="flex flex-1 flex-col items-start">
              <span className="text-[10px] font-bold tracking-wide text-[#333]">
                RISK CLASS:
              </span>
                <span className="text-2xl leading-none font-extrabold uppercase">
               {riskClass}
              </span>
              </div>
              <CircleBadge
                  name={RISK_NAME[riskClass] ?? "?"}
                  color={CLASS_DOTS[riskClass] ?? "#6b7280"}
                  url={RISK_URL[riskClass] ?? "?"}
              />
            </div>
          </div>
          {/* Class emblem */}
        </div>

        {/* Thin black divider */}
        <div className="my-1 h-1 bg-gray-800" />

        {/* MAIN */}

        <div className="flex items-stretch border-b-2 border-white">
          <div className="flex flex-1 items-stretch bg-[#dfe9f0]">
            {/* Checklist — left half */}
            <ul className="flex-1 space-y-1 px-4 py-2">
              {[
                { label: "Requires Containment Engineer", checked: false },
                { label: "Requires Tactics Escort", checked: false },
                { label: "Requires 04 Approval", checked: true },
                { label: "Requires Special Approval — See Governance Protocols", checked: true },
              ].map((item) => (
                  <li key={item.label} className="flex items-center gap-2 text-sm">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center border-2 border-[#1b3a5c] bg-white">
                  {item.checked && (
                      <span className="text-xs font-black leading-none text-[#1b3a5c]">✓</span>
                  )}
                  </span>
                    {item.label}
                  </li>
              ))}
            </ul>
            {/* Min. researcher position — right half */}
            <div className="flex w-56 shrink-0 flex-col items-center border-l-2 border-white px-4 py-2">
              <span className="bg-[#1b3a5c] px-3 py-1 text-[11px] font-bold uppercase text-white">
                Min. Researcher Position
              </span>
              <div className="flex flex-1 items-center">
                <span className="text-center text-lg font-black uppercase leading-tight">
                  Anomaly Researcher
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="my-1 h-3 bg-gray-800" />



      </div>
  );
}
