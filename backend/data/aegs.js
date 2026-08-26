// Static document sources shaped the way a future database query would return
// them. Each document is Wikidot-style source text that an author can edit.
// Supported syntax (parsed by the frontend):
//   [[include :aegis:component:anomaly-class-bar |key= value ... ]]
//   **Heading**  (a fully-bold line becomes a section heading)
//   [[pagebreak]]  (starts a new document sheet)
//   blank-line-separated paragraphs, **inline bold** supported

module.exports = {
  "001": {
    id: "001",
    title: "The Hollow Choir",
    source: `
    [[include :aegis:component:anomaly-class-bar
|item-number=001
|container-class= cassiopeia
|disruption-class= ekhi
|risk-class= caution
|req-engineer=false
|req-tactics=false
|req-O4=false
|req-special=false
|min-researcher=Senior Researcher
|department=Biology Department
|division=Genetic Development Division
]]

**Governance Protocols**

AEG-001 is to be housed in a standard humanoid containment cell at AEGIS Site-07. The cell must be lined with acoustic dampening foam and maintained at a constant temperature of 18°C. Personnel entering the containment area must wear sound-suppressing earmuffs rated for at least 40 dB of attenuation.

Under no circumstances are personnel to remain within audible range of AEG-001 for longer than fifteen minutes. Any subject reporting intrusive thoughts, harmonic humming, or the sensation of being addressed by name must be removed immediately and evaluated by the on-site psychiatric team.

[[pagebreak]]

**Description**

AEG-001 appears as a featureless humanoid figure approximately 1.7 meters in height. Its surface resembles polished obsidian and reflects no visible light. Despite the absence of identifiable sensory organs, AEG-001 is capable of perceiving its surroundings and reacting to movement and sound.

The entity continuously emits a low-frequency resonance that intensifies when living beings are nearby. Prolonged exposure leads to auditory hallucinations, involuntary vocalization, and in severe cases, complete cessation of autonomous function. The mechanism behind this effect remains under investigation.

**Addendum AEG-001-1**

On ██/██/20██, AEG-001 began vocalizing in a language later identified as a dead dialect of [REDACTED]. Translation efforts are ongoing. The entity has not responded to direct questioning.`,
  },

  "002": {
    id: "002",
    title: "The Living Room",
    source: `[[include :aegis:component:anomaly-class-bar
|item-number= 002
|clearance= 2
|container-class= safe
|secondary-class= none
|secondary-icon= /Lyra.png
|disruption-class= dark
|risk-class= notice
]]

**Special Containment Procedures**

The entrance to AEG-002 is to remain sealed within a standard containment annex at AEGIS Site-07. Access requires Level-2 clearance and written approval from the Site Director. No furniture, recording equipment, or living organisms may be introduced into AEG-002 outside of approved testing protocols.

**Description**

AEG-002 is a domestic living room of indeterminate spatial extent. Furnishings within AEG-002 rearrange themselves when unobserved, consistently forming layouts described by test subjects as 'inviting'. Subjects who remain inside for longer than one hour report a strong reluctance to leave.`,
  },

  "003": {
    id: "003",
    title: "Biological Motherboard",
    source: `[[include :aegis:component:anomaly-class-bar
|item-number= 003
|clearance= 3
|container-class= euclid
|secondary-class= none
|secondary-icon= /Cygnus.png
|disruption-class= keneq
|risk-class= caution
]]

**Special Containment Procedures**

AEG-003 is to be kept in a climate-controlled bio-containment locker at AEGIS Site-12. The locker must remain electrically isolated at all times. Any networked device brought within ten meters of AEG-003 is to be considered compromised and incinerated.

**Description**

AEG-003 is a printed circuit board composed of living tissue, including functioning vasculature and neural analogues. When supplied with power, AEG-003 attempts to interface with nearby electronic devices and has demonstrated the ability to [REDACTED].`,
  },

  "004": {
    id: "004",
    title: "The 12 Rusty Keys",
    source: `[[include :aegis:component:anomaly-class-bar
|item-number= 004
|clearance= 3
|container-class= euclid
|secondary-class= none
|secondary-icon= /Orion.png
|disruption-class= ekhi
|risk-class= warning
]]

**Special Containment Procedures**

Each instance of AEG-004 is to be stored in a separate locked container at AEGIS Site-03. Under no circumstances are more than three instances to be stored in the same wing. Testing on doors not approved by the Ethics Committee is forbidden following Incident 004-K.

**Description**

AEG-004 is a set of twelve iron keys, all exhibiting heavy oxidation. Each key opens a lock somewhere in the world; the corresponding lock migrates whenever the key is used. Subjects holding an instance report an overwhelming urge to 'find the thirteenth'.`,
  },

  "005": {
    id: "005",
    title: "Skeleton Key",
    source: `[[include :aegis:component:anomaly-class-bar
|item-number= 005
|clearance= 2
|container-class= safe
|secondary-class= none
|secondary-icon= /Drako.png
|disruption-class= dark
|risk-class= notice
]]

**Special Containment Procedures**

AEG-005 is to be kept in a padded lockbox in the Site-03 anomalous items vault. Use of AEG-005 for any purpose other than approved testing requires Level-3 clearance. AEG-005 must never be brought into contact with any instance of AEG-004.

**Description**

AEG-005 is a brass skeleton key of mundane appearance. AEG-005 opens any mechanical lock it is inserted into, regardless of design. Electronic and conceptual locks are unaffected. Notably, AEG-005 cannot open the lock on its own containment box — testing into this exception is ongoing.`,
  },
};
