import { TabIcon } from "@/components/icons/tab-icons";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const scheme = useThemeMode();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[scheme].primary,
        tabBarInactiveTintColor: Colors[scheme].textMuted,
        tabBarStyle: {
          backgroundColor: Colors[scheme].background,
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
  );
}
