// features/StatusDot.tsx
import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type StatusKind = "free" | "transfer" | "contract";

type Props = {
  kind: StatusKind;
  /** Показать подпись справа от кружка (для легенды). По умолчанию false. */
  showLabel?: boolean;
  /** Размер кружка в px (по умолчанию 14). */
  size?: number;
  /** Переопределить текст метки (если нужен другой перевод). */
  labelOverride?: string;
  /** Доп. стиль контейнера (рядом с текстом) */
  style?: any;
  /** Размер иконки (по умолчанию автоматически size * 0.72) */
  iconSize?: number;
};

export default function StatusDot({
  kind,
  showLabel = false,
  size = 14,
  labelOverride,
  style,
  iconSize,
}: Props) {
  const { colors, typography } = useAppTheme();
  const map = {
    free: {
      color: colors?.green ?? "#22C55E",
      icon: "checkmark" as const,
      label: "Свободный игрок",
    },
    transfer: {
      color: colors?.orange ?? "#F59E0B",
      icon: "checkmark" as const,
      label: "Доступный для трансфера",
    },
    contract: {
      color: colors?.red ?? "#EF4444",
      icon: "close" as const,
      label: "Связанный контрактом",
    },
  } as const;

  const cfg = map[kind];
  const dot = (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: cfg.color,
        alignItems: "center",
        justifyContent: "center",
      }}
      accessibilityRole="image"
      accessibilityLabel={labelOverride ?? cfg.label}
    >
      <Ionicons
        name={cfg.icon}
        size={iconSize ?? Math.round(size * 0.72)}
        color="#fff"
      />
    </View>
  );

  if (!showLabel) return dot;

  return (
    <View
      style={[{ flexDirection: "row", alignItems: "center", gap: 8 }, style]}
    >
      {dot}
      <Text style={{ ...(typography?.text || {}), color: colors.text }}>
        {labelOverride ?? cfg.label}
      </Text>
    </View>
  );
}
