import { ImageSourcePropType } from "react-native";

export type City = {
  id: string;
  name: string;
  image: ImageSourcePropType;
};

export const cities: City[] = [
  { 
    id: "astana",   
    name: "Астана",   
    image: require("@/assets/cities/astana.png")
 },
  { 
    id: "almaty",   
    name: "Алматы",   
    image: require("@/assets/cities/almaty.png")},
  { 
    id: "shymkent",
    name: "Шымкент",
    image: require("@/assets/cities/shymkent.png")},
  { 
    id: "atyrau",   
    name: "Атырау",   
    image: require("@/assets/cities/atyrau.gif")
  },
  {
    id: "kostanai",   
    name: "Костанай",   
    image: require("@/assets/cities/kostanay.png")
  },
  {
    id: "pavlodar",   
    name: "Павлодар",   
    image: require("@/assets/cities/pavlodar.png")
  }

];
