"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getMatches } from "@/lib/api";
import type { MatchesResponse, Market } from "@/types/api";
import { fmtKickoff, fmtOdds } from "@/lib/format";
import { ProbBar } from "@/components/prob-bar";
import { MarketBadge } from "@/components/market-badge";
import { cn } from "@/lib/utils";

const MARKETS: Market[] = ["1", "X", "2", "12", "O1.5", "U3.5"];

export function AnalyzerTable() {
  const [data, setData] = useState<MatchesResponse | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => { getMatches(undefined, page).then(setData); }, [page]);

  if (!data) return <TableSkeleton />;

  const totalPages = Math.max(1, Math.ceil(data.total / data.page_size));

  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[rgb(var(--card))]">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 px-5 py-3.5">
        <div>
          <h2 className="text-sm font-semibold">Match Analyzer</h2>
          <p className="text-xs text-zinc-500">{data.total} matches today · sorted by kickoff</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-5 py-3 text-left font-medium">Kickoff</th>
              <th className="px-3 py-3 text-left font-medium">League</th>
              <th className="px-3 py-3 text-left font-medium">Match</th>
              {MARKETS.map((m) => (
                <th key={m} className="px-3 py-3 text-left font-medium">
                  <MarketBadge market={m} />
                </th>
              ))}
              <th className="px-3 py-3 text-left font-medium">Best</th>
              <th className="px-5 py-3 text-right font-medium">Conf.</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((row) => (
              <tr key={row.fixture_id}
                  className="border-b border-zinc-100 dark:border-zinc-900 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-zinc-500">
                  {fmtKickoff(row.kickoff)}
                </td>
                <td className="px-3 py-3 text-xs text-zinc-600 dark:text-zinc-400">{row.league.name}</td>
                <td className="px-3 py-3 font-medium">
                  <span>{row.home.name}</span>
                  <span className="mx-2 text-zinc-400">vs</span>
                  <span>{row.away.name}</span>
                </td>
                {MARKETS.map((m) => {
                  const cell = row.markets[m];
                  const isBest = m === row.best_market;
                  return (
                    <td key={m} className="px-3 py-3">
                      <div className="flex flex-col gap-1">
                        <ProbBar value={cell.prob} highlight={isBest} />
                        <span className="font-mono text-[11px] text-zinc-500">{fmtOdds(cell.odds)}</span>
                      </div>
                    </td>
                  );
                })}
                <td className="px-3 py-3"><MarketBadge market={row.best_market} className="border-accent/40 bg-accent/10 text-accent" /></td>
                <td className={cn("px-5 py-3 text-right font-mono tabular-nums",
                  row.confidence >= 0.75 ? "text-accent font-medium" : "text-zinc-700 dark:text-zinc-300")}>
                  {Math.round(row.confidence * 100)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800 px-5 py-3 text-xs text-zinc-500">
        <span>Page {data.page} of {totalPages}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}
                  className="rounded-md p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
                  className="rounded-md p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-40">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[rgb(var(--card))] p-5">
      <div className="space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-10 animate-pulse rounded-md bg-zinc-100 dark:bg-zinc-800/60" />
        ))}
      </div>
    </div>
  );
}
