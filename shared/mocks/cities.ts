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
    image: require("@/assets/images/cities/astana.png")
 },
  { 
    id: "almaty",   
    name: "Алматы",   
    image: require("@/assets/images/cities/almaty.png")},
  { 
    id: "shymkent",
    name: "Шымкент",
    image: require("@/assets/images/cities/shymkent.png")},
  { 
    id: "atyrau",   
    name: "Атырау",   
    image: require("@/assets/images/cities/atyrau.gif")
  },
  {
    id: "kostanai",   
    name: "Костанай",   
    image: require("@/assets/images/cities/kostanai.png")
  },
  {
    id: "pavlodar",   
    name: "Павлодар",   
    image: require("@/assets/images/cities/pavlodar.png")
  }

];
