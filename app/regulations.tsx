// app/regulations.tsx
import { Screen } from "@/components/Screen";
import { WebViewHeader } from "@/components/WebViewHeader";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

export default function RegulationsScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <Screen style={{ backgroundColor: c.background }}>
      <WebViewHeader title="Регламент" />
      <WebView
        source={{
          uri: "https://llf-ast.kz/reglament/546-reglament-provedeniya-chempionata-po-lyubitelskomu-mini-futbolu-v-formate-6kh6-2016.html?tmpl=component&print=1&layout=default&page=",
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
