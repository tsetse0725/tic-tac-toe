"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Player = "X" | "O";
type Stats = {
  xWins: number;
  oWins: number;
  draws: number;
  currentStreakPlayer: Player | null;
  currentStreak: number;
  bestStreak: number;
};

const DEFAULT: Stats = {
  xWins: 0,
  oWins: 0,
  draws: 0,
  currentStreakPlayer: null,
  currentStreak: 0,
  bestStreak: 0,
};

const LS_KEY = "ttt:stats:v1";

type Ctx = {
  stats: Stats;
  totals: { games: number };
  ready: boolean;
  reset: () => void;
  updateOnResult: (result: "X" | "O" | "draw") => void;
};

const StatsContext = createContext<Ctx | null>(null);

export function StatsProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<Stats>(DEFAULT);
  const [ready, setReady] = useState(false);

  // hydrate once
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setStats({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  // persist
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(stats));
    } catch {}
  }, [stats, ready]);

  function reset() {
    setStats(DEFAULT);
  }

  function updateOnResult(result: "X" | "O" | "draw") {
    setStats((prev) => {
      if (result === "draw") {
        return { ...prev, draws: prev.draws + 1, currentStreak: 0, currentStreakPlayer: null };
      }
      const same = prev.currentStreakPlayer === result;
      const nextStreak = same ? prev.currentStreak + 1 : 1;
      return {
        ...prev,
        xWins: result === "X" ? prev.xWins + 1 : prev.xWins,
        oWins: result === "O" ? prev.oWins + 1 : prev.oWins,
        currentStreakPlayer: result,
        currentStreak: nextStreak,
        bestStreak: Math.max(prev.bestStreak, nextStreak),
      };
    });
  }

  const totals = useMemo(
    () => ({ games: stats.xWins + stats.oWins + stats.draws }),
    [stats]
  );

  const value: Ctx = { stats, totals, ready, reset, updateOnResult };
  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
}

export function useStats() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error("useStats must be used inside <StatsProvider>");
  return ctx;
}
