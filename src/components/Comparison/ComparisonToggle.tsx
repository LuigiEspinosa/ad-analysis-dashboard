import { useDashboardStore } from "@/stores/dashboard.store";
import ComparisonIcon from "../Icons/ComparisonIcon";

export function ComparisonToggle() {
  const { comparisonMode, toggleComparisonMode } = useDashboardStore();

  return (
    <button
      onClick={toggleComparisonMode}
      aria-pressed={comparisonMode}
      className={[
        "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg",
        "text-xs font-medium transition-colors duration-150",
        comparisonMode
          ? "bg-brand-500 text-white hover:bg-brand-600"
          : "bg-(--surface-card) border border-(--surface-border) text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
      ].join(" ")}
    >
      <ComparisonIcon />
      {comparisonMode ? "Exit comparison" : "Compare"}
    </button>
  );
}
