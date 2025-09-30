// features/LeagueTabs.tsx
import Tabs from "@/components/Tabs";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

type TabKey = "table" | "results" | "calendar";

const TABS: { key: TabKey; label: string }[] = [
  { key: "table", label: "Таблица" },
  { key: "results", label: "Результаты" },
  { key: "calendar", label: "Расписание" },
];

export default function LeagueTabs() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [active, setActive] = useState<TabKey>("table");

  return (
    <View style={{ flex: 1 }}>
      {/* Верхняя панель табов */}
      <LinearGradient
        colors={c.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Tabs
          tabs={TABS}
          value={active}
          onChange={setActive}
          variant="solid"
          stretch
          size={12}
        />
      </LinearGradient>

      {/* Контент вкладок */}
      <ScrollView style={{ paddingBottom: 80 }}>
        {active === "table" && (
          <Text
            style={{
              paddingTop: 16,
              paddingHorizontal: 16,
              color: c.textMuted,
            }}
          >
            Здесь будет таблица
          </Text>
        )}
        {active === "results" && (
          <Text
            style={{
              paddingTop: 16,
              paddingHorizontal: 16,
              color: c.textMuted,
            }}
          >
            Здесь будет таблица
          </Text>
        )}
        {active === "calendar" && (
          <Text
            style={{
              paddingTop: 16,
              paddingHorizontal: 16,
              color: c.textMuted,
            }}
          >
            Здесь будет календарь матчей.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
