import React from 'react';
import { Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, useColorScheme } from 'react-native';
import { TabBarIcon } from '@/shared/icons/TabBarIcon';
import { useThemeMode } from '@/shared/theme/useThemeMode';

export default function TabLayout() {
  const scheme = useThemeMode();
  const isLight = scheme === 'light';
  const tintColor = isLight ? '#FFFFFF' : '#000000';

  const gradientColors: [string, string] = isLight
    ? ['#5069D8', '#9464AF']                              
    : ['rgba(80,105,216,0.8)', '#9464AF'];               


  return (
    <Tabs
    screenOptions={{
      headerShown: false,              
      tabBarShowLabel: false,
      tabBarActiveTintColor: tintColor,
      tabBarInactiveTintColor: tintColor,
      tabBarStyle: {
        height: Platform.select({ ios: 80, android: 65, web: 65 }),
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        paddingTop: 6,
        paddingBottom: Platform.select({ ios: 12, android: 10, web: 10 }),
        ...Platform.select({
          web: { position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 10 }
        }),
      },
      tabBarBackground: () => (
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      ),
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Main',
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon name="home" focused={focused} size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="leagues"
        options={{
          title: 'Leagues',
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon name="leagues" focused={focused} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rating"
        options={{
          title: 'Rating',
          tabBarItemStyle: { paddingBottom: 2 },
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon name="rating" focused={focused} size={size + 2} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: 'Transfers',
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon name="transfers" focused={focused} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ focused, size, color }) => (
            <TabBarIcon name="help" focused={focused} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
