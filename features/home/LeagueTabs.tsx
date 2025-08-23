// shared/ui/LeagueTabs.tsx
import { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import Table from "@/shared/ui/Table";

type TabKey = "table" | "results" | "calendar";

const TABS: { key: TabKey; label: string }[] = [
  { key: "table", label: "Таблица" },
  { key: "results", label: "Результаты" },
  { key: "calendar", label: "Календарь" },
];

export default function LeagueTabs() {
  const { colors } = useAppTheme();

  const [active, setActive] = useState<TabKey>("table");

  return (
    <View>
      {/* Верхняя панель табов */}
      <View style={{ flexDirection: "row", gap: 16, paddingHorizontal: 4 }}>
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <Pressable
              key={t.key}
              onPress={() => setActive(t.key)}
              style={{ paddingVertical: 10 }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.text,
                }}
              >
                {t.label}
              </Text>
              {/* Индикатор под активным табом */}
              <View
                style={{
                  height: 2,
                  marginTop: 6,
                  borderRadius: 3,
                  backgroundColor: isActive ? colors.primary : "transparent",
                }}
              />
            </Pressable>
          );
        })}
      </View>

      {/* Контент вкладок */}
      <View style={{ marginTop: 12 }}>
        {active === "table" && (
          <>
            <Text>Здесь будет таблица лиги (LIVE/итоги).</Text>
            <Table />
          </>
        )}
        {active === "results" && <Text>Здесь будут результаты матчей.</Text>}
        {active === "calendar" && <Text>Здесь будет календарь матчей.</Text>}
      </View>
    </View>
  );
}
