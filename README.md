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
