// features/league/LeagueTable.tsx
import { Column, Table } from "@/components/Table";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { Image, Text, View } from "react-native";
import { LeagueRow } from "./types";

function PosChip({ n, highlight }: { n: number; highlight?: boolean }) {
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
      <Text style={{ fontWeight: "600", fontSize: 11 }}>{n}</Text>
    </View>
  );
}

function ScorePill({ gf, ga }: { gf: number; ga: number }) {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const win = gf > ga;
  const lose = gf < ga;

  const bg = win ? "#16A34A" : lose ? "#DC2626" : "#6B7280";
  return (
    <View
      style={{
        height: 22,
        minWidth: 40,
        paddingHorizontal: 6,
        borderRadius: 8,
        backgroundColor: bg,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff", fontWeight: "700", fontSize: 11 }}>
        {gf}:{ga}
      </Text>
    </View>
  );
}

function PosDiff({ diff = 0 }: { diff?: number }) {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  if (!diff) return null;
  const up = diff > 0;
  const color = up ? "#16A34A" : "#DC2626";
  return (
    <Text style={{ color, fontSize: 11, marginLeft: 4 }}>
      {up ? "▲" : "▼"} {Math.abs(diff)}
    </Text>
  );
}

/** Таблица для лиг на базе универсальной Table */
export function LeagueTable({ rows }: { rows: LeagueRow[] }) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const columns: Column<LeagueRow>[] = [
    {
      key: "pos",
      title: "#",
      width: 40,
      align: "center",
      render: (r) => <PosChip n={r.pos} highlight={r.pos === 1} />,
    },
    {
      key: "team",
      title: "Команда",
      flex: 1.8,
      align: "left",
      render: (r) => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {r.crest ? (
            <Image
              source={{ uri: r.crest }}
              style={{ width: 24, height: 24, borderRadius: 4 }}
              resizeMode="contain"
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
          <Text
            style={{
              color: c.text,
              fontSize: 11,
              fontWeight: "600",
              flexShrink: 1,
            }}
          >
            {r.name}
          </Text>
          {typeof r.posDiff === "number" && <PosDiff diff={r.posDiff} />}
          {r.lastScore && (
            <View style={{ marginLeft: 8 }}>
              <ScorePill gf={r.lastScore.gf} ga={r.lastScore.ga} />
            </View>
          )}
        </View>
      ),
    },
    {
      key: "played",
      title: "И",
      width: 36,
      align: "center",
      accessor: (r) => r.played,
      textStyle: { fontWeight: "600" },
    },
    {
      key: "goals",
      title: "Г",
      width: 64,
      align: "center",
      render: (r) => (
        <Text style={{ color: c.error, fontSize: 11, fontWeight: "600" }}>
          {r.goalsFor}:{r.goalsAgainst}
        </Text>
      ),
    },
    {
      key: "points",
      title: "О",
      width: 40,
      align: "center",
      accessor: (r) => r.points,
      textStyle: { fontWeight: "800", fontSize: 11 },
    },
  ];

  return (
    <Table
      columns={columns}
      data={rows}
      keyExtractor={(r) => r.id}
      headerStyle={{ height: 36 }}
      rowStyle={{ minHeight: 56 }}
      separator
    />
  );
}
