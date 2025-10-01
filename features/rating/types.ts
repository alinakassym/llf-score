import { ImageSourcePropType } from "react-native";

export type TeamRatingRow = {
  teamName: string;
  cityName: string;
  league: string;
  positionChange: "up" | "down";
  season1: number;
  season2: number;
  season3: number;
  season4: number;
  total: number;
  image?: ImageSourcePropType;
};

export type PlayerRatingRow = {
  playerName: string;
  cityName: string;
  teamName: string;
  league: string;
  position: number;
  positionChange: "up" | "down";
  tour: number;
  total: number;
  image?: ImageSourcePropType;
};