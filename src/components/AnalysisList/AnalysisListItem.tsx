import type { Analysis } from "@/types/analysis";
import { scoreToColorClass } from "@/utils/score";
import { formatDate } from "@/utils/format";

interface Props {
  analysis: Analysis;
  isSelected: boolean;
  onClick: () => void;
}

export function AnalysisListItem({ analysis, isSelected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-current={isSelected ? "true" : undefined}
      className={[
        "w-full text-left px-3 py-3 rounded-lg transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2",
        isSelected
          ? "bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800"
          : "border border-transparent hover:bg-gray-100 dark:hover:bg-gray-800/60",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-gray-900 dark:text-white leading-snug line-clamp-2">
          {analysis.adTitle}
        </p>
        <span
          className={`text-sm font-bold shrink-0 tabular-nums ${scoreToColorClass(analysis.overallScore)}`}
        >
          {analysis.overallScore}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
        {analysis.advertiser}
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0 5">
        {formatDate(analysis.dateAnalyzed)}
      </p>
    </button>
  );
}
