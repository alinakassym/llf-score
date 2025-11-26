// app/_layout.tsx
import { LoadingScreen } from "@/components/LoadingScreen";
import { SessionProvider, useSession } from "@/contexts/auth-context";
import { useAppDispatch } from "@/store/hooks";
import { store } from "@/store/store";
import { fetchUserFullProfile, fetchUserProfile } from "@/store/user.slice";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

function RootLayoutNav() {
  const { session, isLoading } = useSession();
  const dispatch = useAppDispatch();

  // Загружаем профиль пользователя при старте приложения если есть сессия
  useEffect(() => {
    if (session && !isLoading) {
      console.log("Loading user profiles...");
      dispatch(fetchUserProfile())
        .unwrap()
        .then((profile) => {
          console.log("User profile loaded:", profile);
        })
        .catch((error) => {
          console.error("Failed to load user profile:", error);
        });
      dispatch(fetchUserFullProfile());
    }
  }, [session, isLoading, dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!session) {
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack>
    );
  }

  return (
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
          gestureEnabled: false,
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
      <Stack.Screen
        name="rules"
        options={{
          headerShown: false,
          presentation:
            Platform.OS === "android" ? "transparentModal" : "modal",
          animation: Platform.OS === "android" ? "fade" : "default",
          gestureEnabled: true,
        }}
      />
      <Stack.Screen
        name="contacts"
        options={{
          headerShown: false,
          presentation:
            Platform.OS === "android" ? "transparentModal" : "modal",
          animation: Platform.OS === "android" ? "fade" : "default",
          gestureEnabled: true,
        }}
      />

      <Stack.Screen
        name="create-profile"
        options={{
          headerShown: false,
          presentation:
            Platform.OS === "android" ? "transparentModal" : "modal",
          animation: Platform.OS === "android" ? "fade" : "default",
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="leagues-management"
        options={{
          headerShown: false,
          presentation:
            Platform.OS === "android" ? "transparentModal" : "modal",
          animation: Platform.OS === "android" ? "fade" : "default",
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <RootLayoutNav />
        </SafeAreaProvider>
      </Provider>
    </SessionProvider>
  );
}
