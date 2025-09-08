// features/StatusLegend.tsx
import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Item = {
  key: string;
  color: string; // цвет кружка
  icon: "checkmark" | "close";
  label: string;
};

function Dot({ color, icon }: { color: string; icon: Item["icon"] }) {
  return (
    <View
      style={{
        width: 14,
        height: 14,
        borderRadius: 9,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
      }}
      accessibilityRole="image"
    >
      <Ionicons name={icon} size={10} color="#fff" />
    </View>
  );
}

export default function StatusLegend() {
  const { colors, typography } = useAppTheme();

  const items: Item[] = [
    {
      key: "free",
      color: colors?.green ?? "#22C55E", // зелёный
      icon: "checkmark",
      label: "Свободный игрок",
    },
    {
      key: "transfer",
      color: colors?.orange ?? "#F59E0B", // оранжевый
      icon: "checkmark",
      label: "Доступный для трансфера",
    },
    {
      key: "contract",
      color: colors?.red ?? "#EF4444", // красный
      icon: "close",
      label: "Связанный контрактом",
    },
  ];

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
      {items.map((it) => (
        <View
          key={it.key}
          style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
          accessibilityLabel={it.label}
        >
          <Dot color={it.color} icon={it.icon} />
          <Text
            style={{
              ...typography.text,
              color: colors.text,
            }}
          >
            {it.label}
          </Text>
        </View>
      ))}
    </View>
  );
}
