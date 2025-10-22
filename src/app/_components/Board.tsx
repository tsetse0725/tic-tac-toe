"use client";
import { useEffect, useRef, useCallback } from "react";
import Square from "./Square";
import type { BoardType } from "./types";

type Props = {
  board: BoardType;
  onClick: (idx: number) => void;
  winLine: number[];
  focusedCell: number;
  setFocusedCell: (idx: number) => void;
  onKeyPlace: (idx: number) => void;
};

export default function Board({
  board,
  onClick,
  winLine,
  focusedCell,
  setFocusedCell,
  onKeyPlace,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>(Array(9).fill(null));

  
useEffect(() => {
  containerRef.current?.focus();
  requestAnimationFrame(() => {
    btnRefs.current[focusedCell]?.focus();
  });
}, [focusedCell]);


  
  useEffect(() => {
    btnRefs.current[focusedCell]?.focus();
  }, [focusedCell]);

  
  const move = useCallback(
    (dir: "up" | "down" | "left" | "right", wrap = false) => {
      const r = Math.floor(focusedCell / 3);
      const c = focusedCell % 3;
      if (dir === "up") {
        if (r > 0) setFocusedCell(focusedCell - 3);
        else if (wrap) setFocusedCell(focusedCell + 6);
      }
      if (dir === "down") {
        if (r < 2) setFocusedCell(focusedCell + 3);
        else if (wrap) setFocusedCell(focusedCell - 6);
      }
      if (dir === "left") {
        if (c > 0) setFocusedCell(focusedCell - 1);
        else if (wrap) setFocusedCell(focusedCell + 2);
      }
      if (dir === "right") {
        if (c < 2) setFocusedCell(focusedCell + 1);
        else if (wrap) setFocusedCell(focusedCell - 2);
      }
    },
    [focusedCell, setFocusedCell]
  );

  
  const handlePlace = useCallback(() => {
    if (board[focusedCell] === null) onKeyPlace(focusedCell);
  }, [board, focusedCell, onKeyPlace]);

  const focusContainer = useCallback(() => {
    containerRef.current?.focus();
  }, []);

  return (
    <div
      ref={containerRef}
      role="grid"
      aria-label="Tic Tac Toe board"
      aria-rowcount={3}
      aria-colcount={3}
      tabIndex={0}
      onKeyDownCapture={(e) => {
        const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Enter", " "];
        if (keys.includes(e.key)) e.preventDefault();

        if (e.key === "ArrowUp") move("up", true);
        if (e.key === "ArrowDown") move("down", true);
        if (e.key === "ArrowLeft") move("left", true);
        if (e.key === "ArrowRight") move("right", true);
        if (e.key === "Enter" || e.key === " ") handlePlace();
      }}
      onMouseEnter={focusContainer}
      onMouseDown={focusContainer}
      className="grid grid-cols-3 gap-3 p-3 rounded-3xl border border-foreground/10 bg-background/10 backdrop-blur-xl shadow-[0_10px_40px_-12px_rgba(0,0,0,0.45)] focus:outline-none"
    >
      {board.map((cell, i) => (
        <Square
          key={i}
          ref={(el) => { btnRefs.current[i] = el; }}
          mark={cell}                                       
          onClick={() => onClick(i)}
          highlight={winLine.includes(i)}
          tabIndex={focusedCell === i ? 0 : -1}
          data-testid={`cell-${i}`}                         
          aria-selected={focusedCell === i}
          aria-label={`Cell ${i + 1} ${cell ?? ""}`}
        />
      ))}
    </div>
  );
}
