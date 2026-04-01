import type { Severity } from "@/types/analysis";
import { severityToColor } from "@/utils/severity";

interface Props {
  severity: Severity;
}

const LABELS: Record<Severity, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export function SeverityBadge({ severity }: Props) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${severityToColor(severity)}`}
    >
      {LABELS[severity]}
    </span>
  );
}
