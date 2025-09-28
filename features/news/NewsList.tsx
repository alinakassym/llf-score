import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
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
  const scheme = useThemeMode();
  const c = Colors[scheme];
  return (
    <View>
      {items.map((n, index) => (
        <React.Fragment key={n.id}>
          <NewsCard
            key={n.id}
            {...n}
            onPress={onPressItem}
            onToggleBookmark={onToggleBookmark}
          />
          {index + 1 < items.length && (
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
                borderBottomColor: c.border,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
