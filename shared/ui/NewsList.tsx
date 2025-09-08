import React from "react";
import { View } from "react-native";
import NewsCard, { NewsItem } from "./NewsCard";
import { Divider } from "@/components/ui/divider";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function NewsList({
  items,
  onPressItem,
  onToggleBookmark,
}: {
  items: Omit<NewsItem, "onPress" | "onToggleBookmark">[];
  onPressItem?: (id: string) => void;
  onToggleBookmark?: (id: string) => void;
}) {
  const { colors } = useAppTheme();
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
            <Divider style={{ backgroundColor: colors.border }} />
          )}
        </React.Fragment>
      ))}
    </View>
  );
}
