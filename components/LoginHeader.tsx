import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { ImageBackground, Platform, Text, View } from "react-native";

type Props = {
  title: string;
  text: string;
};

export default function LoginHeader({ title, text }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  return (
    <View
      style={{
        position: "relative",
        minHeight: 280,
        marginBottom: 8,
        overflow: "hidden",
      }}
    >
      <ImageBackground
        source={require("@/assets/images/loading-img.jpg")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        resizeMode="cover"
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          paddingTop: Platform.OS === "ios" ? 60 : 80,
          paddingHorizontal: 16,
          paddingBottom: 16,
          flexDirection: "column",
          justifyContent: "flex-end",
          backgroundColor: c.overlayOpacity,
          zIndex: 0,
        }}
      >
        <Text
          style={{
            color: c.text,
            fontSize: 32,
            fontWeight: "700",
            lineHeight: 40,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: c.secondary,
            fontSize: 32,
            fontWeight: "700",
            lineHeight: 40,
            marginTop: 4,
          }}
        >
          LLF SCORE
        </Text>

        <Text
          style={{
            color: c.text,
            fontSize: 16,
            fontWeight: "400",
            lineHeight: 24,
            marginTop: 16,
          }}
        >
          {text}
        </Text>
      </View>
    </View>
  );
}
