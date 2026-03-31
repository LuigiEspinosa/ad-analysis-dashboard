import { describe, it, expect } from "vitest";
import { sortFlagsBySeverity, severityToColor } from "../severity";
import type { Flag } from "@/types/analysis";

const stub = (severity: Flag["severity"]): Flag => ({
  id: severity,
  text: "",
  start: 0,
  end: 0,
  severity,
  dimension: "credibility",
  suggestion: "",
});

describe("sortFlagsBySeverity", () => {
  it("sorts high > medium > low descending", () => {
    const flags = [stub("low"), stub("high"), stub("medium")];
    expect(sortFlagsBySeverity(flags, "desc").map((f) => f.severity)).toEqual([
      "high",
      "medium",
      "low",
    ]);
  });

  it("sorts low > medium > high ascending", () => {
    const flags = [stub("high"), stub("low"), stub("medium")];
    expect(sortFlagsBySeverity(flags, "asc").map((f) => f.severity)).toEqual([
      "low",
      "medium",
      "high",
    ]);
  });

  it("does not mutate the original array", () => {
    const flags = [stub("high"), stub("low")];
    sortFlagsBySeverity(flags, "asc");
    expect(flags[0].severity).toBe("high");
  });
});

describe("severityToColor", () => {
  it("includes severity-high token for high", () => {
    expect(severityToColor("high")).toContain("severity-high");
  });
  it("includes severity-medium token for medium", () => {
    expect(severityToColor("medium")).toContain("severity-medium");
  });
  it("includes severity-low token for low", () => {
    expect(severityToColor("low")).toContain("severity-low");
  });
});
