import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import type { Banner } from "@/shared/mocks/banners";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";

type Props = {
  item: Banner;
  width: number;
  height?: number;
  borderRadius?: number;
};

export default function BannerCard({
  item,
  width,
  height = 140,
  borderRadius = 0,
}: Props) {
  const { colors } = useAppTheme();
  const content = (
    <ImageBackground
      source={item.image}
      imageStyle={{ borderRadius: 0 }}
      style={{ width, height, overflow: "hidden", borderRadius }}
    >
      <LinearGradient
        colors={colors.overlayGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "55%",
        }}
      />
      <View style={{ position: "absolute", left: 12, right: 12, top: "42%" }}>
        {item.title ? (
          <Text style={{ color: "#00041A", fontSize: 16, fontWeight: "700" }}>
            {item.title}
          </Text>
        ) : null}
        {item.subtitle ? (
          <Text style={{ color: "#FFFFFF", opacity: 0.9, marginTop: 2 }}>
            {item.subtitle}
          </Text>
        ) : null}
      </View>
    </ImageBackground>
  );

  if (item.href) {
    return (
      <Link href={item.href as any} asChild>
        <Pressable>{content}</Pressable>
      </Link>
    );
  }
  return <Pressable onPress={() => {}}>{content}</Pressable>;
}
