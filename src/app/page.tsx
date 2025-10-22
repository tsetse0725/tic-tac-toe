import Game from "./_components/Game";
import ThemeToggle from "./_components/ThemeToggle";
import { StatsProvider } from "./_components/useStats"; 

export default function Page() {
  return (
    <main className="relative min-h-dvh text-foreground flex items-center justify-center p-6 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(79,70,229,0.5),transparent_60%)] blur-3xl" />
        <div className="absolute left-[20%] bottom-[-20%] h-[55vmin] w-[55vmin] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(225,29,72,0.45),transparent_60%)] blur-3xl" />
        <div className="absolute right-[10%] top-[10%] h-[45vmin] w-[45vmin] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.45),transparent_60%)] blur-3xl" />
      </div>

      <ThemeToggle />

      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        <StatsProvider>   
          <Game />
        </StatsProvider>
      </div>
    </main>
  );
}
