"use client";
import { useEffect, useMemo } from "react";



export default function Confetti() {
const pieces = useMemo(() => Array.from({ length: 40 }), []);
useEffect(() => {

}, []);
return (
<div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
{pieces.map((_, i) => (
<span
key={i}
className="absolute text-2xl animate-[confetti_2.5s_ease-out_forwards]"
style={{
left: `${Math.random() * 100}%`,
top: `-10%`,
rotate: `${Math.random() * 360}deg`,
animationDelay: `${Math.random() * 300}ms`,
}}
>
{i % 3 === 0 ? "✨" : i % 3 === 1 ? "🎉" : "🟡"}
</span>
))}
</div>
);
}