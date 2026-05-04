"use client";

import { Moon, Sun, Activity } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [today, setToday] = useState("");
  useEffect(() => {
    setMounted(true);
    setToday(new Date().toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" }));
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 dark:border-zinc-800 bg-[rgb(var(--bg))]/80 backdrop-blur">
      <div className="mx-auto max-w-7xl flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-accent/10 text-accent">
            <Activity className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-tight">pro-analyzer</span>
          <span className="ml-3 hidden rounded-full border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 text-xs text-zinc-500 sm:inline">
            {today}
          </span>
        </div>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-md p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          aria-label="Toggle theme"
        >
          {mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
      </div>
    </header>
  );
}
