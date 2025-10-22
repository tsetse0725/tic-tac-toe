"use client";
import { useEffect, useState } from "react";


export type Settings = {
  soundOn: boolean;
  volume: number;       
  botDelayMs: number;    
  haptics: "off" | "gentle" | "normal"; 
};

type Props = {
  value: Settings;
  onChange: (v: Settings) => void;
};


export default function SettingsPanel({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  
  useEffect(() => {
    try {
      localStorage.setItem("ttt_settings", JSON.stringify(value));
    } catch {
      
    }
  }, [value]);

  return (
    <div className="relative">
      
      <button
        onClick={() => setOpen((p) => !p)}
        className="rounded-xl border border-foreground/15 bg-background/50 px-3 py-1.5 text-xs hover:bg-foreground/5"
      >
        ⚙️ Settings
      </button>

      
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-72 rounded-2xl border border-foreground/10 bg-background/95 p-4 shadow-lg backdrop-blur">
          
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">Sound</h3>
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={value.soundOn}
                onChange={(e) =>
                  onChange({ ...value, soundOn: e.target.checked })
                }
              />
              <span>{value.soundOn ? "On" : "Off"}</span>
            </label>
          </div>

          
          <div className="mb-4">
            <label className="mb-1 block text-xs text-foreground/70">
              Volume: {(value.volume * 100).toFixed(0)}%
            </label>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={value.volume}
              onChange={(e) =>
                onChange({ ...value, volume: parseFloat(e.target.value) })
              }
              className="w-full"
            />
          </div>

          
          <div className="mb-4">
            <div className="mb-1 flex items-center justify-between text-xs text-foreground/70">
              <span>Bot delay</span>
              <span>{value.botDelayMs} ms</span>
            </div>
            <input
              type="range"
              min={200}
              max={800}
              step={50}
              value={value.botDelayMs}
              onChange={(e) =>
                onChange({
                  ...value,
                  botDelayMs: parseInt(e.target.value, 10),
                })
              }
              className="w-full"
            />
            <p className="mt-1 text-[11px] text-foreground/60">
              200 ms = хурдан, 800 ms = хүний мэт удаан.
            </p>
          </div>

          
          <div className="border-t border-foreground/10 pt-3">
            <h3 className="mb-2 text-sm font-semibold">Haptics (mobile)</h3>
            <label className="mb-1 block text-xs text-foreground/70">
              Strength
            </label>
            <select
              className="w-full rounded-md border border-foreground/15 bg-background/70 px-2 py-1 text-sm"
              value={value.haptics}
              onChange={(e) =>
                onChange({
                  ...value,
                  haptics: e.target.value as Settings["haptics"], 
                })
              }
            >
              <option value="off">Off</option>
              <option value="gentle">Gentle</option>
              <option value="normal">Normal</option>
            </select>
            <p className="mt-1 text-[11px] text-foreground/60">
              Supported on most Android browsers; iOS support may vary.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
