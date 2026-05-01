"use client";

import { useEffect, useState } from "react";
import { History } from "lucide-react";
import { getHistory } from "@/lib/api";
import type { HistoryResponse } from "@/types/api";
import { fmtDate, fmtOdds } from "@/lib/format";
import { MarketBadge } from "@/components/market-badge";
import { StatusPill } from "@/components/status-pill";

export function HistoryTable() {
  const [data, setData] = useState<HistoryResponse | null>(null);
  useEffect(() => { getHistory().then(setData); }, []);
  if (!data) return null;

  const stats = [
    { label: "Total",    value: data.summary.total },
    { label: "Won",      value: data.summary.won, accent: true },
    { label: "Lost",     value: data.summary.lost },
    { label: "Hit-rate", value: `${Math.round(data.summary.hit_rate * 100)}%` },
    { label: "ROI",      value: `${data.summary.roi_pct.toFixed(1)}%`, accent: data.summary.roi_pct > 0 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[rgb(var(--card))] px-4 py-3">
            <div className="text-xs text-zinc-500">{s.label}</div>
            <div className={"mt-1 font-mono text-lg tabular-nums " + (s.accent ? "text-accent" : "")}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-[rgb(var(--card))]">
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 px-5 py-3.5">
          <History className="h-4 w-4 text-zinc-500" />
          <h2 className="text-sm font-semibold">History</h2>
          <span className="text-xs text-zinc-500">· {data.summary.from} → {data.summary.to}</span>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-5 py-3 text-left font-medium">Date</th>
              <th className="px-3 py-3 text-left font-medium">Match</th>
              <th className="px-3 py-3 text-left font-medium">Market</th>
              <th className="px-3 py-3 text-right font-medium">Odds</th>
              <th className="px-3 py-3 text-left font-medium">Predicted</th>
              <th className="px-3 py-3 text-left font-medium">Actual</th>
              <th className="px-5 py-3 text-right font-medium">Result</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((h) => (
              <tr key={h.fixture_id} className="border-b border-zinc-100 dark:border-zinc-900 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900/50">
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-zinc-500">{fmtDate(h.date)}</td>
                <td className="px-3 py-3 font-medium">{h.match}</td>
                <td className="px-3 py-3"><MarketBadge market={h.market} /></td>
                <td className="px-3 py-3 text-right font-mono tabular-nums">{fmtOdds(h.odds)}</td>
                <td className="px-3 py-3"><MarketBadge market={h.predicted} /></td>
                <td className="px-3 py-3 font-mono text-xs">{h.actual_score}</td>
                <td className="px-5 py-3 text-right"><StatusPill status={h.result} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
