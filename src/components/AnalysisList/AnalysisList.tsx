import { useAnalyses } from "@/hooks/useAnalyses";
import { useDashboardStore } from "@/stores/dashboard.store";
import { AnalysisListItem } from "./AnalysisListItem";

export function AnalysisList() {
  const { data, isLoading } = useAnalyses();
  const {
    selectedAnalysisId,
    setSelectedAnalysisId,
    comparisonMode,
    comparisonAnalysisId,
    setComparisonAnalsisId,
  } = useDashboardStore();

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

  const handleClick = (id: string) => {
    if (!comparisonMode) {
      setSelectedAnalysisId(id);
      return;
    }
    if (id === selectedAnalysisId) return;
    setComparisonAnalsisId(id);
  };

  return (
    <nav className="space-y-1 p-2" aria-label="Analysis list">
      {comparisonMode && (
        <p className="px-1 pb-1 text-xs text-gray-400 dark:text-gray-500">
          Select a second analysis to compare
        </p>
      )}
      {data?.map((analysis) => (
        <AnalysisListItem
          key={analysis.id}
          analysis={analysis}
          isSelected={analysis.id === selectedAnalysisId}
          isComparing={analysis.id === comparisonAnalysisId}
          onClick={() => handleClick(analysis.id)}
        />
      ))}
    </nav>
  );
}
