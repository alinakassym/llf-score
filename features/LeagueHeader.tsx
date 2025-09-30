// features/LeagueHeader.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";

type Props = {
  title: string;
  year: string | number;
  logo: ImageSourcePropType;
  onPressYear?: () => void;
  onClose?: () => void; // ← добавили
};

export default function LeagueHeader({
  title,
  year,
  logo,
  onPressYear,
  onClose,
}: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();

  const handleClose = () => {
    if (onClose) onClose();
    else router.back(); // дефолт — просто вернуться назад
  };

  return (
    <LinearGradient
      colors={c.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingTop: Platform.OS === "ios" ? 16 : 52,
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
    >
      <Image
        source={logo}
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          backgroundColor: c.surface,
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 20,
            fontWeight: 700 as any,
          }}
          numberOfLines={1}
        >
          {title}
        </Text>

        <Pressable
          onPress={onPressYear}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: 4,
          }}
          accessibilityRole="button"
          accessibilityLabel="Выбрать сезон"
        >
          <Text
            style={{
              color: "#FFFFFF",
              opacity: 0.85,
              fontSize: 14,
              fontWeight: 600 as any,
            }}
          >
            {year}
          </Text>
          <Ionicons name="chevron-down" size={14} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Кнопка закрытия */}
      <Pressable
        onPress={handleClose}
        accessibilityRole="button"
        accessibilityLabel="Закрыть"
        hitSlop={10}
        style={{ padding: 4 }}
      >
        <Ionicons name="close" size={24} color="#FFFFFF" />
      </Pressable>
    </LinearGradient>
  );
}
