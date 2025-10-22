"use client";
import { Trophy, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";


export default function StatusBar({
status,
onReset,
}: {
status: string;
onReset: () => void;
}) {
const isWinner = status.startsWith("Winner:");
return (
<div className="mb-5 flex items-center justify-between">
<motion.span
initial={{ opacity: 0, y: 6 }}
animate={{ opacity: 1, y: 0 }}
className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm shadow backdrop-blur"
role="status"
aria-live="polite"
>
{isWinner ? <Trophy className="h-4 w-4 text-accent-win" /> : <span className="h-2 w-2 rounded-full bg-emerald-500" />}
{status}
</motion.span>


<motion.button
whileTap={{ scale: 0.95 }}
onClick={onReset}
className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium shadow hover:bg-white/15 backdrop-blur"
>
<RotateCcw className="h-4 w-4" /> Reset
</motion.button>
</div>
);
}