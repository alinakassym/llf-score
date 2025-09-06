// features/LeagueHeader.tsx
import React from "react";
import {
  View,
  Text,
  Image,
  ImageSourcePropType,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

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
  const { colors } = useAppTheme();
  const router = useRouter();

  const handleClose = () => {
    if (onClose) onClose();
    else router.back(); // дефолт — просто вернуться назад
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: colors.bg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Image
        source={logo}
        style={{
          width: 44,
          height: 44,
          borderRadius: 8,
          backgroundColor: colors.secondaryBg,
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.text,
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
              color: colors.text,
              opacity: 0.85,
              fontSize: 14,
              fontWeight: 600 as any,
            }}
          >
            {year}
          </Text>
          <Ionicons name="chevron-down" size={14} color={colors.text} />
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
        <Ionicons name="close" size={24} color={colors.text} />
      </Pressable>
    </View>
  );
}
