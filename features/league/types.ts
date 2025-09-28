// features/league/types.ts
import { ImageSourcePropType } from "react-native";
export type LeagueRow = {
  id: string;
  pos: number; // позиция в таблице
  crest?: ImageSourcePropType; // URL эмблемы (опционально)
  name: string; // название команды
  lastScore?: { gf: number; ga: number }; // последний матч, например 3:0
  posDiff?: number; // сдвиг позиции, например +1 / -1
  played: number; // И
  goalsFor: number; // ГФ
  goalsAgainst: number; // ГП
  points: number; // О
};

export type OrderRow = {
  number: number;
  team: string;
  score: string;
  games: string;
  goals: string;
  col: string;
  image?: ImageSourcePropType;
};