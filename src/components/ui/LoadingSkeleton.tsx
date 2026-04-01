function Bone({ className }: { className: string }) {
  return (
    <div
      className={`rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
    />
  );
}

export function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-(--surface-border) space-y-3">
        <div className="flex items-start justify-between gap-4">
          <Bone className="h-6 w-2/3" />
          <Bone className="h-8 w-12 shrink-0" />
        </div>
        <Bone className="h-4 w-1/3" />
      </div>

      {/* Score section */}
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <Bone className="h-50 w-50 rounded-full shrink-0" />
        <Bone className="h-65 flex-1 w-full" />
      </div>

      {/* Flag table */}
      <div className="rounded-xl border border-(--surface-border) overflow-hidden">
        <Bone className="h-12 w-full rounded-non" />
        <div className="h-12 w-full rounded-none" />
        <div className="divide-y divide-(--surface-border)">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-3">
              <Bone className="h-4 flex-1" />
              <Bone className="h-6 w-16 shrink-0" />
              <Bone className="h-4 w-24 shrink-0" />
              <Bone className="h-4 w-32 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Text viewer */}
      <div className="rounded-xl border border-(--surface-border) overflow-hidden">
        <Bone className="h-12 w-full rounded-none" />
        <div className="p-4 lg:p-6 space-y-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Bone key={i} className={`h-4 ${i === 6 ? "w-2/3" : "w-full"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
