import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import BannerCard from "./BannerCard";
import type { Banner } from "@/shared/mocks/banners";

type Props = {
  items: Banner[];
  autoPlay?: boolean;
  intervalMs?: number;
  paddingH?: number;   // горизонтальные поля контейнера
  gap?: number;
};

export default function BannerCarousel({
  items,
  autoPlay = true,
  intervalMs = 3500,
  paddingH = 16,
  gap = 12,
}: Props) {
  const screenW = Dimensions.get("window").width;
  // ширина карточки — с учётом внутренних отступов
  const cardW = useMemo(() => screenW - paddingH * 2, [screenW, paddingH]);
  const ref = useRef<FlatList<Banner>>(null);
  const [index, setIndex] = useState(0);

  // автопрокрутка
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % items.length;
        ref.current?.scrollToOffset({ offset: next * (cardW + gap), animated: true });
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, items.length, cardW, gap]);

  function onMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / (cardW + gap));
    if (next !== index) setIndex(next);
  }

  return (
    <View style={{ paddingHorizontal: paddingH }}>
      <FlatList
        ref={ref}
        horizontal
        data={items}
        keyExtractor={(i) => i.id}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardW + gap}
        decelerationRate="fast"
        bounces={false}
        contentContainerStyle={{ paddingVertical: 8 }}
        ItemSeparatorComponent={() => <View style={{ width: gap }} />}
        renderItem={({ item }) => <BannerCard item={item} width={cardW} />}
        onMomentumScrollEnd={onMomentumEnd}
        getItemLayout={(_, i) => ({ length: cardW + gap, offset: (cardW + gap) * i, index: i })}
      />

      {/* точки-пейджер */}
      <View style={{ flexDirection: "row", justifyContent: "center", gap: 6, marginTop: 8 }}>
        {items.map((_, i) => (
          <View
            key={i}
            style={{
              width: i === index ? 8 : 6,
              height: 6,
              borderRadius: 6,
              backgroundColor: i === index ? "#111" : "#D0D5DD",
              opacity: i === index ? 1 : 0.6,
            }}
          />
        ))}
      </View>
    </View>
  );
}
