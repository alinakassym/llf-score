import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Props = {
  title?: string;
  placeholder?: string;
  submitting?: boolean;
  onSubmit?: (text: string) => void;
};

export const HelpFeedbackForm: FC<Props> = ({
  title = "Напишите ваш отзыв",
  placeholder = "Текст сообщения…",
  submitting = false,
  onSubmit,
}: Props) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [value, setValue] = useState("");
  const gradient: any = [c.primary, c.secondary, c.tertiary];

  const disabled = submitting || value.trim().length === 0;

  function handlePress() {
    if (disabled) return;
    onSubmit?.(value.trim());
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: c.text }]}>{title}</Text>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={c.muted}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
        style={[
          styles.input,
          {
            color: c.text,
            backgroundColor: c.card,
            borderColor: c.border,
          },
        ]}
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
          colors={gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 3 }}
          style={{
            flex: 1,
            padding: 16,
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
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
});

export default HelpFeedbackForm;
