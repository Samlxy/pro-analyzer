import { cn } from "@/lib/utils";

export function ProbBar({ value, highlight = false }: { value: number; highlight?: boolean }) {
  const pct = Math.round(value * 100);
  return (
    <div className="flex items-center gap-2">
      <span className={cn("font-mono text-xs tabular-nums w-9 text-right",
        highlight ? "text-accent font-medium" : "text-zinc-700 dark:text-zinc-300")}>
        {pct}%
      </span>
      <div className="h-1 w-14 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
        <div
          className={cn("h-full rounded-full",
            highlight ? "bg-accent" : "bg-zinc-400 dark:bg-zinc-600")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
