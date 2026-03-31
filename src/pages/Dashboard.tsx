import { useEffect } from "react";
import { useAnalyses } from "@/hooks/useAnalyses";
import { useDashboardStore } from "@/stores/dashboard.store";
import { AnalysisList } from "@/components/AnalysisList/AnalysisList";

import SunIcon from "@/components/Icons/SunIcon";
import MoonIcon from "@/components/Icons/MoonIcon";

interface Props {
  dark: boolean;
  onToggleDark: () => void;
}

export function Dashboard({ dark, onToggleDark }: Props) {
  const { data } = useAnalyses();
  const { selectedAnalysisId, setSelectedAnalysisId } = useDashboardStore();

  useEffect(() => {
    if (data && data.length > 0 && selectedAnalysisId === null) {
      setSelectedAnalysisId(data[0].id);
    }
  }, [data, selectedAnalysisId, setSelectedAnalysisId]);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[320px_1fr] bg-(--surface-page)">
      {/* Sidebar */}
      <aside className="border-r border-(--surface-border) bg-(--surface-sidebar) lg:h-screen lg:sticky lg:top-0 lg:overflow-y-auto flex flex-col">
        <div className="flex items-center justify-between px-4 py-4 border-b border-(--surface-border) shrink-0">
          <div>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white tracking-tight">
              Ad Analysis
            </h1>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0 5">
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

      {/* TODO: Main panel */}
      <main className="p-6 lg:p-8">
        <p className="text-sm text-gray-400 dark:text-gray-500">
          {selectedAnalysisId
            ? `Selected: ${selectedAnalysisId} - TODO: Detail page`
            : "Loading..."}
        </p>
      </main>
    </div>
  );
}
