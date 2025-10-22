import SettingsPanel, { Settings } from "./SettingsPanel";

type GameMode = "pvp" | "vsBot";
type Difficulty = "easy" | "normal" | "hard";

interface HeaderProps {
  mode: GameMode;
  setMode: (v: GameMode) => void;
  difficulty: Difficulty;
  setDifficulty: (v: Difficulty) => void;
  settings: Settings;
  setSettings: (v: Settings) => void;
}

export default function Header({
  mode,
  setMode,
  difficulty,
  setDifficulty,
  settings,
  setSettings,
}: HeaderProps) {
  return (
    <header className="mb-6 text-center">
      <h1 className="text-4xl font-black tracking-tight text-foreground drop-shadow">
        Tic-Tac-Toe
      </h1>
      <p className="mt-1 text-sm tracking-wide text-foreground/60">
        Next.js · TypeScript · Tailwind · Motion
      </p>

      <div className="mt-3 flex items-center justify-center gap-2">
        {/* Mode selector */}
        <div className="inline-flex rounded-xl border border-foreground/15 bg-background/40 p-1 text-xs backdrop-blur-sm">
          <button
            onClick={() => setMode("pvp")}
            className={`rounded-lg px-3 py-1 ${
              mode === "pvp" ? "bg-foreground/10" : "hover:bg-foreground/5"
            }`}
          >
            PvP
          </button>
          <button
            onClick={() => setMode("vsBot")}
            className={`rounded-lg px-3 py-1 ${
              mode === "vsBot" ? "bg-foreground/10" : "hover:bg-foreground/5"
            }`}
          >
            vs Bot
          </button>
        </div>

        {/* Difficulty selector (vsBot only) */}
        {mode === "vsBot" && (
          <div className="inline-flex rounded-xl border border-foreground/15 bg-background/40 p-1 text-xs backdrop-blur-sm">
            <button
              onClick={() => setDifficulty("easy")}
              className={`rounded-lg px-3 py-1 ${
                difficulty === "easy" ? "bg-foreground/10" : "hover:bg-foreground/5"
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => setDifficulty("normal")}
              className={`rounded-lg px-3 py-1 ${
                difficulty === "normal" ? "bg-foreground/10" : "hover:bg-foreground/5"
              }`}
            >
              Normal
            </button>
            <button
              onClick={() => setDifficulty("hard")}
              className={`rounded-lg px-3 py-1 ${
                difficulty === "hard" ? "bg-foreground/10" : "hover:bg-foreground/5"
              }`}
            >
              Hard
            </button>
          </div>
        )}

        <SettingsPanel value={settings} onChange={setSettings} />
      </div>
    </header>
  );
}
