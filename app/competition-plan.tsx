// app/competition-plan.tsx
import { Screen } from "@/components/Screen";
import { WebViewHeader } from "@/components/WebViewHeader";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import WebView from "react-native-webview";

export default function CompetitionPlanScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <Screen style={{ backgroundColor: c.background }}>
      <WebViewHeader title="План соревнований" />
      <WebView
        source={{
          uri: "https://llf-webview.vercel.app/competition-plan",
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
