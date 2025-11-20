// app/(tabs)/management.tsx
import { ManagementCard } from "@/features/management/ManagementCard";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export default function TabManagementScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <ManagementCard
          title="Управление пользователями"
          description="Здесь будут функции для управления пользователями"
        />

        <ManagementCard
          title="Управление лигами"
          description="Просмотр, добавление и редактирование лиг"
          onPress={() => router.push("/leagues-management")}
        />

        <ManagementCard
          title="Управление матчами"
          description="Здесь будут функции для управления матчами"
        />

        <ManagementCard
          title="Настройки системы"
          description="Здесь будут настройки системы"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
