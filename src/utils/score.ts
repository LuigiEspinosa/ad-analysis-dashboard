export function scoreToColorClass(score: number): string {
  if (score >= 70) return "text-score-good";
  if (score >= 50) return "text-score-medium";
  return "text-score-poor";
}

export function scoreToStrokeColor(score: number): string {
  if (score >= 70) return "#10b981";
  if (score >= 50) return "#f59e0b";
  return "#ef4444";
}
