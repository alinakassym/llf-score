// components/ModalHeader.tsx

import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
  onClose?: () => void;
};

export default function ModalHeader({ title, onClose }: Props) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) onClose();
    else router.back();
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: Platform.OS === "ios" ? 16 : 52,
        paddingHorizontal: 16,
        paddingBottom: 16,
      }}
    >
      <Text
        style={{
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "600",
          flex: 1,
        }}
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Кнопка закрытия */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={handleClose}
        style={{ padding: 4 }}
      >
        <Ionicons name="close" size={28} color={"#FFFFFF"} />
      </TouchableOpacity>
    </View>
  );
}
