interface HistoryBarProps {
  history: unknown[];
  step: number;
  jumpTo: (i: number) => void;
}

export default function HistoryBar({ history, step, jumpTo }: HistoryBarProps) {
  return (
    <div className="mt-4 rounded-xl border border-foreground/10 bg-background/50 p-2 text-xs backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">History</span>
        <div className="space-x-1">
          <button onClick={() => jumpTo(0)} title="Go to start">⏮</button>
          <button onClick={() => jumpTo(Math.max(0, step - 1))}>←</button>
          <button onClick={() => jumpTo(Math.min(history.length - 1, step + 1))}>→</button>
          <button onClick={() => jumpTo(history.length - 1)}>⏭</button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1">
        {history.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            className={`rounded-md px-2 py-1 ${
              i === step
                ? "bg-foreground/15 text-foreground"
                : "bg-foreground/5 hover:bg-foreground/10 text-foreground/80"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
