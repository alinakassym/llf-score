import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TouchableOpacityProps,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = TouchableOpacityProps & {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number; // icon size
  buttonSize?: number; // button size (width/height)
  variant?: "ghost" | "filled";
  rounded?: boolean; // rounding: true = circular
  color?: string; // override icon color
  bgColor?: string; // override background color
  dot?: boolean; // small red dot
  badgeCount?: number; // number in the badge
};

export default function IconButton({
  name,
  size = 22,
  buttonSize = 36,
  variant = "ghost",
  rounded = true,
  color = "#000",
  bgColor = "transparent",
  dot,
  badgeCount,
  style,
  ...rest
}: Props) {
  const { colors } = useAppTheme();
  const showBadge = typeof badgeCount === "number" && badgeCount > 0;

  return (
    <TouchableOpacity
      {...rest}
      hitSlop={8}
      accessibilityRole="button"
      activeOpacity={0.7}
      style={[
        {
          postion: "relative",
          width: buttonSize,
          height: buttonSize,
          alignItems: "center",
          justifyContent: "center",
        },
        style as any,
      ]}
    >
      <Ionicons name={name} size={size} color={color} />

      {dot && !showBadge ? (
        <View
          style={{
            position: "absolute",
            top: 6,
            right: 8,
            width: 8,
            height: 8,
            borderRadius: 10,
            backgroundColor: colors.red,
          }}
        />
      ) : null}

      {showBadge ? (
        <View
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            minWidth: 16,
            height: 16,
            paddingHorizontal: 4,
            borderRadius: 10,
            backgroundColor: colors.red,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 10, fontWeight: "700" }}>
            {badgeCount > 99 ? "99+" : badgeCount}
          </Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
