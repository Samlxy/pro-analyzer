# pro-analyzer — Implementation TODO

## Phase 0 — Scaffold
- [x] README, TODO, design notes
- [ ] Next.js 14 (App Router, TS), Tailwind, shadcn/ui primitives
- [ ] `lib/utils.ts` (cn), `lib/format.ts`, `types/api.ts`
- [ ] Dark mode via `next-themes`
- [ ] Mock data under `lib/mocks/` and `NEXT_PUBLIC_USE_MOCKS` switch
- [ ] App shell: header (logo, date pill, theme toggle), tab bar (Analyzer / Selections / History)

## Phase 1 — Tables (mocked)
- [ ] **Match Analyzer table**
  - [ ] Columns: Kickoff · League · Match · 1 · X · 2 · 12 · O1.5 · U3.5 · Best · Confidence
  - [ ] Probability micro-bars in each market cell
  - [ ] Pagination 20/page (shadcn pagination)
  - [ ] Filter by league (multiselect) + search by team
- [ ] **Daily Selections table**
  - [ ] Columns: # · Match · League · Kickoff · Market · Odds · Confidence · Status
  - [ ] Combined odds chip in header (e.g. `Combined: 4.62`)
  - [ ] Empty state for "no slate yet — first build runs at 00:00"
- [ ] **History table**
  - [ ] Columns: Date · Match · Market · Odds · Predicted · Actual · Result
  - [ ] Summary card row: Total / Won / Lost / Hit-rate / ROI%
  - [ ] Date range picker (last 7 / 14 / 30 days)

## Phase 2 — Real API
- [ ] `lib/api.ts` typed fetchers using `fetch` + zod parsing
- [ ] SWR hooks: `useMatches`, `useSelections`, `useHistory`
- [ ] Error boundary + retry button
- [ ] Switchover when `NEXT_PUBLIC_USE_MOCKS !== "true"`

## Phase 3 — Polish
- [ ] Skeleton rows for each table (no spinners)
- [ ] Sticky table headers, horizontal scroll on mobile
- [ ] Confidence color scale: ≥0.75 emerald, ≥0.6 zinc, <0.6 muted (no red until graded)
- [ ] Status pills: pending (zinc) · won (emerald) · lost (red) · void (zinc outline)
- [ ] Subtle row enter fade (framer-motion `opacity-0 → 1`, 120 ms)
- [ ] Keyboard nav for pagination (←/→)

## Phase 4 — Access control
- [ ] Simple PIN gate stored in HTTP-only cookie (or NextAuth credentials)
- [ ] `/login` page, `middleware.ts` protects `/`

## Phase 5 — Deploy
- [ ] Vercel project
- [ ] `NEXT_PUBLIC_API_BASE` pointing at deployed phy-analyzer
- [ ] Disable analytics, set `noindex` meta
