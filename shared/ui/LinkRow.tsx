import React from "react";
import { Pressable, View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Divider } from "@/components/ui/divider";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  label: string;
  showDivider?: boolean;
};

export default function LinkRow({ label, showDivider = true }: Props) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      style={{
        backgroundColor: colors.bg,
      }}
    >
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 16,
          flexDirection: "row",
          alignItems: "center",
          gap: 12,
        }}
      >
        <FontAwesome name="circle-o" size={16} color={colors.primary} />
        <Text
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: colors.text,
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
      {showDivider && <Divider />}
    </Pressable>
  );
}
