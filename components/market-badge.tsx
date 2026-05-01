import { cn } from "@/lib/utils";
import type { Market } from "@/types/api";

const LABELS: Record<Market, string> = {
  "1": "1",
  "X": "X",
  "2": "2",
  "12": "12",
  "O1.5": "Over 1.5",
  "U3.5": "Under 3.5",
};

export function MarketBadge({ market, className }: { market: Market; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-md border border-zinc-200 dark:border-zinc-800",
      "bg-zinc-50 dark:bg-zinc-900 px-2 py-0.5 text-xs font-mono tabular-nums",
      className,
    )}>
      {LABELS[market]}
    </span>
  );
}
