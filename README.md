# pro-analyzer — Frontend

Next.js (App Router) + TypeScript + Tailwind dashboard for the **phy-analyzer** betting prediction service.

> Sister repo: [`phy-analyzer`](../phy-analyzer) (Flask/Python backend).

---

## 1. What this UI shows

A single-page dashboard with **three tables**, switchable via tabs (or stacked on desktop), all powered by the backend at `NEXT_PUBLIC_API_BASE`:

1. **Match Analyzer** — every match for the day, paginated 20 per page, with probabilities for each supported market.
2. **Daily Selections** — the ≤ 5 picks chosen by the selector, sorted by confidence, combined odds ≤ 5.0.
3. **History / Outcome** — yesterday-and-back results: predicted vs actual, win/loss, hit-rate and ROI summary.

Markets shown: `1`, `X`, `2`, `12`, `Over 1.5`, `Under 3.5`.

---

## 2. Design language

> "Looks like a Figma design, not a 90s sportsbook."

- **Palette** — neutral foundation (zinc/slate), one **single accent** (emerald 600) for positive signals (high confidence, won). Red 600 only for losses. No gradients, no glow.
- **Typography** — Inter (sans) for UI, JetBrains Mono for odds/numbers. Tabular figures everywhere numeric.
- **Density** — comfortable rows (h=56px), subtle 1px dividers, no zebra striping. Hover row tint at `bg-zinc-50`.
- **Components** — built on shadcn/ui primitives: `Table`, `Tabs`, `Badge`, `Card`, `Button`, `Pagination`, `Skeleton`.
- **Iconography** — Lucide, line-only, 16px in tables / 20px in headers.
- **Probability bars** — micro inline bar (4px tall) instead of just a number, so eyes scan fastest pick at a glance.
- **Empty / loading** — skeletons, never spinners. One illustration only on the empty history state.
- **Dark mode** — first-class, toggled in the header. Both modes are flat and high-contrast.

---

## 3. Folder layout (target)

```
pro-analyzer/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                # dashboard shell (tabs)
│   ├── globals.css
│   └── api/                    # (only if we proxy)
├── components/
│   ├── header.tsx
│   ├── theme-toggle.tsx
│   ├── tabs/
│   │   ├── analyzer-tab.tsx
│   │   ├── selections-tab.tsx
│   │   └── history-tab.tsx
│   ├── tables/
│   │   ├── analyzer-table.tsx
│   │   ├── selections-table.tsx
│   │   └── history-table.tsx
│   ├── ui/                     # shadcn primitives
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── button.tsx
│   │   ├── pagination.tsx
│   │   └── skeleton.tsx
│   ├── prob-bar.tsx
│   ├── market-badge.tsx
│   └── status-pill.tsx
├── lib/
│   ├── api.ts                  # fetchers, typed
│   ├── format.ts               # odds, dates, percentages
│   └── utils.ts                # cn(), etc.
├── types/
│   └── api.ts                  # mirrors phy-analyzer contract
├── public/
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── tsconfig.json
├── package.json
├── README.md
└── TODO.md
```

---

## 4. API contract consumed (mirror of backend)

| Backend endpoint | UI table | Refresh |
|---|---|---|
| `GET /api/v1/matches?date&page&page_size` | Match Analyzer | hourly + on tab focus |
| `GET /api/v1/selections?date` | Daily Selections | every 30 min |
| `GET /api/v1/history?from&to&page&page_size` | History / Outcome | once on mount |

All fetchers live in `lib/api.ts`; types in `types/api.ts` mirror the backend response shapes documented in `phy-analyzer/README.md` § 4.

---

## 5. Setup

```bash
pnpm install        # or npm / yarn
cp .env.local.example .env.local
pnpm dev            # http://localhost:3000
```

Env:

| Name | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE` | `http://localhost:5000/api/v1` | phy-analyzer base URL |
| `NEXT_PUBLIC_USE_MOCKS` | `true` | when `true`, UI uses local fixtures (works without backend) |

---

## 6. Implementation phases

See [`TODO.md`](./TODO.md). Summary:

1. **Phase 0** — Next 14, Tailwind, shadcn, lint, dark mode, mock data.
2. **Phase 1** — Three tables wired against mocks, paginated, responsive.
3. **Phase 2** — Real API wiring via `NEXT_PUBLIC_API_BASE`, SWR for caching.
4. **Phase 3** — Polish: skeletons, error states, empty states, animation (framer-motion fades only).
5. **Phase 4** — Auth gate (single-user pin/JWT) before launch — selections shouldn't be public.
6. **Phase 5** — Deploy (Vercel) + analytics off (privacy).
