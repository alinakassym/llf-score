// shared/ui/LeagueTabs.tsx
import React, { useState } from "react";
import {
  View,
  Pressable,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import Table, { TableColumn } from "@/shared/ui/Table";
import { Badge, BadgeText } from "@/components/ui/badge";
import MatchList from "@/shared/ui/MatchList";

const matchRows = [
  {
    id: "m1",
    homeName: "БИИК Шымкент (Ж)",
    awayName: "Актобе (Ж)",
    homeLogo: require("@/assets/images/cities/astana.png"),
    awayLogo: require("@/assets/images/cities/astana.png"),
    score: "3:0",
    status: "finished",
  },
  {
    id: "m2",
    homeName: "Tomiris-Turan (Ж)",
    awayName: "Кайрат (Ж)",
    homeLogo: require("@/assets/images/cities/astana.png"),
    awayLogo: require("@/assets/images/cities/astana.png"),
    status: "live",
    score: "1:0",
  },
  {
    id: "m3",
    homeName: "Елимай (Ж)",
    awayName: "Кызылжар (Ж)",
    homeLogo: require("@/assets/images/cities/astana.png"),
    awayLogo: require("@/assets/images/cities/astana.png"),
    status: "scheduled",
    dateISO: new Date().toISOString(),
  },
] as const;

type OrderRow = {
  number: number;
  team: string;
  score: string;
  games: string;
  goals: string;
  col: string;
  image?: ImageSourcePropType;
};

export const rows: OrderRow[] = [
  {
    number: 1,
    team: "БИИК Шымкент",
    score: "3:0",
    games: "17",
    goals: "172:6",
    col: "46",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 2,
    team: "Актобе",
    score: "",
    games: "15",
    goals: "125:4",
    col: "43",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 3,
    team: "Tomiris-Turan",
    score: "5:1",
    games: "16",
    goals: "77:17",
    col: "37",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 4,
    team: "Кайрат",
    score: "",
    games: "16",
    goals: "50:35",
    col: "33",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 5,
    team: "Елимай",
    score: "3:2",
    games: "16",
    goals: "40:29",
    col: "29",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 6,
    team: "Кызылжар",
    score: "",
    games: "15",
    goals: "28:22",
    col: "28",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 7,
    team: "Улытай",
    score: "0:3",
    games: "16",
    goals: "23:35",
    col: "23",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 8,
    team: "Zhenis Astana",
    score: "",
    games: "16",
    goals: "25:38",
    col: "22",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 9,
    team: "Тобол",
    score: "",
    games: "17",
    goals: "21:84",
    col: "18",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 10,
    team: "Астана",
    score: "2:3",
    games: "16",
    goals: "23:40",
    col: "13",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 11,
    team: "Кайсар",
    score: "",
    games: "14",
    goals: "18:34",
    col: "12",
    image: require("@/assets/images/cities/astana.png"),
  },
  {
    number: 12,
    team: "Жетысу",
    score: "1:5",
    games: "16",
    goals: "13:59",
    col: "10",
    image: require("@/assets/images/cities/astana.png"),
  },
];

const cols: TableColumn<OrderRow>[] = [
  { key: "number", title: "#", width: 40, maxWidth: 40 },
  {
    key: "team",
    title: "Команда",
    render: (ren) => (
      <>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Image source={ren.image as any} style={{ width: 20, height: 20 }} />
          <Text>{ren.team}</Text>
        </View>
      </>
    ),
  },
  {
    key: "score",
    title: " ",
    render: (r) => (
      <>
        <View
          style={{ flexDirection: "row", justifyContent: "flex-end", gap: 4 }}
        >
          <React.Fragment>
            {r.score && (
              <Badge
                size="sm"
                action="success"
                className="w-fit justify-center"
              >
                <BadgeText>{r.score}</BadgeText>
              </Badge>
            )}
          </React.Fragment>
        </View>
      </>
    ),
    width: 60,
    maxWidth: 60,
    textAlign: "right",
    headerTextAlign: "right",
  },
  {
    key: "games",
    title: "И",
    width: 55,
    maxWidth: 55,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "goals",
    title: "Г",
    width: 55,
    maxWidth: 55,
    textAlign: "center",
    headerTextAlign: "center",
  },
  { key: "col", title: "О", width: 45, maxWidth: 45 },
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
        {active === "results" && <MatchList items={matchRows as any} />}
        {active === "calendar" && (
          <Text style={{ paddingHorizontal: 16, color: colors.textLight }}>
            Здесь будет календарь матчей.
          </Text>
        )}
      </View>
    </View>
  );
}
