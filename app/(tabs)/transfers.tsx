import TextField from "@/components/form/TextField";
import { Colors } from "@/constants/theme";
import { transferRows } from "@/features/transfers/mocks";
import TransfersLegend from "@/features/transfers/TransfersLegend";
import TransfersTable from "@/features/transfers/TransfersTable";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useMemo, useState } from "react";
import { ScrollView, View } from "react-native";

export default function TabTransfersScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return transferRows;
    const query = searchQuery.toLowerCase();
    return transferRows.filter((row) =>
      row.player.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={{ paddingHorizontal: 8, paddingVertical: 16 }}>
          <TextField
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Поиск по имени игрока..."
            leftIcon="search"
            leftIconSize={16}
            leftIconColor={c.textMuted}
          />
        </View>
        <TransfersLegend />
        <TransfersTable rows={filteredRows} />
      </ScrollView>
    </View>
  );
}
