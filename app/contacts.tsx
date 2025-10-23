// app/contacts.tsx
import { Screen } from "@/components/Screen";
import { WebViewHeader } from "@/components/WebViewHeader";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { Text, View } from "react-native";

export default function ContactsScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <Screen style={{ backgroundColor: c.background }}>
      <WebViewHeader title="Контакты" />
      <View style={{ padding: 16 }}>
        <Text>Контакты</Text>
      </View>
    </Screen>
  );
}
