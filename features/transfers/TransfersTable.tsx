// features/transfers/TransfersTable.tsx
import { Column, Table } from "@/components/Table";
import TableCell from "@/components/TableCell";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { TransferRow } from "./types";

type Props = {
  rows: TransferRow[];
};

export function TransfersTable({ rows }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const columns: Column<TransferRow>[] = [
    {
      key: "playerName",
      title: "Игрок",
      flex: 2,
      align: "left",
      render: (r) => (
        <TableCell
          text={r.player}
          subtext={`${r.team},  ${r.league},  ${r.position}`}
          image={r.image}
        />
      ),
    },
    {
      key: "age",
      title: "Возраст",
      width: 80,
      align: "center",
      accessor: (r) => r.age,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "cost",
      title: "Стоимость",
      width: 80,
      align: "center",
      accessor: (r) => r.cost,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
    {
      key: "salary",
      title: "ЗП",
      width: 80,
      align: "center",
      accessor: (r) => r.salary,
      textStyle: { fontSize: 11, fontWeight: "600", color: c.text },
    },
  ];

  return (
    <Table
      columns={columns}
      data={rows}
      keyExtractor={(r) => `${r.id}`}
      headerStyle={{ height: 36 }}
      rowStyle={{ minHeight: 44 }}
      separator
    />
  );
}

export default TransfersTable;
