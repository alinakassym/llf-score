import { FacebookIcon } from "@/components/icons/facebook-icon";
import React, { FC } from "react";
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const FacebookButton: FC<Props> = ({
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel="Войти через Facebook"
      style={[
        {
          backgroundColor: "#1877F2",
          borderRadius: 8,
          padding: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}
    >
      <View style={{ marginRight: 12 }}>
        <FacebookIcon size={24} />
      </View>
      <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
        Facebook
      </Text>
    </TouchableOpacity>
  );
};

export default FacebookButton;
