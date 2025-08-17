import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Platform, Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { TabBarIcon } from '@/components/icons/TabBarIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
    screenOptions={{
      headerShown: false,              
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#FFFFFF',
      tabBarInactiveTintColor: 'rgba(255,255,255,0.7)',
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
          colors={['#5069D8', '#9464AF']}
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
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon name="home" focused={focused} size={size} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="leagues"
        options={{
          title: 'Leagues',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon name="leagues" focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="rating"
        options={{
          title: 'Rating',
          tabBarItemStyle: { paddingBottom: 2 },
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name="rating" focused={focused} size={32} />
          ),
        }}
      />
      <Tabs.Screen
        name="transfers"
        options={{
          title: 'Transfers',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon name="transfers" focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="help"
        options={{
          title: 'Help',
          tabBarIcon: ({ focused, size }) => (
            <TabBarIcon name="help" focused={focused} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
