import type { Flag } from "@/types/analysis";
import { SeverityBadge } from "../ui/SeverityBadge";

const DIMENSION_LABELS: Record<string, string> = {
  hook: "Hook",
  credibility: "Credibility",
  emotionalAppeal: "Emotional Appeal",
  memorability: "Memorable",
  shareability: "Shareable",
};

interface Props {
  flag: Flag;
}

export function FlagTableRow({ flag }: Props) {
  return (
    <>
      <td className="py-3 pl-4 pr-3 text-sm text-gray-700 dark:text-gray-300 max-w-45">
        <span className="line-clamp-2" title={flag.text}>
          {flag.text}
        </span>
      </td>
      <td className="py-3 px-3 whitespace-nowrap">
        <SeverityBadge severity={flag.severity} />
      </td>
      <td className="py-3 px-3 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
        {DIMENSION_LABELS[flag.dimension] ?? flag.dimension}
      </td>
      <td className="py-3 pl-3 pr-4 text-sm text-gray-500 dark:text-gray-400 max-w-60">
        <span className="line-clamp-2">{flag.suggestion}</span>
      </td>
    </>
  );
}
