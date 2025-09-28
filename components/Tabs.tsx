import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View
      style={[
        {
          paddingHorizontal: 2,
          flexDirection: "row",
          borderBottomWidth: variant === "underline" ? 1 : 0,
          borderColor: c.border,
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
                backgroundColor: isActive ? c.dark : c.opacity,
              }
            : variant === "outline"
              ? {
                  backgroundColor: isActive ? c.primary : c.opacity,
                }
              : {};
        const underline =
          variant === "underline"
            ? {
                borderBottomWidth: 2,
                borderColor: isActive ? c.primary : "transparent",
              }
            : {};

        return (
          <View key={t.key} style={[base, underline]}>
            <TouchableOpacity
              activeOpacity={0.7}
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
                        : c.text,
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
