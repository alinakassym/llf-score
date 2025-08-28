import Table, { TableColumn } from "@/shared/ui/Table";
import {
  playersRatingRows,
  PlayerRatingRow,
} from "@/shared/mocks/playersRatingRows";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { createPlayersTableColumns } from "./ui/playersTable.columns";

const cols: TableColumn<PlayerRatingRow>[] = createPlayersTableColumns();

export default function PlayersTable() {
  const { colors } = useAppTheme();
  return (
    <Table<PlayerRatingRow>
      columns={cols}
      data={playersRatingRows}
      keyExtractor={(r, i) => r.teamName + i}
      backgroundColor={colors.bg}
      color={colors.text}
      borderColor={colors.border}
      hightlightColor={colors.secondaryBg}
      scrollX={true}
    />
  );
}
