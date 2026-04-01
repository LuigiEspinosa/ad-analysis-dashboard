import { useEffect, useRef } from "react";
import { gsap } from "gsap/gsap-core";
import { useGSAP } from "@gsap/react";

import { useAnalyses } from "@/hooks/useAnalyses";
import { useAnalysis } from "@/hooks/useAnalysis";
import { useDashboardStore } from "@/stores/dashboard.store";
import { AnalysisList } from "@/components/AnalysisList/AnalysisList";
import { AnalysisDetail } from "@/components/AnalysisDetail/AnalysisDetail";
import { ComparisonToggle } from "@/components/Comparison/ComparisonToggle";
import { ComparisonDetail } from "@/components/Comparison/Comparison/ComparisonDetail";
import { LoadingSkeleton } from "@/components/ui/LoadingSkeleton";

import SunIcon from "@/components/Icons/SunIcon";
import MoonIcon from "@/components/Icons/MoonIcon";

interface Props {
  dark: boolean;
  onToggleDark: () => void;
}

export function Dashboard({ dark, onToggleDark }: Props) {
  const panelRef = useRef<HTMLElement>(null);

  const {
    selectedAnalysisId,
    setSelectedAnalysisId,
    comparisonMode,
    comparisonAnalysisId,
  } = useDashboardStore();

  const { data: allAnalyses } = useAnalyses();
  const {
    data: analysis,
    isLoading,
    error,
    refetch,
  } = useAnalysis(selectedAnalysisId);
  const { data: comparisonAnalysis } = useAnalysis(
    comparisonMode ? comparisonAnalysisId : null,
  );

  useEffect(() => {
    if (allAnalyses && allAnalyses.length > 0 && selectedAnalysisId === null) {
      setSelectedAnalysisId(allAnalyses[0].id);
    }
  }, [allAnalyses, selectedAnalysisId, setSelectedAnalysisId]);

  useGSAP(
    () => {
      if (!selectedAnalysisId) return;
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
      );
    },
    { scope: panelRef, dependencies: [selectedAnalysisId] },
  );

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
          <div className="p-2 pb-0">
            <ComparisonToggle />
          </div>
          <AnalysisList />
        </div>
      </aside>

      <main ref={panelRef} className="p-6 lg:p-8 overflow-y-auto">
        {isLoading && <LoadingSkeleton />}
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
        {analysis && !comparisonMode && <AnalysisDetail analysis={analysis} />}
        {analysis && comparisonMode && !comparisonAnalysis && (
          <div className="flex items-center justify-center h-48">
            <p className="text-sm text-gray-400 dark:text-gray-500">
              Select a second analysis from the sidebar to compare
            </p>
          </div>
        )}
        {analysis && comparisonMode && comparisonAnalysis && (
          <ComparisonDetail
            analysisA={analysis}
            analysisB={comparisonAnalysis}
          />
        )}
      </main>
    </div>
  );
}
