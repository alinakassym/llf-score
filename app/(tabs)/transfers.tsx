import { transferRows } from "@/features/transfers/mocks";
import TransfersTable from "@/features/transfers/TransfersTable";
import { ScrollView, View } from "react-native";

export default function TabTransfersScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TransfersTable rows={transferRows} />
      </ScrollView>
    </View>
  );
}
