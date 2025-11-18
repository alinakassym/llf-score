// app/(tabs)/_layout.tsx
import { TabIcon } from "@/components/icons";
import { BottomSheetMenu, MenuOption } from "@/components/BottomSheetMenu";
import { Colors } from "@/constants/theme";
import SponsorsRow from "@/features/SponsorsRow";
import { TopBar } from "@/features/TopBar";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppSelector } from "@/store/hooks";
import { selectUserProfile } from "@/store/user.slice";
import { Tabs, useRouter } from "expo-router";
import React, { useState } from "react";
import { Platform, View } from "react-native";

export default function TabLayout() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();
  const userProfile = useAppSelector(selectUserProfile);
  const [menuVisible, setMenuVisible] = useState(false);
  console.log("userProfile: ", userProfile);
  const isAdmin = userProfile?.role === "admin";
  console.log("isAdmin: ", isAdmin);

  const menuOptions: MenuOption[] = [
    {
      id: "management",
      label: "Управление",
      icon: "docgear",
      onPress: () => router.push("/(tabs)/management"),
    },
    {
      id: "help",
      label: "Отзыв",
      icon: "comment",
      onPress: () => router.push("/(tabs)/help"),
    },
  ];

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
          name="more"
          options={{
            title: "Ещё",
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="dots" size={size} color={color} />
            ),
          }}
          listeners={() => ({
            tabPress: (e: any) => {
              e.preventDefault();
              setMenuVisible(true);
            },
          })}
        />
        {/* Скрываем management и help из табов, но оставляем как экраны */}
        <Tabs.Screen
          name="management"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="help"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <BottomSheetMenu
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        options={menuOptions}
      />
    </View>
  );
}
