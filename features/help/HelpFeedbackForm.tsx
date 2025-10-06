import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type Props = {};

export const HelpFeedbackForm: FC<Props> = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [feedback, setFeedback] = useState("");

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: c.text }]}>Напишите ваш отзыв</Text>
      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        placeholder="Текст сообщения..."
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
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
});

export default HelpFeedbackForm;
