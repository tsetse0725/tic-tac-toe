"use client";
import React, { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { Cell } from "./types";

type SquareProps = Omit<HTMLMotionProps<"button">, "children" | "value"> & {
  mark: Cell;             
  highlight?: boolean;
};

const Square = forwardRef<HTMLButtonElement, SquareProps>(function Square(
  { mark, highlight = false, className = "", tabIndex, onClick, "aria-label": ariaLabel, ...rest },
  ref
) {
  const disabled = mark !== null;

  return (
    <motion.button
      ref={ref}
      type="button"
      role="gridcell"
      tabIndex={tabIndex ?? -1}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      whileHover={{ y: disabled ? 0 : -2 }}
      aria-label={ariaLabel ?? (mark ? `Cell: ${mark}` : "Empty cell")}
      className={[
        "relative w-full aspect-square select-none rounded-2xl overflow-hidden",
        "border border-foreground/10 bg-background/50 backdrop-blur",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_6px_20px_-6px_rgba(0,0,0,0.4)]",
        highlight ? "ring-2 ring-accent-win" : "ring-1 ring-foreground/10",
        disabled ? "cursor-default" : "cursor-pointer",
        "flex items-center justify-center text-5xl font-extrabold",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-win",
        className,
      ].join(" ")}
      {...rest}  
    >
      <span
        className={
          mark === "X"
            ? "text-accent-x drop-shadow"
            : mark === "O"
            ? "text-accent-o drop-shadow"
            : "text-foreground/40"
        }
      >
        {mark ?? ""}
      </span>

      {highlight && (
        <span className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-accent-win animate-pulse" />
      )}

      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent" />
    </motion.button>
  );
});

Square.displayName = "Square";
export default Square;
