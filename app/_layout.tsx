// app/_layout.tsx
import { LoadingScreen } from "@/components/LoadingScreen";
import { SessionProvider, useSession } from "@/contexts/auth-context";
import { store } from "@/store/store";
import { Stack } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

function RootLayoutNav() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </Provider>
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: true,
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
          <Stack.Screen
            name="league"
            options={{
              headerShown: false,
              presentation:
                Platform.OS === "android" ? "transparentModal" : "modal",
              animation: Platform.OS === "android" ? "fade" : "default",
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="regulations"
            options={{
              headerShown: false,
              presentation:
                Platform.OS === "android" ? "transparentModal" : "modal",
              animation: Platform.OS === "android" ? "fade" : "default",
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="competition-plan"
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

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  );
}
