import type { Analysis } from "@/types/analysis";
import { scoreToColorClass } from "@/utils/score";
import { OverlayRadar } from "../OverlayRadar";

interface Props {
  analysisA: Analysis;
  analysisB: Analysis;
}

export function ComparisonDetail({ analysisA, analysisB }: Props) {
  const delta = analysisB.overallScore - analysisA.overallScore;

  return (
    <div className="space-y-8">
      <div className="pb-6 border-b border-(--surface-border)">
        <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-4">
          Comparing
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* Analysis A */}
        <div className="space-y-1">
          <div
            className="w-3 h-3 rounded-full bg-brand-500 mb-2"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">
            {analysisA.adTitle}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {analysisA.advertiser}
          </p>
          <p
            className={`text-3xl font-bold tabular-nums pt-1 ${scoreToColorClass(analysisA.overallScore)}`}
          >
            {analysisA.overallScore}
          </p>
        </div>

        {/* Analysis B */}
        <div className="space-y-1">
          <div
            className="w-3 h-3 rounded-full bg-score-good mb-2"
            aria-hidden="true"
          />
          <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 leading-snug">
            {analysisB.adTitle}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {analysisB.advertiser}
          </p>
          <div className="flex items-baseline gap-2 pt-1">
            <p
              className={`text-3xl font-bold tabular-nums ${scoreToColorClass(analysisB.overallScore)}`}
            >
              {analysisB.overallScore}
            </p>
            <span
              className={`text-sm font-semibold ${delta >= 0 ? "text-score-good" : "text-score-poor"}`}
            >
              {delta >= 0 ? "+" : ""}
              {delta}
            </span>
          </div>
        </div>
      </div>

      <section aria-label="Score comparisson">
        <OverlayRadar analysisA={analysisA} analysisB={analysisB} />
      </section>
    </div>
  );
}
