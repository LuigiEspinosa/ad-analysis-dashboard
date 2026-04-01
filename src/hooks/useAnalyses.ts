import { useQuery } from "@tanstack/react-query";
import { fetchAnalyses } from "@/api/analyses";

export function useAnalyses() {
  return useQuery({
    queryKey: ["analyses"],
    queryFn: fetchAnalyses,
    staleTime: Infinity,
  });
}
