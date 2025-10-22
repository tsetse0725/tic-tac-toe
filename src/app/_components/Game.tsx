"use client";
import { useGameLogic } from "./useGameLogic";
import Header from "./Header";
import HistoryBar from "./HistoryBar";
import StatusBar from "./StatusBar";
import Board from "./Board";
import WinnerModal from "./WinnerModal";
import Confetti from "./Confetti";
import ScoreCard from "./ScoreCard";

export default function Game() {
  const game = useGameLogic();

  return (
    <div className="relative mx-auto w-full max-w-md">
      {game.showCelebration && <Confetti />}

      <Header
        mode={game.mode}
        setMode={game.setMode}
        difficulty={game.difficulty}
        setDifficulty={game.setDifficulty}
        settings={game.settings}
        setSettings={game.setSettings}
      />

      <StatusBar status={game.info.status} onReset={game.reset} />

      <Board
        board={game.board}
        onClick={game.handleClick}
        winLine={game.info.line}
        focusedCell={game.focusedCell}
        setFocusedCell={game.setFocusedCell}
        onKeyPlace={game.handleKeyPlace}
      />

      <WinnerModal
        open={
          game.info.status.startsWith("Winner:") ||
          game.info.status === "Draw 🤝"
        }
        message={game.info.status}
        onClose={game.reset}
      />

      <div aria-live="polite" className="sr-only">
        {game.announcement}
      </div>

      <HistoryBar history={game.history} step={game.step} jumpTo={game.jumpTo} />

      <ScoreCard mode={game.mode} />

      <footer className="mt-6 text-center">
        <span className="inline-block rounded-full border border-foreground/10 bg-background/60 px-2.5 py-1 text-xs text-foreground/70 shadow-sm backdrop-blur-sm mix-blend-normal">
          Built with ❤️ by <span className="font-medium text-foreground">mcgarret</span>
        </span>
      </footer>
    </div>
  );
}
