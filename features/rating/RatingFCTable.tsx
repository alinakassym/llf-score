// features/rating/RatingFCTable.tsx
import { Column, Table } from "@/components/Table";
import TableCell from "@/components/TableCell";
import TableRatingCell from "@/components/TableRatingCell";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
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

  const ranked = useMemo(() => {
    const sorted = [...rows].sort((a, b) => b.total - a.total);
    return sorted.map((r, idx) => ({ ...r, _pos: idx + 1 }));
  }, [rows]);

  const columns: Column<TeamRatingRow & { _pos: number }>[] = [
    {
      key: "pos",
      title: "#",
      width: 34,
      align: "center",
      render: (r) => (
        <TableRatingCell text={String(r._pos)} position={r.positionChange} />
      ),
    },
    {
      key: "team",
      title: "Команда",
      flex: 2,
      align: "left",
      width: 168,
      render: (r) => (
        <TableCell
          text={r.teamName}
          image={r.image}
          subtext={`${r.cityName} • ${r.league}`}
        />
      ),
    },
    {
      key: "s1",
      title: "Сезон 1",
      width: 60,
      align: "center",
      accessor: (r) => r.season1,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "s2",
      title: "Сезон 2",
      width: 60,
      align: "center",
      accessor: (r) => r.season2,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "s3",
      title: "Сезон 3",
      width: 60,
      align: "center",
      accessor: (r) => r.season3,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "s4",
      title: "Сезон 4",
      width: 60,
      align: "center",
      accessor: (r) => r.season4,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "total",
      title: "Очки",
      width: 52,
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
      horizontalScroll
    />
  );
}

export default RatingFCTable;
