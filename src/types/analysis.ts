export type Severity = "high" | "medium" | "low";

export type Dimension =
  | "hook"
  | "credibility"
  | "emotionalAppeal"
  | "memorability"
  | "shareability";

export interface Flag {
  id: string;
  text: string;
  start: number;
  end: number;
  severity: Severity;
  dimension: Dimension;
  suggestion: string;
}

export interface DimensionScores {
  hook: number;
  credibility: number;
  emotionalAppeal: number;
  memorability: number;
  shareability: number;
}

export interface Analysis {
  id: string;
  adTitle: string;
  advertiser: string;
  dateAnalyzed: string; // ISO 8601
  overallScore: number; // 0-100
  dimensions: DimensionScores;
  adText: string;
  flags: Flag[];
}
