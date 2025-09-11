import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
  variant?: "underline" | "solid" | "outline";
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
          paddingHorizontal: 2,
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
          paddingVertical: 4,
          paddingHorizontal: 2,
          justifyContent: "center" as const,
          flex: stretch ? 1 : undefined,
          opacity: t.disabled ? 0.5 : 1,
        };
        const btn = {
          alignItems: "center",
          paddingVertical: 8,
          borderRadius: 8,
        };
        const bg =
          variant === "solid"
            ? {
                backgroundColor: isActive ? colors.dark : colors.opacity,
              }
            : variant === "outline"
              ? {
                  backgroundColor: isActive ? colors.primary : colors.opacity,
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
          <View style={[base, underline]}>
            <TouchableOpacity
              activeOpacity={0.7}
              key={t.key}
              disabled={t.disabled}
              style={{ ...btn, ...bg } as any}
              onPress={() => onChange(t.key)}
              accessibilityRole="tab"
              accessibilityState={{
                selected: isActive,
                disabled: !!t.disabled,
              }}
            >
              <Text
                style={{
                  fontSize: size,
                  textTransform: "uppercase",
                  color:
                    variant === "solid"
                      ? "#FFFFFF"
                      : isActive
                        ? "#FFFFFF"
                        : colors.text,
                }}
                numberOfLines={1}
              >
                {t.label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
