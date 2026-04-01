import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type {
  Analysis,
  ComparisonRadarPoint,
  DimensionScores,
} from "@/types/analysis";

const DIMENSION_LABELS: Record<keyof DimensionScores, string> = {
  hook: "Hook",
  credibility: "Credibility",
  emotionalAppeal: "Emotional Appeal",
  memorability: "Memorable",
  shareability: "Shareable",
};

interface Props {
  analysisA: Analysis;
  analysisB: Analysis;
}

export function OverlayRadar({ analysisA, analysisB }: Props) {
  const data: ComparisonRadarPoint[] = (
    Object.keys(analysisA.dimensions) as (keyof DimensionScores)[]
  ).map((key) => ({
    dimension: DIMENSION_LABELS[key],
    scoreA: analysisA.dimensions[key],
    scoreB: analysisB.dimensions[key],
    fullMark: 100,
  }));

  return (
    <div className="w-full text-gray-500 dark:text-gray-400">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
        >
          <PolarGrid stroke="var(--surface-border)" />
          <PolarAngleAxis
            dataKey="dimension"
            tick={{ fontSize: 11, fill: "currentColor" }}
          />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name={analysisA.adTitle}
            dataKey="scoreA"
            stroke="#4d65ff"
            fill="#4d65ff"
            fillOpacity={0.2}
          />
          <Radar
            name={analysisB.adTitle}
            dataKey="scoreB"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
          />
          <Legend wrapperStyle={{ fontSize: "11px" }} />
          <Tooltip
            formatter={(value) => [value ?? "", "Score"]}
            contentStyle={{
              background: "var(--surface-card)",
              border: "1px solid var(--surface-border)",
              borderRadius: "8px",
              fontSize: "12px",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
