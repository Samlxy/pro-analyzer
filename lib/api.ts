import type { HistoryResponse, MatchesResponse, SelectionsResponse } from "@/types/api";
import { mockHistory, mockMatches, mockSelections } from "./mocks";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000/api/v1";
const USE_MOCKS = (process.env.NEXT_PUBLIC_USE_MOCKS || "true") === "true";

async function get<T>(path: string): Promise<T> {
  const r = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

export async function getMatches(date?: string, page = 1): Promise<MatchesResponse> {
  if (USE_MOCKS) return mockMatches;
  const q = new URLSearchParams({ page: String(page), page_size: "20" });
  if (date) q.set("date", date);
  return get<MatchesResponse>(`/matches?${q.toString()}`);
}

export async function getSelections(date?: string): Promise<SelectionsResponse> {
  if (USE_MOCKS) return mockSelections;
  const q = new URLSearchParams();
  if (date) q.set("date", date);
  return get<SelectionsResponse>(`/selections?${q.toString()}`);
}

export async function getHistory(from?: string, to?: string): Promise<HistoryResponse> {
  if (USE_MOCKS) return mockHistory;
  const q = new URLSearchParams();
  if (from) q.set("from", from);
  if (to) q.set("to", to);
  return get<HistoryResponse>(`/history?${q.toString()}`);
}
