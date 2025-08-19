import React from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import type { Banner } from "@/shared/mocks/banners";
import { Link } from "expo-router";

type Props = { item: Banner; width: number; height?: number };

export default function BannerCard({ item, width, height = 140 }: Props) {
  const content = (
    <ImageBackground
      source={item.image}
      resizeMode="cover"
      imageStyle={{ borderRadius: 16 }}
      style={{ width, height, overflow: "hidden", borderRadius: 16 }}
    >
      {/* затемнение снизу под текст */}
      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.45)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "55%" }}
      />
      <View style={{ position: "absolute", left: 12, right: 12, bottom: 10 }}>
        {item.title ? <Text style={{ color: "#fff", fontSize: 16, fontWeight: "700" }}>{item.title}</Text> : null}
        {item.subtitle ? <Text style={{ color: "#fff", opacity: 0.9, marginTop: 2 }}>{item.subtitle}</Text> : null}
      </View>
    </ImageBackground>
  );

  if (item.href) {
    return <Link href={item.href as any} asChild><Pressable>{content}</Pressable></Link>;
  }
  return <Pressable onPress={() => {}}>{content}</Pressable>;
}