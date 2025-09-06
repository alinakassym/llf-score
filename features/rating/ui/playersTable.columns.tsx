// features/home/transfersTable.columns.ts
import type { TableColumn } from "@/shared/ui/Table";
import { PlayerRatingRow } from "@/shared/mocks/playersRatingRows";
import PlayerCell from "@/features/PlayerCell";

export const createPlayersTableColumns = (): TableColumn<PlayerRatingRow>[] => [
  {
    key: "position",
    title: "#",
    width: 40,
    maxWidth: 40,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "playerName",
    title: "Игрок",
    width: 180,
    maxWidth: 180,
    render: (r) => (
      <PlayerCell
        name={r.playerName}
        subtext={`${r.cityName},  ${r.league},  ${r.teamName}`}
        position={r.positionChange}
        avatar={r.image}
      />
    ),
  },
  {
    key: "tour",
    title: "7 тур",
    width: 120,
    maxWidth: 120,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "total",
    title: "Очки",
    width: 110,
    maxWidth: 110,
    textAlign: "center",
    headerTextAlign: "center",
  },
];
