// app/_layout.tsx
import { useThemeMode } from "@/hooks/use-theme-mode";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function RootLayout() {
  const scheme = useThemeMode();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="profile"
            options={{
              headerShown: false,
              presentation:
                Platform.OS === "android" ? "transparentModal" : "modal",
              animation: Platform.OS === "android" ? "fade" : "default",
              gestureEnabled: true,
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
