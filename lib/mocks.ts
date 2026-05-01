import type { HistoryResponse, MatchesResponse, SelectionsResponse } from "@/types/api";

const today = new Date();
const iso = (h: number, m = 0) => {
  const d = new Date(today);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

export const mockMatches: MatchesResponse = {
  date: today.toISOString().slice(0, 10),
  page: 1,
  page_size: 20,
  total: 42,
  items: [
    {
      fixture_id: 1,
      league: { id: 39, name: "Premier League", country: "England" },
      kickoff: iso(15, 0),
      home: { name: "Arsenal" },
      away: { name: "Chelsea" },
      markets: {
        "1":    { prob: 0.58, odds: 1.85, pick: true },
        "X":    { prob: 0.23, odds: 3.60, pick: false },
        "2":    { prob: 0.19, odds: 4.20, pick: false },
        "12":   { prob: 0.77, odds: 1.28, pick: false },
        "O1.5": { prob: 0.84, odds: 1.22, pick: false },
        "U3.5": { prob: 0.71, odds: 1.45, pick: false },
      },
      best_market: "O1.5",
      confidence: 0.84,
    },
    {
      fixture_id: 2,
      league: { id: 140, name: "La Liga", country: "Spain" },
      kickoff: iso(17, 30),
      home: { name: "Real Madrid" },
      away: { name: "Sevilla" },
      markets: {
        "1":    { prob: 0.71, odds: 1.40, pick: true },
        "X":    { prob: 0.18, odds: 4.80, pick: false },
        "2":    { prob: 0.11, odds: 8.00, pick: false },
        "12":   { prob: 0.82, odds: 1.18, pick: false },
        "O1.5": { prob: 0.88, odds: 1.15, pick: false },
        "U3.5": { prob: 0.62, odds: 1.65, pick: false },
      },
      best_market: "O1.5",
      confidence: 0.88,
    },
    {
      fixture_id: 3,
      league: { id: 135, name: "Serie A", country: "Italy" },
      kickoff: iso(19, 45),
      home: { name: "Juventus" },
      away: { name: "Lazio" },
      markets: {
        "1":    { prob: 0.49, odds: 2.10, pick: false },
        "X":    { prob: 0.28, odds: 3.20, pick: false },
        "2":    { prob: 0.23, odds: 3.90, pick: false },
        "12":   { prob: 0.72, odds: 1.34, pick: true },
        "O1.5": { prob: 0.79, odds: 1.30, pick: false },
        "U3.5": { prob: 0.74, odds: 1.42, pick: false },
      },
      best_market: "O1.5",
      confidence: 0.79,
    },
    {
      fixture_id: 4,
      league: { id: 78, name: "Bundesliga", country: "Germany" },
      kickoff: iso(20, 30),
      home: { name: "Bayern" },
      away: { name: "Stuttgart" },
      markets: {
        "1":    { prob: 0.74, odds: 1.32, pick: true },
        "X":    { prob: 0.16, odds: 5.40, pick: false },
        "2":    { prob: 0.10, odds: 9.00, pick: false },
        "12":   { prob: 0.84, odds: 1.16, pick: false },
        "O1.5": { prob: 0.91, odds: 1.10, pick: false },
        "U3.5": { prob: 0.55, odds: 1.85, pick: false },
      },
      best_market: "O1.5",
      confidence: 0.91,
    },
    {
      fixture_id: 5,
      league: { id: 61, name: "Ligue 1", country: "France" },
      kickoff: iso(21, 0),
      home: { name: "PSG" },
      away: { name: "Lyon" },
      markets: {
        "1":    { prob: 0.66, odds: 1.55, pick: true },
        "X":    { prob: 0.20, odds: 4.10, pick: false },
        "2":    { prob: 0.14, odds: 6.20, pick: false },
        "12":   { prob: 0.80, odds: 1.22, pick: false },
        "O1.5": { prob: 0.86, odds: 1.18, pick: false },
        "U3.5": { prob: 0.64, odds: 1.60, pick: false },
      },
      best_market: "O1.5",
      confidence: 0.86,
    },
  ],
};

export const mockSelections: SelectionsResponse = {
  date: today.toISOString().slice(0, 10),
  combined_odds: 4.62,
  stake_suggestion_pct: 100,
  items: [
    { rank: 1, fixture_id: 4, match: "Bayern vs Stuttgart", league: "Bundesliga", kickoff: iso(20, 30), market: "O1.5", odds: 1.10, confidence: 0.91, status: "pending" },
    { rank: 2, fixture_id: 2, match: "Real Madrid vs Sevilla", league: "La Liga",   kickoff: iso(17, 30), market: "O1.5", odds: 1.15, confidence: 0.88, status: "pending" },
    { rank: 3, fixture_id: 5, match: "PSG vs Lyon",            league: "Ligue 1",   kickoff: iso(21, 0),  market: "12",   odds: 1.22, confidence: 0.80, status: "pending" },
    { rank: 4, fixture_id: 1, match: "Arsenal vs Chelsea",     league: "Premier League", kickoff: iso(15, 0), market: "O1.5", odds: 1.22, confidence: 0.84, status: "pending" },
    { rank: 5, fixture_id: 3, match: "Juventus vs Lazio",      league: "Serie A",   kickoff: iso(19, 45), market: "U3.5", odds: 1.42, confidence: 0.74, status: "pending" },
  ],
};

const day = (offset: number) => {
  const d = new Date(today); d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
};

export const mockHistory: HistoryResponse = {
  page: 1,
  page_size: 20,
  total: 8,
  items: [
    { date: day(-1), fixture_id: 90, match: "Man City vs Brighton", market: "O1.5", odds: 1.18, confidence: 0.90, predicted: "O1.5", actual_score: "3-1", result: "won" },
    { date: day(-1), fixture_id: 91, match: "Atletico vs Getafe",   market: "U3.5", odds: 1.40, confidence: 0.78, predicted: "U3.5", actual_score: "1-0", result: "won" },
    { date: day(-1), fixture_id: 92, match: "Inter vs Roma",        market: "12",   odds: 1.30, confidence: 0.81, predicted: "12",   actual_score: "0-0", result: "lost" },
    { date: day(-1), fixture_id: 93, match: "Dortmund vs Leipzig",  market: "O1.5", odds: 1.20, confidence: 0.88, predicted: "O1.5", actual_score: "2-2", result: "won" },
    { date: day(-1), fixture_id: 94, match: "Marseille vs Nice",    market: "1",    odds: 1.85, confidence: 0.66, predicted: "1",    actual_score: "2-1", result: "won" },
    { date: day(-2), fixture_id: 80, match: "Liverpool vs Spurs",   market: "O1.5", odds: 1.15, confidence: 0.92, predicted: "O1.5", actual_score: "4-2", result: "won" },
    { date: day(-2), fixture_id: 81, match: "Barcelona vs Betis",   market: "1",    odds: 1.45, confidence: 0.74, predicted: "1",    actual_score: "1-2", result: "lost" },
    { date: day(-2), fixture_id: 82, match: "Napoli vs Milan",      market: "U3.5", odds: 1.55, confidence: 0.69, predicted: "U3.5", actual_score: "1-1", result: "won" },
  ],
  summary: { total: 8, won: 6, lost: 2, void: 0, hit_rate: 0.75, roi_pct: 22.4, from: day(-2), to: day(-1) },
};
