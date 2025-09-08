// features/home/NewsList.tsx
import { View } from "react-native";
import NewsList from "@/shared/ui/NewsList";

const NEWS = [
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

export default function HomeNewsList() {
  return (
    <View style={{ marginTop: 0 }}>
      <NewsList
        items={NEWS}
        onToggleBookmark={(id) => console.log("toggle bookmark", id)}
      />
    </View>
  );
}
