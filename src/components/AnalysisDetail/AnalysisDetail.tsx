import type { Analysis } from "@/types/analysis";
import { ScoreGauge } from "../ScoreGauge/ScoreGauge";
import { DimensionRadar } from "../DimensionRadar/DimensionRadar";
import { formatDate } from "@/utils/format";
import { scoreToColorClass } from "@/utils/score";

interface Props {
  analysis: Analysis;
}

export function AnalysisDetail({ analysis }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-(--surface-border)">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white leading-snug">
              {analysis.adTitle}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {analysis.advertiser} &middot; {formatDate(analysis.dateAnalyzed)}
            </p>
          </div>
          <span
            className={`text-3xl font-bold tabular-nums shrink-0 ${scoreToColorClass(analysis.overallScore)}`}
          >
            {analysis.overallScore}
          </span>
        </div>
      </div>

      {/* Score section */}
      <section aria-label="Score overview">
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="shrink-0">
            <ScoreGauge score={analysis.overallScore} />
          </div>
          <div className="flex-1 w-full min-w-0">
            <DimensionRadar dimensions={analysis.dimensions} />
          </div>
        </div>
      </section>

      <div className="h-48 rounded-xl border border-dashed border-(--surface-border) flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
        TODO: Risk flags table
      </div>

      <div className="h-32 rounded-xl border border-dashed border-(--surface-border) flex items-center justify-center text-sm text-gray-400 dark:text-gray-500">
        TODO: Annotated text viewer
      </div>
    </div>
  );
}
