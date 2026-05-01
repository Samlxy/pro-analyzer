export const fmtOdds = (n: number) => (n ? n.toFixed(2) : "—");
export const fmtPct = (n: number) => `${Math.round(n * 100)}%`;

export const fmtKickoff = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString([], { month: "short", day: "2-digit" });
