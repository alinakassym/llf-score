import { GoogleIcon } from "@/components/icons/google-icon";
import React, { FC } from "react";
import { StyleProp, Text, TouchableOpacity, View, ViewStyle } from "react-native";

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const GoogleButton: FC<Props> = ({
  onPress,
  disabled = false,
  style,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel="Войти через Google"
      style={[
        {
          backgroundColor: "#2C2C2E",
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
        <GoogleIcon size={24} />
      </View>
      <Text style={{ color: "#FFFFFF", fontSize: 16, fontWeight: "600" }}>
        Google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;
