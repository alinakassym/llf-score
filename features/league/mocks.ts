// features/league/mocks.ts
import { LeagueRow } from "./types";

export const leagueMock: LeagueRow[] = [
  {
    id: "bltk",
    pos: 1,
    name: "БИИК Шымкент (Ж)",
    lastScore: { gf: 3, ga: 0 },
    played: 17,
    goalsFor: 172,
    goalsAgainst: 6,
    points: 46,
  },
  {
    id: "akt",
    pos: 2,
    name: "Актобе (Ж)",
    played: 15,
    goalsFor: 125,
    goalsAgainst: 4,
    points: 43,
  },
  {
    id: "tom",
    pos: 3,
    name: "Tomiris-Turan (Ж)",
    lastScore: { gf: 5, ga: 1 },
    played: 16,
    goalsFor: 77,
    goalsAgainst: 17,
    points: 37,
  },
  {
    id: "kai",
    pos: 4,
    name: "Кайрат (Ж)",
    played: 16,
    goalsFor: 50,
    goalsAgainst: 35,
    points: 33,
  },
  {
    id: "eli",
    pos: 5,
    name: "Елимай (Ж)",
    posDiff: +1,
    lastScore: { gf: 3, ga: 2 },
    played: 16,
    goalsFor: 40,
    goalsAgainst: 29,
    points: 29,
  },
];
