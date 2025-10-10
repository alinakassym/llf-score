// app/rules.tsx
import { Screen } from "@/components/Screen";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function RulesScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <Screen style={{ backgroundColor: c.background }}>
      <ScrollView style={{ flex: 1, padding: 16 }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "700",
            color: c.text,
            marginBottom: 16,
          }}
        >
          Правила
        </Text>

        <View style={{ marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              color: c.textMuted,
              lineHeight: 24,
            }}
          >
            Здесь будут отображаться правила игры
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
