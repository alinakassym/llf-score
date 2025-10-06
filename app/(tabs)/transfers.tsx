import { transferRows } from "@/features/transfers/mocks";
import TransfersLegend from "@/features/transfers/TransfersLegend";
import TransfersTable from "@/features/transfers/TransfersTable";
import { ScrollView, View } from "react-native";

export default function TabTransfersScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <TransfersLegend />
        <TransfersTable rows={transferRows} />
      </ScrollView>
    </View>
  );
}
