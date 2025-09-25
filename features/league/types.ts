// features/league/types.ts
export type LeagueRow = {
  id: string;
  pos: number; // позиция в таблице
  crest?: string; // URL эмблемы (опционально)
  name: string; // название команды
  lastScore?: { gf: number; ga: number }; // последний матч, например 3:0
  posDiff?: number; // сдвиг позиции, например +1 / -1
  played: number; // И
  goalsFor: number; // ГФ
  goalsAgainst: number; // ГП
  points: number; // О
};
