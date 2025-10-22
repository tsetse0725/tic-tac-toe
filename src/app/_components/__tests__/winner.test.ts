import { describe, it, expect } from "vitest";
import {
  calculateWinner,
  isBoardFull,
  nextPlayer,
  type BoardType,
  type Player,
} from "../types";


const asBoard = (a: Array<Player | null>): BoardType => a as BoardType;
const E: Player | null = null;

describe("calculateWinner", () => {
  it("detects horizontal win", () => {
    const b = asBoard(["X","X","X",  E, E, E,  E, E, E]);
    const res = calculateWinner(b);
    expect(res?.winner).toBe("X");
    expect(res?.line).toEqual([0,1,2]);
  });

  it("detects diagonal win", () => {
    const b = asBoard(["O",E,E,  E,"O",E,  E,E,"O"]);
    const res = calculateWinner(b);
    expect(res?.winner).toBe("O");
    expect(res?.line).toEqual([0,4,8]);
  });

  it("returns null when no winner", () => {
    const b = asBoard(["X","O","X",  "X","O","O",  "O","X","X"]);
    expect(calculateWinner(b)).toBeNull();
  });
});

describe("nextPlayer", () => {
  it("X starts", () => {
    const b = asBoard([E,E,E,  E,E,E,  E,E,E]);
    expect(nextPlayer(b)).toBe("X");
  });

  it("alternates correctly", () => {
    const b1 = asBoard(["X",E,E,  "O",E,E,  E,E,E]);
    expect(nextPlayer(b1)).toBe("X");

    const b2 = asBoard(["X",E,E,  "O","X",E,  E,E,E]);
    expect(nextPlayer(b2)).toBe("O");
  });
});

describe("draw detection", () => {
  it("full board & no winner", () => {
    const b = asBoard(["X","O","X",  "X","O","O",  "O","X","X"]);
    expect(isBoardFull(b)).toBe(true);
    expect(calculateWinner(b)).toBeNull();
  });
});
