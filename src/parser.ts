import type { ParsedDiagnostic } from "./types.js";

// Matches tsc's default output format, e.g.:
// src/index.ts(12,5): error TS2322: Type 'string' is not assignable to type 'number'.
const TSC_LINE = /^(.+?)\((\d+),(\d+)\): error (TS\d+): (.+)$/;

export function parseTscOutput(raw: string): ParsedDiagnostic[] {
  const results: ParsedDiagnostic[] = [];

  for (const line of raw.split("\n")) {
    const trimmed = line.trimEnd();
    if (!trimmed) continue;

    const matched = trimmed.match(TSC_LINE);
    if (!matched) continue;

    const [, file, lineStr, colStr, code, message] = matched;
    results.push({
      file,
      line: Number(lineStr),
      column: Number(colStr),
      code,
      rawMessage: message,
    });
  }

  return results;
}
