// shared/ui/LeagueTabs.tsx
import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { createLeagueTableColumns } from "@/features/ui/leagueTable.columns";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import Table from "@/shared/ui/Table";
import MatchList from "@/shared/ui/MatchList";
import { matchRows } from "@/shared/mocks/matchRows";
import { leagueRows, OrderRow } from "@/shared/mocks/leagueRows";

type TabKey = "table" | "results" | "calendar";

const TABS: { key: TabKey; label: string }[] = [
  { key: "table", label: "Таблица" },
  { key: "results", label: "Результаты" },
  { key: "calendar", label: "Календарь" },
];

export default function LeagueTabs() {
  const { colors } = useAppTheme();
  const cols = React.useMemo(() => createLeagueTableColumns(colors), [colors]);
  const [active, setActive] = useState<TabKey>("table");

  return (
    <View>
      {/* Верхняя панель табов */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomWidth: 1,
          borderColor: colors.border,
        }}
      >
        {TABS.map((t) => {
          const isActive = active === t.key;
          return (
            <Pressable
              key={t.key}
              onPress={() => setActive(t.key)}
              style={{
                paddingVertical: 10,
                display: "flex",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isActive
                  ? colors.primary
                  : colors.primaryLight,
              }}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
            >
              <Text
                style={{
                  fontSize: 12,
                  textTransform: "uppercase",
                  color: isActive ? "#FFF" : colors.primary,
                }}
              >
                {t.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Контент вкладок */}
      <View style={{ paddingLeft: 0 }}>
        {active === "table" && (
          <Table<OrderRow>
            columns={cols}
            data={leagueRows}
            keyExtractor={(r) => r.number}
            backgroundColor={colors.bg}
            color={colors.text}
            borderColor={colors.border}
            hightlightColor={colors.secondaryBg}
          />
        )}
        {active === "results" && <MatchList items={matchRows as any} />}
        {active === "calendar" && (
          <Text
            style={{
              paddingTop: 16,
              paddingHorizontal: 16,
              color: colors.textLight,
            }}
          >
            Здесь будет календарь матчей.
          </Text>
        )}
      </View>
    </View>
  );
}
