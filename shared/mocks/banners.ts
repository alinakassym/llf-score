
import { ImageSourcePropType } from "react-native";

export type Banner = {
  id: string;
  title?: string;
  subtitle?: string;
  image: ImageSourcePropType;   // require(...) or { uri }
  href?: string;
};

export const banners: Banner[] = [
  {
    id: "b1",
    title: "Преодолей границы",
    subtitle: "Достигай новых вершин",
    image: require("@/assets/images/banners/1.png")
  },
  {
    id: "b2",
    title: "Мячи от А до Я",
    image: require("@/assets/images/banners/2.png")
  },
];
