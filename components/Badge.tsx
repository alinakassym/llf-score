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
    type === "success" ? c.green : type === "error" ? c.red : c.orange;

  const textColor =
    type === "success" ? c.green : type === "error" ? c.red : c.orange;

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
      <Text style={{ color: c.white, fontSize: 11 }}>{children}</Text>
    </View>
  );
}
