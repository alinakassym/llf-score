import { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
} from "react-native";
import PlayerCell from "@/features/PlayerCell";
import Table, { TableColumn } from "@/shared/ui/Table";
import HomeTopBar from "@/features/HomeTopBar";
import SponsorsRow from "@/features/SponsorsRow";
import { VStack } from "@/components/ui/vstack";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type TransferRow = {
  player: string;
  team: string;
  position: string;
  status: string;
  cost: string;
  salary: string;
  image?: any;
};

const cols: TableColumn<TransferRow>[] = [
  {
    key: "player",
    title: "Игрок",
    width: 160,
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
    width: 70,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "cost",
    title: "Стоимость",
    width: 90,
    textAlign: "center",
    headerTextAlign: "center",
  },
  {
    key: "salary",
    title: "ЗП",
    width: 80,
    textAlign: "center",
    headerTextAlign: "center",
  },
];

const rows: TransferRow[] = [
  {
    player: "Lionel Messi",
    team: "Paris Saint-Germain",
    position: "Forward",
    status: "✔",
    cost: "100",
    salary: "50.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Cristiano Ronaldo",
    team: "Al-Nassr",
    position: "Forward",
    status: "✔",
    cost: "120",
    salary: "55.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Neymar Jr.",
    team: "Paris Saint-Germain",
    position: "Forward",
    status: "✔",
    cost: "110",
    salary: "48.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Kevin De Bruyne",
    team: "Manchester City",
    position: "Midfielder",
    status: "✔",
    cost: "90",
    salary: "45.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Robert Lewandowski",
    team: "Barcelona",
    position: "Forward",
    status: "✔",
    cost: "95",
    salary: "47.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Kylian Mbappé",
    team: "Paris Saint-Germain",
    position: "Forward",
    status: "✔",
    cost: "130",
    salary: "60.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    status: "✔",
    cost: "125",
    salary: "58.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Mohamed Salah",
    team: "Liverpool",
    position: "Forward",
    status: "✔",
    cost: "115",
    salary: "52.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Virgil van Dijk",
    team: "Liverpool",
    position: "Defender",
    status: "✔",
    cost: "85",
    salary: "40.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Luka Modrić",
    team: "Real Madrid",
    position: "Midfielder",
    status: "✔",
    cost: "80",
    salary: "42.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Karim Benzema",
    team: "Al-Ittihad",
    position: "Forward",
    status: "✔",
    cost: "105",
    salary: "50.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
  {
    player: "Pedri",
    team: "Barcelona",
    position: "Midfielder",
    status: "✔",
    cost: "75",
    salary: "38.000",
    image: require("@/assets/images/adaptive-icon.png"),
  },
];

const TabTransferScreen: FC = () => {
  const { colors } = useAppTheme();

  const [query, setQuery] = useState("");

  const filteredRows = rows.filter((r) =>
    r.player.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={{ paddingBottom: 54, backgroundColor: colors.bg }}
    >
      <SponsorsRow />
      <HomeTopBar />
      <View style={{ padding: 16 }}>
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Поиск игрока"
          style={{
            borderWidth: 1,
            borderColor: "#ddd",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
            fontSize: 14,
            color: colors.text,
          }}
        />
      </View>
      <ScrollView
        keyboardDismissMode={Platform.OS === "ios" ? "interactive" : "on-drag"}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 0 }}
      >
        <VStack className="flex-1 gap-4 p-0">
          <Table<TransferRow>
            columns={cols}
            data={filteredRows}
            keyExtractor={(r, i) => r.player + i}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TabTransferScreen;
