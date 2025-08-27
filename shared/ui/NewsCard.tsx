import { Image, Pressable, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type NewsItem = {
  id: string;
  title: string;
  image: any; // ImageSourcePropType
  bookmarked?: boolean;
  onPress?: (id: string) => void;
  onToggleBookmark?: (id: string) => void;
};

export default function NewsCard({
  id,
  title,
  image,
  bookmarked,
  onPress,
  onToggleBookmark,
}: NewsItem) {
  const { colors } = useAppTheme();
  return (
    <Pressable
      onPress={() => onPress?.(id)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        backgroundColor: colors.primaryLight,
        borderRadius: 16,
      }}
    >
      <Image
        source={image}
        style={{ width: 60, height: 60, borderRadius: 16 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, color: colors.text }}>{title}</Text>
      </View>

      <Pressable
        onPress={() => onToggleBookmark?.(id)}
        hitSlop={12}
        style={{ paddingLeft: 8 }}
      >
        <Ionicons
          name={bookmarked ? "bookmark" : "bookmark-outline"}
          size={26}
          color={colors.primary}
        />
      </Pressable>
    </Pressable>
  );
}
