import { ImageSourcePropType } from "react-native";

export type TeamRatingRow = {
  teamName: string;
  cityName: string;
  league: string;
  season1: number;
  season2: number;
  season3: number;
  season4: number;
  total: number;
  image?: ImageSourcePropType;
};

export type RatingTabKey = "clubs" | "players";

export type RatingTab = {
  key: RatingTabKey;
  label: string;
};