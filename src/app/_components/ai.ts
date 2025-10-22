
import type { BoardType, Player } from "./types";
import { calculateWinner, isBoardFull, nextPlayer } from "./types";


type Score = number;

const WIN_BASE = 10;
const LOSS_BASE = -10;
const DRAW = 0;

function emptiesOf(board: BoardType): number[] {
  return board.map((c, i) => (c === null ? i : -1)).filter((i) => i !== -1);
}


function scoreCellPreference(i: number): number {
  if (i === 4) return 3; 
  if (i === 0 || i === 2 || i === 6 || i === 8) return 2; 
  return 1; 
}


const cloneBoard = (b: BoardType): BoardType => b.slice() as BoardType;


function evaluateTerminal(board: BoardType, bot: Player, depth: number): Score | null {
  const win = calculateWinner(board);
  if (win) return win.winner === bot ? WIN_BASE - depth : depth + LOSS_BASE;
  if (isBoardFull(board)) return DRAW;
  return null;
}

type MinimaxNode = { score: Score; idx: number | null };


function keyOf(board: BoardType, turn: Player): string {
  const enc = board.map((c) => (c === "X" ? 1 : c === "O" ? 2 : 0)).join("");
  return `${enc}|${turn}`;
}

const memo = new Map<string, MinimaxNode>();

function minimax(
  board: BoardType,
  bot: Player,
  depth: number,
  alpha: number,
  beta: number
): MinimaxNode {
  const terminal = evaluateTerminal(board, bot, depth);
  if (terminal !== null) return { score: terminal, idx: null };

  const turn = nextPlayer(board);
  const key = keyOf(board, turn);
  const cached = memo.get(key);
  if (cached) return cached;

  const empties = emptiesOf(board).sort(
    (a, b) => scoreCellPreference(b) - scoreCellPreference(a)
  );

  if (turn === bot) {
    let best: MinimaxNode = { score: -Infinity, idx: null };

    for (const i of empties) {
      const next = cloneBoard(board);
      next[i] = turn;


      const quick = calculateWinner(next);
      const node =
        quick && quick.winner === bot
          ? { score: WIN_BASE - (depth + 1), idx: i }
          : minimax(next, bot, depth + 1, alpha, beta);

      if (node.score > best.score) best = { score: node.score, idx: i };
      alpha = Math.max(alpha, node.score);
      if (beta <= alpha) break; 
    }

    memo.set(key, best);
    return best;
  } else {
    let best: MinimaxNode = { score: Infinity, idx: null };

    for (const i of empties) {
      const next = cloneBoard(board);
      next[i] = turn;


      const quick = calculateWinner(next);
      const node =
        quick && quick.winner !== bot
          ? { score: LOSS_BASE + (depth + 1), idx: i }
          : minimax(next, bot, depth + 1, alpha, beta);

      if (node.score < best.score) best = { score: node.score, idx: i };
      beta = Math.min(beta, node.score);
      if (beta <= alpha) break; 
    }

    memo.set(key, best);
    return best;
  }
}


export function getBestMoveMinimax(board: BoardType, bot: Player): number {
  const empties = emptiesOf(board);


  if (empties.length === 9) return 4;
  if (empties.length === 8 && board[4] === null) return 4;

  memo.clear(); 
  const { idx } = minimax(board, bot, 0, -Infinity, Infinity);


  return idx ?? empties.sort((a, b) => scoreCellPreference(b) - scoreCellPreference(a))[0];
}


export function getBestMoveNormal(board: BoardType, bot: Player): number {
  const empties = emptiesOf(board);
  const opp: Player = bot === "X" ? "O" : "X";


  if (empties.length === 9) return 4;
  if (empties.length >= 7 && board[4] === null) return 4;


  for (const i of empties) {
    const copy = cloneBoard(board); 
    copy[i] = bot;
    if (calculateWinner(copy)?.winner === bot) return i;
  }


  for (const i of empties) {
    const copy = cloneBoard(board); 
    copy[i] = opp;
    if (calculateWinner(copy)?.winner === opp) return i;
  }


  if (empties.includes(4)) return 4;


  const oppositeCorner: Record<number, number> = { 0: 8, 2: 6, 6: 2, 8: 0 };
  for (const c of [0, 2, 6, 8] as const) {
    if (board[c] === opp && empties.includes(oppositeCorner[c])) {
      return oppositeCorner[c];
    }
  }


  const corners = [0, 2, 6, 8].filter((i) => empties.includes(i));
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];


  return empties[Math.floor(Math.random() * empties.length)];
}
