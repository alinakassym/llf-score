import { View } from "react-native";
import NewsCard, { NewsItem } from "./NewsCard";

export default function NewsList({
  items,
  onPressItem,
  onToggleBookmark,
}: {
  items: Omit<NewsItem, "onPress" | "onToggleBookmark">[];
  onPressItem?: (id: string) => void;
  onToggleBookmark?: (id: string) => void;
}) {
  return (
    <View style={{ gap: 8 }}>
      {items.map((n) => (
        <NewsCard
          key={n.id}
          {...n}
          onPress={onPressItem}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </View>
  );
}
