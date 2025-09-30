// features/LeagueTabs.tsx
import Tabs from "@/components/Tabs";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
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
    <View style={{ marginTop: -46, flex: 1 }}>
      {/* Верхняя панель табов */}
      <Tabs
        tabs={TABS}
        value={active}
        onChange={setActive}
        variant="solid"
        stretch
        size={12}
      />

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
