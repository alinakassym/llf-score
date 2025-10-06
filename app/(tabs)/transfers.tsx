import { Colors } from "@/constants/theme";
import { transferRows } from "@/features/transfers/mocks";
import TransfersLegend from "@/features/transfers/TransfersLegend";
import TransfersTable from "@/features/transfers/TransfersTable";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useMemo, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";

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
        <View style={{ padding: 16 }}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Поиск по имени игрока..."
            placeholderTextColor={c.muted}
            style={{
              height: 40,
              borderWidth: 1,
              borderColor: c.border,
              borderRadius: 8,
              paddingHorizontal: 12,
              fontSize: 14,
              color: c.text,
              backgroundColor: c.card,
            }}
          />
        </View>
        <TransfersLegend />
        <TransfersTable rows={filteredRows} />
      </ScrollView>
    </View>
  );
}
