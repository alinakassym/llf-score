import React, { FC, ReactNode } from "react";
import { View, ViewStyle } from "react-native";

type Props = {
  children: ReactNode;
  style?: ViewStyle;
};

export const Card: FC<Props> = ({ children, style }) => {
  return (
    <View style={[style, { borderRadius: 8, overflow: "hidden" }]}>
      {children}
    </View>
  );
};
