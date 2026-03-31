import { useAnalyses } from "@/hooks/useAnalyses";
import { useDashboardStore } from "@/stores/dashboard.store";
import { AnalysisListItem } from "./AnalysisListItem";

export function AnalysisList() {
  const { data, isLoading } = useAnalyses();
  const { selectedAnalysisId, setSelectedAnalysisId } = useDashboardStore();

  if (isLoading) {
    return (
      <div className="space-y-2 p-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-700"
          />
        ))}
      </div>
    );
  }

  return (
    <nav className="space-y-1 p-2" aria-label="Analysis list">
      {data?.map((analysis) => (
        <AnalysisListItem
          key={analysis.id}
          analysis={analysis}
          isSelected={analysis.id === selectedAnalysisId}
          onClick={() => setSelectedAnalysisId(analysis.id)}
        />
      ))}
    </nav>
  );
}
