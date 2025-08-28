import React, { FC, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  TextInput,
} from "react-native";
import { transferRows, TransferRow } from "@/shared/mocks/transferRows";
import Table from "@/shared/ui/Table";
import HomeTopBar from "@/features/HomeTopBar";
import SponsorsRow from "@/features/SponsorsRow";
import { VStack } from "@/components/ui/vstack";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { createTransfersTableColumns } from "@/features/ui/transfersTable.columns";

const cols = createTransfersTableColumns();

const TransfersTable: FC = () => {
  const { colors } = useAppTheme();

  const [query, setQuery] = useState("");

  const filteredRows = transferRows.filter((r) =>
    r.player.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.select({ ios: "padding", android: undefined })}
      style={{ paddingBottom: 65, backgroundColor: colors.bg }}
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
            backgroundColor={colors.bg}
            color={colors.text}
            borderColor={colors.border}
            hightlightColor={colors.secondaryBg}
            scrollX={true}
          />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default TransfersTable;
