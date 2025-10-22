"use client";
import type { GameMode } from "./useStats";
import { useStats } from "./useStats";

export default function ScoreCard({ mode }: { mode: GameMode }) {
  const { stats, totals, reset, ready } = useStats();
  if (!ready) return null; 

  const labelX = mode === "vsBot" ? "Human (X)" : "X";
  const labelO = mode === "vsBot" ? "Bot (O)"   : "O";

  return (
    <div className="mt-4 rounded-2xl border border-foreground/10 bg-background/60 p-3 text-foreground text-xs shadow-sm backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="font-medium">Scoreboard</span>
        <span className="opacity-70">Games: {totals.games}</span>
      </div>

      <div className="mt-2 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg bg-foreground/5 p-2">
          <div className="text-[11px] opacity-70">{labelX}</div>
          <div className="text-base font-semibold">{stats.xWins}</div>
        </div>
        <div className="rounded-lg bg-foreground/5 p-2">
          <div className="text-[11px] opacity-70">Draws</div>
          <div className="text-base font-semibold">{stats.draws}</div>
        </div>
        <div className="rounded-lg bg-foreground/5 p-2">
          <div className="text-[11px] opacity-70">{labelO}</div>
          <div className="text-base font-semibold">{stats.oWins}</div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-foreground/10 p-2">
          <div className="text-[11px] opacity-70">Streak</div>
          <div className="text-base font-semibold">
            {stats.currentStreak > 0 ? `${stats.currentStreakPlayer} × ${stats.currentStreak}` : "—"}
          </div>
        </div>
        <div className="col-span-2 rounded-lg border border-foreground/10 p-2">
          <div className="text-[11px] opacity-70">Best streak</div>
          <div className="text-base font-semibold">{stats.bestStreak}</div>
        </div>
      </div>

      <div className="mt-3 flex justify-end">
        <button
          onClick={reset}
          className="rounded-md border border-foreground/15 bg-foreground/10 px-3 py-1 text-[11px] hover:bg-foreground/15"
        >
          Reset stats
        </button>
      </div>
    </div>
  );
}
