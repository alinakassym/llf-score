import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC, PropsWithChildren } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export const Divider: FC<Props> = () => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  return (
    <View
      style={{
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: c.border,
      }}
    />
  );
};
