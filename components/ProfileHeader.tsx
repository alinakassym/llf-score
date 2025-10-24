// features/ProfileHeader.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  title: string;
  year: string | number;
  logo: ImageSourcePropType;
  onClose?: () => void; // ← добавили
};

export default function ProfileHeader({ title, year, logo, onClose }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();

  const handleClose = () => {
    if (onClose) onClose();
    else router.back(); // дефолт — просто вернуться назад
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        paddingTop: Platform.OS === "ios" ? 16 : 52,
        paddingHorizontal: 8,
        paddingBottom: 8,

        // backgroundColor: c.bgOpacity,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Image
          source={logo}
          style={{
            width: 60,
            height: 60,
            borderRadius: 8,
            backgroundColor: c.surface,
          }}
          resizeMode="cover"
        />

        <View style={{ flex: 1, justifyContent: "flex-start" }}>
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 14,
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
                color: "#FFFFFF",
                opacity: 0.8,
                fontSize: 12,
              }}
            >
              {year}
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => router.push("/create-profile")}
            style={{
              paddingVertical: 4,
              paddingHorizontal: 8,
              flexDirection: "row",
              alignItems: "center",
              alignSelf: "flex-start",
              gap: 6,
              marginTop: 4,
              borderRadius: 6,
              backgroundColor: c.opacity,
            }}
            accessibilityRole="button"
            accessibilityLabel="Редактировать профиль"
          >
            <Ionicons name="pencil" size={12} color={"#FFFFFF"} />
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 12,
              }}
            >
              Редактировать профиль
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Кнопка закрытия */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleClose}
        style={{ padding: 4 }}
      >
        <Ionicons name="close" size={24} color={"#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );
}
