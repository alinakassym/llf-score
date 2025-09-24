// shared/types/match.ts
import { ImageSourcePropType } from "react-native";

export type MatchStatus = "live" | "upcoming" | "finished";

export type Team = {
  name: string;
  city?: string;
  logo?: ImageSourcePropType;
};

export type Match = {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: MatchStatus;
  time: string; // "15:00" или "Сейчас" для live
  tournament: string; // "40+ жас санатындағы IX чемпионаты"
  round?: string; // "Группа A, 1 - тур"
  isLive: boolean;
};