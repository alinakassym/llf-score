import React from "react";
import { Pressable, View, Text } from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export type TabItem<K extends string = string> = {
  key: K;
  label: string;
  disabled?: boolean;
};

type TabsProps<K extends string = string> = {
  tabs: TabItem<K>[];
  value: K;
  onChange: (key: K) => void;
  /** оформление: underline — линия снизу, solid — заливка активного */
  variant?: "underline" | "solid";
  /** растягивать на всю ширину */
  stretch?: boolean;
  /** размер текста */
  size?: 12 | 14 | 16;
  /** внешние отступы */
  style?: any;
};

export default function Tabs<K extends string = string>({
  tabs,
  value,
  onChange,
  variant = "solid",
  stretch = true,
  size = 12,
  style,
}: TabsProps<K>) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          borderBottomWidth: variant === "underline" ? 1 : 0,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      {tabs.map((t) => {
        const isActive = t.key === value;
        const base = {
          paddingVertical: 10,
          paddingHorizontal: 16,
          alignItems: "center" as const,
          justifyContent: "center" as const,
          flex: stretch ? 1 : undefined,
          opacity: t.disabled ? 0.5 : 1,
        };
        const bg =
          variant === "solid"
            ? {
                backgroundColor: isActive ? colors.primary : colors.bg,
              }
            : {};
        const underline =
          variant === "underline"
            ? {
                borderBottomWidth: 2,
                borderColor: isActive ? colors.primary : "transparent",
              }
            : {};

        return (
          <Pressable
            key={t.key}
            disabled={t.disabled}
            onPress={() => onChange(t.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive, disabled: !!t.disabled }}
            style={[base, bg, underline]}
          >
            <Text
              style={{
                fontSize: size,
                textTransform: "uppercase",
                color:
                  variant === "solid"
                    ? isActive
                      ? "#FFF"
                      : colors.primary
                    : isActive
                      ? colors.text
                      : colors.textLight,
              }}
              numberOfLines={1}
            >
              {t.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
