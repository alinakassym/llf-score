import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC } from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import { TransferStatusType } from "./types";

type Props = {
  name: TransferStatusType;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export const TransferStatus: FC<Props> = ({ name, label, style }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const icon = name === "contract" ? "close" : "checkmark";
  let color =
    name === "contract" ? c.error : name === "free" ? c.success : c.warning;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        },
        style,
      ]}
    >
      <View
        style={[
          {
            height: 16,
            width: 16,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 12,
            backgroundColor: color,
          },
          style,
        ]}
      >
        <Ionicons name={icon} size={12} color={c.white} />
      </View>
      {label && <Text style={{ fontSize: 11, color: c.text }}>{label}</Text>}
    </View>
  );
};
