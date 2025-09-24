import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { FC, PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export const Screen: FC<Props> = ({ children, style }) => {
  const scheme = useThemeMode();
  return (
    <SafeAreaView
      edges={["top", "right", "bottom", "left"]}
      style={[{ flex: 1, backgroundColor: Colors[scheme].background }, style]}
    >
      {children}
    </SafeAreaView>
  );
};
