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
  intervalMs = 2500,
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

  // added for pause: управление паузой автоплей + авто-возобновлением
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const isAutoScrollRef = useRef(false); // чтобы отличать автопрокрутку от ручной
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const IDLE_BEFORE_RESUME_MS = 5500;

  const isRecenteringRef = useRef(false);

  const pauseAuto = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    isPausedRef.current = true;
    setIsPaused(true);
  };

  const scheduleResume = () => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
      setIsPaused(false);
    }, IDLE_BEFORE_RESUME_MS);
  };

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
    if (!autoPlay || len <= 1 || isPaused) return; // added for pause: уважать паузу
    const id = setInterval(() => {
      if (isPausedRef.current) return; // added for pause: двойная защита
      isAutoScrollRef.current = true; // added for pause: помечаем автоскролл
      ref.current?.scrollToOffset({
        offset: (absIndex + 1) * (cardW + gap),
        animated: true,
      });
      setAbsIndex((i) => i + 1);
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoPlay, intervalMs, len, cardW, gap, absIndex, isPaused]); // added for pause: isPaused в deps

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

  // added for pause: при старте ручного свайпа — ставим паузу
  const onScrollBeginDrag = () => {
    pauseAuto();
  };

  function onMomentumEnd(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const x = e.nativeEvent.contentOffset.x;
    // ADDED: если мы только что сами «доснапили», просто сбрасываем флаг и,
    // если была пауза, планируем авто-возобновление
    if (isRecenteringRef.current) {
      isRecenteringRef.current = false;
      if (isPausedRef.current) scheduleResume();
      return;
    }

    const step = cardW + gap;
    const idx = Math.round(x / (cardW + gap));

    // ADDED: доснап к ближайшему центру при ручном скролле
    // (для автоскролла пропускаем)
    if (!isAutoScrollRef.current) {
      const targetOffset = idx * step;
      if (Math.abs(x - targetOffset) > 0) {
        isRecenteringRef.current = true;
        ref.current?.scrollToOffset({
          offset: targetOffset,
          animated: true,
        });
      }
    }

    const fixed = recenterIfNeeded(idx);
    if (fixed !== absIndex) setAbsIndex(fixed);

    // added for pause: если это был автоскролл — сбрасываем флаг и продолжаем жить как раньше
    if (isAutoScrollRef.current) {
      isAutoScrollRef.current = false;
      return;
    }
    // added for pause: если это был ручной свайп — планируем возобновление через idle-таймаут
    if (isPausedRef.current) {
      scheduleResume();
    }
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
        onScrollBeginDrag={onScrollBeginDrag} // added for pause
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
