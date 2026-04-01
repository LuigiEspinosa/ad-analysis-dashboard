import { useQuery } from "@tanstack/react-query";
import { fetchAnalysis } from "@/api/analyses";

export function useAnalysis(id: string | null) {
  return useQuery({
    queryKey: ["analysis", id],
    queryFn: () => fetchAnalysis(id!),
    enabled: id !== null,
    staleTime: Infinity,
  });
}
