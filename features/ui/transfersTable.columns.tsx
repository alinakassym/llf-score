// features/home/transfersTable.columns.ts
import type { TableColumn } from "@/shared/ui/Table";
import { TransferRow } from "@/shared/mocks/transferRows";
import PlayerCell from "@/features/PlayerCell";

export const createTransfersTableColumns = (): TableColumn<TransferRow>[] => [
  {
    key: "player",
    title: "Игрок",
    width: 190,
    maxWidth: 190,
    render: (r) => (
      <PlayerCell
        name={r.player}
        subtext={`${r.team}  ${r.position}`}
        avatar={r.image}
      />
    ),
  },
  {
    key: "status",
    title: "Статус",
    width: 80,
    maxWidth: 80,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "cost",
    title: "Стоимость",
    width: 90,
    maxWidth: 90,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "salary",
    title: "ЗП",
    width: 80,
    maxWidth: 80,
    textAlign: "center",
    headerTextAlign: "center",
  },
];
