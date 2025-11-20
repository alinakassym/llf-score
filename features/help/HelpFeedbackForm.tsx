import GradientButton from "@/components/buttons/GradientButton";
import Textarea from "@/components/form/Textarea";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

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

  const disabled = submitting || value.trim().length === 0;

  function handlePress() {
    if (disabled) return;
    onSubmit?.(value.trim());
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: c.text }]}>{title}</Text>
      <Textarea
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={{ marginBottom: 12 }}
      />
      <GradientButton
        title="Отправить"
        onPress={handlePress}
        disabled={disabled}
        loading={submitting}
        accessibilityLabel="Отправить отзыв"
      />
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
});

export default HelpFeedbackForm;
