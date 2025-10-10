// app/rules.tsx
import { Screen } from "@/components/Screen";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function RulesScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <Screen style={{ backgroundColor: c.background }}>
      <Text
        style={{
          padding: 16,
          fontSize: 24,
          fontWeight: "700",
          color: c.text,
          borderBottomWidth: 1,
          borderBottomColor: c.border,
        }}
      >
        Правила ЛЛФ
      </Text>
      <WebView
        source={{
          uri: "https://llf-ast.kz/pravila/307-pravila-llf-2.html?tmpl=component&print=1&layout=default&page=",
        }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        renderLoading={() => (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: c.background,
            }}
          >
            <ActivityIndicator size="large" color={c.primary} />
          </View>
        )}
      />
    </Screen>
  );
}
