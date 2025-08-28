// shared/mocks/playersRatingRows.ts
import { ImageSourcePropType } from "react-native";

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

export const playersRatingRows: PlayerRatingRow[] = [
  {
    playerName: "Ержан А.",
    teamName: "БИИК Шымкент",
    cityName: "Шымкент",
    league: "Премьер-лига",
    position: 1,
    positionChange: "up",
    tour: 12,
    total: 24,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Серік Б.",
    teamName: "Актобе",
    cityName: "Актобе",
    league: "Премьер-лига",
    position: 2,
    positionChange: "down",
    tour: 12,
    total: 21,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Айдар Ж.",
    teamName: "Tomiris-Turan",
    cityName: "Туркестан",
    league: "Премьер-лига",
    position: 3,
    positionChange: "up",
    tour: 12,
    total: 19,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Нұрсұлтан К.",
    teamName: "Кайрат",
    cityName: "Алматы",
    league: "Премьер-лига",
    position: 4,
    positionChange: "down",
    tour: 12,
    total: 18,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Ерасыл Т.",
    teamName: "Елимай",
    cityName: "Семей",
    league: "Премьер-лига",
    position: 5,
    positionChange: "up",
    tour: 12,
    total: 17,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Қайсар Р.",
    teamName: "Кызылжар",
    cityName: "Петропавловск",
    league: "Премьер-лига",
    position: 6,
    positionChange: "down",
    tour: 12,
    total: 16,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Алихан С.",
    teamName: "Улытай",
    cityName: "Жезказган",
    league: "Премьер-лига",
    position: 7,
    positionChange: "up",
    tour: 12,
    total: 15,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Ильяс Д.",
    teamName: "Zhenis Astana",
    cityName: "Астана",
    league: "Премьер-лига",
    position: 8,
    positionChange: "up",
    tour: 12,
    total: 14,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Руслан М.",
    teamName: "Тобол",
    cityName: "Костанай",
    league: "Премьер-лига",
    position: 9,
    positionChange: "down",
    tour: 12,
    total: 13,
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    playerName: "Дамир Ш.",
    teamName: "Астана",
    cityName: "Астана",
    league: "Премьер-лига",
    position: 10,
    positionChange: "up",
    tour: 12,
    total: 12,
    image: require("@/assets/images/adaptive-icon.png"),
  },
];
