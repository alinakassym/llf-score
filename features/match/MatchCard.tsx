// features/match/MatchCard.tsx
import { LLFLogo } from "@/components/icons/LLFLogo";
import { ShirtIcon } from "@/components/icons/shirt-icon";
import { Colors } from "@/constants/theme";
import { Match } from "@/features/match/types";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  match: Match;
  onPress?: (match: Match) => void;
};

export default function MatchCard({ match, onPress }: Props) {
  const scheme = useThemeMode();
  const c = Colors[scheme];

  const handlePress = () => {
    onPress?.(match);
  };

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 8,
        backgroundColor: c.background,
      }}
    >
      {/* Tournament and time header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {/* <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: c.error,
            }}
          /> */}
          <Text
            style={{
              color: c.textMuted,
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {match.tournament}
          </Text>
        </View>
        {/* <Text
          style={{
            color: c.textMuted,
            fontSize: 12,
            fontWeight: "500",
          }}
        >
          {match.time}
        </Text> */}
      </View>

      {/* Teams and score */}
      <View
        style={{
          height: 113,
          gap: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Home team */}
        <View style={{ alignItems: "center", flex: 1 }}>
          <ShirtIcon
            size={60}
            color1={match.homeTeam.color1}
            color2={match.homeTeam.color2}
            strokeColor={c.dark}
          />
          <Text
            style={{
              color: c.text,
              fontSize: 14,
              fontWeight: "700",
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {match.homeTeam.name}
          </Text>
          {match.homeTeam.city && (
            <Text
              style={{
                color: c.textMuted,
                fontSize: 11,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              {match.homeTeam.city}
            </Text>
          )}
        </View>

        {/* Score */}
        <View style={{ alignItems: "center", minWidth: 80 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: c.text,
                fontSize: 28,
                fontWeight: "700",
              }}
            >
              {match.homeScore ?? "—"}
            </Text>
            <Text
              style={{
                color: c.textMuted,
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              -
            </Text>
            <Text
              style={{
                color: c.text,
                fontSize: 28,
                fontWeight: "700",
              }}
            >
              {match.awayScore ?? "—"}
            </Text>
          </View>
          {match.isLive && (
            <View style={{ gap: 4, alignItems: "center" }}>
              <View
                style={{
                  backgroundColor: c.error,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 10,
                    fontWeight: "700",
                  }}
                >
                  Live
                </Text>
              </View>
              <LLFLogo height={12} width={84} color={c.text} />
            </View>
          )}
        </View>

        {/* Away team */}
        <View style={{ alignItems: "center", flex: 1 }}>
          <ShirtIcon
            size={60}
            color1={match.awayTeam.color1}
            color2={match.awayTeam.color2}
            strokeColor={c.dark}
          />
          <Text
            style={{
              color: c.text,
              fontSize: 14,
              fontWeight: "700",
              textAlign: "center",
            }}
            numberOfLines={1}
          >
            {match.awayTeam.name}
          </Text>
          {match.awayTeam.city && (
            <Text
              style={{
                color: c.textMuted,
                fontSize: 11,
                textAlign: "center",
                marginTop: 2,
              }}
            >
              {match.awayTeam.city}
            </Text>
          )}
        </View>
      </View>

      {/* Match details */}
      {match.round && (
        <View
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: c.border,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: c.textMuted,
              fontSize: 12,
              textAlign: "center",
            }}
          >
            {match.round}
          </Text>
        </View>
      )}
    </View>
  );
}
