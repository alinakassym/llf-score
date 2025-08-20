import { ImageSourcePropType } from "react-native";

export type City = {
  id: string;
  name: string;
  icon: ImageSourcePropType;
};

export const cities: City[] = [
  {
    id: "astana",
    name: "Астана",
    icon: { uri: "https://neat-onions-slide.loca.lt/api/cities/1/icon" },
  },
  {
    id: "almaty",
    name: "Алматы",
    icon: require("@/assets/images/cities/almaty.png"),
  },
  {
    id: "shymkent",
    name: "Шымкент",
    icon: require("@/assets/images/cities/shymkent.png"),
  },
  {
    id: "atyrau",
    name: "Атырау",
    icon: require("@/assets/images/cities/atyrau.gif"),
  },
  {
    id: "kostanai",
    name: "Костанай",
    icon: require("@/assets/images/cities/kostanai.png"),
  },
  {
    id: "pavlodar",
    name: "Павлодар",
    icon: require("@/assets/images/cities/pavlodar.png"),
  },
];
