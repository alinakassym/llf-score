import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";

interface CarouselProps {
  images: string[];
  autoScrollInterval?: number;
  height?: number;
  pauseDuration?: number;
}

const { width: screenWidth } = Dimensions.get("window");

export function Carousel({
  images,
  autoScrollInterval = 3000,
  height = 200,
  pauseDuration = 5000,
}: CarouselProps) {
  const scheme = useThemeMode();

  const scrollViewRef = useRef<ScrollView>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

  const extendedImages =
    images.length > 1
      ? [images[images.length - 1], ...images, images[0]]
      : images;

  const startAutoScroll = useCallback(() => {
    if (images.length <= 1 || isAutoScrollPaused) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        scrollViewRef.current?.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
        return nextIndex;
      });
    }, autoScrollInterval);
  }, [images.length, isAutoScrollPaused, autoScrollInterval]);

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const pauseAutoScroll = () => {
    setIsAutoScrollPaused(true);
    stopAutoScroll();

    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoScrollPaused(false);
    }, pauseDuration);
  };

  const resetPauseTimer = () => {
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }

    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoScrollPaused(false);
    }, pauseDuration);
  };

  useEffect(() => {
    if (!isAutoScrollPaused) {
      startAutoScroll();
    }

    return () => {
      stopAutoScroll();
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, [images.length, autoScrollInterval, isAutoScrollPaused, startAutoScroll]);

  const handleScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);

    if (index === 0) {
      scrollViewRef.current?.scrollTo({
        x: images.length * screenWidth,
        animated: false,
      });
      setCurrentIndex(images.length);
    } else if (index === extendedImages.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: screenWidth,
        animated: false,
      });
      setCurrentIndex(1);
    } else {
      setCurrentIndex(index);
    }

    // Перезапускаем таймер после завершения ручного скролла
    if (isAutoScrollPaused) {
      resetPauseTimer();
    }
  };

  const handleTouchStart = () => {
    pauseAutoScroll();
  };

  useEffect(() => {
    if (images.length > 1) {
      scrollViewRef.current?.scrollTo({
        x: screenWidth,
        animated: false,
      });
    }
  }, [images.length]);

  const getDisplayIndex = () => {
    if (currentIndex === 0) return images.length - 1;
    if (currentIndex === extendedImages.length - 1) return 0;
    return currentIndex - 1;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        onScrollBeginDrag={handleTouchStart}
        style={[styles.scrollView, { height }]}
      >
        {extendedImages.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            style={[styles.image, { width: screenWidth, height }]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === getDisplayIndex() && styles.activeDot,
                {
                  backgroundColor:
                    index === getDisplayIndex()
                      ? Colors[scheme].primary
                      : Colors[scheme].muted,
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  scrollView: {
    width: screenWidth,
  },
  image: {
    backgroundColor: "#f0f0f0",
  },
  pagination: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  activeDot: {
    width: 32,
    height: 8,
    borderRadius: 4,
  },
});
