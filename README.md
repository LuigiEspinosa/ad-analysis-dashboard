# Ad Analysis Dashboard

A single-page political ad analysis dashboard built for the PharosGraph frontend challenge.

## Setup

```shell
npm install && npm run dev
```

## Stack

- React 19
- TypeScript (strict)
- Vite
- Tailwind CSS v4
- TanStack Query
- Zustand
- Recharts
- GSAP
- Radix UI
- Vitest + RTL

## Key Decisions

### TanStack Query over useEffect + useState

TanStack Query gives loading/error/stale states, caching, and background refetch semantics with a custom fetcher that wraps the local JSON. The loading skeleton renders for 800ms.

### Segment-based text rendering

Character-position highlights are built by treating every flag boundary as a split point and reducing to a flat segment array. For overlapping flags (not present in this dataset bu handled), the highest-severity flag wins.

This is type-safe. React-rendered, and testable over innearHTML approaches because that would require sanitization, cannot attach typed React handlers, and is harder to test.

### Bidrectional flag sync via Zustand

`selectedFlagId` lives in a Zustand store. `FlagTable` writes it on row click. `TextViewer` reads it to apply highlight ring and scroll. `FlagTable` reads it to scroll its own row. No prop drilling through 4+ levels of component tree.

Context would work but Zustand is cleaner, more performant (no re-renders from context updates), and the store is trivially testeable in isolation.

### Custom SVG Gauge over a library

A 270deg arc gauge animated with GSAP is more visually disntictive than any off-the-shelf component. The score counts up as the arc fills.

### Radix UI Popover custom tooltip

Popover position is genuinely hard near viewport edges. Radix handles collision detection, focus management, and keyboard dismiss.

## Notes

### Flag position debugging

The character positions (`start`/`end`) in `src/data/analyses.json` were provided and may not align exactly with the `adText` string. If highlights appear offset, run this in the browser console to check the positions.

```js
const analyses = await fetch('/src/data/analyses.json').then(r => r.json());
const a = analyses.analyses[0];

a.flags.forEach(f => {
  const start = a.adText.indexOf(f.text);
  const end = start + f.text.length;
  console.log(`${f.id}: start=${start}, end=${end} (JSON has ${f.start}/${f.end})`);
})
```
