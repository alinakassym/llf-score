// features/PlayerTabs.tsx
import { Card } from "@/components/Card";
import Tabs from "@/components/Tabs";
import { Colors } from "@/constants/theme";
import { LeagueTable } from "@/features/league/LeagueTable";
import { leagueMock } from "@/features/league/mocks";
import MatchList from "@/features/match/MatchList";
import { matchRows } from "@/features/match/matchRows";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

type TabKey = "games" | "career" | "transfers";

const TABS: { key: TabKey; label: string }[] = [
  { key: "games", label: "Игры" },
  { key: "career", label: "Карьера" },
  { key: "transfers", label: "Переходы" },
];

export default function PlayerTabs() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
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
          <View style={{ padding: 4, width: "100%", alignSelf: "center" }}>
            <Card>
              <LeagueTable rows={leagueMock} />
            </Card>
          </View>
        )}
        {active === "career" && <MatchList items={matchRows as any} />}
        {active === "transfers" && (
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
