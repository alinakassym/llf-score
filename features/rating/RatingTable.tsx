import Table, { TableColumn } from "@/shared/ui/Table";
import { teamRatingRows, TeamRatingRow } from "@/shared/mocks/teamRatingRows";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { createRatingTableColumns } from "./ui/ratingTable.columns";

const cols: TableColumn<TeamRatingRow>[] = createRatingTableColumns();

export default function RatingTable() {
  const { colors } = useAppTheme();
  return (
    <Table<TeamRatingRow>
      columns={cols}
      data={teamRatingRows}
      keyExtractor={(r, i) => r.teamName + i}
      backgroundColor={colors.bg}
      color={colors.text}
      borderColor={colors.border}
      hightlightColor={colors.secondaryBg}
      scrollX={true}
    />
  );
}
