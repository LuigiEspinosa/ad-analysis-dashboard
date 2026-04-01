import type { TextSegment as TextSegmentType } from "@/types/analysis";
import { severityToHighlightColor } from "@/utils/severity";
import { FlagPopover } from "./FlagPopover";

interface Props {
  segment: TextSegmentType;
  isSelected: boolean;
  onSelect: (flagId: string) => void;
  segmentRef: ((el: HTMLSpanElement | null) => void) | null;
}

export function TextSegment({
  segment,
  isSelected,
  onSelect,
  segmentRef,
}: Props) {
  if (!segment.flag) {
    return <span>{segment.text}</span>;
  }

  const { flag } = segment;

  return (
    <FlagPopover flag={flag}>
      <span
        ref={segmentRef}
        role="mark"
        aria-label={`${flag.severity} severity flag: ${flag.dimension}`}
        onClick={() => onSelect(flag.id)}
        className={[
          "cursor-pointer rounded-sm px-0.5 transition-all duration-150",
          severityToHighlightColor(flag.severity),
          isSelected ? "ring-2 ring-offset-1 ring-brand-500" : "",
        ].join(" ")}
      >
        {segment.text}
      </span>
    </FlagPopover>
  );
}
