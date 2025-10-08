import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";

export function LoadingScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <ActivityIndicator size="large" color={c.primary} />
      <Text style={[styles.text, { color: c.text }]}>LLF SCORE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  text: {
    fontSize: 32,
    fontWeight: "800",
  },
});
