// features/rating/RatingPlayerTable.tsx
import { Column, Table } from "@/components/Table";
import TableCell from "@/components/TableCell";
import TableRatingCell from "@/components/TableRatingCell";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import type { PlayerRatingRow } from "./types";

type Props = {
  rows: PlayerRatingRow[];
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

export function RatingPlayerTable({ rows }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const ranked = useMemo(() => {
    const sorted = [...rows].sort((a, b) => b.total - a.total);
    return sorted.map((r, idx) => ({ ...r, _pos: idx + 1 }));
  }, [rows]);

  const columns: Column<PlayerRatingRow & { _pos: number }>[] = [
    {
      key: "position",
      title: "#",
      width: 28,
      align: "center",
      render: (r) => (
        <TableRatingCell text={String(r._pos)} position={r.positionChange} />
      ),
    },
    {
      key: "playerName",
      title: "Игрок",
      flex: 2,
      align: "left",
      render: (r, index) => (
        <TableCell
          text={r.playerName}
          subtext={`${r.cityName},  ${r.league},  ${r.teamName}`}
          image={r.image}
        />
      ),
    },
    {
      key: "tour",
      title: "7 тур",
      width: 80,
      align: "center",
      accessor: (r) => r.tour,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "total",
      title: "Очки",
      width: 80,
      align: "center",
      accessor: (r) => r.total,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
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

export default RatingPlayerTable;
