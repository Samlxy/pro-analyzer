"use client";

import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { getSelections } from "@/lib/api";
import type { SelectionsResponse } from "@/types/api";
import { fmtKickoff, fmtOdds } from "@/lib/format";
import { MarketBadge } from "@/components/market-badge";
import { StatusPill } from "@/components/status-pill";

export function SelectionsTable() {
  const [data, setData] = useState<SelectionsResponse | null>(null);
  useEffect(() => { getSelections().then(setData); }, []);
  if (!data) return null;

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[rgb(var(--card))]">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-accent" />
          <h2 className="text-sm font-semibold">Daily Selections</h2>
          <span className="text-xs text-zinc-500">· top {data.items.length} picks</span>
        </div>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-mono tabular-nums text-accent">
          Combined: {fmtOdds(data.combined_odds)}
        </span>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wide text-zinc-500">
            <th className="w-10 px-5 py-3 text-left font-medium">#</th>
            <th className="px-3 py-3 text-left font-medium">Match</th>
            <th className="px-3 py-3 text-left font-medium">League</th>
            <th className="px-3 py-3 text-left font-medium">Kickoff</th>
            <th className="px-3 py-3 text-left font-medium">Market</th>
            <th className="px-3 py-3 text-right font-medium">Odds</th>
            <th className="px-3 py-3 text-right font-medium">Confidence</th>
            <th className="px-5 py-3 text-right font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((s) => (
            <tr key={s.fixture_id} className="border-b border-zinc-100 dark:border-zinc-900 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
              <td className="px-5 py-3 font-mono text-xs text-zinc-500">{s.rank}</td>
              <td className="px-3 py-3 font-medium">{s.match}</td>
              <td className="px-3 py-3 text-xs text-zinc-600 dark:text-zinc-400">{s.league}</td>
              <td className="px-3 py-3 font-mono text-xs text-zinc-500">{fmtKickoff(s.kickoff)}</td>
              <td className="px-3 py-3"><MarketBadge market={s.market} className="border-accent/40 bg-accent/10 text-accent" /></td>
              <td className="px-3 py-3 text-right font-mono tabular-nums">{fmtOdds(s.odds)}</td>
              <td className="px-3 py-3 text-right font-mono tabular-nums text-accent font-medium">
                {Math.round(s.confidence * 100)}%
              </td>
              <td className="px-5 py-3 text-right"><StatusPill status={s.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
