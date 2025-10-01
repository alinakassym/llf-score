// features/rating/RatingFCTable.tsx
import { Column, Table } from "@/components/Table";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { useMemo } from "react";
import { Image, Text, View } from "react-native";
// Приведи путь при необходимости: "./types" или "@/features/rating/types"
import type { TeamRatingRow } from "./types";

type Props = {
  rows: TeamRatingRow[];
};

function PosCell({ n }: { n: number }) {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  return (
    <View
      style={{
        height: 24,
        minWidth: 24,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontWeight: "600", fontSize: 11, color: c.text }}>
        {n}
      </Text>
    </View>
  );
}

export function RatingFCTable({ rows }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  // Отсортируем и пронумеруем (1..N). При равенстве total — стабильный порядок.
  const ranked = useMemo(() => {
    const sorted = [...rows].sort((a, b) => b.total - a.total);
    return sorted.map((r, idx) => ({ ...r, _pos: idx + 1 }));
  }, [rows]);

  const columns: Column<TeamRatingRow & { _pos: number }>[] = [
    {
      key: "pos",
      title: "#",
      width: 40,
      align: "center",
      render: (r) => <PosCell n={r._pos} />,
    },
    {
      key: "team",
      title: "Команда",
      flex: 2,
      align: "left",
      width: 150,
      render: (r) => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {r.image ? (
            <Image
              source={r.image}
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                backgroundColor: c.muted,
              }}
            />
          ) : (
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                backgroundColor: c.card,
                borderWidth: 1,
                borderColor: c.border,
              }}
            />
          )}
          <View style={{ flexShrink: 1 }}>
            <Text
              style={{
                color: c.text,
                fontSize: 11,
                fontWeight: "700",
                flexShrink: 1,
              }}
            >
              {r.teamName}
            </Text>
            <View style={{ flexDirection: "row", gap: 6, marginTop: 2 }}>
              <Text style={{ color: c.surface, fontSize: 10 }}>
                {r.cityName}
              </Text>
              <Text style={{ color: c.surface, fontSize: 10 }}>
                • {r.league}
              </Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      key: "s1",
      title: "Сезон 1",
      width: 52,
      align: "center",
      accessor: (r) => r.season1,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "s2",
      title: "Сезон 2",
      width: 52,
      align: "center",
      accessor: (r) => r.season2,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "s3",
      title: "Сезон 3",
      width: 52,
      align: "center",
      accessor: (r) => r.season3,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "s4",
      title: "Сезон 4",
      width: 52,
      align: "center",
      accessor: (r) => r.season4,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "total",
      title: "Итого",
      width: 60,
      align: "center",
      accessor: (r) => r.total,
      textStyle: { fontWeight: "800", fontSize: 11, color: c.text },
    },
  ];

  return (
    <Table
      columns={columns}
      data={ranked}
      keyExtractor={(r) => `${r.teamName}-${r.cityName}`}
      headerStyle={{ height: 36 }}
      rowStyle={{ minHeight: 44 }}
      separator
    />
  );
}

export default RatingFCTable;
