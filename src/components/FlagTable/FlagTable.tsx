import { useState, useRef, useEffect } from "react";
import type { Flag, Dimension } from "@/types/analysis";
import { useDashboardStore } from "@/stores/dashboard.store";
import { SEVERITY_RANK } from "@/utils/severity";
import { FlagTableRow } from "./FlagTableRow";

const DIMENSION_OPTIONS: { value: Dimension | "all"; label: string }[] = [
  { value: "all", label: "All dimensions" },
  { value: "hook", label: "Hook" },
  { value: "credibility", label: "Credibility" },
  { value: "emotionalAppeal", label: "Emotional Appeal" },
  { value: "memorability", label: "Memorable" },
  { value: "shareability", label: "Shareable" },
];

interface Props {
  flags: Flag[];
}

export function FlagTable({ flags }: Props) {
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [dimensionFilter, setDimensionFilter] = useState<Dimension | "all">(
    "all",
  );

  const { selectedFlagId, setSelectedFlagId } = useDashboardStore();
  const rowRefs = useRef<Map<string, HTMLTableRowElement>>(new Map());

  useEffect(() => {
    if (!selectedFlagId) return;
    rowRefs.current.get(selectedFlagId)?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [selectedFlagId]);

  const displayed = [...flags]
    .filter((f) => dimensionFilter === "all" || f.dimension === dimensionFilter)
    .sort((a, b) => {
      const diff = SEVERITY_RANK[a.severity] - SEVERITY_RANK[b.severity];
      return sortDir === "desc" ? -diff : diff;
    });

  return (
    <div className="rounded-xl border border-(--surface-border) overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-(--surface-border) bg-(--surface-card)">
        <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500">
          Risk Flags
          <span className="ml-2 text-xs font-normal text-gray-400 dark:text-gray-500">
            {displayed.length} of {flags.length}
          </span>
        </h3>
        <select
          value={dimensionFilter}
          onChange={(e) =>
            setDimensionFilter(e.target.value as Dimension | "all")
          }
          className="text-xs px-2 py-1.5 rounded-md border border-(--surface-border) bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Filter by dimension"
        >
          {DIMENSION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-150" role="grid">
          <thead className="bg-(--surface-card)">
            <tr className="border-b border-(--surface-border)">
              <th className="py-2.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Flag text
              </th>
              <th
                aria-sort={sortDir === "desc" ? "descending" : "ascending"}
                className="py-2.5 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide"
              >
                <button
                  onClick={() =>
                    setSortDir((d) => (d === "desc" ? "asc" : "desc"))
                  }
                  className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:underline transition-colors cursor-pointer"
                >
                  Severity{" "}
                  <span aria-hidden="true">
                    {sortDir === "desc" ? "↓" : "↑"}
                  </span>
                </button>
              </th>
              <th className="py-2.5 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Dimension
              </th>
              <th className="py-2.5 pl-3 pr-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Suggestion
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--surface-border)">
            {displayed.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-8 text-center text-sm text-gray-400 dark:text-gray-500"
                >
                  No flags match the selected dimension
                </td>
              </tr>
            ) : (
              displayed.map((flag) => (
                <tr
                  key={flag.id}
                  ref={(el) => {
                    if (el) rowRefs.current.set(flag.id, el);
                    else rowRefs.current.delete(flag.id);
                  }}
                  onClick={() => setSelectedFlagId(flag.id)}
                  className={[
                    "cursor-pointer transition-colors duration-100",
                    selectedFlagId === flag.id
                      ? "bg-brand-50 dark:bg-brand-950/30"
                      : "bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/60",
                  ].join(" ")}
                >
                  <FlagTableRow flag={flag} />
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
