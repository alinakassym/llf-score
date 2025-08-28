import React from "react";
import { Pressable, View, Text, Platform } from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  label: string;
  onPress?: () => void;
  leftCircleColor?: string; // цвет кружка (по умолчанию – цвет темы)
  right?: React.ReactNode; // например, иконка стрелки или счётчик
  showDivider?: boolean; // рисовать нижний разделитель
  disabled?: boolean;
  testID?: string;
};

export default function LinkRow({
  label,
  onPress,
  leftCircleColor,
  right,
  showDivider = true,
  disabled,
  testID,
}: Props) {
  const { colors } = useAppTheme();
  const circle = leftCircleColor ?? colors.primary;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: colors.primaryLight }}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        height: 52,
        backgroundColor: pressed ? colors.secondaryBg : colors.bg,
        opacity: disabled ? 0.6 : 1,
        borderBottomWidth: showDivider ? 1 : 0,
        borderColor: colors.border,
      })}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            width: 12,
            height: 12,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: circle,
            backgroundColor: "transparent", // пустой круг
          }}
        />
        <Text
          style={{
            fontSize: 14,
            color: colors.text,
          }}
          numberOfLines={1}
        >
          {label}
        </Text>
      </View>

      <View style={{ marginLeft: 12 }}>{right}</View>
    </Pressable>
  );
}
