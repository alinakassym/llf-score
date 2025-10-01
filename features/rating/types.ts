import { ImageSourcePropType } from "react-native";

export type ClubRating = {
  id: string;
  name: string;
  position: number;
  points: number;
  change?: number; // +1, -1, 0 для изменения позиции
  logo?: ImageSourcePropType;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
};

export type FCRatingRow = {
  id: string;
  clubName: string;
  city: string;
  league: string;
  logo?: ImageSourcePropType;
  season1: number;
  season2: number;
  season3: number;
  season4: number;
  totalPoints: number;
};

export type PlayerRating = {
  id: string;
  name: string;
  position: number;
  club: string;
  clubLogo?: ImageSourcePropType;
  avatar?: ImageSourcePropType;
  points: number;
  change?: number; // +1, -1, 0 для изменения позиции
  goals: number;
  assists: number;
  matches: number;
  rating: number;
};

export type RatingTab = "clubs" | "players";