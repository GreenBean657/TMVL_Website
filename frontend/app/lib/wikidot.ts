// Minimal Wikidot-style parser for AEG document sources.
// Supports:
//   [[include :aegis:component:anomaly-class-bar |key= value ... ]]
//   **Heading**            (a line that is entirely bold)
//   [[pagebreak]]          (starts a new document sheet)
//   plain paragraphs, **inline bold** within them

export type Block =
  | { type: "classBar"; params: Record<string, string> }
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string };

const INCLUDE_RE =
  /\[\[include\s+:[\w-]+:component:anomaly-class-bar\s*([\s\S]*?)\]\]/;

export function parsePages(source: string): Block[][] {
  return source
    .split("[[pagebreak]]")
    .map(parseBlocks)
    .filter((blocks) => blocks.length > 0);
}

function parseBlocks(chunk: string): Block[] {
  const blocks: Block[] = [];
  let rest = chunk;
  let match: RegExpExecArray | null;

  while ((match = INCLUDE_RE.exec(rest)) !== null) {
    pushTextBlocks(rest.slice(0, match.index), blocks);

    const params: Record<string, string> = {};
    for (const line of match[1].split("\n")) {
      const param = /^\s*\|\s*([\w-]+)\s*=\s*(.*?)\s*$/.exec(line);
      if (param) params[param[1]] = param[2];
    }
    blocks.push({ type: "classBar", params });

    rest = rest.slice(match.index + match[0].length);
  }

  pushTextBlocks(rest, blocks);
  return blocks;
}

function pushTextBlocks(text: string, blocks: Block[]) {
  for (const raw of text.split(/\n\s*\n/)) {
    const trimmed = raw.trim();
    if (!trimmed) continue;

    const heading = /^\*\*(.+)\*\*$/.exec(trimmed);
    if (heading) {
      blocks.push({ type: "heading", text: heading[1].trim() });
    } else {
      blocks.push({ type: "paragraph", text: trimmed.replace(/\n/g, " ") });
    }
  }
}
