// features/match/mocks.ts
import { NewsItem } from "@/features/news/types";

export const mockNews: NewsItem[] = [
  {
    id: "n1",
    title:
      "В этом году Казахстан будут представлять две команды, это действующие чемпионы турнира – команда ...",
    image: require("@/assets/images/adaptive-icon.png"), // пока заглушка
    bookmarked: false,
  },
  {
    id: "n2",
    title:
      "Федерация объявила расписание грядущего тура. Матчи начнутся в субботу в 18:00 по времени Астаны...",
    image: require("@/assets/images/adaptive-icon.png"), // пока заглушка
    bookmarked: true,
  },
];
