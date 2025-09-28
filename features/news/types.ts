// features/match/types.ts
import { ImageSourcePropType } from "react-native";

export type NewsItem = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  bookmarked: boolean;
};
