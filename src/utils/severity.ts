import type { Flag, Severity } from "@/types/analysis";

// If a new Severity value is added, TypeScript will error
// at every exhaustive switch. That is intentional.
export const SEVERITY_RANK: Record<Severity, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

export function sortFlagsBySeverity(
  flags: Flag[],
  dir: "asc" | "desc",
): Flag[] {
  return [...flags].sort((a, b) => {
    const diff = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
    return dir === "desc" ? -diff : diff;
  });
}

export function severityToColor(severity: Severity): string {
  switch (severity) {
    case "high":
      return "text-severity-high bg-severity-high/10";
    case "medium":
      return "text-severity-medium bg-severity-medium/10";
    case "low":
      return "text-severity-low bg-severity-low/10";
  }
}

export function severityToHighlightColor(severity: Severity): string {
  switch (severity) {
    case "high":
      return "bg-severity-high/25 hover:bg-severity-high/40";
    case "medium":
      return "bg-severity-medium/25 hover:bg-severity-medium/40";
    case "low":
      return "bg-severity-low/25 hover:bg-severity-low/40";
  }
}
