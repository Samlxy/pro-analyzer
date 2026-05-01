import { cn } from "@/lib/utils";

type S = "pending" | "won" | "lost" | "void";

const STYLES: Record<S, string> = {
  pending: "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400",
  won:     "border-accent/30 bg-accent/10 text-accent",
  lost:    "border-red-300/40 bg-red-500/10 text-red-600 dark:text-red-400",
  void:    "border-zinc-300 dark:border-zinc-700 text-zinc-500",
};

export function StatusPill({ status }: { status: S }) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs capitalize",
      STYLES[status],
    )}>
      {status}
    </span>
  );
}
