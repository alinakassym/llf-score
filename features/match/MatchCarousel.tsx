// components/match/MatchCarousel.tsx
import { Colors } from "@/constants/theme";
import { Match } from "@/features/match/types";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import MatchCard from "./MatchCard";

type Props = {
  matches: Match[];
  onMatchPress?: (match: Match) => void;
};

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth * 0.9; // 80% ширины экрана
const CARD_MARGIN = 8;

export default function MatchCarousel({ matches, onMatchPress }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  if (matches.length === 0) {
    return null;
  }

  return (
    <View style={{ paddingVertical: 0 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        snapToAlignment="start"
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{
          paddingLeft: 0,
          paddingRight: screenWidth * 0.2, // Добавляем отступ справа
        }}
      >
        {matches.map((match, index) => (
          <View
            key={match.id}
            style={{
              width: CARD_WIDTH,
              marginRight: index < matches.length - 1 ? CARD_MARGIN : 0,
            }}
          >
            <MatchCard match={match} onPress={onMatchPress} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
