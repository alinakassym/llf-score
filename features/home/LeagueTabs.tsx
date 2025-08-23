// shared/ui/LeagueTabs.tsx
import { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import Table, { TableColumn } from "@/shared/ui/Table";
import { Badge, BadgeText } from "@/components/ui/badge";

type OrderRow = {
  number: number;
  team: string;
  score: string;
  games: string;
  goals: string;
  col: string;
};

export const rows: OrderRow[] = [
  {
    number: 1,
    team: "БИИК Шымкент",
    score: "3:0",
    games: "17",
    goals: "172:6",
    col: "46",
  },
  {
    number: 2,
    team: "Актобе",
    score: "",
    games: "15",
    goals: "125:4",
    col: "43",
  },
  {
    number: 3,
    team: "Tomiris-Turan",
    score: "5:1",
    games: "16",
    goals: "77:17",
    col: "37",
  },
  {
    number: 4,
    team: "Кайрат",
    score: "",
    games: "16",
    goals: "50:35",
    col: "33",
  },
  {
    number: 5,
    team: "Елимай",
    score: "3:2",
    games: "16",
    goals: "40:29",
    col: "29",
  },
  {
    number: 6,
    team: "Кызылжар",
    score: "",
    games: "15",
    goals: "28:22",
    col: "28",
  },
  {
    number: 7,
    team: "Улытай",
    score: "0:3",
    games: "16",
    goals: "23:35",
    col: "23",
  },
  {
    number: 8,
    team: "Zhenis Astana",
    score: "",
    games: "16",
    goals: "25:38",
    col: "22",
  },
  {
    number: 9,
    team: "Тобол",
    score: "",
    games: "17",
    goals: "21:84",
    col: "18",
  },
  {
    number: 10,
    team: "Астана",
    score: "2:3",
    games: "16",
    goals: "23:40",
    col: "13",
  },
  {
    number: 11,
    team: "Кайсар",
    score: "",
    games: "14",
    goals: "18:34",
    col: "12",
  },
  {
    number: 12,
    team: "Жетысу",
    score: "1:5",
    games: "16",
    goals: "13:59",
    col: "10",
  },
];

const cols: TableColumn<OrderRow>[] = [
  { key: "number", title: "#", width: 40, maxWidth: 40 },
  { key: "team", title: "Команда" },
  {
    key: "score",
    title: " ",
    render: (r) => (
      <>
        {r.score && (
          <Badge size="sm" action="success" className="w-fit justify-center">
            <BadgeText>{r.score}</BadgeText>
          </Badge>
        )}
      </>
    ),
    width: 60,
    maxWidth: 60,
  },
  { key: "games", title: "И", width: 60, maxWidth: 60 },
  { key: "goals", title: "Г", width: 60, maxWidth: 60 },
  { key: "col", title: "О", width: 60, maxWidth: 60 },
];

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
      <View style={{ flexDirection: "row", gap: 16, paddingHorizontal: 16 }}>
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
      <View style={{ marginTop: 12, paddingLeft: 0 }}>
        {active === "table" && (
          <Table<OrderRow>
            columns={cols}
            data={rows}
            keyExtractor={(r) => r.number}
          />
        )}
        {active === "results" && <Text>Здесь будут результаты матчей.</Text>}
        {active === "calendar" && <Text>Здесь будет календарь матчей.</Text>}
      </View>
    </View>
  );
}
