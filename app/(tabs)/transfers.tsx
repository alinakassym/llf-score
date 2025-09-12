import { FC, useState } from "react";
import { Platform, ScrollView, View, TextInput } from "react-native";
import { VStack } from "@/components/ui/vstack";
import PlayerCell from "@/features/PlayerCell";
import StatusLegend from "@/features/StatusLegend";
import StatusDot from "@/features/StatusDot";
import Screen from "@/shared/ui/Screen";
import { transferRows, TransferRow } from "@/shared/mocks/transferRows";
import Table, { TableColumn } from "@/shared/ui/Table";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

const cols: TableColumn<TransferRow>[] = [
  {
    key: "player",
    title: "Игрок",
    width: 190,
    maxWidth: 190,
    headerTextAlign: "center",
    render: (r, index) => (
      <PlayerCell
        index={index}
        name={r.player}
        subtext={`${r.team} (${r?.league}) ${r.position}`}
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
    render: (row) => (
      <View style={{ alignItems: "center" }}>
        <StatusDot kind={row.status as any} />
      </View>
    ),
  },
  {
    key: "age",
    title: "Возраст",
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

const TabTransferScreen: FC = () => {
  const { colors } = useAppTheme();

  const [query, setQuery] = useState("");

  const filteredRows = transferRows.filter((r) =>
    r.player.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Screen>
      <View style={{ padding: 16 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Поиск игрока"
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.text,
            backgroundColor: colors.bg,
          }}
        />
      </View>
      <ScrollView
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
      >
        <VStack className="flex-1 p-0">
          <StatusLegend />
          <Table<TransferRow>
            columns={cols}
            data={filteredRows}
            keyExtractor={(r, i) => r.player + i}
            backgroundColor={colors.bg}
            color={colors.text}
            borderColor={colors.border}
            hightlightColor={colors.secondaryBg}
            scrollX={true}
          />
        </VStack>
      </ScrollView>
    </Screen>
  );
};

export default TabTransferScreen;
