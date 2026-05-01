"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { AnalyzerTable } from "@/components/tables/analyzer-table";
import { SelectionsTable } from "@/components/tables/selections-table";
import { HistoryTable } from "@/components/tables/history-table";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "analyzer",   label: "Analyzer" },
  { id: "selections", label: "Selections" },
  { id: "history",    label: "History" },
] as const;
type TabId = typeof TABS[number]["id"];

export default function Page() {
  const [tab, setTab] = useState<TabId>("analyzer");

  return (
    <div className="min-h-screen">
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-tight">Daily Match Intelligence</h1>
          <p className="mt-1 text-sm text-zinc-500">
            Statistical analysis across every match today, with the day&apos;s top high-confidence picks.
          </p>
        </div>

        <div className="mb-6 inline-flex rounded-lg border border-zinc-200 dark:border-zinc-800 bg-[rgb(var(--card))] p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "rounded-md px-3.5 py-1.5 text-sm transition-colors",
                tab === t.id
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "analyzer"   && <AnalyzerTable />}
        {tab === "selections" && <SelectionsTable />}
        {tab === "history"    && <HistoryTable />}
      </main>
    </div>
  );
}
