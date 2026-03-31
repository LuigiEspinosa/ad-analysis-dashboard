import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { DimensionScores, RadarDataPoint } from "@/types/analysis";

const DIMENSION_LABELS: Record<keyof DimensionScores, string> = {
  hook: "Hook",
  credibility: "Credibility",
  emotionalAppeal: "Emotional Appeal",
  memorability: "Memorable",
  shareability: "Shareable",
};

interface Props {
  dimensions: DimensionScores;
}

export function DimensionRadar({ dimensions }: Props) {
  const data: RadarDataPoint[] = (
    Object.keys(dimensions) as (keyof DimensionScores)[]
  ).map((key) => ({
    dimension: DIMENSION_LABELS[key],
    score: dimensions[key],
    fullMark: 100,
  }));

  return (
    <div className="w-full text-gray-500 dark:text-gray-400">
      <ResponsiveContainer width="100%" height={260}>
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
            name="Score"
            dataKey="score"
            stroke="#4d65ff"
            fill="#4d65ff"
            fillOpacity={0.2}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          />
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
