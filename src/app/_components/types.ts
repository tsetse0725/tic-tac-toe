export type Player = "X" | "O";
export type Cell = Player | null;
export type BoardType = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];


export const WIN_LINES: number[][] = [
[0, 1, 2],
[3, 4, 5],
[6, 7, 8],
[0, 3, 6],
[1, 4, 7],
[2, 5, 8],
[0, 4, 8],
[2, 4, 6],
];


export function calculateWinner(board: BoardType): { winner: Player; line: number[] } | null {
for (const [a, b, c] of WIN_LINES) {
if (board[a] && board[a] === board[b] && board[a] === board[c]) {
return { winner: board[a] as Player, line: [a, b, c] };
}
}
return null;
}


export function isBoardFull(board: BoardType) {
return board.every((c) => c !== null);
}


export function nextPlayer(board: BoardType): Player {
const xCount = board.filter((c) => c === "X").length;
const oCount = board.filter((c) => c === "O").length;
return xCount === oCount ? "X" : "O";
}