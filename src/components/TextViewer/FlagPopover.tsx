import type { ReactNode } from "react";
import * as Popover from "@radix-ui/react-popover";
import type { Flag } from "@/types/analysis";
import { SeverityBadge } from "../ui/SeverityBadge";

const DIMENSION_LABELS: Record<string, string> = {
  hook: "Hook",
  credibility: "Credibility",
  emotionalAppeal: "Emotional Appeal",
  memorability: "Memorable",
  shareability: "Shareable",
};

interface Props {
  flag: Flag;
  children: ReactNode;
}

export function FlagPopover({ flag, children }: Props) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="top"
          align="start"
          sideOffset={6}
          className="z-50 w-72 rounded-xl border border-(--surface-border) bg-white dark:bg-gray-900 shadow-popover p-4 focus:outline-none"
        >
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {DIMENSION_LABELS[flag.dimension] ?? flag.dimension}
            </span>
            <SeverityBadge severity={flag.severity} />
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {flag.suggestion}
          </p>
          <Popover.Arrow className="fill-white dark:fill-gray-900" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
