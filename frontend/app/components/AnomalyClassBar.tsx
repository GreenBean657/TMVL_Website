import Image from "next/image";
import styles from "../../css/components/AnomalyClassBar.module.css";

type ClassData = {
  name: string;
  url: string;
  colors: {
    main: string;
    light: string;
  };
  title?: string;
};

const DATA: Record<string, ClassData> = {
  dark: {
    name: "Dark",
    url: "/disruption/dark.svg",
    colors: {
      main: "#009f6b",
      light: "#cde1fb"
    }
  },
  vlam: {
    name: "Vlam",
    url: "/disruption/vlam.svg",
    colors: {
      main: "#3b82f6",
      light: "#cde1fb"
    }
  },
  keneq: {
    name: "Klam",
    url: "/disruption/keneq.svg",
    colors: {
      main: "#eab308",
      light: "#fbf1cd"
    }
  },
  ekhi: {
    name: "Ekhi",
    url: "/disruption/ekhi.svg",
    colors: {
      main: "#f97316",
      light: "#fbf1cd"
    }
  },
  amida: {
    name: "Amida",
    url: "/disruption/amida.svg",
    colors: {
      main: "#c40233",
      light: "#f6d2d2"
    }
  },
  notice: {
    name: "Notice",
    url: "/risk/notice.svg",
    colors: {
      main: "#009f6b",
      light: "#e0f2d6"
    }
  },
  caution: {
    name: "Caution",
    url: "/risk/caution.svg",
    colors: {
      main: "#84cc16",
      light: "#e0f2d6"
    }
  },
  warning: {
    name: "Warning",
    url: "/risk/warning.svg",
    colors: {
      main: "#eab308",
      light: "#fbf1cd"
    }
  },
  danger: {
    name: "Danger",
    url: "/risk/danger.svg",
    colors: {
      main: "#f97316",
      light: "#fbf1cd"
    }
  },
  critical: {
    name: "Critical",
    url: "/risk/critical.svg",
    colors: {
      main: "#c40233",
      light: "#f6d2d2"
    }
  },
  ursa: {
    name: "Ursa",
    url: "/tier/Ursa.png",
    colors: {
      main: "#004bad",
      light: "#cde1fb"
    }
  },
  lyra: {
    name: "Lyra",
    url: "/tier/Lyra.png",
    colors: {
      main: "#c1ebab",
      light: "#e0f2d6"
    }
  },
  orion: {
    name: "Orion",
    url: "/tier/Orion.png",
    colors: {
      main: "#ffdd5b",
      light: "#fbf1cd"
    }
  },
  cygnus: {
    name: "Cygnus",
    url: "/tier/Cygnus.png",
    colors: {
      main: "#ffdd5b",
      light: "#fbf1cd"
    }
  },
  drako: {
    name: "Drako",
    url: "/tier/Drako.png",
    colors: {
      main: "#ab1415",
      light: "#f6d2d2"
    }
  },
  hydra: {
    name: "Hydra",
    url: "/tier/Hydra.png",
    colors: {
      main: "#ab1415",
      light: "#f6d2d2"
    }
  },
  cassiopeia: {
    name: "Cassiopeia",
    url: "/tier/Cassiopeia.png",
    colors: {
      main: "#710c67",
      light: "#f7d1f3"
    }
  },
  ophiuchus: {
    name: "Ophiuchus",
    url: "/tier/Ophiuchus.png",
    colors: {
      main: "#710c67",
      light: "#f7d1f3"
    }
  },
  undefined: {
    name: "undefined",
    title: "UNDEFINED",
    url: "/ERROR_R.png",
    colors: {
      main: "#ab1415",
      light: "#f6d2d2"
    }
  }
};

function DisruptionRiskSideBar({ color }: { color: string }) {
  return (
      <div className={styles.sideBar}
           style={{background: color}}
      />
  )
}
function ContainmentTier({ tier, url, color_main, color_back }: { tier: string, url: string, color_main: string, color_back: string }) {
  return (
      <div className={styles.tier}>
        <div className={styles.tierStrip}
          style={{backgroundColor: color_main}}
        />
        <div className={styles.tierBody}
             style={{backgroundColor: color_back}}
        >
          <div className={styles.tierText}>
            <div className={styles.tierLabel}>
              OBJECT CLASS:
            </div>
            <div className={styles.tierName}>
              {tier}
            </div>
          </div>
          <div className={styles.tierEmblem}>
            <Image
                src={url}
                alt={tier}
                width={90}
                height={80}
                className={styles.tierImg}
            />
          </div>
        </div>
      </div>
  );
}

function CircleBadge({ name, color, url }: { name: string; color: string; url: string }) {
  return (
      <div
          className={styles.badge}
          style={{ backgroundColor: color }}
      >
        <Image alt={name} src={url} width={120} height={120} />
      </div>
  );
}

/**
 * @desc Convert a true/false string to the boolean value, case insensitive.
 * @param val True/False string
 * @brief "tRue" > true, "faLsE" > false
 */
function BoolStrToRaw({ val }: { val: string }) {
  return ((val).toLowerCase() === "true");
}
/**
 * @desc Converts a string to regular case (first letter of each word capitalized, rest lower case).
 * @param str String to convert, either lower or upper case.
 * @brief "hello wOrLd" > "Hello World"
 */
function toRegularCase({ str }: { str: string }) {
  str = (str).toLowerCase();
  if (str.length == 0) {
    return ""
  }
  for (let i = 0; i < str.length; i++) {
    if (i == 0) {
      str = str[0].toUpperCase() + str.substring(1);
    } else if (str.charAt(i) == ' ') {
      str = str.substring(0, i + 1) + str.charAt(i + 1).toUpperCase() + str.substring(i + 2);
    }
  }
  return str;
}

export default function AnomalyClassBar({
                                          params,
                                        }: {
  params: Record<string, string>;
}) {
  const itemNumber = params["item-number"] ?? "undefined";
  const containerClass = params["container-class"] ?? "cassiopeia";
  const disruptionClass = (params["disruption-class"] ?? "undefined").toLowerCase();
  const riskClass = (params["risk-class"] ?? "undefined").toLowerCase();
  const reqContainmentEngineer = BoolStrToRaw({ val: params["req-engineer"] ?? "false" });
  const reqTactics = BoolStrToRaw({ val: params["req-tactics"] ?? "false" });
  const reqO4 = BoolStrToRaw({ val: params["req-O4"] ?? "false" });
  const reqSpecial = BoolStrToRaw({ val: params["req-special"] ?? "false" });

  const minResearcherPosition = params["min-researcher"] ?? "undefined";
  const department = (params["department"] ?? "undefined").toUpperCase();
  const division = toRegularCase({ str: (params["division"] ?? "undefined" )});
  return (
      <div className={styles.root}>
        {/* Header: item number, pinstripes, clearance level */}
        <div className={styles.header}>
          <div className={styles.aegLabel}>
            <span className={styles.aegPrefix}>AEG#:</span>
            <span className={styles.aegNumber}>
            {itemNumber}
          </span>
          </div>
          <div className={styles.dept}>
            <div className={styles.deptName}>
              {department}
            </div>
            <div className={styles.deptSub}>
              {division}
            </div>
          </div>
        </div>

        {/* Thick black divider */}
        <div className={styles.dividerThick} />

        {/* Body */}
        <div className={styles.body}>
          {/* Containment class */}
          <ContainmentTier
              tier={DATA[containerClass]?.name ?? DATA["undefined"]?.name}
              url={DATA[containerClass]?.url ?? DATA["undefined"]?.url}
              color_main={DATA[containerClass]?.colors?.main ?? DATA["undefined"]?.colors?.main}
              color_back={DATA[containerClass]?.colors?.light ?? DATA["undefined"]?.colors?.light}
          />
          {/* Disruption + risk */}
          <div className={styles.classes}>
            <div className={styles.classRow}> {/* Disruption BG */}
              <DisruptionRiskSideBar
                  color={DATA[disruptionClass]?.colors?.main ?? DATA["undefined"]?.colors?.main}
              />
              {/* Disruption Left Header */}
              <div className={styles.classText}>
              <span className={styles.classLabel}>
                DISRUPTION CLASS:
              </span>
                <span className={styles.classValue}>
               {DATA[disruptionClass]?.name ?? DATA["undefined"]?.name}
              </span>
              </div>
              <CircleBadge
                  name={DATA[disruptionClass]?.name ?? DATA["undefined"]?.name}
                  color={DATA[disruptionClass]?.colors?.main ?? DATA["undefined"]?.colors?.main}
                  url={DATA[disruptionClass]?.url ?? DATA["undefined"]?.url}
              />
            </div>
            <div className={styles.classRow}> {/* Risk BG */}
              <DisruptionRiskSideBar
                  color={DATA[riskClass]?.colors?.main ?? DATA["undefined"]?.colors?.main}
              />
              <div className={styles.classText}>
              <span className={styles.classLabel}>
                RISK CLASS:
              </span>
                <span className={styles.classValue}>
               {DATA[riskClass]?.name ?? DATA["undefined"]?.name}
              </span>
              </div>
              <CircleBadge
                  name={DATA[riskClass]?.name ?? DATA["undefined"]?.name}
                  color={DATA[riskClass]?.colors?.main ?? DATA["undefined"]?.colors?.main}
                  url={DATA[riskClass]?.url ?? DATA["undefined"]?.url}
              />
            </div>
          </div>
          {/* Class emblem */}
        </div>

        {/* Thin black divider */}
        <div className={styles.dividerThin} />

        {/* MAIN */}

        <div className={styles.main}>
          <div className={styles.mainInner}>
            {/* Checklist — left half */}
            <ul className={styles.checklist}>
              {[
                { label: "Requires Containment Engineer", checked: reqContainmentEngineer },
                { label: "Requires Tactics Escort", checked: reqTactics },
                { label: "Requires 04 Approval", checked: reqO4 },
                { label: "Requires Special Approval — See Governance Protocols", checked: reqSpecial },
              ].map((item) => (
                  <li key={item.label} className={styles.checkItem}>
                    <span className={styles.checkbox}>
                    {item.checked && (
                        <span className={styles.checkmark}>✓</span>
                    )}
                    </span>
                    {item.label}
                  </li>
              ))}
            </ul>
            {/* Min. researcher position — right half */}
            <div className={styles.minPos}>
              <span className={styles.minPosLabel}>
                Min. Researcher Position
              </span>
              <div className={styles.minPosValueWrap}>
                <span className={styles.minPosValue}>
                  {minResearcherPosition}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.dividerBottom} />



      </div>
  );
}
