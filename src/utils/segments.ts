import type { Flag, TextSegment } from "@/types/analysis";
import { SEVERITY_RANK } from "./severity";

/**
 * Converts ad text and its flags into an ordered array of text segments.
 * Each segment is either unflagged (flag: null) or covered by exactly one flag.
 *
 * When multiple flags cover the same character rage,
 * the highest-severity flag wins. This surfaces the most critical issue
 * visually rather than hiding it under a lower-severity color.
 *
 * innerHTML-based highlighting is simpler but requires
 * sanitization, cannot attach typed React handlers , and is untestable.
 */
export function buildSegments(text: string, flags: Flag[]): TextSegment[] {
  if (flags.length === 0) {
    return [{ text, flag: null, start: 0, end: text.length }];
  }

  const boundaries = new Set<number>([0, text.length]);
  for (const flag of flags) {
    boundaries.add(Math.max(0, flag.start));
    boundaries.add(Math.min(text.length, flag.end));
  }

  const sorted = Array.from(boundaries).sort((a, b) => a - b);

  const segments: TextSegment[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];
    if (start === end) continue;

    const mid = (start + end) / 2;
    const covering = flags.filter((f) => f.start <= mid && f.end >= mid);

    const dominant = covering.reduce<Flag | null>((best, f) => {
      if (!best) return f;
      return SEVERITY_RANK[f.severity] > SEVERITY_RANK[best.severity]
        ? f
        : best;
    }, null);

    segments.push({ text: text.slice(start, end), flag: dominant, start, end });
  }

  return segments;
}
