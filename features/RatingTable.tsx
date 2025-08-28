import PlayerCell from "@/features/PlayerCell";
import Table, { TableColumn } from "@/shared/ui/Table";
import { teamRatingRows, TeamRatingRow } from "@/shared/mocks/teamRatingRows";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

const cols: TableColumn<TeamRatingRow>[] = [
  {
    key: "teamName",
    title: "Клубы",
    width: 180,
    maxWidth: 180,
    render: (r) => (
      <PlayerCell
        name={r.teamName}
        subtext={`${r.cityName},  ${r.league}`}
        avatar={r.image}
      />
    ),
  },
  {
    key: "season1",
    title: "Сезон 1",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "season2",
    title: "Сезон 2",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "season3",
    title: "Сезон 3",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "season4",
    title: "Сезон 4",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "total",
    title: "Очки",
    width: 70,
    maxWidth: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
];

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
