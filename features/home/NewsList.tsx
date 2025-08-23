// features/home/NewsList.tsx
import { View } from "react-native";
import NewsList from "@/shared/ui/NewsList";

const NEWS = [
  {
    id: "n1",
    title:
      "В этом году Казахстан будут представлять две команды, это действующие чемпионы турнира – команда ...",
    image: require("@/assets/images/sample/news1.jpg"), // пока заглушка
    bookmarked: false,
  },
  {
    id: "n2",
    title:
      "Федерация объявила расписание грядущего тура. Матчи начнутся в субботу в 18:00 по времени Астаны...",
    image: require("@/assets/images/sample/news2.jpg"), // пока заглушка
    bookmarked: true,
  },
];

export default function HomeNewsList() {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 16 }}>
      <NewsList
        items={NEWS}
        onPressItem={(id) => console.log("open news", id)}
        onToggleBookmark={(id) => console.log("toggle bookmark", id)}
      />
    </View>
  );
}
