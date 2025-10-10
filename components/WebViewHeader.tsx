// components/WebViewHeader.tsx
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  title: string;
};

export const WebViewHeader: FC<Props> = ({ title }) => {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const router = useRouter();

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: c.border,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "700",
          color: c.text,
          flex: 1,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          padding: 8,
          marginLeft: 16,
        }}
      >
        <Ionicons name="close" size={24} color={c.text} />
      </TouchableOpacity>
    </View>
  );
};
