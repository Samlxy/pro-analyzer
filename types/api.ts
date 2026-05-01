export type Market = "1" | "X" | "2" | "12" | "O1.5" | "U3.5";

export interface MarketCell {
  prob: number;
  odds: number;
  pick: boolean;
}

export interface MatchRow {
  fixture_id: number;
  league: { id: number; name: string; country: string; logo?: string };
  kickoff: string;
  home: { name: string; logo?: string };
  away: { name: string; logo?: string };
  markets: Record<Market, MarketCell>;
  best_market: Market;
  confidence: number;
}

export interface MatchesResponse {
  date: string;
  page: number;
  page_size: number;
  total: number;
  items: MatchRow[];
}

export interface SelectionRow {
  rank: number;
  fixture_id: number;
  match: string;
  league: string;
  kickoff: string;
  market: Market;
  odds: number;
  confidence: number;
  status: "pending" | "won" | "lost" | "void";
}

export interface SelectionsResponse {
  date: string;
  combined_odds: number;
  stake_suggestion_pct: number;
  items: SelectionRow[];
}

export interface HistoryRow {
  date: string;
  fixture_id: number;
  match: string;
  market: Market;
  odds: number;
  confidence: number;
  predicted: Market;
  actual_score: string;
  result: "won" | "lost" | "void";
}

export interface HistoryResponse {
  items: HistoryRow[];
  page: number;
  page_size: number;
  total: number;
  summary: {
    total: number; won: number; lost: number; void: number;
    hit_rate: number; roi_pct: number;
    from: string; to: string;
  };
}
