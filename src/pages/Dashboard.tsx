import { useEffect } from "react";
import { useAnalyses } from "@/hooks/useAnalyses";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useDashboardStore } from "@/stores/dashboard.store";
import { AnalysisList } from "@/components/AnalysisList/AnalysisList";
import { AnalysisDetail } from "@/components/AnalysisDetail/AnalysisDetail";

import SunIcon from "@/components/Icons/SunIcon";
import MoonIcon from "@/components/Icons/MoonIcon";

interface Props {
  dark: boolean;
  onToggleDark: () => void;
}

export function Dashboard({ dark, onToggleDark }: Props) {
  const { data: allAnalyses } = useAnalyses();
  const { selectedAnalysisId, setSelectedAnalysisId } = useDashboardStore();
  const {
    data: analysis,
    isLoading,
    error,
    refetch,
  } = useAnalysis(selectedAnalysisId);

  useEffect(() => {
    if (allAnalyses && allAnalyses.length > 0 && selectedAnalysisId === null) {
      setSelectedAnalysisId(allAnalyses[0].id);
    }
  }, [allAnalyses, selectedAnalysisId, setSelectedAnalysisId]);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[320px_1fr] bg-(--surface-page)">
      {/* Sidebar */}
      <aside className="border-r border-(--surface-border) bg-(--surface-sidebar) lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 border-b border-(--surface-border) shrink-0">
          <div>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
              Ad Analysis
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
              PharosGraph
            </p>
          </div>
          <button
            onClick={onToggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={dark}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-colors"
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          <AnalysisList />
        </div>
      </aside>

      <main className="p-6 lg:p-8 overflow-y-auto">
        {isLoading && (
          <div className="space-y-8 animate-pulse">
            <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center h-48 gap-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Failed to load analysis
            </p>
            <button
              onClick={() => refetch()}
              className="text-sm text-brand-500 hover:text-brand-600 underline"
            >
              Try again
            </button>
          </div>
        )}
        {analysis && <AnalysisDetail analysis={analysis} />}
      </main>
    </div>
  );
}
