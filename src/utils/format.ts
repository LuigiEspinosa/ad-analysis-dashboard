export function formatDate(isoString: string): string {
  return new Intl.DateTimeFormat("en-Us", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoString));
}
