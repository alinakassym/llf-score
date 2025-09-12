import React from 'react';
import { View } from "react-native";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { TabBarIcon } from "@/shared/icons/TabBarIcon";
import { VuesaxIcon } from "@/shared/icons/VuesaxIcon";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import SponsorsRow from "@/features/SponsorsRow";
import HomeTopBar from "@/features/HomeTopBar";

export default function TabLayout() {
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1 }}>
      <SponsorsRow />
      <HomeTopBar />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: {
            height: Platform.select({ ios: 90, android: 75, web: 75 }),
            backgroundColor: colors.bg,
            borderTopWidth: 1,
            borderTopColor: colors.border,
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
          },
        }}
      >
      <Tabs.Screen
        name="index"
        options={{
          title: "Главная",
          tabBarIcon: ({ size, color }) => (
            <VuesaxIcon name="home2" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="leagues"
        options={{
          title: "Лиги",
          tabBarIcon: ({ size, color }) => (
            <TabBarIcon
              name="leagues-flat"
              focused={false}
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
          tabBarItemStyle: { marginBottom: 0 },
          tabBarIcon: ({ size, color }) => (
            <TabBarIcon
              name="rating-flat"
              focused={false}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: "Трансферы",
          tabBarIcon: ({ size, color }) => (
            <TabBarIcon
              name="transfers-flat"
              focused={false}
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
          tabBarIcon: ({ size, color }) => (
            <TabBarIcon
              name="help-flat"
              focused={false}
              size={size}
              color={color}
            />
          ),
        }}
      />
      </Tabs>
    </View>
  );
}
