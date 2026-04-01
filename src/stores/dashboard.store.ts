import { create } from "zustand";

interface DashboardStore {
  selectedAnalysisId: string | null;
  setSelectedAnalysisId: (id: string) => void;
  selectedFlagId: string | null;
  setSelectedFlagId: (id: string | null) => void;
  comparisonMode: boolean;
  comparisonAnalysisId: string | null;
  toggleComparisonMode: () => void;
  setComparisonAnalsisId: (id: string | null) => void;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  selectedAnalysisId: null,
  setSelectedAnalysisId: (id) =>
    set({ selectedAnalysisId: id, selectedFlagId: null }),
  selectedFlagId: null,
  setSelectedFlagId: (id) => set({ selectedFlagId: id }),
  comparisonMode: false,
  comparisonAnalysisId: null,
  toggleComparisonMode: () =>
    set((s) => ({
      comparisonMode: !s.comparisonMode,
      comparisonAnalysisId: s.comparisonMode ? null : s.comparisonAnalysisId,
    })),
  setComparisonAnalsisId: (id) => set({ comparisonAnalysisId: id }),
}));
