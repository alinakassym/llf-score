// features/PlayerPosition.tsx
import React from "react";
import { View, Text, Image, ImageSourcePropType } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  title: string;
  subtitle: string;
  logo: ImageSourcePropType;
};

export default function PlayerPosition({ title, subtitle, logo }: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: colors.secondaryBg,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <Image
        source={logo}
        style={{
          width: 42,
          height: 42,
          borderRadius: 8,
          backgroundColor: colors.bg,
        }}
        resizeMode="cover"
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: colors.text,
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
          <Ionicons name="calendar-outline" size={14} color={colors.text} />
          <Text
            style={{
              color: colors.text,
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
            color: colors.text,
            opacity: 0.85,
            fontSize: 12,
          }}
        >
          Нападающий
        </Text>
      </View>
    </View>
  );
}
