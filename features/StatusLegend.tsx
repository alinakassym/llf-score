// features/StatusLegend.tsx
import React from "react";
import { View } from "react-native";
import StatusDot from "@/features/StatusDot";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function StatusLegend() {
  const { colors } = useAppTheme();

  return (
    <View
      style={{
        flexDirection: "column",
        flexWrap: "nowrap",
        gap: 8,
        padding: 16,
        paddingBottom: 18,
        backgroundColor: colors.bg,
      }}
      accessibilityRole="summary"
    >
      <StatusDot kind="free" showLabel />
      <StatusDot kind="transfer" showLabel />
      <StatusDot kind="contract" showLabel />
    </View>
  );
}
