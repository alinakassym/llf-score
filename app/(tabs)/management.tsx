// app/(tabs)/management.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TabManagementScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: c.text }]}>
            Панель управления
          </Text>
          <Text style={[styles.subtitle, { color: c.textMuted }]}>
            Административные функции
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: c.card }]}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>
            Управление пользователями
          </Text>
          <Text style={[styles.sectionText, { color: c.textMuted }]}>
            Здесь будут функции для управления пользователями
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.section, { backgroundColor: c.card }]}
          onPress={() => router.push("/leagues-management")}
        >
          <View style={styles.sectionHeader}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.sectionTitle, { color: c.text }]}>
                Управление лигами
              </Text>
              <Text style={[styles.sectionText, { color: c.textMuted }]}>
                Просмотр, добавление и редактирование лиг
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={c.textMuted} />
          </View>
        </TouchableOpacity>

        <View style={[styles.section, { backgroundColor: c.card }]}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>
            Управление матчами
          </Text>
          <Text style={[styles.sectionText, { color: c.textMuted }]}>
            Здесь будут функции для управления матчами
          </Text>
        </View>

        <View style={[styles.section, { backgroundColor: c.card }]}>
          <Text style={[styles.sectionTitle, { color: c.text }]}>
            Настройки системы
          </Text>
          <Text style={[styles.sectionText, { color: c.textMuted }]}>
            Здесь будут настройки системы
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
