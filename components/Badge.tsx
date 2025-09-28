import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  type: "success" | "error" | "warning";
  children: React.ReactNode;
};

export function Badge({ type, children }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  // Используем цвета из темы в зависимости от типа
  const backgroundColor =
    type === "success"
      ? scheme === "light"
        ? "#EDFCF2"
        : "rgba(52, 211, 153, 0.1)"
      : type === "error"
        ? scheme === "light"
          ? "#FEF1F1"
          : "rgba(220, 38, 38, 0.1)"
        : scheme === "light"
          ? "#FFF3EA"
          : "rgba(251, 191, 36, 0.1)";

  const textColor =
    type === "success" ? c.success : type === "error" ? c.error : c.warning;

  return (
    <View
      style={{
        height: 22,
        minWidth: 40,
        paddingHorizontal: 2,
        borderRadius: 4,
        backgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: textColor, fontSize: 11 }}>{children}</Text>
    </View>
  );
}
