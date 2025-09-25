// app/(tabs)/_layout.tsx
import { TabIcon } from "@/components/icons";
import { Colors } from "@/constants/theme";
import SponsorsRow from "@/features/SponsorsRow";
import { TopBar } from "@/features/TopBar";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";

export default function TabLayout() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  return (
    <View style={{ flex: 1 }}>
      <SponsorsRow />
      <TopBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: Colors[scheme].primary,
          tabBarInactiveTintColor: Colors[scheme].textMuted,
          tabBarPosition: "bottom",
          tabBarLabelStyle: { marginTop: 4 },
          tabBarStyle: {
            height: Platform.select({ ios: 90, android: 75, web: 75 }),
            backgroundColor: Colors[scheme].background,
            borderTopWidth: 1,
            borderTopColor: Colors[scheme].border,
            paddingTop: 6,
            paddingBottom: Platform.select({ ios: 12, android: 10, web: 10 }),
          },
          sceneStyle: {
            backgroundColor: Colors[scheme].surface,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Главная",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="leagues"
          options={{
            title: "Лиги",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="trophy" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="rating"
          options={{
            title: "Рейтинг",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="ranking" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="transfers"
          options={{
            title: "Трансферы",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="arrows" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="help"
          options={{
            title: "Отзыв",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="comment" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
