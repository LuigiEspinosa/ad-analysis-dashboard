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

### Decision Log

| Decision                                 | Chosen Over    | Rationale                                                                                                                                  |
| ---------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| TanStack Query over useEffect + useState | useEffect, SWR | TanStack Query gives loading/error/stale states, caching, and background refetch semantics with a custom fetcher that wraps the local JSON |
