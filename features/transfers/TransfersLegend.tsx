// features/transfers/TransfersLegend.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { View } from "react-native";
import { TransferStatus } from "./TransferStatus";

export function TransfersLegend() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  return (
    <View
      style={{
        padding: 8,
        flex: 1,
        flexDirection: "column",
        gap: 8,
        borderBottomWidth: 1,
        borderBottomColor: c.border,
        backgroundColor: c.background,
      }}
    >
      <TransferStatus name="free" label="Свободный игрок" />
      <TransferStatus name="transfer" label="Доступный для трансфера" />
      <TransferStatus name="contract" label="Связанный контрактом" />
    </View>
  );
}

export default TransfersLegend;
