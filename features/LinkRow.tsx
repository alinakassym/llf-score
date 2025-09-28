import { Divider } from "@/components/Divider";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  label: string;
  showDivider?: boolean;
};

export default function LinkRow({ label, showDivider = true }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={{
        backgroundColor: c.background,
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
        <FontAwesome name="circle-o" size={16} color={c.primary} />
        <Text
          style={{
            fontSize: 12,
            color: c.text,
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>
      {showDivider && <Divider style={{ backgroundColor: c.border }} />}
    </TouchableOpacity>
  );
}
