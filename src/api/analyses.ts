import type { Analysis } from "@/types/analysis";
import analysesData from "@/data/analyses.json";

// Simulates network latency
// Makes loading skeleton visible
// Makes data layer handles async correctly
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function fetchAnalyses(): Promise<Analysis[]> {
  await delay(800);
  return analysesData.analyses as Analysis[];
}

export async function fetchAnalysis(id: string): Promise<Analysis> {
  await delay(400);
  const found = (analysesData.analyses as Analysis[]).find((a) => a.id == id);
  if (!found) throw new Error(`Analysis ${id} not found`);
  return found;
}
