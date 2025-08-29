import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  children: React.ReactNode;
  /** Нужен ли ScrollView внутри */
  scroll?: boolean;
  /** Доп. стиль для KeyboardAvoidingView */
  style?: ViewStyle;
  /** Доп. стиль для ScrollView.contentContainerStyle */
  contentContainerStyle?: ViewStyle;
  /** Переопределить отступ снизу */
  paddingBottomOverride?: number;
};

export default function Screen({
  children,
  scroll = false,
  style,
  contentContainerStyle,
  paddingBottomOverride,
}: Props) {
  const { colors } = useAppTheme();

  const paddingBottom =
    paddingBottomOverride ?? Platform.select({ ios: 65, android: 0 });

  const body = scroll ? (
    <ScrollView
      keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={{ marginBottom: 0 }}
      contentContainerStyle={contentContainerStyle}
    >
      {children}
    </ScrollView>
  ) : (
    // когда скролл не нужен
    <>{children}</>
  );

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={[{ backgroundColor: colors.secondaryBg, paddingBottom }, style]}
    >
      {body}
    </KeyboardAvoidingView>
  );
}
