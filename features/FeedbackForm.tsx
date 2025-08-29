import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  title?: string;
  placeholder?: string;
  submitting?: boolean;
  onSubmit?: (text: string) => void;
};

export default function FeedbackForm({
  title = "Напишите ваш отзыв",
  placeholder = "Текст сообщения…",
  submitting = false,
  onSubmit,
}: Props) {
  const { colors } = useAppTheme();
  const [value, setValue] = useState("");

  const disabled = submitting || value.trim().length === 0;

  function handlePress() {
    if (disabled) return;
    onSubmit?.(value.trim());
  }

  return (
    <View
      style={{
        gap: 12,
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: colors.bg,
      }}
    >
      <Text
        style={{ fontSize: 16, fontWeight: 700 as any, color: colors.text }}
      >
        {title}
      </Text>

      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={colors.textLight}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
        style={{
          minHeight: 120,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          paddingHorizontal: 12,
          paddingVertical: 12,
          color: colors.text,
          backgroundColor: colors.bg,
        }}
        accessibilityLabel="Поле для отзыва"
      />

      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel="Отправить отзыв"
        style={{
          borderRadius: 12,
          overflow: "hidden",
          opacity: disabled ? 0.7 : 1,
        }}
      >
        <LinearGradient
          colors={["#4F6CF3", "#A15CCF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            height: 48,
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {submitting ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text
              style={{ color: "#FFF", fontSize: 16, fontWeight: 600 as any }}
            >
              Отправить
            </Text>
          )}
        </LinearGradient>
      </Pressable>
    </View>
  );
}
