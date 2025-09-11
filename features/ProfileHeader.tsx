// features/ProfileHeader.tsx
import React from "react";
import {
  Platform,
  View,
  Text,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  title: string;
  year: string | number;
  logo: ImageSourcePropType;
  onClose?: () => void; // ← добавили
};

export default function ProfileHeader({ title, year, logo, onClose }: Props) {
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
        paddingTop: Platform.OS === "ios" ? 16 : 52,
        paddingHorizontal: 16,
        paddingBottom: 16,
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

        <View
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
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: 4,
          }}
          accessibilityRole="button"
          accessibilityLabel="Выбрать сезон"
        >
          <Ionicons name="pencil" size={14} color={colors.text} />
          <Text
            style={{
              color: colors.text,
              opacity: 0.85,
              fontSize: 12,
              fontWeight: 600 as any,
            }}
          >
            Редактировать профиль
          </Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка закрытия */}
      <TouchableOpacity
        onPress={handleClose}
        accessibilityRole="button"
        accessibilityLabel="Закрыть"
        hitSlop={10}
        style={{ padding: 4 }}
      >
        <Ionicons name="close" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
}
