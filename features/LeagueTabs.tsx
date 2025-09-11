// features/LeagueTabs.tsx
import React, { useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { createLeagueTableColumns } from "@/features/ui/leagueTable.columns";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import Table from "@/shared/ui/Table";
import MatchList from "@/shared/ui/MatchList";
import { matchRows } from "@/shared/mocks/matchRows";
import { leagueRows, OrderRow } from "@/shared/mocks/leagueRows";
import Tabs from "@/shared/ui/Tabs";

type TabKey = "table" | "results" | "calendar";

const TABS: { key: TabKey; label: string }[] = [
  { key: "table", label: "Таблица" },
  { key: "results", label: "Результаты" },
  { key: "calendar", label: "Расписание" },
];

export default function LeagueTabs() {
  const { colors } = useAppTheme();
  const cols = React.useMemo(() => createLeagueTableColumns(colors), [colors]);
  const [active, setActive] = useState<TabKey>("table");

  return (
    <View style={{ flex: 1 }}>
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
      </ScrollView>
    </View>
  );
}
