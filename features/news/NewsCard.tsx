import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";

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
  const scheme = useThemeMode();
  const c = Colors[scheme];
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPress?.(id)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        backgroundColor: c.bgOpacity,
      }}
    >
      <Image
        source={image}
        style={{ width: 60, height: 60, borderRadius: 16 }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, color: c.text }}>{title}</Text>
      </View>

      {onPress && (
        <Pressable
          onPress={() => onToggleBookmark?.(id)}
          hitSlop={12}
          style={{ paddingLeft: 8 }}
        >
          <Ionicons
            name={bookmarked ? "bookmark" : "bookmark-outline"}
            size={26}
            color={c.primary}
          />
        </Pressable>
      )}
    </TouchableOpacity>
  );
}
