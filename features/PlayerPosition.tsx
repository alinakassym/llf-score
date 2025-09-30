// features/PlayerPosition.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  logo: ImageSourcePropType;
};

export default function PlayerPosition({ title, subtitle, logo }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View style={{ paddingHorizontal: 8, marginBottom: 46 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
          paddingHorizontal: 8,
          paddingVertical: 8,
          backgroundColor: c.bgOpacity,
          borderRadius: 8,
        }}
      >
        <Image
          source={logo}
          style={{
            width: 42,
            height: 42,
            borderRadius: 8,
            backgroundColor: c.background,
          }}
          resizeMode="cover"
        />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: c.text,
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
          >
            <Ionicons name="calendar-outline" size={14} color={c.text} />
            <Text
              style={{
                color: c.text,
                opacity: 0.85,
                fontSize: 12,
                fontWeight: 600 as any,
              }}
            >
              {subtitle}
            </Text>
          </View>
        </View>

        <View style={{ padding: 4 }}>
          <Text
            style={{
              color: c.text,
              opacity: 0.85,
              fontSize: 12,
            }}
          >
            Нападающий
          </Text>
        </View>
      </View>
    </View>
  );
}
