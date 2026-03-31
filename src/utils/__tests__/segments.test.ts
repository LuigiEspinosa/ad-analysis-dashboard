import { describe, it, expect } from "vitest";
import { buildSegments } from "../segments";
import type { Flag } from "@/types/analysis";

const stub = (
  overrides: Pick<Flag, "id" | "start" | "end"> & Partial<Flag>,
): Flag => ({
  text: "",
  severity: "medium",
  dimension: "credibility",
  suggestion: "",
  ...overrides,
});

describe("buildSegments", () => {
  it("returns single unflagged segment when no flags", () => {
    const result = buildSegments("Hello world", []);
    expect(result).toHaveLength(1);
    expect(result[0].flag).toBeNull();
    expect(result[0].text).toBe("Hello world");
  });

  it("splits text correctly around a single flag", () => {
    const flag = stub({ id: "f1", start: 6, end: 11 });
    const result = buildSegments("Hello world!", [flag]);
    expect(result).toHaveLength(3);
    expect(result[0]).toMatchObject({ text: "Hello ", flag: null });
    expect(result[1]).toMatchObject({ text: "world", flag });
    expect(result[2]).toMatchObject({ text: "!", flag: null });
  });

  it("assigns highest severity when flags overlap", () => {
    const low = stub({
      id: "fA",
      start: 1,
      end: 5,
      severity: "low",
      dimension: "hook",
    });
    const high = stub({
      id: "fB",
      start: 1,
      end: 9,
      severity: "high",
      dimension: "credibility",
    });
    const result = buildSegments("Hello world", [low, high]);
    const overlapping = result.find((s) => s.text === "ello");
    expect(overlapping?.flag?.id).toBe("fB");
  });

  it("handles flag at start of text", () => {
    const flag = stub({ id: "f1", start: 0, end: 5 });
    const result = buildSegments("Hello world", [flag]);
    expect(result[0]).toMatchObject({ text: "Hello", flag });
  });

  it("handles flag at end of text", () => {
    const flag = stub({ id: "f1", start: 6, end: 11 });
    const result = buildSegments("Hello world", [flag]);
    expect(result[result.length - 1]).toMatchObject({ text: "world", flag });
  });

  it("produces no zero-with segments", () => {
    const flag = stub({ id: "f1", start: 0, end: 5 });
    const result = buildSegments("Hello world", [flag]);
    expect(result.every((s) => s.text.length > 0)).toBe(true);
  });
});
