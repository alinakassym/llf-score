// features/match/types.ts
import { ImageSourcePropType } from "react-native";

export type MatchStatus = "live" | "upcoming" | "finished";

export type Team = {
  name: string;
  city?: string;
  logo?: ImageSourcePropType;
  color1?: string;
  color2?: string;
};

export type Match = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  dateTime: any;
  date: string; // "Сейчас" | "Сегодня" | "Завтра" | "15 авг"
  time: string; // "15:00"
  tournament: string; // "40+ жас санатындағы IX чемпионаты"
  round?: string; // "Группа A, 1 - тур"
  isLive: boolean;
};
