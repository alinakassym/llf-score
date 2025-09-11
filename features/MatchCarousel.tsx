// features/MatchCarousel.tsx
import React from "react";
import {
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { useAppTheme } from "@/shared/theme/AppThemeProvider";
import { Match } from "@/shared/types/match";
import MatchCard from "./MatchCard";

type Props = {
  matches: Match[];
  onMatchPress?: (match: Match) => void;
};

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = screenWidth * 0.8; // 80% ширины экрана
const CARD_MARGIN = 16;

export default function MatchCarousel({ matches, onMatchPress }: Props) {
  const { colors } = useAppTheme();

  if (matches.length === 0) {
    return null;
  }

  return (
    <View style={{ paddingVertical: 8 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        snapToAlignment="start"
        contentInsetAdjustmentBehavior="never"
        contentContainerStyle={{
          paddingLeft: 16,
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