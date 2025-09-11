// features/PlayerTabs.tsx
import React, { useState } from "react";
import { Platform, ScrollView, View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createLeagueTableColumns } from "@/features/ui/leagueTable.columns";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import Table from "@/shared/ui/Table";
import MatchList from "@/shared/ui/MatchList";
import { matchRows } from "@/shared/mocks/matchRows";
import { leagueRows, OrderRow } from "@/shared/mocks/leagueRows";
import Tabs from "@/shared/ui/Tabs";

type TabKey = "games" | "career" | "transfers";

const TABS: { key: TabKey; label: string }[] = [
  { key: "games", label: "Игры" },
  { key: "career", label: "Карьера" },
  { key: "transfers", label: "Трансферы" },
];

export default function PlayerTabs() {
  const { colors } = useAppTheme();
  const cols = React.useMemo(() => createLeagueTableColumns(colors), [colors]);
  const [active, setActive] = useState<TabKey>("games");

  return (
    <View style={{ flex: 1 }}>
      {/* Верхняя панель табов */}
      <Tabs
        tabs={TABS}
        value={active}
        onChange={setActive}
        variant="outline"
        stretch
        size={12}
      />

      {/* Контент вкладок */}
      <ScrollView style={{ paddingBottom: 80 }}>
        {active === "games" && (
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
        {active === "career" && <MatchList items={matchRows as any} />}
        {active === "transfers" && (
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
