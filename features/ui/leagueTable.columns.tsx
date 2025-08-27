// features/home/leagueTable.columns.ts
import { Image, View } from "react-native";
import { Text } from "@/components/ui/text";
import { Badge, BadgeText } from "@/components/ui/badge";
import type { TableColumn } from "@/shared/ui/Table";
import type { ImageSourcePropType } from "react-native";

export type LeagueRow = {
  number: number;
  team: string;
  score: string;
  games: string;
  goals: string;
  col: string;
  image?: ImageSourcePropType;
};

type ThemeColors = {
  text: string;
  primary: string;
};

export const createLeagueTableColumns = (
  colors: ThemeColors,
): TableColumn<LeagueRow>[] => [
  { key: "number", title: "#", width: 40, maxWidth: 40 },
  {
    key: "team",
    title: "Команда",
    render: (r) => (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        {r.image && (
          <Image source={r.image} style={{ width: 20, height: 20 }} />
        )}
        <Text style={{ fontSize: 12, color: colors.text }}>{r.team}</Text>
      </View>
    ),
  },
  {
    key: "score",
    title: " ",
    render: (r) =>
      r.score ? (
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Badge size="sm" action="success" className="w-fit justify-center">
            <BadgeText>{r.score}</BadgeText>
          </Badge>
        </View>
      ) : null,
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
