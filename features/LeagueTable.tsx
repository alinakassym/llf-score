// features/LeagueTable.tsx
import React from "react";
import { createLeagueTableColumns } from "@/features/ui/leagueTable.columns";
import Table from "@/shared/ui/Table";
import { leagueRows, OrderRow } from "@/shared/mocks/leagueRows";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {}

export default function LeagueTable({}: Props) {
  const { colors } = useAppTheme();
  const cols = React.useMemo(() => createLeagueTableColumns(colors), [colors]);

  return (
    <Table<OrderRow>
      columns={cols}
      data={leagueRows}
      keyExtractor={(r) => r.number}
      backgroundColor={colors.bg}
      color={colors.text}
      borderColor={colors.border}
      hightlightColor={colors.tertiaryBg}
    />
  );
}
