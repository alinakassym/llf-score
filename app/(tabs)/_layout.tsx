import React from 'react';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform } from 'react-native';
import { TabBarIcon } from '@/shared/icons/TabBarIcon';
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

export default function TabLayout() {
  const { colors } = useAppTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.bg,
        tabBarInactiveTintColor: colors.bg,
        tabBarStyle: {
          height: Platform.select({ ios: 90, android: 75, web: 75 }),
          backgroundColor: "transparent",
          borderTopWidth: 0,
          paddingTop: 6,
          paddingBottom: Platform.select({ ios: 12, android: 10, web: 10 }),
          ...Platform.select({
            web: {
              position: "fixed",
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 10,
            },
          }),
          boxShadow: "0px 0px 16px rgba(0,0,0,0.5)",
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              name="home"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leagues"
        options={{
          title: "Лиги",
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              name="leagues"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="rating"
        options={{
          title: "Рейтинг",
          tabBarItemStyle: { paddingBottom: 2 },
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              name="rating"
              focused={focused}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Трансферы",
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              name="transfers"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: "Отзыв",
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon
              name="help"
              focused={focused}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
