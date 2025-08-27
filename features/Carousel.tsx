import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
} from "react-native";
import BannerCard from "./BannerCard";
import type { Banner } from "@/shared/mocks/banners";

type Props = {
  items: Banner[];
  autoPlay?: boolean;
  intervalMs?: number;
  gap?: number; // расстояние между карточками
  showDots?: boolean;
};

const LOOP = 1000; // «размножаем» данные, чтобы был длинный список

export default function Carousel({
  items,
  autoPlay = true,
  intervalMs = 3500,
  gap = 12,
  showDots = false,
}: Props) {
  const screenW = Dimensions.get("window").width;

  // делаем карточку уже экрана, чтобы были видны соседние
  const cardW = Math.round(screenW * 0.9); // можно подстроить 0.8–0.9
  const sidePad = Math.max(0, Math.floor((screenW - cardW) / 2));

  // длинный массив для бесконечного скролла
  const data = useMemo(() => {
    if (!items.length) return [];
    const arr: Banner[] = new Array(items.length * LOOP)
      .fill(0)
      .map((_, i) => items[i % items.length]);
    return arr;
  }, [items]);

  const initialIndex = useMemo(
    () => (items.length ? Math.floor((LOOP / 2) * items.length) : 0),
    [items.length],
  );

  const ref = useRef<FlatList<Banner>>(null);
  const [absIndex, setAbsIndex] = useState(initialIndex); // индекс в длинном массиве
  const len = items.length;

  // позиционируемся в середину сразу
  useEffect(() => {
    if (!len) return;
    requestAnimationFrame(() => {
      ref.current?.scrollToOffset({
        offset: initialIndex * (cardW + gap),
        animated: false,
      });
      setAbsIndex(initialIndex);
    });
  }, [len, initialIndex, cardW, gap]);

  // автоплей
  useEffect(() => {
    if (!autoPlay || len <= 1) return;
    const id = setInterval(() => {
      ref.current?.scrollToOffset({
        offset: (absIndex + 1) * (cardW + gap),
        animated: true,
      });
      setAbsIndex((i) => i + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, len, cardW, gap, absIndex]);

  // когда докручиваемся слишком близко к краям — переносим в центр на такой же «нормализованный» индекс
  const recenterIfNeeded = (idx: number) => {
    if (!len) return idx;
    const norm = ((idx % len) + len) % len; // 0..len-1
    const centerIdx = Math.floor(LOOP / 2) * len + norm;
    if (Math.abs(centerIdx - idx) > len * 2) {
      // «далеко» от центра — мгновенно переносим (без анимации)
      ref.current?.scrollToOffset({
        offset: centerIdx * (cardW + gap),
        animated: false,
      });
      return centerIdx;
    }
    return idx;
  };

  function onMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / (cardW + gap));
    const fixed = recenterIfNeeded(idx);
    if (fixed !== absIndex) setAbsIndex(fixed);
  }

  // текущая «логическая» страница для точек
  const logicalIndex = len ? absIndex % len : 0;

  return (
    <View>
      <FlatList
        ref={ref}
        horizontal
        data={data}
        keyExtractor={(_, i) => String(i)}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardW + gap}
        snapToAlignment="center"
        decelerationRate="fast"
        bounces={false}
        onMomentumScrollEnd={onMomentumEnd}
        ItemSeparatorComponent={() => <View style={{ width: gap }} />}
        contentContainerStyle={{
          paddingHorizontal: sidePad,
          paddingVertical: 0,
        }}
        getItemLayout={(_, i) => ({
          length: cardW + gap,
          offset: (cardW + gap) * i,
          index: i,
        })}
        renderItem={({ item }) => (
          <BannerCard
            item={item}
            height={118}
            width={cardW}
            borderRadius={10}
          />
        )}
      />

      {/* точки-пейджер */}
      {len > 1 && showDots && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 6,
            marginTop: -10,
          }}
        >
          {items.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === logicalIndex ? 12 : 6,
                height: 6,
                borderRadius: 6,
                backgroundColor: i === logicalIndex ? "#111" : "#D0D5DD",
                opacity: i === logicalIndex ? 1 : 0.6,
              }}
            />
          ))}
        </View>
      )}
    </View>
  );
}
