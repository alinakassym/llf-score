// shared/mocks/leagueRows.ts
import { ImageSourcePropType } from "react-native";

export type OrderRow = {
  number: number;
  team: string;
  score: string;
  games: string;
  goals: string;
  col: string;
  image?: ImageSourcePropType;
};

export const leagueRows: OrderRow[] = [
  {
    number: 1,
    team: "БИИК Шымкент",
    score: "3:0",
    games: "17",
    goals: "172:6",
    col: "46",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 2,
    team: "Актобе",
    score: "",
    games: "15",
    goals: "125:4",
    col: "43",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 3,
    team: "Tomiris-Turan",
    score: "5:1",
    games: "16",
    goals: "77:17",
    col: "37",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 4,
    team: "Кайрат",
    score: "",
    games: "16",
    goals: "50:35",
    col: "33",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 5,
    team: "Елимай",
    score: "3:2",
    games: "16",
    goals: "40:29",
    col: "29",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 6,
    team: "Кызылжар",
    score: "",
    games: "15",
    goals: "28:22",
    col: "28",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 7,
    team: "Улытай",
    score: "0:3",
    games: "16",
    goals: "23:35",
    col: "23",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 8,
    team: "Zhenis Astana",
    score: "",
    games: "16",
    goals: "25:38",
    col: "22",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 9,
    team: "Тобол",
    score: "",
    games: "17",
    goals: "21:84",
    col: "18",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 10,
    team: "Астана",
    score: "2:3",
    games: "16",
    goals: "23:40",
    col: "13",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 11,
    team: "Кайсар",
    score: "",
    games: "14",
    goals: "18:34",
    col: "12",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 12,
    team: "Жетысу",
    score: "1:5",
    games: "16",
    goals: "13:59",
    col: "10",
    image: require("@/assets/images/cities/astana.png"),
  },
];
