"use client";
import { useMemo, useState, useEffect, useCallback } from "react";
import type { BoardType, Player } from "./types";
import { calculateWinner, isBoardFull, nextPlayer } from "./types";
import { clickTone, winJingle, drawTone, setVolume } from "./sfx";
import { getBestMoveMinimax, getBestMoveNormal } from "./ai"; // 👈 normal импорт
import { Haptics } from "./haptics";
import { useStats } from "./useStats";
import type { Settings } from "./SettingsPanel";

type GameMode = "pvp" | "vsBot";
type Difficulty = "easy" | "normal" | "hard"; // 👈 normal нэмэв

export function useGameLogic() {
  const [settings, setSettings] = useState<Settings>({
    soundOn: true,
    volume: 0.25,
    botDelayMs: 450,
    haptics: "gentle",
  });

  useEffect(() => {
    const raw = localStorage.getItem("ttt_settings");
    if (raw) setSettings(JSON.parse(raw));
  }, []);

  useEffect(() => setVolume(settings.volume), [settings.volume]);

  const playClick = useCallback(() => {
    if (settings.soundOn) clickTone(settings.volume);
    Haptics.click(settings.haptics);
  }, [settings]);

  const playWin = useCallback(() => {
    if (settings.soundOn) winJingle(settings.volume);
    Haptics.win(settings.haptics);
  }, [settings]);

  const playDraw = useCallback(() => {
    if (settings.soundOn) drawTone(settings.volume);
    Haptics.draw(settings.haptics);
  }, [settings]);

  const EMPTY = useMemo(() => Array(9).fill(null) as BoardType, []);
  const [history, setHistory] = useState<BoardType[]>([EMPTY]);
  const [step, setStep] = useState(0);
  const board = history[step];

  const [locked, setLocked] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [mode, setMode] = useState<GameMode>("pvp");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy"); // default хэвээр
  const [focusedCell, setFocusedCell] = useState(0);
  const [announcement, setAnnouncement] = useState("");

  const botMark: Player = "O";
  const { updateOnResult } = useStats();

  const info = useMemo(() => {
    const win = calculateWinner(board);
    if (win) return { status: `Winner: ${win.winner} 🎉`, line: win.line };
    if (isBoardFull(board)) return { status: "Draw 🤝", line: [] };
    return { status: `Turn: ${nextPlayer(board)}`, line: [] };
  }, [board]);

  useEffect(() => {
    if (info.status.startsWith("Winner:")) {
      setShowCelebration(true);
      const t = setTimeout(() => setShowCelebration(false), 2500);
      return () => clearTimeout(t);
    }
  }, [info.status]);

  function reset() {
    setHistory([EMPTY]);
    setStep(0);
    setLocked(false);
    setShowCelebration(false);
    setFocusedCell(0);
    setAnnouncement("");
  }

  function jumpTo(newStep: number) {
    setStep(newStep);
    setLocked(false);
    setShowCelebration(false);
    setAnnouncement("");
  }

  function placeAt(idx: number) {
    const current = nextPlayer(board);
    const next = board.slice() as BoardType;
    next[idx] = current;
    setHistory((p) => [...p.slice(0, step + 1), next]);
    setStep((s) => s + 1);
    playClick();

    const win = calculateWinner(next);
    const draw = !win && isBoardFull(next);

    if (win) {
      playWin();
      updateOnResult(current);
      setLocked(true);
    } else if (draw) {
      playDraw();
      updateOnResult("draw");
      setLocked(true);
    }
  }

  function handleClick(idx: number) {
    if (locked || board[idx] !== null) return;
    if (mode === "vsBot" && nextPlayer(board) === botMark) return;
    placeAt(idx);
  }

  function handleKeyPlace(i: number) {
    if (locked || board[i] !== null) return;
    if (mode === "vsBot" && nextPlayer(board) === botMark) return;
    placeAt(i);
  }

  useEffect(() => {
    if (mode !== "vsBot" || locked) return;
    const turn = nextPlayer(board);
    if (turn !== botMark) return;

    const empties = board.map((c, i) => (c === null ? i : -1)).filter((i) => i !== -1);
    if (empties.length === 0) return;

    const timer = setTimeout(() => {
      const choice =
        difficulty === "hard"
          ? getBestMoveMinimax(board, botMark)
          : difficulty === "normal"
          ? getBestMoveNormal(board, botMark) // 👈 normal логик
          : empties[Math.floor(Math.random() * empties.length)];

      const next = board.slice() as BoardType;
      next[choice] = botMark;
      setHistory((p) => [...p.slice(0, step + 1), next]);
      setStep((s) => s + 1);

      const win = calculateWinner(next);
      const draw = !win && isBoardFull(next);

      if (win) {
        playWin();
        updateOnResult(botMark);
        setLocked(true);
      } else if (draw) {
        playDraw();
        updateOnResult("draw");
        setLocked(true);
      }
    }, settings.botDelayMs);

    return () => clearTimeout(timer);
  }, [board, mode, locked, step, difficulty, settings.botDelayMs, botMark, playWin, playDraw, updateOnResult]);

  return {
    board,
    info,
    history,
    step,
    mode,
    setMode,
    difficulty,
    setDifficulty,
    settings,
    setSettings,
    showCelebration,
    focusedCell,
    setFocusedCell,
    announcement,
    handleClick,
    handleKeyPlace,
    jumpTo,
    reset,
  };
}
