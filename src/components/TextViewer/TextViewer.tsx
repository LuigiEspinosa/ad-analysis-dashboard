import { useRef, useEffect } from "react";
import type { Analysis } from "@/types/analysis";
import { buildSegments } from "@/utils/segments";
import { useDashboardStore } from "@/stores/dashboard.store";
import { TextSegment } from "./TextSegment";

interface Props {
  analysis: Analysis;
}

export function TextViewer({ analysis }: Props) {
  const { selectedFlagId, setSelectedFlagId } = useDashboardStore();
  const segmentRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
  const segments = buildSegments(analysis.adText, analysis.flags);

  useEffect(() => {
    if (!selectedFlagId) return;
    segmentRefs.current.get(selectedFlagId)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [selectedFlagId]);

  return (
    <div className="rounded-xl border border-(--surface-border) overflow-hidden">
      <div className="px-4 py-3 border-b border-(--surface-border) bg-(--surface-card)">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
          Ad Text
        </h3>
      </div>
      <div className="p-4 lg:p-6">
        <p className="text-sm leading-loose text-gray-800 dark:text-gray-200">
          {segments.map((seg, i) => (
            <TextSegment
              key={`${analysis.id}-seg-${i}`}
              segment={seg}
              isSelected={seg.flag?.id === selectedFlagId}
              onSelect={setSelectedFlagId}
              segmentRef={
                seg.flag
                  ? (el) => {
                      if (el && seg.flag)
                        segmentRefs.current.set(seg.flag.id, el);
                      else if (seg.flag)
                        segmentRefs.current.delete(seg.flag.id);
                    }
                  : null
              }
            />
          ))}
        </p>

        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500 border-t border-(--surface-border) pt-3">
          <span className="font-medium">Dev note:</span> Flag positions ({" "}
          <code className="font-mono">start</code> /{" "}
          <code className="font-mono">end</code> ) are provided by the dataset
          and may not align exactly with the displayed text.
          <br />
          See{" "}
          <a
            href="https://github.com/LuigiEspinosa/ad-analysis-dashboard/blob/main/README.md#notes"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            README
          </a>{" "}
          for a browser console script to double check correct offsets.
        </p>
      </div>
    </div>
  );
}
